// ╔══════════════════════════════════════════════════════════════════════╗
// ║  PUBG Mobile — Jordan First PAC Proxy Script v8.0                  ║
// ║  Updated: 2026-04-01                                               ║
// ║  Mode: Jordan-first + official fallback                            ║
// ║                                                                      ║
// ║  Design goals:                                                      ║
// ║   • Expand lobby / recruitment / friends / clan / invites          ║
// ║   • Expand match / relay / realtime / arena / training coverage    ║
// ║   • Keep anti-cheat DIRECT                                          ║
// ║   • Prefer Jordan IPs first                                          ║
// ║   • Do NOT break official PUBG services if DNS resolves non-JO      ║
// ║   • Match traffic uses dual-proxy failover                          ║
// ║                                                                      ║
// ║  v8.0 Changes:                                                      ║
// ║   • 70+ verified Jordan IPv4 ranges (Orange, Zain, Umniah,         ║
// ║     Batelco, Damamax, JTC, VTEL — residential + mobile)            ║
// ║   • 20 verified Jordan IPv6 blocks using /29 + /32 precision       ║
// ║   • IPv6 prefix matcher rewritten — handles ANY bit-length         ║
// ║   • Fixed fe80::/10 blocking (was broken due to nibble constraint)  ║
// ║   • Data sourced from RIPE NCC / ipinfo.io / ScaniteX 2026-04-01   ║
// ╚══════════════════════════════════════════════════════════════════════╝

var PROXY  = “PROXY 46.185.131.218:20001”;
var PROXY2 = “PROXY 46.185.131.218:20002; PROXY 46.185.131.218:20001”;
var DIRECT = “DIRECT”;
var BLOCK  = “PROXY 0.0.0.0:0”;

// ———————————————————————
// TYPE DETECTION
// ———————————————————————

function isIPv6(ip) { return ip && ip.indexOf(”:”) !== -1; }
function isIPv4(ip) { return ip && ip.indexOf(”.”) !== -1 && ip.indexOf(”:”) === -1; }

// ———————————————————————
// DNS RESOLUTION
// ———————————————————————

function resolveHost(host) {
var ipv6 = null, ipv4 = null;
try {
var all = dnsResolveEx(host);
if (all) {
var list = all.split(”;”);
for (var i = 0; i < list.length; i++) {
var a = list[i].trim();
if (!ipv6 && isIPv6(a)) ipv6 = a;
if (!ipv4 && isIPv4(a)) ipv4 = a;
}
}
} catch (e) {}

if (!ipv6 && !ipv4) {
try {
var v4 = dnsResolve(host);
if (v4 && isIPv4(v4)) ipv4 = v4;
} catch (e) {}
}

return ipv6 || ipv4 || null;
}

// ———————————————————————
// IPv6 NORMALIZATION
// ———————————————————————

function expandIPv6(address) {
if (!address) return null;
address = address.toLowerCase().trim();

if (address.charAt(0) === “[”) {
var rb = address.lastIndexOf(”]”);
if (rb === -1) return null;
address = address.slice(1, rb).trim();
}

if (address.indexOf(”:”) === -1) return null;

var v4m = address.match(/^((?:[0-9a-f]{0,4}:)+)(\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})$/);
if (v4m) {
var quad = v4m[2].split(”.”);
if (quad.length !== 4) return null;
var b1 = parseInt(quad[0], 10), b2 = parseInt(quad[1], 10);
var b3 = parseInt(quad[2], 10), b4 = parseInt(quad[3], 10);
if (b1 > 255 || b2 > 255 || b3 > 255 || b4 > 255) return null;
var h1 = (“0” + b1.toString(16)).slice(-2) + (“0” + b2.toString(16)).slice(-2);
var h2 = (“0” + b3.toString(16)).slice(-2) + (“0” + b4.toString(16)).slice(-2);
address = v4m[1] + h1 + “:” + h2;
}

var dc = address.split(”::”);
if (dc.length > 2) return null;

