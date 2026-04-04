function FindProxyForURL(url, host) {
  // =====================================================================
  // STRICT_JO_ROUTERS_v7 (Geo/RDAP) — live-built + MODES + AREAS /56
  // MODES: "COZY"      → proxy للنطاقات غير الأردنية فقط
  //        "HUNT"      → proxy لكل ترافيك اللعبة حتى مع IP أردني
  //        "HUNT_DEEP" → proxy إجباري لكل شيء بدون استثناء
  // =====================================================================
  var MODE = "COZY";

  var JO_PROXY_HOST    = "212.35.66.45";
  var PORT_LOBBY       = 10010;
  var PORT_MATCH       = 20001;
  var PORT_RECRUIT     = 12000;
  var PORT_UPDATES     = 8080;
  var PORT_CDN         = 443;
  var STICKY_MINUTES   = 10;

  // ─── Jordan IPv6 Prefixes (/56) ────────────────────────────────────
  var JO_V6_PREFIXES = [
  "2001:1238::/32",
    "2a00:11a8::/32",
    "2a00:1b0::/32"
  ];

  // ─── Domain Lists ──────────────────────────────────────────────────
  var PUBG_DOMAINS = {

    // الـ Lobby: تسجيل الدخول، القائمة الرئيسية، الحضور، الأصدقاء
    LOBBY: [
      "*.pubgmobile.com",
      "*.pubgmobile.net",
      "gpubgm.com",
      "*.proximabeta.com",
      "*.igamecj.com",
      "*.amsoveasea.com",        // broker رئيسي للـ matchmaking (مؤكّد netify.ai)
      "*.gsdk.proximabeta.com"   // Gaming SDK endpoints
    ],

    // الـ Match: ربط الجيم الفعلي
    MATCH: [
      "*.gcloud.qq.com",
      "gpubgm.com",
      "*.igamecj.com",
      "*.proximabeta.com",
      "*.amsoveasea.com"         // broker matchmaking
    ],

    // البحث عن فريق / تجنيد
    RECRUIT_SEARCH: [
      "match.igamecj.com",
      "match.proximabeta.com",
      "teamfinder.igamecj.com",
      "teamfinder.proximabeta.com",
      "clan.igamecj.com",
      "clan.proximabeta.com"
    ],

    // التحديثات والـ patches
    UPDATES: [
      "cdn.pubgmobile.com",
      "updates.pubgmobile.com",
      "patch.igamecj.com",
      "hotfix.proximabeta.com",
      "*.tcdn.qq.com",           // يغطي dlied1-6.tcdn.qq.com كلها
      "down.qq.com",
      "*.myqcloud.com",          // Tencent Cloud Object Storage
      "*.cos.ap-*.myqcloud.com"  // COS regional buckets
    ],

    // شبكات توصيل المحتوى
    CDNs: [
      "cdn.igamecj.com",
      "cdn.proximabeta.com",
      "cdn.tencentgames.com",
      "*.dnsv1.com",             // Tencent CDN (مؤكّد netify.ai)
      "*.qcloudcdn.com",
      "*.cloudfront.net",        // Amazon CloudFront (مؤكّد netify.ai)
      "*.edgesuite.net",         // Akamai (مؤكّد netify.ai)
      "*.akamaiedge.net"         // Akamai edge nodes
    ]
  };

  // ─── URL Patterns ──────────────────────────────────────────────────
  var URL_PATTERNS = {
    LOBBY: [
      "*/account/login*",
      "*/client/version*",
      "*/status/heartbeat*",
      "*/presence/*",
      "*/friends/*",
      "*/user/profile*",
      "*/notice/*"
    ],
    MATCH: [
      "*/matchmaking/*",
      "*/mms/*",
      "*/game/start*",
      "*/game/join*",
      "*/report/battle*",
      "*/relay/*"
    ],
    RECRUIT_SEARCH: [
      "*/teamfinder/*",
      "*/clan/*",
      "*/social/*",
      "*/search/*",
      "*/recruit/*"
    ],
    UPDATES: [
      "*/patch*",
      "*/update*",
      "*/hotfix*",
      "*/download/*",
      "*/assets/*",
      "*/assetbundle*",
      "*/obb*",
      "*/apk*"
    ],
    CDNs: [
      "*/cdn/*",
      "*/image/*",
      "*/media/*",
      "*/video/*",
      "*/res/*",
      "*/pkg/*",
      "*/static/*"
    ]
  };

  // ─── IPv6 Helpers ──────────────────────────────────────────────────
  function expandIPv6(addr) {
    if (!addr) return "";
    if (addr.indexOf("::") >= 0) {
      var sides   = addr.split("::");
      var left    = sides[0] ? sides[0].split(":") : [];
      var right   = sides[1] ? sides[1].split(":") : [];
      var missing = 8 - (left.length + right.length);
      var mid     = [];
      for (var i = 0; i < missing; i++) mid.push("0");
      var full = left.concat(mid, right);
      for (var j = 0; j < full.length; j++)
        full[j] = ("0000" + (full[j] || "0")).slice(-4);
      return full.join(":");
    } else {
      return addr.split(":").map(function (x) {
        return ("0000" + x).slice(-4);
      }).join(":");
    }
  }
  function ipv6Hex(ip) { return expandIPv6(ip).replace(/:/g, "").toLowerCase(); }
  function inCidrV6(ip, cidr) {
    var parts   = cidr.split("/");
    var pref    = parts[0];
    var bits    = parts.length > 1 ? parseInt(parts[1], 10) : 128;
    var ipHex   = ipv6Hex(ip);
    var prefHex = ipv6Hex(pref);
    var nibbles = Math.floor(bits / 4);
    if (ipHex.substring(0, nibbles) !== prefHex.substring(0, nibbles)) return false;
    if (bits % 4 === 0) return true;
    var maskBits = bits % 4;
    var mask     = (0xF << (4 - maskBits)) & 0xF;
    return (parseInt(ipHex.charAt(nibbles), 16) & mask) ===
           (parseInt(prefHex.charAt(nibbles), 16) & mask);
  }
  function isJOv6(ip) {
    if (!ip || ip.indexOf(":") < 0) return false;
    for (var i = 0; i < JO_V6_PREFIXES.length; i++)
      if (inCidrV6(ip, JO_V6_PREFIXES[i])) return true;
    return false;
  }

  // ─── Match Helpers ─────────────────────────────────────────────────
  function matchDomain(h, list) {
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      if (p.indexOf("*") >= 0) { if (shExpMatch(h, p)) return true; }
      else                       { if (dnsDomainIs(h, p)) return true; }
    }
    return false;
  }
  function matchURL(u, patterns) {
    for (var i = 0; i < patterns.length; i++)
      if (shExpMatch(u, patterns[i])) return true;
    return false;
  }

  // ─── Sticky Cache ──────────────────────────────────────────────────
  if (typeof _stickyCache === "undefined") { var _stickyCache = {}; }
  function nowMin()       { return Math.floor((new Date()).getTime() / 60000); }
  function stickyGet(h)   { var e = _stickyCache[h]; if (!e) return null; if (nowMin() - e.t > STICKY_MINUTES) return null; return e.v; }
  function stickyPut(h,v) { _stickyCache[h] = { t: nowMin(), v: v }; }
  function ret(h, v)      { stickyPut(h, v); return v; }

  // ─── Proxy Line Builder ────────────────────────────────────────────
  function px(port) { return "SOCKS5 " + JO_PROXY_HOST + ":" + port; }

  // ─── Mode Decision Engine ──────────────────────────────────────────
  // COZY      → proxy فقط إذا الـ IP ليس أردنياً
  // HUNT      → proxy لكل ترافيك اللعبة حتى لو IP أردني (يتجاوز الـ geo check)
  // HUNT_DEEP → proxy إجباري لكل شيء بلا استثناء
  function decide(port, isGameTraffic) {
    if (MODE === "HUNT_DEEP") {
      // إجباري — لا يهمنا الـ IP
      return ret(host, px(port));
    }
    if (MODE === "HUNT") {
      // ترافيك اللعبة دائماً عبر الـ proxy
      if (isGameTraffic) return ret(host, px(port));
      // باقي الترافيك: نفس منطق COZY
    }
    // COZY (وباقي حالات HUNT غير اللعبة)
    var ip = dnsResolve(host);
    if (isJOv6(ip)) return ret(host, "DIRECT");
    return ret(host, px(port));
  }

  // ─── YouTube / Google Video → دائماً مباشر ────────────────────────
  var YT = ["youtube.com","youtu.be","googlevideo.com","ytimg.com","youtube-nocookie.com"];
  if (matchDomain(host, YT)) return "DIRECT";

  // ─── Sticky Cache Check ────────────────────────────────────────────
  var cached = stickyGet(host);
  if (cached) return cached;

  // ─── Routing Rules (من الأكثر تحديداً إلى الأعم) ─────────────────

  if (matchDomain(host, PUBG_DOMAINS.MATCH) || matchURL(url, URL_PATTERNS.MATCH))
    return decide(PORT_MATCH, true);

  if (matchDomain(host, PUBG_DOMAINS.RECRUIT_SEARCH) || matchURL(url, URL_PATTERNS.RECRUIT_SEARCH))
    return decide(PORT_RECRUIT, true);

  if (matchDomain(host, PUBG_DOMAINS.LOBBY) || matchURL(url, URL_PATTERNS.LOBBY))
    return decide(PORT_LOBBY, true);

  if (matchDomain(host, PUBG_DOMAINS.UPDATES) || matchURL(url, URL_PATTERNS.UPDATES))
    return decide(PORT_UPDATES, true);

  if (matchDomain(host, PUBG_DOMAINS.CDNs) || matchURL(url, URL_PATTERNS.CDNs))
    return decide(PORT_CDN, false);

  // ─── Fallback ─────────────────────────────────────────────────────
  if (MODE === "HUNT_DEEP") return ret(host, px(PORT_LOBBY));
  var ip = dnsResolve(host);
  if (isJOv6(ip)) return ret(host, "DIRECT");
  return ret(host, px(PORT_LOBBY));
}
