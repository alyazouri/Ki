// ════════════════════════════════════════════════════════════════
//  PROXY PAC — Jordan-Anchored Routing  v5
//  Updated JO ranges + better lookup + dns cache
// ════════════════════════════════════════════════════════════════

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ════════════════════════════════════════════════════════════════
//  ❶ RAW DATABASE — Jordan IPv4 (exact CIDRs from screenshots)
// ════════════════════════════════════════════════════════════════

var JO_IPV4_RAW = [
  ["5.45.128.0", 20],
  ["5.198.240.0", 21],
  ["5.199.184.0", 22],

  ["37.17.192.0", 20],
  ["37.123.64.0", 19],
  ["37.202.64.0", 18],
  ["37.220.112.0", 20],

  ["46.23.112.0", 20],
  ["46.32.96.0", 19],
  ["46.185.128.0", 17],
  ["46.248.192.0", 19],

  ["62.72.160.0", 19],

  ["77.245.0.0", 20],

  ["79.134.128.0", 19],
  ["79.173.192.0", 18],

  ["80.90.160.0", 20],
  ["81.21.0.0", 20],

  ["82.212.64.0", 19],

  ["87.236.232.0", 21],
  ["89.249.64.0", 20],

  ["91.186.0.0", 18],
  ["93.191.176.0", 21],
  ["94.127.208.0", 21],
  ["94.142.32.0", 19],
  ["95.141.208.0", 20],

  ["109.237.192.0", 20],

  ["176.29.0.0", 16],
  ["176.57.0.0", 19],
  ["176.57.48.0", 20],
  ["176.241.64.0", 21],

  ["178.16.96.0", 21],
  ["178.20.184.0", 21],
  ["178.77.128.0", 18],

  ["185.14.132.0", 22],
  ["185.27.118.0", 23],
  ["185.30.248.0", 22],
  ["185.33.28.0", 22],
  ["185.51.212.0", 22],
  ["185.57.120.0", 22],
  ["185.80.24.0", 22],
  ["185.80.104.0", 22],
  ["185.96.68.0", 22],
  ["185.98.220.0", 21],
  ["185.109.120.0", 22],
  ["185.159.180.0", 22],
  ["185.160.236.0", 22],
  ["185.193.176.0", 22],
  ["185.197.176.0", 22],
  ["185.200.128.0", 22],

  ["188.123.160.0", 19],
  ["188.247.64.0", 19],

  ["193.17.53.0", 24],
  ["193.108.134.0", 23],
  ["193.188.64.0", 19],
  ["193.189.148.0", 24],
  ["193.203.24.0", 23],

  ["194.104.95.0", 24],

  ["212.35.64.0", 19],
  ["212.118.0.0", 19],

  ["213.139.32.0", 19],
  ["213.186.160.0", 19],

  ["217.23.32.0", 20],
  ["217.29.240.0", 20],
  ["217.144.0.0", 20]
];

// ════════════════════════════════════════════════════════════════
//  ❷ RAW DATABASE — Jordan IPv6
// ════════════════════════════════════════════════════════════════

var JO_IPV6_RAW = [
  ["2a00:caa0::", 32],

  ["2a01:1d0::", 29],
  ["2a01:9700::", 29],
  ["2a01:e240::", 29],
  ["2a01:ee40::", 29],
  ["2a02:09c0::", 29],
  ["2a02:2558::", 29],
  ["2a04:6200::", 29],
  ["2a05:74c0::", 29],
  ["2a05:7500::", 29],
  ["2a06:9bc0::", 29],
  ["2a06:bd80::", 29],
  ["2a07:0140::", 29],
  ["2a0a:2740::", 29],
  ["2a0c:39c0::", 29],
  ["2a0d:cf40::", 29],
  ["2a13:8d40::", 29],

  ["2a03:b640::", 32]
];

// ════════════════════════════════════════════════════════════════
//  ❸ BLOCK DATABASE
// ════════════════════════════════════════════════════════════════

var BLOCKED_V4_RAW = [
  ["0.0.0.0",8],
  ["10.0.0.0",8],
  ["100.64.0.0",10],
  ["127.0.0.0",8],
  ["169.254.0.0",16],
  ["172.16.0.0",12],
  ["192.168.0.0",16],

  ["2.144.0.0",14],
  ["2.176.0.0",12],
  ["5.52.0.0",15],
  ["5.56.0.0",13],
  ["5.160.0.0",14],
  ["5.200.0.0",16],
  ["14.139.0.0",16],
  ["14.140.0.0",14],
  ["27.54.0.0",15],
  ["39.32.0.0",11],
  ["43.224.0.0",13],
  ["58.27.128.0",17],
  ["58.65.128.0",17],
  ["103.0.0.0",13]
];