var groups = [];
if (dc.length === 2) {
var L = (dc[0] !== “”) ? dc[0].split(”:”) : [];
var R = (dc[1] !== “”) ? dc[1].split(”:”) : [];
var fill = 8 - L.length - R.length;
if (fill < 0) return null;
groups = L.slice();
for (var i = 0; i < fill; i++) groups.push(“0”);
groups = groups.concat(R);
} else {
groups = address.split(”:”);
}

if (groups.length !== 8) return null;
for (var k = 0; k < 8; k++) {
var g = groups[k];
if (!g) g = “0”;
if (g.length > 4 || !/^[0-9a-f]{1,4}$/.test(g)) return null;
while (g.length < 4) g = “0” + g;
groups[k] = g;
}
return groups.join(”:”);
}

function ipv6ToHex32(expanded) {
return expanded.replace(/:/g, “”);
}

// ———————————————————————
// IPv6 PREFIX MATCHING — supports ANY prefix length (e.g. /29, /10)
// Replaces the old nibble-only function which silently skipped /29, /10
// ———————————————————————

function isInIPv6Prefix(expanded, baseExpanded, plen) {
if (!expanded || !baseExpanded) return false;
var a = ipv6ToHex32(expanded);
var b = ipv6ToHex32(baseExpanded);
var fullNibbles = Math.floor(plen / 4);
var extraBits   = plen % 4;
if (a.substring(0, fullNibbles) !== b.substring(0, fullNibbles)) return false;
if (extraBits === 0) return true;
var mask = (0xF << (4 - extraBits)) & 0xF;
return (parseInt(a.charAt(fullNibbles), 16) & mask) ===
(parseInt(b.charAt(fullNibbles), 16) & mask);
}

// ———————————————————————
// IPv4 UTILITIES
// ———————————————————————

function ipv4ToInt(ip) {
var p = ip.split(”.”);
if (p.length !== 4) return 0;
return ((parseInt(p[0], 10) << 24) |
(parseInt(p[1], 10) << 16) |
(parseInt(p[2], 10) << 8)  |
parseInt(p[3], 10)) >>> 0;
}

function isInIPv4Range(ip, net, plen) {
var mask = plen === 0 ? 0 : (0xFFFFFFFF << (32 - plen)) >>> 0;
return (ipv4ToInt(ip) & mask) === (ipv4ToInt(net) & mask);
}

// ———————————————————————
// JORDAN IPv6 PREFIXES
// Source: ScaniteX / RIPE NCC — updated 2026-04-01
// All blocks verified as Jordanian (residential, mobile, business)
// Now uses bit-accurate matching — /29 and /32 blocks fully supported
// ———————————————————————

var JO_IPV6_PREFIXES = [
// ── RIPE pool assigned to Jordan entities ────────────────────────
[“2001:32c0::”,  29],   // Jordan multi-operator pool

// ── Orange Jordan / GO Jordan (AS8376) ──────────────────────────
[“2a00:18d8::”,  29],   // Orange Jordan — ADSL, Fiber, VDSL
[“2a00:18d0::”,  32],   // Jordan Telecom PSC / JTC (AS8697)
[“2a00:4620::”,  32],   // Jordan operator block
[“2a00:76e0::”,  32],   // Jordan operator block
[“2a00:b860::”,  32],   // Jordan operator block
[“2a00:caa0::”,  32],   // Jordan operator block

// ── Zain Jordan (AS48832) + pool (AS42912) ───────────────────────
[“2a01:1d0::”,   29],   // Zain Jordan pool
[“2a01:9700::”,  29],   // Zain Jordan — mobile + home broadband
[“2a01:e240::”,  29],   // Zain Jordan extended
[“2a01:ee40::”,  29],   // Zain Jordan extended

// ── Umniah / Batelco Jordan (AS9038) ────────────────────────────
[“2a03:6b00::”,  29],   // Umniah — mobile + broadband (covers all sub-/32s)
[“2a03:6d00::”,  32],   // Umniah / Batelco Jordan block

// ── Other verified Jordan operators ─────────────────────────────
[“2a02:9c0::”,   29],   // Jordan ISP pool
[“2a02:2558::”,  29],   // Jordan ISP pool
[“2a02:25d8::”,  32],   // Jordan ISP block
[“2a02:5b60::”,  32],   // Jordan ISP block
[“2a02:c040::”,  29],   // Jordan ISP pool
[“2a02:e680::”,  29],   // Jordan ISP pool
[“2a02:f0c0::”,  29]    // Jordan ISP pool
];

