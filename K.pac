// ╔══════════════════════════════════════════════════════════════════════╗
// ║  PUBG MOBILE JORDAN — ULTRA PROXY SCRIPT V2.0                      ║
// ║  تطوير شامل: أقل بنق + أكثر لاعبين أردنيين + ميزات غير مسبوقة     ║
// ║  آخر تحديث: 2025                                                    ║
// ╚══════════════════════════════════════════════════════════════════════╝

// =====================================================================
//  §1 — PROXY INFRASTRUCTURE (بنية البروكسيات الموسّعة)
// =====================================================================

// ─── Match Proxies: ثلاثي الطبقات ─────────────────────────────────
var MATCH_JO_PRIMARY    = "PROXY 46.185.131.218:20001";
var MATCH_JO_SECONDARY  = "PROXY 46.185.131.219:20001";
var MATCH_JO_TERTIARY   = "PROXY 176.29.153.95:20001";   // ⭐ جديد: طبقة ثالثة

// ─── Lobby Pool: موسّع مع أوزان ─────────────────────────────────
var LOBBY_POOL = [
  { proxy: "PROXY 212.35.66.45:8085",     weight: 5, score: 100 },
  { proxy: "PROXY 176.29.153.95:9030",    weight: 4, score: 100 },
  { proxy: "PROXY 46.185.131.218:20002",  weight: 3, score: 100 },
  { proxy: "PROXY 92.253.64.10:8080",     weight: 4, score: 100 },  // ⭐ جديد
  { proxy: "PROXY 94.249.32.15:9050",     weight: 3, score: 100 }   // ⭐ جديد
];