var BLOCKED_V6_RAW = [
  ["2a01:4640::", 29],
  ["2a05:b4c0::", 29],
  ["2a01:be00::", 29],
  ["2a01:4340::", 29],

  ["2a00:1450::", 32],
  ["2600:1900::", 32],
  ["2600:1901::", 32],
  ["2607:f8b0::", 32],
  ["2a00:bdc0::", 32],
  ["2a00:13c0::", 32],
  ["2a00:1fa0::", 32],
  ["2a00:1a60::", 32],
  ["2a00:1b20::", 32],
  ["2a01:5ec0::", 32],
  ["2a01:d340::", 32],
  ["2a02:06b8::", 32],
  ["2a02:2e00::", 32],
  ["2a03:3b40::", 32],
  ["2a09:1400::", 32],
  ["2a09:bac0::", 32],
  ["2401:4900::", 32],
  ["2403:5800::", 32],
  ["2405:0200::", 32],
  ["2405:8100::", 32],
  ["2400:3c00::", 32],
  ["2400:4f00::", 32],
  ["2402:4e00::", 32],
  ["2407:3e00::", 32],
  ["2407:5200::", 32],
  ["2c0f:f248::", 32],
  ["2c0f:f7c0::", 32],
  ["240e:0000::", 32]
];

// ════════════════════════════════════════════════════════════════
//  ❹ UTILITY
// ════════════════════════════════════════════════════════════════

function ipv4ToInt(ip) {
  var p = ip.split(".");
  if (p.length !== 4) return 0;
  return (
    ((parseInt(p[0],10) << 24) >>> 0) |
    ((parseInt(p[1],10) << 16) >>> 0) |
    ((parseInt(p[2],10) << 8)  >>> 0) |
    (parseInt(p[3],10) >>> 0)
  ) >>> 0;
}

function cidrMask4(bits) {
  return bits === 0 ? 0 : ((0xFFFFFFFF << (32 - bits)) >>> 0);
}

function compileIPv4(list) {
  var out = [], i, ip, bits, mask, netInt;
  for (i = 0; i < list.length; i++) {
    ip    = list[i][0];
    bits  = list[i][1];
    mask  = cidrMask4(bits);
    netInt = ipv4ToInt(ip) & mask;
    out.push([netInt, mask, bits, ip]);
  }
  return out;
}

function expandIPv6(addr) {
  if (!addr || addr.indexOf(":") === -1) return null;
  if (addr.lastIndexOf(".") !== -1) return null;

  var halves = addr.split("::");
  var full = [], L, R, z, r, k;

  if (halves.length === 2) {
    L = halves[0] ? halves[0].split(":") : [];
    R = halves[1] ? halves[1].split(":") : [];
    full = L.slice(0);
    for (z = 0; z < 8 - L.length - R.length; z++) full.push("0000");
    for (r = 0; r < R.length; r++) full.push(R[r]);
  } else if (halves.length === 1) {
    full = addr.split(":");
  } else {
    return null;
  }

  if (full.length !== 8) return null;

  for (k = 0; k < 8; k++) {
    if (!full[k]) full[k] = "0";
    while (full[k].length < 4) full[k] = "0" + full[k];
    if (!/^[0-9a-fA-F]{4}$/.test(full[k])) return null;
  }

  return full.join(":").toLowerCase();
}

function compileIPv6(list) {
  var out = [], i, full;
  for (i = 0; i < list.length; i++) {
    full = expandIPv6(list[i][0]);
    if (full) out.push([full, list[i][1]]);
  }
  return out;
}

function matchIPv6(full, base, bits) {
  var a = full.split(":");
  var b = base.split(":");

  if (bits === 32) {
    return a[0] === b[0] && a[1] === b[1];
  }

  if (bits === 29) {
    return a[0] === b[0] &&
           ((parseInt(a[1],16) >> 3) === (parseInt(b[1],16) >> 3));
  }

  return false;
}

