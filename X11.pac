// ============================================================
// PUBG ULTIMATE JORDAN LOCK — v3.0
// IPv4 + IPv6 Full Jordan ISP Coverage
// Lobby Lock (3 segments) | Match Lock (4 segments)
// ISP Lock + Forced Retry + Global Country Blocks
// ISPs: Orange Jordan | Zain | Umniah | JTC | Batelco JO
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  ispNet:   null,
  lobbyNet: null,
  matchNet: null,
  inMatch:  false
};

// ============================================================
// IPv6 UTILITIES
// ============================================================

function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

function expandIPv6(address) {
  if (!address || address.indexOf(":") === -1) return address;
  var parts = address.split("::");
  var full  = [];
  if (parts.length === 2) {
    var left    = parts[0] ? parts[0].split(":") : [];
    var right   = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    full = left;
    for (var i = 0; i < missing; i++) full.push("0000");
    full = full.concat(right);
  } else {
    full = address.split(":");
  }
  for (var j = 0; j < full.length; j++) {
    while (full[j].length < 4) full[j] = "0" + full[j];
  }
  return full.join(":").toLowerCase();
}

// ============================================================
// IPv4 UTILITIES
// ============================================================

function ipToLong(ip) {
  var parts = ip.split(".");
  if (parts.length !== 4) return -1;
  return ((parseInt(parts[0], 10) * 16777216) +
          (parseInt(parts[1], 10) * 65536)    +
          (parseInt(parts[2], 10) * 256)       +
           parseInt(parts[3], 10));
}

function cidrMatch(ip, cidr) {
  try {
    var parts  = cidr.split("/");
    var base   = ipToLong(parts[0]);
    var bits   = parseInt(parts[1], 10);
    var mask   = bits === 0 ? 0 : (~0 << (32 - bits));
    var ipLong = ipToLong(ip);
    return (ipLong & mask) === (base & mask);
  } catch(e) { return false; }
}

// ============================================================
// JORDAN IPv4 RANGES
// Orange Jordan | Zain | Umniah | JTC | Batelco JO
// ============================================================

var JORDAN_IPV4 = [
  // === Jordan Telecom (JTC / Orange Jordan) ===
  "82.212.0.0/14",
  "213.139.96.0/19",
  "46.185.128.0/17",
  "5.36.0.0/14",

  "213.6.32.0/19",

  "195.229.32.0/19",
  "195.229.64.0/19",
  "217.133.64.0/19",

  "46.185.0.0/16",

  // === Zain Jordan ===
  "37.98.128.0/17",
  "37.98.0.0/16",
  "185.110.144.0/22",
  "185.110.148.0/22",
  "109.224.0.0/13",
  "212.118.128.0/19",

  // === Umniah ===
  "176.74.112.0/20",
  "176.74.96.0/20",
  "188.247.128.0/17",
  "188.247.0.0/16",
  "77.242.128.0/18",

  // === Batelco Jordan ===
  "87.236.192.0/20",
  "94.142.128.0/19",

  // === Additional Jordanian Allocations ===
  "5.0.0.0/16",
  "31.211.128.0/17",
  "62.3.0.0/17",
  "89.47.96.0/19",
  "91.225.40.0/22",
  "92.243.0.0/18",
  "92.243.64.0/18",
  "193.188.160.0/19",
  "194.126.0.0/19",
  "194.181.64.0/19",
  "194.181.96.0/19",
  "217.133.0.0/18"
];

function isJordanIPv4(ip) {
  for (var i = 0; i < JORDAN_IPV4.length; i++) {
    if (cidrMatch(ip, JORDAN_IPV4[i])) return true;
  }
  return false;
}

// ============================================================
// JORDAN IPv6 RANGES
// Orange Jordan | Zain | Umniah | JTC | Batelco JO
// ============================================================

function isJordanIPv6(ip) {
  var full = expandIPv6(ip);
  return (
    // === Orange Jordan / JTC (2a01:9700::/32) ===
    full.startsWith("2a01:dd40:") ||
    full.startsWith("2a01:9700:") ||
    full.startsWith("2a0d:5600:") ||
    full.startsWith("2a09:bac0:") ||
    full.startsWith("2a06:8880:") ||
    // === Zain Jordan ===
    full.startsWith("2a01:dd41:") ||
    full.startsWith("2a01:dd42:") ||
    full.startsWith("2a01:dd43:") ||
    full.startsWith("2001:16a0:") ||
    full.startsWith("2001:16a1:") ||
    full.startsWith("2001:16a2:") ||

    // === Umniah ===

    full.startsWith("2a0d:5601:") ||
    full.startsWith("2a0d:5602:") ||
    full.startsWith("2a0d:5603:") ||

    full.startsWith("2a09:bac1:") ||
    full.startsWith("2a09:bac2:") ||
    full.startsWith("2a09:bac3:") ||

    // === Batelco Jordan ===
    full.startsWith("2a02:e680:") ||
    full.startsWith("2a02:e681:") ||
    full.startsWith("2a02:e682:") ||
    full.startsWith("2a02:e683:") ||

    // === Additional Jordanian Allocations ===
    full.startsWith("2a05:d018:") ||
    full.startsWith("2a05:d019:") ||
    full.startsWith("2a06:8881:") ||
    full.startsWith("2a0a:e5c0:") ||
    full.startsWith("2a0a:e5c1:")
  );
}

