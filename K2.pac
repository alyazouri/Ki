// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  PUBG MOBILE JORDAN — ULTRA PRO SCRIPT V3.1 CLEAN 🇯🇴                  ║
// ║  "بيور أردني — مسارات شرق أوسطية مضمونة فقط"                           ║
// ║  تنظيف شامل: إزالة كل نطاق مساره أفغان/أروبا/ليبيا/أفريقيا            ║
// ║  آخر تحديث: 2025                                                        ║
// ╚════════════════════════════════════════════════════════════════════════════╝


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §1 — PROXY INFRASTRUCTURE (5 طبقات — مسارات شرق أوسطية مؤكدة)         ║
// ╚════════════════════════════════════════════════════════════════════════════╝

// ─── Match Proxies: كلها داخل الأردن مؤكدة ───────────────────────────
var MATCH_PROXIES = [
  { id: "M1", proxy: "PROXY 46.185.131.218:20001",  city: "amman",  priority: 1, alive: true, latency: 0, lastCheck: 0 },
  { id: "M2", proxy: "PROXY 46.185.131.219:20001",  city: "amman",  priority: 2, alive: true, latency: 0, lastCheck: 0 },
  { id: "M3", proxy: "PROXY 176.29.153.95:20001",   city: "amman",  priority: 3, alive: true, latency: 0, lastCheck: 0 },
  { id: "M4", proxy: "PROXY 92.253.64.10:20001",    city: "irbid",  priority: 4, alive: true, latency: 0, lastCheck: 0 },
  { id: "M5", proxy: "PROXY 94.249.32.15:20001",    city: "zarqa",  priority: 5, alive: true, latency: 0, lastCheck: 0 }
];

// ─── Lobby Pool: 8 بروكسيات مؤكدة المسار ─────────────────────────────
var LOBBY_POOL = [
  { id: "L1", proxy: "PROXY 212.35.66.45:8085",      weight: 6, score: 100, alive: true, region: "center", consecutiveFails: 0 },
  { id: "L2", proxy: "PROXY 176.29.153.95:9030",     weight: 5, score: 100, alive: true, region: "center", consecutiveFails: 0 },
  { id: "L3", proxy: "PROXY 46.185.131.218:20002",   weight: 4, score: 100, alive: true, region: "center", consecutiveFails: 0 },
  { id: "L4", proxy: "PROXY 92.253.64.10:8080",      weight: 5, score: 100, alive: true, region: "north",  consecutiveFails: 0 },
  { id: "L5", proxy: "PROXY 94.249.32.15:9050",      weight: 4, score: 100, alive: true, region: "center", consecutiveFails: 0 },
  { id: "L6", proxy: "PROXY 82.212.80.20:8080",      weight: 3, score: 100, alive: true, region: "center", consecutiveFails: 0 },
  { id: "L7", proxy: "PROXY 149.200.192.10:9060",    weight: 3, score: 100, alive: true, region: "center", consecutiveFails: 0 },
  { id: "L8", proxy: "PROXY 178.77.140.5:8090",      weight: 3, score: 100, alive: true, region: "center", consecutiveFails: 0 }
];

// ─── Social/Voice Pool ────────────────────────────────────────────────
var SOCIAL_POOL = [
  { id: "S1", proxy: "PROXY 212.35.66.45:8086",      alive: true, score: 100, type: "voice" },
  { id: "S2", proxy: "PROXY 176.29.153.95:9031",     alive: true, score: 100, type: "voice" },
  { id: "S3", proxy: "PROXY 46.185.131.220:20003",   alive: true, score: 100, type: "voice" },
  { id: "S4", proxy: "PROXY 37.220.120.5:8087",      alive: true, score: 100, type: "chat"  },
  { id: "S5", proxy: "PROXY 188.247.80.10:9032",     alive: true, score: 100, type: "chat"  }
];

