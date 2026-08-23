var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ═══════════════════════════════════════════════════════
//  تحديث 2026 - زيادة وجود الأردنيين واللاعبين العرب
//  Lobby → Jordan فقط (تحديد الريجون)
//  Match/General → Jordan + عرب (SA, AE, EG, IQ, KW...)
//  يزيد من عدد اللاعبين العرب في اللوبي بشكل ملحوظ
// ═══════════════════════════════════════════════════════

var SESSION = {
  ispNet:       null,
  lobbyNet:     null,
  matchNet:     null,
  inMatch:      false,
  lastActivity: 0
};

var SESSION_TIMEOUT_MS = 30 * 60 * 1000;

// ═══════════════════════════════════════════════════════
//  UTILITY FUNCTIONS (بدون تغيير)
// ═══════════════════════════════════════════════════════

function isIPv6(ip) { return ip && ip.indexOf(":") !== -1; }
function isIPv4(ip) { return ip && ip.indexOf(".") !== -1 && ip.indexOf(":") === -1; }

function expandIPv6(address) {
  if (!address || address.indexOf(":") === -1) return address;
  if (address.lastIndexOf(".") !== -1) return null;
  var parts = address.split("::");
  var full = [];
  if (parts.length === 2) {
    var left = parts[0] ? parts[0].split(":") : [];
    var right = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    full = left.slice(0);
    for (var i = 0; i < missing; i++) full.push("0000");
    full = full.concat(right);
  } else if (parts.length === 1) {
    full = address.split(":");
  } else return null;
  if (full.length !== 8) return null;
  for (var k = 0; k < full.length; k++) {
    while (full[k].length < 4) full[k] = "0" + full[k];
    if (!/^[0-9a-fA-F]{4}$/.test(full[k])) return null;
  }
  return full.join(":").toLowerCase();
}

function ipv4ToInt(ip) {
  var parts = ip.split(".");
  if (parts.length !== 4) return 0;
  return ((parseInt(parts[0], 10) << 24) | (parseInt(parts[1], 10) << 16) | (parseInt(parts[2], 10) << 8) | parseInt(parts[3], 10)) >>> 0;
}

function isInIPv4Range(ip, network, prefixLen) {
  var ipInt = ipv4ToInt(ip);
  var netInt = ipv4ToInt(network);
  var mask = prefixLen === 0 ? 0 : (0xFFFFFFFF << (32 - prefixLen)) >>> 0;
  return (ipInt & mask) === (netInt & mask);
}

function matchPrefix29(ip, base) {
  var ipParts = ip.split(":");
  var baseParts = base.split(":");
  if (ipParts[0] !== baseParts[0]) return false;
  return (parseInt(ipParts[1], 16) >> 3) === (parseInt(baseParts[1], 16) >> 3);
}

function matchPrefix32(ip, base) {
  var ipParts = ip.split(":");
  var baseParts = base.split(":");
  return ipParts[0] === baseParts[0] && ipParts[1] === baseParts[1];
}

// ═══════════════════════════════════════════════════════
//  JORDAN + ARAB IPv6 (محدث 2026)
// ═══════════════════════════════════════════════════════

var JO_IPV6_29 = [
  "2001:32c0","2a01:01d0","2a01:9700","2a01:e240","2a01:ee40","2a02:09c0","2a02:2558",
  "2a02:e680","2a02:f0c0","2a03:6b00","2a04:4cc0","2a05:74c0","2a05:7500","2a06:9bc0",
  "2a06:bd80","2a07:0140","2a0a:2740","2a0c:39c0","2a0d:cf40","2a10:1100","2a10:9740",
  "2a10:d800","2a11:d180","2a13:1f00","2a13:5c00","2a13:8d40","2a14:1a40","2a14:2840",
  "2a02:c040","2a02:25d8","2a00:18d0","2a06:4b40","2a09:4c00","2a12:3d00","2a13:e100"
];

var JO_IPV6_32 = [
  "2a00:4620","2a00:76e0","2a00:b860","2a00:caa0","2a03:6d00","2a03:b640","2a0e:1c80",
  "2a0e:b700","2a0f:1a00","2a0f:9c40","2a10:4e00","2a12:52c0","2a12:d000","2a13:b200",
  "2a14:50c0","2a00:18d8","2a02:5b60","2a11:2b00","2a14:6f40"
];

var ARAB_IPV6_29 = [
  "2a02:2a80","2a01:4f00","2001:8f80","2a03:9e40",     // SA
  "2a02:2c80","2a03:8e40","2a0d:8400",                 // AE
  "2c0f:f2c0","2a03:3b40","2405:8100",                 // EG + IQ
  "2a06:4f00","2a0b:6f80"
];

