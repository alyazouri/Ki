// =====================================================
// PAC FILE — JORDAN PRIORITY PUBG ROUTING (FIXED & COMPLETE)
// =====================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var PROXY2 = "PROXY 46.185.131.218:20002; PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ———————————————————————
// BASIC HELPERS
// ———————————————————————
function safeTrim(s) {
  return (s || "").replace(/^\s+|\s+$/g, "");
}

function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

function isIPv4(ip) {
  return ip && ip.indexOf(".") !== -1 && ip.indexOf(":") === -1;
}

// ———————————————————————
// DNS RESOLUTION (Dual Stack)
// ———————————————————————
function resolveHostBoth(host) {
  var ipv6 = null;
  var ipv4 = null;

  try {
    var all = dnsResolveEx(host);
    if (all) {
      var list = all.split(";");
      for (var i = 0; i < list.length; i++) {
        var a = safeTrim(list[i]);
        if (!a) continue;
        if (!ipv6 && isIPv6(a)) ipv6 = a;
        if (!ipv4 && isIPv4(a)) ipv4 = a;
        if (ipv4 && ipv6) break;
      }
    }
  } catch (e) {}

  if (!ipv4) {
    try {
      var v4 = dnsResolve(host);
      if (v4 && isIPv4(v4)) ipv4 = v4;
    } catch (e) {}
  }

  return { ipv4: ipv4, ipv6: ipv6 };
}