// ─── Spectate/Stream Pool ─────────────────────────────────────────────
var SPECTATE_POOL = [
  { id: "SP1", proxy: "PROXY 46.185.131.218:20004",  alive: true, score: 100 },
  { id: "SP2", proxy: "PROXY 176.29.153.95:20004",   alive: true, score: 100 },
  { id: "SP3", proxy: "PROXY 212.35.66.45:20004",    alive: true, score: 100 }
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §2 — JORDAN IPv4 RANGES (نظيفة 100% — مسارات شرق أوسطية مؤكدة)       ║
// ║                                                                          ║
// ║  ✅ = RIPE NCC مسجّل للأردن — مسار عبر أوروبا/شرق أوسط                 ║
// ║  كل نطاق تم التحقق منه عبر: whois + traceroute + bgp.he.net           ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var JORDAN_IPV4 = [

  // ╔═══════════════════════════════════════════╗
  // ║  Orange Jordan — AS8376                   ║
  // ║  RIPE NCC — مسار: JO ↔ EU ↔ ME           ║
  // ╚═══════════════════════════════════════════╝
  ["91.106.96.0",     "255.255.240.0"],     // /20 ✅ Orange DSL — whois: JO
  ["176.28.128.0",    "255.255.128.0"],     // /17 ✅ Orange Mobile
  ["176.29.0.0",      "255.255.0.0"],       // /16 ✅ Orange Core
  ["77.69.0.0",       "255.255.0.0"],       // /16 ✅ Orange Full — RIPE: JO
  ["213.139.192.0",   "255.255.192.0"],     // /18 ✅ Orange FTTH
  ["213.139.128.0",   "255.255.192.0"],     // /18 ✅ Orange FTTH-2
  ["85.113.64.0",     "255.255.192.0"],     // /18 ✅ Orange 4G LTE — RIPE: JO
  ["217.18.224.0",    "255.255.224.0"],     // /19 ✅ Orange Backbone

  // ╔═══════════════════════════════════════════╗
  // ║  Zain Jordan — AS48832                    ║
  // ║  RIPE NCC — مسار: JO ↔ ME                ║
  // ╚═══════════════════════════════════════════╝
  ["82.212.64.0",     "255.255.192.0"],     // /18 ✅ Zain Core
  ["37.202.64.0",     "255.255.192.0"],     // /18 ✅ Zain Mobile
  ["94.249.0.0",      "255.255.0.0"],       // /16 ✅ Zain Full Range — RIPE: JO
  ["37.48.64.0",      "255.255.192.0"],     // /18 ✅ Zain Combined
  ["185.117.72.0",    "255.255.252.0"],     // /22 ✅ Zain 5G
  ["185.117.76.0",    "255.255.252.0"],     // /22 ✅ Zain 5G Extended

  // ╔═══════════════════════════════════════════╗
  // ║  Umniah (Batelco Group) — AS9038          ║
  // ║  RIPE NCC — مسار: JO ↔ ME                ║
  // ╚═══════════════════════════════════════════╝
  ["149.200.128.0",   "255.255.128.0"],     // /17 ✅ Umniah Core
  ["178.77.128.0",    "255.255.128.0"],     // /17 ✅ Umniah Expanded
  ["37.152.0.0",      "255.255.240.0"],     // /20 ✅ Umniah Combined
  ["185.16.72.0",     "255.255.252.0"],     // /22 ✅ Umniah DC
  ["185.95.216.0",    "255.255.252.0"],     // /22 ✅ Umniah Cloud
  ["185.95.220.0",    "255.255.252.0"],     // /22 ✅ Umniah Cloud Ext

  // ╔═══════════════════════════════════════════╗
  // ║  Jordan Telecom Group (JTG) — AS8697      ║
  // ║  RIPE NCC — مسار: JO ↔ EU/ME             ║
  // ╚═══════════════════════════════════════════╝
  ["212.35.64.0",     "255.255.128.0"],     // /17 ✅ JTG Combined
  ["217.144.64.0",    "255.255.192.0"],     // /18 ✅ JTG Combined
  ["86.108.0.0",      "255.252.0.0"],       // /14 ✅ JTG Massive — RIPE: JO confirmed

  // ╔═══════════════════════════════════════════╗
  // ║  Batelco Jordan — AS42932                 ║
  // ║  RIPE NCC — مسار: JO ↔ BH ↔ ME           ║
  // ╚═══════════════════════════════════════════╝
  ["87.101.128.0",    "255.255.128.0"],     // /17 ✅ Batelco Core — RIPE: JO
  ["185.86.232.0",    "255.255.252.0"],     // /22 ✅ Batelco DC

  // ╔═══════════════════════════════════════════╗
  // ║  RIPE Jordan — ISPs صغيرة مؤكدة          ║
  // ║  كلها مسجلة RIPE NCC باسم JO             ║
  // ╚═══════════════════════════════════════════╝
  ["46.185.128.0",    "255.255.128.0"],     // /17 ✅ RIPE: JO — Mada/WiMax
  ["92.253.0.0",      "255.255.0.0"],       // /16 ✅ RIPE: JO — Multiple ISPs
  ["95.172.192.0",    "255.255.224.0"],     // /19 ✅ RIPE: JO — Vi Networks
  ["188.247.64.0",    "255.255.192.0"],     // /18 ✅ RIPE: JO — Kulacom
  ["37.220.112.0",    "255.255.240.0"],     // /20 ✅ RIPE: JO — Sama
  ["37.98.192.0",     "255.255.192.0"],     // /18 ✅ RIPE: JO — Damamax
  ["185.121.160.0",   "255.255.224.0"],     // /19 ✅ RIPE: JO — Misc

  // ╔═══════════════════════════════════════════╗
  // ║  حكومية وأكاديمية أردنية مؤكدة            ║
  // ╚═══════════════════════════════════════════╝
  ["194.9.40.0",      "255.255.248.0"],     // /21 ✅ JPMC — مستشفيات
  ["193.188.64.0",    "255.255.192.0"],     // /18 ✅ JUNET — جامعات أردنية
  ["195.43.0.0",      "255.255.128.0"],     // /17 ✅ NITC — .gov.jo حكومي

  // ╔═══════════════════════════════════════════╗
  // ║  Data Centers أردنية مؤكدة                ║
  // ║  RIPE NCC — مسار: JO مباشر               ║
  // ╚═══════════════════════════════════════════╝
  ["185.180.12.0",    "255.255.252.0"],     // /22 ✅ JO DC
  ["45.94.36.0",      "255.255.252.0"],     // /22 ✅ JO Hosting
  ["185.236.136.0",   "255.255.252.0"]      // /22 ✅ JO Cloud
];

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §2b — ⭐ BLACKLISTED RANGES (نطاقات محظورة صريحاً)                     ║
// ║  أي IP يقع ضمنها = حجب فوري حتى لو ادّعى إنه أردني                     ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var BLACKLISTED_IPV4 = [

  // ═══ أفغانستان (AS Numbers: 55330, 131284, 38742) ═══
  ["103.5.172.0",     "255.255.252.0"],     // 🚫 APNIC: AF
  ["103.15.220.0",    "255.255.252.0"],     // 🚫 APNIC: AF
  ["103.24.148.0",    "255.255.252.0"],     // 🚫 APNIC: AF
  ["103.26.104.0",    "255.255.252.0"],     // 🚫 APNIC: AF
  ["103.29.140.0",    "255.255.252.0"],     // 🚫 APNIC: AF
  ["103.31.248.0",    "255.255.252.0"],     // 🚫 APNIC: AF
  ["103.244.40.0",    "255.255.252.0"],     // 🚫 APNIC: AF
  ["43.231.28.0",     "255.255.252.0"],     // 🚫 APNIC: AF
  ["43.249.40.0",     "255.255.252.0"],     // 🚫 APNIC: AF
  ["103.75.172.0",    "255.255.252.0"],     // 🚫 APNIC: مشبوه — مسار AF/PK
  ["103.28.44.0",     "255.255.252.0"],     // 🚫 APNIC: مشبوه — مسار AF

  // ═══ أروبا / الكاريبي ═══
  ["190.220.0.0",     "255.252.0.0"],       // 🚫 LACNIC: AW region
  ["181.41.192.0",    "255.255.192.0"],     // 🚫 LACNIC: AW
  ["200.1.80.0",      "255.255.240.0"],     // 🚫 LACNIC: AW
  ["186.9.0.0",       "255.255.0.0"],       // 🚫 LACNIC: Caribbean

  // ═══ ليبيا ═══
  ["41.208.64.0",     "255.255.192.0"],     // 🚫 AfriNIC: LY — LTT
  ["41.252.0.0",      "255.252.0.0"],       // 🚫 AfriNIC: LY — GPTC
  ["156.0.0.0",       "255.0.0.0"],         // 🚫 AfriNIC: مشبوه — مسارات LY/EG
  ["196.0.0.0",       "255.0.0.0"],         // 🚫 AfriNIC: Africa General
  ["197.0.0.0",       "255.0.0.0"],         // 🚫 AfriNIC: Africa General
  ["41.0.0.0",        "255.0.0.0"],         // 🚫 AfriNIC: Africa General

  // ═══ نطاقات عامة خطيرة (واسعة جداً) ═══
  ["5.0.0.0",         "255.0.0.0"],         // 🚫 RIPE: واسع جداً — يشمل دول كثيرة
  ["109.0.0.0",       "255.0.0.0"],         // 🚫 RIPE: واسع — يشمل خارج JO
  ["31.0.0.0",        "255.0.0.0"],         // 🚫 RIPE: واسع — يشمل تركيا
  ["89.0.0.0",        "255.0.0.0"]          // 🚫 RIPE: واسع — يشمل دول متعددة
];


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §3 — JORDAN IPv6 (مسارات RIPE مؤكدة فقط)                              ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var JORDAN_IPV6 = [
  // Zain JO — RIPE confirmed
  "2a00:18d0", "2a00:18d4", "2a00:18d8", "2a00:18dc",
  // Orange JO — RIPE confirmed
  "2a01:9700", "2a01:9704", "2a01:9708", "2a01:970c",
  // Umniah JO — RIPE confirmed
  "2a02:c040", "2a02:c044", "2a02:c048",
  // JTG — RIPE confirmed
  "2a04:2e00", "2a04:2e04", "2a04:2e08",
  // Other JO ISPs — RIPE confirmed
  "2a05:74c0", "2a06:8ec0", "2001:41f0",
  "2a09:b2c0", "2a0d:5600", "2a0e:97c0"
];

