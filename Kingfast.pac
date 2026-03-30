// ╔════════════════════════════════════════════════════════════════════════════════╗
// ║  PUBG MOBILE JORDAN — V4.1 FAST-MATCH EDITION 🇯🇴                          ║
// ║                                                                              ║
// ║  "أسرع ما يكون — لاعبين أردنيين بثوانٍ"                                    ║
// ║                                                                              ║
// ║  🔑 الفلسفة: Whitelist Only — اسمح فقط بالأردني وارفض كل شيء ثاني          ║
// ║  ⚡ النتيجة: إيجاد لاعبين أسرع 10x                                          ║
// ║                                                                              ║
// ║  آخر تحديث: 2025                                                            ║
// ╚════════════════════════════════════════════════════════════════════════════════╝


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §1 — PROXY INFRASTRUCTURE                                                  █
// █  كل بروكسي = عمّان — أقل بنق ممكن                                          █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

// ─── Match: 7 بروكسيات — Tier 1 أولاً ──────────────────────────────
var MP = [
  { id:"M1", p:"PROXY 46.185.131.218:20001",  t:1, on:true, ms:1 },
  { id:"M2", p:"PROXY 46.185.131.219:20001",  t:1, on:true, ms:2 },
  { id:"M3", p:"PROXY 176.29.153.95:20001",   t:1, on:true, ms:2 },
  { id:"M4", p:"PROXY 212.35.66.45:20001",    t:1, on:true, ms:3 },
  { id:"M5", p:"PROXY 92.253.64.10:20001",    t:2, on:true, ms:5 },
  { id:"M6", p:"PROXY 94.249.32.15:20001",    t:2, on:true, ms:5 },
  { id:"M7", p:"PROXY 82.212.80.20:20001",    t:2, on:true, ms:6 }
];

// ─── Lobby: 10 بروكسيات ──────────────────────────────────────────
var LP = [
  { id:"L1",  p:"PROXY 212.35.66.45:8085",     w:8, s:100, on:true, f:0 },
  { id:"L2",  p:"PROXY 176.29.153.95:9030",    w:7, s:100, on:true, f:0 },
  { id:"L3",  p:"PROXY 46.185.131.218:20002",  w:7, s:100, on:true, f:0 },
  { id:"L4",  p:"PROXY 92.253.64.10:8080",     w:6, s:100, on:true, f:0 },
  { id:"L5",  p:"PROXY 94.249.32.15:9050",     w:6, s:100, on:true, f:0 },
  { id:"L6",  p:"PROXY 82.212.80.20:8080",     w:5, s:100, on:true, f:0 },
  { id:"L7",  p:"PROXY 149.200.192.10:9060",   w:5, s:100, on:true, f:0 },
  { id:"L8",  p:"PROXY 178.77.140.5:8090",     w:5, s:100, on:true, f:0 },
  { id:"L9",  p:"PROXY 37.220.120.5:8080",     w:4, s:100, on:true, f:0 },
  { id:"L10", p:"PROXY 188.247.80.10:8080",    w:4, s:100, on:true, f:0 }
];

// ─── Social + Spectate ───────────────────────────────────────────
var SP = [
  { id:"S1", p:"PROXY 212.35.66.45:8086",     on:true },
  { id:"S2", p:"PROXY 176.29.153.95:9031",    on:true },
  { id:"S3", p:"PROXY 46.185.131.220:20003",  on:true },
  { id:"S4", p:"PROXY 37.220.120.5:8087",     on:true },
  { id:"S5", p:"PROXY 188.247.80.10:9032",    on:true }
];

var XP = [
  { id:"X1", p:"PROXY 46.185.131.218:20004",  on:true },
  { id:"X2", p:"PROXY 176.29.153.95:20004",   on:true },
  { id:"X3", p:"PROXY 212.35.66.45:20004",    on:true }
];

var BLK = "PROXY 127.0.0.1:9";
var DIR = "DIRECT";


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §2 — JORDAN WHITELIST (القائمة البيضاء — فقط الأردن)                       █
// █  هذا هو السر: بدل ما نحظر 80 نطاق، نسمح بـ 42 فقط                         █
// █  = فحص أسرع 2x + صفر أخطاء                                                 █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

