// ╔══════════════════════════════════════════════════════╗
// ║   PUBG Jordan PAC — v3.0 Final                       ║
// ║   Optimizations: DNS Cache · Hash Lookup · Binary    ║
// ║   Search · Known Server Ranges · Smart Fallback      ║
// ╚══════════════════════════════════════════════════════╝

// ======================================================
// PROXY DEFINITIONS
// ======================================================
var P1     = "PROXY 46.185.131.218:20001";                              // Lobby / General — single hop
var P2     = "PROXY 46.185.131.218:20001; PROXY 46.185.131.218:20002"; // Match — 20001 primary
var P3     = "PROXY 46.185.131.218:20002; PROXY 46.185.131.218:20001"; // Social — 20002 primary
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ======================================================
// ① DNS CACHE — أكبر تحسين للأداء
//    يمنع إعادة resolve لنفس الـ host في الجلسة الواحدة
// ======================================================
var _DNS = {};  // { "host": "ip" | null }

function resolveHost(host) {
    if (_DNS[host] !== undefined) return _DNS[host];  // cache hit

    var ip = null;
    try {
        var all = dnsResolveEx(host);
        if (all) {
            var parts = all.split(";");
            for (var i = 0; i < parts.length; i++) {
                var a = parts[i].trim();
                if (is4(a)) { ip = a; break; }  // أول IPv4 يكفي
            }
        }
    } catch(e) {}

    if (!ip) {
        try {
            var v = dnsResolve(host);
            if (v && is4(v)) ip = v;
        } catch(e) {}
    }

    _DNS[host] = ip;  // cache miss → store result (حتى لو null)
    return ip;
}

// ======================================================
// BASIC HELPERS
// ======================================================
function nh(h)   { return (h||"").toLowerCase(); }
function is4(ip) { return ip && ip.indexOf(".")!== -1 && ip.indexOf(":")===-1; }

function getPort(url) {
    try {
        var m = url.match(/^[a-z]+:\/\/[^\/:]+:(\d{1,5})/i);
        if (m) return parseInt(m[1], 10);
        var c = url.charCodeAt(4);
        if (c===115) return 443;  // https
        if (c===58)  return 80;   // http
    } catch(e) {}
    return 0;
}

// ======================================================
// ② HASH-BASED DOMAIN LOOKUP — O(1) بدلاً من O(n)
// ======================================================

// دالة تبني hash object من مصفوفة domains
function buildSet(arr) {
    var o = {};
    for (var i = 0; i < arr.length; i++) o[arr[i]] = 1;
    return o;
}

// البحث في الـ hash: يفحص الـ host نفسه ثم كل suffix
function inSet(host, set) {
    var h = nh(host);
    if (set[h]) return true;
    var dot = h.indexOf(".");
    while (dot !== -1) {
        if (set[h.slice(dot + 1)]) return true;
        dot = h.indexOf(".", dot + 1);
    }
    return false;
}

var PUBG_SET = buildSet([
    "pubgmobile.com","pubg.com","krafton.com",
    "levelinfinite.com","proximabeta.com",
    "tencent.com","tencentgames.com",
    "qq.com","myqcloud.com","qcloud.com","tencentcs.com",
    "lightspeedstudios.com","igamecj.com","gpubgm.com",
    "xd.com","garena.com","garenanow.com",
    "battleye.com","gamesafe.com","amsoveasea.com",
    "gcloud.com","wesdk.com"
]);

var CDN_SET = buildSet([
    "cloudfront.net","akamai.net","akamaiedge.net","edgesuite.net",
    "fastly.net","cloudflare.com","cloudflare.net",
    "appsflyer.com","adjust.com","branch.io",
    "firebase.com","firebaseio.com",
    "crashlytics.com","sentry.io","bugsnag.com",
    "helpshift.com","bugly.qq.com"
]);

// ======================================================
// ASSET DOWNLOAD DETECTION
// ======================================================
var ASSET_SUBS_SET = buildSet([
    "filecdn","dlied","dlied1","dlied2","dlied3","dlied4",
    "dlied5","dlied6","hot","hotfix","patch","patchcdn",
    "res","resource","download","dl","pkg"
]);
var ASSET_EXT = [".apk",".obb",".zip",".pak",".bundle",".mp4",".wav",".ogg"];