function isJordan(ip) {
  if (!ip) return false;
  if (isIPv6(ip)) return isJordanIPv6(ip);
  return isJordanIPv4(ip);
}

// ============================================================
// BLOCK LISTS — Non-Jordan Regions
// ============================================================

function isBlocked(ip) {
  if (!ip) return false;

  if (isIPv6(ip)) {
    var full = expandIPv6(ip);

    // === Aruba ===
    if (full.startsWith("2a00:1450:") ||
        full.startsWith("2a00:bdc0:") ||
        full.startsWith("2a00:13c0:") ||
        full.startsWith("2a00:1fa0:")) return true;

    // === Iran ===
    if (full.startsWith("2a00:1a60:") ||
        full.startsWith("2a00:1b20:") ||
        full.startsWith("2a01:5ec0:") ||
        full.startsWith("2a03:3b40:")) return true;

    // === Pakistan ===
    if (full.startsWith("2401:4900:") ||
        full.startsWith("2407:")      ||
        full.startsWith("2400:a200:") ||
        full.startsWith("2400:a140:")) return true;

    // === Afghanistan ===
    if (full.startsWith("2400:3c00:") ||
        full.startsWith("2400:4f00:") ||
        full.startsWith("2400:3e00:")) return true;

    // === Libya ===
    if (full.startsWith("2c0f:f248:") ||
        full.startsWith("2c0f:f7c0:")) return true;

    // === Iraq ===
    if (full.startsWith("2a01:5580:") ||
        full.startsWith("2a01:5581:") ||
        full.startsWith("2a02:4b80:")) return true;

    // === Yemen ===
    if (full.startsWith("2a0b:f4c0:") ||
        full.startsWith("2a0b:f4c1:")) return true;

    // === Egypt ===
    if (full.startsWith("2a01:4f8:") ||
        full.startsWith("2a02:ed0:")) return true;

  } else {

    // === Iran IPv4 ===
    if (cidrMatch(ip, "5.62.128.0/17")   ||
        cidrMatch(ip, "31.2.128.0/17")   ||
        cidrMatch(ip, "31.14.0.0/17")    ||
        cidrMatch(ip, "185.55.224.0/22") ||
        cidrMatch(ip, "2.144.0.0/16"))   return true;

    // === Pakistan IPv4 ===
    if (cidrMatch(ip, "202.125.128.0/17") ||
        cidrMatch(ip, "115.186.0.0/16")   ||
        cidrMatch(ip, "119.153.0.0/16")   ||
        cidrMatch(ip, "39.32.0.0/11"))    return true;

    // === Iraq IPv4 ===
    if (cidrMatch(ip, "31.221.48.0/20") ||
        cidrMatch(ip, "185.70.136.0/22")||
        cidrMatch(ip, "46.244.0.0/18")) return true;
  }

  return false;
}

// ============================================================
// PUBG DETECTION
// ============================================================

function isPUBG(h, u) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h + u);
}

// ============================================================
// MAIN — FindProxyForURL
// ============================================================

function FindProxyForURL(url, host) {

  var ip = "";
  try { ip = dnsResolve(host); } catch(e) { ip = ""; }

  if (isPlainHostName(host)) return DIRECT;
  if (!isPUBG(host, url))    return DIRECT;
  if (!ip)                   return BLOCK;

  // Block non-Jordan and blacklisted regions
  if (isBlocked(ip))  return BLOCK;
  if (!isJordan(ip))  return BLOCK;

  // Determine segment keys based on protocol
  var segKey2, segKey3, segKey4;

  if (isIPv6(ip)) {
    var full = expandIPv6(ip);
    var parts = full.split(":");
    segKey2 = parts.slice(0, 3).join(":");
    segKey3 = parts.slice(0, 3).join(":");
    segKey4 = parts.slice(0, 4).join(":");
  } else {
    var octets = ip.split(".");
    segKey2 = octets.slice(0, 2).join(".");
    segKey3 = octets.slice(0, 3).join(".");
    segKey4 = ip;
  }

  var data = (host + url).toLowerCase();

  var isLobby = /lobby|login|auth|session|gateway|region|matchmaking|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download|social|rank|leaderboard/i.test(data);

  var isMatch = /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival/i.test(data);

  // Reset match session if traffic no longer match-type
  if (!isMatch && SESSION.inMatch) {
    SESSION.matchNet = null;
    SESSION.inMatch  = false;
  }

  if (isLobby) {
    if (!SESSION.ispNet)   SESSION.ispNet   = segKey2;
    if (segKey2 !== SESSION.ispNet) return BLOCK;
    if (!SESSION.lobbyNet) SESSION.lobbyNet = segKey3;
    return PROXY;
  }

  if (isMatch) {
    if (!SESSION.ispNet) SESSION.ispNet = segKey2;
    if (segKey2 !== SESSION.ispNet) return BLOCK;

    if (!SESSION.matchNet) {
      SESSION.matchNet = segKey4;
      SESSION.inMatch  = true;
      return PROXY;
    }

    if (segKey4 !== SESSION.matchNet) return BLOCK;
    return PROXY;
  }

  return PROXY;
}