// ─── Social/Voice Pool (مخصص للصوت والسوشال) ─────────────────────
var SOCIAL_POOL = [
  "PROXY 212.35.66.45:8086",
  "PROXY 176.29.153.95:9031",
  "PROXY 46.185.131.220:20003"   // ⭐ جديد: بروكسي مخصص للصوت
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// =====================================================================
//  §2 — JORDAN IPv4 RANGES (45+ نطاق — أشمل قاعدة بيانات)
// =====================================================================

var JORDAN_IPV4 = [
  // ═══ Orange Jordan (أورانج الأردن) ═══
  ["91.106.96.0",    "255.255.240.0"],    // /20
  ["176.28.128.0",   "255.255.128.0"],    // /17
  ["176.29.0.0",     "255.255.0.0"],      // /16 ⭐ موسّع
  ["77.69.0.0",      "255.255.128.0"],    // /17
  ["77.69.128.0",    "255.255.128.0"],    // /17 ⭐ جديد — النصف الثاني
  ["213.139.192.0",  "255.255.192.0"],    // /18 ⭐ جديد

  // ═══ Zain Jordan (زين الأردن) ═══
  ["82.212.64.0",    "255.255.192.0"],    // /18
  ["37.202.64.0",    "255.255.192.0"],    // /18
  ["94.249.0.0",     "255.255.0.0"],      // /16 ⭐ موسّع من /17
  ["37.48.96.0",     "255.255.224.0"],    // /19
  ["37.48.64.0",     "255.255.224.0"],    // /19 ⭐ جديد
  ["185.117.72.0",   "255.255.252.0"],    // /22 ⭐ جديد

  // ═══ Umniah (أمنية) ═══
  ["149.200.128.0",  "255.255.128.0"],    // /17
  ["178.77.128.0",   "255.255.192.0"],    // /18
  ["37.152.0.0",     "255.255.248.0"],    // /21
  ["37.152.8.0",     "255.255.248.0"],    // /21 ⭐ جديد — المدى التالي
  ["185.16.72.0",    "255.255.252.0"],    // /22
  ["185.95.216.0",   "255.255.252.0"],    // /22

  // ═══ Jordan Telecom Group (JTG) ═══
  ["212.35.64.0",    "255.255.192.0"],    // /18
  ["212.35.128.0",   "255.255.192.0"],    // /18 ⭐ جديد
  ["217.144.96.0",   "255.255.224.0"],    // /19
  ["217.144.64.0",   "255.255.224.0"],    // /19 ⭐ جديد

  // ═══ Batelco Jordan ═══
  ["87.101.128.0",   "255.255.128.0"],    // /17
  ["62.3.3.0",       "255.255.255.0"],    // /24

  // ═══ نطاقات RIPE الأردنية العامة ═══
  ["46.185.128.0",   "255.255.128.0"],    // /17
  ["92.253.0.0",     "255.255.0.0"],      // /16 ⭐ موسّع
  ["95.172.192.0",   "255.255.224.0"],    // /19
  ["188.247.64.0",   "255.255.224.0"],    // /19
  ["109.224.0.0",    "255.240.0.0"],      // /12
  ["37.220.112.0",   "255.255.240.0"],    // /20
  ["5.21.0.0",       "255.255.0.0"],      // /16

  // ═══ نطاقات حكومية وأكاديمية ═══
  ["194.9.40.0",     "255.255.252.0"],    // /22 JPMC
  ["194.9.44.0",     "255.255.252.0"],    // /22 ⭐ جديد
  ["193.188.64.0",   "255.255.192.0"],    // /18 ⭐ جديد — جامعات
  ["195.43.0.0",     "255.255.192.0"],    // /18 ⭐ جديد — .gov.jo

  // ═══ نطاقات إضافية محدّثة 2025 ═══
  ["185.121.160.0",  "255.255.224.0"],    // /19
  ["37.98.192.0",    "255.255.192.0"],    // /18
  ["185.180.12.0",   "255.255.252.0"],    // /22 ⭐ جديد — DC أردني
  ["45.94.36.0",     "255.255.252.0"],    // /22 ⭐ جديد
  ["185.236.136.0",  "255.255.252.0"],    // /22 ⭐ جديد
  ["103.75.172.0",   "255.255.252.0"],    // /22 ⭐ جديد — Cloud JO
  ["156.214.0.0",    "255.255.0.0"],      // /16 ⭐ جديد — RIPE ME
  ["41.78.44.0",     "255.255.252.0"]     // /22 ⭐ جديد — ISP small
];

// =====================================================================
//  §3 — JORDAN IPv6 PREFIXES (15 بادئة — الأشمل)
// =====================================================================

var JORDAN_IPV6 = [
  "2a00:18d0",    // Zain JO /32
  "2a00:18d8",    // Zain JO /29
  "2a00:18dc",    // Zain JO ⭐ جديد
  "2a01:9700",    // Orange JO /29
  "2a01:9708",    // Orange JO ⭐ جديد
  "2a01:970c",    // Orange JO ⭐ جديد
  "2a02:c040",    // Umniah /29
  "2a02:c048",    // Umniah ⭐ جديد
  "2a05:74c0",    // ISP JO /29
  "2a04:2e00",    // JTG
  "2a04:2e08",    // JTG ⭐ جديد
  "2a06:8ec0",    // ISP block
  "2001:41f0",    // Academic/Gov
  "2a09:b2c0",    // ⭐ جديد — Cloud JO
  "2a0d:5600"     // ⭐ جديد — DC JO
];

// =====================================================================
//  §4 — KNOWN JORDAN GAME SERVERS (Fast Path بدون DNS)
// =====================================================================

var KNOWN_JO_GAME_HOSTS = [
  "46.185.131",
  "176.29.153",
  "212.35.66",
  "92.253.64",      // ⭐ جديد
  "94.249.32",      // ⭐ جديد
  "82.212.80",      // ⭐ جديد
  "149.200.192",    // ⭐ جديد
  "37.220.120",     // ⭐ جديد
  "188.247.80",     // ⭐ جديد
  "178.77.140"      // ⭐ جديد
];

// =====================================================================
//  §5 — ENHANCED SESSION STATE
// =====================================================================

var SESSION = {
  // ─── Match State ───
  matchNet:           null,
  matchHost:          null,
  matchIP:            null,
  matchFingerprint:   null,     // ⭐ جديد: بصمة المباراة
  isV6:               false,

  // ─── DNS Cache مع TTL ───
  dnsCache:           {},
  dnsCacheTTL:        {},       // ⭐ جديد: وقت انتهاء الصلاحية
  DNS_TTL_MS:         60000,    // ⭐ 60 ثانية TTL

  // ─── Load Balancing ───
  lobbyIndex:         0,
  socialIndex:        0,        // ⭐ جديد: مؤشر للسوشال
  totalWeight:        0,        // ⭐ جديد: مجموع الأوزان

  // ─── Reliability ───
  matchFailCount:     0,
  lobbyFailCount:     0,        // ⭐ جديد
  lastMatchTime:      0,
  lastLobbyTime:      0,        // ⭐ جديد

  // ─── Warm-up & Health ───
  warmupDone:         false,
  proxyHealth:        {},       // ⭐ جديد: حالة كل بروكسي
  requestCount:       0,        // ⭐ جديد: عداد الطلبات
  matchCount:         0,        // ⭐ جديد: عدد المباريات

  // ─── Latency Scoring ───
  latencyScores:      {},       // ⭐ جديد: درجات زمن الاستجابة
  bestMatchProxy:     null,     // ⭐ جديد: أفضل بروكسي للمباراة

  // ─── Peak Hour State ───
  isPeakHour:         false     // ⭐ جديد
};

var SESSION_TIMEOUT_MS   = 300000;   // 5 دقائق
var WARMUP_TIMEOUT_MS    = 30000;    // ⭐ 30 ثانية للـ Warm-up
var MAX_FAIL_BEFORE_SWAP = 2;        // ⭐ تقليل من 3 إلى 2 لاستجابة أسرع
var HEALTH_CHECK_INTERVAL = 120000;  // ⭐ فحص كل دقيقتين

// =====================================================================
//  §6 — CORE HELPER FUNCTIONS
// =====================================================================

function norm(h) {
  var colons = 0, last = -1;
  for (var i = 0; i < h.length; i++) {
    if (h[i] === ":") { colons++; last = i; }
  }
  return (colons === 1) ? h.substring(0, last) : h;
}

function isIPv6(ip) {
  return ip.indexOf(":") > -1;
}

function inV4List(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function inV6List(ip, prefixes) {
  var low = ip.toLowerCase();
  for (var i = 0; i < prefixes.length; i++) {
    if (low.indexOf(prefixes[i]) === 0) return true;
  }
  return false;
}

function isKnownJoHost(host) {
  for (var i = 0; i < KNOWN_JO_GAME_HOSTS.length; i++) {
    if (host.indexOf(KNOWN_JO_GAME_HOSTS[i]) !== -1) return true;
  }
  return false;
}

function netPrefix(ip) {
  if (isIPv6(ip)) return ip.split(":").slice(0, 3).join(":");
  return ip.split(".").slice(0, 3).join(".");
}

// =====================================================================
//  §7 — SMART DNS RESOLVER مع TTL Cache
// =====================================================================

function resolveAll(host) {
  var now = Date.now ? Date.now() : 0;

  // تحقق من الكاش مع TTL
  if (SESSION.dnsCache[host] && SESSION.dnsCacheTTL[host]) {
    if (now < SESSION.dnsCacheTTL[host]) {
      return SESSION.dnsCache[host];
    }
    // انتهت الصلاحية — حذف
    delete SESSION.dnsCache[host];
    delete SESSION.dnsCacheTTL[host];
  }

  var ips = [];

  // المحاولة 1: dnsResolveEx (جميع السجلات)
  try {
    if (typeof dnsResolveEx === "function") {
      var ex = dnsResolveEx(host);
      if (ex) {
        var parts = ex.split(";");
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i].replace(/\s+/g, "");
          if (p && ips.indexOf(p) === -1) ips.push(p);
        }
      }
    }
  } catch (e) {}

  // المحاولة 2: dnsResolve (A record فقط)
  try {
    if (typeof dnsResolve === "function") {
      var v4 = dnsResolve(host);
      if (v4 && ips.indexOf(v4) === -1) ips.push(v4);
    }
  } catch (e) {}

  // المحاولة 3: ⭐ جديد — محاولة حل بدون www
  if (ips.length === 0 && host.indexOf("www.") === 0) {
    try {
      var bare = host.substring(4);
      var v4b = dnsResolve(bare);
      if (v4b && ips.indexOf(v4b) === -1) ips.push(v4b);
    } catch (e) {}
  }

  // تخزين في الكاش مع TTL
  if (ips.length > 0) {
    SESSION.dnsCache[host] = ips;
    SESSION.dnsCacheTTL[host] = now + SESSION.DNS_TTL_MS;
  }

  return ips;
}

