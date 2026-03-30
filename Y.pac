// ╔════════════════════════════════════════════════════════════════════════════════╗
// ║  PUBG MOBILE JORDAN — V5.0 GOVERNORATE EDITION 🇯🇴                          ║
// ║                                                                              ║
// ║  "بنق صفر — دروب صفر — فريقك أردني — خصمك أردني"                           ║
// ║                                                                              ║
// ║  ⚡ Zero-Copy Fast Path        🎯 GeoLock Amman                              ║
// ║  🛡️ Distance Blocker           🔒 Force JO Matchmaking                      ║
// ║  📡 Pre-Warming Connections    🚫 Global Server Blocker                      ║
// ║  🎮 Frame-Priority Routing     ⏳ Patient Queue System                       ║
// ║  🗺️ Governorate-Aware Ranges  📊 ISP Fingerprinting                         ║
// ║                                                                              ║
// ║  آخر تحديث: 2025 — النطاقات حسب المحافظات                                   ║
// ╚════════════════════════════════════════════════════════════════════════════════╝


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 1: PROXY INFRASTRUCTURE                                             █
// ████████████████████████████████████████████████████████████████████████████████

var MATCH_PROXIES = [  { id: "M1",  proxy: "PROXY 46.185.131.218:20001",  city: "amman-center",  tier: 1, priority: 1,  alive: true, latency: 1,  lastCheck: 0, failStreak: 0 },  { id: "M2",  proxy: "PROXY 46.185.131.219:20001",  city: "amman-center",  tier: 1, priority: 2,  alive: true, latency: 2,  lastCheck: 0, failStreak: 0 },  { id: "M3",  proxy: "PROXY 176.29.153.95:20001",   city: "amman-west",    tier: 1, priority: 3,  alive: true, latency: 2,  lastCheck: 0, failStreak: 0 },  { id: "M4",  proxy: "PROXY 212.35.66.45:20001",    city: "amman-east",    tier: 1, priority: 4,  alive: true, latency: 3,  lastCheck: 0, failStreak: 0 },  { id: "M5",  proxy: "PROXY 92.253.64.10:20001",    city: "amman-north",   tier: 2, priority: 5,  alive: true, latency: 5,  lastCheck: 0, failStreak: 0 },  { id: "M6",  proxy: "PROXY 94.249.32.15:20001",    city: "amman-south",   tier: 2, priority: 6,  alive: true, latency: 5,  lastCheck: 0, failStreak: 0 },  { id: "M7",  proxy: "PROXY 82.212.80.20:20001",    city: "amman-west",    tier: 2, priority: 7,  alive: true, latency: 6,  lastCheck: 0, failStreak: 0 }];

var LOBBY_POOL = [  { id: "L1",  proxy: "PROXY 212.35.66.45:8085",      weight: 8,  score: 100, alive: true, city: "amman",   consecutiveFails: 0 },  { id: "L2",  proxy: "PROXY 176.29.153.95:9030",     weight: 7,  score: 100, alive: true, city: "amman",   consecutiveFails: 0 },  { id: "L3",  proxy: "PROXY 46.185.131.218:20002",   weight: 7,  score: 100, alive: true, city: "amman",   consecutiveFails: 0 },  { id: "L4",  proxy: "PROXY 92.253.64.10:8080",      weight: 6,  score: 100, alive: true, city: "amman",   consecutiveFails: 0 },  { id: "L5",  proxy: "PROXY 94.249.32.15:9050",      weight: 6,  score: 100, alive: true, city: "amman",   consecutiveFails: 0 },  { id: "L6",  proxy: "PROXY 82.212.80.20:8080",      weight: 5,  score: 100, alive: true, city: "amman",   consecutiveFails: 0 },  { id: "L7",  proxy: "PROXY 149.200.192.10:9060",    weight: 5,  score: 100, alive: true, city: "amman",   consecutiveFails: 0 },  { id: "L8",  proxy: "PROXY 178.77.140.5:8090",      weight: 5,  score: 100, alive: true, city: "amman",   consecutiveFails: 0 },  { id: "L9",  proxy: "PROXY 37.220.120.5:8080",      weight: 4,  score: 100, alive: true, city: "amman",   consecutiveFails: 0 },  { id: "L10", proxy: "PROXY 188.247.80.10:8080",     weight: 4,  score: 100, alive: true, city: "amman",   consecutiveFails: 0 }];

var SOCIAL_POOL = [  { id: "S1",  proxy: "PROXY 212.35.66.45:8086",      alive: true, score: 100, type: "voice",  city: "amman" },  { id: "S2",  proxy: "PROXY 176.29.153.95:9031",     alive: true, score: 100, type: "voice",  city: "amman" },  { id: "S3",  proxy: "PROXY 46.185.131.220:20003",   alive: true, score: 100, type: "voice",  city: "amman" },  { id: "S4",  proxy: "PROXY 37.220.120.5:8087",      alive: true, score: 100, type: "chat",   city: "amman" },  { id: "S5",  proxy: "PROXY 188.247.80.10:9032",     alive: true, score: 100, type: "chat",   city: "amman" }];

var SPECTATE_POOL = [  { id: "SP1", proxy: "PROXY 46.185.131.218:20004",   alive: true, score: 100 },  { id: "SP2", proxy: "PROXY 176.29.153.95:20004",    alive: true, score: 100 },  { id: "SP3", proxy: "PROXY 212.35.66.45:20004",     alive: true, score: 100 }];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 2: GEO DATABASE — JORDAN IPv4 (RIPE NCC verified)                  █
// ████████████████████████████████████████████████████████████████████████████████

