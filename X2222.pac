// ════════════════════════════════════════════════════════════════
//  PROXY PAC — Jordan-Anchored Routing
//  الجوهر: نطاقات الأردن (IPv4 + IPv6) هي محور كل قرار توجيه
// ════════════════════════════════════════════════════════════════

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ════════════════════════════════════════════════════════════════
//  ❶  CORE DATABASE — نطاقات الأردن (IPv4)
//  كل سطر = [network, prefixLength]
//  المصدر: RIPE NCC + ARIN + تحقق يدوي
// ════════════════════════════════════════════════════════════════

var JO_IPV4 = [
  // ── Zain JO ──
  ["37.44.0.0",17],   ["37.44.64.0",18],  ["37.110.0.0",17],
  ["46.185.128.0",17],["78.40.0.0",17],   ["79.173.0.0",17],
  ["88.85.224.0",19], ["94.249.0.0",17],  ["109.107.128.0",17],
  ["188.247.0.0",18], ["195.229.0.0",17],

  // ── Orange JO ──
  ["46.32.0.0",16],   ["62.72.160.0",19], ["82.212.64.0",18],
  ["86.108.0.0",16],  ["89.148.0.0",16],  ["176.29.0.0",16],
  ["188.71.0.0",16],  ["194.165.128.0",18],["194.165.192.0",18],
  ["212.37.32.0",19], ["213.139.192.0",18],["213.186.160.0",19],

  // ── Umniah ──
  ["77.245.0.0",17],  ["80.90.160.0",19], ["85.115.32.0",19],
  ["91.186.0.0",17],  ["92.253.64.0",18], ["176.11.0.0",16],
  ["178.20.160.0",19],["193.188.64.0",19],["212.118.0.0",17],
  ["213.186.160.0",19],

  // ── Batelco / VTEL ──
  ["5.1.0.0",17],     ["5.45.128.0",17],  ["79.134.0.0",17],
  ["80.77.128.0",18], ["81.28.16.0",20],  ["82.213.0.0",17],
  ["85.233.128.0",17],["91.239.104.0",21],["95.160.0.0",16],
  ["178.63.64.0",18],

  // ── Hosting / Data Centers ──
  ["37.152.0.0",16],  ["185.37.128.0",22],["185.56.136.0",22],
  ["185.117.68.0",22],["185.136.204.0",22],["185.244.24.0",22],
  ["188.53.0.0",17],  ["193.106.96.0",19],["193.107.136.0",21],
  ["194.29.136.0",21],["195.222.64.0",18]
];

// ════════════════════════════════════════════════════════════════
//  ❷  CORE DATABASE — نطاقات الأردن (IPv6)
//  /29 → تطابق أول 29 بت  |  /32 → تطابق أول 32 بت (مجموعتان)
// ════════════════════════════════════════════════════════════════

var JO_IPV6_29 = [
  // ── Zain JO ──
  "2a01:01d0","2a01:9700","2a01:e240","2a01:ee40",
  // ── Orange JO ──
  "2a02:09c0","2a02:e680","2a02:f0c0",
  // ── Umniah ──
  "2a03:6b00","2a04:4cc0","2a05:74c0","2a05:7500",
  // ── VTEL / Batelco ──
  "2a06:9bc0","2a06:bd80","2a07:0140","2a0a:2740",
  // ── Data Centers / Hosting ──
  "2a02:2558","2a0c:39c0","2a0d:cf40",
  "2a10:1100","2a10:9740","2a10:d800","2a11:d180",
  "2a13:1f00","2a13:5c00","2a13:8d40",
  "2a14:1a40","2a14:2840","2001:32c0"
];

var JO_IPV6_32 = [
  // ── Zain JO ──
  "2a00:4620","2a00:76e0","2a00:caa0",
  // ── Orange JO ──
  "2a00:b860","2a03:6d00","2a03:b640",
  // ── VTEL / Hosting ──
  "2a0e:1c80","2a0e:b700","2a0f:1a00","2a0f:9c40",
  "2a10:4e00","2a12:52c0","2a12:d000",
  "2a13:b200","2a14:50c0"
];