function isJordanIPv6(ip) {
  var full = expandIPv6(ip); if (!full) return false;
  for (var i = 0; i < JO_IPV6_29.length; i++) if (matchPrefix29(full, JO_IPV6_29[i])) return true;
  for (var i = 0; i < JO_IPV6_32.length; i++) if (matchPrefix32(full, JO_IPV6_32[i])) return true;
  return false;
}

function isArabIPv6(ip) {
  var full = expandIPv6(ip); if (!full) return false;
  for (var i = 0; i < ARAB_IPV6_29.length; i++) {
    if (matchPrefix29(full, ARAB_IPV6_29[i]) || matchPrefix32(full, ARAB_IPV6_29[i])) return true;
  }
  return false;
}

function isAllowedIPv6(ip) {
  return isJordanIPv6(ip) || isArabIPv6(ip);
}

// ═══════════════════════════════════════════════════════
//  JORDAN + ARAB IPv4 (محدث وموسع)
// ═══════════════════════════════════════════════════════

var JO_IPV4_RANGES = [
  ["37.44.0.0",17],["37.110.0.0",17],["46.32.0.0",16],["46.185.128.0",17],["62.72.160.0",19],
  ["77.245.0.0",17],["78.40.0.0",17],["80.90.160.0",19],["81.28.16.0",20],["82.212.64.0",18],
  ["85.115.32.0",19],["86.108.0.0",16],["88.85.224.0",19],["89.148.0.0",16],["91.186.0.0",17],
  ["92.253.64.0",18],["176.29.0.0",16],["178.20.160.0",19],["185.56.136.0",22],["188.247.0.0",18],
  ["193.188.64.0",19],["194.165.128.0",18],["212.37.32.0",19],["213.139.192.0",18],["213.186.160.0",19],
  ["37.152.0.0",16],["79.134.0.0",17],["94.249.0.0",17],["109.107.128.0",17],["176.11.0.0",16],
  ["185.117.68.0",22],["188.71.0.0",16],["195.222.64.0",18],["195.229.0.0",17],["212.118.0.0",17],
  ["5.1.0.0",17],["5.45.128.0",17],["37.44.64.0",18],["79.173.0.0",17],["85.233.128.0",17],
  ["95.160.0.0",16],["178.63.64.0",18],["185.37.128.0",22],["188.53.0.0",17],["80.77.128.0",18],
  ["82.213.0.0",17],["91.239.104.0",21],["185.136.204.0",22],["185.244.24.0",22],["193.106.96.0",19],
  ["193.107.136.0",21],["194.29.136.0",21],["194.165.192.0",18],
  // إضافات 2026
  ["2.59.52.0",22],["5.198.240.0",21],["37.17.192.0",20],["37.123.64.0",19],["37.202.64.0",18],
  ["45.142.196.0",22],["46.23.112.0",20],["46.248.192.0",19],["84.18.32.0",19],["89.28.216.0",21],
  ["91.212.0.0",24],["93.109.176.0",21],["93.115.2.0",24],["141.0.0.0",21],["141.98.64.0",22],
  ["178.77.128.0",18],["185.10.216.0",22],["185.33.28.0",22],["185.68.54.0",24],["185.135.200.0",22],
  ["185.160.236.0",22],["185.173.56.0",22],["185.180.80.0",22],["185.234.111.0",24],["217.29.240.0",20]
];

var ARAB_IPV4_RANGES = [
  // Saudi Arabia
  ["188.117.0.0",16],["5.107.0.0",16],["178.20.224.0",19],["94.249.0.0",16],["185.85.0.0",17],
  // UAE
  ["94.200.0.0",13],["5.30.0.0",15],["217.165.0.0",16],["185.141.0.0",17],
  // Egypt
  ["156.160.0.0",12],["197.246.0.0",16],["45.96.0.0",12],["102.0.0.0",11],
  // Iraq + Kuwait + others
  ["37.236.0.0",16],["62.201.0.0",16],["195.7.0.0",18],["185.108.0.0",18],["185.75.0.0",18]
];

function isJordanIPv4(ip) {
  for (var i = 0; i < JO_IPV4_RANGES.length; i++) {
    if (isInIPv4Range(ip, JO_IPV4_RANGES[i][0], JO_IPV4_RANGES[i][1])) return true;
  }
  return false;
}

function isAllowedIPv4(ip) {
  if (isJordanIPv4(ip)) return true;
  for (var i = 0; i < ARAB_IPV4_RANGES.length; i++) {
    if (isInIPv4Range(ip, ARAB_IPV4_RANGES[i][0], ARAB_IPV4_RANGES[i][1])) return true;
  }
  return false;
}