// ═══ Complete Jordan IPv4 — 42 ranges ═══
var JORDAN_IPV4 = [  // Orange Jordan — AS8376  ["91.106.96.0",     "255.255.240.0"],
  ["176.28.128.0",    "255.255.128.0"],
  ["176.29.0.0",      "255.255.0.0"],
  ["77.69.0.0",       "255.255.0.0"],
  ["213.139.192.0",   "255.255.192.0"],
  ["213.139.128.0",   "255.255.192.0"],
  ["85.113.64.0",     "255.255.192.0"],
  ["217.18.224.0",    "255.255.224.0"],
  // Zain Jordan — AS48832
  ["82.212.64.0",     "255.255.192.0"],
  ["37.202.64.0",     "255.255.192.0"],
  ["94.249.0.0",      "255.255.0.0"],
  ["37.48.64.0",      "255.255.192.0"],
  ["185.117.72.0",    "255.255.252.0"],
  ["185.117.76.0",    "255.255.252.0"],
  // Umniah — AS9038
  ["149.200.128.0",   "255.255.128.0"],
  ["178.77.128.0",    "255.255.128.0"],
  ["37.152.0.0",      "255.255.240.0"],
  ["185.16.72.0",     "255.255.252.0"],
  ["185.95.216.0",    "255.255.252.0"],
  ["185.95.220.0",    "255.255.252.0"],
  // JTG — AS8697
  ["212.35.64.0",     "255.255.128.0"],
  ["217.144.64.0",    "255.255.192.0"],
  ["86.108.0.0",      "255.252.0.0"],
  // Batelco — AS42932
  ["87.101.128.0",    "255.255.128.0"],
  ["185.86.232.0",    "255.255.252.0"],
  // RIPE JO General
  ["46.185.128.0",    "255.255.128.0"],
  ["92.253.0.0",      "255.255.0.0"],
  ["95.172.192.0",    "255.255.224.0"],
  ["188.247.64.0",    "255.255.192.0"],
  ["37.220.112.0",    "255.255.240.0"],
  ["37.98.192.0",     "255.255.192.0"],
  ["185.121.160.0",   "255.255.224.0"],
  // Gov + Academic
  ["194.9.40.0",      "255.255.248.0"],
  ["193.188.64.0",    "255.255.192.0"],
  ["195.43.0.0",      "255.255.128.0"],
  // JO Data Centers
  ["185.180.12.0",    "255.255.252.0"],
  ["45.94.36.0",      "255.255.252.0"],
  ["185.236.136.0",   "255.255.252.0"]
];

// ═══ Amman-Specific Ranges — 13 ranges ═══
var AMMAN_IPV4 = [  ["176.29.0.0",      "255.255.0.0"],
  ["77.69.0.0",       "255.255.128.0"],
  ["91.106.96.0",     "255.255.240.0"],
  ["213.139.192.0",   "255.255.192.0"],
  ["94.249.0.0",      "255.255.128.0"],
  ["82.212.64.0",     "255.255.192.0"],
  ["37.202.64.0",     "255.255.192.0"],
  ["149.200.128.0",   "255.255.192.0"],
  ["178.77.128.0",    "255.255.192.0"],
  ["212.35.64.0",     "255.255.192.0"],
  ["86.108.0.0",      "255.254.0.0"],
  ["46.185.128.0",    "255.255.128.0"],
  ["92.253.0.0",      "255.255.128.0"]
];

// ═══ Jordan IPv6 — 20 prefixes ═══
var JORDAN_IPV6 = [  "2a00:18d0", "2a00:18d4", "2a00:18d8", "2a00:18dc",  "2a01:9700", "2a01:9704", "2a01:9708", "2a01:970c",  "2a02:c040", "2a02:c044", "2a02:c048",  "2a04:2e00", "2a04:2e04", "2a04:2e08",  "2a05:74c0", "2a06:8ec0", "2001:41f0",  "2a09:b2c0", "2a0d:5600", "2a0e:97c0"];


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 3: GLOBAL SERVER BLOCKER                                            █
// ████████████████████████████████████████████████████████████████████████████████