function isJordanIPv6(fullIP) {
for (var i = 0; i < JO_IPV6_PREFIXES.length; i++) {
var base = expandIPv6(JO_IPV6_PREFIXES[i][0]);
if (base && isInIPv6Prefix(fullIP, base, JO_IPV6_PREFIXES[i][1])) return true;
}
return false;
}

// ———————————————————————
// JORDAN IPv4 RANGES
// Source: ipinfo.io ASN data + ScaniteX — verified 2026-04-01
// Covers: Orange/GO, Zain, Umniah, Batelco, Damamax/VTEL, JTC, more
// ———————————————————————

var JO_IPV4_RANGES = [
// ── Orange Jordan / GO Jordan (AS8376) — ADSL, Fiber, WiMAX ─────
[“46.185.128.0”,  17],  // Orange Jordan main pool
[“86.108.0.0”,    17],  // Orange Jordan residential
[“92.253.0.0”,    17],  // Orange Jordan residential
[“94.249.0.0”,    17],  // Orange Jordan residential
[“149.200.128.0”, 17],  // GO.com.jo broadband pool
[“37.202.64.0”,   18],  // Orange Jordan ADSL
[“79.173.192.0”,  18],  // Orange Jordan ADSL / fiber
[“194.165.128.0”, 19],  // Orange Jordan business
[“213.186.160.0”, 19],  // Orange Jordan infrastructure
[“80.10.64.0”,    20],  // Orange Jordan (legacy Orange block)
[“217.23.32.0”,   20],  // Orange Jordan infrastructure
[“185.98.220.0”,  22],  // Orange Jordan allocated
[“185.98.224.0”,  22],  // Jordan Telecom / Orange
[“80.10.8.0”,     21],  // Orange Jordan legacy
[“80.10.48.0”,    21],  // Orange Jordan legacy
[“80.10.144.0”,   21],  // Orange Jordan legacy
[“80.10.168.0”,   21],  // Orange Jordan legacy

// ── Jordan Telecom PSC / JTC (AS8697) — backbone / legacy ───────
[“212.34.0.0”,    19],  // JTC dial-up, DSL legacy
[“213.139.32.0”,  19],  // JTC infrastructure
[“2.17.24.0”,     22],  // JTC / Akamai edge

// ── Zain Jordan (AS48832) — mobile + home broadband ──────────────
[“176.29.0.0”,    16],  // Zain Jordan broadband (largest block)
[“176.28.128.0”,  17],  // Zain Jordan mobile
[“46.32.96.0”,    19],  // Zain Jordan broadband
[“94.142.32.0”,   19],  // Zain Jordan broadband
[“188.247.64.0”,  19],  // Zain Jordan extended pool
[“77.245.0.0”,    20],  // Zain Jordan (Fastlink legacy)
[“80.90.160.0”,   20],  // Zain Jordan (Fastlink legacy)
[“87.238.128.0”,  21],  // Zain Jordan mobile
[“185.109.192.0”, 22],  // Zain Jordan allocated

// ── Umniah / Batelco Jordan (AS9038) — mobile + broadband ────────
[“46.248.192.0”,  19],  // Umniah mobile + broadband
[“95.172.192.0”,  19],  // Umniah mobile + broadband
[“109.107.224.0”, 19],  // Umniah extended pool
[“37.220.112.0”,  20],  // Umniah residential
[“46.23.112.0”,   20],  // Umniah mobile
[“91.186.224.0”,  19],  // Umniah / Batelco Jordan
[“92.241.32.0”,   19],  // Umniah mobile
[“212.35.64.0”,   20],  // Umniah mobile
[“212.35.80.0”,   20],  // Umniah mobile
[“212.118.0.0”,   20],  // Umniah mobile
[“212.118.16.0”,  20],  // Batelco Jordan
[“5.198.240.0”,   21],  // Umniah / Batelco Jordan
[“37.44.32.0”,    21],  // Umniah mobile
[“37.152.0.0”,    21],  // Umniah mobile
[“85.159.216.0”,  21],  // Umniah mobile
[“91.106.96.0”,   20],  // Umniah residential
[“94.127.208.0”,  21],  // Umniah / Batelco Jordan

// ── Zain / Al-mouakhah (AS42912) — Zain enterprise + broadband ───
[“178.77.128.0”,  18],  // Al-mouakhah / Zain Jordan
[“37.123.64.0”,   19],  // Al-mouakhah / Zain Jordan
[“37.17.192.0”,   20],  // Al-mouakhah / Zain Jordan
[“95.141.208.0”,  20],  // Al-mouakhah / Zain Jordan
[“93.191.176.0”,  21],  // Al-mouakhah / Zain Jordan
[“185.160.236.0”, 22],  // Al-mouakhah / Zain Jordan

// ── Damamax / AL-HADATHEH (AS47887) — fixed broadband ISP ────────
[“82.212.64.0”,   18],  // Damamax residential
[“188.123.160.0”, 19],  // Damamax extended
[“81.28.112.0”,   20],  // Damamax residential
[“185.175.248.0”, 22],  // Damamax allocated

// ── Verified via ScaniteX / additional Jordan blocks ─────────────
[“2.59.52.0”,     22],  // Jordan operator
[“5.45.128.0”,    20],  // Jordan Telecom / operator
[“5.199.184.0”,   22],  // Jordan operator
[“37.75.144.0”,   21],  // Jordan operator (covers old /23 + /22)
[“37.252.222.0”,  24],  // Jordan operator
[“45.142.196.0”,  22],  // Jordan hosting / ISP
[“62.72.160.0”,   19],  // VTEL / Aqaba ISP
[“79.134.128.0”,  19],  // Jordan ISP
[“193.188.64.0”,  19],  // Jordan ISP

// ── Legacy / smaller Jordan ISPs & operators ──────────────────────
[“45.67.60.0”,    23],  // Jordan hosting
[“57.83.24.0”,    21],  // Jordan operator
[“81.21.8.0”,     21],  // Jordan ISP
[“81.52.144.0”,   20],  // Jordan ISP
[“81.52.224.0”,   21],  // Jordan ISP
[“81.253.96.0”,   19],  // Jordan ISP
[“81.253.240.0”,  20],  // Jordan ISP
[“84.18.32.0”,    18],  // Jordan ISP
[“87.236.232.0”,  21],  // Jordan ISP
[“89.28.216.0”,   21],  // Jordan ISP
[“90.84.64.0”,    19],  // Jordan ISP
[“93.93.144.0”,   21],  // Jordan ISP
[“93.95.200.0”,   21]   // Jordan ISP
];

