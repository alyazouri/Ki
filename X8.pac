// ╔══════════════════════════════════════════════════════════════════════╗
// ║  PUBG Mobile — Jordan First PAC Proxy Script v7.0                  ║
// ║  Updated: 2026-04-01                                               ║
// ║  Mode: Jordan-first + official fallback                            ║
// ║                                                                      ║
// ║  Design goals:                                                      ║
// ║   • Expand lobby / recruitment / friends / clan / invites          ║
// ║   • Expand match / relay / realtime / arena / training coverage    ║
// ║   • Keep anti-cheat DIRECT                                          ║
// ║   • Prefer Jordan IPs first                                          ║
// ║   • Do NOT break official PUBG services if DNS resolves non-JO      ║
// ║   • Match traffic uses dual-proxy failover                          ║
// ╚══════════════════════════════════════════════════════════════════════╝

var PROXY  = "PROXY 46.185.131.218:20001";
var PROXY2 = "PROXY 46.185.131.218:20002; PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ---------------------------------------------------------------------
// TYPE DETECTION
// ---------------------------------------------------------------------

function isIPv6(ip) { return ip && ip.indexOf(":") !== -1; }
function isIPv4(ip) { return ip && ip.indexOf(".") !== -1 && ip.indexOf(":") === -1; }

// ---------------------------------------------------------------------
// DNS RESOLUTION
// ---------------------------------------------------------------------

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

// ---------------------------------------------------------------------
// IPv6 NORMALIZATION
// ---------------------------------------------------------------------

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

function ipv6ToHex32(expanded) {
  return expanded.replace(/:/g, "");
}

function isInIPv6NibblePrefix(expanded, baseExpanded, plen) {
  if (!expanded || !baseExpanded) return false;
  if (plen % 4 !== 0) return false;
  var n = plen / 4;
  var a = ipv6ToHex32(expanded);
  var b = ipv6ToHex32(baseExpanded);
  return a.substring(0, n) === b.substring(0, n);
}

// ---------------------------------------------------------------------
// IPv4 UTILITIES
// ---------------------------------------------------------------------

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

// ---------------------------------------------------------------------
// JORDAN IPv6 PREFIXES
// ---------------------------------------------------------------------

var JO_IPV6_PREFIXES = [
  ["2a00:18d8::", 32],
  ["2a00:18d0::", 32],
  ["2a01:9700:5200::", 40],
  ["2a01:9700:5300::", 40],
  ["2a01:9700:5400::", 40],
  ["2a01:9700:5500::", 40],
  ["2a01:9700:5600::", 40],
  ["2a01:9700:5700::", 40],
  ["2a01:9700:5800::", 40],
  ["2a01:9700:5900::", 40],
  ["2a01:9700:5a00::", 40],
  ["2a01:9700:5b00::", 40],
  ["2a01:9700:5c00::", 40],
  ["2a01:9700:5e00::", 40],
  ["2a01:9700:6000::", 40],
  ["2a01:9700:6100::", 40],
  ["2a01:9700:6200::", 40],
  ["2a01:9700:6300::", 40],
  ["2a01:9700:6400::", 40],
  ["2a01:9700:6500::", 40],
  ["2a01:9700:6700::", 40],
  ["2a01:9700:6800::", 40],
  ["2a01:9700:6900::", 40],
  ["2a01:9700:6a00::", 40],
  ["2a01:9700:6b00::", 40],
  ["2a01:9700:6c00::", 40],
  ["2a01:9700:6e00::", 40],
  ["2a01:9700:6f00::", 40],
  ["2a01:9700:7100::", 40],
  ["2a01:9700:7200::", 40],
  ["2a01:9700:7300::", 40],
  ["2a03:6b01:6000::", 38],
  ["2a03:6b01:6400::", 38],
  ["2a03:6b01:8000::", 34]
];

function isJordanIPv6(fullIP) {
  for (var i = 0; i < JO_IPV6_PREFIXES.length; i++) {
    var base = expandIPv6(JO_IPV6_PREFIXES[i][0]);
    if (base && isInIPv6NibblePrefix(fullIP, base, JO_IPV6_PREFIXES[i][1])) return true;
  }
  return false;
}

// ---------------------------------------------------------------------
// JORDAN IPv4 RANGES
// ---------------------------------------------------------------------