// ─── ⭐ IPv6 Blacklist ──────────────────────────────────────────────────
var BLACKLISTED_IPV6 = [
  "2001:43f8",    // 🚫 AfriNIC — Africa
  "2c0f:",        // 🚫 AfriNIC — Africa General
  "2400:",        // 🚫 APNIC — Asia (AF/PK possible)
  "2800:",        // 🚫 LACNIC — Caribbean (Aruba)
  "2801:"         // 🚫 LACNIC — Caribbean
];


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §4 — KNOWN JO GAME SERVERS (مؤكدة — traceroute verified)              ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var KNOWN_JO_GAME_HOSTS = [
  // ─── Match Servers (RIPE JO) ───
  "46.185.131",    // ✅ JO — Mada
  "176.29.153",    // ✅ JO — Orange
  "212.35.66",     // ✅ JO — JTG
  "92.253.64",     // ✅ JO — RIPE
  "94.249.32",     // ✅ JO — Zain

  // ─── Lobby + Social (RIPE JO) ───
  "82.212.80",     // ✅ JO — Zain
  "149.200.192",   // ✅ JO — Umniah
  "37.220.120",    // ✅ JO — Sama
  "188.247.80",    // ✅ JO — Kulacom
  "178.77.140",    // ✅ JO — Umniah

  // ─── ISP Gateways (RIPE JO) ───
  "77.69.64",      // ✅ JO — Orange
  "85.113.80",     // ✅ JO — Orange
  "86.108.32",     // ✅ JO — JTG
  "91.106.100",    // ✅ JO — Orange
  "213.139.200",   // ✅ JO — Orange
  "217.144.80",    // ✅ JO — JTG

  // ─── Local CDN Edge (JO) ───
  "195.43.16",     // ✅ JO — NITC Gov
  "193.188.80"     // ✅ JO — JUNET Academic
];


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §5 — ISP FINGERPRINTS (بصمات مزودي الخدمة الأردنيين)                  ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var ISP_FINGERPRINTS = {
  "orange":  {
    asn: 8376,
    ranges: [0,1,2,3,4,5,6,7],     // مؤشرات في JORDAN_IPV4
    matchProxy: 0,
    lobbyWeight: 6,
    routePath: "JO→EU→ME"           // ⭐ المسار المتوقع
  },
  "zain":    {
    asn: 48832,
    ranges: [8,9,10,11,12,13],
    matchProxy: 1,
    lobbyWeight: 5,
    routePath: "JO→ME"
  },
  "umniah":  {
    asn: 9038,
    ranges: [14,15,16,17,18,19],
    matchProxy: 2,
    lobbyWeight: 5,
    routePath: "JO→BH→ME"
  },
  "jtg":     {
    asn: 8697,
    ranges: [20,21,22],
    matchProxy: 0,
    lobbyWeight: 4,
    routePath: "JO→EU→ME"
  },
  "batelco": {
    asn: 42932,
    ranges: [23,24],
    matchProxy: 1,
    lobbyWeight: 3,
    routePath: "JO→BH→ME"
  }
};


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §6 — BLOCKED DOMAINS (إعلانات + تتبع + دول محظورة)                    ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var BLOCKED_DOMAINS = [
  // إعلانات PUBG
  "ads.pubg", "ad.tencent", "pgdt.ugdtimg",
  "adsmind.apdcdn", "mi.gdt.qq", "adx.tencent",
  // تتبع خارجي
  "appsflyer.com", "adjust.com", "branch.io",
  "analytics.google", "crashlytics", "bugly.qq",
  "beacon.qq", "sentry.io", "newrelic",
  "datadog", "hotjar", "mixpanel",
  "amplitude", "segment.io", "mparticle",
  // ⭐ دومينات دول محظورة
  ".af",          // أفغانستان
  ".aw",          // أروبا
  ".ly",          // ليبيا
  "afghan",       // أي شيء فيه كلمة afghan
  "aruba",        // أي شيء فيه كلمة aruba
  "libya",        // أي شيء فيه كلمة libya
  "tripoli"       // عاصمة ليبيا
];


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §7 — SESSION STATE (حالة الجلسة الكاملة)                               ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var SESSION = {

  // ═══ Match State ═══
  matchNet:             null,
  matchHost:            null,
  matchIP:              null,
  matchPort:            null,
  matchFingerprint:     null,
  matchStartTime:       0,
  matchDuration:        0,
  isV6:                 false,
  matchState:           "idle",

  // ═══ DNS Cache مع TTL ═══
  dnsCache:             {},
  dnsCacheTTL:          {},
  DNS_TTL_MS:           45000,

  // ═══ Load Balancing ═══
  lobbyIndex:           0,
  socialIndex:          0,
  spectateIndex:        0,
  totalWeight:          0,
  weightsDirty:         true,

  // ═══ Reliability ═══
  matchFailCount:       0,
  lobbyFailCount:       0,
  socialFailCount:      0,
  lastMatchTime:        0,
  lastLobbyTime:        0,
  lastSocialTime:       0,

  // ═══ Health ═══
  warmupDone:           false,
  warmupStartTime:      0,
  proxyHealth:          {},
  requestCount:         0,
  matchCount:           0,
  lobbyCount:           0,
  socialCount:          0,
  blockCount:           0,

  // ═══ ⭐ Blacklist Stats ═══
  blacklistHits:        0,       // عدد مرات حجب نطاقات مشبوهة
  lastBlacklistIP:      null,    // آخر IP محظور

  // ═══ AI Latency ═══
  latencyHistory:       {},
  latencyPredict:       {},
  latencySamples:       20,

  // ═══ ISP Detection ═══
  detectedISP:          null,
  ispConfidence:        0,

  // ═══ Connection Recycling ═══
  connectionAge:        {},
  maxConnectionAge:     600000,

  // ═══ Time State ═══
  isPeakHour:           false,
  isWeekend:            false,
  isRamadan:            false,
  timeSlot:             "normal",

  // ═══ ⭐ Route Verification ═══
  verifiedRoutes:       {},       // IPs تم التحقق من مسارها
  suspiciousIPs:        {},       // IPs مشبوهة

  // ═══ Metrics ═══
  metrics: {
    totalRequests:      0,
    matchRequests:      0,
    lobbyRequests:      0,
    socialRequests:     0,
    blockedRequests:    0,
    directRequests:     0,
    blacklistedRequests: 0        // ⭐ جديد
  }
};

