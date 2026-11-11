(function () {
  'use strict';

  /* =====================================================
     KONFIGURASI WAKTU (total tepat 120 detik)
     ===================================================== */
  var TOTAL = 120;

  var SCENES = [
    { start: 0,   end: 15,  title: 'Kota Makkah Pada Zaman Dahulu', build: scene1 },
    { start: 15,  end: 30,  title: 'Gua Hira dan Wahyu Pertama',    build: scene2 },
    { start: 30,  end: 45,  title: 'Dakwah Sembunyi-sembunyi',      build: scene3 },
    { start: 45,  end: 60,  title: 'Dakwah Terang-terangan',        build: scene4 },
    { start: 60,  end: 75,  title: 'Ujian dan Keteguhan Iman',      build: scene5 },
    { start: 75,  end: 95,  title: 'Hijrah ke Madinah',             build: scene6 },
    { start: 95,  end: 110, title: 'Madinah yang Damai',            build: scene7 },
    { start: 110, end: 120, title: 'Rahmat bagi Seluruh Alam',      build: scene8 }
  ];

  /* t = detik mulai, sub = teks subtitle, say = teks yang dibacakan (opsional) */
  var CUES = [
    { t: 0.5,   sub: "Makkah pada zaman dahulu adalah kota dagang di tanah Arab, tempat berdirinya Ka'bah yang mulia." },
    { t: 8.2,   sub: "Namun kebanyakan manusia saat itu menyembah berhala dan hidup dalam kejahiliyahan." },

    { t: 15.5,  sub: "Di usia 40 tahun, Nabi Muhammad SAW bertafakur di Gua Hira.",
                say: "Di usia empat puluh tahun, Nabi Muhammad shallallahu alaihi wasallam bertafakur di Gua Hira." },
    { t: 22.0,  sub: "Malaikat Jibril turun membawa wahyu pertama, Surah Al-'Alaq ayat 1\u20135.",
                say: "Malaikat Jibril turun membawa wahyu pertama, Surah Al Alaq ayat satu sampai lima." },

    { t: 30.5,  sub: "Selama sekitar tiga tahun, dakwah disampaikan secara sembunyi-sembunyi kepada keluarga dan sahabat terdekat." },
    { t: 38.5,  sub: "Yang pertama beriman: Khadijah, Ali bin Abi Thalib, Zaid bin Haritsah, dan Abu Bakar Ash-Shiddiq." },

    { t: 45.5,  sub: "Setelah turun perintah Allah, Rasulullah berdakwah terang-terangan di Bukit Shafa." },
    { t: 52.5,  sub: "Beliau menyeru manusia agar menyembah Allah Yang Maha Esa dan meninggalkan berhala." },

    { t: 60.5,  sub: "Kaum Quraisy menolak, mengejek, dan menekan kaum Muslimin dengan ancaman dan pemboikotan." },
    { t: 68.0,  sub: "Namun mereka tetap sabar dan teguh. Iman yang kuat tidak goyah oleh ujian." },

    { t: 75.5,  sub: "Allah memerintahkan hijrah. Rasulullah bersama Abu Bakar berangkat dari Makkah menuju Madinah." },
    { t: 83.0,  sub: "Mereka menempuh gurun pasir dan pegunungan dengan penuh tawakal kepada Allah." },
    { t: 90.0,  sub: "Penduduk Madinah menyambut mereka dengan penuh suka cita." },

    { t: 95.5,  sub: "Di Madinah, Rasulullah membangun masjid sebagai pusat ibadah dan kehidupan umat." },
    { t: 102.5, sub: "Kaum Muhajirin dan Anshar dipersaudarakan, hidup rukun, saling menolong, dan damai." },

    { t: 110.5, sub: "Islam adalah agama rahmat bagi seluruh alam." },
    { t: 114.5, sub: "Jadilah pribadi yang sabar, jujur, penyayang, dan selalu menebarkan kebaikan." }
  ];

  /* =====================================================
     ALAT GAMBAR SVG
     ===================================================== */
  var SVG_OPEN = '<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';

  var seed = 11;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function F(n) { return (+n).toFixed(1); }

  function grad(id, stops) {
    var o = '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">';
    for (var i = 0; i < stops.length; i++) {
      o += '<stop offset="' + stops[i][0] + '" stop-color="' + stops[i][1] + '"/>';
    }
    return o + '</linearGradient>';
  }

  function glowGrad(id, color) {
    return '<radialGradient id="' + id + '"><stop offset="0" stop-color="' + color + '" stop-opacity="1"/><stop offset="1" stop-color="' + color + '" stop-opacity="0"/></radialGradient>';
  }

  function txt(x, y, str, size, fill, delay, cls) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + size + '" fill="' + fill + '" class="fadein ' + (cls || 'ttl') + '" style="animation-delay:' + (delay || 0) + 's">' + str + '</text>';
  }

  function stars(n, yMax) {
    var s = '';
    for (var i = 0; i < n; i++) {
      var x = rnd() * 800, y = rnd() * yMax, r = 0.8 + rnd() * 1.8, d = (rnd() * 3).toFixed(2);
      s += '<circle class="star" cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + r.toFixed(1) + '" fill="#fff6c9" style="animation-delay:' + d + 's"/>';
    }
    return s;
  }

  function cloud(x, y, sc, dur, delay, col) {
    col = col || '#ffffff';
    return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')"><g class="drift" style="animation-duration:' + dur + 's;animation-delay:' + delay + 's">' +
      '<ellipse cx="0" cy="0" rx="46" ry="16" fill="' + col + '" opacity=".93"/>' +
      '<ellipse cx="-22" cy="-10" rx="22" ry="16" fill="' + col + '" opacity=".93"/>' +
      '<ellipse cx="14" cy="-16" rx="26" ry="20" fill="' + col + '" opacity=".93"/></g></g>';
  }

  function sun(x, y, r, c1, c2) {
    c1 = c1 || '#ffd23f'; c2 = c2 || '#ffe27a';
    var rays = '';
    for (var i = 0; i < 12; i++) {
      rays += '<rect x="-3" y="' + (-r - 26) + '" width="6" height="18" rx="3" fill="' + c1 + '" transform="rotate(' + (i * 30) + ')"/>';
    }
    return '<g transform="translate(' + x + ',' + y + ')">' +
      '<circle r="' + (r + 40) + '" fill="' + c2 + '" opacity=".25" class="pulse"/>' +
      '<g class="spin">' + rays + '</g>' +
      '<circle r="' + r + '" fill="' + c1 + '"/><circle r="' + (r - 8) + '" fill="' + c2 + '"/></g>';
  }

  function dune(col, y, amp) {
    return '<path d="M0 ' + y + ' Q200 ' + (y - amp) + ' 400 ' + y + ' T800 ' + y + ' L800 450 L0 450Z" fill="' + col + '"/>';
  }

  function ridge(w, base, hmin, hmax, col, step) {
    var d = 'M0 450 L0 ' + base, x = 0;
    while (x < w) {
      x += step * (0.7 + rnd() * 0.6);
      d += ' L' + F(x) + ' ' + F(base - hmin - rnd() * (hmax - hmin));
    }
    return '<path d="' + d + ' L' + (x + 10) + ' 450Z" fill="' + col + '"/>';
  }

  function duneWide(w, y, amp, col) {
    var d = 'M0 450 L0 ' + y;
    for (var x = 0; x < w; x += 200) {
      d += ' Q' + (x + 100) + ' ' + (y - amp) + ' ' + (x + 200) + ' ' + y;
    }
    return '<path d="' + d + ' L' + (x + 10) + ' 450Z" fill="' + col + '"/>';
  }

  function palm(x, y, sc) {
    var angs = [-10, -50, -90, -130, -170, 25, 155], leaves = '';
    for (var i = 0; i < angs.length; i++) {
      leaves += '<path d="M0 0 Q28 -26 66 -8 Q30 -14 0 0Z" fill="#2e8b4f" transform="rotate(' + angs[i] + ')"/>';
    }
    return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')">' +
      '<path d="M0 0 Q8 -45 0 -90" stroke="#7a4a21" stroke-width="8" fill="none" stroke-linecap="round"/>' +
      '<g transform="translate(0,-90)"><g class="sway">' + leaves +
      '<circle cx="-4" cy="4" r="5" fill="#6b3d17"/><circle cx="5" cy="5" r="5" fill="#6b3d17"/></g></g></g>';
  }

  function house(x, y, w, h, col) {
    return '<g transform="translate(' + x + ',' + y + ')">' +
      '<rect x="0" y="' + (-h) + '" width="' + w + '" height="' + h + '" fill="' + col + '"/>' +
      '<rect x="-3" y="' + (-h - 5) + '" width="' + (w + 6) + '" height="7" fill="#b98a55"/>' +
      '<rect x="' + (w * 0.4) + '" y="' + (-h * 0.5) + '" width="' + (w * 0.2) + '" height="' + (h * 0.5) + '" rx="3" fill="#5a3a1c"/>' +
      '<rect x="' + (w * 0.12) + '" y="' + (-h * 0.8) + '" width="' + (w * 0.18) + '" height="' + (h * 0.2) + '" fill="#5a3a1c" opacity=".7"/>' +
      '<rect x="' + (w * 0.7) + '" y="' + (-h * 0.8) + '" width="' + (w * 0.18) + '" height="' + (h * 0.2) + '" fill="#5a3a1c" opacity=".7"/></g>';
  }

  function kaaba(x, y, sc) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')">' +
      '<rect x="-50" y="-90" width="100" height="90" fill="#1b1b1f"/>' +
      '<path d="M-50 -90 L-38 -100 L62 -100 L50 -90Z" fill="#2c2c33"/>' +
      '<path d="M50 -90 L62 -100 L62 -10 L50 0Z" fill="#101013"/>' +
      '<rect x="-50" y="-68" width="100" height="9" fill="#e6b422"/>' +
      '<rect x="-50" y="-66" width="100" height="2" fill="#fff0a6"/>' +
      '<rect x="-12" y="-52" width="24" height="38" rx="3" fill="#d4a017"/>' +
      '<rect x="-8" y="-48" width="16" height="34" rx="2" fill="#8a5a0a"/></g>';
  }

  /* orang tanpa wajah (adab: tidak menggambarkan wajah) */
  function person(x, y, robe, cover, sc, cls, delay, arms) {
    sc = sc || 1;
    var a = '';
    if (arms === 'up') {
      a = '<g transform="translate(0,-32)"><g class="armwave" style="animation-delay:' + (delay || 0) + 's">' +
        '<path d="M-8 0 L-17 -22 M8 0 L17 -22" stroke="' + robe + '" stroke-width="4" stroke-linecap="round" fill="none"/></g></g>';
    }
    return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')"><g class="' + (cls || 'bob') + '" style="animation-delay:' + (delay || 0) + 's">' +
      '<path d="M-11 0 L-8 -34 Q0 -40 8 -34 L11 0 Z" fill="' + robe + '"/>' + a +
      '<circle cx="0" cy="-44" r="8" fill="#e8b98a"/>' +
      '<path d="M-9 -45 Q0 -59 9 -45 Q0 -49 -9 -45Z" fill="' + cover + '"/></g></g>';
  }

  function sitter(x, y, robe, cover, sc, delay) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')"><g class="bob" style="animation-delay:' + delay + 's">' +
      '<path d="M-22 0 Q-16 -34 0 -40 Q16 -34 22 0Z" fill="' + robe + '"/>' +
      '<circle cx="0" cy="-50" r="9" fill="#e8b98a"/>' +
      '<path d="M-10 -51 Q0 -66 10 -51 Q0 -55 -10 -51Z" fill="' + cover + '"/></g></g>';
  }

  function walker(inner, dur, dist, delay) {
    return '<g class="shuttle" style="--d:' + dist + 'px;animation-duration:' + dur + 's;animation-delay:' + delay + 's">' + inner + '</g>';
  }

  function camel(x, y, sc, dir, type, delay) {
    delay = delay || 0;
    var lx = [-30, -17, 19, 32], legs = '', i;
    for (i = 0; i < 4; i++) {
      legs += '<g transform="translate(' + lx[i] + ',-42)"><g class="leg" style="animation-delay:' + (((i % 2) * -0.45) + delay) + 's">' +
        '<rect x="-3.5" y="0" width="7" height="44" rx="3" fill="' + (i < 2 ? '#b3813f' : '#a8742f') + '"/>' +
        '<rect x="-4" y="40" width="8" height="5" rx="2" fill="#6b4420"/></g></g>';
    }
    var extra = '';
    if (type === 'tent') {
      extra = '<path d="M-30 -96 L-8 -128 L16 -96Z" fill="#f3e3c2" stroke="#b98a55" stroke-width="2"/><path d="M-8 -128 L-8 -96" stroke="#b98a55" stroke-width="2"/>';
    } else if (type === 'rider') {
      extra = '<path d="M-22 -98 Q-20 -114 -7 -118 Q6 -114 8 -98Z" fill="#2e7d9a"/><circle cx="-7" cy="-126" r="8" fill="#e8b98a"/><path d="M-16 -127 Q-7 -140 3 -127Z" fill="#f3e3c2"/>';
    } else if (type === 'load') {
      extra = '<rect x="-32" y="-102" width="22" height="22" rx="6" fill="#8e5b2e"/><rect x="-6" y="-100" width="18" height="20" rx="6" fill="#a8742f"/>';
    }
    var body = '<g class="bob2" style="animation-delay:' + delay + 's">' +
      '<ellipse cx="0" cy="-62" rx="46" ry="21" fill="#d9a75a"/>' +
      '<ellipse cx="-10" cy="-86" rx="13" ry="15" fill="#d9a75a"/>' +
      '<path d="M34 -70 Q52 -92 56 -112" stroke="#d9a75a" stroke-width="13" stroke-linecap="round" fill="none"/>' +
      '<ellipse cx="62" cy="-114" rx="15" ry="9" fill="#d9a75a" transform="rotate(-15 62 -114)"/>' +
      '<circle cx="67" cy="-117" r="2" fill="#3b2410"/>' +
      '<path d="M-45 -66 Q-58 -60 -54 -40" stroke="#b3813f" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<path d="M-28 -76 Q-8 -66 14 -76 L12 -54 L-26 -54Z" fill="#1f9d63"/>' +
      '<rect x="-26" y="-58" width="38" height="4" fill="#e6b422"/>' + extra + '</g>';
    return '<g transform="translate(' + x + ',' + y + ') scale(' + (sc * dir) + ',' + sc + ')">' + legs + body + '</g>';
  }

  var ROBES = ['#1f9d63', '#f3e3c2', '#2e7d9a', '#c0392b', '#8e44ad', '#e6b422', '#d35400', '#16a085'];
  var COVERS = ['#f3e3c2', '#ffffff', '#3b3b3b', '#2c3e50', '#c0392b'];

  /* =====================================================
     SCENE 1 - KOTA MAKKAH
     ===================================================== */
  function scene1() {
    var s = SVG_OPEN + '<defs>' +
      grad('g1sky', [[0, '#3fa7e6'], [0.65, '#b9e4f7'], [1, '#fff0c4']]) +
      grad('g1sand', [[0, '#efcd8a'], [1, '#d6a456']]) + '</defs>';
    s += '<rect width="800" height="450" fill="url(#g1sky)"/>';
    s += sun(660, 85, 32);
    s += cloud(140, 85, 1.2, 9, 0) + cloud(400, 50, 0.9, 12, -3) + cloud(540, 150, 1, 10, -5) + cloud(40, 160, 0.8, 11, -7);
    s += '<path d="M0 300 L90 228 L170 288 L260 205 L360 292 L450 238 L560 296 L660 222 L800 300 L800 450 L0 450Z" fill="#c79d68" opacity=".9"/>';
    s += '<path d="M0 318 L120 266 L230 316 L340 262 L470 320 L600 268 L720 318 L800 288 L800 450 L0 450Z" fill="#d8b177"/>';
    s += '<rect y="338" width="800" height="112" fill="url(#g1sand)"/>';
    s += house(30, 350, 72, 52, '#e8c78f') + house(112, 354, 60, 44, '#dfb97d') + house(610, 352, 84, 58, '#e8c78f') + house(706, 356, 72, 46, '#dfb97d');
    s += palm(20, 352, 0.8) + palm(785, 356, 0.9);
    s += '<ellipse cx="400" cy="372" rx="230" ry="24" fill="#f1dcaa"/>';
    s += '<ellipse cx="400" cy="262" rx="150" ry="120" fill="#ffe9a8" opacity=".25" class="pulse"/>';
    s += kaaba(400, 368, 1.45);
    s += '<g transform="translate(528,372)"><rect x="4" y="-30" width="4" height="30" fill="#6b4420"/><rect x="72" y="-30" width="4" height="30" fill="#6b4420"/>' +
      '<path d="M-4 -30 L84 -30 L74 -52 L6 -52Z" fill="#c0392b"/><rect x="-4" y="-30" width="88" height="6" fill="#f3e3c2"/>' +
      '<rect x="10" y="-14" width="60" height="14" fill="#9b6a35"/><circle cx="24" cy="-18" r="5" fill="#e67e22"/><circle cx="38" cy="-18" r="5" fill="#27ae60"/><circle cx="52" cy="-18" r="5" fill="#f1c40f"/></g>';
    s += person(590, 372, '#27ae60', '#f3e3c2', 1.2, 'bob', 0);
    s += walker(person(240, 392, '#2e7d9a', '#f3e3c2', 1.3), 7, 60, 0);
    s += walker(person(330, 404, '#c0392b', '#ffffff', 1.3), 6, -50, -1);
    s += walker(person(470, 398, '#8e44ad', '#f3e3c2', 1.3), 8, 70, -2);
    s += walker(person(660, 414, '#d35400', '#3b3b3b', 1.4), 7, -60, -3);
    s += walker(person(130, 412, '#16a085', '#ffffff', 1.4), 9, 80, -4);
    s += '<g class="cross" style="animation-duration:22s">' + camel(0, 440, 0.7, 1, 'load', 0) + '</g>';
    s += txt(400, 52, 'MAKKAH AL-MUKARRAMAH', 26, '#fff3c4', 0.6);
    return s + '</svg>';
  }

  /* =====================================================
     SCENE 2 - GUA HIRA & WAHYU
     ===================================================== */
  function scene2() {
    var s = SVG_OPEN + '<defs>' +
      grad('g2sky', [[0, '#050a24'], [0.6, '#14275a'], [1, '#2a3f7a']]) +
      '<linearGradient id="g2beam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff3b0" stop-opacity=".9"/><stop offset="1" stop-color="#ffd54a" stop-opacity="0"/></linearGradient>' +
      glowGrad('g2glow', '#fff6c9') + '</defs>';
    s += '<rect width="800" height="450" fill="url(#g2sky)"/>' + stars(70, 260);
    s += '<g transform="translate(110,80)"><circle r="30" fill="#fff4c2"/><circle cx="12" cy="-6" r="26" fill="#10204e"/></g>';
    s += '<path d="M0 330 L120 270 L230 330 L330 290 L450 340 L800 300 L800 450 L0 450Z" fill="#1b2146"/>';
    s += '<path d="M100 450 L330 150 L380 190 L450 90 L560 220 L640 170 L760 450Z" fill="#3a2c42"/>';
    s += '<path d="M330 150 L380 190 L450 90 L400 450 L100 450Z" fill="#4a3a55" opacity=".5"/>';
    s += '<path d="M450 90 L560 220 L640 170 L760 450 L520 450Z" fill="#2c2133" opacity=".6"/>';
    s += '<path d="M0 410 Q200 385 400 410 T800 405 L800 450 L0 450Z" fill="#1a1530"/>';
    s += '<circle cx="450" cy="248" r="95" fill="url(#g2glow)" class="pulse"/>';
    s += '<path d="M450 230 L330 -10 L390 -10Z" fill="url(#g2beam)" class="beam"/>';
    s += '<path d="M450 230 L420 -10 L480 -10Z" fill="url(#g2beam)" class="beam" style="animation-delay:-1s"/>';
    s += '<path d="M450 230 L510 -10 L570 -10Z" fill="url(#g2beam)" class="beam" style="animation-delay:-2s"/>';
    s += '<path d="M424 276 Q424 222 450 218 Q476 222 476 276Z" fill="#07060c"/>';
    s += '<path d="M434 276 Q434 232 450 229 Q466 232 466 276Z" fill="#fff3b0" opacity=".55" class="pulse"/>';
    for (var i = 0; i < 8; i++) {
      s += '<g transform="translate(' + (428 + i * 6) + ',250)"><circle class="rise" r="3" fill="#fff6c9" style="animation-delay:' + (i * 0.5).toFixed(1) + 's"/></g>';
    }
    s += txt(450, 66, '\u0627\u0642\u0652\u0631\u064E\u0623\u0652', 60, '#ffe08a', 2.5, 'ar ttl');
    s += txt(640, 142, 'Gunung Nur', 18, '#d6defc', 1.2);
    s += txt(450, 306, 'Gua Hira', 17, '#ffe9a8', 1.6);
    s += '</svg>';

    var ayat = [
      ['\u0627\u0642\u0652\u0631\u064E\u0623\u0652 \u0628\u0650\u0627\u0633\u0652\u0645\u0650 \u0631\u064E\u0628\u0651\u0650\u0643\u064E \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u062E\u064E\u0644\u064E\u0642\u064E', 'Bacalah dengan menyebut nama Tuhanmu yang menciptakan,'],
      ['\u062E\u064E\u0644\u064E\u0642\u064E \u0627\u0644\u0652\u0625\u0650\u0646\u0652\u0633\u064E\u0627\u0646\u064E \u0645\u0650\u0646\u0652 \u0639\u064E\u0644\u064E\u0642\u064D', 'Dia menciptakan manusia dari segumpal darah.'],
      ['\u0627\u0642\u0652\u0631\u064E\u0623\u0652 \u0648\u064E\u0631\u064E\u0628\u0651\u064F\u0643\u064E \u0627\u0644\u0652\u0623\u064E\u0643\u0652\u0631\u064E\u0645\u064F', 'Bacalah, dan Tuhanmu Maha Mulia,'],
      ['\u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0639\u064E\u0644\u0651\u064E\u0645\u064E \u0628\u0650\u0627\u0644\u0652\u0642\u064E\u0644\u064E\u0645\u0650', 'yang mengajar (manusia) dengan pena.'],
      ['\u0639\u064E\u0644\u0651\u064E\u0645\u064E \u0627\u0644\u0652\u0625\u0650\u0646\u0652\u0633\u064E\u0627\u0646\u064E \u0645\u064E\u0627 \u0644\u064E\u0645\u0652 \u064A\u064E\u0639\u0652\u0644\u064E\u0645\u0652', 'Dia mengajarkan manusia apa yang tidak diketahuinya.']
    ];
    var card = '<div class="ayat-card">';
    for (var k = 0; k < ayat.length; k++) {
      card += '<div class="ayat' + (k === 4 ? ' last' : '') + '" style="animation-delay:' + (6.5 + k * 1.7).toFixed(1) + 's">' +
        '<div class="ar">' + ayat[k][0] + '</div><div class="idn">' + ayat[k][1] + '</div><div class="no">QS. Al-\u2018Alaq: ' + (k + 1) + '</div></div>';
    }
    card += '</div>';
    return s + card;
  }

  /* =====================================================
     SCENE 3 - DAKWAH SEMBUNYI-SEMBUNYI
     ===================================================== */
  function scene3() {
    var s = SVG_OPEN + '<defs>' +
      grad('g3wall', [[0, '#6b4328'], [1, '#3d2414']]) +
      grad('g3floor', [[0, '#8a5a33'], [1, '#5a3820']]) +
      glowGrad('g3glow', '#ffd77a') +
      '<linearGradient id="g3beam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff3b0" stop-opacity=".85"/><stop offset="1" stop-color="#ffd54a" stop-opacity="0"/></linearGradient></defs>';
    s += '<rect width="800" height="450" fill="url(#g3wall)"/>';
    s += '<g opacity=".12" stroke="#ffd77a" stroke-width="2" fill="none">';
    for (var i = 0; i < 9; i++) { s += '<path d="M' + (i * 100 + 20) + ' 0 L' + (i * 100 + 70) + ' 60 L' + (i * 100 + 20) + ' 120 L' + (i * 100 - 30) + ' 60Z"/>'; }
    s += '</g>';
    s += '<path d="M90 70 L90 200 L200 200 L200 70 Q145 8 90 70Z" fill="#14275a" stroke="#d9b66a" stroke-width="6"/>';
    s += '<g transform="translate(145,105)"><circle r="16" fill="#fff4c2"/><circle cx="7" cy="-3" r="14" fill="#14275a"/></g>';
    s += '<circle cx="115" cy="80" r="2" fill="#fff" class="star"/><circle cx="175" cy="95" r="2" fill="#fff" class="star" style="animation-delay:-1s"/><circle cx="165" cy="160" r="2" fill="#fff" class="star" style="animation-delay:-2s"/>';
    s += '<rect x="620" y="70" width="110" height="200" rx="6" fill="#4a2c14" stroke="#d9b66a" stroke-width="5"/>';
    s += '<path d="M675 70 L675 270" stroke="#2c180a" stroke-width="3"/><circle cx="660" cy="175" r="5" fill="#e6b422"/><circle cx="690" cy="175" r="5" fill="#e6b422"/>';
    s += '<rect y="290" width="800" height="160" fill="url(#g3floor)"/>';
    s += '<ellipse cx="400" cy="385" rx="310" ry="56" fill="#8b2e2e"/>';
    s += '<ellipse cx="400" cy="385" rx="280" ry="46" fill="none" stroke="#e6b422" stroke-width="3" stroke-dasharray="8 6"/>';
    s += '<circle cx="400" cy="230" r="170" fill="url(#g3glow)" class="pulse"/>';
    s += '<g transform="translate(400,0)"><g class="swing"><line x1="0" y1="0" x2="0" y2="70" stroke="#d9b66a" stroke-width="3"/>' +
      '<path d="M-16 70 L16 70 L12 110 L-12 110Z" fill="#e6b422" stroke="#8a5a0a" stroke-width="2"/>' +
      '<rect x="-8" y="78" width="16" height="26" fill="#fff3b0"/><path d="M-8 66 L0 56 L8 66Z" fill="#d9b66a"/></g></g>';
    s += '<path d="M400 372 L330 120 L470 120Z" fill="url(#g3beam)" class="beam"/>';
    s += '<g transform="translate(400,380)"><path d="M-26 0 L0 -26 L26 0" stroke="#7a4a21" stroke-width="6" fill="none" stroke-linecap="round"/>' +
      '<rect x="-24" y="-40" width="48" height="16" rx="2" fill="#1f9d63" transform="rotate(-8)"/><rect x="-20" y="-38" width="40" height="12" fill="#fff3d6" transform="rotate(-8)"/></g>';
    s += sitter(190, 395, '#8e44ad', '#f3e3c2', 1.5, 0);
    s += sitter(290, 405, '#2e7d9a', '#ffffff', 1.5, -0.4);
    s += sitter(510, 405, '#d35400', '#3b3b3b', 1.5, -0.8);
    s += sitter(610, 395, '#16a085', '#f3e3c2', 1.5, -1.2);
    s += txt(190, 438, 'Khadijah', 14, '#fff3d6', 1.2, '');
    s += txt(290, 442, 'Ali', 14, '#fff3d6', 1.5, '');
    s += txt(400, 438, 'Al-Qur\u2019an', 14, '#ffe08a', 1.8, '');
    s += txt(510, 442, 'Zaid', 14, '#fff3d6', 2.1, '');
    s += txt(610, 438, 'Abu Bakar', 14, '#fff3d6', 2.4, '');
    s += '<text x="400" y="260" text-anchor="middle" font-size="30" fill="#ffe9a8" class="float" opacity=".8">\u2026</text>';
    return s + '</svg>';
  }

  /* =====================================================
     SCENE 4 - DAKWAH TERANG-TERANGAN
     ===================================================== */
  function scene4() {
    var s = SVG_OPEN + '<defs>' +
      grad('g4sky', [[0, '#4fb3e8'], [0.7, '#c8ecf9'], [1, '#fff0c4']]) +
      grad('g4hill', [[0, '#b98550'], [1, '#8a5a30']]) +
      grad('g4sand', [[0, '#efcd8a'], [1, '#d6a456']]) + '</defs>';
    s += '<rect width="800" height="450" fill="url(#g4sky)"/>';
    s += sun(690, 80, 28);
    s += cloud(120, 70, 1.1, 10, 0) + cloud(470, 50, 0.9, 12, -4) + cloud(300, 130, 0.8, 9, -2);
    s += '<path d="M0 320 L100 260 L200 315 L300 255 L420 320 L560 262 L680 318 L800 280 L800 450 L0 450Z" fill="#d1aa72"/>';
    s += '<rect y="355" width="800" height="95" fill="url(#g4sand)"/>';
    s += house(560, 362, 70, 48, '#e8c78f') + house(640, 366, 64, 42, '#dfb97d');
    s += kaaba(740, 372, 0.6);
    s += '<path d="M110 385 Q200 270 280 215 Q330 185 380 215 Q470 275 560 385Z" fill="url(#g4hill)"/>';
    s += '<path d="M280 215 Q330 185 380 215 Q330 240 280 215Z" fill="#c99a62"/>';
    s += '<path d="M200 330 L240 300 M300 280 L340 262 M400 320 L440 300" stroke="#6b4420" stroke-width="3" stroke-linecap="round" opacity=".6"/>';
    s += '<g transform="translate(330,198)"><circle r="30" fill="#ffe27a" opacity=".5" class="pulse"/></g>';
    for (var w = 0; w < 3; w++) {
      s += '<g transform="translate(330,198)"><circle class="wave" r="20" fill="none" stroke="#ffd54a" stroke-width="3" vector-effect="non-scaling-stroke" style="animation-delay:' + w + 's"/></g>';
    }
    s += '<g class="fadein" style="animation-delay:2.2s"><rect x="190" y="30" width="280" height="62" rx="16" fill="rgba(10,20,50,.78)" stroke="#ffd54a" stroke-width="2"/>' +
      '<path d="M310 92 L330 120 L345 92Z" fill="rgba(10,20,50,.78)" stroke="#ffd54a" stroke-width="2"/>' +
      '<rect x="306" y="88" width="42" height="6" fill="rgba(10,20,50,.95)"/>' +
      '<text x="330" y="72" text-anchor="middle" font-size="36" fill="#ffe08a" class="ar">\u0644\u064E\u0627 \u0625\u0650\u0644\u064E\u0670\u0647\u064E \u0625\u0650\u0644\u0651\u064E\u0627 \u0627\u0644\u0644\u0651\u064E\u0670\u0647\u064F</text></g>';
    var rows = [{ y: 392, sc: 1.0, n: 8 }, { y: 411, sc: 1.15, n: 7 }, { y: 432, sc: 1.3, n: 6 }];
    var c = 0;
    for (var r = 0; r < rows.length; r++) {
      for (var i = 0; i < rows[r].n; i++) {
        var x = 55 + i * (690 / (rows[r].n - 1)) + (r === 1 ? 6 : 0);
        var arms = (c % 3 === 0) ? 'up' : null;
        s += person(x, rows[r].y, ROBES[c % ROBES.length], COVERS[(c + r) % COVERS.length], rows[r].sc, 'bob', -(c % 5) * 0.2, arms);
        c++;
      }
    }
    s += '<text x="120" y="340" font-size="26" fill="#fff" class="float ttl">?</text><text x="470" y="330" font-size="26" fill="#fff" class="float ttl" style="animation-delay:-.6s">?</text><text x="650" y="345" font-size="26" fill="#fff" class="float ttl" style="animation-delay:-1.1s">!</text>';
    return s + '</svg>';
  }

  /* =====================================================
     SCENE 5 - UJIAN & KETEGUHAN
     ===================================================== */
  function scene5() {
    var s = SVG_OPEN + '<defs>' +
      grad('g5sky', [[0, '#3a1f2b'], [0.55, '#9a4a35'], [1, '#e8914a']]) +
      glowGrad('g5glow', '#ffe08a') + '</defs>';
    s += '<rect width="800" height="450" fill="url(#g5sky)"/>';
    s += sun(650, 120, 38, '#ff9d3c', '#ffc46b');
    s += cloud(120, 70, 1.5, 8, 0, '#5b3b3b') + cloud(420, 50, 1.3, 11, -3, '#4a2f35') + cloud(250, 130, 1.1, 9, -5, '#6a4040');
    s += '<path d="M0 330 L110 280 L240 325 L360 275 L520 330 L680 285 L800 320 L800 450 L0 450Z" fill="#6b3a2a"/>';
    s += '<path d="M0 370 Q200 345 400 370 T800 365 L800 450 L0 450Z" fill="#8a4f2e"/>';
    s += '<rect y="392" width="800" height="58" fill="#7a4526"/>';
    for (var i = 0; i < 7; i++) {
      var y = 150 + rnd() * 220;
      s += '<g class="wind" style="animation-delay:' + (-rnd() * 1.6).toFixed(2) + 's;animation-duration:' + (1.2 + rnd()).toFixed(2) + 's"><path d="M0 ' + F(y) + ' L' + (90 + rnd() * 70).toFixed(0) + ' ' + F(y) + '" stroke="#f3d9a0" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/></g>';
    }
    s += '<g transform="translate(325,395)"><g class="swing"><line x1="-4" y1="0" x2="-4" y2="-125" stroke="#4a2c14" stroke-width="5"/><line x1="96" y1="0" x2="96" y2="-125" stroke="#4a2c14" stroke-width="5"/>' +
      '<rect x="-4" y="-125" width="100" height="70" fill="#f2e2b8" stroke="#8a5a2b" stroke-width="3"/>' +
      '<path d="M10 -112 L82 -68 M82 -112 L10 -68" stroke="#b02a2a" stroke-width="5" stroke-linecap="round"/>' +
      '<text x="46" y="-92" text-anchor="middle" font-size="12" fill="#5a1414" font-weight="700">BOIKOT</text></g></g>';
    var op = [70, 125, 180, 235];
    for (var k = 0; k < op.length; k++) {
      s += person(op[k], 412, '#3b2b35', '#1d1d1d', 1.4, 'bob', -k * 0.25, 'up');
    }
    s += '<circle cx="588" cy="378" r="105" fill="url(#g5glow)" opacity=".55" class="pulse"/>';
    s += '<g transform="translate(588,378)"><g class="spin"><circle r="92" fill="none" stroke="#ffd54a" stroke-width="3" stroke-dasharray="10 8"/></g></g>';
    var mu = [525, 568, 611, 654], cl = ['#1f9d63', '#f3e3c2', '#2e7d9a', '#e6b422'];
    for (var m = 0; m < mu.length; m++) {
      s += person(mu[m], 412, cl[m], COVERS[m % COVERS.length], 1.25, 'bob', -m * 0.3);
    }
    s += palm(752, 408, 1.25).replace('class="sway"', 'class="sway hard"');
    s += txt(400, 58, 'SABAR \u2022 TEGUH \u2022 TAWAKAL', 28, '#ffe08a', 7);
    return s + '</svg>';
  }

  /* =====================================================
     SCENE 6 - HIJRAH
     ===================================================== */
  function scene6() {
    var s = SVG_OPEN + '<defs>' + grad('g6sky', [[0, '#141c4a'], [0.55, '#7a4a7a'], [1, '#f4a259']]) + '</defs>';
    s += '<rect width="800" height="450" fill="url(#g6sky)"/>';
    s += '<g class="fadein" style="animation-delay:5s">' + stars(55, 200) + '</g>';
    s += '<g transform="translate(130,150)"><circle r="22" fill="#fff4c2"/><circle cx="9" cy="-4" r="19" fill="#2f2a5e"/></g>';
    s += '<g class="panA">' + ridge(1300, 310, 40, 110, '#4a3a6a', 90) + '</g>';
    s += '<g class="panB">' + ridge(1700, 345, 20, 70, '#8a5a5a', 70) + '</g>';
    s += '<g class="panC">' + duneWide(2100, 392, 26, '#d9a35a') + '</g>';
    s += '<path d="M0 450 L0 424 Q200 400 400 422 T800 414 L800 450Z" fill="#b98240"/>';
    s += camel(190, 424, 0.95, 1, 'tent', 0);
    s += camel(390, 428, 0.95, 1, 'rider', -0.3);
    s += camel(590, 424, 0.95, 1, 'load', -0.6);
    s += '<g class="fadein" style="animation-delay:.5s"><rect x="110" y="44" width="580" height="62" rx="18" fill="rgba(0,0,0,.4)"/>' +
      '<line x1="170" y1="66" x2="630" y2="66" stroke="#ffd54a" stroke-width="3" stroke-dasharray="3 9" stroke-linecap="round"/>' +
      '<circle cx="170" cy="66" r="6" fill="#1f9d63"/><circle cx="630" cy="66" r="6" fill="#1f9d63"/>' +
      '<text x="170" y="96" text-anchor="middle" font-size="15" fill="#fff3d6" font-weight="700">Makkah</text>' +
      '<text x="630" y="96" text-anchor="middle" font-size="15" fill="#fff3d6" font-weight="700">Madinah</text>' +
      '<g transform="translate(170,66)"><g class="trip"><circle r="8" fill="#fff"/><circle r="4" fill="#e6b422"/></g></g></g>';
    return s + '</svg>';
  }

  /* =====================================================
     SCENE 7 - MADINAH
     ===================================================== */
  function mosque(x, y, sc) {
    var s = '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')">';
    s += '<rect x="-120" y="-90" width="240" height="90" fill="#f4e7c8"/><rect x="-124" y="-98" width="248" height="10" fill="#d9b66a"/>';
    var side = [-1, 1];
    for (var i = 0; i < 2; i++) {
      var cx = side[i] * 138;
      s += '<rect x="' + (cx - 11) + '" y="-150" width="22" height="150" fill="#f4e7c8"/>' +
        '<rect x="' + (cx - 14) + '" y="-154" width="28" height="8" fill="#d9b66a"/>' +
        '<path d="M' + (cx - 12) + ' -154 Q' + cx + ' -196 ' + (cx + 12) + ' -154Z" fill="#1f9d63"/>' +
        '<circle cx="' + cx + '" cy="-196" r="3.5" fill="#ffd23f"/>';
    }
    s += '<path d="M-48 -98 Q0 -196 48 -98Z" fill="#1f9d63"/><path d="M-48 -98 Q-20 -160 0 -170 Q-26 -140 -30 -98Z" fill="#35c283" opacity=".6"/>';
    s += '<rect x="-2" y="-206" width="4" height="14" fill="#ffd23f"/>';
    s += '<path d="M0 -226 a10 10 0 1 0 8 14 a8 8 0 1 1 -8 -14Z" fill="#ffd23f"/>';
    s += '<path d="M-20 0 L-20 -44 Q0 -68 20 -44 L20 0Z" fill="#7a4a21"/>';
    var wx = [-95, -70, 70, 95];
    for (var j = 0; j < wx.length; j++) {
      s += '<path d="M' + (wx[j] - 9) + ' -40 L' + (wx[j] - 9) + ' -62 Q' + wx[j] + ' -76 ' + (wx[j] + 9) + ' -62 L' + (wx[j] + 9) + ' -40Z" fill="#7a4a21"/>';
    }
    return s + '</g>';
  }

  function heart(x, y) {
    return '<g transform="translate(' + x + ',' + y + ')"><g class="pulse"><path d="M0 0 C-8 -10 -22 0 0 18 C22 0 8 -10 0 0Z" fill="#e74c3c"/></g></g>';
  }

  function bird(delay, y, dur) {
    return '<g transform="translate(0,' + y + ')"><g class="fly" style="animation-delay:' + delay + 's;animation-duration:' + dur + 's"><g class="flap"><path d="M-12 0 Q-6 -10 0 0 Q6 -10 12 0" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/></g></g></g>';
  }

  function scene7() {
    var s = SVG_OPEN + '<defs>' +
      grad('g7sky', [[0, '#4fb3e8'], [0.7, '#c8ecf9'], [1, '#fff6d4']]) +
      grad('g7ground', [[0, '#e8cf94'], [1, '#c99c55']]) + '</defs>';
    s += '<rect width="800" height="450" fill="url(#g7sky)"/>';
    s += sun(90, 80, 28);
    s += cloud(260, 70, 1.1, 10, 0) + cloud(560, 55, 1, 12, -4) + cloud(690, 130, 0.8, 9, -2);
    s += bird(0, 110, 14) + bird(-4, 150, 16) + bird(-8, 90, 13);
    s += '<path d="M0 300 L120 255 L260 300 L420 250 L600 300 L720 262 L800 295 L800 450 L0 450Z" fill="#b5cf9a" opacity=".85"/>';
    s += '<rect y="350" width="800" height="100" fill="url(#g7ground)"/>';
    s += '<ellipse cx="400" cy="352" rx="260" ry="14" fill="#e9d9a8"/>';
    s += palm(70, 360, 1.15) + palm(125, 365, 0.9) + palm(735, 360, 1.15) + palm(680, 366, 0.9);
    s += '<ellipse cx="400" cy="210" rx="190" ry="150" fill="#fff3b0" opacity=".25" class="pulse"/>';
    s += mosque(400, 352, 1.35);
    var bw = [[250, 395, 90, 0], [290, 405, -80, -1.2], [520, 397, 80, -0.6], [560, 408, -90, -1.8]];
    for (var i = 0; i < bw.length; i++) {
      s += walker(person(bw[i][0], bw[i][1], ROBES[i + 1], COVERS[i], 1.25) +
        '<rect x="' + (bw[i][0] - 9) + '" y="' + (bw[i][1] - 72) + '" width="18" height="10" fill="#b0623a"/>', 3.5, bw[i][2], bw[i][3]);
    }
    s += person(170, 412, '#1f9d63', '#f3e3c2', 1.35, 'bob', 0);
    s += person(208, 412, '#2e7d9a', '#ffffff', 1.35, 'bob', -0.5);
    s += heart(189, 328);
    s += txt(170, 440, 'Muhajirin', 13, '#4a2c14', 5.5, 'ttl');
    s += person(610, 412, '#d35400', '#3b3b3b', 1.35, 'bob', -0.3);
    s += person(648, 412, '#8e44ad', '#f3e3c2', 1.35, 'bob', -0.8);
    s += heart(629, 328);
    s += txt(648, 440, 'Anshar', 13, '#4a2c14', 5.5, 'ttl');
    s += txt(400, 48, 'MADINAH AL-MUNAWWARAH', 24, '#2c5a40', 0.6, 'ttl');
    return s + '</svg>';
  }

  /* =====================================================
     SCENE 8 - PENUTUP
     ===================================================== */
  function scene8() {
    var s = SVG_OPEN + '<defs>' + grad('g8sky', [[0, '#081338'], [0.6, '#12306e'], [1, '#1d4a8a']]) + glowGrad('g8glow', '#ffe08a') + '</defs>';
    s += '<rect width="800" height="450" fill="url(#g8sky)"/>' + stars(90, 330);
    s += '<circle cx="400" cy="225" r="230" fill="url(#g8glow)" opacity=".18" class="pulse"/>';
    s += '<g transform="translate(400,225)"><g class="spin slow">' +
      '<rect x="-130" y="-130" width="260" height="260" fill="none" stroke="#e6b422" stroke-width="3" opacity=".55"/>' +
      '<rect x="-130" y="-130" width="260" height="260" fill="none" stroke="#e6b422" stroke-width="3" opacity=".55" transform="rotate(45)"/>' +
      '<rect x="-95" y="-95" width="190" height="190" fill="none" stroke="#ffe08a" stroke-width="2" opacity=".4" transform="rotate(22.5)"/></g>' +
      '<g class="spin slow rev"><circle r="175" fill="none" stroke="#ffe08a" stroke-width="2" stroke-dasharray="4 10" opacity=".5"/></g></g>';
    s += '<g transform="translate(400,62)"><g class="fadein" style="animation-delay:.3s"><circle r="26" fill="#ffe08a"/><circle cx="10" cy="-4" r="22" fill="#0d2150"/>' +
      '<path d="M30 -2 l3.5 8 8.5 .8 -6.5 5.6 2 8.4 -7.5 -4.4 -7.5 4.4 2 -8.4 -6.5 -5.6 8.5 -.8z" fill="#ffe08a" transform="translate(4,-6) scale(.8)"/></g></g>';
    s += '<g fill="#07112e"><rect y="410" width="800" height="40"/>' +
      '<path d="M320 410 Q400 300 480 410Z"/><rect x="296" y="330" width="14" height="80"/><rect x="490" y="330" width="14" height="80"/>' +
      '<path d="M294 330 L303 306 L312 330Z"/><path d="M488 330 L497 306 L506 330Z"/>' +
      '<path d="M200 410 Q240 360 280 410Z"/><path d="M520 410 Q560 360 600 410Z"/></g>';
    s += '<rect x="396" y="298" width="8" height="14" fill="#ffd23f"/>';
    for (var i = 0; i < 18; i++) {
      s += '<g transform="translate(' + (rnd() * 800).toFixed(0) + ',0)"><text class="fall" font-size="' + (10 + rnd() * 12).toFixed(0) + '" fill="#ffe08a" style="animation-delay:' + (rnd() * 6).toFixed(2) + 's;animation-duration:' + (5 + rnd() * 4).toFixed(1) + 's">\u2726</text></g>';
    }
    s += '</svg>';
    s += '<div class="finale"><h2>ISLAM ADALAH AGAMA RAHMAT BAGI SELURUH ALAM.</h2>' +
      '<p>Jadilah pribadi yang sabar, jujur, penyayang, dan selalu menebarkan kebaikan.</p></div>';
    return s;
  }

  /* =====================================================
     PLAYER
     ===================================================== */
  var $ = function (id) { return document.getElementById(id); };
  var player = $('player'), scenesBox = $('scenes'), intro = $('intro'), toastEl = $('toast');
  var subText = $('subText'), fillEl = $('fill'), thumbEl = $('thumb'), trackEl = $('track');
  var tNow = $('tNow'), tTotal = $('tTotal'), chipEl = $('sceneChip');
  var btnPlay = $('btnPlay'), btnPause = $('btnPause'), btnRestart = $('btnRestart');
  var btnMusic = $('btnMusic'), btnVoice = $('btnVoice'), btnFull = $('btnFull'), btnStart = $('btnStart');

  var sceneEls = [], chipBtns = [], hideTimers = [];
  var state = 'idle';            /* idle | playing | paused | ended */
  var elapsed = 0, lastTs = 0, curScene = -1, cueIdx = 0, curCue = -1;
  var musicOn = true, voiceOn = true;

  function fmt(t) {
    t = Math.max(0, Math.floor(t));
    var m = Math.floor(t / 60), s = t % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function toast(msg, ms) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove('show'); }, ms || 3200);
  }

  function buildAll() {
    var i, el, b, tk, ticks = $('ticks'), chips = $('chips');
    for (i = 0; i < SCENES.length; i++) {
      seed = 11 + i * 37;
      el = document.createElement('div');
      el.className = 'scene';
      el.innerHTML = SCENES[i].build();
      scenesBox.appendChild(el);
      sceneEls.push(el);

      b = document.createElement('button');
      b.className = 'sc';
      b.type = 'button';
      b.textContent = (i + 1);
      b.title = SCENES[i].title;
      (function (idx) { b.addEventListener('click', function () { seekTo(SCENES[idx].start + 0.05); }); })(i);
      chips.appendChild(b);
      chipBtns.push(b);

      if (i > 0) {
        tk = document.createElement('div');
        tk.className = 'tick';
        tk.style.left = (SCENES[i].start / TOTAL * 100) + '%';
        ticks.appendChild(tk);
      }
    }
    tTotal.textContent = fmt(TOTAL);
  }

  function showScene(idx) {
    if (idx === curScene) return;
    var prev = curScene, el = sceneEls[idx];
    curScene = idx;
    clearTimeout(hideTimers[idx]);
    el.classList.remove('on', 'show');
    void el.offsetWidth;
    el.classList.add('on');
    void el.offsetWidth;
    el.classList.add('show');
    if (prev >= 0 && prev !== idx) {
      var pe = sceneEls[prev];
      pe.classList.remove('show');
      clearTimeout(hideTimers[prev]);
      hideTimers[prev] = setTimeout(function () { pe.classList.remove('on'); }, 1400);
    }
    chipEl.textContent = 'Scene ' + (idx + 1) + ' \u2022 ' + SCENES[idx].title;
    for (var i = 0; i < chipBtns.length; i++) {
      chipBtns[i].classList.toggle('active', i === idx);
    }
  }

  function sceneAt(t) {
    for (var i = SCENES.length - 1; i >= 0; i--) {
      if (t >= SCENES[i].start) return i;
    }
    return 0;
  }

  /* ---------- NARASI ---------- */
  var hasSpeech = ('speechSynthesis' in window) && ('SpeechSynthesisUtterance' in window);
  var voice = null, speakToken = 0, warnedVoice = false;

  function pickVoice() {
    if (!hasSpeech) return;
    var vs = window.speechSynthesis.getVoices() || [];
    voice = null;
    for (var i = 0; i < vs.length; i++) {
      if (/^(id|in)[-_]/i.test(vs[i].lang) || /indonesia/i.test(vs[i].name)) { voice = vs[i]; break; }
    }
  }
  if (hasSpeech) {
    pickVoice();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = pickVoice;
    }
  }

  function stopSpeech() {
    speakToken++;
    if (hasSpeech) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  }

  function cueDuration(i) {
    var next = (i + 1 < CUES.length) ? CUES[i + 1].t : TOTAL;
    return next - CUES[i].t;
  }

  function speak(i) {
    if (!hasSpeech || !voiceOn || i < 0) return;
    var cue = CUES[i], text = cue.say || cue.sub;
    var avail = Math.max(2, cueDuration(i) - 0.5);
    var est = text.length / 14;
    var rate = Math.min(1.2, Math.max(0.9, est / avail));
    var token = ++speakToken;
    try { window.speechSynthesis.cancel(); } catch (e) {}
    setTimeout(function () {
      if (token !== speakToken || state !== 'playing') return;
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'id-ID';
      if (voice) u.voice = voice;
      u.rate = rate;
      u.pitch = 1;
      u.volume = 1;
      window.speechSynthesis.speak(u);
    }, 90);
    if (!warnedVoice && !voice) {
      var vs = window.speechSynthesis.getVoices() || [];
      if (vs.length) { warnedVoice = true; toast('Suara bahasa Indonesia belum terpasang di perangkat. Subtitle tetap tampil.', 4500); }
    }
  }

  /* ---------- MUSIK LATAR (disintesis, bebas hak cipta) ---------- */
  var AC = window.AudioContext || window.webkitAudioContext;
  var actx = null, master = null, bus = null, schedTimer = null, nextBar = 0;
  var SC = [0, 1, 4, 5, 7, 8, 10, 12];   /* tangga nada Hijaz */
  var BASE = 62;                          /* D4 */
  var MOTIFS = [
    [[4, 2], [3, 1], [2, 1], [1, 2], [0, 2]],
    [[0, 2], [1, 1], [2, 1], [3, 2], [4, 2]],
    [[4, 1], [5, 1], [4, 1], [3, 2], [2, 1], [1, 1], [0, 1]],
    [[2, 2], [3, 1], [4, 2], [3, 1], [2, 2]]
  ];
  var STEP = 0.3;

  function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }

  function initAudio() {
    if (actx || !AC) return;
    try {
      actx = new AC();
      master = actx.createGain();
      master.gain.value = 0.0001;
      var lp = actx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 2400;
      bus = actx.createGain();
      var dl = actx.createDelay(1.0); dl.delayTime.value = 0.38;
      var fb = actx.createGain(); fb.gain.value = 0.38;
      var dlp = actx.createBiquadFilter(); dlp.type = 'lowpass'; dlp.frequency.value = 1700;
      bus.connect(lp);
      bus.connect(dl); dl.connect(dlp); dlp.connect(fb); fb.connect(dl); dlp.connect(lp);
      lp.connect(master); master.connect(actx.destination);
    } catch (e) { actx = null; }
  }

  function pluck(t, midi, dur, vol) {
    var o = actx.createOscillator(), o2 = actx.createOscillator(), g = actx.createGain();
    o.type = 'triangle'; o2.type = 'sine';
    o.frequency.value = mtof(midi); o2.frequency.value = mtof(midi + 12);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); o2.connect(g); g.connect(bus);
    o.start(t); o2.start(t); o.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
  }

  function pad(t, midi, dur, vol) {
    var g = actx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 1.2);
    g.gain.linearRampToValueAtTime(0.0001, t + dur);
    g.connect(bus);
    [0, 6].forEach(function (det) {
      var o = actx.createOscillator();
      o.type = 'sine'; o.frequency.value = mtof(midi); o.detune.value = det;
      o.connect(g); o.start(t); o.stop(t + dur + 0.05);
    });
  }

  function thump(t, vol) {
    var o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(130, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.18);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    o.connect(g); g.connect(bus);
    o.start(t); o.stop(t + 0.3);
  }

  function scheduleBar(t) {
    pad(t, 50, 3.4, 0.05);
    pad(t, 57, 3.4, 0.035);
    thump(t, 0.07);
    thump(t + STEP * 4, 0.04);
    if (Math.random() < 0.8) {
      var m = MOTIFS[Math.floor(Math.random() * MOTIFS.length)], pos = 0;
      for (var i = 0; i < m.length; i++) {
        pluck(t + pos * STEP, BASE + SC[m[i][0]], m[i][1] * STEP * 1.6, 0.11);
        pos += m[i][1];
      }
    }
  }

  function musicLoop() {
    if (!actx) return;
    while (nextBar < actx.currentTime + 1.2) {
      scheduleBar(nextBar);
      nextBar += STEP * 8;
    }
  }

  function setMusicLevel(on, sec) {
    if (!actx) return;
    master.gain.setTargetAtTime(on ? 0.5 : 0.0001, actx.currentTime, sec || 0.3);
  }

  function startMusic() {
    initAudio();
    if (!actx) return;
    if (actx.state === 'suspended') actx.resume();
    if (!schedTimer) {
      nextBar = actx.currentTime + 0.2;
      schedTimer = setInterval(musicLoop, 250);
    }
    setMusicLevel(musicOn, 0.6);
  }

  /* ---------- KONTROL ---------- */
  function resetAll() {
    stopSpeech();
    elapsed = 0; cueIdx = 0; curCue = -1;
    for (var i = 0; i < sceneEls.length; i++) {
      clearTimeout(hideTimers[i]);
      sceneEls[i].classList.remove('on', 'show');
    }
    curScene = -1;
    showScene(0);
    subText.textContent = '';
    updateUI();
  }

  function setButtons() {
    btnPlay.disabled = (state === 'playing');
    btnPause.disabled = (state !== 'playing');
  }

  function play() {
    if (state === 'ended') { resetAll(); }
    if (state === 'idle') { resetAll(); }
    var resumed = (state === 'paused');
    state = 'playing';
    player.classList.remove('paused');
    intro.classList.add('hide');
    lastTs = performance.now();
    startMusic();
    if (actx && actx.state === 'suspended') actx.resume();
    if (resumed && curCue >= 0 && (elapsed - CUES[curCue].t) < 4) { speak(curCue); }
    setButtons();
  }

  function pause() {
    if (state !== 'playing') return;
    state = 'paused';
    player.classList.add('paused');
    stopSpeech();
    if (actx && actx.state === 'running') actx.suspend();
    setButtons();
  }

  function restart() {
    resetAll();
    state = 'idle';
    if (actx && actx.state === 'suspended') actx.resume();
    play();
  }

  function finish() {
    state = 'ended';
    elapsed = TOTAL;
    stopSpeech();
    setMusicLevel(false, 1.2);
    subText.textContent = '';
    setButtons();
    updateUI();
    toast('Alhamdulillah, animasi selesai. Tekan Restart untuk mengulang.', 5000);
  }

  function seekTo(t) {
    t = Math.max(0, Math.min(TOTAL - 0.05, t));
    stopSpeech();
    elapsed = t;
    cueIdx = 0;
    while (cueIdx < CUES.length && CUES[cueIdx].t <= elapsed) cueIdx++;
    curCue = cueIdx - 1;
    if (state === 'idle') {
      state = 'paused';
      intro.classList.add('hide');
    }
    if (state === 'ended') {
      state = 'paused';
      setMusicLevel(musicOn, 0.5);
    }
    curScene = -1;
    for (var i = 0; i < sceneEls.length; i++) {
      clearTimeout(hideTimers[i]);
      if (i !== sceneAt(elapsed)) sceneEls[i].classList.remove('on', 'show');
    }
    showScene(sceneAt(elapsed));
    updateUI();
    setButtons();
  }

  function updateUI() {
    var pct = Math.min(100, elapsed / TOTAL * 100);
    fillEl.style.width = pct + '%';
    thumbEl.style.left = pct + '%';
    tNow.textContent = fmt(elapsed);
    showScene(sceneAt(elapsed));

    if (state === 'playing') {
      while (cueIdx < CUES.length && CUES[cueIdx].t <= elapsed) {
        curCue = cueIdx;
        cueIdx++;
        speak(curCue);
      }
    }
    if (curCue >= 0 && state !== 'ended' && elapsed < CUES[curCue].t + cueDuration(curCue) - 0.2) {
      if (subText.textContent !== CUES[curCue].sub) subText.textContent = CUES[curCue].sub;
    } else if (state !== 'idle') {
      if (subText.textContent) subText.textContent = '';
    }
  }

  function tick(now) {
    requestAnimationFrame(tick);
    if (state !== 'playing') { lastTs = now; return; }
    var dt = (now - lastTs) / 1000;
    lastTs = now;
    if (dt > 0.25) dt = 0.25;
    elapsed += dt;
    if (elapsed >= TOTAL) { finish(); return; }
    updateUI();
  }

  /* ---------- EVENT ---------- */
  btnStart.addEventListener('click', play);
  btnPlay.addEventListener('click', play);
  btnPause.addEventListener('click', pause);
  btnRestart.addEventListener('click', restart);

  btnMusic.addEventListener('click', function () {
    musicOn = !musicOn;
    btnMusic.classList.toggle('on', musicOn);
    if (state !== 'idle' && state !== 'ended') setMusicLevel(musicOn, 0.3);
  });

  btnVoice.addEventListener('click', function () {
    voiceOn = !voiceOn;
    btnVoice.classList.toggle('on', voiceOn);
    if (!voiceOn) stopSpeech();
    else if (state === 'playing' && curCue >= 0 && (elapsed - CUES[curCue].t) < 3) speak(curCue);
  });

  btnFull.addEventListener('click', function () {
    var d = document;
    if (d.fullscreenElement || d.webkitFullscreenElement) {
      (d.exitFullscreen || d.webkitExitFullscreen).call(d);
    } else {
      var f = player.requestFullscreen || player.webkitRequestFullscreen;
      if (f) { try { f.call(player); } catch (e) {} } else { toast('Layar penuh tidak didukung di perangkat ini.'); }
    }
  });

  var dragging = false;
  function seekFromEvent(e) {
    var r = trackEl.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    seekTo(Math.max(0, Math.min(1, x / r.width)) * TOTAL);
  }
  trackEl.addEventListener('pointerdown', function (e) {
    dragging = true;
    try { trackEl.setPointerCapture(e.pointerId); } catch (err) {}
    seekFromEvent(e);
  });
  trackEl.addEventListener('pointermove', function (e) { if (dragging) seekFromEvent(e); });
  trackEl.addEventListener('pointerup', function () { dragging = false; });
  trackEl.addEventListener('pointercancel', function () { dragging = false; });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden && state === 'playing') pause();
  });

  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault();
      if (state === 'playing') pause(); else play();
    }
  });

  /* ---------- MULAI ---------- */
  buildAll();
  resetAll();
  setButtons();
  requestAnimationFrame(tick);
})();
