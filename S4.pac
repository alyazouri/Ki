(function () {
"use strict";

/*══════════════════════════════════════════════════════
BLACKBOX AGENT 8.0 – JORDAN OPTIMIZED PAC
Cleaned + Faster + Updated Jordan Ranges
══════════════════════════════════════════════════════*/

var CONFIG = {
    MATCH_PROXIES: [
        { host: "46.185.131.218", port: 20001, protocol: "PROXY" },
        { host: "212.35.66.45",   port: 20001, protocol: "PROXY" },
        { host: "176.29.100.1",   port: 20001, protocol: "PROXY" }
    ],

    LOBBY_POOL: [
        { host: "212.35.66.45",   port: 8085, protocol: "PROXY", weight: 5 },
        { host: "212.35.66.45",   port: 8181, protocol: "PROXY", weight: 3 },
        { host: "46.185.131.218", port: 443,  protocol: "PROXY", weight: 2 },
        { host: "176.29.100.1",   port: 8085, protocol: "PROXY", weight: 4 }
    ],

    DNS_TTL:          600000,
    ROUTE_TTL:        120000,
    CLIENT_IP_TTL:    180000,
    REGION_LOCK_TTL:  2700000,
    ENABLE_CLIENT_IP_GATING: true,
    ENABLE_MIDDLE_EAST_MATCH_BOOST: true
};

/*════════════════ STATE ════════════════*/

var STATE = {
    dnsCache: {},
    routeCache: {},
    clientIpCache: { value: null, time: 0 },

    regionLock: {
        value: null,
        expiry: 0
    }
};

/*════════════════ FAST KEYWORDS ════════════════*/

var PUBG_HOST_KEYS = [
    "pubg", "krafton", "tencent", "tencentgames", "levelinfinite",
    "proxima", "battlegrounds", "pubgmobile", "livik", "igamecj"
];

var MODE_KEYS = {
    ANTICHEAT: [
        "anticheat", "security", "verify", "shield", "ban",
        "guard", "protect", "captcha", "challenge", "fairplay"
    ],
    MATCHMAKING: [
        "matchmak", "sessioncreate", "sessionjoin", "regionselect", "quickmatch",
        "queue", "ready", "startmatch", "spawnisland", "partyjoin",
        "partyinvite", "roster", "teamup", "squadfill"
    ],
    RANKED: [
        "ranked", "leaderboard", "seasonrank", "rankpush",
        "mmr", "conqueror", "ace", "crown", "diamond"
    ],
    UNRANKED: [
        "unranked", "casual", "nonranked", "funmatch", "eventmode", "arcade"
    ],
    CORE_COMBAT: [
        "battle", "classic", "arena", "payload", "zombie", "metro",
        "tdm", "fpp", "tpp", "domination", "assault", "gungame"
    ],
    LOBBY: [
        "lobby", "mainmenu", "ui", "home", "navigation", "menu",
        "inventory", "warehouse", "backpack", "loadout", "collection",
        "store", "shop", "crate", "spin", "draw", "redeem",
        "event", "reward", "mission", "wow", "worldofwonder",
        "recruit", "clan", "crew", "friend", "social", "voice"
    ],
    LOW: [
        "cdn", "asset", "patch", "analytics", "telemetry",
        "crash", "log", "report", "config", "download"
    ]
};

/*════════════════ UPDATED JORDAN IPv4 CIDRs ════════════════*/
/* من الصور: الرسمية + النطاقات الناقصة الظاهرة */

var JORDAN_CIDRS = [
    "5.45.128.0/20",
    "5.198.240.0/21",
    "5.199.184.0/22",
    "37.17.192.0/20",
    "37.123.64.0/19",
    "37.202.64.0/18",
    "37.220.112.0/20",
    "46.23.112.0/20",
    "46.32.96.0/19",
    "46.185.128.0/17",
    "46.248.192.0/19",
    "62.72.160.0/19",
    "77.245.0.0/20",
    "79.134.128.0/19",
    "79.173.192.0/18",
    "80.90.160.0/20",
    "82.212.64.0/19",
    "87.236.232.0/21",
    "89.249.64.0/20",
    "91.186.0.0/18",
    "94.127.208.0/21",
    "94.142.32.0/19",
    "109.237.192.0/20",
    "176.29.0.0/16",
    "176.57.0.0/19",
    "176.57.48.0/20",
    "176.241.64.0/21",
    "178.16.96.0/21",
    "178.20.184.0/21",
    "178.77.128.0/18",
    "185.14.132.0/22",
    "185.27.118.0/23",
    "185.30.248.0/22",
    "185.33.28.0/22",
    "185.51.212.0/22",
    "185.57.120.0/22",
    "185.80.24.0/22",
    "185.80.104.0/22",
    "185.96.68.0/22",
    "185.98.220.0/21",
    "185.109.120.0/22",
    "185.159.180.0/22",
    "185.160.236.0/22",
    "185.193.176.0/22",
    "185.197.176.0/22",
    "185.200.128.0/22",
    "188.123.160.0/19",
    "188.247.64.0/19",
    "193.17.53.0/24",
    "193.108.134.0/23",
    "193.188.64.0/19",
    "193.189.148.0/24",
    "193.203.24.0/23",
    "194.104.95.0/24",
    "212.35.64.0/19",
    "212.118.0.0/19",
    "213.139.32.0/19",
    "213.186.160.0/19",
    "217.23.32.0/20",
    "217.29.240.0/20",
    "217.144.0.0/20",

    /* النطاقات الناقصة الظاهرة بالصورة الخامسة */
    "81.21.0.0/20",
    "93.191.176.0/21",
    "95.141.208.0/20"
];

/*════════════════ PUBG / MIDDLE EAST RANGES ════════════════*/

var MIDDLE_EAST_CIDRS = [
    "13.228.0.0/14",
    "18.136.0.0/15",
    "20.174.0.0/16",
    "40.120.0.0/15",
    "47.246.0.0/16",
    "47.252.0.0/16",
    "52.76.0.0/15",
    "138.1.0.0/16",
    "149.130.0.0/15"
];

/*════════════════ OPTIONAL IPv6 LIST (REFERENCE) ════════════════*/
/* للاحتفاظ فقط؛ معظم PAC engines تعتمد dnsResolve IPv4 بشكل أساسي */
var JORDAN_IPV6_CIDRS = [
    "2a00:caa0::/32",
    "2a01:1d0::/29",
    "2a01:9700::/29",
    "2a01:e240::/29",
    "2a01:ee40::/29",
    "2a02:09c0::/29",
    "2a02:2558::/29",
    "2a03:b640::/32",
    "2a04:6200::/29",
    "2a05:74c0::/29",
    "2a05:7500::/29",
    "2a06:9bc0::/29",
    "2a06:bd80::/29",
    "2a07:0140::/29",
    "2a0a:2740::/29",
    "2a0c:39c0::/29",
    "2a0d:cf40::/29",
    "2a13:8d40::/29"
];

/*════════════════ HELPERS ════════════════*/

function isValidIPv4(ip) {
    if (!ip || typeof ip !== "string") return false;
    var p = ip.split(".");
    if (p.length !== 4) return false;

    for (var i = 0; i < 4; i++) {
        if (!/^\d{1,3}$/.test(p[i])) return false;
        var n = parseInt(p[i], 10);
        if (n < 0 || n > 255) return false;
    }
    return true;
}

function ipToLong(ip) {
    var p = ip.split(".");
    return (
        ((parseInt(p[0], 10) << 24) >>> 0) +
        ((parseInt(p[1], 10) << 16) >>> 0) +
        ((parseInt(p[2], 10) << 8) >>> 0) +
        (parseInt(p[3], 10) >>> 0)
    ) >>> 0;
}

function maskFromBits(bits) {
    if (bits <= 0) return 0;
    if (bits >= 32) return 0xFFFFFFFF;
    return (0xFFFFFFFF << (32 - bits)) >>> 0;
}

function compileCidrs(list) {
    var out = [];
    var seen = {};

    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (seen[item]) continue;
        seen[item] = true;

        var parts = item.split("/");
        if (parts.length !== 2) continue;

        var ip = parts[0];
        var bits = parseInt(parts[1], 10);
        if (!isValidIPv4(ip)) continue;
        if (isNaN(bits) || bits < 0 || bits > 32) continue;

        var mask = maskFromBits(bits);
        var net = (ipToLong(ip) & mask) >>> 0;
        out.push([net, mask]);
    }
    return out;
}

var JORDAN_RANGES = compileCidrs(JORDAN_CIDRS);
var MIDDLE_EAST_RANGES = compileCidrs(MIDDLE_EAST_CIDRS);

function inCompiledRanges(ip, ranges) {
    if (!isValidIPv4(ip)) return false;
    var x = ipToLong(ip);

    for (var i = 0; i < ranges.length; i++) {
        if ((x & ranges[i][1]) === ranges[i][0]) return true;
    }
    return false;
}

function isBlockedIP(ip) {
    if (!ip || ip.indexOf(":") !== -1) return true;

    return (
        /^127\./.test(ip) ||
        /^10\./.test(ip) ||
        /^192\.168\./.test(ip) ||
        /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip) ||
        /^169\.254\./.test(ip) ||
        /^0\./.test(ip) ||
        /^100\.(6[4-9]|[7-9]\d|1[0-1]\d|12[0-7])\./.test(ip)
    );
}

