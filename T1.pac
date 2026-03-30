// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  PUBG MOBILE JORDAN — V5.0 CUSTOM BUILD 🇯🇴                                 ║
// ║  Generated: 2026-03-30                                                       ║
// ║  Ranges: 12 | Amman: 8 | Match: 3 | Lobby: 3 | Voice: 1                        ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ═══ MATCH PROXIES ═══
var MATCH_PROXIES = [
  { id: "M1", proxy: "PROXY 46.185.131.218:20001", city: "عمّان-مركز", tier: 1, priority: 1, alive: true, latency: 1, lastCheck: 0, failStreak: 0 },
  { id: "M2", proxy: "PROXY 212.35.66.45:20001", city: "عمّان-شرق", tier: 1, priority: 2, alive: true, latency: 2, lastCheck: 0, failStreak: 0 },
  { id: "M3", proxy: "PROXY 176.29.153.95:20001", city: "عمّان-غرب", tier: 1, priority: 3, alive: true, latency: 2, lastCheck: 0, failStreak: 0 }
];

// ═══ LOBBY PROXIES ═══
var LOBBY_POOL = [
  { id: "L1", proxy: "PROXY 46.185.131.218:20002", weight: 8, score: 100, alive: true, city: "عمّان", consecutiveFails: 0 },
  { id: "L2", proxy: "PROXY 176.29.153.95:9030", weight: 7, score: 100, alive: true, city: "عمّان", consecutiveFails: 0 },
  { id: "L3", proxy: "PROXY 212.35.66.45:8085", weight: 6, score: 100, alive: true, city: "عمّان", consecutiveFails: 0 }
];

// ═══ SOCIAL PROXIES ═══
var SOCIAL_POOL = [
  { id: "S1", proxy: "PROXY 46.185.131.220:20003", alive: true, score: 100, type: "voice", city: "عمّان" }
];

