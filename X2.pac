// ╔══════════════════════════════════════════════════════════════════════╗
// ║  PUBG Mobile — Jordan IPv6 PAC Proxy Script v3.0                   ║
// ║  Updated: 2026-03-31                                                ║
// ║  Features:                                                          ║
// ║   • Full Jordan IPv6 prefix database (RIPE NCC 2025/2026)          ║
// ║   • Expanded PUBG domain/hostname detection                         ║
// ║   • Hardened block list (unwanted countries + cloud infra)          ║
// ║   • Session locking: ISP /32 → Lobby /48 → Match /64              ║
// ║   • IPv4 support with Jordan ASN ranges                            ║
// ║   • CDN & analytics bypass                                         ║
// ║   • Timeout & anti-spoof protections                               ║
// ╚══════════════════════════════════════════════════════════════════════╝

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ═══════════════════════════════════════════════════════
//  SESSION STATE — locks network identity per phase
// ═══════════════════════════════════════════════════════

var SESSION = {
  ispNet:       null,   // /32 ISP anchor (first 2 hex groups)
  lobbyNet:     null,   // /48 lobby anchor (first 3 hex groups)
  matchNet:     null,   // /64 match anchor (first 4 hex groups)
  inMatch:      false,
  lastActivity: 0       // timestamp for session timeout
};

var SESSION_TIMEOUT_MS = 30 * 60 * 1000;  // 30-minute idle timeout

// ═══════════════════════════════════════════════════════
//  UTILITY: IPv6 detection
// ═══════════════════════════════════════════════════════

function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

// ═══════════════════════════════════════════════════════
//  UTILITY: IPv4 detection
// ═══════════════════════════════════════════════════════

function isIPv4(ip) {
  return ip && ip.indexOf(".") !== -1 && ip.indexOf(":") === -1;
}

// ═══════════════════════════════════════════════════════
//  UTILITY: Expand IPv6 to full 8-group form
// ═══════════════════════════════════════════════════════

function expandIPv6(address) {
  if (!address || address.indexOf(":") === -1) return address;

  // Handle IPv4-mapped IPv6 (e.g., ::ffff:1.2.3.4)
  var v4idx = address.lastIndexOf(".");
  if (v4idx !== -1) {
    // Contains IPv4 portion — treat as IPv4
    return null;
  }

  var parts = address.split("::");
  var full  = [];

  if (parts.length === 2) {
    var left  = parts[0] ? parts[0].split(":") : [];
    var right = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);

    full = left.slice(0);
    for (var i = 0; i < missing; i++) full.push("0000");
    for (var j = 0; j < right.length; j++) full.push(right[j]);
  } else if (parts.length === 1) {
    full = address.split(":");
  } else {
    // Malformed address — more than one "::"
    return null;
  }

  // Validate: must have exactly 8 groups
  if (full.length !== 8) return null;

  for (var k = 0; k < full.length; k++) {
    // Pad each group to 4 hex digits
    while (full[k].length < 4) full[k] = "0" + full[k];
    // Validate hex
    if (!/^[0-9a-fA-F]{4}$/.test(full[k])) return null;
  }

  return full.join(":").toLowerCase();
}

// ═══════════════════════════════════════════════════════
//  UTILITY: Parse IPv4 to integer for range checks
// ═══════════════════════════════════════════════════════

function ipv4ToInt(ip) {
  var parts = ip.split(".");
  if (parts.length !== 4) return 0;
  return ((parseInt(parts[0], 10) << 24) |
          (parseInt(parts[1], 10) << 16) |
          (parseInt(parts[2], 10) << 8)  |
           parseInt(parts[3], 10)) >>> 0;
}

function isInIPv4Range(ip, network, prefixLen) {
  var ipInt  = ipv4ToInt(ip);
  var netInt = ipv4ToInt(network);
  var mask   = prefixLen === 0 ? 0 : (0xFFFFFFFF << (32 - prefixLen)) >>> 0;
  return (ipInt & mask) === (netInt & mask);
}

// ═══════════════════════════════════════════════════════
//  IPv6 PREFIX MATCHING — efficient /29, /32 checks
// ═══════════════════════════════════════════════════════

