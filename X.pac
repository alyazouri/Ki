// ============================================================
// PUBG FINAL ULTIMATE FORCED JORDAN LOCK
// UPDATED: All Jordan IPv6 Prefixes (RIPE NCC - March 2026)
// Lobby  = 3 segments
// Match  = 4 segments
// ISP Lock + Forced Retry
// + Global Country Blocks
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  ispNet:   null,
  lobbyNet: null,
  matchNet: null,
  inMatch:  false
};

// ================= IPv6 CHECK =================

function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

// ================= EXPAND IPv6 (:: support) =================

function expandIPv6(address){

  if (!address || address.indexOf(":") === -1) return address;

  var parts = address.split("::");
  var full = [];

  if (parts.length === 2){
    var left  = parts[0] ? parts[0].split(":") : [];
    var right = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);

    full = left;
    for (var i=0;i<missing;i++) full.push("0000");
    full = full.concat(right);
  } else {
    full = address.split(":");
  }

  for (var j=0;j<full.length;j++){
    while(full[j].length < 4) full[j] = "0" + full[j];
  }

  return full.join(":").toLowerCase();
}

// ================= JORDAN PREFIX CHECK (COMPLETE - March 2026) =================

function isJordan(ip){

  ip = expandIPv6(ip);

  // ---------- 2001:32c0::/29 ----------
  if (ip.startsWith("2001:32c0:") ||
      ip.startsWith("2001:32c1:") ||
      ip.startsWith("2001:32c2:") ||
      ip.startsWith("2001:32c3:") ||
      ip.startsWith("2001:32c4:") ||
      ip.startsWith("2001:32c5:") ||
      ip.startsWith("2001:32c6:") ||
      ip.startsWith("2001:32c7:")) return true;

  // ---------- 2a00:4620::/32 ----------
  if (ip.startsWith("2a00:4620:")) return true;

  // ---------- 2a00:76e0::/32 ----------
  if (ip.startsWith("2a00:76e0:")) return true;

  // ---------- 2a00:b860::/32 ----------
  if (ip.startsWith("2a00:b860:")) return true;

  // ---------- 2a00:caa0::/32 ----------
  if (ip.startsWith("2a00:caa0:")) return true;

  // ---------- 2a01:01d0::/29 (2a01:1d0::/29) ----------
  if (ip.startsWith("2a01:01d0:") ||
      ip.startsWith("2a01:01d1:") ||
      ip.startsWith("2a01:01d2:") ||
      ip.startsWith("2a01:01d3:") ||
      ip.startsWith("2a01:01d4:") ||
      ip.startsWith("2a01:01d5:") ||
      ip.startsWith("2a01:01d6:") ||
      ip.startsWith("2a01:01d7:")) return true;

  // ---------- 2a01:9700::/29 (Orange Jordan) ----------
  if (ip.startsWith("2a01:9700:") ||
      ip.startsWith("2a01:9701:") ||
      ip.startsWith("2a01:9702:") ||
      ip.startsWith("2a01:9703:") ||
      ip.startsWith("2a01:9704:") ||
      ip.startsWith("2a01:9705:") ||
      ip.startsWith("2a01:9706:") ||
      ip.startsWith("2a01:9707:")) return true;

  // ---------- 2a01:e240::/29 ----------
  if (ip.startsWith("2a01:e240:") ||
      ip.startsWith("2a01:e241:") ||
      ip.startsWith("2a01:e242:") ||
      ip.startsWith("2a01:e243:") ||
      ip.startsWith("2a01:e244:") ||
      ip.startsWith("2a01:e245:") ||
      ip.startsWith("2a01:e246:") ||
      ip.startsWith("2a01:e247:")) return true;

  // ---------- 2a01:ee40::/29 ----------
  if (ip.startsWith("2a01:ee40:") ||
      ip.startsWith("2a01:ee41:") ||
      ip.startsWith("2a01:ee42:") ||
      ip.startsWith("2a01:ee43:") ||
      ip.startsWith("2a01:ee44:") ||
      ip.startsWith("2a01:ee45:") ||
      ip.startsWith("2a01:ee46:") ||
      ip.startsWith("2a01:ee47:")) return true;

  // ---------- 2a02:09c0::/29 (Batelco) ----------
  if (ip.startsWith("2a02:09c0:") ||
      ip.startsWith("2a02:09c1:") ||
      ip.startsWith("2a02:09c2:") ||
      ip.startsWith("2a02:09c3:") ||
      ip.startsWith("2a02:09c4:") ||
      ip.startsWith("2a02:09c5:") ||
      ip.startsWith("2a02:09c6:") ||
      ip.startsWith("2a02:09c7:")) return true;

  // ---------- 2a02:2558::/29 (Zain) ----------
  if (ip.startsWith("2a02:2558:") ||
      ip.startsWith("2a02:2559:") ||
      ip.startsWith("2a02:255a:") ||
      ip.startsWith("2a02:255b:") ||
      ip.startsWith("2a02:255c:") ||
      ip.startsWith("2a02:255d:") ||
      ip.startsWith("2a02:255e:") ||
      ip.startsWith("2a02:255f:")) return true;

  // ---------- 2a02:e680::/29 ----------
  if (ip.startsWith("2a02:e680:") ||
      ip.startsWith("2a02:e681:") ||
      ip.startsWith("2a02:e682:") ||
      ip.startsWith("2a02:e683:") ||
      ip.startsWith("2a02:e684:") ||
      ip.startsWith("2a02:e685:") ||
      ip.startsWith("2a02:e686:") ||
      ip.startsWith("2a02:e687:")) return true;

  // ---------- 2a02:f0c0::/29 ----------
  if (ip.startsWith("2a02:f0c0:") ||
      ip.startsWith("2a02:f0c1:") ||
      ip.startsWith("2a02:f0c2:") ||
      ip.startsWith("2a02:f0c3:") ||
      ip.startsWith("2a02:f0c4:") ||
      ip.startsWith("2a02:f0c5:") ||
      ip.startsWith("2a02:f0c6:") ||
      ip.startsWith("2a02:f0c7:")) return true;

  // ---------- 2a03:6b00::/29 (Umniah) ----------
  if (ip.startsWith("2a03:6b00:") ||
      ip.startsWith("2a03:6b01:") ||
      ip.startsWith("2a03:6b02:") ||
      ip.startsWith("2a03:6b03:") ||
      ip.startsWith("2a03:6b04:") ||
      ip.startsWith("2a03:6b05:") ||
      ip.startsWith("2a03:6b06:") ||
      ip.startsWith("2a03:6b07:")) return true;

  // ---------- 2a03:6d00::/32 (Umniah) ----------
  if (ip.startsWith("2a03:6d00:")) return true;

  // ---------- 2a03:b640::/32 (Orbitel) ----------
  if (ip.startsWith("2a03:b640:")) return true;

  // ---------- 2a04:4cc0::/29 ----------
  if (ip.startsWith("2a04:4cc0:") ||
      ip.startsWith("2a04:4cc1:") ||
      ip.startsWith("2a04:4cc2:") ||
      ip.startsWith("2a04:4cc3:") ||
      ip.startsWith("2a04:4cc4:") ||
      ip.startsWith("2a04:4cc5:") ||
      ip.startsWith("2a04:4cc6:") ||
      ip.startsWith("2a04:4cc7:")) return true;

  // ---------- 2a05:74c0::/29 (FirstNet/Batelco) ----------
  if (ip.startsWith("2a05:74c0:") ||
      ip.startsWith("2a05:74c1:") ||
      ip.startsWith("2a05:74c2:") ||
      ip.startsWith("2a05:74c3:") ||
      ip.startsWith("2a05:74c4:") ||
      ip.startsWith("2a05:74c5:") ||
      ip.startsWith("2a05:74c6:") ||
      ip.startsWith("2a05:74c7:")) return true;

  // ---------- 2a05:7500::/29 ----------
  if (ip.startsWith("2a05:7500:") ||
      ip.startsWith("2a05:7501:") ||
      ip.startsWith("2a05:7502:") ||
      ip.startsWith("2a05:7503:") ||
      ip.startsWith("2a05:7504:") ||
      ip.startsWith("2a05:7505:") ||
      ip.startsWith("2a05:7506:") ||
      ip.startsWith("2a05:7507:")) return true;

  // ---------- 2a06:9bc0::/29 ----------
  if (ip.startsWith("2a06:9bc0:") ||
      ip.startsWith("2a06:9bc1:") ||
      ip.startsWith("2a06:9bc2:") ||
      ip.startsWith("2a06:9bc3:") ||
      ip.startsWith("2a06:9bc4:") ||
      ip.startsWith("2a06:9bc5:") ||
      ip.startsWith("2a06:9bc6:") ||
      ip.startsWith("2a06:9bc7:")) return true;

  // ---------- 2a06:bd80::/29 (2025) ----------
  if (ip.startsWith("2a06:bd80:") ||
      ip.startsWith("2a06:bd81:") ||
      ip.startsWith("2a06:bd82:") ||
      ip.startsWith("2a06:bd83:") ||
      ip.startsWith("2a06:bd84:") ||
      ip.startsWith("2a06:bd85:") ||
      ip.startsWith("2a06:bd86:") ||
      ip.startsWith("2a06:bd87:")) return true;

  // ---------- 2a07:0140::/29 ----------
  if (ip.startsWith("2a07:0140:") ||
      ip.startsWith("2a07:0141:") ||
      ip.startsWith("2a07:0142:") ||
      ip.startsWith("2a07:0143:") ||
      ip.startsWith("2a07:0144:") ||
      ip.startsWith("2a07:0145:") ||
      ip.startsWith("2a07:0146:") ||
      ip.startsWith("2a07:0147:")) return true;

  // ---------- 2a0a:2740::/29 ----------
  if (ip.startsWith("2a0a:2740:") ||
      ip.startsWith("2a0a:2741:") ||
      ip.startsWith("2a0a:2742:") ||
      ip.startsWith("2a0a:2743:") ||
      ip.startsWith("2a0a:2744:") ||
      ip.startsWith("2a0a:2745:") ||
      ip.startsWith("2a0a:2746:") ||
      ip.startsWith("2a0a:2747:")) return true;

  // ---------- 2a0c:39c0::/29 ----------
  if (ip.startsWith("2a0c:39c0:") ||
      ip.startsWith("2a0c:39c1:") ||
      ip.startsWith("2a0c:39c2:") ||
      ip.startsWith("2a0c:39c3:") ||
      ip.startsWith("2a0c:39c4:") ||
      ip.startsWith("2a0c:39c5:") ||
      ip.startsWith("2a0c:39c6:") ||
      ip.startsWith("2a0c:39c7:")) return true;

  // ---------- 2a0d:cf40::/29 ----------
  if (ip.startsWith("2a0d:cf40:") ||
      ip.startsWith("2a0d:cf41:") ||
      ip.startsWith("2a0d:cf42:") ||
      ip.startsWith("2a0d:cf43:") ||
      ip.startsWith("2a0d:cf44:") ||
      ip.startsWith("2a0d:cf45:") ||
      ip.startsWith("2a0d:cf46:") ||
      ip.startsWith("2a0d:cf47:")) return true;

  // ---------- 2a10:1100::/29 ----------
  if (ip.startsWith("2a10:1100:") ||
      ip.startsWith("2a10:1101:") ||
      ip.startsWith("2a10:1102:") ||
      ip.startsWith("2a10:1103:") ||
      ip.startsWith("2a10:1104:") ||
      ip.startsWith("2a10:1105:") ||
      ip.startsWith("2a10:1106:") ||
      ip.startsWith("2a10:1107:")) return true;

  // ---------- 2a10:9740::/29 ----------
  if (ip.startsWith("2a10:9740:") ||
      ip.startsWith("2a10:9741:") ||
      ip.startsWith("2a10:9742:") ||
      ip.startsWith("2a10:9743:") ||
      ip.startsWith("2a10:9744:") ||
      ip.startsWith("2a10:9745:") ||
      ip.startsWith("2a10:9746:") ||
      ip.startsWith("2a10:9747:")) return true;

  // ---------- 2a10:d800::/29 ----------
  if (ip.startsWith("2a10:d800:") ||
      ip.startsWith("2a10:d801:") ||
      ip.startsWith("2a10:d802:") ||
      ip.startsWith("2a10:d803:") ||
      ip.startsWith("2a10:d804:") ||
      ip.startsWith("2a10:d805:") ||
      ip.startsWith("2a10:d806:") ||
      ip.startsWith("2a10:d807:")) return true;

  // ---------- 2a11:d180::/29 ----------
  if (ip.startsWith("2a11:d180:") ||
      ip.startsWith("2a11:d181:") ||
      ip.startsWith("2a11:d182:") ||
      ip.startsWith("2a11:d183:") ||
      ip.startsWith("2a11:d184:") ||
      ip.startsWith("2a11:d185:") ||
      ip.startsWith("2a11:d186:") ||
      ip.startsWith("2a11:d187:")) return true;

  // ---------- 2a13:1f00::/29 ----------
  if (ip.startsWith("2a13:1f00:") ||
      ip.startsWith("2a13:1f01:") ||
      ip.startsWith("2a13:1f02:") ||
      ip.startsWith("2a13:1f03:") ||
      ip.startsWith("2a13:1f04:") ||
      ip.startsWith("2a13:1f05:") ||
      ip.startsWith("2a13:1f06:") ||
      ip.startsWith("2a13:1f07:")) return true;

  // ---------- 2a13:5c00::/29 ----------
  if (ip.startsWith("2a13:5c00:") ||
      ip.startsWith("2a13:5c01:") ||
      ip.startsWith("2a13:5c02:") ||
      ip.startsWith("2a13:5c03:") ||
      ip.startsWith("2a13:5c04:") ||
      ip.startsWith("2a13:5c05:") ||
      ip.startsWith("2a13:5c06:") ||
      ip.startsWith("2a13:5c07:")) return true;

  // ---------- 2a13:8d40::/29 ----------
  if (ip.startsWith("2a13:8d40:") ||
      ip.startsWith("2a13:8d41:") ||
      ip.startsWith("2a13:8d42:") ||
      ip.startsWith("2a13:8d43:") ||
      ip.startsWith("2a13:8d44:") ||
      ip.startsWith("2a13:8d45:") ||
      ip.startsWith("2a13:8d46:") ||
      ip.startsWith("2a13:8d47:")) return true;

  // ---------- 2a14:1a40::/29 ----------
  if (ip.startsWith("2a14:1a40:") ||
      ip.startsWith("2a14:1a41:") ||
      ip.startsWith("2a14:1a42:") ||
      ip.startsWith("2a14:1a43:") ||
      ip.startsWith("2a14:1a44:") ||
      ip.startsWith("2a14:1a45:") ||
      ip.startsWith("2a14:1a46:") ||
      ip.startsWith("2a14:1a47:")) return true;

  // ---------- 2a14:2840::/29 ----------
  if (ip.startsWith("2a14:2840:") ||
      ip.startsWith("2a14:2841:") ||
      ip.startsWith("2a14:2842:") ||
      ip.startsWith("2a14:2843:") ||
      ip.startsWith("2a14:2844:") ||
      ip.startsWith("2a14:2845:") ||
      ip.startsWith("2a14:2846:") ||
      ip.startsWith("2a14:2847:")) return true;

  return false;
}