function isSpecialBlocked6(full) {
  if (!full) return true;

  var h = full.split(":");
  var h0 = parseInt(h[0], 16);

  // ::1
  if (full === "0000:0000:0000:0000:0000:0000:0000:0001") return true;

  // fe80::/10 link-local
  if ((h0 & 0xffc0) === 0xfe80) return true;

  // fc00::/7 unique local
  if ((h0 & 0xfe00) === 0xfc00) return true;

  // ff00::/8 multicast
  if ((h0 & 0xff00) === 0xff00) return true;

  // 2002::/16 6to4
  if (h[0] === "2002") return true;

  // 2001:0000::/32 teredo
  if (h[0] === "2001" && h[1] === "0000") return true;

  // 2001:0db8::/32 documentation
  if (h[0] === "2001" && h[1] === "0db8") return true;

  return false;
}

// ════════════════════════════════════════════════════════════════
//  ❺ COMPILED DATABASES
// ════════════════════════════════════════════════════════════════

var JO_IPV4     = compileIPv4(JO_IPV4_RAW);
var BLOCKED_V4  = compileIPv4(BLOCKED_V4_RAW);
var JO_IPV6     = compileIPv6(JO_IPV6_RAW);
var BLOCKED_V6  = compileIPv6(BLOCKED_V6_RAW);

// ════════════════════════════════════════════════════════════════
//  ❻ RANGE LOOKUP
// ════════════════════════════════════════════════════════════════

function jordanIndex4(ip) {
  var ipInt = ipv4ToInt(ip), i, row;
  for (i = 0; i < JO_IPV4.length; i++) {
    row = JO_IPV4[i];
    if ((ipInt & row[1]) === row[0]) return i;
  }
  return -1;
}

function jordanIndex6(full) {
  var i, row;
  for (i = 0; i < JO_IPV6.length; i++) {
    row = JO_IPV6[i];
    if (matchIPv6(full, row[0], row[1])) return i;
  }
  return -1;
}

function isBlocked4(ip) {
  var ipInt = ipv4ToInt(ip), i, row;
  for (i = 0; i < BLOCKED_V4.length; i++) {
    row = BLOCKED_V4[i];
    if ((ipInt & row[1]) === row[0]) return true;
  }
  return false;
}

function isBlocked6(full) {
  var i, row;

  if (isSpecialBlocked6(full)) return true;

  for (i = 0; i < BLOCKED_V6.length; i++) {
    row = BLOCKED_V6[i];
    if (matchIPv6(full, row[0], row[1])) return true;
  }

  return false;
}

// ════════════════════════════════════════════════════════════════
//  ❼ TRAFFIC CLASSIFICATION
// ════════════════════════════════════════════════════════════════

function classifyTraffic(host, url) {
  var d = (host + " " + url).toLowerCase();

  if (/match|battle|classic|ranked|unranked|competi|arena|tdm|teamdeath|ingame|gamesvr|relay|realtime|spectate|combat|survival|erangel|miramar|sanhok|vikendi|karakin|livik|nusa|haven|deston|rondo|spawn|parachute|plane|circle|zone|redzone|bluehole|squad|duo|solo|fpp|tpp|fireteam/ix.test(d))
    return "match";

  if (/lobby|login|auth|session|gateway|region|matchmak|queue|profile|inventory|store|catalog|news|event|mission|reward|heartbeat|keepalive|ping|version|init|bootstrap|friends|clan|chat|voice|party|rank|leaderboard|checkin|signin|signup|register|verify|token/ix.test(d))
    return "lobby";

  return "general";
}

// ════════════════════════════════════════════════════════════════
//  ❽ APPLICATION FILTER
// ════════════════════════════════════════════════════════════════

function isPUBG(h, u) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|proxima|gpubgm|battleground|amsoveasea|tencentgames|igamecj|beacon\.qq|midas\.qq|ssl\.msdk|pandora\.qq|mcgi\.qq|mstat\.qq|stat\.intl|gcloud|qpic\.cn|myqcloud|tencentcs|cdntips|gamesafe|anticheat|battleye|xd\.com|garena|garenanow/ix.test(h + " " + u);
}

function isCDNorTelemetry(h, u) {
  return /\.cdn\.|cloudfront\.net|akamai|\.edgesuite\.|fastly|cloudflare|crashlytics|analytics|appsflyer|adjust\.com|branch\.io|firebase|bugly|sentry\.io|bugsnag|hotfix|\.dnsv1\.com|cdntips\.net|cdnbuzz/ix.test(h + " " + u);
}

