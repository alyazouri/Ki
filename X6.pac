// ╔══════════════════════════════════════════════════════════════════════╗
// ║  PUBG Mobile — Jordan Pure PAC Proxy Script v5.1                    ║
// ║  Updated: 2026-04-01                                                ║
// ║  Goals:                                                             ║
// ║   • Jordan-only routing for supported PUBG traffic                  ║
// ║   • Minimum & stable ping across game modes                         ║
// ║   • Anti-cheat always DIRECT                                         ║
// ║   • Dual-proxy failover for match traffic                            ║
// ║   • Full lobby + match + clan + training + arcade coverage          ║
// ╚══════════════════════════════════════════════════════════════════════╝

var PROXY  = "PROXY 46.185.131.218:20001";
var PROXY2 = "PROXY 46.185.131.218:20002; PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ═══════════════════════════════════════════════════════
//  TYPE DETECTION
// ═══════════════════════════════════════════════════════

function isIPv6(ip) { return ip && ip.indexOf(":") !== -1; }
function isIPv4(ip) { return ip && ip.indexOf(".") !== -1 && ip.indexOf(":") === -1; }

// ═══════════════════════════════════════════════════════
//  DNS RESOLUTION — IPv6-preferred
// ═══════════════════════════════════════════════════════

function resolveHost(host) {
  var ipv6 = null, ipv4 = null;
  try {
    var all = dnsResolveEx(host);
    if (all) {
      var list = all.split(";");
      for (var i = 0; i < list.length; i++) {
        var a = list[i].trim();
        if (!ipv6 && isIPv6(a)) ipv6 = a;
        if (!ipv4 && isIPv4(a)) ipv4 = a;
      }
    }
  } catch (e) {}
  if (!ipv6 && !ipv4) {
    try {
      var v4 = dnsResolve(host);
      if (v4 && isIPv4(v4)) ipv4 = v4;
    } catch (e) {}
  }
  return ipv6 || ipv4 || null;
}

// ═══════════════════════════════════════════════════════
//  expandIPv6 — full 8-group normalisation
// ═══════════════════════════════════════════════════════

function expandIPv6(address) {
  if (!address) return null;
  address = address.toLowerCase().trim();
  if (address.charAt(0) === "[") {
    var rb = address.lastIndexOf("]");
    if (rb === -1) return null;
    address = address.slice(1, rb).trim();
  }
  if (address.indexOf(":") === -1) return null;

  var v4m = address.match(/^((?:[0-9a-f]{0,4}:)+)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/);
  if (v4m) {
    var quad = v4m[2].split(".");
    if (quad.length !== 4) return null;
    var b1 = parseInt(quad[0], 10), b2 = parseInt(quad[1], 10);
    var b3 = parseInt(quad[2], 10), b4 = parseInt(quad[3], 10);
    if (b1 > 255 || b2 > 255 || b3 > 255 || b4 > 255) return null;
    var h1 = ("0" + b1.toString(16)).slice(-2) + ("0" + b2.toString(16)).slice(-2);
    var h2 = ("0" + b3.toString(16)).slice(-2) + ("0" + b4.toString(16)).slice(-2);
    address = v4m[1] + h1 + ":" + h2;
  }

  var dc = address.split("::");
  if (dc.length > 2) return null;

  var groups = [];
  if (dc.length === 2) {
    var L = (dc[0] !== "") ? dc[0].split(":") : [];
    var R = (dc[1] !== "") ? dc[1].split(":") : [];
    var fill = 8 - L.length - R.length;
    if (fill < 0) return null;
    groups = L.slice();
    for (var i = 0; i < fill; i++) groups.push("0");
    groups = groups.concat(R);
  } else {
    groups = address.split(":");
  }

  if (groups.length !== 8) return null;
  for (var k = 0; k < 8; k++) {
    var g = groups[k];
    if (!g) g = "0";
    if (g.length > 4 || !/^[0-9a-f]{1,4}$/.test(g)) return null;
    while (g.length < 4) g = "0" + g;
    groups[k] = g;
  }
  return groups.join(":");
}

// ═══════════════════════════════════════════════════════
//  IPv4 UTILITIES
// ═══════════════════════════════════════════════════════

function ipv4ToInt(ip) {
  var p = ip.split(".");
  if (p.length !== 4) return 0;
  return ((parseInt(p[0], 10) << 24) |
          (parseInt(p[1], 10) << 16) |
          (parseInt(p[2], 10) << 8) |
           parseInt(p[3], 10)) >>> 0;
}