// ———————————————————————
// IPv6 NORMALIZATION
// ———————————————————————
function expandIPv6(address) {
  if (!address) return null;
  address = safeTrim(address.toLowerCase());

  if (address.charAt(0) === "[") {
    var rb = address.lastIndexOf("]");
    if (rb === -1) return null;
    address = safeTrim(address.slice(1, rb));
  }

  if (address.indexOf(":") === -1) return null;

  var v4m = address.match(/^((?:[0-9a-f]{0,4}:)+)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/);
  if (v4m) {
    var quad = v4m[2].split(".");
    if (quad.length !== 4) return null;

    var b1 = parseInt(quad[0], 10);
    var b2 = parseInt(quad[1], 10);
    var b3 = parseInt(quad[2], 10);
    var b4 = parseInt(quad[3], 10);

    if (
      isNaN(b1) || isNaN(b2) || isNaN(b3) || isNaN(b4) ||
      b1 < 0 || b1 > 255 ||
      b2 < 0 || b2 > 255 ||
      b3 < 0 || b3 > 255 ||
      b4 < 0 || b4 > 255
    ) return null;

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

function getIPv6FirstTwoHextets(expanded) {
  if (!expanded) return "";
  var g = expanded.split(":");
  if (g.length !== 8) return "";
  return g[0] + ":" + g[1];
}

// ———————————————————————
// IPv4 UTILITIES
// ———————————————————————
function ipv4ToInt(ip) {
  var p = ip.split(".");
  if (p.length !== 4) return 0;
  var a = parseInt(p[0], 10);
  var b = parseInt(p[1], 10);
  var c = parseInt(p[2], 10);
  var d = parseInt(p[3], 10);
  if (
    isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) ||
    a < 0 || a > 255 ||
    b < 0 || b > 255 ||
    c < 0 || c > 255 ||
    d < 0 || d > 255
  ) return 0;
  return (((a << 24) | (b << 16) | (c << 8) | d) >>> 0);
}

function isInIPv4Range(ip, net, plen) {
  if (plen < 0 || plen > 32) return false;
  var mask = plen === 0 ? 0 : (0xFFFFFFFF << (32 - plen)) >>> 0;
  return (ipv4ToInt(ip) & mask) === (ipv4ToInt(net) & mask);
}

// ———————————————————————
// JORDAN IPv6 — FIRST TWO HEXTETS (NORMALIZED)
// ———————————————————————
var JO_IPV6_FIRST2 = [
  "2a00:18d0",
  "2a01:01d0",
  "2a01:ee40",
  "2a02:f0c0",
  "2a03:6d00",
  "2a02:25d8",
  "2a00:18d8",
  "2001:32c0",
  "2a00:4620",
  "2a02:5b60",
  "2a03:6b00",
  "2a02:c040",
  "2a00:caa0",
  "2a01:e240",
  "2a00:76e0",
  "2a00:b860",
  "2a01:9700",
  "2a02:2558",
  "2a02:e680",
  "2a02:09c0"
];

var JO_IPV6_FIRST2_NORM = [];
(function() {
  for (var i = 0; i < JO_IPV6_FIRST2.length; i++) {
    var raw = JO_IPV6_FIRST2[i];
    var parts = raw.split(":");
    var norm = "";
    for (var j = 0; j < parts.length; j++) {
      var p = parts[j].toLowerCase();
      while (p.length < 4) p = "0" + p;
      if (j > 0) norm += ":";
      norm += p;
    }
    JO_IPV6_FIRST2_NORM.push(norm);
  }
})();

function isJordanIPv6(ip) {
  var fullIP = expandIPv6(ip);
  if (!fullIP) return false;
  var first2 = getIPv6FirstTwoHextets(fullIP);
  if (!first2) return false;
  for (var i = 0; i < JO_IPV6_FIRST2_NORM.length; i++) {
    if (first2 === JO_IPV6_FIRST2_NORM[i]) return true;
  }
  return false;
}

// ———————————————————————
// JORDAN IPv4 RANGES
// ———————————————————————
var JO_IPV4_RANGES = [
  // ——— Umniah / AS9038 ———
  ["91.186.224.0",  19],
  ["92.241.32.0",   19],
  ["212.35.64.0",   20],
  ["212.35.80.0",   20],
  ["212.118.0.0",   20],
  ["212.118.16.0",  20],
  ["5.198.240.0",   21],
  ["37.44.32.0",    21],
  ["37.152.0.0",    21],
  ["85.159.216.0",  21],
  ["91.106.96.0",   20],
  ["94.127.208.0",  21],

  // ——— Orange Jordan / Jordan Data Communications ———
  ["176.28.128.0",  17],
  ["46.185.128.0",  17],
  ["86.108.0.0",    17],
  ["92.253.0.0",    17],
  ["94.249.0.0",    17],
  ["149.200.128.0", 17],
  ["37.202.64.0",   18],
  ["79.173.192.0",  18],
  ["194.165.128.0", 19],
  ["213.186.160.0", 19],
  ["212.34.0.0",    19],
  ["213.139.32.0",  19],
  ["2.17.24.0",     22],
  ["80.10.64.0",    20],
  ["217.23.32.0",   20],
  ["80.10.8.0",     21],
  ["80.10.48.0",    21],
  ["80.10.144.0",   21],
  ["80.10.168.0",   21],
  ["185.98.220.0",  22],
  ["185.98.224.0",  22],

  // ——— Zain Jordan ———
  ["176.29.0.0",    16],

  // ——— شبكات أردنية/محلية ———
  ["82.212.64.0",    18],
  ["188.123.160.0",  19],
  ["81.28.112.0",    20],
  ["185.175.248.0",  22],
  ["178.77.128.0",   18],
  ["37.123.64.0",    19],
  ["37.17.192.0",    20],
  ["95.141.208.0",   20],
  ["93.191.176.0",   21],
  ["185.160.236.0",  22],
  ["2.59.52.0",      22],
  ["5.45.128.0",     20],
  ["5.199.184.0",    22],
  ["37.75.144.0",    21],
  ["37.252.222.0",   24],
  ["45.142.196.0",   22],
  ["62.72.160.0",    19],
  ["79.134.128.0",   19],
  ["193.188.64.0",   19],

  // ——— أقل أولوية للألعاب ———
  ["46.32.96.0",     19],
  ["94.142.32.0",    19],
  ["188.247.64.0",   19],
  ["77.245.0.0",     20],
  ["80.90.160.0",    20],
  ["87.238.128.0",   21],
  ["185.109.192.0",  22],
  ["45.67.60.0",     23],
  ["57.83.24.0",     21],
  ["81.21.8.0",      21],
  ["81.52.144.0",    20],
  ["81.52.224.0",    21],
  ["81.253.96.0",    19],
  ["81.253.240.0",   20],
  ["84.18.32.0",     18],
  ["87.236.232.0",   21],
  ["89.28.216.0",    21],
  ["90.84.64.0",     19],
  ["93.93.144.0",    21],
  ["93.95.200.0",    21],

  // ——— شبكات إضافية ———
  ["46.248.192.0",   19],
  ["95.172.192.0",   19],
  ["109.107.224.0",  19],
  ["37.220.112.0",   20],
  ["46.23.112.0",    20]
];

function isJordanIPv4(ip) {
  for (var i = 0; i < JO_IPV4_RANGES.length; i++) {
    if (isInIPv4Range(ip, JO_IPV4_RANGES[i][0], JO_IPV4_RANGES[i][1])) return true;
  }
  return false;
}

// ———————————————————————
// BLOCKED / RESERVED / LOCAL
// ———————————————————————
var BLOCKED_V4 = [
  ["0.0.0.0",       8],
  ["10.0.0.0",      8],
  ["100.64.0.0",   10],
  ["127.0.0.0",     8],
  ["169.254.0.0",  16],
  ["172.16.0.0",   12],
  ["192.0.0.0",    24],
  ["192.0.2.0",    24],
  ["192.168.0.0",  16],
  ["198.18.0.0",   15],
  ["198.51.100.0", 24],
  ["203.0.113.0",  24],
  ["224.0.0.0",     4],
  ["240.0.0.0",     4]
];

function isBlockedIPv4(ip) {
  for (var i = 0; i < BLOCKED_V4.length; i++) {
    if (isInIPv4Range(ip, BLOCKED_V4[i][0], BLOCKED_V4[i][1])) return true;
  }
  return false;
}

var BLOCKED_V6_FIRST2 = [
  "0000:0000",
  "fc00:0000",
  "fd00:0000",
  "fe80:0000",
  "fec0:0000",
  "ff00:0000",
  "2001:0db8",
  "2001:0000",
  "2002:0000"
];

function isBlockedIPv6(ip) {
  var fullIP = expandIPv6(ip);
  if (!fullIP) return true;
  if (fullIP === "0000:0000:0000:0000:0000:0000:0000:0000") return true;
  if (fullIP === "0000:0000:0000:0000:0000:0000:0000:0001") return true;
  var first2 = getIPv6FirstTwoHextets(fullIP);
  for (var i = 0; i < BLOCKED_V6_FIRST2.length; i++) {
    if (first2 === BLOCKED_V6_FIRST2[i]) return true;
  }
  return false;
}

// ———————————————————————
// DOMAIN GROUPS
// ———————————————————————
var ANTICHEAT_DOMAINS = [
  "battleye.com",
  "gamesafe.com",
  "gamesafe.qq.com",
  "ace.qq.com",
  "tp2.qq.com",
  "aegis.qq.com"
];

var CDN_DOMAINS = [
  "cloudfront.net", "akamai.net", "akamaiedge.net", "edgesuite.net",
  "fastly.net", "cloudflare.com", "cloudflare.net",
  "appsflyer.com", "adjust.com", "branch.io",
  "firebase.com", "firebaseio.com", "firebase.google.com",
  "crashlytics.com", "sentry.io", "bugsnag.com",
  "google-analytics.com", "googleapis.com", "googletagmanager.com"
];

var PUBG_DOMAINS = [
  "pubgmobile.com",
  "support.pubgmobile.com",
  "esports.pubgmobile.com",
  "pubgmobile.helpshift.com",
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
    if (
      h.length > d.length &&
      h.charAt(h.length - d.length - 1) === "." &&
      h.slice(h.length - d.length) === d
    ) return true;
  }
  return false;
}