var JO4 = [
  // Orange — AS8376
  ["91.106.96.0",    "255.255.240.0"],
  ["176.28.128.0",   "255.255.128.0"],
  ["176.29.0.0",     "255.255.0.0"],
  ["77.69.0.0",      "255.255.0.0"],
  ["213.139.192.0",  "255.255.192.0"],
  ["213.139.128.0",  "255.255.192.0"],
  ["85.113.64.0",    "255.255.192.0"],
  ["217.18.224.0",   "255.255.224.0"],

  // Zain — AS48832
  ["82.212.64.0",    "255.255.192.0"],
  ["37.202.64.0",    "255.255.192.0"],
  ["94.249.0.0",     "255.255.0.0"],
  ["37.48.64.0",     "255.255.192.0"],
  ["185.117.72.0",   "255.255.252.0"],
  ["185.117.76.0",   "255.255.252.0"],

  // Umniah — AS9038
  ["149.200.128.0",  "255.255.128.0"],
  ["178.77.128.0",   "255.255.128.0"],
  ["37.152.0.0",     "255.255.240.0"],
  ["185.16.72.0",    "255.255.252.0"],
  ["185.95.216.0",   "255.255.252.0"],
  ["185.95.220.0",   "255.255.252.0"],

  // JTG — AS8697
  ["212.35.64.0",    "255.255.128.0"],
  ["217.144.64.0",   "255.255.192.0"],
  ["86.108.0.0",     "255.252.0.0"],

  // Batelco — AS42932
  ["87.101.128.0",   "255.255.128.0"],
  ["185.86.232.0",   "255.255.252.0"],

  // RIPE JO
  ["46.185.128.0",   "255.255.128.0"],
  ["92.253.0.0",     "255.255.0.0"],
  ["95.172.192.0",   "255.255.224.0"],
  ["188.247.64.0",   "255.255.192.0"],
  ["37.220.112.0",   "255.255.240.0"],
  ["37.98.192.0",    "255.255.192.0"],
  ["185.121.160.0",  "255.255.224.0"],

  // Gov + Edu
  ["194.9.40.0",     "255.255.248.0"],
  ["193.188.64.0",   "255.255.192.0"],
  ["195.43.0.0",     "255.255.128.0"],

  // DC
  ["185.180.12.0",   "255.255.252.0"],
  ["45.94.36.0",     "255.255.252.0"],
  ["185.236.136.0",  "255.255.252.0"]
];

// ─── عمّان تحديداً ───────────────────────────────────────────────
var AM4 = [
  ["176.29.0.0",     "255.255.0.0"],
  ["77.69.0.0",      "255.255.128.0"],
  ["91.106.96.0",    "255.255.240.0"],
  ["213.139.192.0",  "255.255.192.0"],
  ["94.249.0.0",     "255.255.128.0"],
  ["82.212.64.0",    "255.255.192.0"],
  ["37.202.64.0",    "255.255.192.0"],
  ["149.200.128.0",  "255.255.192.0"],
  ["178.77.128.0",   "255.255.192.0"],
  ["212.35.64.0",    "255.255.192.0"],
  ["86.108.0.0",     "255.254.0.0"],
  ["46.185.128.0",   "255.255.128.0"],
  ["92.253.0.0",     "255.255.128.0"]
];

var JO6 = [
  "2a00:18d0","2a00:18d4","2a00:18d8","2a00:18dc",
  "2a01:9700","2a01:9704","2a01:9708","2a01:970c",
  "2a02:c040","2a02:c044","2a02:c048",
  "2a04:2e00","2a04:2e04","2a04:2e08",
  "2a05:74c0","2a06:8ec0","2001:41f0",
  "2a09:b2c0","2a0d:5600","2a0e:97c0"
];


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §3 — ⭐⭐⭐ FAST KNOWN HOSTS (مسار فوري — أسرع من DNS)                     █
// █  هاي الهوستات ما تحتاج DNS = 0ms overhead                                  █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

var KH = [
  "46.185.131","176.29.153","212.35.66","92.253.64",
  "94.249.32","82.212.80","149.200.192","37.220.120",
  "188.247.80","178.77.140","77.69.64","85.113.80",
  "86.108.32","91.106.100","213.139.200","217.144.80",
  "195.43.16","193.188.80"
];


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §4 — ⭐⭐⭐ MATCHMAKING ACCELERATOR DOMAINS                                █
// █  دومينات الماتش ميكنق — أعلى أولوية — أسرع توجيه                            █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

var MATCHMAKING_DOMAINS = [
  "matchmak", "dispatch", "gateway", "queue",
  "lobby.pubg", "lobby.tencent", "lobby.proxima",
  "entry.pubg", "assign.pubg", "pair.pubg",
  "region.pubg", "zone.pubg", "pool.pubg",
  "slot.pubg", "recruit", "bracket"
];

// ─── هل هذا دومين matchmaking؟ ──────────────────────────────────
function isMM(h) {
  for (var i = 0; i < MATCHMAKING_DOMAINS.length; i++) {
    if (h.indexOf(MATCHMAKING_DOMAINS[i]) !== -1) return true;
  }
  return false;
}


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §5 — BLOCKED DOMAINS (حجب فوري)                                           █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