function fastContainsAny(text, list) {
    for (var i = 0; i < list.length; i++) {
        if (text.indexOf(list[i]) !== -1) return true;
    }
    return false;
}

function isPubgHost(host) {
    var h = String(host || "").toLowerCase();
    return fastContainsAny(h, PUBG_HOST_KEYS);
}

function normalizeForMatch(s) {
    return String(s || "").toLowerCase().replace(/[\s_\-\.\/\\:?=&]+/g, "");
}

function classify(url, host) {
    var x = normalizeForMatch(url) + "|" + normalizeForMatch(host);

    if (fastContainsAny(x, MODE_KEYS.ANTICHEAT))   return "ANTICHEAT";
    if (fastContainsAny(x, MODE_KEYS.MATCHMAKING)) return "MATCHMAKING";
    if (fastContainsAny(x, MODE_KEYS.RANKED))      return "RANKED";
    if (fastContainsAny(x, MODE_KEYS.UNRANKED))    return "UNRANKED";
    if (fastContainsAny(x, MODE_KEYS.CORE_COMBAT)) return "CORE_COMBAT";
    if (fastContainsAny(x, MODE_KEYS.LOBBY))       return "LOBBY";
    if (fastContainsAny(x, MODE_KEYS.LOW))         return "LOW";
    return "UNKNOWN";
}