function isInIPv4Range(ip, net, plen) {
  var mask = plen === 0 ? 0 : (0xFFFFFFFF << (32 - plen)) >>> 0;
  return (ipv4ToInt(ip) & mask) === (ipv4ToInt(net) & mask);
}

// ═══════════════════════════════════════════════════════
//  IPv6 PREFIX MATCHING
// ═══════════════════════════════════════════════════════

function matchPrefix29(ip, base) {
  var ip32 = parseInt(ip.split(":")[1], 16);
  var b32  = parseInt(base.split(":")[1], 16);
  return ip.split(":")[0] === base.split(":")[0] && (ip32 >> 3) === (b32 >> 3);
}

function matchPrefix32(ip, base) {
  var a = ip.split(":"), b = base.split(":");
  return a[0] === b[0] && a[1] === b[1];
}

// ═══════════════════════════════════════════════════════
//  JORDAN IPv6 PREFIXES — /29 and /32
// ═══════════════════════════════════════════════════════

var JO_IPV6_29 = [
  "2001:32c0","2a01:01d0","2a01:9700","2a01:e240",
  "2a01:ee40","2a02:09c0","2a02:2558","2a02:e680",
  "2a02:f0c0","2a03:6b00","2a04:4cc0","2a05:74c0",
  "2a05:7500","2a06:9bc0","2a06:bd80","2a07:0140",
  "2a0a:2740","2a0c:39c0","2a0d:cf40","2a10:1100",
  "2a10:9740","2a10:d800","2a11:d180","2a13:1f00",
  "2a13:5c00","2a13:8d40","2a14:1a40","2a14:2840"
];

var JO_IPV6_32 = [
  "2a00:4620","2a00:76e0","2a00:b860","2a00:caa0",
  "2a03:6d00","2a03:b640","2a0e:1c80","2a0e:b700",
  "2a0f:1a00","2a0f:9c40","2a10:4e00","2a12:52c0",
  "2a12:d000","2a13:b200","2a14:50c0"
];

function isJordanIPv6(fullIP) {
  var i;
  for (i = 0; i < JO_IPV6_29.length; i++) if (matchPrefix29(fullIP, JO_IPV6_29[i])) return true;
  for (i = 0; i < JO_IPV6_32.length; i++) if (matchPrefix32(fullIP, JO_IPV6_32[i])) return true;
  return false;
}

// ═══════════════════════════════════════════════════════
//  JORDAN IPv4 RANGES
// ═══════════════════════════════════════════════════════

var JO_IPV4_RANGES = [
  ["46.185.128.0", 17],
  ["62.72.160.0", 19],
  ["82.212.64.0", 18],
  ["92.253.64.0", 18],
  ["94.249.0.0", 17],
  ["176.29.0.0", 16],
  ["193.188.64.0", 19],
  ["213.186.160.0", 19]
];

