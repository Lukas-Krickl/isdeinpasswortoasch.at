"use strict"; class Sha1 { static hash(t, e) { const r = Object.assign({ msgFormat: "string", outFormat: "hex" }, e); switch (r.msgFormat) { default: case "string": t = function (t) { try { return (new TextEncoder).encode(t, "utf-8").reduce((t, e) => t + String.fromCharCode(e), "") } catch (e) { return unescape(encodeURIComponent(t)) } }(t); break; case "hex-bytes": t = function (t) { const e = t.replace(" ", ""); return "" == e ? "" : e.match(/.{2}/g).map(t => String.fromCharCode(parseInt(t, 16))).join("") }(t) }const o = [1518500249, 1859775393, 2400959708, 3395469782], n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], a = (t += String.fromCharCode(128)).length / 4 + 2, c = Math.ceil(a / 16), s = new Array(c); for (let e = 0; e < c; e++) { s[e] = new Array(16); for (let r = 0; r < 16; r++)s[e][r] = t.charCodeAt(64 * e + 4 * r + 0) << 24 | t.charCodeAt(64 * e + 4 * r + 1) << 16 | t.charCodeAt(64 * e + 4 * r + 2) << 8 | t.charCodeAt(64 * e + 4 * r + 3) << 0 } s[c - 1][14] = 8 * (t.length - 1) / Math.pow(2, 32), s[c - 1][14] = Math.floor(s[c - 1][14]), s[c - 1][15] = 8 * (t.length - 1) & 4294967295; for (let t = 0; t < c; t++) { const e = new Array(80); for (let r = 0; r < 16; r++)e[r] = s[t][r]; for (let t = 16; t < 80; t++)e[t] = Sha1.ROTL(e[t - 3] ^ e[t - 8] ^ e[t - 14] ^ e[t - 16], 1); let r = n[0], a = n[1], c = n[2], h = n[3], l = n[4]; for (let t = 0; t < 80; t++) { const n = Math.floor(t / 20), s = Sha1.ROTL(r, 5) + Sha1.f(n, a, c, h) + l + o[n] + e[t] >>> 0; l = h, h = c, c = Sha1.ROTL(a, 30) >>> 0, a = r, r = s } n[0] = n[0] + r >>> 0, n[1] = n[1] + a >>> 0, n[2] = n[2] + c >>> 0, n[3] = n[3] + h >>> 0, n[4] = n[4] + l >>> 0 } for (let t = 0; t < n.length; t++)n[t] = ("00000000" + n[t].toString(16)).slice(-8); const h = "hex-w" == r.outFormat ? " " : ""; return n.join(h) } static f(t, e, r, o) { switch (t) { case 0: return e & r ^ ~e & o; case 1: return e ^ r ^ o; case 2: return e & r ^ e & o ^ r & o; case 3: return e ^ r ^ o } } static ROTL(t, e) { return t << e | t >>> 32 - e } } "undefined" != typeof module && module.exports && (module.exports = Sha1);