// ════════════════════════════════════════════════════════════════
//  ❸  BLOCK DATABASE — عناوين يجب حجبها دائماً
// ════════════════════════════════════════════════════════════════

var BLOCKED_V4 = [
  ["10.0.0.0",8],["127.0.0.0",8],["172.16.0.0",12],
  ["192.168.0.0",16],["169.254.0.0",16],["100.64.0.0",10],
  ["0.0.0.0",8],
  // عناوين مشغلين خارج الأردن تتداخل مع نطاقاته
  ["2.144.0.0",14],["2.176.0.0",12],
  ["5.52.0.0",15],["5.56.0.0",13],["5.160.0.0",14],["5.200.0.0",16],
  ["14.139.0.0",16],["14.140.0.0",14],["27.54.0.0",15],
  ["39.32.0.0",11],["43.224.0.0",13],
  ["58.27.128.0",17],["58.65.128.0",17],["103.0.0.0",13]
];

var BLOCKED_V6_29 = [
  "2a01:4640","2a05:b4c0","2a01:be00","2a01:4340"
];

var BLOCKED_V6_32 = [
  "2a00:1450","2600:1900","2600:1901","2607:f8b0",
  "2a00:bdc0","2a00:13c0","2a00:1fa0","2a00:1a60","2a00:1b20",
  "2a01:5ec0","2a01:d340","2a02:6b8","2a02:2e00","2a03:3b40",
  "2a09:1400","2a09:bac0",
  "2401:4900","2403:5800","2405:200","2405:8100",
  "2400:3c00","2400:4f00","2402:4e00","2407:3e00","2407:5200",
  "2c0f:f248","2c0f:f7c0","240e:0000"
];

// ════════════════════════════════════════════════════════════════
//  ❹  UTILITY — دوال المطابقة الأساسية (تخدم قاعدة البيانات)
// ════════════════════════════════════════════════════════════════

function ipv4ToInt(ip) {
  var p = ip.split(".");
  if (p.length !== 4) return 0;
  return ((parseInt(p[0],10)<<24)|(parseInt(p[1],10)<<16)|
          (parseInt(p[2],10)<<8)|parseInt(p[3],10)) >>> 0;
}

function inRange4(ip, net, bits) {
  var mask = bits === 0 ? 0 : (0xFFFFFFFF << (32 - bits)) >>> 0;
  return (ipv4ToInt(ip) & mask) === (ipv4ToInt(net) & mask);
}

function expandIPv6(addr) {
  if (!addr || addr.indexOf(":") === -1) return null;
  if (addr.lastIndexOf(".") !== -1) return null;          // IPv4-mapped → حجب
  var halves = addr.split("::");
  var full   = [];
  if (halves.length === 2) {
    var L = halves[0] ? halves[0].split(":") : [];
    var R = halves[1] ? halves[1].split(":") : [];
    full  = L.slice(0);
    for (var z = 0; z < 8 - L.length - R.length; z++) full.push("0000");
    for (var r = 0; r < R.length; r++) full.push(R[r]);
  } else if (halves.length === 1) {
    full = addr.split(":");
  } else { return null; }
  if (full.length !== 8) return null;
  for (var k = 0; k < 8; k++) {
    while (full[k].length < 4) full[k] = "0" + full[k];
    if (!/^[0-9a-fA-F]{4}$/.test(full[k])) return null;
  }
  return full.join(":").toLowerCase();
}

// مطابقة /29 IPv6: أول مجموعة كاملة + 13 بت من الثانية
function match29(ip, base) {
  var a = ip.split(":"),  b = base.split(":");
  return a[0] === b[0] &&
         (parseInt(a[1],16) >> 3) === (parseInt(b[1],16) >> 3);
}

// مطابقة /32 IPv6: أول مجموعتان كاملتان
function match32(ip, base) {
  var a = ip.split(":"), b = base.split(":");
  return a[0] === b[0] && a[1] === b[1];
}

// ════════════════════════════════════════════════════════════════
//  ❺  RANGE LOOKUP — الدوال المركزية للبحث في قاعدة البيانات
//  هذه الدوال هي جوهر السكربت وتُستدعى في كل قرار
// ════════════════════════════════════════════════════════════════