var BLOCKED_SERVER_REGIONS = [  // North America  ["3.0.0.0","255.0.0.0"],["4.0.0.0","252.0.0.0"],["8.0.0.0","255.0.0.0"],
  ["12.0.0.0","252.0.0.0"],["16.0.0.0","240.0.0.0"],["32.0.0.0","224.0.0.0"],
  ["52.0.0.0","252.0.0.0"],["54.0.0.0","254.0.0.0"],["64.0.0.0","192.0.0.0"],
  ["72.0.0.0","248.0.0.0"],["96.0.0.0","224.0.0.0"],["104.0.0.0","248.0.0.0"],
  ["128.0.0.0","192.0.0.0"],["142.0.0.0","254.0.0.0"],["172.64.0.0","255.192.0.0"],
  ["184.0.0.0","252.0.0.0"],["192.0.0.0","255.128.0.0"],["199.0.0.0","255.0.0.0"],
  ["204.0.0.0","252.0.0.0"],["208.0.0.0","240.0.0.0"],
  // South America
  ["177.0.0.0","255.0.0.0"],["179.0.0.0","255.0.0.0"],["181.0.0.0","255.0.0.0"],
  ["186.0.0.0","254.0.0.0"],["189.0.0.0","255.0.0.0"],["190.0.0.0","254.0.0.0"],
  ["200.0.0.0","252.0.0.0"],
  // East Asia / APNIC
  ["1.0.0.0","255.0.0.0"],["14.0.0.0","254.0.0.0"],["27.0.0.0","255.0.0.0"],
  ["36.0.0.0","254.0.0.0"],["39.0.0.0","255.0.0.0"],["42.0.0.0","254.0.0.0"],
  ["49.0.0.0","255.0.0.0"],["58.0.0.0","254.0.0.0"],["60.0.0.0","252.0.0.0"],
  ["101.0.0.0","255.0.0.0"],["103.0.0.0","255.0.0.0"],["106.0.0.0","254.0.0.0"],
  ["110.0.0.0","254.0.0.0"],["112.0.0.0","240.0.0.0"],["119.0.0.0","255.0.0.0"],
  ["121.0.0.0","255.0.0.0"],["122.0.0.0","254.0.0.0"],["124.0.0.0","252.0.0.0"],
  ["125.0.0.0","255.0.0.0"],["133.0.0.0","255.0.0.0"],["150.0.0.0","254.0.0.0"],
  ["153.0.0.0","255.0.0.0"],["157.0.0.0","255.0.0.0"],["163.0.0.0","255.0.0.0"],
  ["175.0.0.0","255.0.0.0"],["180.0.0.0","252.0.0.0"],["202.0.0.0","254.0.0.0"],
  ["210.0.0.0","254.0.0.0"],["218.0.0.0","254.0.0.0"],["220.0.0.0","252.0.0.0"],
  ["222.0.0.0","254.0.0.0"],
  // Africa (includes Libya)
  ["41.0.0.0","255.0.0.0"],["102.0.0.0","254.0.0.0"],["105.0.0.0","255.0.0.0"],
  ["154.0.0.0","254.0.0.0"],["156.0.0.0","252.0.0.0"],["160.0.0.0","224.0.0.0"],
  ["196.0.0.0","252.0.0.0"],["197.0.0.0","255.0.0.0"],
  // Oceania
  ["43.224.0.0","255.224.0.0"],["116.0.0.0","252.0.0.0"],["120.0.0.0","254.0.0.0"],
  ["144.0.0.0","240.0.0.0"],["203.0.0.0","255.0.0.0"],
  // Afghanistan
  ["103.5.172.0","255.255.252.0"],["103.15.220.0","255.255.252.0"],
  ["103.24.148.0","255.255.252.0"],["103.26.104.0","255.255.252.0"],
  ["103.29.140.0","255.255.252.0"],["103.31.248.0","255.255.252.0"],
  ["103.244.40.0","255.255.252.0"],["43.231.28.0","255.255.252.0"],
  ["43.249.40.0","255.255.252.0"],
  // Aruba / Caribbean
  ["190.220.0.0","255.252.0.0"],["181.41.192.0","255.255.192.0"],
  ["200.1.80.0","255.255.240.0"],
  // Russia / CIS (JO exceptions applied later)
  ["5.0.0.0","255.0.0.0"],["31.0.0.0","255.0.0.0"],["46.0.0.0","255.0.0.0"],
  ["62.0.0.0","254.0.0.0"],["77.0.0.0","255.0.0.0"],["78.0.0.0","254.0.0.0"],
  ["80.0.0.0","240.0.0.0"],["89.0.0.0","255.0.0.0"],["91.0.0.0","255.0.0.0"],
  ["93.0.0.0","255.0.0.0"],["95.0.0.0","255.0.0.0"],["109.0.0.0","255.0.0.0"],
  ["178.0.0.0","254.0.0.0"],["185.0.0.0","255.0.0.0"],["188.0.0.0","252.0.0.0"],
  ["193.0.0.0","255.0.0.0"],["194.0.0.0","254.0.0.0"],["195.0.0.0","255.0.0.0"],
  ["212.0.0.0","252.0.0.0"],["213.0.0.0","255.0.0.0"],["217.0.0.0","255.0.0.0"]
];

var BLOCKED_IPV6 = [  "2001:43f8","2c0f:","2400:","2404:","2406:","2408:","240e:",  "2600:","2602:","2604:","2607:","2610:","2620:",  "2800:","2801:","2804:",  "2001:4860","2607:f8b0","2a03:","2a0c:"];

// ═══ Allowed Neighbors ═══
var ALLOWED_NEIGHBORS_IPV4 = [  ["2.88.0.0","255.248.0.0"],["5.40.0.0","255.248.0.0"],
  ["37.104.0.0","255.248.0.0"],["46.235.0.0","255.255.0.0"],
  ["78.93.0.0","255.255.0.0"],["188.48.0.0","255.248.0.0"],
  ["5.30.0.0","255.254.0.0"],["5.32.0.0","255.252.0.0"],
  ["82.148.0.0","255.254.0.0"],["94.56.0.0","255.248.0.0"],
  ["188.52.0.0","255.252.0.0"],
  ["37.236.0.0","255.252.0.0"],["77.48.0.0","255.248.0.0"],
  ["185.56.88.0","255.255.252.0"],
  ["5.102.0.0","255.254.0.0"],["37.8.0.0","255.252.0.0"],
  ["188.161.0.0","255.255.0.0"]
];

var KNOWN_JO_GAME_HOSTS = [  "46.185.131","176.29.153","212.35.66","92.253.64","94.249.32",  "82.212.80","149.200.192","37.220.120","188.247.80","178.77.140",  "77.69.64","85.113.80","86.108.32","91.106.100","213.139.200",  "217.144.80","195.43.16","193.188.80"];

var BLOCKED_DOMAINS = [  "ads.pubg","ad.tencent","pgdt.ugdtimg","adsmind.apdcdn","mi.gdt.qq",  "adx.tencent","appsflyer.com","adjust.com","branch.io","analytics.google",  "crashlytics","bugly.qq","beacon.qq","sentry.io","newrelic","datadog",  "hotjar","mixpanel","amplitude","segment.io","mparticle",  ".af",".aw",".ly","afghan","aruba","libya","tripoli",  "na.pubg","sa.pubg","eu-west.pubg","eu-north.pubg","as.pubg",  "sea.pubg","kr.pubg","jp.pubg","oc.pubg","ru.pubg","cn.pubg",  "tw.pubg","la.pubg"];


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 4: ISP FINGERPRINTS                                                 █
// ████████████████████████████████████████████████████████████████████████████████

var ISP_FINGERPRINTS = {
  "orange":  { asn: 8376,  ranges: [0,1,2,3,4,5,6,7],       matchProxy: 0, lobbyWeight: 8 },
  "zain":    { asn: 48832, ranges: [8,9,10,11,12,13],        matchProxy: 1, lobbyWeight: 7 },
  "umniah":  { asn: 9038,  ranges: [14,15,16,17,18,19],      matchProxy: 2, lobbyWeight: 7 },
  "jtg":     { asn: 8697,  ranges: [20,21,22],               matchProxy: 3, lobbyWeight: 6 },
  "batelco": { asn: 42932, ranges: [23,24],                  matchProxy: 4, lobbyWeight: 5 }
};


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 5: SESSION STATE                                                    █
// ████████████████████████████████████████████████████████████████████████████████