function isJordanIPv4(ip) {
for (var i = 0; i < JO_IPV4_RANGES.length; i++) {
if (isInIPv4Range(ip, JO_IPV4_RANGES[i][0], JO_IPV4_RANGES[i][1])) return true;
}
return false;
}

// ———————————————————————
// BLOCKED / RESERVED
// ———————————————————————

var BLOCKED_V4 = [
[“0.0.0.0”,     8],
[“10.0.0.0”,    8],
[“100.64.0.0”,  10],
[“127.0.0.0”,   8],
[“169.254.0.0”, 16],
[“172.16.0.0”,  12],
[“192.168.0.0”, 16]
];

function isBlockedIPv4(ip) {
for (var i = 0; i < BLOCKED_V4.length; i++) {
if (isInIPv4Range(ip, BLOCKED_V4[i][0], BLOCKED_V4[i][1])) return true;
}
return false;
}

var BLOCKED_V6_PREFIXES = [
[“2001:0db8::”, 32],  // documentation
[“2001:0000::”, 32],  // Teredo
[“2002::”,      16],  // 6to4
[“fe80::”,      10],  // link-local  (fixed: was silently skipped in v7)
[“ff00::”,       8]   // multicast
];

function isBlockedIPv6(fullIP) {
if (!fullIP) return true;
for (var i = 0; i < BLOCKED_V6_PREFIXES.length; i++) {
var base = expandIPv6(BLOCKED_V6_PREFIXES[i][0]);
if (base && isInIPv6Prefix(fullIP, base, BLOCKED_V6_PREFIXES[i][1])) return true;
}
return false;
}