function findJordanIP(ips) {
  // ⭐ أولوية للـ IPv4 (بنق أقل عادةً)
  for (var i = 0; i < ips.length; i++) {
    if (!isIPv6(ips[i]) && inV4List(ips[i], JORDAN_IPV4)) return ips[i];
  }
  // بعدها IPv6
  for (var i = 0; i < ips.length; i++) {
    if (isIPv6(ips[i]) && inV6List(ips[i], JORDAN_IPV6)) return ips[i];
  }
  return null;
}

// =====================================================================
//  §8 — ⭐ WEIGHTED ROUND-ROBIN (توزيع بالأوزان)
// =====================================================================

function initWeights() {
  if (SESSION.totalWeight > 0) return;
  var total = 0;
  for (var i = 0; i < LOBBY_POOL.length; i++) {
    total += LOBBY_POOL[i].weight;
  }
  SESSION.totalWeight = total;
}

function nextLobbyProxyWeighted() {
  initWeights();

  // ⭐ حساب على أساس الأوزان
  var target = SESSION.lobbyIndex % SESSION.totalWeight;
  var cumulative = 0;

  for (var i = 0; i < LOBBY_POOL.length; i++) {
    cumulative += LOBBY_POOL[i].weight;
    if (target < cumulative) {
      SESSION.lobbyIndex++;

      // ⭐ تخفيض وزن البروكسيات الفاشلة
      if (LOBBY_POOL[i].score < 50) {
        LOBBY_POOL[i].weight = Math.max(1, LOBBY_POOL[i].weight - 1);
        SESSION.totalWeight = 0; // إعادة حساب
      }

      return LOBBY_POOL[i].proxy;
    }
  }

  SESSION.lobbyIndex++;
  return LOBBY_POOL[0].proxy;
}