function matchPrefix29(ip, base) {
  // /29 = first 29 bits → first group exact + second group top 13 bits
  // Practically: base prefix like "2a01:9700" covers 2a01:9700-9707
  // We check: first group matches AND second group >> 3 matches
  var ipParts   = ip.split(":");
  var baseParts = base.split(":");
  if (ipParts[0] !== baseParts[0]) return false;
  var ipG2   = parseInt(ipParts[1], 16);
  var baseG2 = parseInt(baseParts[1], 16);
  return (ipG2 >> 3) === (baseG2 >> 3);
}

function matchPrefix32(ip, base) {
  // /32 = exact match of first 2 groups
  var ipParts   = ip.split(":");
  var baseParts = base.split(":");
  return ipParts[0] === baseParts[0] && ipParts[1] === baseParts[1];
}

// ═══════════════════════════════════════════════════════
//  JORDAN IPv6 PREFIX DATABASE
//  Source: RIPE NCC allocations for JO (CC=JO)
//  Last updated: 2026-03-31
// ═══════════════════════════════════════════════════════

// /29 prefixes (covers 8 consecutive /32s each)
var JO_IPV6_29 = [
  "2001:32c0",  // VTEL / Jordan Data Communications
  "2a01:01d0",  // Jordan Telecom (Orange)
  "2a01:9700",  // Orange Jordan (mobile)
  "2a01:e240",  // Zain Jordan
  "2a01:ee40",  // Umniah
  "2a02:09c0",  // BATELCO Jordan
  "2a02:2558",  // Zain Jordan (additional)
  "2a02:e680",  // Jordan ISP
  "2a02:f0c0",  // Jordan ISP
  "2a03:6b00",  // Umniah (additional)
  "2a04:4cc0",  // Jordan ISP
  "2a05:74c0",  // Jordan ISP
  "2a05:7500",  // Jordan ISP
  "2a06:9bc0",  // Jordan ISP
  "2a06:bd80",  // Jordan ISP (2025 allocation)
  "2a07:0140",  // Jordan ISP
  "2a0a:2740",  // Jordan ISP
  "2a0c:39c0",  // Jordan ISP
  "2a0d:cf40",  // Jordan ISP
  "2a10:1100",  // Jordan ISP
  "2a10:9740",  // Jordan ISP
  "2a10:d800",  // Jordan ISP
  "2a11:d180",  // Jordan ISP
  "2a13:1f00",  // Jordan ISP
  "2a13:5c00",  // Jordan ISP
  "2a13:8d40",  // Jordan ISP
  "2a14:1a40",  // Jordan ISP
  "2a14:2840"   // Jordan ISP
];

// /32 prefixes (exact 2-group match)
var JO_IPV6_32 = [
  "2a00:4620",  // Jordan Telecom
  "2a00:76e0",  // Jordan Telecom
  "2a00:b860",  // Jordan ISP
  "2a00:caa0",  // Jordan ISP
  "2a03:6d00",  // Umniah (additional /32)
  "2a03:b640",  // Orbitel Jordan
  // ── 2025/2026 new allocations ──
  "2a0e:1c80",  // New JO allocation 2025
  "2a0e:b700",  // New JO allocation 2025
  "2a0f:1a00",  // New JO allocation 2025
  "2a0f:9c40",  // New JO allocation 2025
  "2a10:4e00",  // New JO allocation 2025
  "2a12:52c0",  // New JO allocation 2025
  "2a12:d000",  // New JO allocation 2025
  "2a13:b200",  // New JO allocation 2026
  "2a14:50c0"   // New JO allocation 2026
];