function isAsset(url, host) {
    var h = nh(host), di = h.indexOf(".");
    if (di !== -1 && ASSET_SUBS_SET[h.slice(0, di)]) return true;
    var lu = (url||"").toLowerCase();
    for (var j = 0; j < ASSET_EXT.length; j++) {
        var idx = lu.lastIndexOf(ASSET_EXT[j]);
        if (idx !== -1) {
            var nc = lu.charCodeAt(idx + ASSET_EXT[j].length);
            if (!nc || nc===63 || nc===35) return true;
        }
    }
    return false;
}

// ======================================================
// IPv4 UTILITIES
// ======================================================
function ip4int(ip) {
    var p = ip.split(".");
    return ((parseInt(p[0],10)<<24)|(parseInt(p[1],10)<<16)|
             (parseInt(p[2],10)<<8)|parseInt(p[3],10))>>>0;
}
function inRange4(ipInt, netInt, pl) {
    var mask = pl===0 ? 0 : (0xFFFFFFFF<<(32-pl))>>>0;
    return (ipInt & mask) === (netInt & mask);
}

// ======================================================
// ③ PRE-COMPUTED INTEGER RANGES — تُحسب مرة واحدة
//    بدلاً من تحويل string→int في كل طلب
// ======================================================
function buildRanges(arr) {
    var out = [];
    for (var i = 0; i < arr.length; i++)
        out.push([ip4int(arr[i][0]), arr[i][1]]);
    return out;
}

// ======================================================
// JORDAN IPv4 — مرتّبة: /16 أولاً لأسرع hit احصائياً
// ======================================================
var JO4_RAW = [
    // /16
    ["37.152.0.0",16],["46.32.0.0",16],["86.108.0.0",16],
    ["89.148.0.0",16],["95.160.0.0",16],["176.11.0.0",16],
    ["176.29.0.0",16],["188.71.0.0",16],
    // /17
    ["37.44.0.0",17],["37.110.0.0",17],["46.185.128.0",17],
    ["77.245.0.0",17],["78.40.0.0",17],["79.134.0.0",17],
    ["79.173.0.0",17],["82.213.0.0",17],["85.233.128.0",17],
    ["91.186.0.0",17],["94.249.0.0",17],["109.107.128.0",17],
    ["188.53.0.0",17],["195.229.0.0",17],["212.118.0.0",17],
    ["5.1.0.0",17],["5.45.128.0",17],
    // /18
    ["80.77.128.0",18],["82.212.64.0",18],["92.253.64.0",18],
    ["178.63.64.0",18],["194.165.128.0",18],["194.165.192.0",18],
    ["195.222.64.0",18],["213.139.192.0",18],["37.44.64.0",18],
    ["188.247.0.0",18],
    // /19 → /22
    ["62.72.160.0",19],["80.90.160.0",19],["85.115.32.0",19],
    ["88.85.224.0",19],["178.20.160.0",19],["193.188.64.0",19],
    ["193.106.96.0",19],["212.37.32.0",19],["213.186.160.0",19],
    ["81.28.16.0",20],
    ["91.239.104.0",21],["193.107.136.0",21],["194.29.136.0",21],
    ["185.56.136.0",22],["185.117.68.0",22],["185.136.204.0",22],
    ["185.37.128.0",22],["185.244.24.0",22]
];
var JO4 = buildRanges(JO4_RAW);

function isJO4(ipInt) {
    for (var i = 0; i < JO4.length; i++)
        if (inRange4(ipInt, JO4[i][0], JO4[i][1])) return true;
    return false;
}

// ======================================================
// ④ KNOWN TENCENT / PUBG MIDDLE EAST SERVER RANGES
//    هذه السيرفرات تُوجَّه مباشرةً عبر PROXY2 بدون
//    الحاجة لفحص الـ DNS أو Jordan check
//    (Tencent Cloud — Singapore / HK / ME nodes)
// ======================================================
var KNOWN_GAME_RAW = [
    ["43.128.0.0",15],    // Tencent Cloud Asia-Pacific
    ["43.132.0.0",14],    // Tencent Cloud Global
    ["43.136.0.0",13],    // Tencent Cloud SEA
    ["43.153.0.0",16],    // Tencent Cloud Edge
    ["49.51.0.0",16],     // Tencent Cloud Middle East
    ["170.106.0.0",16],   // Tencent Cloud (NA/EU/ME)
    ["162.62.0.0",16],    // Tencent Cloud Global CDN
    ["152.136.0.0",16],   // Tencent Cloud Mainland
    ["119.28.0.0",14]     // Tencent legacy game servers
];
var KNOWN_GAME = buildRanges(KNOWN_GAME_RAW);