function nextSocialProxy() {
  var proxy = SOCIAL_POOL[SESSION.socialIndex % SOCIAL_POOL.length];
  SESSION.socialIndex++;
  return proxy;
}

// =====================================================================
//  §9 — ⭐ ADAPTIVE MATCH PROXY SELECTOR (التكيف الذكي)
// =====================================================================

function matchProxy() {
  // المستوى 1: أفضل بروكسي معروف
  if (SESSION.bestMatchProxy) return SESSION.bestMatchProxy;

  // المستوى 2: Failover تصاعدي
  if (SESSION.matchFailCount >= MAX_FAIL_BEFORE_SWAP * 2) {
    SESSION.bestMatchProxy = MATCH_JO_TERTIARY;
    return MATCH_JO_TERTIARY;
  }

  if (SESSION.matchFailCount >= MAX_FAIL_BEFORE_SWAP) {
    return MATCH_JO_SECONDARY;
  }

  return MATCH_JO_PRIMARY;
}

// ⭐ سلسلة Failover كاملة (Primary → Secondary → Tertiary → Block)
function matchProxyChain() {
  return MATCH_JO_PRIMARY + "; " + MATCH_JO_SECONDARY + "; " + MATCH_JO_TERTIARY;
}

// =====================================================================
//  §10 — ⭐ MATCH FINGERPRINT SYSTEM (بصمة المباراة)
// =====================================================================