// ———————————————————————
// DOMAIN GROUPS
// ———————————————————————

var ANTICHEAT_DOMAINS = [
“battleye.com”,
“gamesafe.com”,
“gamesafe.qq.com”,
“ace.qq.com”,
“tp2.qq.com”,
“aegis.qq.com”
];

var CDN_DOMAINS = [
“cloudfront.net”, “akamai.net”, “akamaiedge.net”, “edgesuite.net”,
“fastly.net”, “cloudflare.com”, “cloudflare.net”,
“appsflyer.com”, “adjust.com”, “branch.io”,
“firebase.com”, “firebaseio.com”, “firebase.google.com”,
“crashlytics.com”, “sentry.io”, “bugsnag.com”,
“google-analytics.com”, “googleapis.com”, “googletagmanager.com”
];

var PUBG_DOMAINS = [
“pubgmobile.com”,
“support.pubgmobile.com”,
“esports.pubgmobile.com”,
“pubgmobile.helpshift.com”,
“pubg.com”,
“krafton.com”,
“levelinfinite.com”,
“pass.levelinfinite.com”,
“pre-pass.levelinfinite.com”,
“storepass.levelinfinite.com”,
“proximabeta.com”,
“tencent.com”,
“tencentgames.com”,
“qq.com”,
“qcloud.com”,
“myqcloud.com”,
“tencentcs.com”,
“igamecj.com”,
“gpubgm.com”,
“lightspeed-studios.com”,
“lightspeedstudios.com”
];

function hostMatchesDomainList(host, list) {
var h = host.toLowerCase();
for (var i = 0; i < list.length; i++) {
var d = list[i];
if (h === d) return true;
if (h.length > d.length &&
h.charAt(h.length - d.length - 1) === “.” &&
h.slice(h.length - d.length) === d) return true;
}
return false;
}

function isAntiCheat(host) { return hostMatchesDomainList(host, ANTICHEAT_DOMAINS); }
function isCDN(host)       { return hostMatchesDomainList(host, CDN_DOMAINS); }
function isPUBGDomain(host){ return hostMatchesDomainList(host, PUBG_DOMAINS); }

// ———————————————————————
// URL / TRAFFIC CLASSIFICATION
// ———————————————————————