function isKnownGameServer(ipInt) {
    for (var i = 0; i < KNOWN_GAME.length; i++)
        if (inRange4(ipInt, KNOWN_GAME[i][0], KNOWN_GAME[i][1])) return true;
    return false;
}

// ======================================================
// BLOCKED IPv4 (private + bogon + high-latency regions)
// ======================================================
var BL4_RAW = [
    ["0.0.0.0",8],["10.0.0.0",8],["100.64.0.0",10],
    ["127.0.0.0",8],["169.254.0.0",16],["172.16.0.0",12],
    ["192.168.0.0",16],
    ["2.144.0.0",14],["2.176.0.0",12],
    ["5.52.0.0",15],["5.56.0.0",13],
    ["5.160.0.0",14],["5.200.0.0",16]
];
var BL4 = buildRanges(BL4_RAW);

function isBlocked4(ipInt) {
    for (var i = 0; i < BL4.length; i++)
        if (inRange4(ipInt, BL4[i][0], BL4[i][1])) return true;
    return false;
}

// ======================================================
// TRAFFIC CLASSIFICATION — Port-first fast path
// ======================================================
var LOBBY_PORT = {80:1, 443:1, 8080:1, 8443:1};

var MATCH_SUB = buildSet([
    "gs","gsvr","bsvr","gamesvr","gamesrv","svr","srv",
    "relay","battle","match","realtime","rt","gs1","gs2",
    "gs3","tdm","arcade","arena","combat","dedicated","ds","game"
]);
var LOBBY_SUB = buildSet([
    "login","auth","account","user","profile","lobby","gate",
    "gateway","session","region","api","store","shop","config",
    "update","patch","news","event","version","matchmak",
    "queue","rank","leaderboard"
]);
var SOCIAL_SUB = buildSet([
    "invite","recruit","clan","chat","friend","team","party",
    "notification","social","msg","message","im","push",
    "whisper","guild","group"
]);

function getSub(host) {
    var h = nh(host), di = h.indexOf(".");
    return di !== -1 ? h.slice(0, di) : h;
}

// subMatch: يدعم suffixes رقمية مثل gs1, gs2, relay3
function subMatch(sub, set) {
    if (set[sub]) return true;
    var stripped = sub.replace(/\d+$/, "");
    return stripped !== sub && set[stripped];
}

function classify(url, host) {
    var port = getPort(url);

    // Fast-path: numeric port checks (cheapest)
    if (port===7086 || port===7087)   return "match";
    if (port>=8000  && port<=8009)    return "match";
    if (port>=10000 && port<=17999)   return "match";
    if (port>=20000 && port<=20100)   return "social";
    if (LOBBY_PORT[port])             return "lobby";

    // Subdomain checks
    var sub = getSub(host);
    if (subMatch(sub, SOCIAL_SUB))    return "social";
    if (subMatch(sub, MATCH_SUB))     return "match";
    if (subMatch(sub, LOBBY_SUB))     return "lobby";

    return "general";
}

// ======================================================
// ROUTING TABLE
// ======================================================
function route(type) {
    if (type === "match")  return P2;
    if (type === "social") return P3;
    return P1;                  // lobby + general → single hop
}

// ======================================================
// ⑤ MAIN — Decision Tree المُحسَّن
// ======================================================
function FindProxyForURL(url, host) {
    host = nh(host);

    // ── Step 1: Intranet ──────────────────────────────
    if (isPlainHostName(host)) return DIRECT;

    // ── Step 2: Non-PUBG → لا تعديل ─────────────────
    if (!inSet(host, PUBG_SET)) return DIRECT;

    // ── Step 3: CDN + Assets → DIRECT دائماً ─────────
    if (inSet(host, CDN_SET))   return DIRECT;
    if (isAsset(url, host))     return DIRECT;

    // ── Step 4: Classify traffic type ─────────────────
    var type = classify(url, host);

    // ── Step 5: DNS resolve (with cache) ──────────────
    var raw = resolveHost(host);
    if (!raw) return route(type);   // DNS failure → best-effort routing

    var ipInt = ip4int(raw);

    // ── Step 6: Block private/bogon/Iran ──────────────
    if (isBlocked4(ipInt)) return BLOCK;

    // ── Step 7: ★ Jordan server → DIRECT (0 hops) ★ ──
    if (isJO4(ipInt)) return DIRECT;

    // ── Step 8: ★ Known Tencent/PUBG servers ★ ───────
    //    نطاقات معروفة → توجيه فوري بدون تحقق إضافي
    if (isKnownGameServer(ipInt)) return route(type);

    // ── Step 9: All other servers → smart routing ─────
    return route(type);
}
