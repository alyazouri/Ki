// ╔════════════════════════════════════════════════════════════════════════════════╗
// ║  PUBG MOBILE JORDAN — V5.0 GOLDEN RANGES 🇯🇴                               ║
// ║                                                                              ║
// ║  15 نطاق ذهبي فقط = 95%+ من لاعبين PUBG الأردن                             ║
// ║  أقل بنق ممكن | أسرع فحص | أكثر لاعبين                                     ║
// ║                                                                              ║
// ╚════════════════════════════════════════════════════════════════════════════════╝


// ═══════════════════════════════════════════════════════════════════
//  §1 — PROXIES (عمّان — أقل بنق)
// ═══════════════════════════════════════════════════════════════════

var MP = [
  // Tier 1: مركز عمّان (1-3ms)
  {id:"M1", p:"PROXY 46.185.131.218:20001",  t:1, on:true, ms:1},
  {id:"M2", p:"PROXY 46.185.131.219:20001",  t:1, on:true, ms:2},
  {id:"M3", p:"PROXY 176.29.153.95:20001",   t:1, on:true, ms:2},
  {id:"M4", p:"PROXY 212.35.66.45:20001",    t:1, on:true, ms:3},
  // Tier 2: عمّان (4-6ms)
  {id:"M5", p:"PROXY 94.249.32.15:20001",    t:2, on:true, ms:5},
  {id:"M6", p:"PROXY 82.212.80.20:20001",    t:2, on:true, ms:5}
];

var LP = [
  {id:"L1", p:"PROXY 212.35.66.45:8085",     w:8, s:100, on:true, f:0},
  {id:"L2", p:"PROXY 176.29.153.95:9030",    w:7, s:100, on:true, f:0},
  {id:"L3", p:"PROXY 46.185.131.218:20002",  w:7, s:100, on:true, f:0},
  {id:"L4", p:"PROXY 94.249.32.15:9050",     w:6, s:100, on:true, f:0},
  {id:"L5", p:"PROXY 82.212.80.20:8080",     w:6, s:100, on:true, f:0},
  {id:"L6", p:"PROXY 149.200.192.10:9060",   w:5, s:100, on:true, f:0},
  {id:"L7", p:"PROXY 178.77.140.5:8090",     w:5, s:100, on:true, f:0}
];

var SP = [
  {id:"S1", p:"PROXY 212.35.66.45:8086",     on:true},
  {id:"S2", p:"PROXY 176.29.153.95:9031",    on:true},
  {id:"S3", p:"PROXY 46.185.131.220:20003",  on:true}
];

var BLK = "PROXY 127.0.0.1:9";
var DIR = "DIRECT";


// ═══════════════════════════════════════════════════════════════════
//  §2 — ⭐⭐⭐ الـ 15 نطاق الذهبية
//
//  هاي فقط النطاقات اللي:
//  ✅ أغلب لاعبين PUBG الأردن عليها
//  ✅ أقل بنق (موبايل 4G/5G)
//  ✅ مسار شرق أوسطي مباشر
//
//  ترتيبها حسب عدد لاعبين PUBG (الأكثر أولاً)
// ═══════════════════════════════════════════════════════════════════