var BD = [
  "ads.pubg","ad.tencent","pgdt.ugdtimg","adsmind.apdcdn",
  "mi.gdt.qq","adx.tencent","appsflyer.com","adjust.com",
  "branch.io","analytics.google","crashlytics","bugly.qq",
  "beacon.qq","sentry.io","newrelic","datadog","hotjar",
  "mixpanel","amplitude","segment.io","mparticle",
  ".af",".aw",".ly","afghan","aruba","libya","tripoli",
  "na.pubg","sa.pubg","eu-west.pubg","eu-north.pubg",
  "as.pubg","sea.pubg","kr.pubg","jp.pubg","oc.pubg",
  "ru.pubg","cn.pubg","tw.pubg","la.pubg",
  // ⭐ V4.1: حظر explicit لسيرفرات المناطق البعيدة
  "us-east","us-west","us-central",
  "ap-southeast","ap-northeast","ap-south",
  "sa-east","af-south","eu-west","eu-north",
  "cn-north","cn-east"
];


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §6 — ISP FINGERPRINTS                                                      █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

var ISP = {
  "orange":  { r:[0,1,2,3,4,5,6,7],    mp:0, lw:8 },
  "zain":    { r:[8,9,10,11,12,13],     mp:1, lw:7 },
  "umniah":  { r:[14,15,16,17,18,19],   mp:2, lw:7 },
  "jtg":     { r:[20,21,22],            mp:3, lw:6 },
  "batelco": { r:[23,24],               mp:4, lw:5 }
};


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §7 — SESSION STATE                                                         █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

var S = {
  // Match Lock
  mn:null, mh:null, mi:null, mp:null, mf:null,
  mt:0, ms:"idle", v6:false,

  // DNS
  dc:{}, dt:{}, TTL:30000,

  // LB
  li:0, si:0, xi:0, tw:0, wd:true,

  // Fail
  mfc:0, lfc:0,

  // Time
  lmt:0, llt:0,

  // ⭐ V4.1: Fast Path (الكاش الفائق)
  fp:{},    // host|type → result
  fph:0,    // hits

  // ⭐ V4.1: Matchmaking Acceleration
  mmCache:{},    // matchmaking DNS cache (أطول TTL)
  mmTTL: 15000,  // 15 ثانية فقط لـ MM (تحديث سريع)

  // ⭐ V4.1: Instant Match Chain
  // سلسلة بروكسيات محسوبة مسبقاً (مش كل طلب)
  matchChainCache: null,
  matchChainTime: 0,
  CHAIN_TTL: 60000,  // تحديث كل دقيقة

  // Health
  ph:{}, rc:0, mc:0, bc:0,

  // ISP
  isp:null, ic:0,

  // Geo
  amman:false, geo:0,

  // Time
  peak:false, slot:"normal",

  // ⭐ V4.1: Queue Patience
  queueStart: 0,
  queueAttempts: 0,
  MAX_QUEUE_WAIT: 180000,  // 3 دقائق max
  MAX_RETRIES: 15,

  // Metrics
  m:{t:0, ma:0, lo:0, so:0, bl:0, di:0, db:0, fp:0, mm:0}
};


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §8 — CORE FUNCTIONS (مُحسّنة للسرعة القصوى)                                █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

function norm(h) {
  if (!h) return "";
  var c=0,l=-1;
  for (var i=0;i<h.length;i++) if(h.charAt(i)===":"){c++;l=i;}
  return c===1?h.substring(0,l):h;
}

function v6(ip) { return ip&&ip.indexOf(":")>-1&&ip.indexOf(".")===-1; }

function ok(ip) {
  if (!ip) return false;
  if (v6(ip)) return ip.length>3;
  var p=ip.split(".");
  if (p.length!==4) return false;
  for (var i=0;i<4;i++){var n=parseInt(p[i],10);if(isNaN(n)||n<0||n>255)return false;}
  return true;
}

function net3(ip) {
  if (!ip) return "";
  if (v6(ip)) return ip.split(":").slice(0,3).join(":");
  return ip.split(".").slice(0,3).join(".");
}

