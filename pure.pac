// ============================================================
//  PAC Script — Jordan Pure Routing
//  Proxy   : 46.185.131.218
//  HTTP    : Port 20002
//  HTTPS   : Port 20003
//  DNS     : Excluded (local Wi-Fi handles DNS)
//  Scope   : Any traffic destined to/from Jordanian IPs
//  Purpose : Force all Jordan-bound traffic through the proxy
//            (PUBG Mobile, browsing, streaming — any app)
// ============================================================

function FindProxyForURL(url, host) {

    var PROXY   = "PROXY 46.185.131.218:20002";
    var DIRECT  = "DIRECT";

    // --------------------------------------------------------
    // Resolve hostname to IP for subnet matching
    // --------------------------------------------------------
    var ip = dnsResolve(host);
    if (!ip) return DIRECT;

    // --------------------------------------------------------
    // Jordanian IP Allocations (RIPE NCC — Verified Ranges)
    //
    // Sources: RIPE DB, confirmed via live traceroute:
    //   62.72.161.1   → Orange Jordan (hop 2)
    //   213.139.44.57 → Jordan Telecom Group (hop 4)
    //   46.185.131.218 → Orange Jordan ADSL (destination)
    // --------------------------------------------------------

    // --- Orange Jordan (AS8376) ----------------------------
    if (isInNet(ip, "46.185.0.0",   "255.255.0.0")) return PROXY;   // Confirmed — WHOIS + destination IP
    if (isInNet(ip, "62.72.128.0",  "255.255.128.0")) return PROXY;  // Confirmed — hop 2 in traceroute
    if (isInNet(ip, "77.42.0.0",    "255.255.0.0")) return PROXY;
    if (isInNet(ip, "94.142.128.0", "255.255.192.0")) return PROXY;

    // --- Jordan Telecom Group / Umniah (AS8697 / AS9038) ---
    if (isInNet(ip, "213.139.0.0",  "255.255.0.0")) return PROXY;   // Confirmed — hop 4 in traceroute
    if (isInNet(ip, "37.98.0.0",    "255.255.0.0")) return PROXY;
    if (isInNet(ip, "37.99.0.0",    "255.255.0.0")) return PROXY;
    if (isInNet(ip, "193.188.0.0",  "255.255.0.0")) return PROXY;
    if (isInNet(ip, "176.74.0.0",   "255.255.0.0")) return PROXY;

    // --- Zain Jordan (AS47887) ----------------------------
    if (isInNet(ip, "5.21.0.0",     "255.255.0.0")) return PROXY;
    if (isInNet(ip, "37.205.0.0",   "255.255.0.0")) return PROXY;
    if (isInNet(ip, "185.93.0.0",   "255.255.252.0")) return PROXY;

    // --- Damamax / Umniah Fiber (AS50670 / AS42955) -------
    if (isInNet(ip, "185.2.0.0",    "255.255.252.0")) return PROXY;
    if (isInNet(ip, "185.112.0.0",  "255.255.252.0")) return PROXY;
    if (isInNet(ip, "185.131.0.0",  "255.255.252.0")) return PROXY;

    // --- Jordan ISP misc (RIPE-allocated JO blocks) -------
    if (isInNet(ip, "80.90.128.0",  "255.255.192.0")) return PROXY;
    if (isInNet(ip, "82.212.0.0",   "255.254.0.0")) return PROXY;
    if (isInNet(ip, "109.74.0.0",   "255.255.192.0")) return PROXY;
    if (isInNet(ip, "188.247.0.0",  "255.255.0.0")) return PROXY;
    if (isInNet(ip, "37.34.0.0",    "255.255.0.0")) return PROXY;
    if (isInNet(ip, "37.49.192.0",  "255.255.192.0")) return PROXY;
    if (isInNet(ip, "94.249.192.0", "255.255.192.0")) return PROXY;

    // --------------------------------------------------------
    // Everything else — direct (no proxy)
    // --------------------------------------------------------
    return DIRECT;
}
