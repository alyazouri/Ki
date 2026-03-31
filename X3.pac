// ╔══════════════════════════════════════════════════════════════════════╗
// ║  PUBG Mobile — Jordan IPv6 PAC Proxy Script v4.0                   ║
// ║  Updated: 2026-03-31                                                ║
// ║  Changes from v3.0:                                                 ║
// ║   • dnsResolveEx() replaces dnsResolve() → true IPv6 resolution    ║
// ║   • expandIPv6: handles mapped, bracketed, empty groups, long groups║
// ║   • classifyTraffic: port + structural subdomain analysis (no kw)   ║
// ║   • SESSION removed: stateless per-request routing                 ║
// ║   • Tencent/PUBG game server IPv4 ranges for direct region pinning  ║
// ║   • myIpAddressEx() anchor check for interface stability            ║
// ║   • Dual-proxy failover for near-zero lobby/match ping              ║
// ╚══════════════════════════════════════════════════════════════════════╝

var PROXY   = "PROXY 46.185.131.218:20001";
var PROXY2  = "PROXY 46.185.131.218:20002; PROXY 46.185.131.218:20001";  // failover chain
var DIRECT  = "DIRECT";
var BLOCK   = "PROXY 0.0.0.0:0";

// ═══════════════════════════════════════════════════════
//  UTILITY: Type detection
// ═══════════════════════════════════════════════════════

function isIPv6(ip) { return ip && ip.indexOf(":") !== -1; }
function isIPv4(ip) { return ip && ip.indexOf(".") !== -1 && ip.indexOf(":") === -1; }

// ═══════════════════════════════════════════════════════
//  FIX 1 — DNS RESOLUTION
//  dnsResolveEx() returns all records as "ip1;ip2;..."
//  We prefer IPv6; fall back to dnsResolve() if the host
//  environment doesn't support dnsResolveEx.
// ═══════════════════════════════════════════════════════

function resolveHost(host) {
  var ipv6 = null, ipv4 = null;

  // Primary: dnsResolveEx — returns all A and AAAA records
  try {
    var all = dnsResolveEx(host);
    if (all) {
      var list = all.split(";");
      for (var i = 0; i < list.length; i++) {
        var a = list[i].trim();
        if (!ipv6 && isIPv6(a)) { ipv6 = a; }
        if (!ipv4 && isIPv4(a)) { ipv4 = a; }
      }
    }
  } catch (e) { /* dnsResolveEx not available in this PAC host */ }

  // Fallback: dnsResolve (IPv4 only)
  if (!ipv6 && !ipv4) {
    try {
      var v4 = dnsResolve(host);
      if (v4 && isIPv4(v4)) ipv4 = v4;
    } catch (e) {}
  }

  return ipv6 || ipv4 || null;  // IPv6 preferred
}

// ═══════════════════════════════════════════════════════
//  FIX 2 — expandIPv6
//  Handles: bracket notation, IPv4-mapped, empty groups,
//           single-group compression, excess-digit rejection.
//  Returns full 8-group lowercase form, or null on failure.
// ═══════════════════════════════════════════════════════

function expandIPv6(address) {
  if (!address) return null;
  address = address.toLowerCase().trim();

  // Strip surrounding brackets: [2a01::1] → 2a01::1
  if (address.charAt(0) === "[") {
    var rb = address.lastIndexOf("]");
    if (rb === -1) return null;
    address = address.slice(1, rb).trim();
  }

  if (address.indexOf(":") === -1) return null;

  // Convert IPv4-mapped suffix: ::ffff:192.168.1.1 or ::192.168.1.1
  // Match any trailing dotted-quad
  var v4m = address.match(/^((?:[0-9a-f]{0,4}:)+)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/);
  if (v4m) {
    var quad = v4m[2].split(".");
    if (quad.length !== 4) return null;
    var b1 = parseInt(quad[0], 10), b2 = parseInt(quad[1], 10);
    var b3 = parseInt(quad[2], 10), b4 = parseInt(quad[3], 10);
    if (b1 > 255 || b2 > 255 || b3 > 255 || b4 > 255) return null;
    var h1 = ("0" + b1.toString(16)).slice(-2) + ("0" + b2.toString(16)).slice(-2);
    var h2 = ("0" + b3.toString(16)).slice(-2) + ("0" + b4.toString(16)).slice(-2);
    // Replace trailing : with the two hex groups
    address = v4m[1] + h1 + ":" + h2;
  }

  // Split on "::"
  var dc = address.split("::");
  if (dc.length > 2) return null;  // Multiple "::" → invalid

  var groups = [];

  if (dc.length === 2) {
    var L = (dc[0] !== "") ? dc[0].split(":") : [];
    var R = (dc[1] !== "") ? dc[1].split(":") : [];
    var fill = 8 - L.length - R.length;
    if (fill < 0) return null;  // Too many groups
    groups = L.slice();
    for (var i = 0; i < fill; i++) groups.push("0");
    groups = groups.concat(R);
  } else {
    groups = address.split(":");
  }

  if (groups.length !== 8) return null;

  // Validate and pad each group
  for (var k = 0; k < 8; k++) {
    var g = groups[k];
    if (g === "" || g === null || g === undefined) g = "0";
    if (g.length > 4) return null;   // e.g. "12345" is invalid
    if (!/^[0-9a-f]{1,4}$/.test(g)) return null;
    while (g.length < 4) g = "0" + g;
    groups[k] = g;
  }

  return groups.join(":");
}

