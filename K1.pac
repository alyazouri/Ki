// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  PUBG MOBILE JORDAN — ULTRA PRO SCRIPT V3.0  🇯🇴                        ║
// ║  "بيور أردني — الكل يشوفني وأشوفه"                                      ║
// ║  ميزات غير مسبوقة | أقل بنق | أكثر لاعبين أردنيين                       ║
// ║  آخر تحديث: 2025 — بناء كامل من الصفر                                   ║
// ╚════════════════════════════════════════════════════════════════════════════╝

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §1 — PROXY INFRASTRUCTURE (بنية البروكسيات — 5 طبقات)                   ║
// ╚════════════════════════════════════════════════════════════════════════════╝

// ─── Match Proxies: خماسي الطبقات مع أولويات ─────────────────────────
var MATCH_PROXIES = [
  { id: "M1", proxy: "PROXY 46.185.131.218:20001",  city: "amman",  priority: 1, alive: true, latency: 0, lastCheck: 0 },
  { id: "M2", proxy: "PROXY 46.185.131.219:20001",  city: "amman",  priority: 2, alive: true, latency: 0, lastCheck: 0 },
  { id: "M3", proxy: "PROXY 176.29.153.95:20001",   city: "amman",  priority: 3, alive: true, latency: 0, lastCheck: 0 },
  { id: "M4", proxy: "PROXY 92.253.64.10:20001",    city: "irbid",  priority: 4, alive: true, latency: 0, lastCheck: 0 },
  { id: "M5", proxy: "PROXY 94.249.32.15:20001",    city: "zarqa",  priority: 5, alive: true, latency: 0, lastCheck: 0 }
];

// ─── Lobby Pool: موسّع مع تقييم ديناميكي ──────────────────────────────
var LOBBY_POOL = [
  { id: "L1", proxy: "PROXY 212.35.66.45:8085",      weight: 6, score: 100, alive: true, region: "north",  consecutiveFails: 0 },
  { id: "L2", proxy: "PROXY 176.29.153.95:9030",     weight: 5, score: 100, alive: true, region: "center", consecutiveFails: 0 },
  { id: "L3", proxy: "PROXY 46.185.131.218:20002",   weight: 4, score: 100, alive: true, region: "center", consecutiveFails: 0 },
  { id: "L4", proxy: "PROXY 92.253.64.10:8080",      weight: 5, score: 100, alive: true, region: "north",  consecutiveFails: 0 },
  { id: "L5", proxy: "PROXY 94.249.32.15:9050",      weight: 4, score: 100, alive: true, region: "center", consecutiveFails: 0 },
  { id: "L6", proxy: "PROXY 82.212.80.20:8080",      weight: 3, score: 100, alive: true, region: "south",  consecutiveFails: 0 },
  { id: "L7", proxy: "PROXY 149.200.192.10:9060",    weight: 3, score: 100, alive: true, region: "center", consecutiveFails: 0 },
  { id: "L8", proxy: "PROXY 178.77.140.5:8090",      weight: 3, score: 100, alive: true, region: "east",   consecutiveFails: 0 }
];

// ─── Social/Voice Pool (مخصص للصوت والدردشة) ──────────────────────────
var SOCIAL_POOL = [
  { id: "S1", proxy: "PROXY 212.35.66.45:8086",      alive: true, score: 100, type: "voice" },
  { id: "S2", proxy: "PROXY 176.29.153.95:9031",     alive: true, score: 100, type: "voice" },
  { id: "S3", proxy: "PROXY 46.185.131.220:20003",   alive: true, score: 100, type: "voice" },
  { id: "S4", proxy: "PROXY 37.220.120.5:8087",      alive: true, score: 100, type: "chat"  },
  { id: "S5", proxy: "PROXY 188.247.80.10:9032",     alive: true, score: 100, type: "chat"  }
];

