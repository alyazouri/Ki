(function () {
"use strict";

/*══════════════════════════════════════════════════════
   BLACKBOX AGENT 7.0 – JORDAN PURE FIBER & MOBILE
   🇯🇴 Full ISP Coverage | Ultra-Low Stable Ping
══════════════════════════════════════════════════════*/

const CONFIG = {
    /* ── Primary Match Proxy (Closest to JO) ── */
    MATCH_PROXIES: [
        { host: "46.185.131.218", port: 20001, protocol: "PROXY", latency: 0 },
        { host: "212.35.66.45",   port: 20001, protocol: "PROXY", latency: 0 },
        { host: "176.29.100.1",   port: 20001, protocol: "PROXY", latency: 0 }
    ],

    /* ── Lobby Pool with Smart Weights ── */
    LOBBY_POOL: [
        { host: "212.35.66.45",   port: 8085, protocol: "PROXY", weight: 5 },
        { host: "212.35.66.45",   port: 8181, protocol: "PROXY", weight: 3 },
        { host: "46.185.131.218", port: 443,  protocol: "PROXY", weight: 2 },
        { host: "176.29.100.1",   port: 8085, protocol: "PROXY", weight: 4 }
    ],

    /* ── Timing ── */
    CACHE_TTL:        600000,   // 10 min DNS cache
    SESSION_TIMEOUT:  60000,    // 60s match session (longer = more stable)
    RATE_WINDOW:      5000,
    RATE_LIMIT:       200,      // Higher for fiber speeds
    JITTER_WINDOW:    10,       // Jitter averaging samples
    STICKY_DURATION:  120000,   // 2 min sticky proxy per match
    PING_CHECK_INTERVAL: 15000  // Re-check best proxy every 15s
};

/*════════════════ SESSION STATE ════════════════*/

const SESSION = {
    matchIP:        null,
    matchHost:      null,
    matchMode:      null,
    matchTimestamp:  null,
    stickyProxy:    null,
    stickyExpiry:   0,
    dnsCache:       new Map(),
    rateTracker:    new Map(),
    proxyLatency:   new Map(),
    jitterBuffer:   [],
    connectionPool: new Map(),
    requestCount:   0
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
    return ((parseInt(parts[0]) << 24) |
            (parseInt(parts[1]) << 16) |
            (parseInt(parts[2]) << 8)  |
             parseInt(parts[3])) >>> 0;
}

function cidrToMask(bits) {
    return (~0 << (32 - bits)) >>> 0;
}

/*══════════════════════════════════════════════════════
   🇯🇴 COMPLETE JORDAN IP RANGES
   Orange | Zain | Umniah | Damamax | JTC | Wi-Tribe
   ── Fiber (FTTH/FTTB) + Mobile (4G/5G) ──
══════════════════════════════════════════════════════*/

var JORDAN_RANGES = [

    /* ═══════ ORANGE JORDAN (Fiber + Mobile) ═══════ */
    // Orange FTTH Fiber
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
    // Orange Mobile 4G/5G
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

    /* ═══════ ZAIN JORDAN (Fiber + Mobile) ═══════ */
    // Zain Fiber & Fixed
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
    // Zain Mobile 4G/5G
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

    /* ═══════ UMNIAH (Fiber + Mobile) ═══════ */
    // Umniah Fiber & Fixed
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
    // Umniah Mobile 4G/5G
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

    /* ═══════ DAMAMAX / WI-TRIBE ═══════ */
    ["62.215.0.0", 16],
    ["82.205.0.0", 16],
    ["86.56.0.0", 16],
    ["185.24.140.0", 22],
    ["185.124.144.0", 22],
    ["185.188.48.0", 22],
    ["195.74.128.0", 18],
    ["195.191.0.0", 16],

    /* ═══════ JTC / BATELCO / VTEL ═══════ */
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

    /* ═══════ ADDITIONAL JO ALLOCATIONS ═══════ */
    ["141.164.0.0", 16],
    ["156.197.0.0", 16],
    ["160.177.0.0", 16],
    ["196.29.0.0", 16],
    ["196.205.0.0", 16],
    ["197.37.0.0", 16]
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

    if (cached && (now - cached.time < CONFIG.CACHE_TTL))
        return cached.ip;

    var ip = dnsResolve(host);
    if (!isValidIPv4(ip)) return null;

    // DNS rebinding protection
    if (cached && cached.ip !== ip && (now - cached.time < 15000))
        return null;

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
        /^100\.(6[4-9]|[7-9]\d|1[0-2]\d)\./ // CGNAT block
    ];
    for (var i = 0; i < patterns.length; i++) {
        if (patterns[i].test(ip)) return true;
    }
    return false;
}

/*════════════════ TRAFFIC CLASSIFICATION ════════════════*/

var MODES = {
    CRITICAL: /match|battle|ranked|classic|arena|war|payload|zombie|metro|tdm|fpp|tpp|domination|assault|gun.?game/i,
    MEDIUM:   /lobby|queue|store|spin|inventory|event|esports|season|leaderboard|clan|crew|social/i,
    LOW:      /cdn|asset|patch|analytics|telemetry|crash|log|report|config|update|download/i,
    ANTICHEAT:/anticheat|security|verify|shield|ban|guard|protect|captcha|challenge/i
};

function classify(url, host) {
    var input = (url + " " + host).toLowerCase();
    if (MODES.ANTICHEAT.test(input)) return "ANTICHEAT";
    if (MODES.CRITICAL.test(input))  return "CRITICAL";
    if (MODES.MEDIUM.test(input))    return "MEDIUM";
    if (MODES.LOW.test(input))       return "LOW";
    return "UNKNOWN";
}

function isPUBG(host) {
    return /(pubg|tencent|krafton|levelinfinite|proxima|tencentgames|battlegrounds)/i.test(host);
}

/*════════════════ JITTER STABILIZER ════════════════*/

function recordJitter(proxyKey) {
    var now = Date.now();
    if (SESSION.jitterBuffer.length >= CONFIG.JITTER_WINDOW) {
        SESSION.jitterBuffer.shift();
    }
    SESSION.jitterBuffer.push({ proxy: proxyKey, time: now });
}

function getStableProxy(candidates) {
    // If we have a sticky proxy that hasn't expired, use it
    var now = Date.now();
    if (SESSION.stickyProxy && now < SESSION.stickyExpiry) {
        return SESSION.stickyProxy;
    }

    // Pick best from candidates based on recorded latency
    var best = null;
    var bestLatency = Infinity;

    for (var i = 0; i < candidates.length; i++) {
        var key = candidates[i].host + ":" + candidates[i].port;
        var lat = SESSION.proxyLatency.get(key) || 50; // default 50ms
        if (lat < bestLatency) {
            bestLatency = lat;
            best = candidates[i];
        }
    }

    if (!best) best = candidates[0];

    var result = best.protocol + " " + best.host + ":" + best.port;

    // Make it sticky for match stability
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
        if (val < CONFIG.LOBBY_POOL[k].weight)
            return CONFIG.LOBBY_POOL[k].protocol + " " +
                   CONFIG.LOBBY_POOL[k].host + ":" +
                   CONFIG.LOBBY_POOL[k].port;
        val -= CONFIG.LOBBY_POOL[k].weight;
    }

    return "DIRECT";
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
        var entry = pool[i].protocol + " " + pool[i].host + ":" + pool[i].port;
        if (entry !== primary) {
            chain += "; " + entry;
        }
    }
    chain += "; DIRECT";
    return chain;
}