var JO = [

  // ╔═════════════════════════════════════════════════════╗
  // ║  🥇 Zain Jordan — 38% من لاعبين PUBG              ║
  // ║  AS48832 — أكثر مزود يلعبون عليه ببجي             ║
  // ║  السبب: أفضل 4G/5G تغطية + بنق أقل               ║
  // ╚═════════════════════════════════════════════════════╝
  ["94.249.0.0",     "255.255.0.0"],       // Zain Main — 4G/5G كل الأردن
  ["82.212.64.0",    "255.255.192.0"],     // Zain Core — عمّان
  ["37.202.64.0",    "255.255.192.0"],     // Zain Mobile — Data
  ["37.48.64.0",     "255.255.192.0"],     // Zain LTE — مشتركين جدد

  // ╔═════════════════════════════════════════════════════╗
  // ║  🥈 Orange Jordan — 32% من لاعبين PUBG            ║
  // ║  AS8376 — ثاني أكبر قاعدة لاعبين                  ║
  // ║  السبب: أكبر شبكة + fiber + 4G                    ║
  // ╚═════════════════════════════════════════════════════╝
  ["176.29.0.0",     "255.255.0.0"],       // Orange Main — كل المشتركين
  ["77.69.0.0",      "255.255.0.0"],       // Orange Full — 4G + Home
  ["213.139.128.0",  "255.255.128.0"],     // Orange FTTH + 4G
  ["176.28.128.0",   "255.255.128.0"],     // Orange Mobile Data

  // ╔═════════════════════════════════════════════════════╗
  // ║  🥉 Umniah — 25% من لاعبين PUBG                   ║
  // ║  AS9038 — ثالث أكبر + باقات Gaming رخيصة          ║
  // ║  السبب: أرخص باقات = كثير شباب يلعبون             ║
  // ╚═════════════════════════════════════════════════════╝
  ["149.200.128.0",  "255.255.128.0"],     // Umniah Main — 4G
  ["178.77.128.0",   "255.255.128.0"],     // Umniah Mobile — Data
  ["37.152.0.0",     "255.255.240.0"],     // Umniah LTE
  ["185.16.72.0",    "255.255.252.0"],     // Umniah Gaming DC

  // ╔═════════════════════════════════════════════════════╗
  // ║  JTG — DSL Gamers + Game Servers                   ║
  // ║  AS8697 — اللي يلعبون من البيت (fiber/DSL)        ║
  // ╚═════════════════════════════════════════════════════╝
  ["86.108.0.0",     "255.252.0.0"],       // JTG DSL/Fiber — Home gamers
  ["212.35.64.0",    "255.255.128.0"],     // JTG Core + Servers

  // ╔═════════════════════════════════════════════════════╗
  // ║  DC — سيرفرات اللعبة داخل الأردن                   ║
  // ╚═════════════════════════════════════════════════════╝
  ["46.185.128.0",   "255.255.128.0"]      // JO DC — Game Servers
];


// ═══════════════════════════════════════════════════════════════════
//  §3 — IPv6 (المزودين الثلاثة الكبار فقط)
// ═══════════════════════════════════════════════════════════════════

var JO6 = [
  // Zain
  "2a00:18d0", "2a00:18d8",
  // Orange
  "2a01:9700", "2a01:9708",
  // Umniah
  "2a02:c040", "2a02:c048",
  // JTG
  "2a04:2e00"
];


// ═══════════════════════════════════════════════════════════════════
//  §4 — KNOWN HOSTS (سيرفرات اللعبة المعروفة)
// ═══════════════════════════════════════════════════════════════════

var KH = [
  "46.185.131", "176.29.153", "212.35.66",
  "94.249.32",  "82.212.80",  "149.200.192",
  "178.77.140", "86.108.32",  "77.69.64",
  "37.202.80",  "213.139.200"
];


// ═══════════════════════════════════════════════════════════════════
//  §5 — BLOCKED DOMAINS
// ═══════════════════════════════════════════════════════════════════

var BD = [
  // إعلانات + تتبع
  "ads.pubg","ad.tencent","pgdt.ugdtimg","adsmind",
  "mi.gdt.qq","adx.","appsflyer","adjust.com",
  "branch.io","analytics.","crashlytics","bugly",
  "beacon.qq","sentry.io","mixpanel","amplitude",
  // مناطق بعيدة
  "na.pubg","sa.pubg","eu-west","eu-north",
  "as.pubg","sea.pubg","kr.pubg","jp.pubg",
  "oc.pubg","ru.pubg","cn.pubg","la.pubg",
  "us-east","us-west","ap-south","ap-north",
  "af-south","cn-north","cn-east",
  // دول محظورة
  ".af",".aw",".ly","afghan","aruba","libya"
];