function isJordanIPv4(ip) {
  for (var i = 0; i < JO_IPV4_RANGES.length; i++) {
    if (isInIPv4Range(ip, JO_IPV4_RANGES[i][0], JO_IPV4_RANGES[i][1])) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  PUBG SERVER IPv4 RANGES
// ═══════════════════════════════════════════════════════

var PUBG_SERVER_IPV4 = [
  ["5.45.128.0", 20],
  ["37.44.32.0", 21],
  ["37.152.0.0", 21],
  ["46.32.96.0", 19],
  ["77.245.0.0", 20],
  ["80.90.160.0", 20],
  ["86.108.0.0", 17],
  ["109.107.224.0", 19],
  ["178.20.184.0", 21],
  ["194.165.128.0", 19],
  ["212.118.0.0", 19]
];

function isPUBGServerIPv4(ip) {
  for (var i = 0; i < PUBG_SERVER_IPV4.length; i++) {
    if (isInIPv4Range(ip, PUBG_SERVER_IPV4[i][0], PUBG_SERVER_IPV4[i][1])) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  ANTI-CHEAT DOMAINS — always DIRECT
// ═══════════════════════════════════════════════════════

var ANTICHEAT_DOMAINS = [
  "battleye.com",
  "gamesafe.com",
  "gamesafe.qq.com",
  "ace.qq.com",
  "tp2.qq.com",
  "aegis.qq.com"
];

function isAntiCheat(host) {
  var h = host.toLowerCase();
  for (var i = 0; i < ANTICHEAT_DOMAINS.length; i++) {
    var d = ANTICHEAT_DOMAINS[i];
    if (h === d || (h.length > d.length &&
      h.charAt(h.length - d.length - 1) === "." &&
      h.slice(h.length - d.length) === d)) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  PUBG DOMAIN DETECTION
// ═══════════════════════════════════════════════════════

var PUBG_DOMAINS = [
  "pubgmobile.com","pubg.com","krafton.com",
  "levelinfinite.com","proxima.com",
  "tencent.com","tencentgames.com",
  "qq.com",
  "myqcloud.com","qcloud.com","tencentcs.com",
  "lightspeedstudios.com",
  "igamecj.com","gpubgm.com",
  "xd.com",
  "garena.com","garenanow.com"
];

function isPUBGDomain(host) {
  var h = host.toLowerCase();
  for (var i = 0; i < PUBG_DOMAINS.length; i++) {
    var d = PUBG_DOMAINS[i];
    if (h === d || (h.length > d.length &&
      h.charAt(h.length - d.length - 1) === "." &&
      h.slice(h.length - d.length) === d)) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  CDN / ANALYTICS / TELEMETRY — always DIRECT
// ═══════════════════════════════════════════════════════

var CDN_DOMAINS = [
  "cloudfront.net","akamai.net","akamaiedge.net","edgesuite.net",
  "fastly.net","cloudflare.com","cloudflare.net",
  "appsflyer.com","adjust.com","branch.io",
  "firebase.com","firebaseio.com","firebase.google.com",
  "crashlytics.com","sentry.io","bugsnag.com",
  "cdntips.net","cdnbuzz.net","dnsv1.com",
  "google-analytics.com","googleapis.com","googletagmanager.com"
];

function isCDN(host) {
  var h = host.toLowerCase();
  for (var i = 0; i < CDN_DOMAINS.length; i++) {
    var d = CDN_DOMAINS[i];
    if (h === d || (h.length > d.length &&
      h.charAt(h.length - d.length - 1) === "." &&
      h.slice(h.length - d.length) === d)) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  TRAFFIC CLASSIFICATION
// ═══════════════════════════════════════════════════════

function extractPort(url) {
  try {
    var m = url.match(/^[a-z]+:\/\/[^/:]+:(\d{1,5})/i);
    if (m) return parseInt(m[1], 10);
    if (url.indexOf("https:") === 0) return 443;
    if (url.indexOf("http:") === 0) return 80;
  } catch (e) {}
  return 0;
}

var MATCH_PREFIXES = [
  "gs","gsvr","bsvr","gamesvr","gamesrv",
  "svr","srv","relay","battle","match",
  "realtime","rt","gs1","gs2","gs3","gs4","gs5",
  "tdm","arcade","arena","combat","payload",
  "infection","metro","training","bgmi","ranked"
];

var LOBBY_PREFIXES = [
  "login","auth","account","user","profile",
  "lobby","gate","gateway","session","region",
  "api","store","shop","social","friend",
  "clan","chat","config","update","patch",
  "news","event","cdn","asset","version",
  "matchmak","queue","notification","rank",
  "mission","reward","achievement","leaderboard",
  "royalpass","rp","season","inventory"
];

function classifyTraffic(url, host) {
  var port = extractPort(url);
  var h = host.toLowerCase();

  if (port === 7086 || port === 7087) return "match";
  if (port >= 8000 && port <= 8009) return "match";
  if (port >= 10000 && port <= 17999) return "match";
  if (port >= 20000 && port <= 29999) return "match";
  if (port === 443 || port === 80 || port === 8080 || port === 8443) return "lobby";

  var dot = h.indexOf(".");
  var sub = dot !== -1 ? h.slice(0, dot) : h;
  var i;

  for (i = 0; i < MATCH_PREFIXES.length; i++) {
    var p = MATCH_PREFIXES[i];
    if (sub === p || (sub.indexOf(p) === 0 && /^\d+$/.test(sub.slice(p.length)))) return "match";
  }

  for (i = 0; i < LOBBY_PREFIXES.length; i++) {
    var lp = LOBBY_PREFIXES[i];
    if (sub === lp || (sub.indexOf(lp) === 0 && /^\d*$/.test(sub.slice(lp.length)))) return "lobby";
  }

  return "general";
}

// ═══════════════════════════════════════════════════════
//  BLOCKED IPv6 PREFIXES
// ═══════════════════════════════════════════════════════

var BLOCKED_V6_29 = [
  "2a01:4640",
  "2a05:b4c0",
  "2a01:be00",
  "2a01:4340",
  "2a05:3a80",
  "2a06:2700"
];

var BLOCKED_V6_32 = [
  "2a00:1450","2600:1900","2600:1901","2607:f8b0",
  "2a0a:5640","2a0c:b700","2a0d:5240",
  "2a01:3b40","2a01:5ec0","2a03:3b40","2a01:d340","2a09:1400",
  "2a02:2e00","2a09:bac0",
  "2a02:6b8",
  "2402:4e00","240e:0000",
  "2401:4900","2407:3e00","2407:5200",
  "2400:3c00","2400:4f00",
  "2c0f:f248","2c0f:f7c0",
  "2405:8100","2403:5800",
  "2a00:bdc0","2a00:13c0","2a00:1fa0",
  "2a00:1a60","2a00:1b20"
];

function isBlockedIPv6(fullIP) {
  if (!fullIP) return true;
  var i;
  for (i = 0; i < BLOCKED_V6_29.length; i++) if (matchPrefix29(fullIP, BLOCKED_V6_29[i])) return true;
  for (i = 0; i < BLOCKED_V6_32.length; i++) if (matchPrefix32(fullIP, BLOCKED_V6_32[i])) return true;
  var p4 = fullIP.substring(0, 4);
  if (p4 === "2002") return true;
  if (fullIP.substring(0, 9) === "2001:0000") return true;
  if (fullIP.substring(0, 9) === "2001:0db8") return true;
  if (p4 === "ff00" || p4 === "ff02") return true;
  if (p4 === "fe80") return true;
  return false;
}

// ═══════════════════════════════════════════════════════
//  BLOCKED IPv4 RANGES
// ═══════════════════════════════════════════════════════

var BLOCKED_V4 = [
  ["10.0.0.0", 8],["127.0.0.0", 8],["172.16.0.0", 12],
  ["192.168.0.0", 16],["169.254.0.0", 16],["100.64.0.0", 10],["0.0.0.0", 8],
  ["41.32.0.0", 11],
  ["41.64.0.0", 14],
  ["41.128.0.0", 11],
  ["41.192.0.0", 10],
  ["156.222.0.0", 16],
  ["197.32.0.0", 11],
  ["196.205.0.0", 16],
  ["196.216.0.0", 14],
  ["2.144.0.0", 14],["2.176.0.0", 12],
  ["5.52.0.0", 15],["5.56.0.0", 13],["5.160.0.0", 14],["5.200.0.0", 16],
  ["14.139.0.0", 16],["14.140.0.0", 14],
  ["27.54.0.0", 15],["43.224.0.0", 13],
  ["39.32.0.0", 11],["58.27.128.0", 17],["58.65.128.0", 17],
  ["103.0.0.0", 13],
  ["37.236.0.0", 14],["78.178.0.0", 15],
  ["185.79.160.0", 22],["37.10.0.0", 14]
];

function isBlockedIPv4(ip) {
  for (var i = 0; i < BLOCKED_V4.length; i++) {
    if (isInIPv4Range(ip, BLOCKED_V4[i][0], BLOCKED_V4[i][1])) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  if (isPlainHostName(host)) return DIRECT;
  if (isAntiCheat(host)) return DIRECT;
  if (isCDN(host)) return DIRECT;
  if (!isPUBGDomain(host)) return DIRECT;

  var ip = resolveHost(host);
  if (!ip) return BLOCK;

  var trafficType = classifyTraffic(url, host);

  if (isIPv6(ip)) {
    var fullIP = expandIPv6(ip);
    if (!fullIP) return BLOCK;
    if (isBlockedIPv6(fullIP)) return BLOCK;
    if (!isJordanIPv6(fullIP)) return BLOCK;
    return (trafficType === "match") ? PROXY2 : PROXY;
  }

  if (isIPv4(ip)) {
    if (isBlockedIPv4(ip)) return BLOCK;
    if (isPUBGServerIPv4(ip)) {
      return (trafficType === "match") ? PROXY2 : PROXY;
    }
    if (!isJordanIPv4(ip)) return BLOCK;
    return (trafficType === "match") ? PROXY2 : PROXY;
  }

  return BLOCK;
}