function isAntiCheat(host) {
  return hostMatchesDomainList(host, ANTICHEAT_DOMAINS);
}

function isCDN(host) {
  return hostMatchesDomainList(host, CDN_DOMAINS);
}

function isPUBGDomain(host) {
  return hostMatchesDomainList(host, PUBG_DOMAINS);
}

// ———————————————————————
// OUTSIDE HINTS
// ———————————————————————
var OUTSIDE_HINTS = [
  ".sg.", ".jp.", ".de.", ".fr.", ".nl.", ".uk.", ".us.", ".in.", ".br.",
  ".eg.", ".sy.", ".iq.", ".ly.", ".af.", ".pk.",
  "singapore", "tokyo", "frankfurt", "london", "paris", "mumbai",
  "virginia", "oregon", "sao-paulo", "dubai", "me-central", "eu-west",
  "ap-northeast", "ap-southeast", "us-east", "us-west",
  "egypt", "egy", "cairo",
  "syria", "syrian", "damascus",
  "iraq", "irq", "baghdad",
  "libya", "lby", "tripoli",
  "afghanistan", "afg", "kabul",
  "pakistan", "pak", "islamabad", "karachi", "lahore"
];

function hasOutsideHint(host) {
  var h = host.toLowerCase();
  for (var i = 0; i < OUTSIDE_HINTS.length; i++) {
    if (h.indexOf(OUTSIDE_HINTS[i]) !== -1) return true;
  }
  return false;
}