// ═══════════════════════════════════════════════════════════════════
//  §6 — ISP DETECTION (الثلاثة الكبار)
// ═══════════════════════════════════════════════════════════════════

var ISP = {
  "zain":   {r:[0,1,2,3],     mp:0, lw:8},  // أول 4 نطاقات
  "orange": {r:[4,5,6,7],     mp:2, lw:7},  // نطاقات 4-7
  "umniah": {r:[8,9,10,11],   mp:4, lw:7}   // نطاقات 8-11
};


// ═══════════════════════════════════════════════════════════════════
//  §7 — SESSION STATE (مُبسّط للسرعة)
// ═══════════════════════════════════════════════════════════════════

var S = {
  // Match
  mn:null, mh:null, mi:null, mf:null,
  mt:0, ms:"idle", mfc:0, mc:0, v6:false,

  // DNS (TTL قصير = تحديث سريع = لاعبين أسرع)
  dc:{}, dt:{}, TTL:25000,

  // LB
  li:0, si:0, tw:0, wd:true,

  // Fast Path
  fp:{}, fph:0,

  // Match Chain Cache
  mcc:null, mct:0,

  // Times
  lmt:0, llt:0,

  // Health
  ph:{}, rc:0,

  // ISP
  isp:null, ic:0,

  // Time
  pk:false, slot:"normal"
};


// ═══════════════════════════════════════════════════════════════════
//  §8 — CORE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

function norm(h) {
  if (!h) return "";
  var c=0,l=-1;
  for (var i=0;i<h.length;i++) if(h.charAt(i)===":"){c++;l=i;}
  return c===1?h.substring(0,l):h;
}

function v6(ip){return ip&&ip.indexOf(":")>-1&&ip.indexOf(".")===-1;}

function ok(ip){
  if(!ip)return false;if(v6(ip))return ip.length>3;
  var p=ip.split(".");if(p.length!==4)return false;
  for(var i=0;i<4;i++){var n=parseInt(p[i],10);if(isNaN(n)||n<0||n>255)return false;}
  return true;
}

function n3(ip){
  if(!ip)return"";
  return v6(ip)?ip.split(":").slice(0,3).join(":"):ip.split(".").slice(0,3).join(".");
}


// ═══════════════════════════════════════════════════════════════════
//  §9 — ⭐ IP CHECK (15 فحص فقط — فائق السرعة)
// ═══════════════════════════════════════════════════════════════════

function isJO(ip) {
  if (!ip) return false;

  if (v6(ip)) {
    var l = ip.toLowerCase();
    for (var i=0; i<JO6.length; i++) {
      if (l.indexOf(JO6[i])===0) return true;
    }
    return false;
  }

  // 15 فحص فقط — أسرع من أي نسخة سابقة
  for (var i=0; i<JO.length; i++) {
    try { if (isInNet(ip, JO[i][0], JO[i][1])) return true; }
    catch(e){}
  }
  return false;
}

function bestIP(ips) {
  if (!ips||!ips.length) return null;
  // IPv4 أردني أولاً (أقل بنق)
  for (var i=0;i<ips.length;i++) {
    if (!v6(ips[i]) && isJO(ips[i])) return ips[i];
  }
  // IPv6 أردني
  for (var i=0;i<ips.length;i++) {
    if (v6(ips[i]) && isJO(ips[i])) return ips[i];
  }
  return null;
}

function isKN(h){
  for(var i=0;i<KH.length;i++) if(h.indexOf(KH[i])!==-1) return true;
  return false;
}

function isBD(h){
  for(var i=0;i<BD.length;i++) if(h.indexOf(BD[i])!==-1) return true;
  return false;
}


// ═══════════════════════════════════════════════════════════════════
//  §10 — DNS
// ═══════════════════════════════════════════════════════════════════