// ════════════════════════════════════════════════════════════════
//  ❾ SESSION STATE
// ════════════════════════════════════════════════════════════════

var SESSION = {
  rangeId4:     -1,
  rangeId6:     -1,
  phase:        "general",
  inMatch:      false,
  matchHunting: false,
  huntingCount: 0,
  lastMatchMs:  0,
  lastActivity: 0
};

var SESSION_TIMEOUT_MS = 30 * 60 * 1000;
var MATCH_END_TIMEOUT  = 45 * 1000;
var MAX_HUNTING        = 80;

function getTimestamp() {
  try { return new Date().getTime(); } catch(e) { return 0; }
}

function autoReset() {
  SESSION.rangeId4     = -1;
  SESSION.rangeId6     = -1;
  SESSION.phase        = "general";
  SESSION.inMatch      = false;
  SESSION.matchHunting = false;
  SESSION.huntingCount = 0;
  SESSION.lastMatchMs  = 0;
}

function checkAndReset(now) {
  if (SESSION.lastActivity > 0 &&
      (now - SESSION.lastActivity) > SESSION_TIMEOUT_MS) {
    autoReset();
    return;
  }

  if (SESSION.inMatch && SESSION.lastMatchMs > 0 &&
      (now - SESSION.lastMatchMs) > MATCH_END_TIMEOUT) {
    autoReset();
  }
}

function handleMatchHunting() {
  SESSION.matchHunting = true;
  SESSION.huntingCount++;
  SESSION.lastMatchMs = getTimestamp();

  if (SESSION.huntingCount >= MAX_HUNTING) autoReset();
  return PROXY;
}

// ════════════════════════════════════════════════════════════════
//  ❿ DNS CACHE
// ════════════════════════════════════════════════════════════════

var DNS_CACHE = {};
var DNS_CACHE_TTL_MS = 20000;

function resolveHostCached(host, now) {
  var c = DNS_CACHE[host];
  if (c && (now - c.t) < DNS_CACHE_TTL_MS) return c.ip;

  var ip = "";
  try { ip = dnsResolve(host) || ""; } catch(e) { ip = ""; }

  DNS_CACHE[host] = { ip: ip, t: now };
  return ip;
}

// ════════════════════════════════════════════════════════════════
//  ⓫ MAIN ENTRY POINT
// ════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  // 1) very fast checks
  if (isPlainHostName(host))       return DIRECT;
  if (!isPUBG(host, url))          return DIRECT;
  if (isCDNorTelemetry(host, url)) return DIRECT;

  // 2) classify before DNS
  var phase = classifyTraffic(host, url);

  // 3) lobby/general => direct without dnsResolve
  if (phase !== "match") {
    var now0 = getTimestamp();
    checkAndReset(now0);
    SESSION.lastActivity = now0;

    if (SESSION.inMatch) {
      autoReset();
      SESSION.phase = phase;
    } else {
      SESSION.phase = phase;
    }

    return DIRECT;
  }

  // 4) match => resolve + inspect range
  var now = getTimestamp();
  checkAndReset(now);

  var ip = resolveHostCached(host, now);
  if (!ip) return BLOCK;

  SESSION.lastActivity = now;
  SESSION.lastMatchMs  = now;
  SESSION.inMatch      = true;
  SESSION.phase        = "match";
  SESSION.matchHunting = false;

  // IPv6
  if (ip.indexOf(":") !== -1) {
    var full = expandIPv6(ip);
    if (!full || isBlocked6(full)) return BLOCK;

    var rid6 = jordanIndex6(full);
    if (rid6 !== -1) {
      if (SESSION.rangeId6 === -1) SESSION.rangeId6 = rid6;
      SESSION.matchHunting = false;
      SESSION.huntingCount = 0;
      return PROXY;
    }

    return handleMatchHunting();
  }

  // IPv4
  if (ip.indexOf(".") !== -1) {
    if (isBlocked4(ip)) return BLOCK;

    var rid4 = jordanIndex4(ip);
    if (rid4 !== -1) {
      if (SESSION.rangeId4 === -1) SESSION.rangeId4 = rid4;
      SESSION.matchHunting = false;
      SESSION.huntingCount = 0;
      return PROXY;
    }

    return handleMatchHunting();
  }

  return BLOCK;
}
