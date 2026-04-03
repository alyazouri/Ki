// ════════════════════════════════════════════════════════════════
//  PROXY PAC — Jordan Smart Match Routing  v7
//  Optimized: fast recruit · low latency · flexible thresholds
// ════════════════════════════════════════════════════════════════

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ════════════════════════════════════════════════════════════════
//  ❶ JORDAN IPv4 — TIERS
//  Tier 1 = strong trust  |  Tier 2 = medium  |  Tier 3 = supplemental
// ════════════════════════════════════════════════════════════════

var JO_IPV4_T1_RAW = [
  ["5.45.128.0",    20],
  ["37.123.64.0",   19],
  ["37.202.64.0",   18],
  ["37.220.112.0",  20],
  ["46.23.112.0",   20],
  ["46.32.96.0",    19],
  ["46.185.128.0",  17],
  ["46.248.192.0",  19],
  ["62.72.160.0",   19],
  ["77.245.0.0",    20],
  ["79.134.128.0",  19],
  ["79.173.192.0",  18],
  ["80.90.160.0",   20],
  ["82.212.64.0",   19],
  ["91.186.0.0",    18],
  ["176.29.0.0",    16],
  ["188.247.64.0",  19],
  ["193.188.64.0",  19],
  ["212.118.0.0",   19],
  ["213.139.32.0",  19],
  ["213.186.160.0", 19]
];

var JO_IPV4_T2_RAW = [
  ["5.198.240.0",   21],
  ["5.199.184.0",   22],
  ["37.17.192.0",   20],
  ["81.21.0.0",     20],
  ["87.236.232.0",  21],
  ["89.249.64.0",   20],
  ["93.191.176.0",  21],
  ["94.127.208.0",  21],
  ["94.142.32.0",   19],
  ["95.141.208.0",  20],
  ["109.237.192.0", 20],
  ["176.57.0.0",    19],
  ["176.57.48.0",   20],
  ["176.241.64.0",  21],
  ["178.16.96.0",   21],
  ["178.20.184.0",  21],
  ["178.77.128.0",  18],
  ["188.123.160.0", 19],
  ["212.35.64.0",   19],
  ["217.23.32.0",   20],
  ["217.144.0.0",   20],
  // ── Middle East / AWS Bahrain (PUBG ME servers) ──────────────
  ["15.185.0.0",    16],
  ["157.175.0.0",   16],
  ["5.182.210.0",   23],
  ["194.165.16.0",  22],
  ["185.60.112.0",  22]
];

var JO_IPV4_T3_RAW = [
  ["185.14.132.0",  22],
  ["185.27.118.0",  23],
  ["185.30.248.0",  22],
  ["185.33.28.0",   22],
  ["185.51.212.0",  22],
  ["185.57.120.0",  22],
  ["185.80.24.0",   22],
  ["185.80.104.0",  22],
  ["185.96.68.0",   22],
  ["185.98.220.0",  21],
  ["185.109.120.0", 22],
  ["185.159.180.0", 22],
  ["185.160.236.0", 22],
  ["185.193.176.0", 22],
  ["185.197.176.0", 22],
  ["185.200.128.0", 22],
  ["193.17.53.0",   24],
  ["193.108.134.0", 23],
  ["193.189.148.0", 24],
  ["193.203.24.0",  23],
  ["194.104.95.0",  24],
  ["217.29.240.0",  20]
];

// ════════════════════════════════════════════════════════════════
//  ❷ JORDAN IPv6 — TIERS
// ════════════════════════════════════════════════════════════════