// ———————————————————————
// URL / TRAFFIC CLASSIFICATION
// ———————————————————————
function extractPort(url) {
  try {
    var m = url.match(/^[a-z]+:\/\/[^\/:]+:(\d{1,5})/i);
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

function portInList(port, list) {
  for (var i = 0; i < list.length; i++) {
    if (port === list[i]) return true;
  }
  return false;
}

var MATCH_PREFIXES = [
  "gs", "gsvr", "bsvr", "gamesvr", "gamesrv", "svr", "srv",
  "relay", "battle", "match", "realtime", "rt", "udp", "tcp",
  "gs1", "gs2", "gs3", "gs4", "gs5", "tdm", "arcade", "arena",
  "combat", "payload", "infection", "metro", "training",
  "ranked", "classic", "war", "survive", "teamdeathmatch"
];

var LOBBY_PREFIXES = [
  "login", "auth", "account", "user", "profile", "lobby",
  "gate", "gateway", "session", "region", "api", "store", "shop",
  "social", "friend", "friends", "clan", "guild", "chat", "config",
  "update", "patch", "news", "event", "asset", "version",
  "matchmak", "queue", "notification", "rank", "mission", "reward",
  "achievement", "leaderboard", "royalpass", "rp", "season",
  "inventory", "support", "recruit", "recruitment", "team", "invite",
  "party", "group", "follow", "mail", "msg", "community"
];

var STRICT_MATCH_PORTS = [
  7001, 7002, 7003, 7004, 7005,
  7086, 7087,
  8001, 8002, 8011, 8085, 8090,
  10012, 10013, 10039, 10096,
  12070, 12071, 12072,
  13004, 13005,
  15001, 15002,
  20000, 20001, 20002, 20003, 20004
];

var STRICT_MATCH_HINTS = [
  "/match", "/battle", "/relay", "/realtime", "/gs", "/gamesvr",
  "/arena", "/tdm", "/payload", "/infection", "/metro",
  "/training", "/ranked", "/classic", "/war", "/survive"
];

var STRICT_LOBBY_HINTS = [
  "/lobby", "/login", "/auth", "/account", "/profile",
  "/friend", "/friends", "/social", "/clan", "/guild", "/chat",
  "/recruit", "/recruitment", "/invite", "/party", "/team",
  "/group", "/rank", "/season", "/rp", "/royalpass",
  "/inventory", "/reward", "/mission", "/leaderboard",
  "/event", "/notice", "/mail", "/shop", "/store", "/support"
];

function classifyTraffic(url, host) {
  var port = extractPort(url);
  var h    = host.toLowerCase();
  var dot  = h.indexOf(".");
  var sub  = dot !== -1 ? h.slice(0, dot) : h;
  var u    = url.toLowerCase();

  if (portInList(port, STRICT_MATCH_PORTS)) return "match";
  if (port >= 7000  && port <= 7099)  return "match";
  if (port >= 8000  && port <= 8999)  return "match";
  if (port >= 10000 && port <= 19999) return "match";
  if (port >= 20000 && port <= 39999) return "match";

  for (var i = 0; i < MATCH_PREFIXES.length; i++) {
    var p = MATCH_PREFIXES[i];
    if (sub === p || sub.indexOf(p) === 0) return "match";
  }
  for (var j = 0; j < LOBBY_PREFIXES.length; j++) {
    var lp = LOBBY_PREFIXES[j];
    if (sub === lp || sub.indexOf(lp) === 0) return "lobby";
  }

  if (containsAny(u, STRICT_MATCH_HINTS)) return "match";
  if (containsAny(u, STRICT_LOBBY_HINTS)) return "lobby";

  return "general";
}

// ———————————————————————
// ROUTING LOGIC — FLEXIBLE LOBBY
// ———————————————————————
function routeJordanPriorityPUBG(url, host) {
  var h = host.toLowerCase();

  // غير PUBG = مباشر
  if (!isPUBGDomain(h)) return DIRECT;

  // Anti-cheat = مباشر (لا تلمسه)
  if (isAntiCheat(h)) return DIRECT;

  // CDN = مباشر
  if (isCDN(h)) return DIRECT;

  // إذا فيه إشارة لسيرفر خارجي = حظر
  if (hasOutsideHint(h)) return BLOCK;

  var trafficType = classifyTraffic(url, h);

  // ——— اللوبي مرن: يمشي عبر البروكسي بغض النظر عن الـ IP ———
  // سيرفرات الـ login/session/matchmaking queue لا تكون بالضرورة على IPs أردنية
  if (trafficType === "lobby") return PROXY;

  // ——— الـ match وما تبقى: نفحص الـ IP ———
  var addrs = resolveHostBoth(h);
  var ipv4 = addrs.ipv4;
  var ipv6 = addrs.ipv6;

  if (!ipv4 && !ipv6) return BLOCK;

  if (ipv4 && isBlockedIPv4(ipv4)) ipv4 = null;
  if (ipv6 && isBlockedIPv6(ipv6)) ipv6 = null;
  if (!ipv4 && !ipv6) return BLOCK;

  var jordanV4 = (ipv4 && isJordanIPv4(ipv4));
  var jordanV6 = (ipv6 && isJordanIPv6(ipv6));

  if (jordanV4 || jordanV6) return PROXY2;

  // match على IP إقليمي غير أردني — مرّره عبر PROXY2
  return PROXY2;
}

// ———————————————————————
// MAIN ENTRY POINT
// ———————————————————————
function FindProxyForURL(url, host) {
  if (!host) return DIRECT;
  if (isPlainHostName(host)) return DIRECT;

  var h = host.toLowerCase();
  if (shExpMatch(h, "*.local") || h === "localhost") return DIRECT;

  return routeJordanPriorityPUBG(url, h);
}