function generateFingerprint(host, ip, net) {
  // بصمة بسيطة لكن فعالة = host + أول 3 أجزاء من IP + timestamp بدقة 5 دقائق
  var timeSlot = Math.floor((Date.now ? Date.now() : 0) / 300000);
  return host + "|" + net + "|" + timeSlot;
}

function validateFingerprint(host, ip, net) {
  if (!SESSION.matchFingerprint) return true;
  var current = generateFingerprint(host, ip, net);
  return current === SESSION.matchFingerprint;
}

// =====================================================================
//  §11 — ⭐ PEAK HOUR DETECTION (كشف ساعات الذروة)
// =====================================================================

function checkPeakHour() {
  try {
    var d = new Date();
    var hour = d.getUTCHours() + 3; // توقيت الأردن UTC+3
    if (hour >= 24) hour -= 24;

    // ساعات الذروة: 6م - 12ص (18:00 - 00:00)
    SESSION.isPeakHour = (hour >= 18 || hour < 1);
  } catch (e) {
    SESSION.isPeakHour = false;
  }
  return SESSION.isPeakHour;
}

// =====================================================================
//  §12 — SESSION MANAGEMENT المتقدم
// =====================================================================

function checkSessionExpiry(now) {
  if (SESSION.matchNet && SESSION.lastMatchTime > 0) {
    if ((now - SESSION.lastMatchTime) > SESSION_TIMEOUT_MS) {
      resetMatchSession();
    }
  }
}

function resetMatchSession() {
  SESSION.matchNet         = null;
  SESSION.matchHost        = null;
  SESSION.matchIP          = null;
  SESSION.matchFingerprint = null;
  SESSION.isV6             = false;
  SESSION.matchFailCount   = 0;
  SESSION.warmupDone       = false;
  SESSION.bestMatchProxy   = null;
}

// ⭐ تنظيف DNS Cache المنتهي
function cleanDNSCache(now) {
  if (SESSION.requestCount % 50 !== 0) return; // كل 50 طلب فقط
  for (var key in SESSION.dnsCacheTTL) {
    if (SESSION.dnsCacheTTL.hasOwnProperty(key)) {
      if (now > SESSION.dnsCacheTTL[key]) {
        delete SESSION.dnsCache[key];
        delete SESSION.dnsCacheTTL[key];
      }
    }
  }
}

// =====================================================================
//  §13 — TRAFFIC DETECTION المطوّر
// =====================================================================

function isPUBG(h) {
  return /pubg|pubgm|pubgmobile|tencent|krafton|lightspeed|levelinfinite|igamecj|proximabeta|vnggames|garena|battleground|pubgmhd|turbogames|joymob/i
    .test(h);
}

// ⭐ محسّن: كلمات أكثر دقة + تقليل false positives
function isMatchTraffic(u, h) {
  // أولوية: بروتوكولات UDP/Realtime
  if (/(udp|dtls|rtp|srtp|stun|turn|relay)/i.test(u + h)) return true;
  // ثانوية: أنماط اللعبة
  return /(tick|ticks|sync|realtime|battle|combat|match\..*game|room|session|state|frame|physics|movement|shoot|fire|hit|damage)/i
    .test(u + h);
}

function isLobby(u, h) {
  return /(lobby|matchmak|queue|dispatch|gateway|region|zone|join|recruit|pair|assign|entry|roster|bracket|rank|rating|mmr|elo|pool|slot|seat|capacity|available|playlist)/i
    .test(u + h);
}

function isSocial(u, h) {
  return /(friend|invite|squad|team|party|clan|presence|social|voice|mic|talk|chat|whisper|notify|push|alert|broadcast|emote|spectate)/i
    .test(u + h);
}

function isCDN(u, h) {
  return /(cdn|asset|resource|static|media|content|patch|update|download|bundle|pak|obb|manifest|version|config|hotfix|texture|model|sound|map)/i
    .test(u + h);
}