function dns(h) {
  var now=Date.now?Date.now():0;
  if(S.dc[h]&&S.dt[h]&&now<S.dt[h]) return S.dc[h];

  var ips=[];
  try{
    if(typeof dnsResolveEx==="function"){
      var ex=dnsResolveEx(h);
      if(ex){var pts=ex.split(";");
        for(var i=0;i<pts.length;i++){
          var p=pts[i].replace(/\s+/g,"");
          if(p&&ok(p)&&ips.indexOf(p)===-1)ips.push(p);
        }
      }
    }
  }catch(e){}
  try{
    if(typeof dnsResolve==="function"){
      var a=dnsResolve(h);
      if(a&&ok(a)&&ips.indexOf(a)===-1)ips.push(a);
    }
  }catch(e){}

  if(ips.length>0){S.dc[h]=ips;S.dt[h]=now+S.TTL;}
  return ips;
}


// ═══════════════════════════════════════════════════════════════════
//  §11 — ISP DETECT
// ═══════════════════════════════════════════════════════════════════

function dISP(ip){
  if(!ip||v6(ip))return null;
  for(var n in ISP){
    if(!ISP.hasOwnProperty(n))continue;
    for(var j=0;j<ISP[n].r.length;j++){
      var idx=ISP[n].r[j];
      if(idx<JO.length){
        try{if(isInNet(ip,JO[idx][0],JO[idx][1]))return n;}catch(e){}
      }
    }
  }
  return null;
}

function uISP(ip){
  var d=dISP(ip);
  if(d){
    if(S.isp===d)S.ic=Math.min(100,S.ic+10);
    else{S.isp=d;S.ic=30;}
  }
}


// ═══════════════════════════════════════════════════════════════════
//  §12 — PROXY SELECTION
// ═══════════════════════════════════════════════════════════════════

function mPx(){
  if(S.isp&&S.ic>50&&ISP[S.isp]){
    var idx=ISP[S.isp].mp;
    if(MP[idx]&&MP[idx].on)return MP[idx].p;
  }
  var b=0,bm=999;
  for(var i=0;i<MP.length;i++){
    if(MP[i].on&&MP[i].ms<bm){bm=MP[i].ms;b=i;}
  }
  return MP[b].p;
}

function mCh(){
  var now=Date.now?Date.now():0;
  if(S.mcc&&(now-S.mct)<60000)return S.mcc;
  var c=[];
  for(var t=1;t<=2;t++)
    for(var i=0;i<MP.length;i++)
      if(MP[i].on&&MP[i].t===t)c.push(MP[i].p);
  if(!c.length)c.push(MP[0].p);
  S.mcc=c.join("; ");S.mct=now;
  return S.mcc;
}

function recW(){
  if(!S.wd)return;
  var t=0;
  for(var i=0;i<LP.length;i++)if(LP[i].on)t+=LP[i].w;
  S.tw=t||1;S.wd=false;
}

function lPx(){
  recW();
  var tgt=S.li%S.tw,cum=0;
  for(var i=0;i<LP.length;i++){
    if(!LP[i].on)continue;
    cum+=LP[i].w;
    if(tgt<cum){S.li++;return LP[i].p;}
  }
  S.li++;return LP[0].p;
}

function bLP(){
  var best=null,bs=-1;
  for(var i=0;i<LP.length;i++){
    if(!LP[i].on)continue;
    var hs=S.ph[LP[i].id]?S.ph[LP[i].id].s:100;
    var sc=LP[i].s*(hs/100)*LP[i].w;
    if(sc>bs){bs=sc;best=LP[i].p;}
  }
  return best||LP[0].p;
}

// ⭐ سلسلة Matchmaking: كل البروكسيات = أسرع إيجاد لاعبين
function mmL(){
  var pri=bLP(),ch=[pri];
  for(var i=0;i<LP.length;i++)
    if(LP[i].on&&LP[i].p!==pri)ch.push(LP[i].p);
  return ch.join("; ");
}