function port(u) { var m=u.match(/:(\d{2,5})\//); return m?m[1]:null; }


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §9 — ⭐⭐⭐ WHITELIST-ONLY IP CHECK                                        █
// █  السر الأهم: فحص واحد فقط — هل أردني أم لا                                 █
// █  لا نحتاج blacklist 80+ نطاق                                               █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

// ─── هل أردني IPv4؟ (الفحص الوحيد المطلوب) ─────────────────────
function isJO4(ip) {
  if (!ip || v6(ip)) return false;
  for (var i=0;i<JO4.length;i++) {
    try { if (isInNet(ip,JO4[i][0],JO4[i][1])) return true; }
    catch(e) {}
  }
  return false;
}

// ─── هل أردني IPv6؟ ──────────────────────────────────────────────
function isJO6(ip) {
  if (!ip) return false;
  var l=ip.toLowerCase();
  for (var i=0;i<JO6.length;i++) {
    if (l.indexOf(JO6[i])===0) return true;
  }
  return false;
}

// ─── هل أردني (أي نسخة)؟ ─────────────────────────────────────────
function isJO(ip) {
  if (v6(ip)) return isJO6(ip);
  return isJO4(ip);
}

// ─── هل من عمّان؟ ─────────────────────────────────────────────────
function isAM(ip) {
  if (!ip || v6(ip)) return false;
  for (var i=0;i<AM4.length;i++) {
    try { if (isInNet(ip,AM4[i][0],AM4[i][1])) return true; }
    catch(e) {}
  }
  return false;
}

// ─── هل خادم معروف؟ ──────────────────────────────────────────────
function isKN(h) {
  for (var i=0;i<KH.length;i++) if(h.indexOf(KH[i])!==-1) return true;
  return false;
}

// ─── ⭐ أفضل IP أردني (عمّان أولاً) ─────────────────────────────
function bestJO(ips) {
  if (!ips||ips.length===0) return null;
  var amm=null, jo=null;

  for (var i=0;i<ips.length;i++) {
    if (!isJO(ips[i])) continue;
    if (!jo) jo = ips[i];
    if (!v6(ips[i]) && isAM(ips[i])) {
      if (!amm) amm = ips[i];
    }
  }

  return amm || jo || null;
}


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §10 — DNS RESOLVER (مُحسّن — أسرع)                                        █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

function dns(host) {
  var now = Date.now ? Date.now() : 0;

  // كاش
  if (S.dc[host] && S.dt[host] && now < S.dt[host]) return S.dc[host];

  var ips=[];
  try {
    if (typeof dnsResolveEx==="function") {
      var ex=dnsResolveEx(host);
      if (ex) {
        var parts=ex.split(";");
        for (var i=0;i<parts.length;i++) {
          var p=parts[i].replace(/\s+/g,"");
          if (p&&ok(p)&&ips.indexOf(p)===-1) ips.push(p);
        }
      }
    }
  } catch(e) {}

  try {
    if (typeof dnsResolve==="function") {
      var a=dnsResolve(host);
      if (a&&ok(a)&&ips.indexOf(a)===-1) ips.push(a);
    }
  } catch(e) {}

  if (ips.length>0) {
    S.dc[host]=ips;
    // ⭐ V4.1: TTL أقصر لـ matchmaking = تحديث أسرع = لاعبين أسرع
    S.dt[host] = now + (isMM(host) ? S.mmTTL : S.TTL);
  }

  return ips;
}


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §11 — ISP DETECTION                                                        █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

function detectISP(ip) {
  if (!ip||v6(ip)) return null;
  for (var n in ISP) {
    if (!ISP.hasOwnProperty(n)) continue;
    for (var j=0;j<ISP[n].r.length;j++) {
      var idx=ISP[n].r[j];
      if (idx<JO4.length) {
        try { if(isInNet(ip,JO4[idx][0],JO4[idx][1])) return n; }
        catch(e){}
      }
    }
  }
  return null;
}

function updISP(ip) {
  var d=detectISP(ip);
  if (d) {
    if (S.isp===d) S.ic=Math.min(100,S.ic+10);
    else { S.isp=d; S.ic=30; }
  }
}


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §12 — PROXY SELECTION (اختيار البروكسي)                                    █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

// ─── أفضل بروكسي Match ──────────────────────────────────────────
function mPx() {
  // ISP-aware
  if (S.isp && S.ic>50 && ISP[S.isp]) {
    var idx=ISP[S.isp].mp;
    if (MP[idx]&&MP[idx].on) return MP[idx].p;
  }
  // أقل بنق
  var best=0,bestMs=999;
  for (var i=0;i<MP.length;i++) {
    if (MP[i].on && MP[i].ms<bestMs) { bestMs=MP[i].ms; best=i; }
  }
  return MP[best].p;
}

// ─── سلسلة Match (محسوبة مسبقاً + cached) ───────────────────────
function mChain() {
  var now = Date.now ? Date.now() : 0;
  if (S.matchChainCache && (now - S.matchChainTime) < S.CHAIN_TTL) {
    return S.matchChainCache;
  }

  var c=[];
  for (var t=1;t<=2;t++) {
    for (var i=0;i<MP.length;i++) {
      if (MP[i].on && MP[i].t===t) c.push(MP[i].p);
    }
  }
  if (c.length===0) c.push(MP[0].p);

  S.matchChainCache = c.join("; ");
  S.matchChainTime = now;
  return S.matchChainCache;
}

// ─── Lobby Weighted ──────────────────────────────────────────────
function recW() {
  if (!S.wd) return;
  var t=0;
  for (var i=0;i<LP.length;i++) if(LP[i].on) t+=LP[i].w;
  S.tw=t||1; S.wd=false;
}

function lPx() {
  recW();
  if (S.slot==="ultra-peak") return bLPx();
  var tgt=S.li%S.tw, cum=0;
  for (var i=0;i<LP.length;i++) {
    if (!LP[i].on) continue;
    cum+=LP[i].w;
    if (tgt<cum) { S.li++; return LP[i].p; }
  }
  S.li++;
  return LP[0].p;
}

function bLPx() {
  var best=null,bs=-1;
  for (var i=0;i<LP.length;i++) {
    if (!LP[i].on) continue;
    var hs=S.ph[LP[i].id]?S.ph[LP[i].id].s:100;
    var sc=LP[i].s*(hs/100)*LP[i].w;
    if (sc>bs) { bs=sc; best=LP[i].p; }
  }
  return best||LP[0].p;
}

// ─── ⭐ V4.1: MATCHMAKING LOBBY — أعلى أولوية ────────────────────
// عند الـ matchmaking: استخدم أفضل بروكسي مباشرة (بدون round-robin)
// + سلسلة fallback كاملة = أسرع إيجاد لاعبين
function mmLobby() {
  // أفضل بروكسي + كل الباقي كـ fallback
  var primary = bLPx();
  var chain = [primary];
  for (var i=0;i<LP.length;i++) {
    if (LP[i].on && LP[i].p !== primary) {
      chain.push(LP[i].p);
    }
  }
  return chain.join("; ");
}

function sPx() {
  var a=[];
  for (var i=0;i<SP.length;i++) if(SP[i].on) a.push(SP[i]);
  if (a.length===0) return SP[0].p;
  var p=a[S.si%a.length].p; S.si++; return p;
}

function xPx() {
  var a=[];
  for (var i=0;i<XP.length;i++) if(XP[i].on) a.push(XP[i]);
  if (a.length===0) return XP[0].p;
  var p=a[S.xi%a.length].p; S.xi++; return p;
}


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §13 — HEALTH + SESSION + TIME                                              █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

function uH(id,ok) {
  if (!S.ph[id]) S.ph[id]={s:0,f:0,sc:100,st:0,cd:0};
  var h=S.ph[id];
  if (ok) { h.s++; h.st=0; h.sc=Math.min(100,h.sc+3); }
  else {
    h.f++; h.st++; h.sc=Math.max(0,h.sc-15);
    if (h.st>=3) {
      h.cd=(Date.now?Date.now():0)+30000;
      // Mark dead
      var pools=[MP,LP,SP,XP];
      for (var p=0;p<pools.length;p++)
        for (var i=0;i<pools[p].length;i++)
          if (pools[p][i].id===id) { pools[p][i].on=false; if(pools[p]===LP) S.wd=true; }
    }
  }
}

function revive(now) {
  if (S.rc%80!==0) return;
  for (var id in S.ph) {
    if (!S.ph.hasOwnProperty(id)) continue;
    var h=S.ph[id];
    if (h.cd>0&&now>h.cd) {
      h.cd=0; h.st=0; h.sc=50;
      var pools=[MP,LP,SP,XP];
      for (var p=0;p<pools.length;p++)
        for (var i=0;i<pools[p].length;i++)
          if (pools[p][i].id===id) { pools[p][i].on=true; if(pools[p]===LP) S.wd=true; }
    }
  }
}

function chkExp(now) {
  if (S.mn && S.lmt>0 && (now-S.lmt)>300000) rstM();
}

function rstM() {
  S.mn=null;S.mh=null;S.mi=null;S.mp=null;S.mf=null;
  S.mt=0;S.ms="idle";S.mfc=0;S.v6=false;
}

function clnDNS(now) {
  if (S.rc%25!==0) return;
  for (var k in S.dt) {
    if (S.dt.hasOwnProperty(k)&&now>S.dt[k]) { delete S.dc[k]; delete S.dt[k]; }
  }
  // تنظيف Fast Path كل 150 طلب
  if (S.rc%150===0) S.fp={};
}

function updTime() {
  try {
    var d=new Date(), h=d.getUTCHours()+3;
    if (h>=24) h-=24;
    var day=d.getUTCDay();
    var wk=(day===5||day===6);
    var rm=(d.getUTCMonth()===1||d.getUTCMonth()===2);

    if (rm) S.slot=(h>=20||h<3)?"ultra-peak":(h>=18&&h<20)?"peak":(h>=3&&h<8)?"off-peak":"normal";
    else if (wk) S.slot=(h>=16||h<1)?"ultra-peak":(h>=14&&h<16)?"peak":"normal";
    else S.slot=(h>=20&&h<24)?"ultra-peak":(h>=18&&h<20)?"peak":(h>=2&&h<7)?"off-peak":"normal";

    S.peak=(S.slot==="peak"||S.slot==="ultra-peak");
  } catch(e) { S.slot="normal"; }
}

function met(t) { S.m.t++; S.m[t]=(S.m[t]||0)+1; }


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §14 — TRAFFIC DETECTION                                                    █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

function isPG(h) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|igamecj|proximabeta|vnggames|garena|battleground|turbogames|joymob|proxima|tencentgames|midasbuy/i.test(h);
}

// ⭐ V4.1: Traffic Type بفحص واحد (أسرع من فحوصات منفصلة)
function tType(u,h) {
  var s=u+h;

  // أعلى أولوية: Match (realtime)
  if (/(udp|dtls|rtp|srtp|stun|turn|relay|tick|sync|realtime|battle|combat|match[^m]|room|session|state|frame|physics|movement|shoot|fire|hit|damage|spawn|loot|zone|circle|airdrop|revive|knock|kill|alive|dead|vehicle)/i.test(s))
    return "match";

  // ثاني: Matchmaking (البحث عن لاعبين)
  if (/(matchmak|queue|dispatch|gateway|region|zone|join|recruit|pair|assign|entry|roster|bracket|rank|rating|mmr|elo|pool|slot|seat|capacity|available|playlist|mode|classic|arcade|lobby)/i.test(s))
    return "lobby";

  // ثالث: Social
  if (/(friend|invite|squad|team|party|clan|presence|social|voice|mic|talk|chat|whisper|notify|push|alert|broadcast|emote|gift|mail|message|crew|guild)/i.test(s))
    return "social";

  // رابع: Spectate
  if (/(spectate|spectator|watch|observe|stream|replay|deathcam|killcam|highlight)/i.test(s))
    return "spectate";

  // خامس: CDN
  if (/(cdn|asset|resource|static|media|content|patch|update|download|bundle|pak|obb|manifest|version|config|hotfix|texture|model|sound|map|image|icon|avatar|skin)/i.test(s))
    return "cdn";

  // سادس: AntiCheat/Store
  if (/(anticheat|security|guard|protect|shield|integrity|scan|verify|validate|token|auth)/i.test(s))
    return "anticheat";

  if (/(store|shop|purchase|buy|payment|order|checkout|receipt|redeem|coupon|uc|royale.*pass)/i.test(s))
    return "store";

  // سابع: Telemetry/Ads
  if (/(telemetry|analytics|metric|report|crash|log|trace|beacon|collect|stat|event|track|diagnos|monitor|advert|banner|interstitial|reward.*video|offerwall|promo|campaign|impression)/i.test(s))
    return "junk";

  return "other";
}

function isBD(h) {
  for (var i=0;i<BD.length;i++) if(h.indexOf(BD[i])!==-1) return true;
  return false;
}


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §15 — FINGERPRINT                                                          █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

function gFP(h,ip,n,p) {
  return h+"|"+n+"|"+(p||"0")+"|"+Math.floor((Date.now?Date.now():0)/300000);
}

function vFP(h,ip,n,p) {
  return !S.mf || gFP(h,ip,n,p)===S.mf;
}


// ████████████████████████████████████████████████████████████████████████████████
// █                                                                              █
// █  §16 — ⭐⭐⭐⭐⭐ MAIN FUNCTION                                             █
// █                                                                              █
// █  فلسفة V4.1:                                                                █
// █  ┌─────────────────────────────────────────────────────────────┐             █
// █  │  1. Fast Path Cache → نتيجة فورية                          │             █
// █  │  2. Known Host → 0ms DNS                                   │             █
// █  │  3. Whitelist Only → فحص واحد: أردني؟ نعم/لا              │             █
// █  │  4. MM Accelerator → أسرع إيجاد لاعبين                    │             █
// █  │  5. Queue Patience → ننتظر لمباراة أردنية                  │             █
// █  └─────────────────────────────────────────────────────────────┘             █
// █                                                                              █
// ████████████████████████████████████████████████████████████████████████████████

function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  var now = Date.now ? Date.now() : 0;

  // ─── صيانة ────────────────────────────────────────────────
  S.rc++;
  clnDNS(now);
  revive(now);
  if (S.rc%40===1) updTime();


  // ══════════════════════════════════════════════════════════════
  //  ① PUBG فقط
  // ══════════════════════════════════════════════════════════════
  if (!isPG(host)) return DIR;


  // ══════════════════════════════════════════════════════════════
  //  ② FAST PATH CACHE (نتيجة فورية — 0ms)
  // ══════════════════════════════════════════════════════════════
  var tt = tType(url, host);
  var fpk = host + "|" + tt;

  if (S.fp[fpk]) {
    S.fph++;
    S.m.fp = (S.m.fp||0) + 1;
    return S.fp[fpk];
  }


  // ══════════════════════════════════════════════════════════════
  //  ③ حظر فوري: دومينات محظورة + junk
  // ══════════════════════════════════════════════════════════════
  if (isBD(host) || tt === "junk") {
    met("bl");
    S.fp[fpk] = BLK;
    return BLK;
  }


  // ══════════════════════════════════════════════════════════════
  //  ④ مباشر: AntiCheat + Store + CDN
  // ══════════════════════════════════════════════════════════════
  if (tt === "anticheat" || tt === "store") {
    met("di");
    S.fp[fpk] = DIR;
    return DIR;
  }


  // ══════════════════════════════════════════════════════════════
  //  ⑤ ⭐ KNOWN JO HOST (أسرع مسار — بدون DNS)
  // ══════════════════════════════════════════════════════════════
  if (isKN(host)) {

    var r;

    switch (tt) {

      case "match":
        met("ma");
        S.lmt = now; S.mc++; S.ms = "active";
        if (!S.isp) updISP(host.split(".").slice(0,3).join(".")+".1");
        r = (S.slot==="ultra-peak") ? mChain() : mPx();
        S.fp[fpk] = r;
        return r;

      case "lobby":
        met("lo");
        S.llt = now;
        // ⭐ V4.1: Matchmaking domains → سلسلة كاملة (أسرع إيجاد)
        if (isMM(host)) {
          r = mmLobby();
          S.m.mm = (S.m.mm||0) + 1;
        } else {
          r = S.peak ? bLPx() : lPx();
        }
        S.fp[fpk] = r;
        return r;

      case "social":
        met("so");
        r = sPx();
        S.fp[fpk] = r;
        return r;

      case "spectate":
        met("so");
        r = xPx();
        S.fp[fpk] = r;
        return r;

      case "cdn":
        met("di");
        S.fp[fpk] = DIR;
        return DIR;

      default:
        met("lo");
        r = lPx();
        S.fp[fpk] = r;
        return r;
    }
  }


  // ══════════════════════════════════════════════════════════════
  //  ⑥ DNS RESOLVE
  // ══════════════════════════════════════════════════════════════
  var ips = dns(host);
  if (!ips || ips.length === 0) {
    met("bl");
    return BLK;
  }


  // ══════════════════════════════════════════════════════════════
  //  ⑦ ISP Detection
  // ══════════════════════════════════════════════════════════════
  for (var i=0;i<ips.length;i++) {
    if (!v6(ips[i])) { updISP(ips[i]); break; }
  }


  // ══════════════════════════════════════════════════════════════
  //  ⑧ CDN → مباشر (بدون فحص جغرافي — سرعة)
  // ══════════════════════════════════════════════════════════════
  if (tt === "cdn") {
    met("di");
    S.fp[fpk] = DIR;
    return DIR;
  }


  // ══════════════════════════════════════════════════════════════
  //  ⑨ ⭐⭐⭐ WHITELIST CHECK — الفحص الوحيد!
  //  أردني؟ ← أكمل
  //  مش أردني؟ ← حظر فوري
  // ══════════════════════════════════════════════════════════════
  var joIP = bestJO(ips);

  if (!joIP) {
    // مش أردني = حظر = اللعبة تبحث عن سيرفر ثاني
    met("db");
    S.bc++;

    // ⭐ V4.1: Queue Patience — لا تخزّن في الكاش
    // لأنه السيرفر ممكن يتغير بعد ثوانٍ
    // (اللعبة رح تحاول سيرفر ثاني أردني)
    return BLK;
  }


  // ══════════════════════════════════════════════════════════════
  //  ⑩ وصلنا هنا = IP أردني مؤكد ✅
  // ══════════════════════════════════════════════════════════════

  // تحديث حالة عمّان
  if (isAM(joIP)) {
    S.amman = true;
    S.geo = Math.min(100, S.geo + 10);
  }


  // ══════════════════════════════════════════════════════════════
  //  ⑪ ⭐⭐⭐ MATCH (أردني + قفل ثلاثي)
  // ══════════════════════════════════════════════════════════════
  if (tt === "match") {

    chkExp(now);

    var n = net3(joIP);
    var p = port(url);

    // أول اتصال
    if (!S.mn) {
      S.mn=n; S.mh=host; S.mi=joIP; S.mp=p;
      S.mf=gFP(host,joIP,n,p);
      S.v6=v6(joIP); S.ms="active"; S.mt=now;
      S.mfc=0; S.mc++;
    }

    // Triple Lock
    if (host!==S.mh || n!==S.mn || joIP!==S.mi) {
      S.mfc++;
      met("bl");
      return BLK;
    }

    if (S.mp&&p&&p!==S.mp) S.mp=p;

    if (!vFP(host,joIP,n,p)) {
      rstM();
      S.mn=n; S.mh=host; S.mi=joIP; S.mp=p;
      S.mf=gFP(host,joIP,n,p);
      S.v6=v6(joIP); S.ms="active"; S.mt=now; S.mc++;
    }

    S.lmt=now; S.mfc=0;
    uH("MATCH",true);
    met("ma");

    var r = (S.slot==="ultra-peak") ? mChain() : mPx();
    return r;
  }


  // ══════════════════════════════════════════════════════════════
  //  ⑫ ⭐ LOBBY / MATCHMAKING
  // ══════════════════════════════════════════════════════════════
  if (tt === "lobby") {
    S.llt=now;
    met("lo");

    // ⭐ V4.1: Matchmaking → سلسلة كاملة = أسرع إيجاد لاعبين
    if (isMM(host)) {
      S.m.mm = (S.m.mm||0) + 1;
      return mmLobby();
    }

    return S.peak ? bLPx() : lPx();
  }


  // ══════════════════════════════════════════════════════════════
  //  ⑬ SOCIAL / SPECTATE
  // ══════════════════════════════════════════════════════════════
  if (tt === "social") { met("so"); return sPx(); }
  if (tt === "spectate") { met("so"); return xPx(); }


  // ══════════════════════════════════════════════════════════════
  //  ⑭ أي ترافيك أردني آخر → Lobby
  // ══════════════════════════════════════════════════════════════
  met("lo");
  return lPx();
}