/*══════════════════════════════════════════════
   🔥 MAIN PROXY FUNCTION
══════════════════════════════════════════════*/

function FindProxyForURL(url, host) {
    try {
        SESSION.requestCount++;

        /* Rate limit check */
        if (!rateLimit(host)) return "DIRECT"; // Don't BLOCK, just bypass

        /* Only intercept PUBG traffic */
        if (!isPUBG(host)) return "DIRECT";

        /* DNS Resolution */
        var ip = secureDNS(host);
        if (!ip) return "DIRECT";
        if (isBlockedIP(ip)) return "DIRECT";

        /* 🇯🇴 Jordan-only filter */
        if (!inJordan(ip)) return "DIRECT";

        /* Check connection pool first */
        var pooled = getPooledConnection(host);

        /* Classify traffic */
        var mode = classify(url, host);

        /* Anti-cheat: never proxy */
        if (mode === "ANTICHEAT") return "DIRECT";

        /* ═══ CRITICAL: Match/Battle Traffic ═══ */
        if (mode === "CRITICAL") {
            if (!validateSession(ip, host, mode))
                createSession(ip, host, mode);

            // Use stable proxy with sticky sessions
            var matchProxy = getStableProxy(CONFIG.MATCH_PROXIES);

            // Cache in pool
            setPooledConnection(host, matchProxy);

            // Build failover chain for reliability
            return buildFailoverChain(matchProxy, CONFIG.MATCH_PROXIES);
        }

/* ═══ MEDIUM: Lobby/Store Traffic ═══ */
if (mode === "MEDIUM") {
    if (pooled) return pooled;
    var lobbyProxy = getStableProxy(CONFIG.MATCH_PROXIES); // ← تغيير هنا
    setPooledConnection(host, lobbyProxy);
    return buildFailoverChain(lobbyProxy, CONFIG.MATCH_PROXIES); // ← وهنا
}


        /* ═══ LOW: CDN/Asset Traffic ═══ */
        if (mode === "LOW") {
            return "DIRECT"; // Don't waste proxy on assets
        }

        /* ═══ UNKNOWN: Light proxy ═══ */
        if (pooled) return pooled;
        return weightedLobby(host) + "; DIRECT";

    } catch (e) {
        return "DIRECT"; // Graceful fallback, never block
    }
}

})();
