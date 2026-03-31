// ============================================================
//  PAC Script — PUBG Mobile Jordan Proxy
//  Proxy   : 46.185.131.218
//  HTTP    : Port 20002  |  HTTPS : Port 20003
//  DNS     : Excluded (handled via local network settings)
//  Scope   : PUBG Mobile — All modes (Classic, TDM, Arena,
//             Metro Royale, Payload, Infection, etc.)
//  Target  : Jordan servers only + visibility to Jordan peers
// ============================================================

function FindProxyForURL(url, host) {

    var PROXY_HTTP  = "PROXY 46.185.131.218:20002";
    var PROXY_HTTPS = "PROXY 46.185.131.218:20003";
    var DIRECT      = "DIRECT";

    // --------------------------------------------------------
    // Resolve host to IP for IP-based matching
    // --------------------------------------------------------
    var ip = dnsResolve(host);

    // --------------------------------------------------------
    // PUBG Mobile — Tencent Game Server IP Ranges
    // (Global + Middle East / Jordan routing nodes)
    // --------------------------------------------------------
    var pubgRanges = [

        // Tencent Cloud — Core infrastructure
        ["43.129.0.0",   "255.255.0.0"],
        ["43.132.0.0",   "255.255.0.0"],
        ["43.133.0.0",   "255.255.0.0"],
        ["43.134.0.0",   "255.255.0.0"],
        ["43.135.0.0",   "255.255.0.0"],
        ["43.136.0.0",   "255.255.0.0"],
        ["43.138.0.0",   "255.255.0.0"],
        ["43.139.0.0",   "255.255.0.0"],
        ["43.140.0.0",   "255.255.0.0"],
        ["43.142.0.0",   "255.255.0.0"],
        ["43.143.0.0",   "255.255.0.0"],
        ["43.153.0.0",   "255.255.0.0"],
        ["43.154.0.0",   "255.255.0.0"],
        ["43.155.0.0",   "255.255.0.0"],
        ["43.156.0.0",   "255.255.0.0"],
        ["43.157.0.0",   "255.255.0.0"],
        ["43.158.0.0",   "255.255.0.0"],
        ["43.163.0.0",   "255.255.0.0"],

        // Tencent Cloud — 129.226.x.x block
        ["129.226.0.0",  "255.255.0.0"],

        // Tencent Cloud — 162.62.x.x block
        ["162.62.0.0",   "255.255.0.0"],

        // Tencent Cloud — 150.109.x.x block
        ["150.109.0.0",  "255.255.0.0"],

        // Tencent Cloud — 81.69.x.x / 119.28.x.x / 49.51.x.x
        ["81.69.0.0",    "255.255.0.0"],
        ["119.28.0.0",   "255.255.0.0"],
        ["49.51.0.0",    "255.255.0.0"],

        // Tencent — Legacy / HK nodes used for Middle East
        ["203.205.0.0",  "255.255.0.0"],
        ["175.27.0.0",   "255.255.0.0"],
        ["101.32.0.0",   "255.255.0.0"],
        ["101.33.0.0",   "255.255.0.0"],
        ["101.34.0.0",   "255.255.0.0"],
        ["101.35.0.0",   "255.255.0.0"],
        ["101.43.0.0",   "255.255.0.0"],
        ["101.44.0.0",   "255.255.0.0"],

        // Level Infinite (PUBG publisher CDN)
        ["23.224.0.0",   "255.255.0.0"],
        ["23.225.0.0",   "255.255.0.0"],
        ["23.226.0.0",   "255.255.0.0"],
        ["23.227.0.0",   "255.255.0.0"],
        ["23.228.0.0",   "255.255.0.0"],

        // Akamai nodes used by PUBG Mobile in MENA
        ["23.32.0.0",    "255.255.0.0"],
        ["23.33.0.0",    "255.255.0.0"],
        ["23.46.0.0",    "255.255.0.0"],
        ["23.47.0.0",    "255.255.0.0"],
        ["23.48.0.0",    "255.255.0.0"],
        ["23.49.0.0",    "255.255.0.0"],

        // Orange Jordan / ADSL range (from WHOIS — local ISP routing)
        ["46.185.0.0",   "255.255.0.0"],

        // Jordan National IPs commonly used in game matchmaking
        ["5.21.0.0",     "255.255.0.0"],
        ["37.98.0.0",    "255.255.0.0"],
        ["176.74.0.0",   "255.255.0.0"],
        ["185.2.0.0",    "255.255.0.0"],

    ];

    // --------------------------------------------------------
    // PUBG Mobile — Domains (matchmaking, login, CDN, updates)
    // --------------------------------------------------------
    var pubgDomains = [
        // Core game
        "pubgmobile.com",
        "pubg.com",
        "krafton.com",
        "levelinfinite.com",

        // Tencent auth & backend
        "game.gtimg.cn",
        "intlgame.com",
        "tencentgames.com",
        "tencent.com",
        "qq.com",
        "wegame.com.cn",

        // CDN / update servers
        "msdk.qq.com",
        "sj.qq.com",
        "pgyer.com",
        "bugly.qq.com",

        // PUBG Mobile matchmaking endpoints
        "mobileapi.pubg.com",
        "prodsg.game.intlgame.com",
        "prod-live.game.intlgame.com",

        // Analytics & telemetry (affects matchmaking region detection)
        "datacollector.intlgame.com",
        "report.intlgame.com",
    ];

    // --------------------------------------------------------
    // Helper: Check if IP falls within a subnet
    // --------------------------------------------------------
    function ipInRange(ip, base, mask) {
        return isInNet(ip, base, mask);
    }

    // --------------------------------------------------------
    // 1. Match by domain name
    // --------------------------------------------------------
    for (var d = 0; d < pubgDomains.length; d++) {
        if (dnsDomainIs(host, pubgDomains[d]) ||
            shExpMatch(host, "*." + pubgDomains[d])) {
            // Use HTTPS proxy for TLS domains, HTTP for the rest
            if (url.substring(0, 5) === "https") {
                return PROXY_HTTPS;
            }
            return PROXY_HTTP;
        }
    }

    // --------------------------------------------------------
    // 2. Match by resolved IP range (game server traffic)
    // --------------------------------------------------------
    if (ip) {
        for (var i = 0; i < pubgRanges.length; i++) {
            if (ipInRange(ip, pubgRanges[i][0], pubgRanges[i][1])) {
                return PROXY_HTTP;
            }
        }
    }

    // --------------------------------------------------------
    // 3. Everything else — direct connection (no proxy)
    // --------------------------------------------------------
    return DIRECT;
}