// ================= PUBG DETECTION =================

function isPUBG(h,u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h+u);
}

// ================= MAIN =================

function FindProxyForURL(url, host){

  var ip="";
  try { ip = dnsResolve(host); } catch(e){ ip=""; }

  if (isPlainHostName(host)) return DIRECT;
  if (!isPUBG(host,url)) return DIRECT;
  if (!ip || !isIPv6(ip)) return BLOCK;

  var fullIP = expandIPv6(ip);

  // ===== BLOCK ARUBA =====
  if (
    fullIP.startsWith("2a00:1450:") ||
    fullIP.startsWith("2a00:bdc0:")  ||
    fullIP.startsWith("2a00:13c0:")  ||
    fullIP.startsWith("2a00:1fa0:")
  ) return BLOCK;

  // ===== BLOCK IRAN =====
  if (
    fullIP.startsWith("2a00:1a60:") ||
    fullIP.startsWith("2a00:1b20:") ||
    fullIP.startsWith("2a01:5ec0:") ||
    fullIP.startsWith("2a03:3b40:")
  ) return BLOCK;

  // ===== BLOCK PAKISTAN =====
  if (
    fullIP.startsWith("2401:4900:") ||
    fullIP.startsWith("2407:")
  ) return BLOCK;

  // ===== BLOCK AFGHANISTAN =====
  if (
    fullIP.startsWith("2400:3c00:") ||
    fullIP.startsWith("2400:4f00:")
  ) return BLOCK;

  // ===== BLOCK LIBYA =====
  if (
    fullIP.startsWith("2c0f:f248:") ||
    fullIP.startsWith("2c0f:f7c0:")
  ) return BLOCK;

  // ===== JORDAN ONLY =====
  if (!isJordan(ip)) return BLOCK;

  var parts  = fullIP.split(":");
  var isp2 = parts.slice(0,3).join(":");
  var net3 = parts.slice(0,3).join(":");
  var net4 = parts.slice(0,4).join(":");

  var data = (host+url).toLowerCase();

  var isLobby = /lobby|login|auth|session|gateway|region|matchmaking|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download|social|rank|leaderboard/i.test(data);

  var isMatch = /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival/i.test(data);

  if (!isMatch && SESSION.inMatch){
    SESSION.matchNet = null;
    SESSION.inMatch  = false;
  }

  if (isLobby){

    if (!SESSION.ispNet) SESSION.ispNet = isp2;
    if (isp2 !== SESSION.ispNet) return BLOCK;

    if (!SESSION.lobbyNet) SESSION.lobbyNet = net3;

    return PROXY;
  }

  if (isMatch){

    if (!SESSION.matchNet){

      if (!SESSION.ispNet) SESSION.ispNet = isp2;
      if (isp2 !== SESSION.ispNet) return BLOCK;

      SESSION.matchNet = net4;
      SESSION.inMatch  = true;

      return PROXY;
    }

    if (isp2 !== SESSION.ispNet) return BLOCK;
    if (net4 !== SESSION.matchNet) return BLOCK;

    return PROXY;
  }

  return PROXY;
}