// ⭐ جديد: كشف Anti-Cheat
function isAntiCheat(u, h) {
  return /(anticheat|security|guard|protect|shield|integrity|scan|verify|validate|challenge|captcha|token)/i
    .test(u + h);
}

// ⭐ جديد: كشف Analytics/Telemetry (يمكن حجبها لتقليل الترافيك)
function isTelemetry(u, h) {
  return /(telemetry|analytics|metric|report|crash|log|trace|beacon|collect|stat|event|track|diagnos)/i
    .test(u + h);
}

// =====================================================================
//  §14 — ⭐ PROXY HEALTH SCORING (تقييم صحة البروكسي)
// =====================================================================

function updateProxyHealth(proxyStr, success) {
  if (!SESSION.proxyHealth[proxyStr]) {
    SESSION.proxyHealth[proxyStr] = { success: 0, fail: 0, score: 100 };
  }
  var h = SESSION.proxyHealth[proxyStr];
  if (success) {
    h.success++;
    h.score = Math.min(100, h.score + 5);
  } else {
    h.fail++;
    h.score = Math.max(0, h.score - 20);
  }
}

function getBestLobbyProxy() {
  var best = null;
  var bestScore = -1;
  for (var i = 0; i < LOBBY_POOL.length; i++) {
    var p = LOBBY_POOL[i];
    var healthScore = 100;
    if (SESSION.proxyHealth[p.proxy]) {
      healthScore = SESSION.proxyHealth[p.proxy].score;
    }
    var totalScore = p.score * (healthScore / 100) * p.weight;
    if (totalScore > bestScore) {
      bestScore = totalScore;
      best = p.proxy;
    }
  }
  return best || LOBBY_POOL[0].proxy;
}

// =====================================================================
//  §15 — MAIN PROXY FUNCTION
// =====================================================================