var JO_IPV6_T1_RAW = [
  ["2a00:caa0::", 32],
  ["2a01:01d0::", 29],
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

var JO_IPV6_T2_RAW = [];
var JO_IPV6_T3_RAW = [];

// ════════════════════════════════════════════════════════════════
//  ❸ BLOCK DATABASE
// ════════════════════════════════════════════════════════════════

var BLOCKED_V4_RAW = [
  ["0.0.0.0",       8],
  ["10.0.0.0",      8],
  ["100.64.0.0",   10],
  ["127.0.0.0",     8],
  ["169.254.0.0",  16],
  ["172.16.0.0",   12],
  ["192.168.0.0",  16],
  ["2.144.0.0",    14],
  ["2.176.0.0",    12],
  ["5.52.0.0",     15],
  ["5.56.0.0",     13],
  ["5.160.0.0",    14],
  ["5.200.0.0",    16],
  ["14.139.0.0",   16],
  ["14.140.0.0",   14],
  ["27.54.0.0",    15],
  ["39.32.0.0",    11],
  ["43.224.0.0",   13],
  ["58.27.128.0",  17],
  ["58.65.128.0",  17],
  ["103.0.0.0",    13]
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
//  ❹ UTILITIES
// ════════════════════════════════════════════════════════════════

function ipv4ToInt(ip) {
  var p = ip.split(".");
  if (p.length !== 4) return 0;
  return (
    ((parseInt(p[0], 10) << 24) >>> 0) |
    ((parseInt(p[1], 10) << 16) >>> 0) |
    ((parseInt(p[2], 10) << 8)  >>> 0) |
    ( parseInt(p[3], 10)        >>> 0)
  ) >>> 0;
}

function cidrMask4(bits) {
  return bits === 0 ? 0 : ((0xFFFFFFFF << (32 - bits)) >>> 0);
}

function compileIPv4(list) {
  var out = [], i, bits, mask;
  for (i = 0; i < list.length; i++) {
    bits = list[i][1];
    mask = cidrMask4(bits);
    out.push([(ipv4ToInt(list[i][0]) & mask) >>> 0, mask]);
  }
  return out;
}

function expandIPv6(addr) {
  if (!addr || addr.indexOf(":") === -1) return null;
  if (addr.lastIndexOf(".") !== -1) return null;

  var halves = addr.split("::");
  var full = [], L, R, z, k;

  if (halves.length === 2) {
    L = halves[0] ? halves[0].split(":") : [];
    R = halves[1] ? halves[1].split(":") : [];
    full = L.slice(0);
    for (z = 0; z < 8 - L.length - R.length; z++) full.push("0000");
    for (z = 0; z < R.length; z++) full.push(R[z]);
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
  if (bits === 32) return a[0] === b[0] && a[1] === b[1];
  if (bits === 29) return a[0] === b[0] &&
                          ((parseInt(a[1], 16) >> 3) === (parseInt(b[1], 16) >> 3));
  return false;
}

function inCompiledIPv4(ip, compiled) {
  var ipInt = ipv4ToInt(ip), i, row;
  for (i = 0; i < compiled.length; i++) {
    row = compiled[i];
    if (((ipInt & row[1]) >>> 0) === row[0]) return true;
  }
  return false;
}

function inCompiledIPv6(full, compiled) {
  var i, row;
  for (i = 0; i < compiled.length; i++) {
    row = compiled[i];
    if (matchIPv6(full, row[0], row[1])) return true;
  }
  return false;
}

function isSpecialBlocked6(full) {
  if (!full) return true;
  var h = full.split(":");
  var h0 = parseInt(h[0], 16);
  if (full === "0000:0000:0000:0000:0000:0000:0000:0001") return true;
  if ((h0 & 0xffc0) === 0xfe80) return true;
  if ((h0 & 0xfe00) === 0xfc00) return true;
  if ((h0 & 0xff00) === 0xff00) return true;
  if (h[0] === "2002") return true;
  if (h[0] === "2001" && h[1] === "0000") return true;
  if (h[0] === "2001" && h[1] === "0db8") return true;
  return false;
}

// ════════════════════════════════════════════════════════════════
//  ❺ COMPILED TABLES
// ════════════════════════════════════════════════════════════════

var JO_IPV4_T1 = compileIPv4(JO_IPV4_T1_RAW);
var JO_IPV4_T2 = compileIPv4(JO_IPV4_T2_RAW);
var JO_IPV4_T3 = compileIPv4(JO_IPV4_T3_RAW);

var JO_IPV6_T1 = compileIPv6(JO_IPV6_T1_RAW);
var JO_IPV6_T2 = compileIPv6(JO_IPV6_T2_RAW);
var JO_IPV6_T3 = compileIPv6(JO_IPV6_T3_RAW);

var BLOCKED_V4 = compileIPv4(BLOCKED_V4_RAW);
var BLOCKED_V6 = compileIPv6(BLOCKED_V6_RAW);

// ════════════════════════════════════════════════════════════════
//  ❻ APP FILTERS
// ════════════════════════════════════════════════════════════════

function isPUBG(h, u) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|proxima|gpubgm|
          battleground|amsoveasea|tencentgames|igamecj|beacon\.qq|midas\.qq|
          ssl\.msdk|pandora\.qq|mcgi\.qq|mstat\.qq|stat\.intl|gcloud|qpic\.cn|
          myqcloud|tencentcs|cdntips|gamesafe|anticheat|battleye|xd\.com|
          garena|garenanow/i.test(h + " " + u);
}

function isCDNorTelemetry(h, u) {
  return /\.cdn\.|cloudfront\.net|akamai|\.edgesuite\.|fastly|cloudflare|
          crashlytics|analytics|appsflyer|adjust\.com|branch\.io|firebase|
          bugly|sentry\.io|bugsnag|hotfix|\.dnsv1\.com|cdntips\.net|cdnbuzz/i.test(h + " " + u);
}

// ════════════════════════════════════════════════════════════════
//  ❼ TRAFFIC CLASSIFIER
//  Returns: "match" | "lobby" | "general"
//  Lobby traffic now routes via PROXY to enable fast cross-region
//  matchmaking and player discovery.
// ════════════════════════════════════════════════════════════════

function classifyTraffic(host, url) {
  var d = (host + " " + url).toLowerCase();

  // ── Match / In-game ──────────────────────────────────────────
  if (/match|battle|classic|ranked|unranked|competi|arena|tdm|
       teamdeath|ingame|gamesvr|relay|realtime|spectate|combat|
       survival|erangel|miramar|sanhok|vikendi|karakin|livik|
       nusa|haven|deston|rondo|spawn|parachute|plane|circle|zone|
       redzone|bluehole|squad|duo|solo|fpp|tpp|fireteam/i.test(d))
    return "match";

  // ── Lobby / Recruit / Matchmake ──────────────────────────────
  if (/lobby|login|auth|session|gateway|region|matchmak|queue|
       recruit|enlist|roster|fill|backfill|search|findmatch|
       roomlist|roominfo|serverlist|ping|version|init|bootstrap|
       friends|clan|chat|voice|party|rank|leaderboard|checkin|
       signin|signup|register|verify|token|heartbeat|keepalive/i.test(d))
    return "lobby";

  return "general";
}

// ════════════════════════════════════════════════════════════════
//  ❽ HOST CONFIDENCE
// ════════════════════════════════════════════════════════════════

function hostConfidence(host, url) {
  var s = (host + " " + url).toLowerCase();
  if (/gamesvr|relay|realtime|ingame|match|battle|combat|arena|
       spectate|bluehole|krafton|lightspeed|proxima|gpubgm/i.test(s))
    return 3;
  if (/session|gateway|region|queue|matchmak|heartbeat|keepalive|
       login|auth|recruit|findmatch|roomlist/i.test(s))
    return 2;
  if (/pubg|tencent|levelinfinite|battleground/i.test(s))
    return 1;
  return 0;
}

// ════════════════════════════════════════════════════════════════
//  ❾ SESSION STATE
// ════════════════════════════════════════════════════════════════

var SESSION = {
  phase:        "general",
  inMatch:      false,
  matchHunting: false,
  huntingCount: 0,
  lastMatchMs:  0,
  lastActivity: 0,
  stickyV4:     "",
  stickyV6:     "",
  stickyTier:   0,
  stickyHost:   ""
};

var SESSION_TIMEOUT_MS = 30 * 60 * 1000;  // 30 min idle reset
var MATCH_END_TIMEOUT  = 20 * 1000;        // 20 s without match traffic → reset
var MAX_HUNTING        = 150;              // max hunt cycles before reset

var DNS_CACHE     = {};
var DNS_CACHE_TTL = 20000;                 // 20 s DNS cache TTL

// ════════════════════════════════════════════════════════════════
//  ❿ SESSION HELPERS
// ════════════════════════════════════════════════════════════════

function getTimestamp() {
  try { return new Date().getTime(); } catch(e) { return 0; }
}

function autoReset() {
  SESSION.phase        = "general";
  SESSION.inMatch      = false;
  SESSION.matchHunting = false;
  SESSION.huntingCount = 0;
  SESSION.lastMatchMs  = 0;
  SESSION.stickyV4     = "";
  SESSION.stickyV6     = "";
  SESSION.stickyTier   = 0;
  SESSION.stickyHost   = "";
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

function resolveHostCached(host, now) {
  var c = DNS_CACHE[host];
  if (c && (now - c.t) < DNS_CACHE_TTL) return c.ip;
  var ip = "";
  try { ip = dnsResolve(host) || ""; } catch(e) { ip = ""; }
  DNS_CACHE[host] = { ip: ip, t: now };
  return ip;
}

function samePrefix4(ipA, ipB, bits) {
  if (!ipA || !ipB) return false;
  var mask = cidrMask4(bits);
  return ((ipv4ToInt(ipA) & mask) >>> 0) === ((ipv4ToInt(ipB) & mask) >>> 0);
}

function samePrefix6(ipA, ipB, bits) {
  if (!ipA || !ipB) return false;
  return matchIPv6(ipA, ipB, bits);
}

function applySticky(ip, isV6, tier) {
  SESSION.stickyTier   = tier;
  SESSION.matchHunting = false;
  SESSION.huntingCount = 0;
  if (isV6) {
    SESSION.stickyV6 = ip;
    SESSION.stickyV4 = "";
  } else {
    SESSION.stickyV4 = ip;
    SESSION.stickyV6 = "";
  }
}

function handleMatchHunting(now) {
  SESSION.matchHunting  = true;
  SESSION.huntingCount += 1;
  SESSION.lastMatchMs   = now;
  if (SESSION.huntingCount >= MAX_HUNTING) autoReset();
  return PROXY;
}

// ════════════════════════════════════════════════════════════════
//  ⓫ SCORING ENGINE
//  Thresholds relaxed vs v6: accept ≥ 60 (was 70) and ≥ 45 (was 55)
//  to reduce hunt cycles and speed up initial routing.
// ════════════════════════════════════════════════════════════════

function scoreDecision(phase, hostConf, tier, stickyBoost) {
  var score = 0;

  // Phase weight
  if      (phase === "match") score += 50;
  else if (phase === "lobby") score += 20;   // lobby now contributes score

  // Host confidence
  if      (hostConf === 3) score += 30;
  else if (hostConf === 2) score += 20;
  else if (hostConf === 1) score += 10;

  // IP tier
  if      (tier === 1) score += 30;
  else if (tier === 2) score += 18;
  else if (tier === 3) score += 10;

  // Sticky bonus
  if (stickyBoost) score += 20;

  return score;
}

// ════════════════════════════════════════════════════════════════
//  ⓬ MAIN
// ════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {

  // ── Fast exits ───────────────────────────────────────────────
  if (isPlainHostName(host))      return DIRECT;
  if (!isPUBG(host, url))         return DIRECT;
  if (isCDNorTelemetry(host, url)) return DIRECT;

  // ── Classify & tick ──────────────────────────────────────────
  var phase = classifyTraffic(host, url);
  var now   = getTimestamp();

  checkAndReset(now);
  SESSION.lastActivity = now;
  SESSION.phase        = phase;

  // ── Lobby: proxy to widen matchmaking pool ───────────────────
  if (phase === "lobby") {
    if (SESSION.inMatch) return DIRECT;   // in-match auxiliary → bypass
    return PROXY;                          // pre-match → proxy for fast recruit
  }

  // ── General traffic: always direct ──────────────────────────
  if (phase === "general") {
    if (SESSION.inMatch) { autoReset(); }
    return DIRECT;
  }

  // ── Match traffic: resolve then decide ──────────────────────
  var ip = resolveHostCached(host, now);
  if (!ip) return BLOCK;

  SESSION.inMatch     = true;
  SESSION.lastMatchMs = now;
  SESSION.stickyHost  = host;

  // ══ IPv6 path ════════════════════════════════════════════════
  if (ip.indexOf(":") !== -1) {
    var full6 = expandIPv6(ip);
    if (!full6 || isBlocked6(full6)) return BLOCK;

    var tier6   = inCompiledIPv6(full6, JO_IPV6_T1) ? 1 :
                  inCompiledIPv6(full6, JO_IPV6_T2) ? 2 :
                  inCompiledIPv6(full6, JO_IPV6_T3) ? 3 : 0;

    var h6      = hostConfidence(host, url);
    var sticky6 = SESSION.stickyV6
                  ? (samePrefix6(full6, SESSION.stickyV6, 32) ||
                     samePrefix6(full6, SESSION.stickyV6, 29))
                  : false;

    if (tier6 > 0) {
      var score6 = scoreDecision(phase, h6, tier6, sticky6);
      if (score6 >= 60) { applySticky(full6, true, tier6); return PROXY; }
      if (score6 >= 45 && h6 >= 1) { applySticky(full6, true, tier6); return PROXY; }
      return handleMatchHunting(now);
    }

    if (sticky6 && h6 >= 1) return PROXY;
    return handleMatchHunting(now);
  }

  // ══ IPv4 path ════════════════════════════════════════════════
  if (ip.indexOf(".") !== -1) {
    if (inCompiledIPv4(ip, BLOCKED_V4)) return BLOCK;

    var tier4   = inCompiledIPv4(ip, JO_IPV4_T1) ? 1 :
                  inCompiledIPv4(ip, JO_IPV4_T2) ? 2 :
                  inCompiledIPv4(ip, JO_IPV4_T3) ? 3 : 0;

    var h4      = hostConfidence(host, url);
    var sticky4 = SESSION.stickyV4
                  ? (samePrefix4(ip, SESSION.stickyV4, 24) ||
                     samePrefix4(ip, SESSION.stickyV4, 20) ||
                     samePrefix4(ip, SESSION.stickyV4, 19))
                  : false;

    if (tier4 > 0) {
      var score4 = scoreDecision(phase, h4, tier4, sticky4);
      if (score4 >= 60) { applySticky(ip, false, tier4); return PROXY; }
      if (score4 >= 45 && h4 >= 1) { applySticky(ip, false, tier4); return PROXY; }
      return handleMatchHunting(now);
    }

    if (sticky4 && h4 >= 1) return PROXY;
    return handleMatchHunting(now);
  }

  return BLOCK;
}