function isCriticalMode(mode) {
    return (
        mode === "MATCHMAKING" ||
        mode === "RANKED" ||
        mode === "UNRANKED" ||
        mode === "CORE_COMBAT"
    );
}

function hashString(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = (h * 16777619) >>> 0;
    }
    return h >>> 0;
}

function proxyString(p) {
    return p.protocol + " " + p.host + ":" + p.port;
}

function weightedPick(pool, seed) {
    var total = 0;
    var i;

    for (i = 0; i < pool.length; i++) total += (pool[i].weight || 1);

    var n = hashString(seed) % total;

    for (i = 0; i < pool.length; i++) {
        n -= (pool[i].weight || 1);
        if (n < 0) return i;
    }

    return 0;
}

function buildChainFromIndex(pool, firstIndex) {
    var out = [];
    var used = {};

    if (pool[firstIndex]) {
        out.push(proxyString(pool[firstIndex]));
        used[firstIndex] = true;
    }

    for (var i = 0; i < pool.length; i++) {
        if (!used[i]) out.push(proxyString(pool[i]));
    }

    out.push("DIRECT");
    return out.join("; ");
}

function getCachedDNS(host) {
    var now = Date.now();
    var c = STATE.dnsCache[host];
    if (c && (now - c.time) < CONFIG.DNS_TTL) return c.ip;

    var ip = null;
    try {
        ip = dnsResolve(host);
    } catch (e) {
        ip = null;
    }

    if (!isValidIPv4(ip)) return null;

    STATE.dnsCache[host] = { ip: ip, time: now };
    return ip;
}

function getClientIPv4() {
    var now = Date.now();
    if (STATE.clientIpCache.value && (now - STATE.clientIpCache.time) < CONFIG.CLIENT_IP_TTL) {
        return STATE.clientIpCache.value;
    }

    var ip = null;
    try {
        ip = myIpAddress();
    } catch (e) {
        ip = null;
    }

    if (!isValidIPv4(ip)) return null;

    STATE.clientIpCache = { value: ip, time: now };
    return ip;
}