// يُعيد معرّف النطاق الأردني IPv4 الذي ينتمي إليه العنوان (أو -1)
function jordanRangeIndex4(ip) {
  for (var i = 0; i < JO_IPV4.length; i++) {
    if (inRange4(ip, JO_IPV4[i][0], JO_IPV4[i][1])) return i;
  }
  return -1;
}

// يُعيد معرّف النطاق الأردني IPv6 الذي ينتمي إليه العنوان (أو -1)
function jordanRangeIndex6(fullIP) {
  var i;
  for (i = 0; i < JO_IPV6_29.length; i++) {
    if (match29(fullIP, JO_IPV6_29[i])) return i;
  }
  for (i = 0; i < JO_IPV6_32.length; i++) {
    if (match32(fullIP, JO_IPV6_32[i])) return JO_IPV6_29.length + i;
  }
  return -1;
}

// هل العنوان محجوب (private / خارج الأردن)؟
function isBlocked4(ip) {
  for (var i = 0; i < BLOCKED_V4.length; i++) {
    if (inRange4(ip, BLOCKED_V4[i][0], BLOCKED_V4[i][1])) return true;
  }
  return false;
}

function isBlocked6(f) {
  if (!f) return true;
  var i;
  for (i = 0; i < BLOCKED_V6_29.length; i++) if (match29(f, BLOCKED_V6_29[i])) return true;
  for (i = 0; i < BLOCKED_V6_32.length; i++) if (match32(f, BLOCKED_V6_32[i])) return true;
  var p = f.substring(0, 4);
  return p === "2002" || p === "fe80" || p === "ff02" ||
         f.substring(0, 9) === "2001:0000" ||
         f.substring(0, 8) === "2001:0db8";
}

// ════════════════════════════════════════════════════════════════
//  ❻  TRAFFIC CLASSIFICATION
//  يُصنّف حركة المرور بناءً على المضيف والمسار
//  النتيجة: "match" | "lobby" | "general"
// ════════════════════════════════════════════════════════════════

function classifyTraffic(host, url) {
  var d = (host + " " + url).toLowerCase();

  // ── مرحلة المباراة (أعلى أولوية) ──
  if (/match|battle|classic|ranked|unranked|competi|arena|tdm|teamdeath|
       ingame|gamesvr|relay|realtime|spectate|combat|survival|
       erangel|miramar|sanhok|vikendi|karakin|livik|nusa|haven|deston|rondo|
       spawn|parachute|plane|circle|zone|redzone|bluehole|
       squad|duo|solo|fpp|tpp|fireteam/ix.test(d)) return "match";

  // ── اللوبي والتحقق ──
  if (/lobby|login|auth|session|gateway|region|matchmak|queue|
       profile|inventory|store|catalog|news|event|mission|reward|
       heartbeat|keepalive|ping|version|init|bootstrap|
       friends|clan|chat|voice|party|rank|leaderboard|
       checkin|signin|signup|register|verify|token/ix.test(d)) return "lobby";

  return "general";
}

// ════════════════════════════════════════════════════════════════
//  ❼  APPLICATION FILTER — تصفية التطبيق المستهدف (PUBG)
// ════════════════════════════════════════════════════════════════

function isPUBG(h, u) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|proxima|
          gpubgm|battleground|amsoveasea|tencentgames|igamecj|
          beacon\.qq|midas\.qq|ssl\.msdk|pandora\.qq|mcgi\.qq|
          mstat\.qq|stat\.intl|gcloud|qpic\.cn|myqcloud|tencentcs|
          cdntips|gamesafe|anticheat|battleye|
          xd\.com|garena|garenanow/ix.test(h + " " + u);
}

function isCDNorTelemetry(h, u) {
  return /\.cdn\.|cloudfront\.net|akamai|\.edgesuite\.|fastly|cloudflare|
          crashlytics|analytics|appsflyer|adjust\.com|branch\.io|
          firebase|bugly|sentry\.io|bugsnag|hotfix|
          \.dnsv1\.com|cdntips\.net|cdnbuzz/ix.test(h + " " + u);
}