function extractPort(url) {
try {
var m = url.match(/^[a-z]+://[^/:]+:(\d{1,5})/i);
if (m) return parseInt(m[1], 10);
if (url.indexOf(“https:”) === 0) return 443;
if (url.indexOf(“http:”)  === 0) return 80;
} catch (e) {}
return 0;
}

function containsAny(s, arr) {
for (var i = 0; i < arr.length; i++) {
if (s.indexOf(arr[i]) !== -1) return true;
}
return false;
}

var MATCH_PREFIXES = [
“gs”,“gsvr”,“bsvr”,“gamesvr”,“gamesrv”,“svr”,“srv”,
“relay”,“battle”,“match”,“realtime”,“rt”,“udp”,“tcp”,
“gs1”,“gs2”,“gs3”,“gs4”,“gs5”,“tdm”,“arcade”,“arena”,
“combat”,“payload”,“infection”,“metro”,“training”,
“ranked”,“classic”,“war”,“survive”,“teamdeathmatch”
];

var LOBBY_PREFIXES = [
“login”,“auth”,“account”,“user”,“profile”,“lobby”,
“gate”,“gateway”,“session”,“region”,“api”,“store”,“shop”,
“social”,“friend”,“friends”,“clan”,“guild”,“chat”,“config”,
“update”,“patch”,“news”,“event”,“asset”,“version”,
“matchmak”,“queue”,“notification”,“rank”,“mission”,“reward”,
“achievement”,“leaderboard”,“royalpass”,“rp”,“season”,
“inventory”,“support”,“recruit”,“recruitment”,“team”,“invite”,
“party”,“group”,“follow”,“mail”,“msg”,“community”
];

var MATCH_URL_HINTS = [
“/match”,”/battle”,”/relay”,”/realtime”,”/gs”,”/arena”,”/tdm”,
“/payload”,”/infection”,”/metro”,”/training”,”/ranked”,”/classic”
];

var LOBBY_URL_HINTS = [
“/lobby”,”/login”,”/auth”,”/profile”,”/friend”,”/friends”,”/social”,
“/clan”,”/guild”,”/chat”,”/recruit”,”/recruitment”,”/invite”,”/party”,
“/team”,”/group”,”/rank”,”/season”,”/rp”,”/royalpass”,”/inventory”,
“/reward”,”/mission”,”/leaderboard”,”/event”,”/notice”,”/mail”,”/shop”,
“/store”,”/support”
];

function classifyTraffic(url, host) {
var port = extractPort(url);
var h    = host.toLowerCase();
var dot  = h.indexOf(”.”);
var sub  = dot !== -1 ? h.slice(0, dot) : h;

if (port === 7086 || port === 7087)              return “match”;
if (port >= 7000  && port <= 7099)               return “match”;
if (port >= 8000  && port <= 8999)               return “match”;
if (port >= 10000 && port <= 19999)              return “match”;
if (port >= 20000 && port <= 39999)              return “match”;

for (var i = 0; i < MATCH_PREFIXES.length; i++) {
var p = MATCH_PREFIXES[i];
if (sub === p || sub.indexOf(p) === 0) return “match”;
}

for (var j = 0; j < LOBBY_PREFIXES.length; j++) {
var lp = LOBBY_PREFIXES[j];
if (sub === lp || sub.indexOf(lp) === 0) return “lobby”;
}

var u = url.toLowerCase();
if (containsAny(u, MATCH_URL_HINTS)) return “match”;
if (containsAny(u, LOBBY_URL_HINTS)) return “lobby”;

return “general”;
}

// ———————————————————————
// ROUTING HELPERS
// ———————————————————————

function chooseProxyByTraffic(trafficType) {
return (trafficType === “match”) ? PROXY2 : PROXY;
}

function isJordanIP(ip) {
if (!ip) return false;

if (isIPv4(ip)) {
if (isBlockedIPv4(ip)) return false;
return isJordanIPv4(ip);
}

if (isIPv6(ip)) {
var fullIP = expandIPv6(ip);
if (!fullIP) return false;
if (isBlockedIPv6(fullIP)) return false;
return isJordanIPv6(fullIP);
}

return false;
}

function isBogonOrBadIP(ip) {
if (!ip) return false;
if (isIPv4(ip)) return isBlockedIPv4(ip);
if (isIPv6(ip)) {
var fullIP = expandIPv6(ip);
if (!fullIP) return true;
return isBlockedIPv6(fullIP);
}
return true;
}

// ———————————————————————
// MAIN
// ———————————————————————

function FindProxyForURL(url, host) {
if (isPlainHostName(host)) return DIRECT;

var h = host.toLowerCase();

// Anti-cheat stays direct
if (isAntiCheat(h)) return DIRECT;

// Telemetry / CDN direct
if (isCDN(h)) return DIRECT;

// Unrelated traffic direct
if (!isPUBGDomain(h)) return DIRECT;

var trafficType = classifyTraffic(url, h);

// Try to resolve the destination IP
var ip = resolveHost(h);

// If resolved to bogon / reserved => hard block
if (ip && isBogonOrBadIP(ip)) return BLOCK;

// Jordan-first: if resolved to a confirmed Jordanian IP, route via proxy
if (ip && isJordanIP(ip)) {
return chooseProxyByTraffic(trafficType);
}

// Official fallback: if PUBG service resolves outside Jordan or
// PAC engine cannot resolve, keep it functional via proxy
if (trafficType === “match”) return PROXY;
if (trafficType === “lobby”) return PROXY2;

// General official endpoints via primary proxy
return PROXY;
}
