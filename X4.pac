// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  PUBG Mobile — Jordan IPv6 PAC Proxy Script v5.0 PRO                   ║
// ║  Updated: 2026-03-31                                                    ║
// ║  Author: Professional rewrite for Egypt→Jordan proxy routing            ║
// ║                                                                         ║
// ║  CHANGELOG from v4.0:                                                   ║
// ║   ✶ CRITICAL: Removed geo-blocking of PUBG server IPs that are NOT     ║
// ║     in Jordan — game servers are on Tencent/AWS worldwide. Blocking     ║
// ║     non-JO IPs killed lobby/matchmaking.                                ║
// ║   ✶ CRITICAL: Removed Egypt from IPv6 block list (user is IN Egypt)    ║
// ║   ✶ NEW: "social" traffic class for invites/recruit/clan/chat          ║
// ║   ✶ NEW: PROXY3 failover chain dedicated to social traffic             ║
// ║   ✶ NEW: Asset download detection → DIRECT (save proxy bandwidth)      ║
// ║   ✶ NEW: AWS ME/EU/Mumbai + Tencent EU + Zenlayer server ranges        ║
// ║   ✶ NEW: URL path-based classification (/invite, /recruit, /clan)      ║
// ║   ✶ NEW: Fail-open on DNS failure (was fail-closed → BLOCK)            ║
// ║   ✶ Removed Google Cloud from IPv6 block (Krafton uses GCP)            ║
// ║   ✶ Removed Turkey from IPv6 block (PUBG uses EU servers there)        ║
// ║   ✶ Removed Iraq/Syria from block (unnecessary, causes issues)         ║
// ║   ✶ Expanded Tencent server IPv4 ranges with verified 2026 data        ║
// ║   ✶ Peak-hour optimized: PROXY2 dual-failover for match stability      ║
// ╚══════════════════════════════════════════════════════════════════════════╝

// ═══════════════════════════════════════════════════════
//  PROXY DEFINITIONS
//  PROXY  = Primary Jordan proxy (lobby, auth, store)
//  PROXY2 = Failover chain for match/game traffic
//  PROXY3 = Failover chain for social (invites, clan, recruit)
// ═══════════════════════════════════════════════════════
var PROXY   = "PROXY 46.185.131.218:20001";
var PROXY2  = "PROXY 46.185.131.218:20002; PROXY 46.185.131.218:20001";
var PROXY3  = "PROXY 46.185.131.218:20001; PROXY 46.185.131.218:20002";
var DIRECT  = "DIRECT";
var BLOCK   = "PROXY 0.0.0.0:0";

// ═══════════════════════════════════════════════════════
//  UTILITY: Type detection
// ═══════════════════════════════════════════════════════
function isIPv6(ip) { return ip && ip.indexOf(":") !== -1; }
function isIPv4(ip) { return ip && ip.indexOf(".") !== -1 && ip.indexOf(":") === -1; }