// ═══ SPECTATE PROXIES ═══
var SPECTATE_POOL = [
  { id: "SP1", proxy: "PROXY 46.185.131.218:20004", alive: true, score: 100 }
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ═══ JORDAN IPv4 — 12 ranges (Custom Selection) ═══
var JORDAN_IPV4 = [
  ["94.249.0.0", "255.255.0.0"],  // Zain — Zain عقدة عمّان
  ["178.77.128.0", "255.255.128.0"],  // Umniah — Umniah عقدة عمّان
  ["37.152.0.0", "255.255.240.0"],  // Umniah — Umniah عبر عمّان
  ["149.200.128.0", "255.255.128.0"],  // Umniah — Umniah عقدة عمّان
  ["217.18.224.0", "255.255.224.0"],  // Orange — Orange Core عمّان
  ["85.113.64.0", "255.255.192.0"],  // Orange — Orange LTE عمّان
  ["91.106.96.0", "255.255.240.0"],  // Orange — Orange Fiber عمّان
  ["77.69.0.0", "255.255.128.0"],  // Orange — Orange DSL عمّان
  ["82.212.64.0", "255.255.192.0"],  // Zain — Zain LTE عمّان
  ["37.202.64.0", "255.255.192.0"],  // Zain — Zain 4G عمّان
  ["185.117.72.0", "255.255.252.0"],  // Zain — Zain Fiber عمّان
  ["178.77.128.0", "255.255.192.0"]  // Umniah — Umniah 4G عمّان
];

// ═══ AMMAN-SPECIFIC — 8 ranges ═══
var AMMAN_IPV4 = [
  ["217.18.224.0", "255.255.224.0"],
  ["85.113.64.0", "255.255.192.0"],
  ["91.106.96.0", "255.255.240.0"],
  ["77.69.0.0", "255.255.128.0"],
  ["82.212.64.0", "255.255.192.0"],
  ["37.202.64.0", "255.255.192.0"],
  ["185.117.72.0", "255.255.252.0"],
  ["178.77.128.0", "255.255.192.0"]
];

var JORDAN_IPV6 = [
  "2a00:18d0","2a00:18d4","2a00:18d8","2a00:18dc",
  "2a01:9700","2a01:9704","2a01:9708","2a01:970c",
  "2a02:c040","2a02:c044","2a02:c048",
  "2a04:2e00","2a04:2e04","2a04:2e08",
  "2a05:74c0","2a06:8ec0","2001:41f0",
  "2a09:b2c0","2a0d:5600","2a0e:97c0"
];

// ═══ GLOBAL SERVER BLOCKER ═══
var BLOCKED_SERVER_REGIONS = [  ["3.0.0.0","255.0.0.0"],["4.0.0.0","252.0.0.0"],["8.0.0.0","255.0.0.0"],
  ["12.0.0.0","252.0.0.0"],["16.0.0.0","240.0.0.0"],["32.0.0.0","224.0.0.0"],
  ["52.0.0.0","252.0.0.0"],["54.0.0.0","254.0.0.0"],["64.0.0.0","192.0.0.0"],
  ["72.0.0.0","248.0.0.0"],["96.0.0.0","224.0.0.0"],["104.0.0.0","248.0.0.0"],
  ["128.0.0.0","192.0.0.0"],["142.0.0.0","254.0.0.0"],["172.64.0.0","255.192.0.0"],
  ["184.0.0.0","252.0.0.0"],["192.0.0.0","255.128.0.0"],["199.0.0.0","255.0.0.0"],
  ["204.0.0.0","252.0.0.0"],["208.0.0.0","240.0.0.0"],
  ["177.0.0.0","255.0.0.0"],["179.0.0.0","255.0.0.0"],["181.0.0.0","255.0.0.0"],
  ["186.0.0.0","254.0.0.0"],["189.0.0.0","255.0.0.0"],["190.0.0.0","254.0.0.0"],
  ["200.0.0.0","252.0.0.0"],
  ["1.0.0.0","255.0.0.0"],["14.0.0.0","254.0.0.0"],["27.0.0.0","255.0.0.0"],
  ["36.0.0.0","254.0.0.0"],["39.0.0.0","255.0.0.0"],["42.0.0.0","254.0.0.0"],
  ["49.0.0.0","255.0.0.0"],["58.0.0.0","254.0.0.0"],["60.0.0.0","252.0.0.0"],
  ["101.0.0.0","255.0.0.0"],["103.0.0.0","255.0.0.0"],["106.0.0.0","254.0.0.0"],
  ["110.0.0.0","254.0.0.0"],["112.0.0.0","240.0.0.0"],["119.0.0.0","255.0.0.0"],
  ["121.0.0.0","255.0.0.0"],["122.0.0.0","254.0.0.0"],["124.0.0.0","252.0.0.0"],
  ["125.0.0.0","255.0.0.0"],["133.0.0.0","255.0.0.0"],["150.0.0.0","254.0.0.0"],
  ["153.0.0.0","255.0.0.0"],["157.0.0.0","255.0.0.0"],["163.0.0.0","255.0.0.0"],
  ["175.0.0.0","255.0.0.0"],["180.0.0.0","252.0.0.0"],["202.0.0.0","254.0.0.0"],
  ["210.0.0.0","254.0.0.0"],["218.0.0.0","254.0.0.0"],["220.0.0.0","252.0.0.0"],
  ["222.0.0.0","254.0.0.0"],
  ["41.0.0.0","255.0.0.0"],["102.0.0.0","254.0.0.0"],["105.0.0.0","255.0.0.0"],
  ["154.0.0.0","254.0.0.0"],["156.0.0.0","252.0.0.0"],["160.0.0.0","224.0.0.0"],
  ["196.0.0.0","252.0.0.0"],["197.0.0.0","255.0.0.0"],
  ["43.224.0.0","255.224.0.0"],["116.0.0.0","252.0.0.0"],["120.0.0.0","254.0.0.0"],
  ["144.0.0.0","240.0.0.0"],["203.0.0.0","255.0.0.0"],
  ["103.5.172.0","255.255.252.0"],["103.15.220.0","255.255.252.0"],
  ["103.24.148.0","255.255.252.0"],["103.26.104.0","255.255.252.0"],
  ["103.29.140.0","255.255.252.0"],["103.31.248.0","255.255.252.0"],
  ["103.244.40.0","255.255.252.0"],["43.231.28.0","255.255.252.0"],
  ["43.249.40.0","255.255.252.0"],
  ["190.220.0.0","255.252.0.0"],["181.41.192.0","255.255.192.0"],
  ["200.1.80.0","255.255.240.0"],
  ["5.0.0.0","255.0.0.0"],["31.0.0.0","255.0.0.0"],["46.0.0.0","255.0.0.0"],
  ["62.0.0.0","254.0.0.0"],["77.0.0.0","255.0.0.0"],["78.0.0.0","254.0.0.0"],
  ["80.0.0.0","240.0.0.0"],["89.0.0.0","255.0.0.0"],["91.0.0.0","255.0.0.0"],
  ["93.0.0.0","255.0.0.0"],["95.0.0.0","255.0.0.0"],["109.0.0.0","255.0.0.0"],
  ["178.0.0.0","254.0.0.0"],["185.0.0.0","255.0.0.0"],["188.0.0.0","252.0.0.0"],
  ["193.0.0.0","255.0.0.0"],["194.0.0.0","254.0.0.0"],["195.0.0.0","255.0.0.0"],
  ["212.0.0.0","252.0.0.0"],["213.0.0.0","255.0.0.0"],["217.0.0.0","255.0.0.0"]
];

var BLOCKED_IPV6 = ["2001:43f8","2c0f:","2400:","2404:","2406:","2408:","240e:","2600:","2602:","2604:","2607:","2610:","2620:","2800:","2801:","2804:","2001:4860","2607:f8b0","2a03:","2a0c:"];

var ALLOWED_NEIGHBORS_IPV4 = [  ["2.88.0.0","255.248.0.0"],["5.40.0.0","255.248.0.0"],["37.104.0.0","255.248.0.0"],
  ["46.235.0.0","255.255.0.0"],["78.93.0.0","255.255.0.0"],["188.48.0.0","255.248.0.0"],
  ["5.30.0.0","255.254.0.0"],["5.32.0.0","255.252.0.0"],["82.148.0.0","255.254.0.0"],
  ["94.56.0.0","255.248.0.0"],["188.52.0.0","255.252.0.0"],
  ["37.236.0.0","255.252.0.0"],["77.48.0.0","255.248.0.0"],["185.56.88.0","255.255.252.0"],
  ["5.102.0.0","255.254.0.0"],["37.8.0.0","255.252.0.0"],["188.161.0.0","255.255.0.0"]
];

var KNOWN_JO_GAME_HOSTS = [
  "46.185.131", "212.35.66", "176.29.153"
];

var BLOCKED_DOMAINS = [  "ads.pubg","ad.tencent","pgdt.ugdtimg","adsmind.apdcdn","mi.gdt.qq",  "adx.tencent","appsflyer.com","adjust.com","branch.io","analytics.google",  "crashlytics","bugly.qq","beacon.qq","sentry.io","newrelic","datadog",  "hotjar","mixpanel","amplitude","segment.io","mparticle",  ".af",".aw",".ly","afghan","aruba","libya","tripoli",  "na.pubg","sa.pubg","eu-west.pubg","eu-north.pubg","as.pubg",  "sea.pubg","kr.pubg","jp.pubg","oc.pubg","ru.pubg","cn.pubg","tw.pubg","la.pubg"];

var ISP_FINGERPRINTS = {
  "orange":  { asn: 8376,  matchProxy: 0, lobbyWeight: 8 },
  "zain":    { asn: 48832, matchProxy: 1, lobbyWeight: 7 },
  "umniah":  { asn: 9038,  matchProxy: 2, lobbyWeight: 7 },
  "jtg":     { asn: 8697,  matchProxy: 2, lobbyWeight: 6 },
  "batelco": { asn: 42932, matchProxy: 2, lobbyWeight: 5 }
};

// ═══ SESSION STATE ═══
var SESSION = {
  matchNet:null,matchHost:null,matchIP:null,matchPort:null,matchFingerprint:null,
  matchStartTime:0,isV6:false,matchState:"idle",
  dnsCache:{},dnsCacheTTL:{},DNS_TTL_MS:30000,
  lobbyIndex:0,socialIndex:0,spectateIndex:0,totalWeight:0,weightsDirty:true,
  matchFailCount:0,lastMatchTime:0,
  warmupDone:false,proxyHealth:{},requestCount:0,matchCount:0,lobbyCount:0,socialCount:0,
  latencyPredict:{},detectedISP:null,ispConfidence:0,
  geoLocked:false,geoConfidence:0,isAmmanIP:false,
  preWarmedProxies:{},preWarmComplete:false,
  fastPathCache:{},fastPathHits:0,
  maxAllowedDistance:2,distanceBlockCount:0,
  isPeakHour:false,isWeekend:false,isRamadan:false,timeSlot:"normal",
  metrics:{totalRequests:0,matchRequests:0,lobbyRequests:0,socialRequests:0,blockedRequests:0,directRequests:0,blacklistedRequests:0,distanceBlocked:0,fastPathHits:0,geoLockEnforced:0}
};
var SESSION_TIMEOUT_MS=300000;var MAX_CONSECUTIVE_FAILS=3;var PROXY_COOLDOWN_MS=30000;

function norm(h){if(!h)return"";var c=0,l=-1;for(var i=0;i<h.length;i++){if(h.charAt(i)===":"){c++;l=i;}}return(c===1)?h.substring(0,l):h;}
function isIPv6(ip){return ip&&ip.indexOf(":")>-1&&ip.indexOf(".")===-1;}
function isValidIP(ip){if(!ip)return false;if(isIPv6(ip))return ip.length>3;var p=ip.split(".");if(p.length!==4)return false;for(var i=0;i<4;i++){var n=parseInt(p[i],10);if(isNaN(n)||n<0||n>255)return false;}return true;}
function netPrefix(ip){if(!ip)return"";if(isIPv6(ip))return ip.split(":").slice(0,3).join(":");return ip.split(".").slice(0,3).join(".");}
function extractPort(url){var m=url.match(/:(d{2,5})//);return m?m[1]:null;}
function inV4List(ip,list){if(!ip||isIPv6(ip))return false;for(var i=0;i<list.length;i++){try{if(isInNet(ip,list[i][0],list[i][1]))return true;}catch(e){}}return false;}

function fastPathLookup(h,t){var k=h+"|"+t;if(SESSION.fastPathCache[k]){SESSION.fastPathHits++;SESSION.metrics.fastPathHits++;return SESSION.fastPathCache[k];}return null;}
function fastPathStore(h,t,r){SESSION.fastPathCache[h+"|"+t]=r;}
function preWarmCheck(){if(SESSION.preWarmComplete)return;if(SESSION.requestCount>=5){SESSION.preWarmComplete=true;}}
function updateFramePriority(){SESSION.framePriority=SESSION.matchState==="active"?"critical":"normal";}

function isAmmanIP(ip){if(!ip||isIPv6(ip))return false;for(var i=0;i<AMMAN_IPV4.length;i++){try{if(isInNet(ip,AMMAN_IPV4[i][0],AMMAN_IPV4[i][1]))return true;}catch(e){}}return false;}
function enforceGeoLock(ip){if(isAmmanIP(ip)){SESSION.isAmmanIP=true;SESSION.geoConfidence=Math.min(100,SESSION.geoConfidence+15);SESSION.geoLocked=true;return"amman";}if(inV4List(ip,JORDAN_IPV4)){SESSION.geoConfidence=Math.min(100,SESSION.geoConfidence+5);SESSION.geoLocked=true;return"jordan";}if(SESSION.maxAllowedDistance>=2){for(var i=0;i<ALLOWED_NEIGHBORS_IPV4.length;i++){try{if(isInNet(ip,ALLOWED_NEIGHBORS_IPV4[i][0],ALLOWED_NEIGHBORS_IPV4[i][1]))return"neighbor";}catch(e){}}}return"blocked";}

function isDistantServer(ip){if(!ip)return true;if(isIPv6(ip)){var low=ip.toLowerCase();for(var i=0;i<BLOCKED_IPV6.length;i++){if(low.indexOf(BLOCKED_IPV6[i].toLowerCase())===0)return true;}for(var i=0;i<JORDAN_IPV6.length;i++){if(low.indexOf(JORDAN_IPV6[i].toLowerCase())===0)return false;}return true;}for(var i=0;i<BLOCKED_SERVER_REGIONS.length;i++){try{if(isInNet(ip,BLOCKED_SERVER_REGIONS[i][0],BLOCKED_SERVER_REGIONS[i][1])){if(inV4List(ip,JORDAN_IPV4))return false;return true;}}catch(e){}}return false;}

function forceJordanMatchmaking(ips){if(!ips||ips.length===0)return null;var jordanIP=null,ammanIP=null;for(var i=0;i<ips.length;i++){var ip=ips[i];if(isIPv6(ip)){for(var j=0;j<JORDAN_IPV6.length;j++){if(ip.toLowerCase().indexOf(JORDAN_IPV6[j])===0){jordanIP=ip;break;}}continue;}if(isDistantServer(ip))continue;if(inV4List(ip,JORDAN_IPV4)){jordanIP=ip;if(isAmmanIP(ip))ammanIP=ip;}}return ammanIP||jordanIP||null;}

function resolveAll(host){var now=Date.now?Date.now():0;if(SESSION.dnsCache[host]&&SESSION.dnsCacheTTL[host]){if(now<SESSION.dnsCacheTTL[host])return SESSION.dnsCache[host];delete SESSION.dnsCache[host];delete SESSION.dnsCacheTTL[host];}var ips=[];try{if(typeof dnsResolveEx==="function"){var ex=dnsResolveEx(host);if(ex){var parts=ex.split(";");for(var i=0;i<parts.length;i++){var p=parts[i].replace(/\s+/g,"");if(p&&isValidIP(p)&&ips.indexOf(p)===-1)ips.push(p);}}}}catch(e){}try{if(typeof dnsResolve==="function"){var v4=dnsResolve(host);if(v4&&isValidIP(v4)&&ips.indexOf(v4)===-1)ips.push(v4);}}catch(e){}if(ips.length>0){SESSION.dnsCache[host]=ips;SESSION.dnsCacheTTL[host]=now+SESSION.DNS_TTL_MS;}return ips;}

function detectISP(ip){if(!ip||isIPv6(ip))return null;var ranges={"orange":["91.106.96.0/255.255.240.0","176.28.128.0/255.255.128.0","176.29.0.0/255.255.0.0","77.69.0.0/255.255.0.0","213.139.192.0/255.255.192.0","213.139.128.0/255.255.192.0","85.113.64.0/255.255.192.0","217.18.224.0/255.255.224.0"],"zain":["82.212.64.0/255.255.192.0","37.202.64.0/255.255.192.0","94.249.0.0/255.255.0.0","37.48.64.0/255.255.192.0","185.117.72.0/255.255.252.0"],"umniah":["149.200.128.0/255.255.128.0","178.77.128.0/255.255.128.0","37.152.0.0/255.255.240.0","185.16.72.0/255.255.252.0"],"jtg":["212.35.64.0/255.255.128.0","217.144.64.0/255.255.192.0","86.108.0.0/255.252.0.0"],"batelco":["87.101.128.0/255.255.128.0","185.86.232.0/255.255.252.0"]};for(var name in ranges){for(var j=0;j<ranges[name].length;j++){var parts=ranges[name][j].split("/");try{if(isInNet(ip,parts[0],parts[1]))return name;}catch(e){}}}return null;}
function updateISP(ip){var isp=detectISP(ip);if(isp){if(SESSION.detectedISP===isp)SESSION.ispConfidence=Math.min(100,SESSION.ispConfidence+10);else{SESSION.detectedISP=isp;SESSION.ispConfidence=30;}}}
function predictBestProxy(list){var best=0,bestLat=999999;for(var i=0;i<list.length;i++){if(!list[i].alive)continue;var lat=SESSION.latencyPredict[list[i].id]||list[i].latency||50;if(lat<bestLat){bestLat=lat;best=i;}}return best;}

function matchProxy(){if(SESSION.detectedISP&&SESSION.ispConfidence>50){var isp=ISP_FINGERPRINTS[SESSION.detectedISP];if(isp&&MATCH_PROXIES[isp.matchProxy]&&MATCH_PROXIES[isp.matchProxy].alive)return MATCH_PROXIES[isp.matchProxy].proxy;}var best=predictBestProxy(MATCH_PROXIES);if(MATCH_PROXIES[best]&&MATCH_PROXIES[best].alive)return MATCH_PROXIES[best].proxy;for(var i=0;i<MATCH_PROXIES.length;i++){if(MATCH_PROXIES[i].alive)return MATCH_PROXIES[i].proxy;}return MATCH_PROXIES[0].proxy;}
function matchProxyChain(){var chain=[];for(var t=1;t<=2;t++){for(var i=0;i<MATCH_PROXIES.length;i++){if(MATCH_PROXIES[i].alive&&MATCH_PROXIES[i].tier===t)chain.push(MATCH_PROXIES[i].proxy);}}if(chain.length===0)chain.push(MATCH_PROXIES[0].proxy);return chain.join("; ");}
function recalcWeights(){if(!SESSION.weightsDirty)return;var t=0;for(var i=0;i<LOBBY_POOL.length;i++){if(LOBBY_POOL[i].alive)t+=LOBBY_POOL[i].weight;}SESSION.totalWeight=t||1;SESSION.weightsDirty=false;}
function nextLobby(){recalcWeights();var target=SESSION.lobbyIndex%SESSION.totalWeight;var cum=0;for(var i=0;i<LOBBY_POOL.length;i++){if(!LOBBY_POOL[i].alive)continue;cum+=LOBBY_POOL[i].weight;if(target<cum){SESSION.lobbyIndex++;return LOBBY_POOL[i].proxy;}}SESSION.lobbyIndex++;return LOBBY_POOL[0].proxy;}
function getBestLobby(){var best=null,bestS=-1;for(var i=0;i<LOBBY_POOL.length;i++){if(!LOBBY_POOL[i].alive)continue;var hs=SESSION.proxyHealth[LOBBY_POOL[i].id]?SESSION.proxyHealth[LOBBY_POOL[i].id].score:100;var s=LOBBY_POOL[i].score*(hs/100)*LOBBY_POOL[i].weight;if(s>bestS){bestS=s;best=LOBBY_POOL[i].proxy;}}return best||LOBBY_POOL[0].proxy;}
function nextSocial(){var a=[];for(var i=0;i<SOCIAL_POOL.length;i++){if(SOCIAL_POOL[i].alive)a.push(SOCIAL_POOL[i]);}if(a.length===0)return SOCIAL_POOL[0].proxy;var p=a[SESSION.socialIndex%a.length].proxy;SESSION.socialIndex++;return p;}
function nextSpectate(){var a=[];for(var i=0;i<SPECTATE_POOL.length;i++){if(SPECTATE_POOL[i].alive)a.push(SPECTATE_POOL[i]);}if(a.length===0)return SPECTATE_POOL[0].proxy;var p=a[SESSION.spectateIndex%a.length].proxy;SESSION.spectateIndex++;return p;}

function updateHealth(id,ok){if(!SESSION.proxyHealth[id])SESSION.proxyHealth[id]={success:0,fail:0,score:100,streak:0,cooldown:0};var h=SESSION.proxyHealth[id];if(ok){h.success++;h.streak=0;h.score=Math.min(100,h.score+3);}else{h.fail++;h.streak++;h.score=Math.max(0,h.score-15);if(h.streak>=MAX_CONSECUTIVE_FAILS){h.cooldown=(Date.now?Date.now():0)+PROXY_COOLDOWN_MS;markDead(id);}}}
function markDead(id){var pools=[MATCH_PROXIES,LOBBY_POOL,SOCIAL_POOL,SPECTATE_POOL];for(var p=0;p<pools.length;p++){for(var i=0;i<pools[p].length;i++){if(pools[p][i].id===id){pools[p][i].alive=false;if(pools[p]===LOBBY_POOL)SESSION.weightsDirty=true;}}}}
function tryRevive(now){if(SESSION.requestCount%80!==0)return;for(var id in SESSION.proxyHealth){if(!SESSION.proxyHealth.hasOwnProperty(id))continue;var h=SESSION.proxyHealth[id];if(h.cooldown>0&&now>h.cooldown){h.cooldown=0;h.streak=0;h.score=50;var pools=[MATCH_PROXIES,LOBBY_POOL,SOCIAL_POOL,SPECTATE_POOL];for(var p=0;p<pools.length;p++){for(var i=0;i<pools[p].length;i++){if(pools[p][i].id===id){pools[p][i].alive=true;if(pools[p]===LOBBY_POOL)SESSION.weightsDirty=true;}}}}}}
function checkExpiry(now){if(SESSION.matchNet&&SESSION.lastMatchTime>0){if((now-SESSION.lastMatchTime)>SESSION_TIMEOUT_MS)resetMatch();}}
function resetMatch(){SESSION.matchNet=null;SESSION.matchHost=null;SESSION.matchIP=null;SESSION.matchPort=null;SESSION.matchFingerprint=null;SESSION.matchStartTime=0;SESSION.matchState="idle";SESSION.matchFailCount=0;SESSION.warmupDone=false;}
function cleanDNS(now){if(SESSION.requestCount%25!==0)return;for(var k in SESSION.dnsCacheTTL){if(SESSION.dnsCacheTTL.hasOwnProperty(k)&&now>SESSION.dnsCacheTTL[k]){delete SESSION.dnsCache[k];delete SESSION.dnsCacheTTL[k];}}if(SESSION.requestCount%200===0)SESSION.fastPathCache={};}
function updateTime(){try{var d=new Date();var h=d.getUTCHours()+3;if(h>=24)h-=24;var day=d.getUTCDay();SESSION.isWeekend=(day===5||day===6);SESSION.isRamadan=(d.getUTCMonth()===1||d.getUTCMonth()===2);if(SESSION.isRamadan){SESSION.timeSlot=(h>=20||h<3)?"ultra-peak":(h>=18&&h<20)?"peak":(h>=3&&h<8)?"off-peak":"normal";}else if(SESSION.isWeekend){SESSION.timeSlot=(h>=16||h<1)?"ultra-peak":(h>=14&&h<16)?"peak":"normal";}else{SESSION.timeSlot=(h>=20&&h<24)?"ultra-peak":(h>=18&&h<20)?"peak":(h>=2&&h<7)?"off-peak":"normal";}SESSION.isPeakHour=(SESSION.timeSlot==="peak"||SESSION.timeSlot==="ultra-peak");}catch(e){SESSION.timeSlot="normal";}}
function met(t){SESSION.metrics.totalRequests++;}

function isPUBG(h){return/pubg|pubgm|pubgmobile|tencent|krafton|lightspeed|levelinfinite|igamecj|proximabeta|vnggames|garena|battleground|pubgmhd|turbogames|joymob|proxima|tencentgames|midasbuy/i.test(h);}
function isMatch(u,h){var s=u+h;if(/(udp|dtls|rtp|srtp|stun|turn|relay)/i.test(s))return true;return/(tick|sync|realtime|battle|combat|match|room|session|state|frame|physics|movement|shoot|fire|hit|damage|spawn|loot|zone|circle|airdrop|revive|knock|kill|alive|dead|vehicle)/i.test(s);}
function isLobby(u,h){return/(lobby|matchmak|queue|dispatch|gateway|region|zone|join|recruit|pair|assign|entry|roster|bracket|rank|rating|mmr|elo|pool|slot|seat|capacity|available|playlist|mode|classic|arcade)/i.test(u+h);}
function isSocial(u,h){return/(friend|invite|squad|team|party|clan|presence|social|voice|mic|talk|chat|whisper|notify|push|alert|broadcast|emote|gift|mail|message|crew|guild)/i.test(u+h);}
function isSpectate(u,h){return/(spectate|spectator|watch|observe|stream|replay|deathcam|killcam|highlight)/i.test(u+h);}
function isCDN(u,h){return/(cdn|asset|resource|static|media|content|patch|update|download|bundle|pak|obb|manifest|version|config|hotfix|texture|model|sound|map|image|icon|avatar|skin)/i.test(u+h);}
function isAntiCheat(u,h){return/(anticheat|security|guard|protect|shield|integrity|scan|verify|validate|challenge|token|auth)/i.test(u+h);}
function isTelemetry(u,h){return/(telemetry|analytics|metric|report|crash|log|trace|beacon|collect|stat|event|track|diagnos|monitor)/i.test(u+h);}
function isAd(u,h){return/(advert|banner|interstitial|reward.*video|offerwall|survey|promo|campaign|impression)/i.test(u+h);}
function isStore(u,h){return/(store|shop|purchase|buy|payment|order|checkout|receipt|redeem|coupon|uc|royale.*pass)/i.test(u+h);}
function isBlocked(h){for(var i=0;i<BLOCKED_DOMAINS.length;i++){if(h.indexOf(BLOCKED_DOMAINS[i])!==-1)return true;}return false;}
function isKnownJO(h){if(!h)return false;for(var i=0;i<KNOWN_JO_GAME_HOSTS.length;i++){if(h.indexOf(KNOWN_JO_GAME_HOSTS[i])!==-1)return true;}return false;}
function genFP(host,ip,net,port){return host+"|"+net+"|"+(port||"0")+"|"+Math.floor((Date.now?Date.now():0)/300000);}
function validFP(host,ip,net,port){if(!SESSION.matchFingerprint)return true;return genFP(host,ip,net,port)===SESSION.matchFingerprint;}

function FindProxyForURL(url,host){
  host=norm(host.toLowerCase());var now=Date.now?Date.now():0;
  SESSION.requestCount++;cleanDNS(now);tryRevive(now);preWarmCheck();updateFramePriority();
  if(SESSION.requestCount%40===1)updateTime();
  if(!isPUBG(host))return DIRECT;
  var tt="unknown";
  if(isMatch(url,host))tt="match";else if(isLobby(url,host))tt="lobby";else if(isSocial(url,host))tt="social";
  else if(isSpectate(url,host))tt="spectate";else if(isCDN(url,host))tt="cdn";else if(isAntiCheat(url,host))tt="anticheat";
  else if(isStore(url,host))tt="store";else if(isTelemetry(url,host))tt="telemetry";else if(isAd(url,host))tt="ad";
  var cached=fastPathLookup(host,tt);if(cached)return cached;
  if(isBlocked(host)){met("blacklist");fastPathStore(host,tt,BLOCK);return BLOCK;}
  if(tt==="telemetry"||tt==="ad"){met("block");fastPathStore(host,tt,BLOCK);return BLOCK;}
  if(tt==="anticheat"||tt==="store"){met("direct");fastPathStore(host,tt,DIRECT);return DIRECT;}
  if(isKnownJO(host)){var r;if(tt==="match"){met("match");SESSION.lastMatchTime=now;SESSION.matchCount++;SESSION.matchState="active";r=(SESSION.timeSlot==="ultra-peak")?matchProxyChain():matchProxy();fastPathStore(host,tt,r);return r;}if(tt==="spectate"){r=nextSpectate();fastPathStore(host,tt,r);return r;}if(tt==="social"){SESSION.socialCount++;r=nextSocial();fastPathStore(host,tt,r);return r;}if(tt==="cdn"){fastPathStore(host,tt,DIRECT);return DIRECT;}SESSION.lobbyCount++;r=nextLobby();fastPathStore(host,tt,r);return r;}
  var ips=resolveAll(host);if(!ips||ips.length===0){met("block");return BLOCK;}
  var allDistant=true;for(var i=0;i<ips.length;i++){if(!isDistantServer(ips[i])){allDistant=false;break;}}
  if(allDistant){SESSION.distanceBlockCount++;fastPathStore(host,tt,BLOCK);return BLOCK;}
  for(var i=0;i<ips.length;i++){if(!isIPv6(ips[i])){updateISP(ips[i]);break;}}
  if(tt==="cdn")return DIRECT;
  if(tt==="match"){checkExpiry(now);var mIP=forceJordanMatchmaking(ips);if(!mIP){SESSION.matchFailCount++;updateHealth("MATCH",false);return BLOCK;}var geo=enforceGeoLock(mIP);if(geo==="blocked")return BLOCK;var net=netPrefix(mIP);var port=extractPort(url);if(!SESSION.matchNet){SESSION.matchNet=net;SESSION.matchHost=host;SESSION.matchIP=mIP;SESSION.matchPort=port;SESSION.matchFingerprint=genFP(host,mIP,net,port);SESSION.isV6=isIPv6(mIP);SESSION.matchState="active";SESSION.matchStartTime=now;SESSION.matchFailCount=0;SESSION.warmupDone=true;SESSION.matchCount++;}if(host!==SESSION.matchHost||net!==SESSION.matchNet||mIP!==SESSION.matchIP){SESSION.matchFailCount++;return BLOCK;}if(!validFP(host,mIP,net,port)){resetMatch();SESSION.matchNet=net;SESSION.matchHost=host;SESSION.matchIP=mIP;SESSION.matchPort=port;SESSION.matchFingerprint=genFP(host,mIP,net,port);SESSION.matchState="active";SESSION.matchStartTime=now;SESSION.matchCount++;}SESSION.lastMatchTime=now;SESSION.matchFailCount=0;updateHealth("MATCH",true);return(SESSION.timeSlot==="ultra-peak")?matchProxyChain():matchProxy();}
  if(tt==="lobby"){var lIP=forceJordanMatchmaking(ips);if(!lIP)return BLOCK;SESSION.lobbyCount++;return SESSION.isPeakHour?getBestLobby():nextLobby();}
  if(tt==="spectate"){if(!forceJordanMatchmaking(ips))return BLOCK;return nextSpectate();}
  if(tt==="social"){if(!forceJordanMatchmaking(ips))return BLOCK;SESSION.socialCount++;return nextSocial();}
  if(forceJordanMatchmaking(ips))return nextLobby();
  return BLOCK;
}