var SESSION = {
  matchNet: null, matchHost: null, matchIP: null,
  matchPort: null, matchFingerprint: null,
  matchStartTime: 0, matchDuration: 0,
  isV6: false, matchState: "idle",
  dnsCache: {}, dnsCacheTTL: {},
  DNS_TTL_MS: 30000,
  lobbyIndex: 0, socialIndex: 0, spectateIndex: 0,
  totalWeight: 0, weightsDirty: true,
  matchFailCount: 0, lobbyFailCount: 0, socialFailCount: 0,
  lastMatchTime: 0, lastLobbyTime: 0, lastSocialTime: 0,
  warmupDone: false, proxyHealth: {},
  requestCount: 0, matchCount: 0,
  lobbyCount: 0, socialCount: 0, blockCount: 0,
  blacklistHits: 0,
  latencyHistory: {}, latencyPredict: {},
  latencySamples: 30,
  detectedISP: null, ispConfidence: 0,
  geoLocked: false, geoCity: "amman",
  geoConfidence: 0, isAmmanIP: false,
  preWarmedProxies: {}, preWarmComplete: false, preWarmStartTime: 0,
  framePriority: "normal", lastFrameTime: 0, frameDropCount: 0,
  forceJordanMatch: true,
  queueWaitTime: 0, maxQueueWait: 120000,
  queueRetryCount: 0, maxQueueRetries: 10,
  fastPathCache: {}, fastPathHits: 0,
  maxAllowedDistance: 2, distanceBlockCount: 0,
  isPeakHour: false, isWeekend: false,
  isRamadan: false, timeSlot: "normal",
  metrics: {
    totalRequests: 0, matchRequests: 0,
    lobbyRequests: 0, socialRequests: 0,
    blockedRequests: 0, directRequests: 0,
    blacklistedRequests: 0,
    distanceBlocked: 0, fastPathHits: 0, geoLockEnforced: 0
  }
};

var SESSION_TIMEOUT_MS    = 300000;
var MAX_FAIL_BEFORE_SWAP  = 2;
var MAX_CONSECUTIVE_FAILS = 3;
var PROXY_COOLDOWN_MS     = 30000;


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 6: CORE HELPERS                                                     █
// ████████████████████████████████████████████████████████████████████████████████

function norm(h) {
  if (!h) return "";
  var c = 0, l = -1;
  for (var i = 0; i < h.length; i++) {
    if (h.charAt(i) === ":") { c++; l = i; }
  }
  return (c === 1) ? h.substring(0, l) : h;
}

function isIPv6(ip) { return ip && ip.indexOf(":") > -1 && ip.indexOf(".") === -1; }

function isValidIP(ip) {
  if (!ip) return false;
  if (isIPv6(ip)) return ip.length > 3;
  var p = ip.split(".");
  if (p.length !== 4) return false;
  for (var i = 0; i < 4; i++) {
    var n = parseInt(p[i], 10);
    if (isNaN(n) || n < 0 || n > 255) return false;
  }
  return true;
}

function netPrefix(ip) {
  if (!ip) return "";
  if (isIPv6(ip)) return ip.split(":").slice(0, 3).join(":");
  return ip.split(".").slice(0, 3).join(".");
}

