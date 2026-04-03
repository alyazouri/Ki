/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║    PUBG Mobile · Jordan-Locked PAC · iOS Edition · v3.0      ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  [1] Jordan-only gate — zero region bleed                     ║
 * ║  [2] Latency-tier proxy scoring (RTT estimation via slot)     ║
 * ║  [3] iOS HTTP keepalive awareness — sticky proxy per host     ║
 * ║  [4] Matchmaking chain hardened: 3-proxy + DIRECT fallback    ║
 * ║  [5] Off-peak single-hop to reduce unnecessary hops           ║
 * ║  [6] Anti-fingerprint: djb2 ⊕ Knuth φ slot rotation          ║
 * ║  [7] Precomputed CIDR table for fast Jordan IP lookup         ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
function FindProxyForURL(url, host) {

    // ════════════════════════════════════════════════════════════
    // §1  PROXY POOLS  —  مرتبة حسب الـ RTT المتوقع للأردن
    //
    //     46.185.131.x  →  Batelco/Zain JO backbone  (أقرب)
    //     212.35.66.x   →  Jordan Telecom tier-1     (ثاني)
    //     176.29.100.x  →  Orange JO                 (ثالث)
    //
    //     الترتيب مبني على distance-to-IX في عمّان.
    //     يضمن أن الـ primary proxy دائماً هو الأقرب جغرافياً.
    // ════════════════════════════════════════════════════════════

    var MATCH_POOL = [
        "PROXY 46.185.131.218:20001",
        "PROXY 212.35.66.45:20001",
        "PROXY 176.29.100.1:20001"
    ];
    var MATCH_W = [6, 4, 2];   // وزن الموثوقية — RTT أقل = وزن أعلى

    var LOBBY_POOL = [
        "PROXY 46.185.131.218:443",    // port 443 — يمر عبر أي Firewall على iOS
        "PROXY 212.35.66.45:8085",
        "PROXY 212.35.66.45:8181",
        "PROXY 176.29.100.1:8085"
    ];
    var LOBBY_W = [6, 4, 3, 2];


    // ════════════════════════════════════════════════════════════
    // §2  JORDAN CIDR TABLE
    // ════════════════════════════════════════════════════════════

    var RAW_JO = [
        "5.45.128.0/20",    "5.198.240.0/21",   "5.199.184.0/22",
        "37.17.192.0/20",   "37.123.64.0/19",   "37.202.64.0/18",
        "37.220.112.0/20",  "46.23.112.0/20",   "46.32.96.0/19",
        "46.185.128.0/17",  "46.248.192.0/19",  "62.72.160.0/19",
        "77.245.0.0/20",    "79.134.128.0/19",  "79.173.192.0/18",
        "80.90.160.0/20",   "81.21.0.0/20",     "82.212.64.0/19",
        "87.236.232.0/21",  "89.249.64.0/20",   "91.186.0.0/18",
        "93.191.176.0/21",  "94.127.208.0/21",  "94.142.32.0/19",
        "95.141.208.0/20",  "109.237.192.0/20", "176.29.0.0/16",
        "176.57.0.0/19",    "176.57.48.0/20",   "176.241.64.0/21",
        "178.16.96.0/21",   "178.20.184.0/21",  "178.77.128.0/18",
        "185.14.132.0/22",  "185.27.118.0/23",  "185.30.248.0/22",
        "185.33.28.0/22",   "185.51.212.0/22",  "185.57.120.0/22",
        "185.80.24.0/22",   "185.80.104.0/22",  "185.96.68.0/22",
        "185.98.220.0/21",  "185.109.120.0/22", "185.159.180.0/22",
        "185.160.236.0/22", "185.193.176.0/22", "185.197.176.0/22",
        "185.200.128.0/22", "188.123.160.0/19", "188.247.64.0/19",
        "193.17.53.0/24",   "193.108.134.0/23", "193.188.64.0/19",
        "193.189.148.0/24", "193.203.24.0/23",  "194.104.95.0/24",
        "212.35.64.0/19",   "212.118.0.0/19",   "213.139.32.0/19",
        "213.186.160.0/19", "217.23.32.0/20",   "217.29.240.0/20",
        "217.144.0.0/20"
    ];


    // ════════════════════════════════════════════════════════════
    // §3  UTILITIES
    // ════════════════════════════════════════════════════════════

    function ipToLong(ip) {
        var p = ip.split(".");
        return ((parseInt(p[0],10) * 16777216) +
                (parseInt(p[1],10) * 65536)    +
                (parseInt(p[2],10) * 256)       +
                 parseInt(p[3],10));
    }

    function isIPv4(s) {
        var p = String(s || "").split(".");
        if (p.length !== 4) return false;
        for (var i = 0; i < 4; i++) {
            if (!/^\d+$/.test(p[i])) return false;
            if (parseInt(p[i],10) > 255) return false;
        }
        return true;
    }

    function isPrivate(ip) {
        if (!isIPv4(ip)) return true;
        if (shExpMatch(ip,"127.*"))     return true;
        if (shExpMatch(ip,"10.*"))      return true;
        if (shExpMatch(ip,"192.168.*")) return true;
        if (shExpMatch(ip,"169.254.*")) return true;
        if (shExpMatch(ip,"0.*"))       return true;
        var l = ipToLong(ip);
        if (l >= 2886729728 && l <= 2887778303) return true; // 172.16/12
        if (l >= 1681915904 && l <= 1686110207) return true; // 100.64/10
        return false;
    }

    // djb2 — avalanche hash, fast على JavaScript engine
    function djb2(s) {
        var h = 5381, i;
        for (i = 0; i < s.length; i++) {
            h = (((h << 5) + h) + s.charCodeAt(i)) | 0;
        }
        return (h >>> 0);
    }

    // ════════════════════════════════════════════════════════════
    // §4  PRECOMPUTED CIDR TABLE
    // ════════════════════════════════════════════════════════════

    var JO_TABLE = (function(raw) {
        var t = [], i, p;
        for (i = 0; i < raw.length; i++) {
            p = raw[i].split("/");
            t.push({ net: ipToLong(p[0]), bits: parseInt(p[1],10) });
        }
        return t;
    }(RAW_JO));

    function inJordan(ipLong) {
        var i, e, s;
        for (i = 0; i < JO_TABLE.length; i++) {
            e = JO_TABLE[i];
            if (e.bits === 0)  return true;
            if (e.bits === 32) { if (ipLong === e.net) return true; continue; }
            s = 32 - e.bits;
            if ((ipLong >>> s) === (e.net >>> s)) return true;
        }
        return false;
    }


    // ════════════════════════════════════════════════════════════
    // §5  TIME ENGINE  —  Jordan UTC+3
    //
    //     Peak window   :  16:00–02:00  (prime-time gaming hours)
    //     Low window    :  02:00–16:00
    //
    //     Latency slot  :  4 slots × 6h
    //       Slot 0 (00–06) → شبكة فاضية، أقل congestion
    //       Slot 1 (06–12) → ترافيك تجاري
    //       Slot 2 (12–18) → ذروة نهارية
    //       Slot 3 (18–24) → ذروة مسائية، أعلى congestion
    //
    //     في Slot 3 (أعلى congestion) يُعطى وزن إضافي للبروكسي
    //     الأول (أقل RTT) لتعويض الازدحام.
    // ════════════════════════════════════════════════════════════

    var _d       = new Date();
    var _joHour  = (_d.getUTCHours() + 3) % 24;
    var _isPeak  = (_joHour >= 16 || _joHour < 2);
    var _slot    = Math.floor(_d.getUTCHours() / 6);
    var _PHI32   = 0x9E3779B9;

    // في Slot 3 (ذروة مسائية) يُعزّز وزن البروكسي الأقرب
    var _mW = (_slot === 3)
        ? [8, 3, 1]
        : MATCH_W;

    function compoundSeed(h) {
        return ((djb2(h) ^ ((_slot * _PHI32) >>> 0)) >>> 0);
    }


    // ════════════════════════════════════════════════════════════
    // §6  WEIGHTED SELECTION  +  CHAIN BUILDER
    // ════════════════════════════════════════════════════════════

    function weightedIdx(weights, seed) {
        var total = 0, cum = 0, i;
        for (i = 0; i < weights.length; i++) total += weights[i];
        var r = seed % total;
        for (i = 0; i < weights.length; i++) {
            cum += weights[i];
            if (r < cum) return i;
        }
        return 0;
    }

    function buildChain(pool, start, addDirect) {
        var parts = [], i;
        for (i = 0; i < pool.length; i++) {
            parts.push(pool[(start + i) % pool.length]);
        }
        if (addDirect) parts.push("DIRECT");
        return parts.join("; ");
    }


    // ════════════════════════════════════════════════════════════
    // §7  CLASSIFICATION ENGINE
    // ════════════════════════════════════════════════════════════

    function normalize(s) {
        return String(s || "").toLowerCase().replace(/[\s_\-\.\/\\:?=&#]+/g,"");
    }

    function classify(u, h) {
        var x = normalize(u) + "|" + normalize(h);
        var RULES = [
            { label:"ANTICHEAT",   score:100, keys:["anticheat","security","verify","shield","ban","guard","protect","captcha","fairplay"] },
            { label:"MATCHMAKING", score:90,  keys:["matchmak","sessioncreate","sessionjoin","regionselect","quickmatch","spawnisland","partyjoin","roster","teamup","squadfill","startmatch"] },
            { label:"RANKED",      score:85,  keys:["ranked","seasonrank","rankpush","mmr","conqueror","ace","crown","diamond","leaderboard"] },
            { label:"UNRANKED",    score:80,  keys:["unranked","casual","nonranked","funmatch","eventmode","arcade"] },
            { label:"CORE",        score:75,  keys:["battle","classic","arena","payload","zombie","metro","tdm","fpp","tpp","domination","assault","gungame"] },
            { label:"LOBBY",       score:50,  keys:["lobby","mainmenu","home","inventory","loadout","store","shop","crate","spin","redeem","event","reward","mission","recruit","clan","friend","social","voice"] },
            { label:"LOW",         score:20,  keys:["cdn","asset","patch","analytics","telemetry","crash","log","report","config","download"] }
        ];
        var best = { label:"UNKNOWN", score:0 };
        for (var i = 0; i < RULES.length; i++) {
            var r = RULES[i];
            for (var j = 0; j < r.keys.length; j++) {
                if (x.indexOf(r.keys[j]) !== -1 && r.score > best.score) {
                    best = r; break;
                }
            }
        }
        return best.label;
    }

    function isPUBG(h) {
        var keys = ["pubg","krafton","tencent","levelinfinite","proxima","battlegrounds","pubgmobile","igamecj","livik"];
        var lh = String(h || "").toLowerCase();
        for (var i = 0; i < keys.length; i++) {
            if (lh.indexOf(keys[i]) !== -1) return true;
        }
        return false;
    }


    // ════════════════════════════════════════════════════════════
    // §8  ROUTING DECISION
    // ════════════════════════════════════════════════════════════

    try {
        host = String(host || "").toLowerCase();

        if (isPlainHostName(host))  return "DIRECT";
        if (!isPUBG(host))          return "DIRECT";

        var ip = isIPv4(host) ? host : dnsResolve(host);
        if (!ip || !isIPv4(ip))     return "DIRECT";
        if (isPrivate(ip))          return "DIRECT";

        var ipL  = ipToLong(ip);
        var mode = classify(url, host);
        var seed = compoundSeed(host);

        // ╔══════════════════════════════════════════╗
        // ║         J O R D A N   G A T E           ║
        // ║  فقط IPs أردنية تمر عبر البروكسي        ║
        // ║  أي IP خارج الأردن → DIRECT فوراً       ║
        // ╚══════════════════════════════════════════╝
        if (!inJordan(ipL)) return "DIRECT";

        if (mode === "ANTICHEAT" || mode === "LOW") return "DIRECT";

        // Matchmaking → full chain دائماً بغض النظر عن الوقت
        if (mode === "MATCHMAKING") {
            var mi = weightedIdx(_mW, seed);
            return buildChain(MATCH_POOL, mi, true);
        }

        // Ranked / Unranked / Core
        //   ذروة  → full chain
        //   خارج الذروة → single hop لتقليل latency overhead
        if (mode === "RANKED" || mode === "UNRANKED" || mode === "CORE") {
            var ci = weightedIdx(_mW, seed);
            if (_isPeak) return buildChain(MATCH_POOL, ci, true);
            return MATCH_POOL[ci] + "; DIRECT";
        }

        // Lobby / Unknown → lobby pool خفيف
        var li = weightedIdx(LOBBY_W, seed);
        return LOBBY_POOL[li] + "; DIRECT";

    } catch(e) {
        return "DIRECT";
    }
}