var JO_IPV4_RANGES = [
  ["46.185.128.0", 17],
  ["176.29.0.0", 16],
  ["94.249.0.0", 17],
  ["86.108.0.0", 17],
  ["82.212.64.0", 18],
  ["92.253.0.0", 17],
  ["193.188.64.0", 19],
  ["213.186.160.0", 19],
  ["62.72.160.0", 19],
  ["2.17.24.0", 22],
  ["5.45.128.0", 20],
  ["5.198.240.0", 21],
  ["5.199.184.0", 22],
  ["37.17.192.0", 20],
  ["37.44.32.0", 21],
  ["37.75.144.0", 23],
  ["37.75.148.0", 22],
  ["37.123.64.0", 19],
  ["37.152.0.0", 21],
  ["37.202.64.0", 18],
  ["37.220.112.0", 20],
  ["45.67.60.0", 23],
  ["45.142.196.0", 22],
  ["46.23.112.0", 20],
  ["46.32.96.0", 19],
  ["46.248.192.0", 19],
  ["57.83.24.0", 21],
  ["77.245.0.0", 20],
  ["79.134.128.0", 19],
  ["79.173.192.0", 18],
  ["80.10.8.0", 21],
  ["80.10.48.0", 21],
  ["80.10.144.0", 21],
  ["80.10.168.0", 21],
  ["80.90.160.0", 20],
  ["81.21.8.0", 21],
  ["81.28.112.0", 20],
  ["81.52.144.0", 20],
  ["81.52.224.0", 21],
  ["81.253.96.0", 19],
  ["81.253.240.0", 20],
  ["84.18.32.0", 18],
  ["85.159.216.0", 21],
  ["87.236.232.0", 21],
  ["87.238.128.0", 21],
  ["89.28.216.0", 21],
  ["90.84.64.0", 19],
  ["91.106.96.0", 20],
  ["91.186.224.0", 19],
  ["92.241.32.0", 19],
  ["93.93.144.0", 21],
  ["93.95.200.0", 21],
  ["93.191.176.0", 21],
  ["94.127.208.0", 21],
  ["94.142.32.0", 19],
  ["95.141.208.0", 20],
  ["95.172.192.0", 19]
];

function isJordanIPv4(ip) {
  for (var i = 0; i < JO_IPV4_RANGES.length; i++) {
    if (isInIPv4Range(ip, JO_IPV4_RANGES[i][0], JO_IPV4_RANGES[i][1])) return true;
  }
  return false;
}

// ---------------------------------------------------------------------
// BLOCKED / RESERVED
// ---------------------------------------------------------------------

var BLOCKED_V4 = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.168.0.0", 16]
];

function isBlockedIPv4(ip) {
  for (var i = 0; i < BLOCKED_V4.length; i++) {
    if (isInIPv4Range(ip, BLOCKED_V4[i][0], BLOCKED_V4[i][1])) return true;
  }
  return false;
}

var BLOCKED_V6_PREFIXES = [
  ["2001:0db8::", 32],
  ["2001:0000::", 32],
  ["2002::", 16],
  ["fe80::", 10],
  ["ff00::", 8]
];

function isBlockedIPv6(fullIP) {
  if (!fullIP) return true;
  for (var i = 0; i < BLOCKED_V6_PREFIXES.length; i++) {
    var base = expandIPv6(BLOCKED_V6_PREFIXES[i][0]);
    if (base && isInIPv6NibblePrefix(fullIP, base, BLOCKED_V6_PREFIXES[i][1])) return true;
  }
  return false;
}

// ---------------------------------------------------------------------
// DOMAIN GROUPS
// ---------------------------------------------------------------------

var ANTICHEAT_DOMAINS = [
  "battleye.com",
  "gamesafe.com",
  "gamesafe.qq.com",
  "ace.qq.com",
  "tp2.qq.com",
  "aegis.qq.com"
];

var CDN_DOMAINS = [
  "cloudfront.net","akamai.net","akamaiedge.net","edgesuite.net",
  "fastly.net","cloudflare.com","cloudflare.net",
  "appsflyer.com","adjust.com","branch.io",
  "firebase.com","firebaseio.com","firebase.google.com",
  "crashlytics.com","sentry.io","bugsnag.com",
  "google-analytics.com","googleapis.com","googletagmanager.com"
];

// official + nearby official ecosystem
var PUBG_DOMAINS = [
  "pubgmobile.com",
  "support.pubgmobile.com",
  "esports.pubgmobile.com",
  "pubgmobile.helpshift.com",
  "pubgmobile.com",
  "pubg.com",
  "krafton.com",
  "levelinfinite.com",
  "pass.levelinfinite.com",
  "pre-pass.levelinfinite.com",
  "storepass.levelinfinite.com",
  "proximabeta.com",
  "tencent.com",
  "tencentgames.com",
  "qq.com",
  "qcloud.com",
  "myqcloud.com",
  "tencentcs.com",
  "igamecj.com",
  "gpubgm.com",
  "lightspeed-studios.com",
  "lightspeedstudios.com"
];

function hostMatchesDomainList(host, list) {
  var h = host.toLowerCase();
  for (var i = 0; i < list.length; i++) {
    var d = list[i];
    if (h === d) return true;
    if (h.length > d.length &&
        h.charAt(h.length - d.length - 1) === "." &&
        h.slice(h.length - d.length) === d) return true;
  }
  return false;
}

function isAntiCheat(host) { return hostMatchesDomainList(host, ANTICHEAT_DOMAINS); }
function isCDN(host) { return hostMatchesDomainList(host, CDN_DOMAINS); }
function isPUBGDomain(host) { return hostMatchesDomainList(host, PUBG_DOMAINS); }

// ---------------------------------------------------------------------
// URL / TRAFFIC CLASSIFICATION
// ---------------------------------------------------------------------