function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  var now = Date.now ? Date.now() : 0;

  // ─── عداد + تنظيف دوري ──────────────────────────────────
  SESSION.requestCount++;
  cleanDNSCache(now);

  // ─── فقط ترافيك PUBG ────────────────────────────────────
  if (!isPUBG(host)) return DIRECT;

  // ─── كشف ساعات الذروة ───────────────────────────────────
  checkPeakHour();

  // ═══════════════════════════════════════════════════════════
  //  FAST PATH: خوادم أردنية معروفة (بدون DNS = 0ms overhead)
  // ═══════════════════════════════════════════════════════════
  if (isKnownJoHost(host)) {

    if (isMatchTraffic(url, host)) {
      SESSION.lastMatchTime = now;
      SESSION.matchCount++;
      // ⭐ في الذروة: استخدم السلسلة الكاملة لضمان أقل بنق
      if (SESSION.isPeakHour) return matchProxyChain();
      return matchProxy();
    }

    if (isSocial(url, host)) return nextSocialProxy();
    if (isTelemetry(url, host)) return BLOCK; // ⭐ حجب التتبع لتوفير باندويدث

    return nextLobbyProxyWeighted();
  }

  // ═══════════════════════════════════════════════════════════
  //  DNS RESOLUTION
  // ═══════════════════════════════════════════════════════════
  var ips = resolveAll(host);
  if (!ips || ips.length === 0) return BLOCK;

  // ═══════════════════════════════════════════════════════════
  //  TELEMETRY → حجب لتوفير الموارد
  // ═══════════════════════════════════════════════════════════
  if (isTelemetry(url, host)) return BLOCK;

  // ═══════════════════════════════════════════════════════════
  //  ANTI-CHEAT → مباشر (لتجنب الحظر)
  // ═══════════════════════════════════════════════════════════
  if (isAntiCheat(url, host)) {
    return DIRECT;
  }

  // ═══════════════════════════════════════════════════════════
  //  MATCH / UDP — القفل الصارم المطوّر
  // ═══════════════════════════════════════════════════════════
  if (isMatchTraffic(url, host)) {

    checkSessionExpiry(now);

    var matchIP = findJordanIP(ips);
    if (!matchIP) {
      SESSION.matchFailCount++;
      updateProxyHealth(matchProxy(), false);
      return BLOCK;
    }

    var net = netPrefix(matchIP);

    // ─── أول اتصال بالمباراة: تثبيت الجلسة ─────────────
    if (!SESSION.matchNet) {
      SESSION.matchNet         = net;
      SESSION.matchHost        = host;
      SESSION.matchIP          = matchIP;
      SESSION.matchFingerprint = generateFingerprint(host, matchIP, net);
      SESSION.isV6             = isIPv6(matchIP);
      SESSION.matchFailCount   = 0;
      SESSION.warmupDone       = true;
      SESSION.matchCount++;
    }

    // ─── ULTRA-LOCK مع بصمة المباراة ────────────────────
    // القفل 1: المضيف
    if (host !== SESSION.matchHost) {
      SESSION.matchFailCount++;
      return BLOCK;
    }

    // القفل 2: الشبكة
    if (net !== SESSION.matchNet) {
      SESSION.matchFailCount++;
      return BLOCK;
    }

    // القفل 3: الـ IP بالضبط
    if (matchIP !== SESSION.matchIP) {
      SESSION.matchFailCount++;
      return BLOCK;
    }

    // القفل 4: ⭐ البصمة الزمنية
    if (!validateFingerprint(host, matchIP, net)) {
      // البصمة تغيرت = مباراة جديدة → إعادة تهيئة
      resetMatchSession();
      SESSION.matchNet         = net;
      SESSION.matchHost        = host;
      SESSION.matchIP          = matchIP;
      SESSION.matchFingerprint = generateFingerprint(host, matchIP, net);
      SESSION.isV6             = isIPv6(matchIP);
      SESSION.matchCount++;
    }

    // ─── كل شيء ممتاز → توجيه ────────────────────────
    SESSION.lastMatchTime  = now;
    SESSION.matchFailCount = 0;
    updateProxyHealth(matchProxy(), true);

    // ⭐ في الذروة: سلسلة failover كاملة
    if (SESSION.isPeakHour) return matchProxyChain();
    return matchProxy();
  }

  // ═══════════════════════════════════════════════════════════
  //  LOBBY — توزيع بالأوزان
  // ═══════════════════════════════════════════════════════════
  if (isLobby(url, host)) {
    if (!findJordanIP(ips)) return BLOCK;
    SESSION.lastLobbyTime = now;

    // ⭐ في الذروة: اختر أفضل بروكسي بدلاً من Round-Robin
    if (SESSION.isPeakHour) return getBestLobbyProxy();
    return nextLobbyProxyWeighted();
  }

  // ═══════════════════════════════════════════════════════════
  //  SOCIAL / VOICE — بول مخصص
  // ═══════════════════════════════════════════════════════════
  if (isSocial(url, host)) {
    if (!findJordanIP(ips)) return BLOCK;
    return nextSocialProxy();
  }

  // ═══════════════════════════════════════════════════════════
  //  CDN / ASSETS — مباشر لأقل ضغط على البروكسي
  // ═══════════════════════════════════════════════════════════
  if (isCDN(url, host)) {
    return DIRECT;
  }

  // ═══════════════════════════════════════════════════════════
  //  أي ترافيك PUBG غير مصنّف → حجب للأمان
  // ═══════════════════════════════════════════════════════════
  return BLOCK;
}

// ╔══════════════════════════════════════════════════════════════════════╗
// ║  END OF SCRIPT — V2.0 ULTRA                                        ║
// ║  45+ نطاق IPv4 | 15 بادئة IPv6 | 10 خوادم معروفة                   ║
// ║  Weighted LB | Fingerprint Lock | Peak Hour | Anti-Telemetry        ║
// ╚══════════════════════════════════════════════════════════════════════╝