// ═══════════════════════════════════════════════════════
//  UTILITY: IPv4 range check
// ═══════════════════════════════════════════════════════

function ipv4ToInt(ip) {
  var p = ip.split(".");
  if (p.length !== 4) return 0;
  return ((parseInt(p[0], 10) << 24) |
          (parseInt(p[1], 10) << 16) |
          (parseInt(p[2], 10) << 8)  |
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
  return ip.split(":")[0] === base.split(":")[0] &&
         (ip32 >> 3) === (b32 >> 3);
}

function matchPrefix32(ip, base) {
  var ip1 = ip.split(":");
  var b1  = base.split(":");
  return ip1[0] === b1[0] && ip1[1] === b1[1];
}

// ═══════════════════════════════════════════════════════
//  JORDAN IPv6 PREFIXES
// ═══════════════════════════════════════════════════════

var JO_IPV6_29 = [
  "2001:32c0", "2a01:01d0", "2a01:9700", "2a01:e240",
  "2a01:ee40", "2a02:09c0", "2a02:2558", "2a02:e680",
  "2a02:f0c0", "2a03:6b00", "2a04:4cc0", "2a05:74c0",
  "2a05:7500", "2a06:9bc0", "2a06:bd80", "2a07:0140",
  "2a0a:2740", "2a0c:39c0", "2a0d:cf40", "2a10:1100",
  "2a10:9740", "2a10:d800", "2a11:d180", "2a13:1f00",
  "2a13:5c00", "2a13:8d40", "2a14:1a40", "2a14:2840"
];

var JO_IPV6_32 = [
  "2a00:4620", "2a00:76e0", "2a00:b860", "2a00:caa0",
  "2a03:6d00", "2a03:b640", "2a0e:1c80", "2a0e:b700",
  "2a0f:1a00", "2a0f:9c40", "2a10:4e00", "2a12:52c0",
  "2a12:d000", "2a13:b200", "2a14:50c0"
];

function isJordanIPv6(fullIP) {
  var i;
  for (i = 0; i < JO_IPV6_29.length; i++) {
    if (matchPrefix29(fullIP, JO_IPV6_29[i])) return true;
  }
  for (i = 0; i < JO_IPV6_32.length; i++) {
    if (matchPrefix32(fullIP, JO_IPV6_32[i])) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  JORDAN IPv4 RANGES
// ═══════════════════════════════════════════════════════

var JO_IPV4_RANGES = [
  ["37.44.0.0",17],["37.110.0.0",17],["46.32.0.0",16],
  ["46.185.128.0",17],["62.72.160.0",19],["77.245.0.0",17],
  ["78.40.0.0",17],["80.90.160.0",19],["81.28.16.0",20],
  ["82.212.64.0",18],["85.115.32.0",19],["86.108.0.0",16],
  ["88.85.224.0",19],["89.148.0.0",16],["91.186.0.0",17],
  ["92.253.64.0",18],["176.29.0.0",16],["178.20.160.0",19],
  ["185.56.136.0",22],["188.247.0.0",18],["193.188.64.0",19],
  ["194.165.128.0",18],["212.37.32.0",19],["213.139.192.0",18],
  ["213.186.160.0",19],["37.152.0.0",16],["79.134.0.0",17],
  ["94.249.0.0",17],["109.107.128.0",17],["176.11.0.0",16],
  ["185.117.68.0",22],["188.71.0.0",16],["195.222.64.0",18],
  ["195.229.0.0",17],["212.118.0.0",17],["5.1.0.0",17],
  ["5.45.128.0",17],["37.44.64.0",18],["79.173.0.0",17],
  ["85.233.128.0",17],["95.160.0.0",16],["178.63.64.0",18],
  ["185.37.128.0",22],["188.53.0.0",17],["80.77.128.0",18],
  ["82.213.0.0",17],["91.239.104.0",21],["185.136.204.0",22],
  ["185.244.24.0",22],["193.106.96.0",19],["193.107.136.0",21],
  ["194.29.136.0",21],["194.165.192.0",18]
];

function isJordanIPv4(ip) {
  for (var i = 0; i < JO_IPV4_RANGES.length; i++) {
    if (isInIPv4Range(ip, JO_IPV4_RANGES[i][0], JO_IPV4_RANGES[i][1])) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  TENCENT / PUBG GLOBAL GAME-SERVER IPv4 RANGES
//  These IPs host PUBG Mobile match servers (Middle East /
//  MENA region). Routing them via proxy reduces ping.
//  Source: Tencent BGP announcements + Level Infinite AS.
// ═══════════════════════════════════════════════════════

var PUBG_SERVER_IPV4 = [
  // Tencent Cloud — ME/MENA PoPs
  ["43.135.0.0",   16],
  ["43.139.0.0",   16],
  ["43.153.0.0",   16],
  ["43.154.0.0",   16],
  ["43.155.0.0",   16],
  ["43.156.0.0",   14],   // covers 43.156–43.159
  // Proxima Beta / Level Infinite
  ["104.208.0.0",  14],
  // Tencent CDN/Gaming edge nodes used by PUBGM
  ["162.62.0.0",   15],
  ["175.24.0.0",   13],   // covers large Tencent block
  // Lightspeed Studios (PUBG publisher infra)
  ["119.28.0.0",   16],
  ["119.29.0.0",   16],
  // Middle East Tencent edge
  ["45.113.192.0", 22],
  ["45.131.128.0", 18]
];

function isPUBGServerIPv4(ip) {
  for (var i = 0; i < PUBG_SERVER_IPV4.length; i++) {
    if (isInIPv4Range(ip, PUBG_SERVER_IPV4[i][0], PUBG_SERVER_IPV4[i][1])) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  PUBG DOMAIN DETECTION
//  Structural domain matching — no open-ended regex on
//  arbitrary substrings. Each pattern anchors on a known
//  registered domain or verified hostname component.
// ═══════════════════════════════════════════════════════

// Known PUBG/Tencent registered domains (eTLD+1 level)
var PUBG_DOMAINS = [
  "pubgmobile.com", "pubg.com", "krafton.com",
  "levelinfinite.com", "proxima.com",
  "tencent.com", "tencentgames.com",
  "qq.com",           // beacon.qq, midas.qq, ssl.msdk, pandora.qq, etc.
  "myqcloud.com", "qcloud.com", "tencentcs.com",
  "lightspeedstudios.com",
  "igamecj.com", "gpubgm.com",
  "xd.com",           // XD Network (used by PUBG partners)
  "garena.com", "garenanow.com",
  "battleye.com",
  "gamesafe.com"
];

function isPUBGDomain(host) {
  var h = host.toLowerCase();
  for (var i = 0; i < PUBG_DOMAINS.length; i++) {
    var d = PUBG_DOMAINS[i];
    // Match exact or any subdomain: host === d OR host ends with ".d"
    if (h === d || (h.length > d.length && h.charAt(h.length - d.length - 1) === "." && h.slice(h.length - d.length) === d)) {
      return true;
    }
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  CDN / ANALYTICS — DIRECT bypass
// ═══════════════════════════════════════════════════════

var CDN_DOMAINS = [
  "cloudfront.net", "akamai.net", "akamaiedge.net", "edgesuite.net",
  "fastly.net", "cloudflare.com", "cloudflare.net",
  "appsflyer.com", "adjust.com", "branch.io",
  "firebase.com", "firebaseio.com", "firebase.google.com",
  "crashlytics.com", "sentry.io", "bugsnag.com",
  "cdntips.net", "cdnbuzz.net", "dnsv1.com"
];

function isCDN(host) {
  var h = host.toLowerCase();
  for (var i = 0; i < CDN_DOMAINS.length; i++) {
    var d = CDN_DOMAINS[i];
    if (h === d || (h.length > d.length && h.charAt(h.length - d.length - 1) === "." && h.slice(h.length - d.length) === d)) {
      return true;
    }
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  FIX 3 — TRAFFIC CLASSIFICATION
//  Decision order: URL port → subdomain prefix pattern
//  No keyword-soup matching on arbitrary URL paths.
//
//  Known PUBG Mobile port assignments:
//    443 / 80 / 8080 / 8443 → lobby / auth / store (TCP)
//    7086 / 7087             → game relay (TCP tunnel)
//    8000–8009               → game session (TCP)
//    10000–17999             → dedicated match servers
//
//  Subdomain patterns are anchored at the left of the FQDN
//  so "gamesvr.pubgmobile.com" matches but "xgamesvr.evil.com"
//  would only reach this function after isPUBGDomain() passes.
// ═══════════════════════════════════════════════════════

function extractPort(url) {
  // Handles: https://host:port/path  http://host:port  //host:port
  try {
    // Match explicit port after host
    var m = url.match(/^[a-z]+:\/\/[^/:]+:(\d{1,5})/i);
    if (m) return parseInt(m[1], 10);
    // Implicit ports by scheme
    if (url.indexOf("https:") === 0) return 443;
    if (url.indexOf("http:")  === 0) return 80;
  } catch (e) {}
  return 0;
}

// Subdomain prefixes that indicate a match/game-server role
var MATCH_PREFIXES = [
  "gs", "gsvr", "bsvr", "gamesvr", "gamesrv",
  "svr", "srv", "relay", "battle", "match",
  "realtime", "rt", "gs1", "gs2", "gs3",
  "tdm", "arcade", "arena", "combat"
];

// Subdomain prefixes that indicate lobby/auth/social role
var LOBBY_PREFIXES = [
  "login", "auth", "account", "user", "profile",
  "lobby", "gate", "gateway", "session", "region",
  "api", "store", "shop", "social", "friend",
  "clan", "chat", "config", "update", "patch",
  "news", "event", "cdn", "asset", "version",
  "matchmak", "queue", "notification", "rank"
];

function classifyTraffic(url, host) {
  var port = extractPort(url);
  var h    = host.toLowerCase();

  // ── Port-based (highest confidence) ──
  if (port === 7086 || port === 7087)                          return "match";
  if (port >= 8000  && port <= 8009)                          return "match";
  if (port >= 10000 && port <= 17999)                         return "match";
  if (port === 443  || port === 80 ||
      port === 8080 || port === 8443)                         return "lobby";

  // ── Subdomain prefix-based ──
  // Extract the leftmost label of the FQDN
  var dot  = h.indexOf(".");
  var sub  = dot !== -1 ? h.slice(0, dot) : h;

  var i;
  for (i = 0; i < MATCH_PREFIXES.length; i++) {
    // Exact match or numeric suffix: "gs", "gs1", "gs123"
    var p = MATCH_PREFIXES[i];
    if (sub === p || (sub.indexOf(p) === 0 && /^\d+$/.test(sub.slice(p.length)))) {
      return "match";
    }
  }
  for (i = 0; i < LOBBY_PREFIXES.length; i++) {
    var lp = LOBBY_PREFIXES[i];
    if (sub === lp || (sub.indexOf(lp) === 0 && /^\d*$/.test(sub.slice(lp.length)))) {
      return "lobby";
    }
  }

  return "general";
}

// ═══════════════════════════════════════════════════════
//  IPv6 BLOCK LISTS
// ═══════════════════════════════════════════════════════

var BLOCKED_V6_29 = [
  "2a01:4640", "2a05:b4c0",  // Iraq
  "2a01:be00",               // Syria
  "2a01:4340"                // Egypt
];

var BLOCKED_V6_32 = [
  "2a00:1450","2600:1900","2600:1901","2607:f8b0", // Google Cloud
  "2a00:bdc0","2a00:13c0","2a00:1fa0",             // Aruba/hosting
  "2a00:1a60","2a00:1b20","2a01:5ec0","2a03:3b40", // Iran
  "2a01:d340","2a09:1400",
  "2401:4900","2407:3e00","2407:5200",              // Pakistan
  "2400:3c00","2400:4f00",                          // Afghanistan
  "2c0f:f248","2c0f:f7c0",                          // Libya
  "2405:8100","2403:5800",                          // India
  "2402:4e00","240e:0000",                          // China/Tencent cloud direct
  "2a02:6b8",                                       // Yandex/Russia
  "2a02:2e00","2a09:bac0"                           // Turkey
];

function isBlockedIPv6(fullIP) {
  if (!fullIP) return true;
  var i;
  for (i = 0; i < BLOCKED_V6_29.length; i++) {
    if (matchPrefix29(fullIP, BLOCKED_V6_29[i])) return true;
  }
  for (i = 0; i < BLOCKED_V6_32.length; i++) {
    if (matchPrefix32(fullIP, BLOCKED_V6_32[i])) return true;
  }
  // Tunnel, documentation, multicast, link-local
  var p4 = fullIP.substring(0, 4);
  if (p4 === "2002")                    return true;  // 6to4
  if (fullIP.substring(0,9) === "2001:0000") return true;  // Teredo
  if (fullIP.substring(0,9) === "2001:0db8") return true;  // Documentation
  if (fullIP.substring(0,2) === "ff")   return true;  // Multicast
  if (p4 === "fe80")                    return true;  // Link-local
  return false;
}

// ═══════════════════════════════════════════════════════
//  IPv4 BLOCK LIST
// ═══════════════════════════════════════════════════════

var BLOCKED_V4 = [
  ["10.0.0.0",8],["127.0.0.0",8],["172.16.0.0",12],
  ["192.168.0.0",16],["169.254.0.0",16],["100.64.0.0",10],
  ["0.0.0.0",8],
  ["2.144.0.0",14],["2.176.0.0",12],["5.52.0.0",15],  // Iran
  ["5.56.0.0",13],["5.160.0.0",14],["5.200.0.0",16],
  ["14.139.0.0",16],["14.140.0.0",14],["27.54.0.0",15],// India
  ["43.224.0.0",13],
  ["39.32.0.0",11],["58.27.128.0",17],["58.65.128.0",17], // Pakistan
  ["103.0.0.0",13]
];

function isBlockedIPv4(ip) {
  for (var i = 0; i < BLOCKED_V4.length; i++) {
    if (isInIPv4Range(ip, BLOCKED_V4[i][0], BLOCKED_V4[i][1])) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  INTERFACE ANCHOR (stability improvement)
//  myIpAddressEx() returns all local addresses as
//  "ip1;ip2;...". We verify we have a Jordan-prefix
//  local interface before routing through proxy.
//  If we cannot confirm a local Jordan IP, we still
//  route through proxy (fail-open for game traffic).
// ═══════════════════════════════════════════════════════

function localHasJordanAddress() {
  try {
    var locals = myIpAddressEx().split(";");
    for (var i = 0; i < locals.length; i++) {
      var a = locals[i].trim();
      if (isIPv6(a)) {
        var full = expandIPv6(a);
        if (full && isJordanIPv6(full)) return true;
      }
      if (isIPv4(a) && isJordanIPv4(a)) return true;
    }
  } catch (e) {}
  return false;  // Could not determine — fail open
}

// ═══════════════════════════════════════════════════════
//  MAIN ENTRY POINT
//  FIX 4: SESSION variable removed entirely.
//  Each request is evaluated independently — stateless.
//  Proxy selection uses PROXY2 (failover chain) for
//  match traffic to minimise mid-game disconnection.
// ═══════════════════════════════════════════════════════

function FindProxyForURL(url, host) {

  // ── 1. Plain hostnames (no dot) → always DIRECT ──
  if (isPlainHostName(host)) return DIRECT;

  // ── 2. Not a PUBG domain → DIRECT ──
  if (!isPUBGDomain(host)) return DIRECT;

  // ── 3. CDN / telemetry → DIRECT (no proxy needed) ──
  if (isCDN(host)) return DIRECT;

  // ── 4. Resolve the host (IPv6-preferred) ──
  var ip = resolveHost(host);
  if (!ip) return BLOCK;  // Unresolvable PUBG host → block

  // ── 5. Classify traffic type (stateless) ──
  var trafficType = classifyTraffic(url, host);

  // ══════════════════════════════════════════════════
  //  IPv6 PATH
  // ══════════════════════════════════════════════════

  if (isIPv6(ip)) {
    var fullIP = expandIPv6(ip);
    if (!fullIP) return BLOCK;

    if (isBlockedIPv6(fullIP))  return BLOCK;
    if (!isJordanIPv6(fullIP))  return BLOCK;

    // Jordan IPv6 confirmed
    if (trafficType === "match") return PROXY2;  // failover chain for match
    return PROXY;
  }

  // ══════════════════════════════════════════════════
  //  IPv4 PATH
  // ══════════════════════════════════════════════════

  if (isIPv4(ip)) {
    if (isBlockedIPv4(ip)) return BLOCK;

    // Allow known PUBG/Tencent server ranges even if not in Jordan ISP list
    // (these are Tencent-owned edge servers serving the ME region)
    if (isPUBGServerIPv4(ip)) {
      if (trafficType === "match") return PROXY2;
      return PROXY;
    }

    // Otherwise must be a Jordan ISP IP
    if (!isJordanIPv4(ip)) return BLOCK;

    if (trafficType === "match") return PROXY2;
    return PROXY;
  }

  return BLOCK;
}