function clientIsJordan() {
    if (!CONFIG.ENABLE_CLIENT_IP_GATING) return true;

    var ip = getClientIPv4();
    if (!ip) return true; /* fallback open if local detection unavailable */

    return inCompiledRanges(ip, JORDAN_RANGES);
}

function getRouteCache(key) {
    var now = Date.now();
    var c = STATE.routeCache[key];
    if (c && (now - c.time) < CONFIG.ROUTE_TTL) return c.value;
    return null;
}

function setRouteCache(key, value) {
    STATE.routeCache[key] = { value: value, time: Date.now() };
}

function setRegionLock(route) {
    STATE.regionLock.value = route;
    STATE.regionLock.expiry = Date.now() + CONFIG.REGION_LOCK_TTL;
}

function getRegionLock() {
    if (STATE.regionLock.value && Date.now() < STATE.regionLock.expiry) {
        return STATE.regionLock.value;
    }
    STATE.regionLock.value = null;
    STATE.regionLock.expiry = 0;
    return null;
}

/*════════════════ MAIN PAC ════════════════*/

function FindProxyForURL(url, host) {
    try {
        host = String(host || "").toLowerCase();

        /* 1) سرعة: تجاهل أي شيء ليس PUBG من البداية */
        if (!isPubgHost(host)) return "DIRECT";

        /* 2) فعّل فقط لعملاء الأردن إن أردت targeting أدق */
        if (!clientIsJordan()) return "DIRECT";

        /* 3) لو في region lock فعّال */
        var locked = getRegionLock();
        if (locked) return locked;

        /* 4) استعمل host نفسه إذا كان IP، وإلا resolve */
        var ip = isValidIPv4(host) ? host : getCachedDNS(host);
        if (!ip) return "DIRECT";
        if (isBlockedIP(ip)) return "DIRECT";

        var isJordanDest = inCompiledRanges(ip, JORDAN_RANGES);
        var isMiddleEast  = CONFIG.ENABLE_MIDDLE_EAST_MATCH_BOOST && inCompiledRanges(ip, MIDDLE_EAST_RANGES);

        /* لو الهدف ليس أردنيًا وليس من سيرفرات المنطقة */
        if (!isJordanDest && !isMiddleEast) return "DIRECT";

        var mode = classify(url, host);
        var cacheKey = host + "|" + mode + "|" + ip;
        var cached = getRouteCache(cacheKey);
        if (cached) return cached;

        /* مكافحة الغش أو ملفات منخفضة الأهمية = مباشر */
        if (mode === "ANTICHEAT" || mode === "LOW") {
            setRouteCache(cacheKey, "DIRECT");
            return "DIRECT";
        }

        /* Matchmaking */
        if (mode === "MATCHMAKING") {
            var mmRoute = buildChainFromIndex(CONFIG.MATCH_PROXIES, 0);
            setRouteCache(cacheKey, mmRoute);
            setRegionLock(mmRoute);
            return mmRoute;
        }

        /* Ranked / Core / ME */
        if (isCriticalMode(mode) || isMiddleEast) {
            var idx = weightedPick(CONFIG.MATCH_PROXIES, host + "|" + ip);
            var criticalRoute = buildChainFromIndex(CONFIG.MATCH_PROXIES, idx);
            setRouteCache(cacheKey, criticalRoute);
            setRegionLock(criticalRoute);
            return criticalRoute;
        }

        /* Lobby-like */
        if (mode === "LOBBY" || mode === "UNKNOWN") {
            var lidx = weightedPick(CONFIG.LOBBY_POOL, host);
            var lobbyRoute = buildChainFromIndex(CONFIG.LOBBY_POOL, lidx);
            setRouteCache(cacheKey, lobbyRoute);
            return lobbyRoute;
        }

        return "DIRECT";
    } catch (e) {
        return "DIRECT";
    }
}

/* debug */
this.BLACKBOX_AGENT_VERSION = "8.0";
this.BLACKBOX_CLASSIFY = classify;
this.BLACKBOX_CLIENT_IP = getClientIPv4;

})();