function extractPort(url) {
  try {
    var m = url.match(/^[a-z]+:\/\/[^/:]+:(\d{1,5})/i);
    if (m) return parseInt(m[1], 10);
    if (url.indexOf("https:") === 0) return 443;
    if (url.indexOf("http:") === 0) return 80;
  } catch (e) {}
  return 0;
}

function containsAny(s, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (s.indexOf(arr[i]) !== -1) return true;
  }
  return false;
}

var MATCH_PREFIXES = [
  "gs","gsvr","bsvr","gamesvr","gamesrv","svr","srv",
  "relay","battle","match","realtime","rt","udp","tcp",
  "gs1","gs2","gs3","gs4","gs5","tdm","arcade","arena",
  "combat","payload","infection","metro","training",
  "ranked","classic","war","survive","teamdeathmatch"
];

var LOBBY_PREFIXES = [
  "login","auth","account","user","profile","lobby",
  "gate","gateway","session","region","api","store","shop",
  "social","friend","friends","clan","guild","chat","config",
  "update","patch","news","event","asset","version",
  "matchmak","queue","notification","rank","mission","reward",
  "achievement","leaderboard","royalpass","rp","season",
  "inventory","support","recruit","recruitment","team","invite",
  "party","group","follow","mail","msg","community"
];

var MATCH_URL_HINTS = [
  "/match","/battle","/relay","/realtime","/gs","/arena","/tdm",
  "/payload","/infection","/metro","/training","/ranked","/classic"
];

var LOBBY_URL_HINTS = [
  "/lobby","/login","/auth","/profile","/friend","/friends","/social",
  "/clan","/guild","/chat","/recruit","/recruitment","/invite","/party",
  "/team","/group","/rank","/season","/rp","/royalpass","/inventory",
  "/reward","/mission","/leaderboard","/event","/notice","/mail","/shop",
  "/store","/support"
];

function classifyTraffic(url, host) {
  var port = extractPort(url);
  var h = host.toLowerCase();
  var dot = h.indexOf(".");
  var sub = dot !== -1 ? h.slice(0, dot) : h;

  if (port === 7086 || port === 7087) return "match";
  if (port >= 7000 && port <= 7099) return "match";
  if (port >= 8000 && port <= 8999) return "match";
  if (port >= 10000 && port <= 19999) return "match";
  if (port >= 20000 && port <= 39999) return "match";

  if (port === 443 || port === 80 || port === 8080 || port === 8443 || port === 9090) {
    // continue inspecting
  }

  for (var i = 0; i < MATCH_PREFIXES.length; i++) {
    var p = MATCH_PREFIXES[i];
    if (sub === p || sub.indexOf(p) === 0) return "match";
  }

  for (var j = 0; j < LOBBY_PREFIXES.length; j++) {
    var lp = LOBBY_PREFIXES[j];
    if (sub === lp || sub.indexOf(lp) === 0) return "lobby";
  }

  var u = url.toLowerCase();

  if (containsAny(u, MATCH_URL_HINTS)) return "match";
  if (containsAny(u, LOBBY_URL_HINTS)) return "lobby";

  return "general";
}

// ---------------------------------------------------------------------
// ROUTING HELPERS
// ---------------------------------------------------------------------

function chooseProxyByTraffic(trafficType) {
  return (trafficType === "match") ? PROXY2 : PROXY;
}

function isJordanIP(ip) {
  if (!ip) return false;

  if (isIPv4(ip)) {
    if (isBlockedIPv4(ip)) return false;
    return isJordanIPv4(ip);
  }

  if (isIPv6(ip)) {
    var fullIP = expandIPv6(ip);
    if (!fullIP) return false;
    if (isBlockedIPv6(fullIP)) return false;
    return isJordanIPv6(fullIP);
  }

  return false;
}

function isBogonOrBadIP(ip) {
  if (!ip) return false;

  if (isIPv4(ip)) return isBlockedIPv4(ip);

  if (isIPv6(ip)) {
    var fullIP = expandIPv6(ip);
    if (!fullIP) return true;
    return isBlockedIPv6(fullIP);
  }

  return true;
}

// ---------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------

function FindProxyForURL(url, host) {
  if (isPlainHostName(host)) return DIRECT;

  var h = host.toLowerCase();

  // anti-cheat stays direct
  if (isAntiCheat(h)) return DIRECT;

  // telemetry / cdn direct
  if (isCDN(h)) return DIRECT;

  // unrelated traffic direct
  if (!isPUBGDomain(h)) return DIRECT;

  var trafficType = classifyTraffic(url, h);

  // Try resolve, but do not hard-fail official domains.
  var ip = resolveHost(h);

  // If resolved to bogon/bad => hard block.
  if (ip && isBogonOrBadIP(ip)) return BLOCK;

  // Jordan-first:
  if (ip && isJordanIP(ip)) {
    return chooseProxyByTraffic(trafficType);
  }

  // Official fallback:
  // If official PUBG service resolves outside Jordan or does not resolve
  // in PAC engine, keep it functional via proxy instead of breaking lobby.
  if (trafficType === "match") return PROXY;
  if (trafficType === "lobby") return PROXY2;

  // General official endpoints still go through primary proxy.
  return PROXY;
}