// باقي الدوال (BLOCK, PUBG detection, classifyTraffic, Session...) كما هي مع تعديل بسيط في FindProxyForURL

function isPUBG(h, u) {
  var data = (h + " " + u).toLowerCase();
  return /pubg|tencent|krafton|lightspeed|levelinfinite|proxima|gpubgm|battleground|amsoveasea|tencentgames|igamecj|beacon\.qq|midas\.qq|ssl\.msdk|pandora\.qq|mcgi\.qq|mstat\.qq|stat\.intl|gcloud|qpic\.cn|myqcloud|tencentcs|cdntips|gamesafe|anticheat|battleye|xd\.com|garena|garenanow/i.test(data);
}

function isCDNorTelemetry(h, u) {
  var data = (h + " " + u).toLowerCase();
  return /\.cdn\.|cloudfront\.net|akamai|\.edgesuite\.|fastly|cloudflare|crashlytics|analytics|appsflyer|adjust\.com|branch\.io|firebase|bugly|sentry\.io|bugsnag|hotfix|\.dnsv1\.com|cdntips\.net|cdnbuzz/i.test(data);
}

function classifyTraffic(data) {
  if (/match|battle|classic|ranked|unranked|competi|arena|tdm|teamdeath|gungame|domination|ingame|gamesvr|relay|realtime|spectate|combat|survival|chicken|winner|airdrop|loot|revive|respawn|circle|zone|bluehole|redzone|flare|vehicle|pochinki|georgo|erangel|miramar|sanhok|vikendi|karakin|livik|nusa|haven|deston|rondo|spawn|parachute|plane|flight|minimap|tactical|fireteam|squad|duo|solo|fpp|tpp/i.test(data)) {
    return "match";
  }
  if (/lobby|login|auth|session|gateway|region|matchmak|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download/i.test(data)) {
    return "lobby";
  }
  return "general";
}

function getTimestamp() { try { return new Date().getTime(); } catch (e) { return 0; } }

function resetSessionIfExpired() {
  var now = getTimestamp();
  if (SESSION.lastActivity > 0 && now > 0 && (now - SESSION.lastActivity) > SESSION_TIMEOUT_MS) {
    SESSION.ispNet = null; SESSION.lobbyNet = null; SESSION.matchNet = null; SESSION.inMatch = false;
  }
  SESSION.lastActivity = now;
}

// ═══════════════════════════════════════════════════════
//  MAIN - FindProxyForURL (المنطق المحدث)
// ═══════════════════════════════════════════════════════

function FindProxyForURL(url, host) {

  if (isPlainHostName(host))       return DIRECT;
  if (!isPUBG(host, url))          return DIRECT;
  if (isCDNorTelemetry(host, url)) return DIRECT;

  var ip = "";
  try { ip = dnsResolve(host); } catch (e) { ip = ""; }
  if (!ip) return BLOCK;

  resetSessionIfExpired();

  var trafficType = classifyTraffic((host + url).toLowerCase());

  if (isIPv6(ip)) {
    var fullIP = expandIPv6(ip);
    if (!fullIP || isBlockedIPv6(fullIP)) return BLOCK;

    if (trafficType === "lobby") {
      if (!isJordanIPv6(ip)) return BLOCK;           // Jordan فقط في اللوبي
      if (!SESSION.ispNet) SESSION.ispNet = fullIP.split(":").slice(0,2).join(":");
      if (!SESSION.lobbyNet) SESSION.lobbyNet = fullIP.split(":").slice(0,3).join(":");
      return PROXY;
    }

    if (!isAllowedIPv6(ip)) return BLOCK;            // Jordan + عرب في الماتش

    if (trafficType === "match") {
      if (!SESSION.ispNet) SESSION.ispNet = fullIP.split(":").slice(0,2).join(":");
      if (!SESSION.matchNet) { SESSION.matchNet = fullIP.split(":").slice(0,4).join(":"); SESSION.inMatch = true; }
      return PROXY;
    }

    if (!SESSION.ispNet) SESSION.ispNet = fullIP.split(":").slice(0,2).join(":");
    return PROXY;
  }

  if (isIPv4(ip)) {
    if (isBlockedIPv4(ip)) return BLOCK;

    if (trafficType === "lobby") {
      if (!isJordanIPv4(ip)) return BLOCK;
      return PROXY;
    }

    if (!isAllowedIPv4(ip)) return BLOCK;
    return PROXY;
  }

  return BLOCK;
}

// BLOCKED LISTS (IPv6 + IPv4) تبقى كما هي في السكربت الأصلي (يمكنك لصقها من النسخة القديمة)