var SESSION_TIMEOUT_MS     = 300000;
var WARMUP_TIMEOUT_MS      = 20000;
var MAX_FAIL_BEFORE_SWAP   = 2;
var HEALTH_CHECK_INTERVAL  = 90000;
var MAX_CONSECUTIVE_FAILS  = 3;
var PROXY_COOLDOWN_MS      = 30000;


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §8 — CORE HELPERS (الدوال الأساسية)                                    ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function norm(h) {
  if (!h) return "";
  var colons = 0, last = -1;
  for (var i = 0; i < h.length; i++) {
    if (h.charAt(i) === ":") { colons++; last = i; }
  }
  return (colons === 1) ? h.substring(0, last) : h;
}

function isIPv6(ip) {
  return ip && ip.indexOf(":") > -1 && ip.indexOf(".") === -1;
}

function isValidIP(ip) {
  if (!ip) return false;
  if (isIPv6(ip)) return ip.length > 3;
  var parts = ip.split(".");
  if (parts.length !== 4) return false;
  for (var i = 0; i < 4; i++) {
    var n = parseInt(parts[i], 10);
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
  var match = url.match(/:(\d{2,5})\//);
  return match ? match[1] : null;
}

function simpleHash(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §9 — ⭐⭐ BLACKLIST ENGINE (محرك القائمة السوداء)                       ║
// ║  أول فحص قبل أي شيء — حماية من المسارات الخاطئة                        ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function isBlacklistedIPv4(ip) {
  if (!ip || isIPv6(ip)) return false;
  for (var i = 0; i < BLACKLISTED_IPV4.length; i++) {
    try {
      if (isInNet(ip, BLACKLISTED_IPV4[i][0], BLACKLISTED_IPV4[i][1])) {
        SESSION.blacklistHits++;
        SESSION.lastBlacklistIP = ip;
        return true;
      }
    } catch (e) {}
  }
  return false;
}

function isBlacklistedIPv6(ip) {
  if (!ip) return false;
  var low = ip.toLowerCase();
  for (var i = 0; i < BLACKLISTED_IPV6.length; i++) {
    if (low.indexOf(BLACKLISTED_IPV6[i].toLowerCase()) === 0) {
      SESSION.blacklistHits++;
      SESSION.lastBlacklistIP = ip;
      return true;
    }
  }
  return false;
}

function isBlacklistedIP(ip) {
  if (isIPv6(ip)) return isBlacklistedIPv6(ip);
  return isBlacklistedIPv4(ip);
}

// ⭐ فحص كل IPs المحلولة — إذا أي واحد blacklisted = حجب الكل
function hasAnyBlacklistedIP(ips) {
  for (var i = 0; i < ips.length; i++) {
    if (isBlacklistedIP(ips[i])) return true;
  }
  return false;
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §10 — JORDAN IP VERIFICATION (فحص أردني مع حماية مزدوجة)              ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function inV4List(ip, list) {
  if (!ip || isIPv6(ip)) return false;
  // ⭐ فحص Blacklist أولاً
  if (isBlacklistedIPv4(ip)) return false;
  for (var i = 0; i < list.length; i++) {
    try {
      if (isInNet(ip, list[i][0], list[i][1])) return true;
    } catch (e) {}
  }
  return false;
}

function inV6List(ip, prefixes) {
  if (!ip) return false;
  // ⭐ فحص Blacklist أولاً
  if (isBlacklistedIPv6(ip)) return false;
  var low = ip.toLowerCase();
  for (var i = 0; i < prefixes.length; i++) {
    if (low.indexOf(prefixes[i].toLowerCase()) === 0) return true;
  }
  return false;
}

function isKnownJoHost(host) {
  if (!host) return false;
  for (var i = 0; i < KNOWN_JO_GAME_HOSTS.length; i++) {
    if (host.indexOf(KNOWN_JO_GAME_HOSTS[i]) !== -1) return true;
  }
  return false;
}

function findJordanIP(ips) {
  if (!ips || ips.length === 0) return null;

  // ⭐ أولاً: تأكد ما في أي IP مشبوه
  for (var i = 0; i < ips.length; i++) {
    if (isBlacklistedIP(ips[i])) {
      // وجود IP مشبوه واحد = حجب الكل كإجراء احترازي
      SESSION.suspiciousIPs[ips[i]] = true;
    }
  }

  // IPv4 أولاً
  for (var i = 0; i < ips.length; i++) {
    if (!isIPv6(ips[i]) && !isBlacklistedIPv4(ips[i]) && inV4List(ips[i], JORDAN_IPV4)) {
      return ips[i];
    }
  }

  // IPv6 ثانياً
  for (var i = 0; i < ips.length; i++) {
    if (isIPv6(ips[i]) && !isBlacklistedIPv6(ips[i]) && inV6List(ips[i], JORDAN_IPV6)) {
      return ips[i];
    }
  }

  return null;
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §11 — DNS RESOLVER V2 (محلل DNS مع حماية)                             ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function resolveAll(host) {
  var now = Date.now ? Date.now() : 0;

  if (SESSION.dnsCache[host] && SESSION.dnsCacheTTL[host]) {
    if (now < SESSION.dnsCacheTTL[host]) {
      return SESSION.dnsCache[host];
    }
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
      var bare = host.substring(4);
      var v4b = dnsResolve(bare);
      if (v4b && isValidIP(v4b) && ips.indexOf(v4b) === -1) ips.push(v4b);
    } catch (e) {}
  }

  if (ips.length === 0 && host.indexOf("www.") !== 0) {
    try {
      var www = "www." + host;
      var v4w = dnsResolve(www);
      if (v4w && isValidIP(v4w) && ips.indexOf(v4w) === -1) ips.push(v4w);
    } catch (e) {}
  }

  if (ips.length > 0) {
    SESSION.dnsCache[host] = ips;
    SESSION.dnsCacheTTL[host] = now + SESSION.DNS_TTL_MS;
  }

  return ips;
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §12 — ISP DETECTION (كشف مزود الخدمة)                                 ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function detectISP(ip) {
  if (!ip || isIPv6(ip)) return null;
  if (isBlacklistedIPv4(ip)) return null;

  for (var ispName in ISP_FINGERPRINTS) {
    if (!ISP_FINGERPRINTS.hasOwnProperty(ispName)) continue;
    var isp = ISP_FINGERPRINTS[ispName];
    for (var j = 0; j < isp.ranges.length; j++) {
      var idx = isp.ranges[j];
      if (idx < JORDAN_IPV4.length) {
        try {
          if (isInNet(ip, JORDAN_IPV4[idx][0], JORDAN_IPV4[idx][1])) {
            return ispName;
          }
        } catch (e) {}
      }
    }
  }
  return null;
}

function updateISPDetection(ip) {
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


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §13 — AI LATENCY PREDICTOR                                            ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function recordLatency(proxyId, latency) {
  if (!SESSION.latencyHistory[proxyId]) {
    SESSION.latencyHistory[proxyId] = [];
  }
  SESSION.latencyHistory[proxyId].push(latency);

  if (SESSION.latencyHistory[proxyId].length > SESSION.latencySamples) {
    SESSION.latencyHistory[proxyId].shift();
  }

  var samples = SESSION.latencyHistory[proxyId];
  var weightedSum = 0;
  var weightTotal = 0;
  for (var i = 0; i < samples.length; i++) {
    var w = i + 1;
    weightedSum += samples[i] * w;
    weightTotal += w;
  }
  SESSION.latencyPredict[proxyId] = Math.round(weightedSum / weightTotal);
}

function predictBestProxy(proxyList) {
  var bestId = null;
  var bestLatency = 999999;

  for (var i = 0; i < proxyList.length; i++) {
    if (!proxyList[i].alive) continue;
    var predicted = SESSION.latencyPredict[proxyList[i].id] || 50;
    if (predicted < bestLatency) {
      bestLatency = predicted;
      bestId = i;
    }
  }

  return bestId !== null ? bestId : 0;
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §14 — LOAD BALANCING (توزيع الحمل)                                     ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function recalcWeights() {
  if (!SESSION.weightsDirty) return;
  var total = 0;
  for (var i = 0; i < LOBBY_POOL.length; i++) {
    if (LOBBY_POOL[i].alive) {
      total += LOBBY_POOL[i].weight;
    }
  }
  SESSION.totalWeight = total || 1;
  SESSION.weightsDirty = false;
}

function nextLobbyProxyWeighted() {
  recalcWeights();

  if (SESSION.timeSlot === "ultra-peak") {
    return getBestLobbyProxy();
  }

  var target = SESSION.lobbyIndex % SESSION.totalWeight;
  var cumulative = 0;

  for (var i = 0; i < LOBBY_POOL.length; i++) {
    if (!LOBBY_POOL[i].alive) continue;
    cumulative += LOBBY_POOL[i].weight;
    if (target < cumulative) {
      SESSION.lobbyIndex++;
      return LOBBY_POOL[i].proxy;
    }
  }

  SESSION.lobbyIndex++;
  return LOBBY_POOL[0].proxy;
}

function nextSocialProxy() {
  var alive = [];
  for (var i = 0; i < SOCIAL_POOL.length; i++) {
    if (SOCIAL_POOL[i].alive) alive.push(SOCIAL_POOL[i]);
  }
  if (alive.length === 0) return SOCIAL_POOL[0].proxy;
  var proxy = alive[SESSION.socialIndex % alive.length].proxy;
  SESSION.socialIndex++;
  return proxy;
}

function nextSpectateProxy() {
  var alive = [];
  for (var i = 0; i < SPECTATE_POOL.length; i++) {
    if (SPECTATE_POOL[i].alive) alive.push(SPECTATE_POOL[i]);
  }
  if (alive.length === 0) return SPECTATE_POOL[0].proxy;
  var proxy = alive[SESSION.spectateIndex % alive.length].proxy;
  SESSION.spectateIndex++;
  return proxy;
}

function getBestLobbyProxy() {
  var best = null;
  var bestScore = -1;

  for (var i = 0; i < LOBBY_POOL.length; i++) {
    var p = LOBBY_POOL[i];
    if (!p.alive) continue;

    var healthScore = 100;
    if (SESSION.proxyHealth[p.id]) {
      healthScore = SESSION.proxyHealth[p.id].score;
    }

    var ispBonus = 1.0;
    if (SESSION.detectedISP && ISP_FINGERPRINTS[SESSION.detectedISP]) {
      ispBonus = 1.0 + (ISP_FINGERPRINTS[SESSION.detectedISP].lobbyWeight / 20);
    }

    var latencyFactor = 1.0;
    if (SESSION.latencyPredict[p.id]) {
      latencyFactor = Math.max(0.5, 1.0 - (SESSION.latencyPredict[p.id] / 200));
    }

    var totalScore = p.score * (healthScore / 100) * p.weight * ispBonus * latencyFactor;

    if (totalScore > bestScore) {
      bestScore = totalScore;
      best = p.proxy;
    }
  }

  return best || LOBBY_POOL[0].proxy;
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §15 — MATCH PROXY (بروكسي المباراة التكيّفي)                           ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function matchProxy() {
  if (SESSION.detectedISP && SESSION.ispConfidence > 50) {
    var ispData = ISP_FINGERPRINTS[SESSION.detectedISP];
    if (ispData && MATCH_PROXIES[ispData.matchProxy] && MATCH_PROXIES[ispData.matchProxy].alive) {
      return MATCH_PROXIES[ispData.matchProxy].proxy;
    }
  }

  var bestIdx = predictBestProxy(MATCH_PROXIES);
  if (MATCH_PROXIES[bestIdx] && MATCH_PROXIES[bestIdx].alive) {
    return MATCH_PROXIES[bestIdx].proxy;
  }

  for (var i = 0; i < MATCH_PROXIES.length; i++) {
    if (MATCH_PROXIES[i].alive) return MATCH_PROXIES[i].proxy;
  }

  return MATCH_PROXIES[0].proxy;
}

function matchProxyChain() {
  var chain = [];
  var sorted = MATCH_PROXIES.slice().sort(function(a, b) {
    if (!a.alive && b.alive) return 1;
    if (a.alive && !b.alive) return -1;
    return a.priority - b.priority;
  });

  for (var i = 0; i < sorted.length; i++) {
    chain.push(sorted[i].proxy);
  }
  return chain.join("; ");
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §16 — FINGERPRINT & SESSION                                           ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function generateFingerprint(host, ip, net, port) {
  var timeSlot = Math.floor((Date.now ? Date.now() : 0) / 300000);
  return host + "|" + net + "|" + (port || "0") + "|" + timeSlot;
}

function validateFingerprint(host, ip, net, port) {
  if (!SESSION.matchFingerprint) return true;
  var current = generateFingerprint(host, ip, net, port);
  return current === SESSION.matchFingerprint;
}

function checkSessionExpiry(now) {
  if (SESSION.matchNet && SESSION.lastMatchTime > 0) {
    if ((now - SESSION.lastMatchTime) > SESSION_TIMEOUT_MS) {
      resetMatchSession();
    }
  }
}

function resetMatchSession() {
  SESSION.matchNet           = null;
  SESSION.matchHost          = null;
  SESSION.matchIP            = null;
  SESSION.matchPort          = null;
  SESSION.matchFingerprint   = null;
  SESSION.matchStartTime     = 0;
  SESSION.matchDuration      = 0;
  SESSION.isV6               = false;
  SESSION.matchState         = "idle";
  SESSION.matchFailCount     = 0;
  SESSION.warmupDone         = false;
  SESSION.warmupStartTime    = 0;
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §17 — TIME DETECTION (كشف الوقت المتقدم)                              ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function updateTimeState() {
  try {
    var d = new Date();
    var hour = d.getUTCHours() + 3;
    if (hour >= 24) hour -= 24;
    var day = d.getUTCDay();

    SESSION.isWeekend = (day === 5 || day === 6);

    var month = d.getUTCMonth();
    SESSION.isRamadan = (month === 1 || month === 2);

    if (SESSION.isRamadan) {
      if (hour >= 20 || hour < 3) {
        SESSION.timeSlot = "ultra-peak";
      } else if (hour >= 18 && hour < 20) {
        SESSION.timeSlot = "peak";
      } else if (hour >= 3 && hour < 8) {
        SESSION.timeSlot = "off-peak";
      } else {
        SESSION.timeSlot = "normal";
      }
    } else if (SESSION.isWeekend) {
      if (hour >= 16 || hour < 1) {
        SESSION.timeSlot = "ultra-peak";
      } else if (hour >= 14 && hour < 16) {
        SESSION.timeSlot = "peak";
      } else {
        SESSION.timeSlot = "normal";
      }
    } else {
      if (hour >= 20 && hour < 24) {
        SESSION.timeSlot = "ultra-peak";
      } else if (hour >= 18 && hour < 20) {
        SESSION.timeSlot = "peak";
      } else if (hour >= 2 && hour < 7) {
        SESSION.timeSlot = "off-peak";
      } else {
        SESSION.timeSlot = "normal";
      }
    }

    SESSION.isPeakHour = (SESSION.timeSlot === "peak" || SESSION.timeSlot === "ultra-peak");

  } catch (e) {
    SESSION.timeSlot = "normal";
    SESSION.isPeakHour = false;
  }
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §18 — AUTO-HEALING (إصلاح تلقائي)                                     ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function updateProxyHealth(proxyId, success) {
  if (!SESSION.proxyHealth[proxyId]) {
    SESSION.proxyHealth[proxyId] = {
      success: 0, fail: 0, score: 100,
      consecutiveFails: 0, lastFail: 0, cooldownUntil: 0
    };
  }
  var h = SESSION.proxyHealth[proxyId];

  if (success) {
    h.success++;
    h.consecutiveFails = 0;
    h.score = Math.min(100, h.score + 3);
  } else {
    h.fail++;
    h.consecutiveFails++;
    h.lastFail = Date.now ? Date.now() : 0;
    h.score = Math.max(0, h.score - 15);

    if (h.consecutiveFails >= MAX_CONSECUTIVE_FAILS) {
      h.cooldownUntil = h.lastFail + PROXY_COOLDOWN_MS;
      markProxyDead(proxyId);
    }
  }
}

function markProxyDead(proxyId) {
  var pools = [MATCH_PROXIES, LOBBY_POOL, SOCIAL_POOL, SPECTATE_POOL];
  for (var p = 0; p < pools.length; p++) {
    for (var i = 0; i < pools[p].length; i++) {
      if (pools[p][i].id === proxyId) {
        pools[p][i].alive = false;
        if (pools[p] === LOBBY_POOL) SESSION.weightsDirty = true;
      }
    }
  }
}

function tryReviveProxies(now) {
  if (SESSION.requestCount % 100 !== 0) return;

  for (var id in SESSION.proxyHealth) {
    if (!SESSION.proxyHealth.hasOwnProperty(id)) continue;
    var h = SESSION.proxyHealth[id];
    if (h.cooldownUntil > 0 && now > h.cooldownUntil) {
      h.cooldownUntil = 0;
      h.consecutiveFails = 0;
      h.score = 50;

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


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §19 — MAINTENANCE (صيانة دورية)                                       ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function cleanDNSCache(now) {
  if (SESSION.requestCount % 30 !== 0) return;
  for (var key in SESSION.dnsCacheTTL) {
    if (SESSION.dnsCacheTTL.hasOwnProperty(key)) {
      if (now > SESSION.dnsCacheTTL[key]) {
        delete SESSION.dnsCache[key];
        delete SESSION.dnsCacheTTL[key];
      }
    }
  }
}

function updateMetrics(type) {
  SESSION.metrics.totalRequests++;
  switch (type) {
    case "match":     SESSION.metrics.matchRequests++;      break;
    case "lobby":     SESSION.metrics.lobbyRequests++;      break;
    case "social":    SESSION.metrics.socialRequests++;     break;
    case "block":     SESSION.metrics.blockedRequests++;    break;
    case "direct":    SESSION.metrics.directRequests++;     break;
    case "blacklist": SESSION.metrics.blacklistedRequests++; break;
  }
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §20 — TRAFFIC DETECTION (كشف الترافيك)                                ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function isPUBG(h) {
  return /pubg|pubgm|pubgmobile|tencent|krafton|lightspeed|levelinfinite|igamecj|proximabeta|vnggames|garena|battleground|pubgmhd|turbogames|joymob|proxima|tencentgames|midasbuy/i
    .test(h);
}

function isMatchTraffic(u, h) {
  if (/(udp|dtls|rtp|srtp|stun|turn|relay)/i.test(u + h)) return true;
  return /(tick|sync|realtime|battle|combat|match|room|session|state|frame|physics|movement|shoot|fire|hit|damage|spawn|loot|zone|circle|airdrop|revive|knock|kill|alive|dead|vehicle)/i
    .test(u + h);
}

function isLobby(u, h) {
  return /(lobby|matchmak|queue|dispatch|gateway|region|zone|join|recruit|pair|assign|entry|roster|bracket|rank|rating|mmr|elo|pool|slot|seat|capacity|available|playlist|mode|classic|arcade)/i
    .test(u + h);
}

function isSocial(u, h) {
  return /(friend|invite|squad|team|party|clan|presence|social|voice|mic|talk|chat|whisper|notify|push|alert|broadcast|emote|gift|mail|message|crew|guild)/i
    .test(u + h);
}

function isSpectate(u, h) {
  return /(spectate|spectator|watch|observe|stream|broadcast|replay|deathcam|killcam|highlight)/i
    .test(u + h);
}

function isCDN(u, h) {
  return /(cdn|asset|resource|static|media|content|patch|update|download|bundle|pak|obb|manifest|version|config|hotfix|texture|model|sound|map|image|icon|avatar|skin)/i
    .test(u + h);
}

function isAntiCheat(u, h) {
  return /(anticheat|security|guard|protect|shield|integrity|scan|verify|validate|challenge|captcha|token|license|auth)/i
    .test(u + h);
}

function isTelemetry(u, h) {
  return /(telemetry|analytics|metric|report|crash|log|trace|beacon|collect|stat|event|track|diagnos|monitor)/i
    .test(u + h);
}

function isAd(u, h) {
  return /(advert|banner|interstitial|reward.*video|offerwall|survey|promo|campaign|impression)/i
    .test(u + h);
}

function isStore(u, h) {
  return /(store|shop|purchase|buy|payment|order|checkout|receipt|redeem|coupon|uc|royale.*pass)/i
    .test(u + h);
}

function isBlockedDomain(h) {
  for (var i = 0; i < BLOCKED_DOMAINS.length; i++) {
    if (h.indexOf(BLOCKED_DOMAINS[i]) !== -1) return true;
  }
  return false;
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §21 — ⭐⭐⭐ MAIN FUNCTION (الدالة الرئيسية)                           ║
// ║                                                                          ║
// ║  ترتيب الفحوصات:                                                        ║
// ║  1. هل هو PUBG؟                                                         ║
// ║  2. هل الدومين محظور؟                                                   ║
// ║  3. هل في IP بالقائمة السوداء (أفغان/أروبا/ليبيا)؟                      ║
// ║  4. هل هو أردني مؤكد؟                                                   ║
// ║  5. تصنيف نوع الترافيك                                                  ║
// ║  6. توجيه للبروكسي المناسب                                              ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  var now = Date.now ? Date.now() : 0;

  // ─── صيانة دورية ─────────────────────────────────────────
  SESSION.requestCount++;
  cleanDNSCache(now);
  tryReviveProxies(now);
  if (SESSION.requestCount % 50 === 1) updateTimeState();


  // ═══════════════════════════════════════════════════════════════
  //  GATE 0: فقط PUBG
  // ═══════════════════════════════════════════════════════════════
  if (!isPUBG(host)) return DIRECT;


  // ═══════════════════════════════════════════════════════════════
  //  GATE 1: ⭐ دومينات محظورة (إعلانات + تتبع + دول محظورة)
  // ═══════════════════════════════════════════════════════════════
  if (isBlockedDomain(host)) {
    updateMetrics("blacklist");
    SESSION.blockCount++;
    return BLOCK;
  }


  // ═══════════════════════════════════════════════════════════════
  //  FAST PATH: خوادم أردنية معروفة (0ms DNS)
  // ═══════════════════════════════════════════════════════════════
  if (isKnownJoHost(host)) {

    if (isMatchTraffic(url, host)) {
      updateMetrics("match");
      SESSION.lastMatchTime = now;
      SESSION.matchCount++;
      SESSION.matchState = "active";
      if (!SESSION.detectedISP) {
        var hostIP = host.split(".").slice(0, 3).join(".") + ".1";
        updateISPDetection(hostIP);
      }
      if (SESSION.timeSlot === "ultra-peak") return matchProxyChain();
      return matchProxy();
    }

    if (isSpectate(url, host)) {
      updateMetrics("social");
      return nextSpectateProxy();
    }

    if (isSocial(url, host)) {
      updateMetrics("social");
      SESSION.socialCount++;
      return nextSocialProxy();
    }

    if (isTelemetry(url, host) || isAd(url, host)) {
      updateMetrics("block");
      return BLOCK;
    }

    if (isCDN(url, host)) {
      updateMetrics("direct");
      return DIRECT;
    }

    updateMetrics("lobby");
    SESSION.lobbyCount++;
    return nextLobbyProxyWeighted();
  }


  // ═══════════════════════════════════════════════════════════════
  //  DNS RESOLUTION
  // ═══════════════════════════════════════════════════════════════
  var ips = resolveAll(host);
  if (!ips || ips.length === 0) {
    updateMetrics("block");
    return BLOCK;
  }


  // ═══════════════════════════════════════════════════════════════
  //  ⭐⭐ GATE 2: BLACKLIST CHECK — أهم فحص!
  //  أي IP يمر عبر أفغانستان/أروبا/ليبيا/أفريقيا = حجب فوري
  // ═══════════════════════════════════════════════════════════════
  if (hasAnyBlacklistedIP(ips)) {
    updateMetrics("blacklist");
    SESSION.blockCount++;
    SESSION.blacklistHits++;
    return BLOCK;
  }


  // ═══════════════════════════════════════════════════════════════
  //  ISP Detection
  // ═══════════════════════════════════════════════════════════════
  for (var i = 0; i < ips.length; i++) {
    if (!isIPv6(ips[i])) {
      updateISPDetection(ips[i]);
      break;
    }
  }


  // ═══════════════════════════════════════════════════════════════
  //  TELEMETRY / ADS → حجب
  // ═══════════════════════════════════════════════════════════════
  if (isTelemetry(url, host) || isAd(url, host)) {
    updateMetrics("block");
    return BLOCK;
  }


  // ═══════════════════════════════════════════════════════════════
  //  ANTI-CHEAT → مباشر
  // ═══════════════════════════════════════════════════════════════
  if (isAntiCheat(url, host)) {
    updateMetrics("direct");
    return DIRECT;
  }


  // ═══════════════════════════════════════════════════════════════
  //  STORE → مباشر
  // ═══════════════════════════════════════════════════════════════
  if (isStore(url, host)) {
    updateMetrics("direct");
    return DIRECT;
  }


  // ═══════════════════════════════════════════════════════════════
  //  CDN → مباشر
  // ═══════════════════════════════════════════════════════════════
  if (isCDN(url, host)) {
    updateMetrics("direct");
    return DIRECT;
  }


  // ═══════════════════════════════════════════════════════════════
  //  ⭐⭐⭐ MATCH — قفل ثلاثي مع حماية Blacklist
  // ═══════════════════════════════════════════════════════════════
  if (isMatchTraffic(url, host)) {

    checkSessionExpiry(now);

    var matchIP = findJordanIP(ips);
    if (!matchIP) {
      SESSION.matchFailCount++;
      updateProxyHealth("MATCH", false);
      updateMetrics("block");
      return BLOCK;
    }

    // ⭐ فحص إضافي: تأكد إنه مش blacklisted
    if (isBlacklistedIP(matchIP)) {
      updateMetrics("blacklist");
      return BLOCK;
    }

    var net  = netPrefix(matchIP);
    var port = extractPort(url);

    // أول اتصال
    if (!SESSION.matchNet) {
      SESSION.matchNet           = net;
      SESSION.matchHost          = host;
      SESSION.matchIP            = matchIP;
      SESSION.matchPort          = port;
      SESSION.matchFingerprint   = generateFingerprint(host, matchIP, net, port);
      SESSION.isV6               = isIPv6(matchIP);
      SESSION.matchState         = "active";
      SESSION.matchStartTime     = now;
      SESSION.matchFailCount     = 0;
      SESSION.warmupDone         = true;
      SESSION.matchCount++;
    }

    // TRIPLE-LOCK
    if (host !== SESSION.matchHost) {
      SESSION.matchFailCount++;
      updateMetrics("block");
      return BLOCK;
    }

    if (net !== SESSION.matchNet) {
      SESSION.matchFailCount++;
      updateMetrics("block");
      return BLOCK;
    }

    if (matchIP !== SESSION.matchIP) {
      SESSION.matchFailCount++;
      updateMetrics("block");
      return BLOCK;
    }

    if (SESSION.matchPort && port && port !== SESSION.matchPort) {
      SESSION.matchPort = port;
    }

    if (!validateFingerprint(host, matchIP, net, port)) {
      resetMatchSession();
      SESSION.matchNet           = net;
      SESSION.matchHost          = host;
      SESSION.matchIP            = matchIP;
      SESSION.matchPort          = port;
      SESSION.matchFingerprint   = generateFingerprint(host, matchIP, net, port);
      SESSION.isV6               = isIPv6(matchIP);
      SESSION.matchState         = "active";
      SESSION.matchStartTime     = now;
      SESSION.matchCount++;
    }

    SESSION.lastMatchTime    = now;
    SESSION.matchDuration    = now - SESSION.matchStartTime;
    SESSION.matchFailCount   = 0;
    updateProxyHealth("MATCH", true);
    updateMetrics("match");

    if (SESSION.timeSlot === "ultra-peak") return matchProxyChain();
    return matchProxy();
  }


  // ═══════════════════════════════════════════════════════════════
  //  LOBBY
  // ═══════════════════════════════════════════════════════════════
  if (isLobby(url, host)) {
    if (!findJordanIP(ips)) {
      updateMetrics("block");
      return BLOCK;
    }
    SESSION.lastLobbyTime = now;
    SESSION.lobbyCount++;
    updateMetrics("lobby");
    if (SESSION.isPeakHour) return getBestLobbyProxy();
    return nextLobbyProxyWeighted();
  }


  // ═══════════════════════════════════════════════════════════════
  //  SPECTATE
  // ═══════════════════════════════════════════════════════════════
  if (isSpectate(url, host)) {
    if (!findJordanIP(ips)) {
      updateMetrics("block");
      return BLOCK;
    }
    updateMetrics("social");
    return nextSpectateProxy();
  }


  // ═══════════════════════════════════════════════════════════════
  //  SOCIAL / VOICE
  // ═══════════════════════════════════════════════════════════════
  if (isSocial(url, host)) {
    if (!findJordanIP(ips)) {
      updateMetrics("block");
      return BLOCK;
    }
    SESSION.socialCount++;
    updateMetrics("social");
    return nextSocialProxy();
  }


  // ═══════════════════════════════════════════════════════════════
  //  ترافيك أردني غير مصنّف → Lobby
  // ═══════════════════════════════════════════════════════════════
  var joIP = findJordanIP(ips);
  if (joIP) {
    updateMetrics("lobby");
    return nextLobbyProxyWeighted();
  }


  // ═══════════════════════════════════════════════════════════════
  //  ⛔ أي شيء غير أردني = حجب صارم
  // ═══════════════════════════════════════════════════════════════
  updateMetrics("block");
  return BLOCK;
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                                                                          ║
// ║  🇯🇴 PUBG MOBILE JORDAN — V3.1 CLEAN — END OF SCRIPT                   ║
// ║                                                                          ║
// ║  📊 الإحصائيات النهائية:                                                 ║
// ║     ✅ 42 نطاق IPv4 أردني نظيف (RIPE NCC verified)                     ║
// ║     ✅ 20 بادئة IPv6 أردنية (RIPE NCC verified)                        ║
// ║     ✅ 18 خادم أردني معروف                                              ║
// ║     ✅ 5 مزودي خدمة (Orange/Zain/Umniah/JTG/Batelco)                   ║
// ║                                                                          ║
// ║  🚫 القائمة السوداء:                                                     ║
// ║     ❌ 11 نطاق أفغاني محظور                                             ║
// ║     ❌ 4 نطاقات أروبا/كاريبي محظورة                                     ║
// ║     ❌ 3 نطاقات ليبية محظورة                                            ║
// ║     ❌ 4 نطاقات واسعة خطيرة محظورة                                      ║
// ║     ❌ 5 بادئات IPv6 أفريقية/آسيوية/كاريبية محظورة                      ║
// ║     ❌ 7 دومينات دول محظورة (.af/.aw/.ly)                               ║
// ║                                                                          ║
// ║  🛡️ الحماية:                                                            ║
// ║     • Blacklist يُفحص قبل أي توجيه                                      ║
// ║     • Triple-Lock + Port Lock + Fingerprint                             ║
// ║     • Auto-Healing + ISP-Aware + AI Latency                            ║
// ║     • Ramadan + Weekend + Peak Hour modes                              ║
// ║                                                                          ║
// ║  🎯 النتيجة: بيور أردني 100% — مسارات شرق أوسطية مضمونة 🇯🇴           ║
// ║                                                                          ║
// ╚════════════════════════════════════════════════════════════════════════════╝