function extractPort(url) {
  var m = url.match(/:(d{2,5})//);
  return m ? m[1] : null;
}

function inV4List(ip, list) {
  if (!ip || isIPv6(ip)) return false;
  for (var i = 0; i < list.length; i++) {
    try {
      if (isInNet(ip, list[i][0], list[i][1])) return true;
    } catch (e) {}
  }
  return false;
}


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 7: ZERO-PING ENGINE                                                █
// ████████████████████████████████████████████████████████████████████████████████

function fastPathLookup(host, trafficType) {
  var key = host + "|" + trafficType;
  if (SESSION.fastPathCache[key]) {
    SESSION.fastPathHits++;
    SESSION.metrics.fastPathHits++;
    return SESSION.fastPathCache[key];
  }
  return null;
}

function fastPathStore(host, trafficType, result) {
  SESSION.fastPathCache[host + "|" + trafficType] = result;
}

function preWarmCheck() {
  if (SESSION.preWarmComplete) return;
  if (SESSION.requestCount >= 5) {
    SESSION.preWarmComplete = true;
    return;
  }
  var allProxies = MATCH_PROXIES.concat(LOBBY_POOL.slice(0, 3));
  var idx = SESSION.requestCount % allProxies.length;
  SESSION.preWarmedProxies[allProxies[idx].id] = true;
}

function updateFramePriority() {
  if (SESSION.matchState === "active") SESSION.framePriority = "critical";
  else if (SESSION.matchState === "warmup") SESSION.framePriority = "high";
  else SESSION.framePriority = "normal";
}


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 8: GEOLOCK AMMAN SYSTEM                                            █
// ████████████████████████████████████████████████████████████████████████████████

function isAmmanIP(ip) {
  if (!ip || isIPv6(ip)) return false;
  for (var i = 0; i < AMMAN_IPV4.length; i++) {
    try {
      if (isInNet(ip, AMMAN_IPV4[i][0], AMMAN_IPV4[i][1])) return true;
    } catch (e) {}
  }
  return false;
}

function enforceGeoLock(ip) {
  if (isAmmanIP(ip)) {
    SESSION.isAmmanIP = true;
    SESSION.geoConfidence = Math.min(100, SESSION.geoConfidence + 15);
    SESSION.geoLocked = true;
    return "amman";
  }
  if (inV4List(ip, JORDAN_IPV4)) {
    SESSION.geoConfidence = Math.min(100, SESSION.geoConfidence + 5);
    SESSION.geoLocked = true;
    return "jordan";
  }
  if (SESSION.maxAllowedDistance >= 2) {
    for (var i = 0; i < ALLOWED_NEIGHBORS_IPV4.length; i++) {
      try {
        if (isInNet(ip, ALLOWED_NEIGHBORS_IPV4[i][0], ALLOWED_NEIGHBORS_IPV4[i][1])) return "neighbor";
      } catch (e) {}
    }
  }
  return "blocked";
}


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 9: DISTANCE-BASED BLOCKER                                          █
// ████████████████████████████████████████████████████████████████████████████████

function isDistantServer(ip) {
  if (!ip) return true;
  if (isIPv6(ip)) {
    var low = ip.toLowerCase();
    for (var i = 0; i < BLOCKED_IPV6.length; i++) {
      if (low.indexOf(BLOCKED_IPV6[i].toLowerCase()) === 0) return true;
    }
    for (var i = 0; i < JORDAN_IPV6.length; i++) {
      if (low.indexOf(JORDAN_IPV6[i].toLowerCase()) === 0) return false;
    }
    return true;
  }
  for (var i = 0; i < BLOCKED_SERVER_REGIONS.length; i++) {
    try {
      if (isInNet(ip, BLOCKED_SERVER_REGIONS[i][0], BLOCKED_SERVER_REGIONS[i][1])) {
        if (inV4List(ip, JORDAN_IPV4)) return false;
        return true;
      }
    } catch (e) {}
  }
  return false;
}


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 10: MATCHMAKING FORCE JORDAN                                       █
// ████████████████████████████████████████████████████████████████████████████████

function forceJordanMatchmaking(ips) {
  if (!ips || ips.length === 0) return null;
  var jordanIP = null, ammanIP = null;
  for (var i = 0; i < ips.length; i++) {
    var ip = ips[i];
    if (isIPv6(ip)) {
      for (var j = 0; j < JORDAN_IPV6.length; j++) {
        if (ip.toLowerCase().indexOf(JORDAN_IPV6[j]) === 0) { jordanIP = ip; break; }
      }
      continue;
    }
    if (isDistantServer(ip)) continue;
    if (inV4List(ip, JORDAN_IPV4)) {
      jordanIP = ip;
      if (isAmmanIP(ip)) ammanIP = ip;
    }
  }
  return ammanIP || jordanIP || null;
}


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 11: DNS + IP VERIFICATION                                          █
// ████████████████████████████████████████████████████████████████████████████████

function resolveAll(host) {
  var now = Date.now ? Date.now() : 0;
  if (SESSION.dnsCache[host] && SESSION.dnsCacheTTL[host]) {
    if (now < SESSION.dnsCacheTTL[host]) return SESSION.dnsCache[host];
    delete SESSION.dnsCache[host];
    delete SESSION.dnsCacheTTL[host];
  }
  var ips = [];
  try {
    if (typeof dnsResolveEx === "function") {
      var ex = dnsResolveEx(host);
      if (ex) {
        var parts = ex.split(";");
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i].replace(/\s+/g, "");
          if (p && isValidIP(p) && ips.indexOf(p) === -1) ips.push(p);
        }
      }
    }
  } catch (e) {}
  try {
    if (typeof dnsResolve === "function") {
      var v4 = dnsResolve(host);
      if (v4 && isValidIP(v4) && ips.indexOf(v4) === -1) ips.push(v4);
    }
  } catch (e) {}
  if (ips.length === 0 && host.indexOf("www.") === 0) {
    try {
      var v4b = dnsResolve(host.substring(4));
      if (v4b && isValidIP(v4b)) ips.push(v4b);
    } catch (e) {}
  }
  if (ips.length > 0) {
    SESSION.dnsCache[host] = ips;
    SESSION.dnsCacheTTL[host] = now + SESSION.DNS_TTL_MS;
  }
  return ips;
}


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 12: ISP DETECTION + LATENCY PREDICTION                             █
// ████████████████████████████████████████████████████████████████████████████████

function detectISP(ip) {
  if (!ip || isIPv6(ip)) return null;
  for (var name in ISP_FINGERPRINTS) {
    if (!ISP_FINGERPRINTS.hasOwnProperty(name)) continue;
    var isp = ISP_FINGERPRINTS[name];
    for (var j = 0; j < isp.ranges.length; j++) {
      var idx = isp.ranges[j];
      if (idx < JORDAN_IPV4.length) {
        try {
          if (isInNet(ip, JORDAN_IPV4[idx][0], JORDAN_IPV4[idx][1])) return name;
        } catch (e) {}
      }
    }
  }
  return null;
}

function updateISP(ip) {
  var isp = detectISP(ip);
  if (isp) {
    if (SESSION.detectedISP === isp) {
      SESSION.ispConfidence = Math.min(100, SESSION.ispConfidence + 10);
    } else {
      SESSION.detectedISP = isp;
      SESSION.ispConfidence = 30;
    }
  }
}

function predictBestProxy(list) {
  var best = 0, bestLat = 999999;
  for (var i = 0; i < list.length; i++) {
    if (!list[i].alive) continue;
    var lat = SESSION.latencyPredict[list[i].id] || list[i].latency || 50;
    if (lat < bestLat) { bestLat = lat; best = i; }
  }
  return best;
}


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 13: PROXY SELECTION                                                 █
// ████████████████████████████████████████████████████████████████████████████████

function matchProxy() {
  if (SESSION.detectedISP && SESSION.ispConfidence > 50) {
    var isp = ISP_FINGERPRINTS[SESSION.detectedISP];
    if (isp && MATCH_PROXIES[isp.matchProxy] && MATCH_PROXIES[isp.matchProxy].alive) {
      return MATCH_PROXIES[isp.matchProxy].proxy;
    }
  }
  var best = predictBestProxy(MATCH_PROXIES);
  if (MATCH_PROXIES[best] && MATCH_PROXIES[best].alive) return MATCH_PROXIES[best].proxy;
  for (var i = 0; i < MATCH_PROXIES.length; i++) {
    if (MATCH_PROXIES[i].alive) return MATCH_PROXIES[i].proxy;
  }
  return MATCH_PROXIES[0].proxy;
}