// ════════════════════════════════════════════════════════════════
//  ❽  SESSION STATE
//  الجلسة تُثبَّت على النطاق (rangeId) لا على IP فردي
//  هذا يضمن أن كل عناوين النطاق تستفيد من نفس مسار الـ Proxy
// ════════════════════════════════════════════════════════════════

var SESSION = {
  rangeId4:     -1,    // معرّف نطاق IPv4 المكتشف أثناء الجلسة
  rangeId6:     -1,    // معرّف نطاق IPv6 المكتشف أثناء الجلسة
  trafficPhase: "general",   // المرحلة الحالية للجلسة
  inMatch:      false,
  lastActivity: 0
};

var SESSION_TIMEOUT_MS = 30 * 60 * 1000;

function getTimestamp() {
  try { return new Date().getTime(); } catch(e) { return 0; }
}

function tickSession(rangeId, isV6) {
  var now = getTimestamp();
  // إذا انقضت 30 دقيقة من آخر نشاط → صفّر الجلسة
  if (SESSION.lastActivity > 0 &&
      (now - SESSION.lastActivity) > SESSION_TIMEOUT_MS) {
    SESSION.rangeId4     = -1;
    SESSION.rangeId6     = -1;
    SESSION.trafficPhase = "general";
    SESSION.inMatch      = false;
  }
  SESSION.lastActivity = now;
  // ربط الجلسة بالنطاق (أول نطاق مكتشف يفوز)
  if (isV6 && SESSION.rangeId6 === -1) SESSION.rangeId6 = rangeId;
  if (!isV6 && SESSION.rangeId4 === -1) SESSION.rangeId4 = rangeId;
}

// ════════════════════════════════════════════════════════════════
//  ❾  MAIN ENTRY POINT
// ════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {

  // ── مرشّح التطبيق: كل ما ليس PUBG يذهب مباشرةً ──
  if (isPlainHostName(host))       return DIRECT;
  if (!isPUBG(host, url))          return DIRECT;
  if (isCDNorTelemetry(host, url)) return DIRECT;

  // ── حل الـ DNS ──
  var ip = "";
  try { ip = dnsResolve(host); } catch(e) { ip = ""; }
  if (!ip) return BLOCK;

  // ── تصنيف حركة المرور ──
  var phase = classifyTraffic(host, url);

  // ══════════════════════════════════════════
  //  مسار IPv6
  // ══════════════════════════════════════════
  if (ip.indexOf(":") !== -1) {
    var full = expandIPv6(ip);
    if (!full || isBlocked6(full)) return BLOCK;

    // البحث في قاعدة النطاقات الأردنية
    var rid6 = jordanRangeIndex6(full);
    if (rid6 === -1) return BLOCK;   // ليس أردنياً → حجب

    // تحديث الجلسة بناءً على النطاق المكتشف
    tickSession(rid6, true);

    // تحديث مرحلة الجلسة
    if (phase === "match") {
      SESSION.trafficPhase = "match";
      SESSION.inMatch      = true;
    } else if (phase === "lobby" && SESSION.trafficPhase !== "match") {
      SESSION.trafficPhase = "lobby";
    }
    if (phase !== "match" && SESSION.inMatch) {
      SESSION.inMatch      = false;
      SESSION.trafficPhase = "lobby";
    }

    return PROXY;
  }

  // ══════════════════════════════════════════
  //  مسار IPv4
  // ══════════════════════════════════════════
  if (ip.indexOf(".") !== -1) {
    if (isBlocked4(ip)) return BLOCK;

    // البحث في قاعدة النطاقات الأردنية
    var rid4 = jordanRangeIndex4(ip);
    if (rid4 === -1) return BLOCK;   // ليس أردنياً → حجب

    // تحديث الجلسة بناءً على النطاق المكتشف
    tickSession(rid4, false);

    if (phase === "match") {
      SESSION.trafficPhase = "match";
      SESSION.inMatch      = true;
    } else if (phase === "lobby" && SESSION.trafficPhase !== "match") {
      SESSION.trafficPhase = "lobby";
    }
    if (phase !== "match" && SESSION.inMatch) {
      SESSION.inMatch      = false;
      SESSION.trafficPhase = "lobby";
    }

    return PROXY;
  }

  return BLOCK;
}