function isJordanIPv6(ip) {
  var fullIP = expandIPv6(ip);
  if (!fullIP) return false;

  var i;
  // Check /29 prefixes
  for (i = 0; i < JO_IPV6_29.length; i++) {
    if (matchPrefix29(fullIP, JO_IPV6_29[i])) return true;
  }
  // Check /32 prefixes
  for (i = 0; i < JO_IPV6_32.length; i++) {
    if (matchPrefix32(fullIP, JO_IPV6_32[i])) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  JORDAN IPv4 RANGES (major ISPs)
//  Orange JO, Zain JO, Umniah, VTEL, Batelco JO
// ═══════════════════════════════════════════════════════

var JO_IPV4_RANGES = [
  // Orange Jordan
  ["37.44.0.0",     17],
  ["37.110.0.0",    17],
  ["46.32.0.0",     16],
  ["46.185.128.0",  17],
  ["62.72.160.0",   19],
  ["77.245.0.0",    17],
  ["78.40.0.0",     17],
  ["80.90.160.0",   19],
  ["81.28.16.0",    20],
  ["82.212.64.0",   18],
  ["85.115.32.0",   19],
  ["86.108.0.0",    16],
  ["88.85.224.0",   19],
  ["89.148.0.0",    16],
  ["91.186.0.0",    17],
  ["92.253.64.0",   18],
  ["176.29.0.0",    16],
  ["178.20.160.0",  19],
  ["185.56.136.0",  22],
  ["188.247.0.0",   18],
  ["193.188.64.0",  19],
  ["194.165.128.0", 18],
  ["212.37.32.0",   19],
  ["213.139.192.0", 18],
  ["213.186.160.0", 19],

  // Zain Jordan
  ["37.152.0.0",    16],
  ["79.134.0.0",    17],
  ["94.249.0.0",    17],
  ["109.107.128.0", 17],
  ["176.11.0.0",    16],
  ["185.117.68.0",  22],
  ["188.71.0.0",    16],
  ["195.222.64.0",  18],
  ["195.229.0.0",   17],
  ["212.118.0.0",   17],

  // Umniah
  ["5.1.0.0",       17],
  ["5.45.128.0",    17],
  ["37.44.64.0",    18],
  ["79.173.0.0",    17],
  ["85.233.128.0",  17],
  ["95.160.0.0",    16],
  ["178.63.64.0",   18],
  ["185.37.128.0",  22],
  ["188.53.0.0",    17],

  // VTEL / JTC / Others
  ["80.77.128.0",   18],
  ["82.213.0.0",    17],
  ["91.239.104.0",  21],
  ["185.136.204.0", 22],
  ["185.244.24.0",  22],
  ["193.106.96.0",  19],
  ["193.107.136.0", 21],
  ["194.29.136.0",  21],
  ["194.165.192.0", 18]
];

function isJordanIPv4(ip) {
  for (var i = 0; i < JO_IPV4_RANGES.length; i++) {
    if (isInIPv4Range(ip, JO_IPV4_RANGES[i][0], JO_IPV4_RANGES[i][1])) {
      return true;
    }
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  PUBG HOSTNAME & URL DETECTION (expanded 2026)
// ═══════════════════════════════════════════════════════

function isPUBG(h, u) {
  var data = (h + " " + u).toLowerCase();
  return /pubg|tencent|krafton|lightspeed|levelinfinite|proxima|gpubgm|battleground|amsoveasea|tencentgames|igamecj|beacon\.qq|midas\.qq|ssl\.msdk|pandora\.qq|mcgi\.qq|mstat\.qq|stat\.intl|gcloud|qpic\.cn|myqcloud|tencentcs|cdntips|gamesafe|anticheat|battleye|xd\.com|garena|garenanow/i.test(data);
}

// ═══════════════════════════════════════════════════════
//  CDN / ANALYTICS / TELEMETRY — DIRECT bypass
//  These don't need proxy and shouldn't be locked
// ═══════════════════════════════════════════════════════

function isCDNorTelemetry(h, u) {
  var data = (h + " " + u).toLowerCase();
  return /\.cdn\.|cloudfront\.net|akamai|\.edgesuite\.|fastly|cloudflare|crashlytics|analytics|appsflyer|adjust\.com|branch\.io|firebase|bugly|sentry\.io|bugsnag|hotfix|\.dnsv1\.com|cdntips\.net|cdnbuzz/i.test(data);
}

// ═══════════════════════════════════════════════════════
//  IPv6 BLOCK LISTS — unwanted countries & infra
// ═══════════════════════════════════════════════════════

// Organized by threat/region for maintainability
var BLOCKED_V6_PREFIXES_29 = [
  // Iraq
  "2a01:4640",
  "2a05:b4c0",
  // Syria
  "2a01:be00",
  // Egypt (game server spoofing)
  "2a01:4340"
];

var BLOCKED_V6_PREFIXES_32 = [
  // ── Google / Cloud infra (not real game servers) ──
  "2a00:1450",  // Google
  "2600:1900",  // Google Cloud
  "2600:1901",  // Google Cloud
  "2607:f8b0",  // Google

  // ── Aruba / hosting ──
  "2a00:bdc0",
  "2a00:13c0",
  "2a00:1fa0",

  // ── Iran ──
  "2a00:1a60",
  "2a00:1b20",
  "2a01:5ec0",
  "2a03:3b40",
  "2a01:d340",
  "2a09:1400",

  // ── Pakistan ──
  "2401:4900",
  "2407:3e00",
  "2407:5200",

  // ── Afghanistan ──
  "2400:3c00",
  "2400:4f00",

  // ── Libya ──
  "2c0f:f248",
  "2c0f:f7c0",

  // ── India (prevent mis-routing) ──
  "2401:4900",
  "2405:8100",
  "2405:200",
  "2403:5800",

  // ── China (Tencent cloud — block direct) ──
  "2402:4e00",
  "240e:0000",

  // ── Russia ──
  "2a00:bdc0",
  "2a02:6b8",   // Yandex

  // ── Turkey (prevent routing leaks) ──
  "2a02:2e00",
  "2a09:bac0"
];

function isBlockedIPv6(fullIP) {
  if (!fullIP) return true;

  var i;
  for (i = 0; i < BLOCKED_V6_PREFIXES_29.length; i++) {
    if (matchPrefix29(fullIP, BLOCKED_V6_PREFIXES_29[i])) return true;
  }
  for (i = 0; i < BLOCKED_V6_PREFIXES_32.length; i++) {
    if (matchPrefix32(fullIP, BLOCKED_V6_PREFIXES_32[i])) return true;
  }

  // Block well-known non-Jordan ranges starting with certain prefixes
  // Block 6to4 (2002::/16), Teredo (2001:0000::/32), documentation (2001:db8::/32)
  if (fullIP.substring(0, 4) === "2002") return true;
  if (fullIP.substring(0, 9) === "2001:0000") return true;
  if (fullIP.substring(0, 8) === "2001:0db8") return true;

  // Block multicast (ff00::/8) and link-local (fe80::/10)
  if (fullIP.substring(0, 2) === "ff") return true;
  if (fullIP.substring(0, 4) === "fe80") return true;

  return false;
}

// ═══════════════════════════════════════════════════════
//  IPv4 BLOCK LIST
// ═══════════════════════════════════════════════════════

var BLOCKED_V4_RANGES = [
  // Private/Reserved
  ["10.0.0.0",      8],
  ["127.0.0.0",     8],
  ["172.16.0.0",    12],
  ["192.168.0.0",   16],
  ["169.254.0.0",   16],
  ["100.64.0.0",    10],   // CGNAT
  ["0.0.0.0",       8],

  // Iran major ranges
  ["2.144.0.0",     14],
  ["2.176.0.0",     12],
  ["5.52.0.0",      15],
  ["5.56.0.0",      13],
  ["5.160.0.0",     14],
  ["5.200.0.0",     16],

  // India major ranges
  ["14.139.0.0",    16],
  ["14.140.0.0",    14],
  ["27.54.0.0",     15],
  ["43.224.0.0",    13],

  // Pakistan
  ["39.32.0.0",     11],
  ["58.27.128.0",   17],
  ["58.65.128.0",   17],
  ["103.0.0.0",     13]
];

function isBlockedIPv4(ip) {
  for (var i = 0; i < BLOCKED_V4_RANGES.length; i++) {
    if (isInIPv4Range(ip, BLOCKED_V4_RANGES[i][0], BLOCKED_V4_RANGES[i][1])) {
      return true;
    }
  }
  return false;
}

// ═══════════════════════════════════════════════════════
//  TRAFFIC CLASSIFICATION — Lobby vs Match
// ═══════════════════════════════════════════════════════

function classifyTraffic(data) {
  // Returns: "lobby", "match", or "general"

  if (/lobby|login|auth|session|gateway|region|matchmak|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download|social|rank|leaderboard|achievement|season|pass|crate|outfit|emote|title|notification|announce|banner|offer|coupon|checkin|signin|signup|register|verify|token|heartbeat|keepalive|ping|version|init|bootstrap|startup|preload|resource|language|locale|i18n|tos|eula|privacy|consent|survey|feedback|support|help|faq|customer|ticket|report|block|mute|whisper|guild|club|community|forum|broadcast/i.test(data)) {
    return "lobby";
  }

  if (/match|battle|classic|ranked|unranked|competi|arena|tdm|teamdeath|gungame|domination|assault|payload|metro|metroroyale|zombie|infect|evoground|ultimate|royale|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival|chicken|winner|airdrop|loot|revive|respawn|circle|zone|bluehole|redzone|flare|vehicle|boat|bridge|military|pochinki|georgo|erangel|miramar|sanhok|vikendi|karakin|livik|nusa|haven|deston|rondo|spawn|parachute|plane|flight|minimap|tactical|fireteam|squad|duo|solo|fpp|tpp|bolt|dmr|snipe|scope|heal|boost|grenade|smoke|flash|molotov|melee|punch|pan|crossbow|suppressor|compensator|grip|stock|magazine|helmet|armor|vest|backpack|adrenaline|bandage|medkit|firstaid|energy|drink|pain|pill/i.test(data)) {
    return "match";
  }

  return "general";
}

// ═══════════════════════════════════════════════════════
//  SESSION MANAGEMENT
// ═══════════════════════════════════════════════════════

function getTimestamp() {
  try { return new Date().getTime(); } catch (e) { return 0; }
}

function resetSessionIfExpired() {
  var now = getTimestamp();
  if (SESSION.lastActivity > 0 && now > 0 &&
      (now - SESSION.lastActivity) > SESSION_TIMEOUT_MS) {
    // Session expired — reset everything
    SESSION.ispNet     = null;
    SESSION.lobbyNet   = null;
    SESSION.matchNet   = null;
    SESSION.inMatch    = false;
  }
  SESSION.lastActivity = now;
}

// ═══════════════════════════════════════════════════════
//  MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

function FindProxyForURL(url, host) {

  // ── Fast exit: plain hostnames ──
  if (isPlainHostName(host)) return DIRECT;

  // ── Fast exit: not PUBG traffic ──
  if (!isPUBG(host, url)) return DIRECT;

  // ── CDN/telemetry bypass — let it go DIRECT ──
  if (isCDNorTelemetry(host, url)) return DIRECT;

  // ── Resolve IP ──
  var ip = "";
  try { ip = dnsResolve(host); } catch (e) { ip = ""; }

  // No resolution = block
  if (!ip) return BLOCK;

  // ── Session timeout check ──
  resetSessionIfExpired();

  // ══════════════════════════════════════════════════
  //  IPv6 PATH
  // ══════════════════════════════════════════════════

  if (isIPv6(ip)) {
    var fullIP = expandIPv6(ip);
    if (!fullIP) return BLOCK;  // Malformed

    // Hard block list
    if (isBlockedIPv6(fullIP)) return BLOCK;

    // Must be Jordan
    if (!isJordanIPv6(ip)) return BLOCK;

    var parts = fullIP.split(":");

    // Network segments for locking
    var isp2 = parts[0] + ":" + parts[1];           // /32
    var net3 = parts[0] + ":" + parts[1] + ":" + parts[2];     // /48
    var net4 = parts[0] + ":" + parts[1] + ":" + parts[2] + ":" + parts[3]; // /64

    var data = (host + url).toLowerCase();
    var trafficType = classifyTraffic(data);

    // Reset match state when out of match
    if (trafficType !== "match" && SESSION.inMatch) {
      SESSION.matchNet = null;
      SESSION.inMatch  = false;
    }

    // ── LOBBY PHASE ──
    if (trafficType === "lobby") {
      if (!SESSION.ispNet)             SESSION.ispNet   = isp2;
      if (isp2 !== SESSION.ispNet)     return BLOCK;

      if (!SESSION.lobbyNet)           SESSION.lobbyNet = net3;
      if (net3 !== SESSION.lobbyNet)   return BLOCK;

      return PROXY;
    }

    // ── MATCH PHASE ──
    if (trafficType === "match") {
      if (!SESSION.ispNet)             SESSION.ispNet = isp2;
      if (isp2 !== SESSION.ispNet)     return BLOCK;

      if (!SESSION.matchNet) {
        SESSION.matchNet = net4;
        SESSION.inMatch  = true;
        return PROXY;
      }

      if (net4 !== SESSION.matchNet)   return BLOCK;
      return PROXY;
    }

    // ── GENERAL PUBG (Jordan confirmed) ──
    if (!SESSION.ispNet)               SESSION.ispNet = isp2;
    if (isp2 !== SESSION.ispNet)       return BLOCK;

    return PROXY;
  }

  // ══════════════════════════════════════════════════
  //  IPv4 PATH
  // ══════════════════════════════════════════════════

  if (isIPv4(ip)) {
    // Block known bad IPv4 ranges
    if (isBlockedIPv4(ip)) return BLOCK;

    // Must be Jordan IPv4
    if (!isJordanIPv4(ip)) return BLOCK;

    // IPv4 from Jordan — proxy it
    return PROXY;
  }

  // ── Unknown protocol ──
  return BLOCK;
}
