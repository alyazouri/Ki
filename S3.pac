(function () {
"use strict";

/*══════════════════════════════════════════════════════
BLACKBOX AGENT 7.1 – JORDAN PURE FIBER & MOBILE
Full ISP Coverage | Ultra-Low Stable Ping
── v7.1 UPDATED: PUBG MOBILE 4.3 Coverage Expanded ──
══════════════════════════════════════════════════════*/

const CONFIG = {
    /* ── Primary Match Proxy (Closest to JO) ── */
    MATCH_PROXIES: [
        { host: "46.185.131.218", port: 20001, protocol: "PROXY", latency: 0 },
        { host: "212.35.66.45",   port: 20001, protocol: "PROXY", latency: 0 },
        { host: "176.29.100.1",   port: 20001, protocol: "PROXY", latency: 0 }
    ],

    /* ── Lobby / WOW / Inventory / Social Pool ── */
    LOBBY_POOL: [
        { host: "212.35.66.45",   port: 8085, protocol: "PROXY", weight: 5 },
        { host: "212.35.66.45",   port: 8181, protocol: "PROXY", weight: 3 },
        { host: "46.185.131.218", port: 443,  protocol: "PROXY", weight: 2 },
        { host: "176.29.100.1",   port: 8085, protocol: "PROXY", weight: 4 }
    ],

    /* ── Timing ── */
    CACHE_TTL:           600000,
    SESSION_TIMEOUT:     60000,
    RATE_WINDOW:         5000,
    RATE_LIMIT:          200,
    JITTER_WINDOW:       10,
    STICKY_DURATION:     120000,
    PING_CHECK_INTERVAL: 15000,
    REGION_LOCK_TTL:     3600000
};

/*════════════════ SESSION STATE ════════════════*/

const SESSION = {
    matchIP:        null,
    matchHost:      null,
    matchMode:      null,
    matchTimestamp: null,
    stickyProxy:    null,
    stickyExpiry:   0,
    dnsCache:       new Map(),
    rateTracker:    new Map(),
    proxyLatency:   new Map(),
    jitterBuffer:   [],
    connectionPool: new Map(),
    requestCount:   0,

    regionLocked:   false,
    regionProxy:    null,
    regionExpiry:   0
};

/*════════════════ UTILITY FUNCTIONS ════════════════*/

function isValidIPv4(ip) {
    if (!ip || typeof ip !== "string") return false;
    var p = ip.split(".");
    if (p.length !== 4) return false;
    for (var i = 0; i < p.length; i++) {
        if (!/^\d{1,3}$/.test(p[i])) return false;
        var n = parseInt(p[i], 10);
        if (n < 0 || n > 255) return false;
    }
    return true;
}

function ipToLong(ip) {
    var parts = ip.split(".");
    return (
        ((parseInt(parts[0], 10) << 24) |
         (parseInt(parts[1], 10) << 16) |
         (parseInt(parts[2], 10) << 8)  |
         parseInt(parts[3], 10)) >>> 0
    );
}

function cidrToMask(bits) {
    return (~0 << (32 - bits)) >>> 0;
}

/*══════════════════════════════════════════════════════
COMPLETE JORDAN IP RANGES
Orange | Zain | Umniah | Damamax | JTC | Wi-Tribe
══════════════════════════════════════════════════════*/

var JORDAN_RANGES = [
    ["37.44.0.0", 15],
    ["37.110.0.0", 16],
    ["37.252.0.0", 16],
    ["77.245.0.0", 16],
    ["82.212.64.0", 18],
    ["82.212.128.0", 17],
    ["85.115.64.0", 18],
    ["85.115.128.0", 17],
    ["88.85.0.0", 17],
    ["88.85.128.0", 17],
    ["91.186.0.0", 16],
    ["176.29.0.0", 16],
    ["193.188.64.0", 18],
    ["193.188.96.0", 19],
    ["194.165.128.0", 17],
    ["212.34.0.0", 16],
    ["213.139.64.0", 18],
    ["213.186.160.0", 19],
    ["5.1.0.0", 16],
    ["5.62.0.0", 16],
    ["31.166.0.0", 15],
    ["37.44.8.0", 21],
    ["46.32.0.0", 15],
    ["46.248.0.0", 16],
    ["78.139.0.0", 16],
    ["79.134.0.0", 16],
    ["79.173.0.0", 16],
    ["89.148.0.0", 16],
    ["95.160.0.0", 15],
    ["178.253.0.0", 16],

    ["94.127.0.0", 16],
    ["94.249.0.0", 16],
    ["178.77.0.0", 16],
    ["185.117.68.0", 22],
    ["185.141.36.0", 22],
    ["185.181.112.0", 22],
    ["185.236.132.0", 22],
    ["188.247.0.0", 16],
    ["188.248.0.0", 14],
    ["193.37.152.0", 22],
    ["193.227.0.0", 16],
    ["212.37.0.0", 16],
    ["212.118.0.0", 16],
    ["5.45.0.0", 16],
    ["31.222.0.0", 16],
    ["37.123.0.0", 16],
    ["46.185.0.0", 16],
    ["62.72.160.0", 19],
    ["80.90.160.0", 19],
    ["86.108.0.0", 14],
    ["109.107.0.0", 16],
    ["149.255.0.0", 16],
    ["176.57.0.0", 16],
    ["185.56.108.0", 22],

    ["149.200.0.0", 16],
    ["185.70.64.0", 22],
    ["185.105.0.0", 22],
    ["185.136.192.0", 22],
    ["185.165.116.0", 22],
    ["185.175.124.0", 22],
    ["185.179.8.0", 22],
    ["193.109.56.0", 21],
    ["193.109.236.0", 22],
    ["195.95.192.0", 19],
    ["212.35.64.0", 18],
    ["212.35.128.0", 17],
    ["213.9.0.0", 16],
    ["5.0.0.0", 16],
    ["31.9.0.0", 16],
    ["37.220.0.0", 16],
    ["46.34.0.0", 16],
    ["79.99.0.0", 16],
    ["79.142.0.0", 16],
    ["92.253.0.0", 16],
    ["109.162.0.0", 15],
    ["178.16.0.0", 16],
    ["188.71.0.0", 16],

    ["62.215.0.0", 16],
    ["82.205.0.0", 16],
    ["86.56.0.0", 16],
    ["185.24.140.0", 22],
    ["185.124.144.0", 22],
    ["185.188.48.0", 22],
    ["195.74.128.0", 18],
    ["195.191.0.0", 16],

    ["185.40.4.0", 22],
    ["185.48.56.0", 22],
    ["185.82.148.0", 22],
    ["185.84.220.0", 22],
    ["185.98.78.0", 23],
    ["185.100.112.0", 22],
    ["185.116.52.0", 22],
    ["185.132.36.0", 22],
    ["185.145.200.0", 22],
    ["185.155.20.0", 22],
    ["185.168.172.0", 22],
    ["185.171.56.0", 22],
    ["185.177.228.0", 22],
    ["185.183.32.0", 22],
    ["185.195.236.0", 22],
    ["185.199.72.0", 22],
    ["185.203.116.0", 22],
    ["185.217.172.0", 22],
    ["185.232.172.0", 22],
    ["185.244.20.0", 22],
    ["185.249.196.0", 22],

    ["141.164.0.0", 16],
    ["156.197.0.0", 16],
    ["160.177.0.0", 16],
    ["196.29.0.0", 16],
    ["196.205.0.0", 16],
    ["197.37.0.0", 16]
];

/*════════════════ PUBG MIDDLE EAST SERVER RANGES ════════════════*/

var PUBG_ME_RANGES = [
    ["13.228.0.0",  14],
    ["18.136.0.0",  15],
    ["52.76.0.0",   15],
    ["47.252.0.0",  16],
    ["47.246.0.0",  16],
    ["149.130.0.0", 15],
    ["138.1.0.0",   16],
    ["20.174.0.0",  16],
    ["40.120.0.0",  15]
];

/*════════════════ JORDAN IP CHECK ════════════════*/

function inJordan(ip) {
    if (!isValidIPv4(ip)) return false;
    var target = ipToLong(ip);
    for (var i = 0; i < JORDAN_RANGES.length; i++) {
        var range = JORDAN_RANGES[i];
        var network = ipToLong(range[0]);
        var mask = cidrToMask(range[1]);
        if ((target & mask) === (network & mask)) return true;
    }
    return false;
}

/*════════════════ MIDDLE EAST SERVER CHECK ════════════════*/

function isMiddleEastServer(ip) {
    if (!isValidIPv4(ip)) return false;
    var target = ipToLong(ip);
    for (var i = 0; i < PUBG_ME_RANGES.length; i++) {
        var network = ipToLong(PUBG_ME_RANGES[i][0]);
        var mask = cidrToMask(PUBG_ME_RANGES[i][1]);
        if ((target & mask) === (network & mask)) return true;
    }
    return false;
}

/*════════════════ RATE LIMITER ════════════════*/

function rateLimit(host) {
    var now = Date.now();
    var arr = SESSION.rateTracker.get(host) || [];
    var recent = [];
    for (var i = 0; i < arr.length; i++) {
        if (now - arr[i] < CONFIG.RATE_WINDOW) recent.push(arr[i]);
    }
    recent.push(now);
    SESSION.rateTracker.set(host, recent);
    return recent.length <= CONFIG.RATE_LIMIT;
}

/*════════════════ SECURE DNS WITH PRE-WARM ════════════════*/

function secureDNS(host) {
    var now = Date.now();
    var cached = SESSION.dnsCache.get(host);

    if (cached && (now - cached.time < CONFIG.CACHE_TTL)) {
        return cached.ip;
    }

    var ip = dnsResolve(host);
    if (!isValidIPv4(ip)) return null;

    if (cached && cached.ip !== ip && (now - cached.time < 15000)) {
        return null;
    }

    SESSION.dnsCache.set(host, { ip: ip, time: now });
    return ip;
}

/*════════════════ BLOCKED IP CHECK ════════════════*/

function isBlockedIP(ip) {
    if (!ip || ip.indexOf(":") !== -1) return true;
    var patterns = [
        /^127\./,
        /^10\./,
        /^192\.168\./,
        /^172\.(1[6-9]|2\d|3[0-1])\./,
        /^169\.254\./,
        /^0\./,
        /^100\.(6[4-9]|[7-9]\d|1[0-2]\d)\./
    ];
    for (var i = 0; i < patterns.length; i++) {
        if (patterns[i].test(ip)) return true;
    }
    return false;
}

/*════════════════ TRAFFIC CLASSIFICATION – PUBG MOBILE 4.3 ════════════════*/

var MODES = {
    MATCHMAKING: /matchmak|session.?create|session.?join|region.?select|player.?match|quickmatch|queue|ready|start.?match|spawn.?island|party.?join|party.?invite|roster|team.?up|squad.?fill/i,

    RANKED: /ranked|tier|points?|rating|mmr|conqueror|ace|crown|diamond|platinum|gold|silver|bronze|leaderboard|season.?rank|classic.?season|rank.?push/i,

    UNRANKED: /unranked|casual|normal|non.?ranked|fun.?match|event.?mode|themed.?mode|arcade|arena.?unranked/i,

    CORE_COMBAT: /match|battle|classic|arena|war|payload|zombie|metro|tdm|fpp|tpp|domination|assault|gun.?game|infect|aftermath|survive.?till.?dawn/i,

    UPDATE_43: /4\.3|v4\.3|430|evolving.?universe|class.?skills?|temporal.?vault|energy.?rank|spacetime|rail|racing.?club|music.?hall|wilderness.?fun/i,

    LOBBY_UI: /lobby|main.?menu|ui|ux|interface|home.?screen|navigation|menu.?revamp|layout|tab|button|panel|popup|entry.?point/i,

    INVENTORY_WAREHOUSE: /inventory|warehouse|vault|backpack|loadout|collection|showroom|vehicle.?showroom|outfit|wardrobe|gun.?skin|finish|material|item.?storage/i,

    STORE_MONETIZATION: /store|shop|uc|ag|crate|spin|draw|secret.?stash|mythic.?forge|royale.?pass|rpa18|premium.?crate|redeem|bundle|coupon/i,

    EVENTS_COLLABS: /event|anniversary|8th.?anniversary|card.?set|reward|mission|prize.?path|jujutsu|gojo|sukuna|mr\.?beast|onerepublic|lean/i,

    WOW: /world.?of.?wonder|wow|creation.?shop|creator|map.?editor|device|template|earnings|win.?win|wow.?dash|ticket|golden.?ticket|ugc/i,

    RECRUITMENT_SOCIAL: /recruit|recruitment|find.?teammate|looking.?for.?team|clan|crew|friend|social|voice|invite|community|guild/i,

    LOW: /cdn|asset|patch|analytics|telemetry|crash|log|report|config|update|download/i,

    ANTICHEAT: /anticheat|security|verify|shield|ban|guard|protect|captcha|challenge|fair.?play|detection/i
};

function classify(url, host) {
    var input = (String(url || "") + " " + String(host || "")).toLowerCase();

    if (MODES.ANTICHEAT.test(input))           return "ANTICHEAT";
    if (MODES.MATCHMAKING.test(input))         return "MATCHMAKING";
    if (MODES.RANKED.test(input))              return "RANKED";
    if (MODES.UNRANKED.test(input))            return "UNRANKED";
    if (MODES.CORE_COMBAT.test(input))         return "CORE_COMBAT";
    if (MODES.UPDATE_43.test(input))           return "UPDATE_43";
    if (MODES.LOBBY_UI.test(input))            return "LOBBY_UI";
    if (MODES.INVENTORY_WAREHOUSE.test(input)) return "INVENTORY_WAREHOUSE";
    if (MODES.STORE_MONETIZATION.test(input))  return "STORE_MONETIZATION";
    if (MODES.EVENTS_COLLABS.test(input))      return "EVENTS_COLLABS";
    if (MODES.WOW.test(input))                 return "WOW";
    if (MODES.RECRUITMENT_SOCIAL.test(input))  return "RECRUITMENT_SOCIAL";
    if (MODES.LOW.test(input))                 return "LOW";
    return "UNKNOWN";
}

function isCriticalMode(mode) {
    return mode === "MATCHMAKING" ||
           mode === "RANKED" ||
           mode === "UNRANKED" ||
           mode === "CORE_COMBAT";
}

function isLobbyLikeMode(mode) {
    return mode === "LOBBY_UI" ||
           mode === "INVENTORY_WAREHOUSE" ||
           mode === "STORE_MONETIZATION" ||
           mode === "EVENTS_COLLABS" ||
           mode === "WOW" ||
           mode === "RECRUITMENT_SOCIAL" ||
           mode === "UPDATE_43";
}

/*════════════════ PUBG HOST DETECTION (EXPANDED) ════════════════*/

function isPUBG(host) {
    return /(pubg|tencent|krafton|levelinfinite|proxima|tencentgames|battlegrounds|pubgmobile|vng\.com\.vn|livik|pubgpartner|pubgesports|pubgstudio)/i.test(host);
}

/*════════════════ JITTER STABILIZER ════════════════*/

function recordJitter(proxyKey) {
    var now = Date.now();
    if (SESSION.jitterBuffer.length >= CONFIG.JITTER_WINDOW) {
        SESSION.jitterBuffer.shift();
    }
    SESSION.jitterBuffer.push({ proxy: proxyKey, time: now });
}

function proxyString(entry) {
    return entry.protocol + " " + entry.host + ":" + entry.port;
}

function getStableProxy(candidates) {
    var now = Date.now();

    if (SESSION.stickyProxy && now < SESSION.stickyExpiry) {
        return SESSION.stickyProxy;
    }

    var best = null;
    var bestScore = Infinity;

    for (var i = 0; i < candidates.length; i++) {
        var key = candidates[i].host + ":" + candidates[i].port;
        var lat = SESSION.proxyLatency.get(key) || 50;
        var weight = candidates[i].weight || 1;
        var score = lat / weight;

        if (score < bestScore) {
            bestScore = score;
            best = candidates[i];
        }
    }

    if (!best) best = candidates[0];

    var result = proxyString(best);
    SESSION.stickyProxy = result;
    SESSION.stickyExpiry = now + CONFIG.STICKY_DURATION;

    recordJitter(result);
    return result;
}

/*════════════════ WEIGHTED LOBBY SELECTION ════════════════*/

function weightedLobby(host) {
    var total = 0;
    for (var i = 0; i < CONFIG.LOBBY_POOL.length; i++) {
        total += CONFIG.LOBBY_POOL[i].weight;
    }

    var hash = 0;
    for (var j = 0; j < host.length; j++) {
        hash = ((hash << 5) - hash) + host.charCodeAt(j);
        hash |= 0;
    }

    var val = Math.abs(hash) % total;

    for (var k = 0; k < CONFIG.LOBBY_POOL.length; k++) {
        if (val < CONFIG.LOBBY_POOL[k].weight) {
            return CONFIG.LOBBY_POOL[k].protocol + " " +
                   CONFIG.LOBBY_POOL[k].host + ":" +
                   CONFIG.LOBBY_POOL[k].port;
        }
        val -= CONFIG.LOBBY_POOL[k].weight;
    }

    return "DIRECT";
}

function getStableProxyFromPool(pool, sticky) {
    if (sticky === false) {
        var best = null;
        var bestScore = Infinity;

        for (var i = 0; i < pool.length; i++) {
            var key = pool[i].host + ":" + pool[i].port;
            var lat = SESSION.proxyLatency.get(key) || 50;
            var weight = pool[i].weight || 1;
            var score = lat / weight;

            if (score < bestScore) {
                bestScore = score;
                best = pool[i];
            }
        }

        if (!best) best = pool[0];
        return proxyString(best);
    }

    return getStableProxy(pool);
}

/*════════════════ REGION LOCK ════════════════*/

function lockRegion(proxy) {
    SESSION.regionLocked = true;
    SESSION.regionProxy = proxy;
    SESSION.regionExpiry = Date.now() + CONFIG.REGION_LOCK_TTL;
}

function getRegionLockedProxy() {
    if (SESSION.regionLocked && Date.now() < SESSION.regionExpiry) {
        return SESSION.regionProxy;
    }
    SESSION.regionLocked = false;
    SESSION.regionProxy = null;
    return null;
}

/*════════════════ CONNECTION POOL ════════════════*/

function getPooledConnection(host) {
    var pooled = SESSION.connectionPool.get(host);
    if (pooled && (Date.now() - pooled.time < CONFIG.SESSION_TIMEOUT)) {
        return pooled.proxy;
    }
    return null;
}

function setPooledConnection(host, proxy) {
    SESSION.connectionPool.set(host, { proxy: proxy, time: Date.now() });
}

/*════════════════ SESSION MANAGEMENT ════════════════*/

function validateSession(ip, host, mode) {
    if (!SESSION.matchTimestamp) return false;
    if ((Date.now() - SESSION.matchTimestamp) > CONFIG.SESSION_TIMEOUT) return false;
    if (SESSION.matchIP !== ip) return false;
    if (SESSION.matchMode !== mode) return false;
    return true;
}

function createSession(ip, host, mode) {
    SESSION.matchIP = ip;
    SESSION.matchHost = host;
    SESSION.matchMode = mode;
    SESSION.matchTimestamp = Date.now();
}

/*════════════════ FAILOVER CHAIN ════════════════*/

function buildFailoverChain(primary, pool) {
    var chain = primary;
    for (var i = 0; i < pool.length; i++) {
        var entry = proxyString(pool[i]);
        if (entry !== primary) {
            chain += "; " + entry;
        }
    }
    chain += "; DIRECT";
    return chain;
}

/*════════════════ MAIN PROXY FUNCTION ════════════════*/

function FindProxyForURL(url, host) {
    try {
        SESSION.requestCount++;

        if (!rateLimit(host)) return "DIRECT";
        if (!isPUBG(host)) return "DIRECT";

        var locked = getRegionLockedProxy();
        if (locked) return locked;

        var ip = secureDNS(host);
        if (!ip) return "DIRECT";
        if (isBlockedIP(ip)) return "DIRECT";

        if (!inJordan(ip)) {
            if (!isMiddleEastServer(ip)) return "DIRECT";
        }

        var pooled = getPooledConnection(host);
        var mode = classify(url, host);

        if (mode === "ANTICHEAT") return "DIRECT";

        /* MATCHMAKING */
        if (mode === "MATCHMAKING") {
            var mmProxy = proxyString(CONFIG.MATCH_PROXIES[0]);
            setPooledConnection(host, mmProxy);

            var mmChain = buildFailoverChain(mmProxy, CONFIG.MATCH_PROXIES);
            lockRegion(mmChain);
            return mmChain;
        }

        /* RANKED / UNRANKED / CORE COMBAT / ME servers */
        if (isCriticalMode(mode) || isMiddleEastServer(ip)) {
            if (!validateSession(ip, host, mode)) {
                createSession(ip, host, mode);
            }

            var matchProxy = getStableProxyFromPool(CONFIG.MATCH_PROXIES, true);
            var matchChain = buildFailoverChain(matchProxy, CONFIG.MATCH_PROXIES);

            setPooledConnection(host, matchProxy);
            lockRegion(matchChain);
            return matchChain;
        }

        /* LOBBY / INVENTORY / STORE / WOW / EVENTS / SOCIAL / UPDATE 4.3 */
        if (isLobbyLikeMode(mode)) {
            if (pooled) return pooled;

            var lobbyProxy = weightedLobby(host);
            setPooledConnection(host, lobbyProxy);
            return lobbyProxy + "; DIRECT";
        }

        /* LOW */
        if (mode === "LOW") {
            return "DIRECT";
        }

        /* UNKNOWN */
        if (pooled) return pooled;
        return weightedLobby(host) + "; DIRECT";

    } catch (e) {
        return "DIRECT";
    }
}

/* Optional debug exposure */
this.BLACKBOX_AGENT_VERSION = "7.1";
this.BLACKBOX_CLASSIFY = classify;

})();