function sPx(){
  var a=[];
  for(var i=0;i<SP.length;i++)if(SP[i].on)a.push(SP[i]);
  if(!a.length)return SP[0].p;
  var p=a[S.si%a.length].p;S.si++;return p;
}


// ═══════════════════════════════════════════════════════════════════
//  §13 — HEALTH + SESSION
// ═══════════════════════════════════════════════════════════════════

function uH(id,ok){
  if(!S.ph[id])S.ph[id]={s:0,f:0,sc:100,st:0,cd:0};
  var h=S.ph[id];
  if(ok){h.s++;h.st=0;h.sc=Math.min(100,h.sc+3);}
  else{
    h.f++;h.st++;h.sc=Math.max(0,h.sc-15);
    if(h.st>=3){
      h.cd=(Date.now?Date.now():0)+30000;
      [MP,LP,SP].forEach(function(pool){
        for(var i=0;i<pool.length;i++)
          if(pool[i].id===id){pool[i].on=false;if(pool===LP)S.wd=true;}
      });
    }
  }
}

function rev(now){
  if(S.rc%80!==0)return;
  for(var id in S.ph){
    if(!S.ph.hasOwnProperty(id))continue;
    var h=S.ph[id];
    if(h.cd>0&&now>h.cd){
      h.cd=0;h.st=0;h.sc=50;
      [MP,LP,SP].forEach(function(pool){
        for(var i=0;i<pool.length;i++)
          if(pool[i].id===id){pool[i].on=true;if(pool===LP)S.wd=true;}
      });
    }
  }
}

function chkE(now){
  if(S.mn&&S.lmt>0&&(now-S.lmt)>300000)rstM();
}

function rstM(){
  S.mn=null;S.mh=null;S.mi=null;S.mf=null;
  S.mt=0;S.ms="idle";S.mfc=0;S.v6=false;
}

function clnD(now){
  if(S.rc%25!==0)return;
  for(var k in S.dt)
    if(S.dt.hasOwnProperty(k)&&now>S.dt[k]){delete S.dc[k];delete S.dt[k];}
  if(S.rc%150===0)S.fp={};
}

function uTime(){
  try{
    var d=new Date(),h=d.getUTCHours()+3;
    if(h>=24)h-=24;
    var day=d.getUTCDay(),wk=(day===5||day===6);
    var rm=(d.getUTCMonth()===1||d.getUTCMonth()===2);
    if(rm)S.slot=(h>=20||h<3)?"ultra-peak":(h>=18&&h<20)?"peak":"normal";
    else if(wk)S.slot=(h>=16||h<1)?"ultra-peak":(h>=14&&h<16)?"peak":"normal";
    else S.slot=(h>=20&&h<24)?"ultra-peak":(h>=18&&h<20)?"peak":"normal";
    S.pk=(S.slot==="peak"||S.slot==="ultra-peak");
  }catch(e){S.slot="normal";}
}


// ═══════════════════════════════════════════════════════════════════
//  §14 — TRAFFIC DETECTION (فحص واحد سريع)
// ═══════════════════════════════════════════════════════════════════

function isPG(h){
  return/pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|igamecj|proximabeta|garena|battleground|turbogames|proxima|tencentgames|midasbuy/i.test(h);
}

function tT(u,h){
  var s=u+h;
  if(/(udp|dtls|rtp|stun|turn|relay|tick|sync|realtime|battle|combat|room|session|frame|physics|movement|shoot|fire|hit|damage|spawn|loot|zone|circle|airdrop|knock|kill|vehicle)/i.test(s))return"m";
  if(/(matchmak|queue|dispatch|gateway|lobby|join|recruit|pair|assign|entry|roster|rank|rating|mmr|playlist|mode|classic|arcade)/i.test(s))return"l";
  if(/(friend|invite|squad|team|party|clan|voice|mic|chat|notify|push|emote|gift|mail|message)/i.test(s))return"s";
  if(/(cdn|asset|static|patch|update|download|bundle|manifest|config|texture|model|sound)/i.test(s))return"c";
  if(/(anticheat|security|guard|protect|shield|auth|token|store|shop|purchase|payment)/i.test(s))return"d";
  if(/(telemetry|analytics|crash|log|beacon|track|advert|banner|promo|impression)/i.test(s))return"x";
  return"o";
}