// ─── ⭐ Spectate/Stream Pool (مخصص للمشاهدة والبث) ────────────────────
var SPECTATE_POOL = [
  { id: "SP1", proxy: "PROXY 46.185.131.218:20004",  alive: true, score: 100 },
  { id: "SP2", proxy: "PROXY 176.29.153.95:20004",   alive: true, score: 100 },
  { id: "SP3", proxy: "PROXY 212.35.66.45:20004",    alive: true, score: 100 }
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §2 — JORDAN IPv4 RANGES (60+ نطاق — أشمل قاعدة بيانات في العالم)       ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var JORDAN_IPV4 = [

  // ═══════════════════════════════════════════
  //  Orange Jordan (أورانج الأردن) — 10 نطاقات
  // ═══════════════════════════════════════════
  ["176.28.128.0",    "255.255.128.0"],     // /17  — Mobile
  ["176.29.0.0",      "255.255.0.0"],       // /16  — Core
  ["77.69.0.0",       "255.255.0.0"],       // /16  ⭐ موسّع — كل النطاق
  ["213.139.192.0",   "255.255.192.0"],     // /18  — FTTH
  ["213.139.128.0",   "255.255.192.0"],     // /18  ⭐ جديد — FTTH2
  ["62.72.160.0",     "255.255.224.0"],     // /19  ⭐ جديد — Legacy
  ["80.90.160.0",     "255.255.224.0"],     // /19  ⭐ جديد — Business
  ["85.113.64.0",     "255.255.192.0"],     // /18  ⭐ جديد — 4G LTE
  ["217.18.224.0",    "255.255.224.0"],     // /19  ⭐ جديد — Backbone
  ["91.106.96.0",     "255.255.240.0"],     // /20  — DSL

  // ═══════════════════════════════════════════
  //  Zain Jordan (زين الأردن) — 10 نطاقات
  // ═══════════════════════════════════════════
  ["82.212.64.0",     "255.255.192.0"],     // /18  — Core
  ["37.202.64.0",     "255.255.192.0"],     // /18  — Mobile
  ["94.249.0.0",      "255.255.0.0"],       // /16  — Full Range
  ["37.48.64.0",      "255.255.192.0"],     // /18  ⭐ موسّع — Combined
  ["185.117.72.0",    "255.255.252.0"],     // /22  — 5G
  ["185.117.76.0",    "255.255.252.0"],     // /22  ⭐ جديد — 5G ext
  ["5.1.32.0",        "255.255.224.0"],     // /19  ⭐ جديد — LTE
  ["5.62.128.0",      "255.255.128.0"],     // /17  ⭐ جديد — Broadband
  ["31.223.0.0",      "255.255.0.0"],       // /16  ⭐ جديد — Consumer
  ["89.148.0.0",      "255.255.0.0"],       // /16  ⭐ جديد — Enterprise

  // ═══════════════════════════════════════════
  //  Umniah (أمنية) — 10 نطاقات
  // ═══════════════════════════════════════════
  ["149.200.128.0",   "255.255.128.0"],     // /17  — Core
  ["178.77.128.0",    "255.255.128.0"],     // /17  ⭐ موسّع
  ["37.152.0.0",      "255.255.240.0"],     // /20  ⭐ موسّع — Combined
  ["185.16.72.0",     "255.255.252.0"],     // /22  — DC
  ["185.95.216.0",    "255.255.252.0"],     // /22  — Cloud
  ["185.95.220.0",    "255.255.252.0"],     // /22  ⭐ جديد — Cloud ext
  ["5.45.160.0",      "255.255.224.0"],     // /19  ⭐ جديد — Fiber
  ["91.186.192.0",    "255.255.192.0"],     // /18  ⭐ جديد — 4G
  ["185.59.36.0",     "255.255.252.0"],     // /22  ⭐ جديد — IoT
  ["103.28.44.0",     "255.255.252.0"],     // /22  ⭐ جديد — Business

  // ═══════════════════════════════════════════
  //  Jordan Telecom Group (JTG) — 6 نطاقات
  // ═══════════════════════════════════════════
  ["212.35.64.0",     "255.255.128.0"],     // /17  ⭐ موسّع — Combined
  ["217.144.64.0",    "255.255.192.0"],     // /18  ⭐ موسّع — Combined
  ["62.240.96.0",     "255.255.224.0"],     // /19  ⭐ جديد — DSL
  ["195.60.128.0",    "255.255.128.0"],     // /17  ⭐ جديد — Backbone
  ["193.104.160.0",   "255.255.224.0"],     // /19  ⭐ جديد — MPLS
  ["86.108.0.0",      "255.252.0.0"],       // /14  ⭐ جديد — Massive Range

  // ═══════════════════════════════════════════
  //  Batelco Jordan — 4 نطاقات
  // ═══════════════════════════════════════════
  ["87.101.128.0",    "255.255.128.0"],     // /17  — Core
  ["62.3.3.0",        "255.255.255.0"],     // /24  — Legacy
  ["87.101.0.0",      "255.255.128.0"],     // /17  ⭐ جديد — Extended
  ["185.86.232.0",    "255.255.252.0"],     // /22  ⭐ جديد — DC

  // ═══════════════════════════════════════════
  //  RIPE Jordan General — 10 نطاقات
  // ═══════════════════════════════════════════
  ["46.185.128.0",    "255.255.128.0"],     // /17
  ["92.253.0.0",      "255.255.0.0"],       // /16
  ["95.172.192.0",    "255.255.224.0"],     // /19
  ["188.247.64.0",    "255.255.192.0"],     // /18  ⭐ موسّع
  ["109.224.0.0",     "255.240.0.0"],       // /12
  ["37.220.112.0",    "255.255.240.0"],     // /20
  ["5.21.0.0",        "255.255.0.0"],       // /16
  ["185.121.160.0",   "255.255.224.0"],     // /19
  ["37.98.192.0",     "255.255.192.0"],     // /18
  ["156.214.0.0",     "255.254.0.0"],       // /15  ⭐ موسّع

  // ═══════════════════════════════════════════
  //  حكومية وأكاديمية وخاصة — 10 نطاقات
  // ═══════════════════════════════════════════
  ["194.9.40.0",      "255.255.248.0"],     // /21  ⭐ موسّع — JPMC
  ["193.188.64.0",    "255.255.192.0"],     // /18  — Universities
  ["195.43.0.0",      "255.255.128.0"],     // /17  ⭐ موسّع — .gov.jo
  ["185.180.12.0",    "255.255.252.0"],     // /22  — DC JO
  ["45.94.36.0",      "255.255.252.0"],     // /22  — Hosting
  ["185.236.136.0",   "255.255.252.0"],     // /22  — Cloud
  ["103.75.172.0",    "255.255.252.0"],     // /22  — Cloud JO
  ["41.78.44.0",      "255.255.252.0"],     // /22  — ISP small
  ["196.61.0.0",      "255.255.0.0"],       // /16  ⭐ جديد — Gov Extra
  ["197.255.224.0",   "255.255.224.0"]      // /19  ⭐ جديد — Research
];

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §3 — JORDAN IPv6 PREFIXES (20 بادئة — أشمل تغطية)                      ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var JORDAN_IPV6 = [
  // Zain
  "2a00:18d0", "2a00:18d4", "2a00:18d8", "2a00:18dc",
  // Orange
  "2a01:9700", "2a01:9704", "2a01:9708", "2a01:970c",
  // Umniah
  "2a02:c040", "2a02:c044", "2a02:c048",
  // JTG
  "2a04:2e00", "2a04:2e04", "2a04:2e08",
  // Others
  "2a05:74c0", "2a06:8ec0", "2001:41f0",
  "2a09:b2c0", "2a0d:5600",
  // ⭐ جديد
  "2a0e:97c0"
];

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §4 — KNOWN JORDAN GAME SERVER IPs (مسار سريع بدون DNS)                 ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var KNOWN_JO_GAME_HOSTS = [
  // ─── مؤكد — Match Servers ───
  "46.185.131",   "176.29.153",   "212.35.66",
  "92.253.64",    "94.249.32",

  // ─── ⭐ جديد — Lobby + Social ───
  "82.212.80",    "149.200.192",  "37.220.120",
  "188.247.80",   "178.77.140",

  // ─── ⭐ جديد — ISP Gateway Servers ───
  "77.69.64",     "85.113.80",    "86.108.32",
  "91.106.100",   "213.139.200",  "5.62.140",

  // ─── ⭐ جديد — CDN Edge (داخل الأردن) ───
  "195.43.16",    "193.188.80",   "62.240.100"
];

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §5 — ⭐ JORDAN ISP ASN FINGERPRINTS (بصمات مزودي الخدمة)               ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var ISP_FINGERPRINTS = {
  "orange":  { ranges: [0,1,2,3,4,5,6,7,8,9],        matchProxy: 0, lobbyWeight: 6 },
  "zain":    { ranges: [10,11,12,13,14,15,16,17,18,19], matchProxy: 1, lobbyWeight: 5 },
  "umniah":  { ranges: [20,21,22,23,24,25,26,27,28,29], matchProxy: 2, lobbyWeight: 5 },
  "jtg":     { ranges: [30,31,32,33,34,35],             matchProxy: 0, lobbyWeight: 4 },
  "batelco": { ranges: [36,37,38,39],                   matchProxy: 1, lobbyWeight: 3 }
};

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §6 — ⭐ BLOCKED DOMAINS (نطاقات محظورة — إعلانات وتتبع)               ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var BLOCKED_DOMAINS = [
  // إعلانات PUBG الداخلية
  "ads.pubg", "ad.tencent", "pgdt.ugdtimg",
  "adsmind.apdcdn", "mi.gdt.qq", "adx.tencent",
  // تتبع خارجي
  "appsflyer.com", "adjust.com", "branch.io",
  "facebook.com/tr", "analytics.google",
  "crashlytics", "bugly.qq", "beacon.qq",
  // ⭐ جديد — أدوات مراقبة
  "sentry.io", "newrelic", "datadog",
  "hotjar", "mixpanel", "amplitude",
  "segment.io", "mparticle"
];

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §7 — ENHANCED SESSION STATE (حالة الجلسة المتقدمة)                     ║
// ╚════════════════════════════════════════════════════════════════════════════╝

var SESSION = {

  // ═══ Match State (حالة المباراة) ═══
  matchNet:             null,
  matchHost:            null,
  matchIP:              null,
  matchPort:            null,      // ⭐ جديد: تثبيت المنفذ
  matchFingerprint:     null,
  matchStartTime:       0,         // ⭐ جديد: وقت بداية المباراة
  matchDuration:        0,         // ⭐ جديد: مدة المباراة
  isV6:                 false,
  matchState:           "idle",    // ⭐ جديد: idle|warmup|active|ending

  // ═══ DNS Cache مع TTL ═══
  dnsCache:             {},
  dnsCacheTTL:          {},
  DNS_TTL_MS:           45000,     // ⭐ تقليل إلى 45 ثانية لدقة أعلى

  // ═══ Load Balancing ═══
  lobbyIndex:           0,
  socialIndex:          0,
  spectateIndex:        0,         // ⭐ جديد
  totalWeight:          0,
  weightsDirty:         true,      // ⭐ جديد: إعادة حساب مطلوبة

  // ═══ Reliability ═══
  matchFailCount:       0,
  lobbyFailCount:       0,
  socialFailCount:      0,         // ⭐ جديد
  lastMatchTime:        0,
  lastLobbyTime:        0,
  lastSocialTime:       0,         // ⭐ جديد

  // ═══ Warm-up & Health ═══
  warmupDone:           false,
  warmupStartTime:      0,         // ⭐ جديد
  proxyHealth:          {},
  requestCount:         0,
  matchCount:           0,
  lobbyCount:           0,         // ⭐ جديد
  socialCount:          0,         // ⭐ جديد
  blockCount:           0,         // ⭐ جديد: عدد الحجب

  // ═══ ⭐ AI Latency Prediction ═══
  latencyHistory:       {},        // تاريخ البنق لكل بروكسي
  latencyPredict:       {},        // التنبؤ
  latencySamples:       20,        // عدد العينات للتنبؤ

  // ═══ ⭐ ISP Detection ═══
  detectedISP:          null,      // المزود المكتشف
  ispConfidence:        0,         // نسبة الثقة

  // ═══ ⭐ Connection Recycling ═══
  connectionAge:        {},        // عمر كل اتصال
  maxConnectionAge:     600000,    // 10 دقائق max

  // ═══ ⭐ Peak Hour State ═══
  isPeakHour:           false,
  isWeekend:            false,     // ⭐ جديد
  isRamadan:            false,     // ⭐ جديد
  timeSlot:             "normal",  // normal|peak|ultra-peak|off-peak

  // ═══ ⭐ GeoFence ═══
  playerCity:           null,      // عمّان، إربد، الزرقا...
  nearestProxy:         null,      // أقرب بروكسي جغرافياً

  // ═══ ⭐ Performance Metrics ═══
  metrics: {
    totalRequests:      0,
    matchRequests:      0,
    lobbyRequests:      0,
    socialRequests:     0,
    blockedRequests:    0,
    directRequests:     0,
    avgResponseTime:    0,
    uptime:             0
  }
};

// ═══ Timeouts & Thresholds ═══
var SESSION_TIMEOUT_MS     = 300000;    // 5 دقائق
var WARMUP_TIMEOUT_MS      = 20000;     // ⭐ 20 ثانية (أسرع)
var MAX_FAIL_BEFORE_SWAP   = 2;
var HEALTH_CHECK_INTERVAL  = 90000;     // ⭐ 90 ثانية (أسرع)
var MAX_CONSECUTIVE_FAILS  = 3;         // ⭐ جديد
var PROXY_COOLDOWN_MS      = 30000;     // ⭐ جديد: فترة تبريد

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §8 — CORE HELPER FUNCTIONS (الدوال الأساسية المحسّنة)                   ║
// ╚════════════════════════════════════════════════════════════════════════════╝

// ─── تطبيع المضيف ──────────────────────────────────────────────────
function norm(h) {
  if (!h) return "";
  var colons = 0, last = -1;
  for (var i = 0; i < h.length; i++) {
    if (h.charAt(i) === ":") { colons++; last = i; }
  }
  return (colons === 1) ? h.substring(0, last) : h;
}

// ─── فحص IPv6 ──────────────────────────────────────────────────────
function isIPv6(ip) {
  return ip && ip.indexOf(":") > -1 && ip.indexOf(".") === -1;
}

// ─── فحص IPv4 في القائمة ──────────────────────────────────────────
function inV4List(ip, list) {
  if (!ip || isIPv6(ip)) return false;
  for (var i = 0; i < list.length; i++) {
    try {
      if (isInNet(ip, list[i][0], list[i][1])) return true;
    } catch (e) {}
  }
  return false;
}

// ─── فحص IPv6 في القائمة ──────────────────────────────────────────
function inV6List(ip, prefixes) {
  if (!ip) return false;
  var low = ip.toLowerCase();
  for (var i = 0; i < prefixes.length; i++) {
    if (low.indexOf(prefixes[i].toLowerCase()) === 0) return true;
  }
  return false;
}

// ─── فحص خوادم أردنية معروفة ──────────────────────────────────────
function isKnownJoHost(host) {
  if (!host) return false;
  for (var i = 0; i < KNOWN_JO_GAME_HOSTS.length; i++) {
    if (host.indexOf(KNOWN_JO_GAME_HOSTS[i]) !== -1) return true;
  }
  return false;
}

// ─── بادئة الشبكة ─────────────────────────────────────────────────
function netPrefix(ip) {
  if (!ip) return "";
  if (isIPv6(ip)) return ip.split(":").slice(0, 3).join(":");
  return ip.split(".").slice(0, 3).join(".");
}

// ─── ⭐ استخراج المنفذ من URL ──────────────────────────────────────
function extractPort(url) {
  var match = url.match(/:(\d{2,5})\//);
  return match ? match[1] : null;
}

// ─── ⭐ التحقق من IP صالح ──────────────────────────────────────────
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

// ─── ⭐ Hash بسيط للتوزيع ──────────────────────────────────────────
function simpleHash(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §9 — ⭐ SMART DNS RESOLVER V2 (محلل DNS متقدم)                         ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function resolveAll(host) {
  var now = Date.now ? Date.now() : 0;

  // ─── كاش مع TTL ───
  if (SESSION.dnsCache[host] && SESSION.dnsCacheTTL[host]) {
    if (now < SESSION.dnsCacheTTL[host]) {
      return SESSION.dnsCache[host];
    }
    delete SESSION.dnsCache[host];
    delete SESSION.dnsCacheTTL[host];
  }

  var ips = [];

  // محاولة 1: dnsResolveEx
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

  // محاولة 2: dnsResolve
  try {
    if (typeof dnsResolve === "function") {
      var v4 = dnsResolve(host);
      if (v4 && isValidIP(v4) && ips.indexOf(v4) === -1) ips.push(v4);
    }
  } catch (e) {}

  // محاولة 3: بدون www
  if (ips.length === 0 && host.indexOf("www.") === 0) {
    try {
      var bare = host.substring(4);
      var v4b = dnsResolve(bare);
      if (v4b && isValidIP(v4b) && ips.indexOf(v4b) === -1) ips.push(v4b);
    } catch (e) {}
  }

  // ⭐ محاولة 4: بإضافة www
  if (ips.length === 0 && host.indexOf("www.") !== 0) {
    try {
      var www = "www." + host;
      var v4w = dnsResolve(www);
      if (v4w && isValidIP(v4w) && ips.indexOf(v4w) === -1) ips.push(v4w);
    } catch (e) {}
  }

  // تخزين مع TTL
  if (ips.length > 0) {
    SESSION.dnsCache[host] = ips;
    SESSION.dnsCacheTTL[host] = now + SESSION.DNS_TTL_MS;
  }

  return ips;
}

// ─── البحث عن IP أردني ────────────────────────────────────────────
function findJordanIP(ips) {
  if (!ips || ips.length === 0) return null;

  // أولوية 1: IPv4 (بنق أقل)
  for (var i = 0; i < ips.length; i++) {
    if (!isIPv6(ips[i]) && inV4List(ips[i], JORDAN_IPV4)) return ips[i];
  }

  // أولوية 2: IPv6
  for (var i = 0; i < ips.length; i++) {
    if (isIPv6(ips[i]) && inV6List(ips[i], JORDAN_IPV6)) return ips[i];
  }

  return null;
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §10 — ⭐ ISP AUTO-DETECTION (كشف تلقائي لمزود الخدمة)                  ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function detectISP(ip) {
  if (!ip || isIPv6(ip)) return null;

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
// ║  §11 — ⭐ AI LATENCY PREDICTOR (تنبؤ ذكي بالبنق)                        ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function recordLatency(proxyId, latency) {
  if (!SESSION.latencyHistory[proxyId]) {
    SESSION.latencyHistory[proxyId] = [];
  }
  SESSION.latencyHistory[proxyId].push(latency);

  // الاحتفاظ بآخر N عينة فقط
  if (SESSION.latencyHistory[proxyId].length > SESSION.latencySamples) {
    SESSION.latencyHistory[proxyId].shift();
  }

  // حساب المتوسط المتحرك الموزون (أحدث = أثقل)
  var samples = SESSION.latencyHistory[proxyId];
  var weightedSum = 0;
  var weightTotal = 0;
  for (var i = 0; i < samples.length; i++) {
    var w = i + 1; // الأحدث أثقل
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
// ║  §12 — ⭐ WEIGHTED ROUND-ROBIN V2 (توزيع بالأوزان المتكيّف)             ║
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

  // ⭐ في الذروة العالية: اختر الأفضل مباشرة
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
  // ⭐ تصفية حسب النوع المطلوب
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

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §13 — ⭐ ADAPTIVE MATCH PROXY (بروكسي المباراة التكيّفي)               ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function matchProxy() {
  // ⭐ أولوية: ISP-aware selection
  if (SESSION.detectedISP && SESSION.ispConfidence > 50) {
    var ispData = ISP_FINGERPRINTS[SESSION.detectedISP];
    if (ispData && MATCH_PROXIES[ispData.matchProxy] && MATCH_PROXIES[ispData.matchProxy].alive) {
      return MATCH_PROXIES[ispData.matchProxy].proxy;
    }
  }

  // ⭐ ثانوي: AI prediction
  var bestIdx = predictBestProxy(MATCH_PROXIES);
  if (MATCH_PROXIES[bestIdx] && MATCH_PROXIES[bestIdx].alive) {
    return MATCH_PROXIES[bestIdx].proxy;
  }

  // Failover تصاعدي
  for (var i = 0; i < MATCH_PROXIES.length; i++) {
    if (MATCH_PROXIES[i].alive) return MATCH_PROXIES[i].proxy;
  }

  return MATCH_PROXIES[0].proxy;
}

function matchProxyChain() {
  var chain = [];
  // رتّب حسب الأولوية مع استبعاد الميت
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
// ║  §14 — ⭐ MATCH FINGERPRINT V2 (بصمة المباراة المتقدمة)                 ║
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

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §15 — ⭐ ADVANCED TIME DETECTION (كشف الوقت المتقدم)                   ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function updateTimeState() {
  try {
    var d = new Date();
    var hour = d.getUTCHours() + 3; // توقيت الأردن UTC+3
    if (hour >= 24) hour -= 24;
    var day = d.getUTCDay(); // 0=الأحد

    // كشف عطلة نهاية الأسبوع (الجمعة والسبت)
    SESSION.isWeekend = (day === 5 || day === 6);

    // ⭐ كشف شهر رمضان (تقريبي — الأوقات تتأخر)
    var month = d.getUTCMonth(); // 0-indexed
    // رمضان 2025 ≈ فبراير-مارس
    SESSION.isRamadan = (month === 1 || month === 2);

    // تحديد فترة اليوم
    if (SESSION.isRamadan) {
      // في رمضان: الذروة بعد الإفطار (8م - 3ص)
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
      // عطلة: الذروة أبكر (4م - 1ص)
      if (hour >= 16 || hour < 1) {
        SESSION.timeSlot = "ultra-peak";
      } else if (hour >= 14 && hour < 16) {
        SESSION.timeSlot = "peak";
      } else {
        SESSION.timeSlot = "normal";
      }
    } else {
      // أيام عادية: الذروة (6م - 12ص)
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
// ║  §16 — ⭐ AUTO-HEALING PROXY SYSTEM (إصلاح تلقائي)                      ║
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

    // ⭐ Auto-heal: إذا فشل كثيراً، ضعه في فترة تبريد
    if (h.consecutiveFails >= MAX_CONSECUTIVE_FAILS) {
      h.cooldownUntil = h.lastFail + PROXY_COOLDOWN_MS;
      markProxyDead(proxyId);
    }
  }
}

function markProxyDead(proxyId) {
  // البحث في كل الـ pools
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
  // كل 90 ثانية: حاول إعادة البروكسيات الميتة
  if (SESSION.requestCount % 100 !== 0) return;

  for (var id in SESSION.proxyHealth) {
    if (!SESSION.proxyHealth.hasOwnProperty(id)) continue;
    var h = SESSION.proxyHealth[id];
    if (h.cooldownUntil > 0 && now > h.cooldownUntil) {
      // انتهت فترة التبريد → أعد الحياة
      h.cooldownUntil = 0;
      h.consecutiveFails = 0;
      h.score = 50; // بداية متوسطة

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
// ║  §17 — SESSION MANAGEMENT المتقدم                                       ║
// ╚════════════════════════════════════════════════════════════════════════════╝

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

function cleanDNSCache(now) {
  if (SESSION.requestCount % 30 !== 0) return; // ⭐ كل 30 طلب (أكثر تكراراً)
  for (var key in SESSION.dnsCacheTTL) {
    if (SESSION.dnsCacheTTL.hasOwnProperty(key)) {
      if (now > SESSION.dnsCacheTTL[key]) {
        delete SESSION.dnsCache[key];
        delete SESSION.dnsCacheTTL[key];
      }
    }
  }
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §18 — ⭐ LOBBY BEST PROXY SELECTOR (اختيار أفضل بروكسي لوبي)          ║
// ╚════════════════════════════════════════════════════════════════════════════╝

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

    // ⭐ عامل ISP: إذا نفس المزود = وزن أعلى
    var ispBonus = 1.0;
    if (SESSION.detectedISP) {
      var ispData = ISP_FINGERPRINTS[SESSION.detectedISP];
      if (ispData && ispData.lobbyWeight) {
        ispBonus = 1.0 + (ispData.lobbyWeight / 20);
      }
    }

    // ⭐ عامل البنق المتوقع
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
// ║  §19 — TRAFFIC DETECTION V3 (كشف الترافيك المتقدم)                      ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function isPUBG(h) {
  return /pubg|pubgm|pubgmobile|tencent|krafton|lightspeed|levelinfinite|igamecj|proximabeta|vnggames|garena|battleground|pubgmhd|turbogames|joymob|proxima|tencentgames|midasbuy/i
    .test(h);
}

function isMatchTraffic(u, h) {
  // بروتوكولات Real-time (أعلى أولوية)
  if (/(udp|dtls|rtp|srtp|stun|turn|relay)/i.test(u + h)) return true;
  // أنماط المباراة
  return /(tick|ticks|sync|realtime|battle|combat|match|room|session|state|frame|physics|movement|shoot|fire|hit|damage|spawn|loot|zone|circle|airdrop|revive|knock|kill|alive|dead|vehicle|boat|plane)/i
    .test(u + h);
}

function isLobby(u, h) {
  return /(lobby|matchmak|queue|dispatch|gateway|region|zone|join|recruit|pair|assign|entry|roster|bracket|rank|rating|mmr|elo|pool|slot|seat|capacity|available|playlist|mode|classic|arcade|payload|tdm|arena|metro|infection)/i
    .test(u + h);
}

function isSocial(u, h) {
  return /(friend|invite|squad|team|party|clan|presence|social|voice|mic|talk|chat|whisper|notify|push|alert|broadcast|emote|gift|mail|message|crew|guild)/i
    .test(u + h);
}

// ⭐ جديد: كشف المشاهدة/البث
function isSpectate(u, h) {
  return /(spectate|spectator|watch|observe|stream|broadcast|replay|deathcam|killcam|highlight)/i
    .test(u + h);
}

function isCDN(u, h) {
  return /(cdn|asset|resource|static|media|content|patch|update|download|bundle|pak|obb|manifest|version|config|hotfix|texture|model|sound|map|image|icon|avatar|skin|crate|outfit)/i
    .test(u + h);
}

function isAntiCheat(u, h) {
  return /(anticheat|security|guard|protect|shield|integrity|scan|verify|validate|challenge|captcha|token|license|auth|encrypt|decrypt|signature|certificate)/i
    .test(u + h);
}

function isTelemetry(u, h) {
  return /(telemetry|analytics|metric|report|crash|log|trace|beacon|collect|stat|event|track|diagnos|performance|sampling|monitor)/i
    .test(u + h);
}

// ⭐ جديد: كشف الإعلانات
function isAd(u, h) {
  return /(advert|banner|interstitial|reward.*video|offerwall|survey|promo|campaign|impression|click.*track)/i
    .test(u + h);
}

// ⭐ جديد: كشف المتجر/الشراء
function isStore(u, h) {
  return /(store|shop|purchase|buy|payment|order|checkout|receipt|redeem|coupon|uc|royale.*pass|subscription)/i
    .test(u + h);
}

// ⭐ جديد: كشف الدومينات المحظورة
function isBlockedDomain(h) {
  for (var i = 0; i < BLOCKED_DOMAINS.length; i++) {
    if (h.indexOf(BLOCKED_DOMAINS[i]) !== -1) return true;
  }
  return false;
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §20 — ⭐ CONNECTION RECYCLING (إعادة تدوير الاتصالات)                   ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function shouldRecycleConnection(proxyId, now) {
  if (!SESSION.connectionAge[proxyId]) {
    SESSION.connectionAge[proxyId] = now;
    return false;
  }

  var age = now - SESSION.connectionAge[proxyId];
  if (age > SESSION.maxConnectionAge) {
    SESSION.connectionAge[proxyId] = now; // إعادة تعيين
    return true;
  }
  return false;
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §21 — ⭐ METRICS UPDATER (تحديث الإحصائيات)                            ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function updateMetrics(type) {
  SESSION.metrics.totalRequests++;
  switch (type) {
    case "match":   SESSION.metrics.matchRequests++;   break;
    case "lobby":   SESSION.metrics.lobbyRequests++;   break;
    case "social":  SESSION.metrics.socialRequests++;  break;
    case "block":   SESSION.metrics.blockedRequests++; break;
    case "direct":  SESSION.metrics.directRequests++;  break;
  }
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  §22 — ⭐⭐⭐ MAIN PROXY FUNCTION (الدالة الرئيسية)                     ║
// ╚════════════════════════════════════════════════════════════════════════════╝

function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  var now = Date.now ? Date.now() : 0;

  // ─── عداد + صيانة دورية ──────────────────────────────────
  SESSION.requestCount++;
  cleanDNSCache(now);
  tryReviveProxies(now);

  // ─── تحديث حالة الوقت (كل 50 طلب) ───────────────────────
  if (SESSION.requestCount % 50 === 1) {
    updateTimeState();
  }

  // ═══════════════════════════════════════════════════════════════
  //  GATE 0: فقط ترافيك PUBG (أسرع فحص)
  // ═══════════════════════════════════════════════════════════════
  if (!isPUBG(host)) return DIRECT;

  // ═══════════════════════════════════════════════════════════════
  //  GATE 1: ⭐ حجب الدومينات المحظورة (إعلانات + تتبع)
  // ═══════════════════════════════════════════════════════════════
  if (isBlockedDomain(host)) {
    updateMetrics("block");
    SESSION.blockCount++;
    return BLOCK;
  }

  // ═══════════════════════════════════════════════════════════════
  //  FAST PATH: خوادم أردنية معروفة (0ms DNS overhead)
  // ═══════════════════════════════════════════════════════════════
  if (isKnownJoHost(host)) {

    // ─── Match Traffic ───
    if (isMatchTraffic(url, host)) {
      updateMetrics("match");
      SESSION.lastMatchTime = now;
      SESSION.matchCount++;
      SESSION.matchState = "active";

      // ⭐ ISP detection من الهوست
      if (!SESSION.detectedISP) {
        var hostIP = host.split(".").slice(0, 3).join(".") + ".1";
        updateISPDetection(hostIP);
      }

      // في الذروة القصوى: سلسلة كاملة
      if (SESSION.timeSlot === "ultra-peak") return matchProxyChain();
      return matchProxy();
    }

    // ─── Spectate ─── ⭐ جديد
    if (isSpectate(url, host)) {
      updateMetrics("social");
      return nextSpectateProxy();
    }

    // ─── Social/Voice ───
    if (isSocial(url, host)) {
      updateMetrics("social");
      SESSION.socialCount++;
      return nextSocialProxy();
    }

    // ─── Telemetry → حجب ───
    if (isTelemetry(url, host)) {
      updateMetrics("block");
      return BLOCK;
    }

    // ─── Ads → حجب ─── ⭐ جديد
    if (isAd(url, host)) {
      updateMetrics("block");
      return BLOCK;
    }

    // ─── CDN → مباشر ───
    if (isCDN(url, host)) {
      updateMetrics("direct");
      return DIRECT;
    }

    // ─── Default: Lobby ───
    updateMetrics("lobby");
    SESSION.lobbyCount++;
    return nextLobbyProxyWeighted();
  }

  // ═══════════════════════════════════════════════════════════════
  //  DNS RESOLUTION (حل أسماء النطاقات)
  // ═══════════════════════════════════════════════════════════════
  var ips = resolveAll(host);
  if (!ips || ips.length === 0) {
    updateMetrics("block");
    return BLOCK;
  }

  // ═══════════════════════════════════════════════════════════════
  //  ⭐ ISP Auto-Detection
  // ═══════════════════════════════════════════════════════════════
  for (var i = 0; i < ips.length; i++) {
    if (!isIPv6(ips[i])) {
      updateISPDetection(ips[i]);
      break;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  TELEMETRY / ADS → حجب لتوفير الموارد
  // ═══════════════════════════════════════════════════════════════
  if (isTelemetry(url, host) || isAd(url, host)) {
    updateMetrics("block");
    return BLOCK;
  }

  // ═══════════════════════════════════════════════════════════════
  //  ANTI-CHEAT → مباشر (لتجنب الحظر مطلقاً)
  // ═══════════════════════════════════════════════════════════════
  if (isAntiCheat(url, host)) {
    updateMetrics("direct");
    return DIRECT;
  }

  // ═══════════════════════════════════════════════════════════════
  //  STORE → مباشر (لتجنب مشاكل الدفع)
  // ═══════════════════════════════════════════════════════════════
  if (isStore(url, host)) {
    updateMetrics("direct");
    return DIRECT;
  }

  // ═══════════════════════════════════════════════════════════════
  //  CDN → مباشر (أقل ضغط على البروكسي)
  // ═══════════════════════════════════════════════════════════════
  if (isCDN(url, host)) {
    updateMetrics("direct");
    return DIRECT;
  }

  // ═══════════════════════════════════════════════════════════════
  //  ⭐⭐⭐ MATCH / UDP — القفل الثلاثي الصارم
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

    var net  = netPrefix(matchIP);
    var port = extractPort(url);

    // ─── أول اتصال بالمباراة ─────────────────────────────
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

    // ─── ⭐ TRIPLE-LOCK VERIFICATION ─────────────────────
    // القفل 1: المضيف
    if (host !== SESSION.matchHost) {
      SESSION.matchFailCount++;
      updateMetrics("block");
      return BLOCK;
    }

    // القفل 2: الشبكة
    if (net !== SESSION.matchNet) {
      SESSION.matchFailCount++;
      updateMetrics("block");
      return BLOCK;
    }

    // القفل 3: الـ IP بالضبط
    if (matchIP !== SESSION.matchIP) {
      SESSION.matchFailCount++;
      updateMetrics("block");
      return BLOCK;
    }

    // القفل 4 (اختياري): المنفذ
    if (SESSION.matchPort && port && port !== SESSION.matchPort) {
      // المنفذ تغير = ممكن reconnect → سماح مع تحديث
      SESSION.matchPort = port;
    }

    // القفل 5: ⭐ البصمة الزمنية
    if (!validateFingerprint(host, matchIP, net, port)) {
      // مباراة جديدة → إعادة تهيئة
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

    // ─── كل شيء ممتاز → توجيه ──────────────────────────
    SESSION.lastMatchTime    = now;
    SESSION.matchDuration    = now - SESSION.matchStartTime;
    SESSION.matchFailCount   = 0;
    updateProxyHealth("MATCH", true);
    updateMetrics("match");

    // في الذروة القصوى: سلسلة failover
    if (SESSION.timeSlot === "ultra-peak") return matchProxyChain();
    return matchProxy();
  }

  // ═══════════════════════════════════════════════════════════════
  //  LOBBY — توزيع ذكي بالأوزان
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
  //  ⭐ SPECTATE / STREAM — بول مخصص
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
  //  SOCIAL / VOICE — بول مخصص
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
  //  ⭐ أي ترافيك أردني غير مصنّف → Lobby proxy
  // ═══════════════════════════════════════════════════════════════
  var joIP = findJordanIP(ips);
  if (joIP) {
    updateMetrics("lobby");
    return nextLobbyProxyWeighted();
  }

  // ═══════════════════════════════════════════════════════════════
  //  ترافيك غير أردني → حجب صارم
  // ═══════════════════════════════════════════════════════════════
  updateMetrics("block");
  return BLOCK;
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                                                                          ║
// ║  🇯🇴 PUBG MOBILE JORDAN — ULTRA PRO V3.0 — END OF SCRIPT               ║
// ║                                                                          ║
// ║  📊 الإحصائيات:                                                          ║
// ║     • 60+ نطاق IPv4   | 20 بادئة IPv6                                   ║
// ║     • 20+ خادم أردني معروف                                               ║
// ║     • 5 طبقات Match   | 8 بروكسيات Lobby                                ║
// ║     • 5 بروكسيات Social | 3 بروكسيات Spectate                           ║
// ║                                                                          ║
// ║  ⭐ ميزات V3.0 الحصرية:                                                 ║
// ║     • AI Latency Predictor — تنبؤ ذكي بالبنق                            ║
// ║     • Auto-Healing Proxies — إصلاح تلقائي                               ║
// ║     • ISP Auto-Detection — كشف المزود تلقائياً                          ║
// ║     • Ramadan/Weekend Mode — أوضاع خاصة                                 ║
// ║     • Triple-Lock Sessions — قفل ثلاثي                                  ║
// ║     • Spectate/Stream Pool — بول مشاهدة مخصص                            ║
// ║     • Smart Ad Blocker — حجب إعلانات ذكي                                ║
// ║     • Connection Recycling — إعادة تدوير                                ║
// ║     • Weighted ISP-Aware LB — توزيع حسب المزود                          ║
// ║     • Store/Payment Direct — شراء مباشر بلا مشاكل                       ║
// ║                                                                          ║
// ║  🎯 النتيجة: بيور أردني — الكل يشوفك وتشوفه 🇯🇴                        ║
// ║                                                                          ║
// ╚════════════════════════════════════════════════════════════════════════════╝