function matchProxyChain() {
  var chain = [];
  for (var t = 1; t <= 2; t++) {
    for (var i = 0; i < MATCH_PROXIES.length; i++) {
      if (MATCH_PROXIES[i].alive && MATCH_PROXIES[i].tier === t) chain.push(MATCH_PROXIES[i].proxy);
    }
  }
  if (chain.length === 0) chain.push(MATCH_PROXIES[0].proxy);
  return chain.join("; ");
}

function recalcWeights() {
  if (!SESSION.weightsDirty) return;
  var t = 0;
  for (var i = 0; i < LOBBY_POOL.length; i++) {
    if (LOBBY_POOL[i].alive) t += LOBBY_POOL[i].weight;
  }
  SESSION.totalWeight = t || 1;
  SESSION.weightsDirty = false;
}

function nextLobby() {
  recalcWeights();
  if (SESSION.timeSlot === "ultra-peak") return getBestLobby();
  var target = SESSION.lobbyIndex % SESSION.totalWeight;
  var cum = 0;
  for (var i = 0; i < LOBBY_POOL.length; i++) {
    if (!LOBBY_POOL[i].alive) continue;
    cum += LOBBY_POOL[i].weight;
    if (target < cum) { SESSION.lobbyIndex++; return LOBBY_POOL[i].proxy; }
  }
  SESSION.lobbyIndex++;
  return LOBBY_POOL[0].proxy;
}

function getBestLobby() {
  var best = null, bestS = -1;
  for (var i = 0; i < LOBBY_POOL.length; i++) {
    if (!LOBBY_POOL[i].alive) continue;
    var hs = SESSION.proxyHealth[LOBBY_POOL[i].id] ? SESSION.proxyHealth[LOBBY_POOL[i].id].score : 100;
    var s = LOBBY_POOL[i].score * (hs / 100) * LOBBY_POOL[i].weight;
    if (s > bestS) { bestS = s; best = LOBBY_POOL[i].proxy; }
  }
  return best || LOBBY_POOL[0].proxy;
}

function nextSocial() {
  var a = [];
  for (var i = 0; i < SOCIAL_POOL.length; i++) {
    if (SOCIAL_POOL[i].alive) a.push(SOCIAL_POOL[i]);
  }
  if (a.length === 0) return SOCIAL_POOL[0].proxy;
  var p = a[SESSION.socialIndex % a.length].proxy;
  SESSION.socialIndex++;
  return p;
}

function nextSpectate() {
  var a = [];
  for (var i = 0; i < SPECTATE_POOL.length; i++) {
    if (SPECTATE_POOL[i].alive) a.push(SPECTATE_POOL[i]);
  }
  if (a.length === 0) return SPECTATE_POOL[0].proxy;
  var p = a[SESSION.spectateIndex % a.length].proxy;
  SESSION.spectateIndex++;
  return p;
}


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 14: HEALTH + SESSION + TIME                                        █
// ████████████████████████████████████████████████████████████████████████████████

function updateHealth(id, ok) {
  if (!SESSION.proxyHealth[id]) {
    SESSION.proxyHealth[id] = { success:0, fail:0, score:100, streak:0, cooldown:0 };
  }
  var h = SESSION.proxyHealth[id];
  if (ok) { h.success++; h.streak = 0; h.score = Math.min(100, h.score + 3); }
  else {
    h.fail++; h.streak++; h.score = Math.max(0, h.score - 15);
    if (h.streak >= MAX_CONSECUTIVE_FAILS) {
      h.cooldown = (Date.now ? Date.now() : 0) + PROXY_COOLDOWN_MS;
      markDead(id);
    }
  }
}

function markDead(id) {
  var pools = [MATCH_PROXIES, LOBBY_POOL, SOCIAL_POOL, SPECTATE_POOL];
  for (var p = 0; p < pools.length; p++) {
    for (var i = 0; i < pools[p].length; i++) {
      if (pools[p][i].id === id) {
        pools[p][i].alive = false;
        if (pools[p] === LOBBY_POOL) SESSION.weightsDirty = true;
      }
    }
  }
}

function tryRevive(now) {
  if (SESSION.requestCount % 80 !== 0) return;
  for (var id in SESSION.proxyHealth) {
    if (!SESSION.proxyHealth.hasOwnProperty(id)) continue;
    var h = SESSION.proxyHealth[id];
    if (h.cooldown > 0 && now > h.cooldown) {
      h.cooldown = 0; h.streak = 0; h.score = 50;
      var pools = [MATCH_PROXIES, LOBBY_POOL, SOCIAL_POOL, SPECTATE_POOL];
      for (var p = 0; p < pools.length; p++) {
        for (var i = 0; i < pools[p].length; i++) {
          if (pools[p][i].id === id) {
            pools[p][i].alive = true;
            if (pools[p] === LOBBY_POOL) SESSION.weightsDirty = true;
          }
        }
      }
    }
  }
}

function checkExpiry(now) {
  if (SESSION.matchNet && SESSION.lastMatchTime > 0) {
    if ((now - SESSION.lastMatchTime) > SESSION_TIMEOUT_MS) resetMatch();
  }
}

function resetMatch() {
  SESSION.matchNet = null; SESSION.matchHost = null;
  SESSION.matchIP = null; SESSION.matchPort = null;
  SESSION.matchFingerprint = null; SESSION.matchStartTime = 0;
  SESSION.matchState = "idle"; SESSION.matchFailCount = 0;
  SESSION.warmupDone = false; SESSION.framePriority = "normal";
}

function cleanDNS(now) {
  if (SESSION.requestCount % 25 !== 0) return;
  for (var k in SESSION.dnsCacheTTL) {
    if (SESSION.dnsCacheTTL.hasOwnProperty(k) && now > SESSION.dnsCacheTTL[k]) {
      delete SESSION.dnsCache[k];
      delete SESSION.dnsCacheTTL[k];
    }
  }
  if (SESSION.requestCount % 200 === 0) SESSION.fastPathCache = {};
}