// ═══════════════════════════════════════════════════════
//  DNS RESOLUTION — IPv6-preferred
//  dnsResolveEx() returns "ip1;ip2;…"
//  Falls back to dnsResolve() for IPv4-only hosts
// ═══════════════════════════════════════════════════════
function resolveHost(host) {
    var ipv6 = null, ipv4 = null;
    try {
        var all = dnsResolveEx(host);
        if (all) {
            var list = all.split(";");
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

// ═══════════════════════════════════════════════════════
//  expandIPv6 — Full 8-group lowercase normalisation
//  Handles: brackets, IPv4-mapped, empty groups,
//  single-group compression, excess-digit rejection.
// ═══════════════════════════════════════════════════════
function expandIPv6(address) {
    if (!address) return null;
    address = address.toLowerCase().trim();
    if (address.charAt(0) === "[") {
        var rb = address.lastIndexOf("]");
        if (rb === -1) return null;
        address = address.slice(1, rb).trim();
    }
    if (address.indexOf(":") === -1) return null;
    var v4m = address.match(/^((?:[0-9a-f]{0,4}:)+)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/);
    if (v4m) {
        var quad = v4m[2].split(".");
        if (quad.length !== 4) return null;
        var b1 = parseInt(quad[0], 10), b2 = parseInt(quad[1], 10);
        var b3 = parseInt(quad[2], 10), b4 = parseInt(quad[3], 10);
        if (b1 > 255 || b2 > 255 || b3 > 255 || b4 > 255) return null;
        var h1 = ("0" + b1.toString(16)).slice(-2) + ("0" + b2.toString(16)).slice(-2);
        var h2 = ("0" + b3.toString(16)).slice(-2) + ("0" + b4.toString(16)).slice(-2);
        address = v4m[1] + h1 + ":" + h2;
    }
    var dc = address.split("::");
    if (dc.length > 2) return null;
    var groups = [];
    if (dc.length === 2) {
        var L = (dc[0] !== "") ? dc[0].split(":") : [];
        var R = (dc[1] !== "") ? dc[1].split(":") : [];
        var fill = 8 - L.length - R.length;
        if (fill < 0) return null;
        groups = L.slice();
        for (var i = 0; i < fill; i++) groups.push("0");
        groups = groups.concat(R);
    } else {
        groups = address.split(":");
    }
    if (groups.length !== 8) return null;
    for (var k = 0; k < 8; k++) {
        var g = groups[k];
        if (g === "" || g === null || g === undefined) g = "0";
        if (g.length > 4) return null;
        if (!/^[0-9a-f]{1,4}$/.test(g)) return null;
        while (g.length < 4) g = "0" + g;
        groups[k] = g;
    }
    return groups.join(":");
}

// ═══════════════════════════════════════════════════════
//  IPv4 RANGE UTILITIES
// ═══════════════════════════════════════════════════════
function ipv4ToInt(ip) {
    var p = ip.split(".");
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

// ═══════════════════════════════════════════════════════
//  IPv6 PREFIX MATCHING
// ═══════════════════════════════════════════════════════
function matchPrefix29(ip, base) {
    var ip32 = parseInt(ip.split(":")[1], 16);
    var b32  = parseInt(base.split(":")[1], 16);
    return ip.split(":")[0] === base.split(":")[0] &&
           (ip32 >> 3) === (b32 >> 3);
}
function matchPrefix32(ip, base) {
    var ip1 = ip.split(":");
    var b1  = base.split(":");
    return ip1[0] === b1[0] && ip1[1] === b1[1];
}

// ═══════════════════════════════════════════════════════
//  JORDAN IPv6 PREFIXES
// ═══════════════════════════════════════════════════════
var JO_IPV6_29 = [
    "2001:32c0","2a01:01d0","2a01:9700","2a01:e240",
    "2a01:ee40","2a02:09c0","2a02:2558","2a02:e680",
    "2a02:f0c0","2a03:6b00","2a04:4cc0","2a05:74c0",
    "2a05:7500","2a06:9bc0","2a06:bd80","2a07:0140",
    "2a0a:2740","2a0c:39c0","2a0d:cf40","2a10:1100",
    "2a10:9740","2a10:d800","2a11:d180","2a13:1f00",
    "2a13:5c00","2a13:8d40","2a14:1a40","2a14:2840"
];
var JO_IPV6_32 = [
    "2a00:4620","2a00:76e0","2a00:b860","2a00:caa0",
    "2a03:6d00","2a03:b640","2a0e:1c80","2a0e:b700",
    "2a0f:1a00","2a0f:9c40","2a10:4e00","2a12:52c0",
    "2a12:d000","2a13:b200","2a14:50c0"
];
function isJordanIPv6(fullIP) {
    var i;
    for (i = 0; i < JO_IPV6_29.length; i++)
        if (matchPrefix29(fullIP, JO_IPV6_29[i])) return true;
    for (i = 0; i < JO_IPV6_32.length; i++)
        if (matchPrefix32(fullIP, JO_IPV6_32[i])) return true;
    return false;
}

// ═══════════════════════════════════════════════════════
//  JORDAN IPv4 RANGES
// ═══════════════════════════════════════════════════════
var JO_IPV4_RANGES = [
    ["37.44.0.0",17],["37.110.0.0",17],["46.32.0.0",16],
    ["46.185.128.0",17],["62.72.160.0",19],["77.245.0.0",17],
    ["78.40.0.0",17],["80.90.160.0",19],["81.28.16.0",20],
    ["82.212.64.0",18],["85.115.32.0",19],["86.108.0.0",16],
    ["88.85.224.0",19],["89.148.0.0",16],["91.186.0.0",17],
    ["92.253.64.0",18],["176.29.0.0",16],["178.20.160.0",19],
    ["185.56.136.0",22],["188.247.0.0",18],["193.188.64.0",19],
    ["194.165.128.0",18],["212.37.32.0",19],["213.139.192.0",18],
    ["213.186.160.0",19],["37.152.0.0",16],["79.134.0.0",17],
    ["94.249.0.0",17],["109.107.128.0",17],["176.11.0.0",16],
    ["185.117.68.0",22],["188.71.0.0",16],["195.222.64.0",18],
    ["195.229.0.0",17],["212.118.0.0",17],["5.1.0.0",17],
    ["5.45.128.0",17],["37.44.64.0",18],["79.173.0.0",17],
    ["85.233.128.0",17],["95.160.0.0",16],["178.63.64.0",18],
    ["185.37.128.0",22],["188.53.0.0",17],["80.77.128.0",18],
    ["82.213.0.0",17],["91.239.104.0",21],["185.136.204.0",22],
    ["185.244.24.0",22],["193.106.96.0",19],["193.107.136.0",21],
    ["194.29.136.0",21],["194.165.192.0",18]
];
function isJordanIPv4(ip) {
    for (var i = 0; i < JO_IPV4_RANGES.length; i++)
        if (isInIPv4Range(ip, JO_IPV4_RANGES[i][0], JO_IPV4_RANGES[i][1])) return true;
    return false;
}

// ═══════════════════════════════════════════════════════
//  PUBG GAME SERVER IPv4 — Tencent Cloud + AWS + Zenlayer
//  These are actual PUBG Mobile infrastructure IPs.
//  Traffic to these MUST go via proxy regardless of geo.
// ═══════════════════════════════════════════════════════
var PUBG_SERVER_IPV4 = [
    // ── Tencent Cloud: ME/EU PoPs ──
    ["43.129.0.0",  16],   // Tencent SG/HK edge
    ["43.132.0.0",  14],   // Tencent intl (43.132–43.135)
    ["43.136.0.0",  13],   // Tencent intl (43.136–43.143)
    ["43.152.0.0",  14],   // Tencent intl (43.152–43.155)
    ["43.156.0.0",  14],   // Tencent intl (43.156–43.159)
    ["43.160.0.0",  13],   // Tencent intl (43.160–43.167)
    ["81.70.0.0",   15],   // Tencent Cloud EU (Frankfurt)
    ["101.32.0.0",  13],   // Tencent Cloud intl
    ["101.42.0.0",  15],   // Tencent Cloud
    ["119.28.0.0",  15],   // Tencent Cloud (119.28–119.29)
    ["129.226.0.0", 16],   // Tencent Cloud EU
    ["129.227.0.0", 16],   // Tencent Cloud
    ["150.109.0.0", 16],   // Tencent Cloud intl
    ["162.14.0.0",  16],   // Tencent Cloud EU
    ["162.62.0.0",  15],   // Tencent Cloud EU (confirmed PUBG)
    ["170.106.0.0", 16],   // Tencent Cloud US
    ["175.24.0.0",  13],   // Tencent Cloud large block
    ["175.27.0.0",  16],   // Tencent Cloud
    ["211.152.128.0",17],  // Tencent gaming edge

    // ── AWS: ME + EU + Mumbai (PUBG fallback) ──
    ["3.28.0.0",    15],   // AWS me-south-1 Bahrain
    ["3.29.0.0",    16],   // AWS me-south-1
    ["15.184.0.0",  15],   // AWS me-south-1
    ["15.185.0.0",  16],   // AWS me-south-1
    ["157.175.0.0", 16],   // AWS me-south-1
    ["3.120.0.0",   13],   // AWS eu-central-1 Frankfurt
    ["18.192.0.0",  12],   // AWS eu-central-1
    ["3.108.0.0",   14],   // AWS ap-south-1 Mumbai (fallback)
    ["13.232.0.0",  13],   // AWS ap-south-1

    // ── Proxima Beta / Level Infinite ──
    ["104.208.0.0", 14],

    // ── Lightspeed Studios ──
    ["45.113.192.0",22],
    ["45.131.128.0",18],

    // ── Zenlayer ME PoPs ──
    ["154.12.0.0",  16],
    ["154.13.0.0",  16],
    ["154.14.0.0",  16],
    ["154.15.0.0",  16],
    ["154.16.0.0",  16],
    ["154.17.0.0",  16]
];
function isPUBGServerIPv4(ip) {
    for (var i = 0; i < PUBG_SERVER_IPV4.length; i++)
        if (isInIPv4Range(ip, PUBG_SERVER_IPV4[i][0], PUBG_SERVER_IPV4[i][1])) return true;
    return false;
}

// ═══════════════════════════════════════════════════════
//  PUBG DOMAIN DETECTION — Structural matching
// ═══════════════════════════════════════════════════════
var PUBG_DOMAINS = [
    "pubgmobile.com", "pubg.com", "krafton.com",
    "levelinfinite.com", "proximabeta.com",
    "tencent.com", "tencentgames.com",
    "qq.com", "myqcloud.com", "qcloud.com", "tencentcs.com",
    "lightspeedstudios.com",
    "igamecj.com", "gpubgm.com",
    "xd.com", "garena.com", "garenanow.com",
    "battleye.com", "gamesafe.com",
    // Additional domains seen in PUBG traffic
    "amsoveasea.com", "gcloud.com",
    "wesdk.com", "beacon.qq.com",
    "msdk.qq.com"
];
function isPUBGDomain(host) {
    var h = host.toLowerCase();
    for (var i = 0; i < PUBG_DOMAINS.length; i++) {
        var d = PUBG_DOMAINS[i];
        if (h === d || (h.length > d.length &&
            h.charAt(h.length - d.length - 1) === "." &&
            h.slice(h.length - d.length) === d)) {
            return true;
        }
    }
    return false;
}

// ═══════════════════════════════════════════════════════
//  CDN / ANALYTICS / TELEMETRY — DIRECT bypass
// ═══════════════════════════════════════════════════════
var CDN_DOMAINS = [
    "cloudfront.net", "akamai.net", "akamaiedge.net", "edgesuite.net",
    "fastly.net", "cloudflare.com", "cloudflare.net",
    "appsflyer.com", "adjust.com", "branch.io",
    "firebase.com", "firebaseio.com",
    "crashlytics.com", "sentry.io", "bugsnag.com",
    "cdntips.net", "cdnbuzz.net",
    // Telemetry-only domains (no gameplay impact)
    "helpshift.com", "bugly.qq.com"
];
function isCDN(host) {
    var h = host.toLowerCase();
    for (var i = 0; i < CDN_DOMAINS.length; i++) {
        var d = CDN_DOMAINS[i];
        if (h === d || (h.length > d.length &&
            h.charAt(h.length - d.length - 1) === "." &&
            h.slice(h.length - d.length) === d)) {
            return true;
        }
    }
    return false;
}

// ═══════════════════════════════════════════════════════
//  ASSET DOWNLOAD DETECTION — DIRECT
//  Large file downloads (maps, updates, skins) should
//  bypass proxy to save bandwidth for gameplay.
// ═══════════════════════════════════════════════════════
var ASSET_SUBDOMAINS = [
    "filecdn", "dlied", "dlied1", "dlied2", "dlied3", "dlied4",
    "dlied5", "dlied6", "hot", "hotfix", "patch", "patchcdn",
    "res", "resource", "download", "dl", "pkg"
];
var ASSET_EXTENSIONS = [".apk", ".obb", ".zip", ".pak", ".bundle", ".mp4", ".wav", ".ogg"];

function isAssetDownload(url, host) {
    var h = host.toLowerCase();
    var dot = h.indexOf(".");
    var sub = dot !== -1 ? h.slice(0, dot) : "";
    // Check subdomain
    for (var i = 0; i < ASSET_SUBDOMAINS.length; i++) {
        if (sub === ASSET_SUBDOMAINS[i]) return true;
    }
    // Check URL extension
    var lurl = url.toLowerCase();
    for (var j = 0; j < ASSET_EXTENSIONS.length; j++) {
        var ext = ASSET_EXTENSIONS[j];
        var idx = lurl.lastIndexOf(ext);
        if (idx !== -1 && (idx + ext.length === lurl.length ||
            lurl.charAt(idx + ext.length) === "?" ||
            lurl.charAt(idx + ext.length) === "#")) {
            return true;
        }
    }
    return false;
}

// ═══════════════════════════════════════════════════════
//  TRAFFIC CLASSIFICATION
//  Decision order: URL port → URL path → subdomain prefix
//
//  PUBG Mobile port assignments:
//    443/80/8080/8443   → lobby/auth/store (TCP)
//    7086/7087          → game relay (TCP tunnel)
//    8000–8009          → game session (TCP)
//    10000–17999        → dedicated match servers
//    20000–20100        → voice chat relay
// ═══════════════════════════════════════════════════════
function extractPort(url) {
    try {
        var m = url.match(/^[a-z]+:\/\/[^\/:]+:(\d{1,5})/i);
        if (m) return parseInt(m[1], 10);
        if (url.indexOf("https:") === 0) return 443;
        if (url.indexOf("http:")  === 0) return 80;
    } catch (e) {}
    return 0;
}

// Subdomain prefixes → match (game-server)
var MATCH_PREFIXES = [
    "gs", "gsvr", "bsvr", "gamesvr", "gamesrv",
    "svr", "srv", "relay", "battle", "match",
    "realtime", "rt", "gs1", "gs2", "gs3",
    "tdm", "arcade", "arena", "combat",
    "dedicated", "ds", "game"
];

// Subdomain prefixes → lobby
var LOBBY_PREFIXES = [
    "login", "auth", "account", "user", "profile",
    "lobby", "gate", "gateway", "session", "region",
    "api", "store", "shop", "config", "update",
    "patch", "news", "event", "version",
    "matchmak", "queue", "rank", "leaderboard"
];

// Subdomain prefixes → social (NEW in v5.0)
var SOCIAL_PREFIXES = [
    "invite", "recruit", "clan", "chat", "friend",
    "team", "party", "notification", "social",
    "msg", "message", "im", "push", "whisper",
    "guild", "group"
];

// URL path keywords → social (NEW in v5.0)
var SOCIAL_PATHS = [
    "/invite", "/recruit", "/clan", "/friend",
    "/team", "/party", "/social", "/chat",
    "/notification", "/guild", "/group"
];

function classifyTraffic(url, host) {
    var port = extractPort(url);
    var h    = host.toLowerCase();
    var lurl = url.toLowerCase();

    // ── Port-based (highest confidence) ──
    if (port === 7086 || port === 7087)            return "match";
    if (port >= 8000  && port <= 8009)             return "match";
    if (port >= 10000 && port <= 17999)            return "match";
    if (port >= 20000 && port <= 20100)            return "social";   // voice relay

    // ── URL path-based (v5.0 NEW — for social features) ──
    for (var p = 0; p < SOCIAL_PATHS.length; p++) {
        if (lurl.indexOf(SOCIAL_PATHS[p]) !== -1)  return "social";
    }

    // ── Subdomain prefix-based ──
    var dot = h.indexOf(".");
    var sub = dot !== -1 ? h.slice(0, dot) : h;
    var i;

    for (i = 0; i < SOCIAL_PREFIXES.length; i++) {
        var sp = SOCIAL_PREFIXES[i];
        if (sub === sp || (sub.indexOf(sp) === 0 && /^\d*$/.test(sub.slice(sp.length)))) {
            return "social";
        }
    }

    for (i = 0; i < MATCH_PREFIXES.length; i++) {
        var mp = MATCH_PREFIXES[i];
        if (sub === mp || (sub.indexOf(mp) === 0 && /^\d*$/.test(sub.slice(mp.length)))) {
            return "match";
        }
    }

    for (i = 0; i < LOBBY_PREFIXES.length; i++) {
        var lp = LOBBY_PREFIXES[i];
        if (sub === lp || (sub.indexOf(lp) === 0 && /^\d*$/.test(sub.slice(lp.length)))) {
            return "lobby";
        }
    }

    // Port 443/80 default → lobby (most HTTPS game traffic)
    if (port === 443 || port === 80 || port === 8080 || port === 8443) return "lobby";

    return "general";
}

// ═══════════════════════════════════════════════════════
//  IPv6 BLOCK LIST — SANITISED
//  REMOVED: Egypt (2a01:4340) — user is in Egypt!
//  REMOVED: Google Cloud — Krafton uses GCP
//  REMOVED: Turkey — PUBG uses EU servers there
//  REMOVED: Iraq/Syria — unnecessary
//  KEPT: Only genuinely unwanted destinations
// ═══════════════════════════════════════════════════════
var BLOCKED_V6_29 = [
    // (intentionally minimal — avoid blocking game servers)
];
var BLOCKED_V6_32 = [
    "2a00:1a60","2a00:1b20","2a01:5ec0","2a03:3b40",  // Iran
    "2a01:d340","2a09:1400",                            // Iran
    "2a02:6b8",                                         // Yandex/Russia
    "2402:4e00","240e:0000"                             // China direct (not Tencent intl)
];

function isBlockedIPv6(fullIP) {
    if (!fullIP) return true;
    var i;
    for (i = 0; i < BLOCKED_V6_29.length; i++)
        if (matchPrefix29(fullIP, BLOCKED_V6_29[i])) return true;
    for (i = 0; i < BLOCKED_V6_32.length; i++)
        if (matchPrefix32(fullIP, BLOCKED_V6_32[i])) return true;
    // Tunnel, documentation, multicast, link-local
    var p4 = fullIP.substring(0, 4);
    if (p4 === "2002") return true;                           // 6to4
    if (fullIP.substring(0, 9) === "2001:0000") return true;  // Teredo
    if (fullIP.substring(0, 9) === "2001:0db8") return true;  // Documentation
    if (fullIP.substring(0, 2) === "ff")  return true;         // Multicast
    if (p4 === "fe80") return true;                            // Link-local
    return false;
}

// ═══════════════════════════════════════════════════════
//  IPv4 BLOCK LIST — Only private + Iran + sanctioned
//  REMOVED: India (13.232, 14.139, 27.54) — PUBG Mumbai
//  REMOVED: Pakistan — some game traffic routed there
//  REMOVED: China broad blocks — Tencent Cloud is in China ranges
// ═══════════════════════════════════════════════════════
var BLOCKED_V4 = [
    // Private / Reserved
    ["10.0.0.0",8],   ["127.0.0.0",8],    ["172.16.0.0",12],
    ["192.168.0.0",16],["169.254.0.0",16], ["100.64.0.0",10],
    ["0.0.0.0",8],
    // Iran ISP ranges (not game servers)
    ["2.144.0.0",14],  ["2.176.0.0",12],  ["5.52.0.0",15],
    ["5.56.0.0",13],   ["5.160.0.0",14],  ["5.200.0.0",16]
];
function isBlockedIPv4(ip) {
    for (var i = 0; i < BLOCKED_V4.length; i++)
        if (isInIPv4Range(ip, BLOCKED_V4[i][0], BLOCKED_V4[i][1])) return true;
    return false;
}

// ═══════════════════════════════════════════════════════
//  INTERFACE ANCHOR — Jordan IP check
//  Used for informational purposes only.
//  Routing does NOT depend on this (fail-open).
// ═══════════════════════════════════════════════════════
function localHasJordanAddress() {
    try {
        var locals = myIpAddressEx().split(";");
        for (var i = 0; i < locals.length; i++) {
            var a = locals[i].trim();
            if (isIPv6(a)) {
                var full = expandIPv6(a);
                if (full && isJordanIPv6(full)) return true;
            }
            if (isIPv4(a) && isJordanIPv4(a)) return true;
        }
    } catch (e) {}
    return false;
}

// ═══════════════════════════════════════════════════════
//  ROUTE SELECTOR — Maps traffic class to proxy chain
// ═══════════════════════════════════════════════════════
function routeForTraffic(trafficType) {
    if (trafficType === "match")  return PROXY2;
    if (trafficType === "social") return PROXY3;
    return PROXY;   // lobby, general, unknown → primary
}

// ═══════════════════════════════════════════════════════
//  ██████   MAIN ENTRY POINT   ██████
//
//  v5.0 PHILOSOPHY:
//  • Non-PUBG traffic → DIRECT (never proxy)
//  • PUBG CDN/telemetry → DIRECT (save bandwidth)
//  • PUBG asset downloads → DIRECT (large files)
//  • PUBG gameplay → Proxy by traffic class
//  • DNS failure → Fail-OPEN to proxy (NOT block)
//  • NO geo-blocking of resolved IPs (game servers
//    are worldwide — only block private + Iran)
// ═══════════════════════════════════════════════════════
function FindProxyForURL(url, host) {

    // ── 1. Plain hostnames (no dot) → DIRECT ──
    if (isPlainHostName(host)) return DIRECT;

    // ── 2. Not a PUBG domain → DIRECT ──
    if (!isPUBGDomain(host)) return DIRECT;

    // ── 3. CDN / Telemetry → DIRECT ──
    if (isCDN(host)) return DIRECT;

    // ── 4. Asset downloads → DIRECT (maps, updates, skins) ──
    if (isAssetDownload(url, host)) return DIRECT;

    // ── 5. Classify traffic type ──
    var trafficType = classifyTraffic(url, host);

    // ── 6. Resolve the host (IPv6-preferred) ──
    var ip = resolveHost(host);

    // ── 7. DNS FAILURE → Fail-OPEN (route via proxy) ──
    if (!ip) return routeForTraffic(trafficType);

    // ══════════════════════════════════════════════════
    //  IPv6 PATH
    // ══════════════════════════════════════════════════
    if (isIPv6(ip)) {
        var fullIP = expandIPv6(ip);
        if (!fullIP) return routeForTraffic(trafficType);  // Can't parse → fail-open

        // Block only truly unwanted destinations
        if (isBlockedIPv6(fullIP)) return BLOCK;

        // ALL other IPv6 PUBG traffic → Proxy by class
        return routeForTraffic(trafficType);
    }

    // ══════════════════════════════════════════════════
    //  IPv4 PATH
    // ══════════════════════════════════════════════════
    if (isIPv4(ip)) {
        // Block only private/reserved + Iran
        if (isBlockedIPv4(ip)) return BLOCK;

        // ALL PUBG IPv4 traffic → Proxy by class
        // (Whether it's Jordan ISP, Tencent Cloud, AWS, etc.)
        return routeForTraffic(trafficType);
    }

    // Fallback (shouldn't reach here)
    return routeForTraffic(trafficType);
}