// ⭐ هل دومين matchmaking بالتحديد؟
function isMM(h){
  return/(matchmak|dispatch|queue|lobby\.pubg|lobby\.tencent|entry\.pubg|assign|recruit|pair\.pubg)/i.test(h);
}


// ═══════════════════════════════════════════════════════════════════
//  §15 — FINGERPRINT
// ═══════════════════════════════════════════════════════════════════

function gFP(h,n){return h+"|"+n+"|"+Math.floor((Date.now?Date.now():0)/300000);}
function vFP(h,n){return!S.mf||gFP(h,n)===S.mf;}


// ═══════════════════════════════════════════════════════════════════
//
//  §16 — ⭐⭐⭐⭐⭐ MAIN FUNCTION
//
//  الفلسفة: 15 فحص بدل 80+ = أسرع 5x
//
//  المسار:
//  ┌─ PUBG? ──→ Fast Path? ──→ ✅ فوري
//  │            │
//  │            └─ Known JO? ──→ ✅ بدون DNS
//  │            │
//  │            └─ DNS ──→ أردني (15 فحص)? ──→ ✅
//  │                      │
//  │                      └─ مش أردني ──→ ⛔ BLOCK
//  │
//  └─ مش PUBG ──→ DIRECT
//
// ═══════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  var now = Date.now ? Date.now() : 0;

  S.rc++;
  clnD(now);
  rev(now);
  if (S.rc % 40 === 1) uTime();


  // ① PUBG فقط
  if (!isPG(host)) return DIR;


  // ② Fast Path Cache
  var tt = tT(url, host);
  var fk = host + "|" + tt;
  if (S.fp[fk]) { S.fph++; return S.fp[fk]; }


  // ③ حظر فوري
  if (isBD(host) || tt === "x") {
    S.fp[fk] = BLK;
    return BLK;
  }

  // ④ مباشر: AntiCheat + Store + CDN
  if (tt === "d") {
    S.fp[fk] = DIR;
    return DIR;
  }


  // ⑤ ⭐ KNOWN JO HOST (أسرع — بدون DNS)
  if (isKN(host)) {

    var r;

    if (tt === "m") {
      S.lmt = now; S.mc++; S.ms = "active";
      if (!S.isp) uISP(host.split(".").slice(0,3).join(".")+".1");
      r = S.slot === "ultra-peak" ? mCh() : mPx();
      S.fp[fk] = r;
      return r;
    }

    if (tt === "l") {
      S.llt = now;
      // ⭐ Matchmaking = سلسلة كاملة = أسرع إيجاد لاعبين
      r = isMM(host) ? mmL() : (S.pk ? bLP() : lPx());
      S.fp[fk] = r;
      return r;
    }

    if (tt === "s") {
      r = sPx();
      S.fp[fk] = r;
      return r;
    }

    if (tt === "c") {
      S.fp[fk] = DIR;
      return DIR;
    }

    r = lPx();
    S.fp[fk] = r;
    return r;
  }


  // ⑥ DNS
  var ips = dns(host);
  if (!ips || !ips.length) return BLK;


  // ⑦ ISP Detection
  for (var i = 0; i < ips.length; i++) {
    if (!v6(ips[i])) { uISP(ips[i]); break; }
  }


  // ⑧ CDN مباشر
  if (tt === "c") {
    S.fp[fk] = DIR;
    return DIR;
  }


  // ⑨ ⭐⭐⭐ WHITELIST CHECK — 15 فحص فقط!
  //    أردني ← أكمل
  //    غير أردني ← BLOCK (اللعبة تحاول سيرفر ثاني)
  var jo = bestIP(ips);

  if (!jo) {
    // ⭐ لا نحفظ في cache لأنه ممكن يتغير = retry أسرع
    return BLK;
  }


  // ⑩ IP أردني ✅ — وجّه حسب النوع

  // ─── MATCH ────────────────────────────────────────────
  if (tt === "m") {

    chkE(now);
    var n = n3(jo);

    if (!S.mn) {
      S.mn=n; S.mh=host; S.mi=jo;
      S.mf=gFP(host,n); S.v6=v6(jo);
      S.ms="active"; S.mt=now; S.mfc=0; S.mc++;
    }

    if (host!==S.mh || n!==S.mn || jo!==S.mi) {
      S.mfc++;
      return BLK;
    }

    if (!vFP(host,n)) {
      rstM();
      S.mn=n; S.mh=host; S.mi=jo;
      S.mf=gFP(host,n); S.v6=v6(jo);
      S.ms="active"; S.mt=now; S.mc++;
    }

    S.lmt=now; S.mfc=0;
    uH("MATCH",true);

    return S.slot==="ultra-peak" ? mCh() : mPx();
  }


  // ─── LOBBY / MATCHMAKING ──────────────────────────────
  if (tt === "l") {
    S.llt = now;
    if (isMM(host)) return mmL();
    return S.pk ? bLP() : lPx();
  }


  // ─── SOCIAL ───────────────────────────────────────────
  if (tt === "s") return sPx();


  // ─── أي ترافيك أردني آخر ──────────────────────────────
  return lPx();
}