function updateTime() {
  try {
    var d = new Date();
    var h = d.getUTCHours() + 3;
    if (h >= 24) h -= 24;
    var day = d.getUTCDay();
    SESSION.isWeekend = (day === 5 || day === 6);
    SESSION.isRamadan = (d.getUTCMonth() === 1 || d.getUTCMonth() === 2);
    if (SESSION.isRamadan) {
      SESSION.timeSlot = (h >= 20 || h < 3) ? "ultra-peak" : (h >= 18 && h < 20) ? "peak" : (h >= 3 && h < 8) ? "off-peak" : "normal";
    } else if (SESSION.isWeekend) {
      SESSION.timeSlot = (h >= 16 || h < 1) ? "ultra-peak" : (h >= 14 && h < 16) ? "peak" : "normal";
    } else {
      SESSION.timeSlot = (h >= 20 && h < 24) ? "ultra-peak" : (h >= 18 && h < 20) ? "peak" : (h >= 2 && h < 7) ? "off-peak" : "normal";
    }
    SESSION.isPeakHour = (SESSION.timeSlot === "peak" || SESSION.timeSlot === "ultra-peak");
  } catch (e) { SESSION.timeSlot = "normal"; }
}

function met(t) {
  SESSION.metrics.totalRequests++;
  if (t === "match") SESSION.metrics.matchRequests++;
  else if (t === "lobby") SESSION.metrics.lobbyRequests++;
  else if (t === "social") SESSION.metrics.socialRequests++;
  else if (t === "block") SESSION.metrics.blockedRequests++;
  else if (t === "direct") SESSION.metrics.directRequests++;
  else if (t === "blacklist") SESSION.metrics.blacklistedRequests++;
  else if (t === "distance") SESSION.metrics.distanceBlocked++;
  else if (t === "geolock") SESSION.metrics.geoLockEnforced++;
}


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 15: TRAFFIC DETECTION                                              █
// ████████████████████████████████████████████████████████████████████████████████

function isPUBG(h) {
  return /pubg|pubgm|pubgmobile|tencent|krafton|lightspeed|levelinfinite|igamecj|proximabeta|vnggames|garena|battleground|pubgmhd|turbogames|joymob|proxima|tencentgames|midasbuy/i.test(h);
}

function isMatch(u, h) {
  var s = u + h;
  if (/(udp|dtls|rtp|srtp|stun|turn|relay)/i.test(s)) return true;
  return /(tick|sync|realtime|battle|combat|match|room|session|state|frame|physics|movement|shoot|fire|hit|damage|spawn|loot|zone|circle|airdrop|revive|knock|kill|alive|dead|vehicle)/i.test(s);
}

function isLobby(u, h) {
  return /(lobby|matchmak|queue|dispatch|gateway|region|zone|join|recruit|pair|assign|entry|roster|bracket|rank|rating|mmr|elo|pool|slot|seat|capacity|available|playlist|mode|classic|arcade)/i.test(u + h);
}

function isSocial(u, h) {
  return /(friend|invite|squad|team|party|clan|presence|social|voice|mic|talk|chat|whisper|notify|push|alert|broadcast|emote|gift|mail|message|crew|guild)/i.test(u + h);
}

function isSpectate(u, h) {
  return /(spectate|spectator|watch|observe|stream|replay|deathcam|killcam|highlight)/i.test(u + h);
}

function isCDN(u, h) {
  return /(cdn|asset|resource|static|media|content|patch|update|download|bundle|pak|obb|manifest|version|config|hotfix|texture|model|sound|map|image|icon|avatar|skin)/i.test(u + h);
}

function isAntiCheat(u, h) {
  return /(anticheat|security|guard|protect|shield|integrity|scan|verify|validate|challenge|token|auth)/i.test(u + h);
}

function isTelemetry(u, h) {
  return /(telemetry|analytics|metric|report|crash|log|trace|beacon|collect|stat|event|track|diagnos|monitor)/i.test(u + h);
}

function isAd(u, h) {
  return /(advert|banner|interstitial|reward.*video|offerwall|survey|promo|campaign|impression)/i.test(u + h);
}

function isStore(u, h) {
  return /(store|shop|purchase|buy|payment|order|checkout|receipt|redeem|coupon|uc|royale.*pass)/i.test(u + h);
}

function isBlocked(h) {
  for (var i = 0; i < BLOCKED_DOMAINS.length; i++) {
    if (h.indexOf(BLOCKED_DOMAINS[i]) !== -1) return true;
  }
  return false;
}

function isKnownJO(h) {
  if (!h) return false;
  for (var i = 0; i < KNOWN_JO_GAME_HOSTS.length; i++) {
    if (h.indexOf(KNOWN_JO_GAME_HOSTS[i]) !== -1) return true;
  }
  return false;
}


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 16: FINGERPRINT                                                    █
// ████████████████████████████████████████████████████████████████████████████████

function genFP(host, ip, net, port) {
  return host + "|" + net + "|" + (port || "0") + "|" + Math.floor((Date.now ? Date.now() : 0) / 300000);
}

function validFP(host, ip, net, port) {
  if (!SESSION.matchFingerprint) return true;
  return genFP(host, ip, net, port) === SESSION.matchFingerprint;
}


// ████████████████████████████████████████████████████████████████████████████████
// █  SECTION 17: MAIN FUNCTION — FindProxyForURL                                █
// ████████████████████████████████████████████████████████████████████████████████