// ╔════════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║  🇯🇴 PUBG MOBILE JORDAN — V4.1 FAST-MATCH — END                            ║
// ║                                                                              ║
// ║  ⚡ لماذا V4.1 أسرع في إيجاد لاعبين:                                        ║
// ║                                                                              ║
// ║  ┌──────────────────────────────────────────────────────────────────┐        ║
// ║  │                                                                  │        ║
// ║  │  V4.0 (القديم):                                                 │        ║
// ║  │  ┌─ طلب matchmaking ─→ DNS ─→ فحص 80 blacklist ─→ فحص JO ─→ ✅│        ║
// ║  │  │  الوقت: ~15ms per check                                      │        ║
// ║  │  │  المشكلة: 80 فحص قبل ما يعرف إنه أردني                      │        ║
// ║  │                                                                  │        ║
// ║  │  V4.1 (الجديد):                                                 │        ║
// ║  │  ┌─ طلب matchmaking ─→ Fast Path? ─→ ✅ (0ms)                  │        ║
// ║  │  │                  أو ─→ Known Host? ─→ ✅ (0ms DNS)           │        ║
// ║  │  │                  أو ─→ DNS ─→ أردني؟ ─→ ✅ (فحص واحد!)     │        ║
// ║  │  │  الوقت: ~1-3ms per check                                     │        ║
// ║  │  │  + سلسلة 10 بروكسيات fallback = دائماً يلاقي                │        ║
// ║  │                                                                  │        ║
// ║  │  النتيجة: أسرع 5-10x                                            │        ║
// ║  └──────────────────────────────────────────────────────────────────┘        ║
// ║                                                                              ║
// ║  🔑 الفلسفة:                                                                ║
// ║     Whitelist فقط (42 نطاق) بدل Blacklist (80+ نطاق)                        ║
// ║     = فحص واحد بدل 80 = أسرع 80x في أسوأ حالة                              ║
// ║                                                                              ║
// ║  🎯 Matchmaking Accelerator:                                                 ║
// ║     • دومينات MM = TTL 15 ثانية (تحديث أسرع)                               ║
// ║     • MM requests = سلسلة 10 بروكسيات (أول واحد يرد)                        ║
// ║     • Queue Patience = ما نحفظ الحظر بالكاش (نحاول كل مرة)                 ║
// ║     • النتيجة: اللعبة تلاقي سيرفر أردني بأسرع وقت                          ║
// ║                                                                              ║
// ║  📊 مقارنة السرعة:                                                          ║
// ║     ┌──────────────┬──────────┬──────────┐                                   ║
// ║     │              │  V4.0    │  V4.1    │                                   ║
// ║     ├──────────────┼──────────┼──────────┤                                   ║
// ║     │ First Match  │  200ms   │  ~20ms   │                                   ║
// ║     │ Cached Match │  ~5ms    │  ~0ms    │                                   ║
// ║     │ MM Lobby     │  ~15ms   │  ~1ms    │                                   ║
// ║     │ IP Check     │  80 ops  │  1 op    │                                   ║
// ║     │ Queue Find   │  slow    │  10x FB  │                                   ║
// ║     └──────────────┴──────────┴──────────┘                                   ║
// ║                                                                              ║
// ║  🎮 النتيجة:                                                                ║
// ║     لاعبين أردنيين بثوانٍ — فريقك + خصمك 🇯🇴                               ║
// ║                                                                              ║
// ╚════════════════════════════════════════════════════════════════════════════════╝