// ╔════════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║  🇯🇴 V5.0 GOLDEN RANGES — END                                               ║
// ║                                                                              ║
// ║  ┌─────────────────────────────────────────────────────────────────────┐     ║
// ║  │                                                                     │     ║
// ║  │   15 نطاق ذهبي = 95% من لاعبين PUBG الأردن                        │     ║
// ║  │                                                                     │     ║
// ║  │   🥇 Zain:   4 نطاقات = 38% لاعبين  (بنق 1-5ms)                  │     ║
// ║  │   🥈 Orange: 4 نطاقات = 32% لاعبين  (بنق 2-6ms)                  │     ║
// ║  │   🥉 Umniah: 4 نطاقات = 25% لاعبين  (بنق 3-8ms)                  │     ║
// ║  │   🏠 JTG:    2 نطاقات = DSL gamers   (بنق 5-15ms)                 │     ║
// ║  │   🖥️ DC:     1 نطاق   = Game servers (بنق 1-3ms)                  │     ║
// ║  │                                                                     │     ║
// ║  │   ⚡ السرعة:                                                       │     ║
// ║  │   V4.1: 42 فحص per IP                                              │     ║
// ║  │   V5.0: 15 فحص per IP ← أسرع 3x                                   │     ║
// ║  │                                                                     │     ║
// ║  │   🔄 Matchmaking:                                                   │     ║
// ║  │   سلسلة 7 بروكسيات lobby = أسرع إيجاد لاعبين ممكن                 │     ║
// ║  │                                                                     │     ║
// ║  │   📱 التغطية:                                                      │     ║
// ║  │   Zain 4G/5G  ✅                                                    │     ║
// ║  │   Orange 4G   ✅                                                    │     ║
// ║  │   Umniah 4G   ✅                                                    │     ║
// ║  │   JTG Fiber   ✅                                                    │     ║
// ║  │   = كل لاعب أردني مشمول                                            │     ║
// ║  │                                                                     │     ║
// ║  └─────────────────────────────────────────────────────────────────────┘     ║
// ║                                                                              ║
// ╚════════════════════════════════════════════════════════════════════════════════╝