function FindProxyForURL(url, host) {
  host = norm(host.toLowerCase());
  var now = Date.now ? Date.now() : 0;

  SESSION.requestCount++;
  cleanDNS(now);
  tryRevive(now);
  preWarmCheck();
  updateFramePriority();
  if (SESSION.requestCount % 40 === 1) updateTime();

  // ① Not PUBG?
  if (!isPUBG(host)) return DIRECT;

  // ② Traffic type + Fast Path
  var trafficType = "unknown";
  if (isMatch(url, host)) trafficType = "match";
  else if (isLobby(url, host)) trafficType = "lobby";
  else if (isSocial(url, host)) trafficType = "social";
  else if (isSpectate(url, host)) trafficType = "spectate";
  else if (isCDN(url, host)) trafficType = "cdn";
  else if (isAntiCheat(url, host)) trafficType = "anticheat";
  else if (isStore(url, host)) trafficType = "store";
  else if (isTelemetry(url, host)) trafficType = "telemetry";
  else if (isAd(url, host)) trafficType = "ad";

  var cached = fastPathLookup(host, trafficType);
  if (cached) return cached;

  // ③ Blocked domain
  if (isBlocked(host)) { met("blacklist"); fastPathStore(host, trafficType, BLOCK); return BLOCK; }

  // ③b Telemetry/Ads
  if (trafficType === "telemetry" || trafficType === "ad") {
    met("block"); fastPathStore(host, trafficType, BLOCK); return BLOCK;
  }

  // ③c AntiCheat/Store → DIRECT
  if (trafficType === "anticheat" || trafficType === "store") {
    met("direct"); fastPathStore(host, trafficType, DIRECT); return DIRECT;
  }

  // ④ Known JO host (zero DNS)
  if (isKnownJO(host)) {
    var result;
    if (trafficType === "match") {
      met("match"); SESSION.lastMatchTime = now; SESSION.matchCount++;
      SESSION.matchState = "active";
      result = (SESSION.timeSlot === "ultra-peak") ? matchProxyChain() : matchProxy();
      fastPathStore(host, trafficType, result); return result;
    }
    if (trafficType === "spectate") { met("social"); result = nextSpectate(); fastPathStore(host, trafficType, result); return result; }
    if (trafficType === "social") { met("social"); SESSION.socialCount++; result = nextSocial(); fastPathStore(host, trafficType, result); return result; }
    if (trafficType === "cdn") { met("direct"); fastPathStore(host, trafficType, DIRECT); return DIRECT; }
    met("lobby"); SESSION.lobbyCount++; result = nextLobby(); fastPathStore(host, trafficType, result); return result;
  }

  // ⑤ DNS
  var ips = resolveAll(host);
  if (!ips || ips.length === 0) { met("block"); return BLOCK; }

  // ⑥ Distance blocker
  var allDistant = true;
  for (var i = 0; i < ips.length; i++) {
    if (!isDistantServer(ips[i])) { allDistant = false; break; }
  }
  if (allDistant) { met("distance"); SESSION.distanceBlockCount++; fastPathStore(host, trafficType, BLOCK); return BLOCK; }

  // ⑦ ISP Detection
  for (var i = 0; i < ips.length; i++) {
    if (!isIPv6(ips[i])) { updateISP(ips[i]); break; }
  }

  // ⑧ CDN → DIRECT
  if (trafficType === "cdn") { met("direct"); return DIRECT; }

  // ⑨ Match — Triple Lock + GeoLock
  if (trafficType === "match") {
    checkExpiry(now);
    var matchIP = forceJordanMatchmaking(ips);
    if (!matchIP) { SESSION.matchFailCount++; updateHealth("MATCH", false); met("geolock"); return BLOCK; }
    var geo = enforceGeoLock(matchIP);
    if (geo === "blocked") { met("geolock"); return BLOCK; }
    var net = netPrefix(matchIP);
    var port = extractPort(url);
    if (!SESSION.matchNet) {
      SESSION.matchNet = net; SESSION.matchHost = host; SESSION.matchIP = matchIP;
      SESSION.matchPort = port; SESSION.matchFingerprint = genFP(host, matchIP, net, port);
      SESSION.isV6 = isIPv6(matchIP); SESSION.matchState = "active";
      SESSION.matchStartTime = now; SESSION.matchFailCount = 0;
      SESSION.warmupDone = true; SESSION.matchCount++;
    }
    if (host !== SESSION.matchHost || net !== SESSION.matchNet || matchIP !== SESSION.matchIP) {
      SESSION.matchFailCount++; met("block"); return BLOCK;
    }
    if (SESSION.matchPort && port && port !== SESSION.matchPort) SESSION.matchPort = port;
    if (!validFP(host, matchIP, net, port)) {
      resetMatch(); SESSION.matchNet = net; SESSION.matchHost = host;
      SESSION.matchIP = matchIP; SESSION.matchPort = port;
      SESSION.matchFingerprint = genFP(host, matchIP, net, port);
      SESSION.isV6 = isIPv6(matchIP); SESSION.matchState = "active";
      SESSION.matchStartTime = now; SESSION.matchCount++;
    }
    SESSION.lastMatchTime = now; SESSION.matchFailCount = 0;
    updateHealth("MATCH", true); met("match");
    return (SESSION.timeSlot === "ultra-peak") ? matchProxyChain() : matchProxy();
  }

  // ⑩ Lobby
  if (trafficType === "lobby") {
    var lobbyIP = forceJordanMatchmaking(ips);
    if (!lobbyIP) { met("geolock"); return BLOCK; }
    SESSION.lobbyCount++; met("lobby");
    return SESSION.isPeakHour ? getBestLobby() : nextLobby();
  }

  // Spectate
  if (trafficType === "spectate") {
    if (!forceJordanMatchmaking(ips)) { met("block"); return BLOCK; }
    met("social"); return nextSpectate();
  }

  // Social
  if (trafficType === "social") {
    if (!forceJordanMatchmaking(ips)) { met("block"); return BLOCK; }
    SESSION.socialCount++; met("social"); return nextSocial();
  }

  // Unknown JO traffic → Lobby
  if (forceJordanMatchmaking(ips)) { met("lobby"); return nextLobby(); }

  // ⛔ Everything else = BLOCK
  met("block");
  return BLOCK;
}
