/* VINTRO catalog — shared code for every page.
   Data lives in data/brand.json and data/products.json (edited from Pages CMS). */
(function () {
  "use strict";
  var ROOT = document.documentElement.getAttribute("data-root") || "./";
  var PAGE = document.body.getAttribute("data-page");
  var LOCAL = location.protocol === "file:";
  var FRAMED = false; try { FRAMED = window.top !== window.self; } catch (e) { FRAMED = true; }
  /* online, folders open their index.html by themselves; from disk or inside a preview they need it spelled out */
  function d(p) { return (LOCAL || FRAMED) ? p + "index.html" : p; }
  function pageUrl(name) { return d(ROOT + name + "/"); }

  /* Collections are named "summer-2025", "winter-2026"… Their order is newest year first, summer before winter.
     Intro text and cover come from data/collections.json (edited in Pages CMS). */
  var TYPES = {
    summer: { ar: "صيف", latin: "Summer", intro: "أقمشة خفيفة وقصّات مريحة لأيام الحر" },
    winter: { ar: "شتاء", latin: "Winter", intro: "طبقات دافئة وأقمشة ثقيلة لموسم البرد" }
  };
  var ALL = [], SEASONS = [], LATEST = [];

  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function toAr(n) { return String(n).replace(/\d/g, function (x) { return "٠١٢٣٤٥٦٧٨٩"[x]; }); }
  function arr(x) { return Array.isArray(x) ? x : (x ? [x] : []); }
  function url(p) { if (!p) return ""; if (/^(https?:)?\/\//.test(p) || /^data:/.test(p)) return p; return ROOT + String(p).replace(/^\/+/, ""); }
  function mkSeason(id, cfg) {
    var m = /^(summer|winter)-(\d{4})$/.exec(String(id || "").trim()); if (!m) return null;
    var t = TYPES[m[1]], y = m[2]; cfg = cfg || {};
    return { id: m[0], type: m[1], year: +y, cls: m[1], ar: t.ar + " " + toAr(y), latin: t.latin + " " + y,
      intro: cfg.intro || B[m[1] + "_intro"] || t.intro,
      cover: cfg.cover || (y === "2026" ? B[m[1] + "_cover"] : "") || "", hidden: !!cfg.hidden };
  }
  function countOf(id) { return P.filter(function (p) { return p.season === id; }).length; }
  function buildSeasons(C) {
    var seen = {};
    function add(id, cfg) { var s = mkSeason(id, cfg); if (s && !seen[s.id]) { seen[s.id] = 1; ALL.push(s); } }
    arr(C).forEach(function (c) { if (c) add(c.id, c); });
    P.forEach(function (p) { add(p.season); });
    if (!ALL.length) { add("summer-2026"); add("winter-2026"); }
    ALL.sort(function (a, b) { return b.year - a.year || (a.type === "summer" ? -1 : 1); });
    SEASONS = ALL.filter(function (s) { return !s.hidden && countOf(s.id) > 0; });
    if (!SEASONS.length) SEASONS = ALL.filter(function (s) { return !s.hidden; });
    var top = SEASONS.length ? SEASONS[0].year : 0;
    LATEST = SEASONS.filter(function (s) { return s.year === top; });
  }
  function years() { var y = []; SEASONS.forEach(function (s) { if (y.indexOf(s.year) < 0) y.push(s.year); }); return y; }
  function seasonOf(id) { return ALL.find(function (s) { return s.id === id; }) || mkSeason(id); }
  function seasonUrl(id, cat) { return pageUrl("collections") + "?id=" + encodeURIComponent(id) + (cat ? "&cat=" + encodeURIComponent(cat) : ""); }
  function modelUrl(p) { return d(ROOT + "model/") + "?id=" + encodeURIComponent(p.code || p.name); }
  function digits(s) { return String(s || "").replace(/[^\d]/g, ""); }
  function imagesOf(p) { var o = []; arr(p.colors).forEach(function (c) { arr(c.images).forEach(function (i) { if (i) o.push(i); }); }); return o; }

  var LOGO = window.VINTRO_LOGO || "";
  function logo(kind, cls) {
    var vb = { full: "84 84 129.5 88.5", mark: "124 84.5 49.5 51.5", word: "84.5 148 128.5 24" }[kind];
    return '<svg class="logo-svg ' + (cls || "") + '" viewBox="' + vb + '" role="img" aria-label="VINTRO">' + LOGO + "</svg>";
  }

  var NAMED = { "أسود": "#1A1A1A", "أبيض": "#F4F4F2", "ابيض": "#F4F4F2", "كحلي": "#1E2A44", "رمادي": "#8A8D91", "زيتي": "#5B6033", "بيج": "#D9C7A7", "خمري": "#6E1F2E", "أحمر": "#B3261E", "احمر": "#B3261E", "أزرق": "#2F5DA8", "ازرق": "#2F5DA8", "سماوي": "#9CC3D5", "أخضر": "#2F6B45", "اخضر": "#2F6B45", "بني": "#6B4A2F", "كريمي": "#E9E2D0", "زهري": "#E7A3B6", "وردي": "#E7A3B6", "أصفر": "#E2B93B", "اصفر": "#E2B93B", "برتقالي": "#D9772B", "بنفسجي": "#6A4C93", "رملي": "#CDB78F", "عسلي": "#B07A32", "فضي": "#BFC3C7", "ذهبي": "#C9A246", "كاكي": "#8C8461", "موف": "#9C7FA6", "نيلي": "#2C3E73" };
  function hexOf(c) {
    var h = String(c && c.hex || "").trim();
    if (/^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(h)) return h[0] === "#" ? h : "#" + h;
    var n = String(c && c.name || "").trim();
    for (var k in NAMED) if (n.indexOf(k) === 0) return NAMED[k];
    return "#9A9C98";
  }
  function mix(hex, t) { // blend a color toward ivory
    var h = hex.replace("#", ""); if (h.length === 3) h = h.replace(/./g, "$&$&");
    var a = [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }), b = [250, 248, 244];
    return "rgb(" + a.map(function (v, i) { return Math.round(v * (1 - t) + b[i] * t); }).join(",") + ")";
  }

  /* garment line art for models without photos yet */
  var SHAPES = {
    tee: "M30 14 L42 9 Q50 18 58 9 L70 14 L88 32 L76 42 L70 36 L70 112 L30 112 L30 36 L24 42 L12 32 Z",
    shirt: "M32 10 L44 6 L50 16 L56 6 L68 10 L84 32 L92 84 L82 86 L72 44 L72 114 L28 114 L28 44 L18 86 L8 84 L16 32 Z",
    dress: "M39 8 L44 8 Q50 16 56 8 L61 8 L63 32 Q62 40 60 44 L82 114 L18 114 L40 44 Q38 40 37 32 Z",
    pants: "M28 10 L72 10 L77 114 L56 114 L50 44 L44 114 L23 114 Z",
    coat: "M32 8 L44 4 L50 22 L56 4 L68 8 L86 30 L94 98 L82 100 L74 46 L74 116 L26 116 L26 46 L18 100 L6 98 L14 30 Z"
  };
  function shapeFor(cat) {
    cat = cat || "";
    if (/فستان|تنور|عباي/.test(cat)) return "dress";
    if (/بنطال|جينز|شورت/.test(cat)) return "pants";
    if (/جاكيت|معطف|كبوت|بالطو|جاكيتة/.test(cat)) return "coat";
    if (/قميص|كنزة|بلوز|هودي|سويت/.test(cat)) return "shirt";
    return "tee";
  }
  function art(p, hex) {
    return '<svg class="art" viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="120" height="160" fill="' + mix(hex, .78) + '"/>' +
      '<g transform="translate(18 22)"><path d="' + SHAPES[shapeFor(p.category)] + '" fill="' + esc(hex) + '" stroke="#172133" stroke-opacity=".18" stroke-width=".6" stroke-linejoin="round"/></g></svg>';
  }
  /* the faceted line pattern from the VINTRO business card */
  function lines() {
    var L = [[0, 30, 38, 0], [0, 30, 26, 64], [26, 64, 0, 100], [38, 0, 62, 34], [26, 64, 62, 34], [62, 34, 100, 18], [62, 34, 70, 78], [26, 64, 70, 78], [70, 78, 100, 60], [70, 78, 44, 100], [100, 60, 86, 100], [62, 34, 100, 60], [0, 100, 44, 100]];
    return '<svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + L.map(function (l) { return '<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '" stroke="currentColor" stroke-width=".35" vector-effect="non-scaling-stroke"/>'; }).join("") + "</svg>";
  }

  var IC = {
    menu: '<svg viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h12"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>',
    g2: '<svg viewBox="0 0 18 18"><rect x="1" y="1" width="7" height="16"/><rect x="10" y="1" width="7" height="16"/></svg>',
    g4: '<svg viewBox="0 0 18 18"><rect x="1" y="1" width="3" height="16"/><rect x="5.5" y="1" width="3" height="16"/><rect x="10" y="1" width="3" height="16"/><rect x="14.5" y="1" width="3" height="16"/></svg>'
  };

  var B = {}, P = [];

  /* ---------- shared pieces ---------- */
  function card(p) {
    var imgs = imagesOf(p), cols = arr(p.colors), first = cols[0] || {};
    var media = imgs.length
      ? '<img src="' + esc(url(imgs[0])) + '" alt="' + esc(p.name) + '" loading="lazy">' + (imgs[1] ? '<img class="alt" src="' + esc(url(imgs[1])) + '" alt="" loading="lazy">' : "")
      : art(p, hexOf(first));
    return '<a class="card" href="' + esc(modelUrl(p)) + '"><div class="ph">' + media + (p.featured ? '<span class="new latin">New</span>' : "") + '</div>' +
      '<div class="body"><span class="nm">' + esc(p.name) + '</span><div class="sub"><span class="code">' + esc(p.code || "") + '</span><span>' +
      (cols.length > 1 ? toAr(cols.length) + " ألوان" : esc(first.name || "")) + '</span></div>' +
      '<div class="sws">' + cols.slice(0, 6).map(function (c) { return '<i style="background:' + esc(hexOf(c)) + '"></i>'; }).join("") + '</div></div></a>';
  }
  function catsOf(list) { var c = []; list.forEach(function (p) { if (p.category && c.indexOf(p.category) < 0) c.push(p.category); }); return c; }

  function header(current) {
    var NAV = [{ id: "collections", ar: "المجموعات", href: pageUrl("collections") }].concat(LATEST.map(function (s) { return { id: s.id, ar: s.ar, href: seasonUrl(s.id) }; }))
      .concat([{ id: "about", ar: "من نحن", href: pageUrl("about") }, { id: "wholesale", ar: "الجملة", href: pageUrl("wholesale") }]);
    var h = $("#head");
    h.className = "head";
    h.innerHTML = '<div class="head-in pad"><div class="start"><button class="ico-btn" id="open-menu" aria-label="القائمة">' + IC.menu + '<span class="t">القائمة</span></button>' +
      '<nav class="links" aria-label="الصفحات">' + NAV.map(function (n) { return '<a href="' + n.href + '"' + (current === n.id ? ' aria-current="page"' : "") + '>' + n.ar + '</a>'; }).join("") + '</nav></div>' +
      '<a class="brand" href="' + d(ROOT) + '" aria-label="VINTRO — الرئيسية">' + logo("word") + '</a>' +
      '<div class="end"><button class="ico-btn" id="open-search" aria-label="بحث">' + IC.search + '<span class="t">بحث</span></button>' +
      '<a class="ico-btn" href="' + pageUrl("contact") + '" aria-label="تواصل معنا"' + (current === "contact" ? ' aria-current="page"' : "") + '>' + IC.phone + '<span class="t">تواصل</span></a></div></div>';
    window.addEventListener("scroll", function () { h.classList.toggle("scrolled", window.scrollY > 4); }, { passive: true });

    var menu = document.createElement("div");
    menu.className = "drawer-wrap"; menu.id = "menu"; menu.hidden = true;
    var waM = digits(B.whatsapp);
    menu.innerHTML = '<div class="drawer-bg" data-close></div><nav class="drawer" role="dialog" aria-modal="true" aria-label="القائمة">' +
      '<div class="drawer-top"><a href="' + d(ROOT) + '" class="drawer-logo">' + logo("word") + '</a><button class="ico-btn" data-close aria-label="إغلاق">' + IC.close + '</button></div>' +
      '<ul class="drawer-list"><li><a href="' + d(ROOT) + '"' + (current === "home" ? ' aria-current="page"' : "") + '>الرئيسية</a></li>' +
      '<li><a href="' + pageUrl("collections") + '"' + (current === "collections" ? ' aria-current="page"' : "") + '>المجموعات</a></li>' +
      years().map(function (y, yi) {
        var ss = SEASONS.filter(function (s) { return s.year === y; });
        var open = ss.some(function (s) { return s.id === current; }) || (yi === 0 && !SEASONS.some(function (s) { return s.id === current; }));
        return '<li><details' + (open ? " open" : "") + '><summary>مجموعات ' + toAr(y) + '<small>' + toAr(ss.reduce(function (n, s) { return n + countOf(s.id); }, 0)) + '</small></summary><ul class="sub">' +
          ss.map(function (s) { return '<li><a href="' + seasonUrl(s.id) + '"' + (current === s.id ? ' aria-current="page"' : "") + '>' + s.ar + ' <small>(' + toAr(countOf(s.id)) + ')</small></a></li>'; }).join("") + '</ul></details></li>';
      }).join("") +
      '<li><a href="' + pageUrl("about") + '"' + (current === "about" ? ' aria-current="page"' : "") + '>من نحن</a></li>' +
      '<li><a href="' + pageUrl("wholesale") + '"' + (current === "wholesale" ? ' aria-current="page"' : "") + '>الجملة وطريقة الطلب</a></li>' +
      '<li><a href="' + pageUrl("contact") + '"' + (current === "contact" ? ' aria-current="page"' : "") + '>تواصل معنا</a></li></ul>' +
      '<div class="drawer-foot">' + [B.phone, B.phone2].filter(Boolean).map(function (ph) { return '<a class="ltr" href="tel:' + esc(ph.replace(/\s/g, "")) + '">' + esc(ph) + '</a>'; }).join("") +
      (waM ? '<a class="btn wa block" href="https://wa.me/' + waM + '" target="_blank" rel="noopener">' + IC.wa + 'واتساب</a>' : "") + '</div></nav>';
    document.body.appendChild(menu);

    var search = document.createElement("div");
    search.className = "overlay"; search.id = "search"; search.hidden = true; search.setAttribute("role", "dialog"); search.setAttribute("aria-label", "بحث");
    search.innerHTML = '<div class="overlay-top pad"><span class="latin" style="font-size:.8rem">Search</span><button class="ico-btn" data-close aria-label="إغلاق">' + IC.close + '</button></div>' +
      '<div class="pad"><label class="search-box">' + IC.search.replace("<svg", '<svg style="width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.4"') +
      '<input id="q" type="search" placeholder="ابحث باسم الموديل أو رقمه أو اللون" autocomplete="off"></label><p class="search-hint" id="q-hint">مثال: جاكيت، كحلي، W26-501</p><div class="grid" id="q-res"></div></div>';
    document.body.appendChild(search);

    function open(o) { o.hidden = false; document.body.classList.add("lock"); requestAnimationFrame(function () { o.classList.add("on"); }); var i = o.querySelector("input"); if (i) setTimeout(function () { i.focus(); }, 30); }
    function close() { [menu, search].forEach(function (o) { o.classList.remove("on"); o.hidden = true; }); document.body.classList.remove("lock"); }
    $("#open-menu").addEventListener("click", function () { open(menu); });
    $("#open-search").addEventListener("click", function () { open(search); });
    document.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    $("#q").addEventListener("input", function (e) {
      var q = e.target.value.trim().toLowerCase();
      var res = q ? P.filter(function (p) {
        return [p.name, p.code, p.category, p.fabric].concat(arr(p.colors).map(function (c) { return c.name; })).join(" ").toLowerCase().indexOf(q) >= 0;
      }) : [];
      $("#q-res").innerHTML = res.slice(0, 24).map(card).join("");
      $("#q-hint").textContent = q ? (res.length ? toAr(res.length) + " نتيجة" : "لا توجد نتائج. جرّب كلمة أخرى.") : "مثال: جاكيت، كحلي، W26-501";
    });
  }

  function footer() {
    var wa = digits(B.whatsapp);
    $("#foot").innerHTML = '<div class="foot-in pad"><div class="fbrand">' + logo("full") + '<p>' + esc(B.tagline || "") + '</p></div>' +
      '<div><h4>المجموعات</h4><ul>' + LATEST.map(function (s) { return '<li><a href="' + seasonUrl(s.id) + '">' + s.ar + '</a></li>'; }).join("") + '<li><a href="' + pageUrl("collections") + '">كل المجموعات</a></li></ul><h4 style="margin-top:22px">الشركة</h4><ul><li><a href="' + pageUrl("about") + '">من نحن</a></li><li><a href="' + pageUrl("wholesale") + '">الجملة وطريقة الطلب</a></li><li><a href="' + pageUrl("contact") + '">تواصل معنا</a></li></ul></div>' +
      '<div><h4>تواصل معنا</h4><ul>' +
      [B.phone, B.phone2].filter(Boolean).map(function (ph) { return '<li><a class="ltr" href="tel:' + esc(ph.replace(/\s/g, "")) + '">' + esc(ph) + '</a></li>'; }).join("") +
      [B.email, B.email2].filter(Boolean).map(function (m) { return '<li><a class="ltr" href="mailto:' + esc(m) + '">' + esc(m) + '</a></li>'; }).join("") + '</ul></div>' +
      '<div><h4>العنوان</h4><ul>' + (B.address ? '<li>' + esc(B.address) + '</li>' : "") +
      (B.instagram ? '<li><a class="ltr" href="https://instagram.com/' + esc(String(B.instagram).replace(/^@/, "")) + '" target="_blank" rel="noopener">Instagram</a></li>' : "") +
      (B.facebook ? '<li><a class="ltr" href="' + esc(B.facebook) + '" target="_blank" rel="noopener">Facebook</a></li>' : "") + '</ul></div></div>' +
      '<div class="pad"><div class="foot-bot"><span>© ' + toAr(new Date().getFullYear()) + ' VINTRO. جميع الحقوق محفوظة.</span><span class="latin" style="font-size:.7rem">Ready-to-wear manufacturer</span></div></div>';
    if (wa && PAGE !== "model") {
      var a = document.createElement("a");
      a.className = "wa-float"; a.href = "https://wa.me/" + wa; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", "راسلنا على واتساب"); a.innerHTML = IC.wa;
      document.body.appendChild(a);
    }
  }

  /* ---------- pages ---------- */
  function splash() {
    var seen = false; try { seen = sessionStorage.getItem("vintro-intro") === "1"; sessionStorage.setItem("vintro-intro", "1"); } catch (e) {}
    if (seen || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    var s = document.createElement("div");
    s.className = "splash"; s.setAttribute("aria-hidden", "true");
    s.innerHTML = '<div class="sp-mark">' + logo("mark") + '</div><div class="sp-word">' + logo("word") + '</div><div class="sp-line"></div>';
    document.body.appendChild(s);
    s.addEventListener("click", function () { s.classList.add("out"); });
    setTimeout(function () { s.classList.add("out"); }, 2300);
    setTimeout(function () { s.remove(); }, 3100);
  }

  function home() {
    splash();
    var top = LATEST.length ? LATEST[0].year : new Date().getFullYear();
    document.title = "VINTRO — " + (B.tagline || "مجموعات " + toAr(top));
    var inLatest = function (p) { return LATEST.some(function (s) { return s.id === p.season; }); };
    var featured = P.filter(function (p) { return p.featured; });
    if (featured.length < 4) featured = featured.concat(P.filter(function (p) { return featured.indexOf(p) < 0 && inLatest(p); })).slice(0, 10);
    var older = SEASONS.filter(function (s) { return s.year !== top; });
    var wa = digits(B.whatsapp);
    $("#main").innerHTML =
      '<section class="opening" aria-label="VINTRO">' + lines() + '<div class="op-in pad">' +
        '<span class="op-logo">' + logo("full") + '</span>' +
        '<span class="op-eyebrow latin">Collections ' + top + '</span>' +
        '<h1>' + esc(B.headline || "") + '</h1>' + (B.tagline ? '<p>' + esc(B.tagline) + '</p>' : "") +
        '<div class="op-btns"><a class="btn gold" href="' + pageUrl("collections") + '">اكتشف المجموعات</a><a class="btn light" href="' + pageUrl("contact") + '">تواصل معنا</a></div>' +
        '</div><a class="op-down" href="#seasons" aria-label="انزل إلى المجموعات"><span></span></a></section>' +
      '<section class="hero' + (LATEST.length === 1 ? " one" : "") + '" id="seasons" aria-label="المجموعات">' + LATEST.slice(0, 2).map(function (s) {
        var cover = s.cover, n = countOf(s.id);
        return '<a class="panel ' + s.cls + (cover ? " has-img" : "") + '" href="' + seasonUrl(s.id) + '"><div class="media">' + (cover ? '<img src="' + esc(url(cover)) + '" alt="">' : lines()) + '</div>' +
          (cover ? "" : '<span class="mark">' + logo("mark") + '</span>') +
          '<div class="cap fade"><span class="latin">' + s.latin + '</span><span class="ar">' + esc(s.intro) + '</span><span class="go">اكتشف المجموعة · ' + toAr(n) + ' موديل</span></div></a>';
      }).join("") + '</section>' +
      (featured.length ? '<section class="sec pad" style="padding-top:0"><div class="sec-head"><div><span class="latin">New In</span><h2>أحدث الموديلات</h2></div><a class="link-u" href="' + pageUrl("collections") + '">كل المجموعات</a></div><div class="strip">' + featured.map(card).join("") + '</div></section>' : "") +
      LATEST.map(function (s) {
        var cats = catsOf(P.filter(function (p) { return p.season === s.id; }));
        return cats.length ? '<section class="sec pad" style="padding-top:24px"><div class="sec-head"><div><span class="latin">' + s.latin + '</span><h2>' + s.ar + '</h2></div><a class="link-u" href="' + seasonUrl(s.id) + '">كل الموديلات</a></div><div class="cats">' +
          cats.map(function (c) { var n = P.filter(function (p) { return p.season === s.id && p.category === c; }).length; return '<a href="' + seasonUrl(s.id, c) + '"><strong>' + esc(c) + '</strong><span>' + toAr(n) + ' موديل</span></a>'; }).join("") + '</div></section>' : "";
      }).join("") +
      (older.length ? '<section class="sec pad" style="padding-top:24px"><div class="sec-head"><div><span class="latin">Archive</span><h2>مجموعات سابقة</h2></div><a class="link-u" href="' + pageUrl("collections") + '">كل المجموعات</a></div><div class="arch">' +
        older.map(function (s) {
          return '<a class="arch-card ' + s.cls + '" href="' + seasonUrl(s.id) + '"><div class="am">' + (s.cover ? '<img src="' + esc(url(s.cover)) + '" alt="" loading="lazy">' : lines() + '<span class="mark">' + logo("mark") + '</span>') + '</div>' +
            '<div class="at"><span class="latin">' + s.latin + '</span><strong>' + s.ar + '</strong><small>' + toAr(countOf(s.id)) + ' موديل</small></div></a>';
        }).join("") + '</div></section>' : "") +
      '<section class="sec pad" id="about" style="padding-block:88px"><div class="about"><div class="txt"><span class="eyebrow latin">About VINTRO</span><h2 style="font-size:clamp(1.6rem,3vw,2.3rem)">من نحن</h2><p>' + esc(B.about || "") + '</p><a class="link-u" style="justify-self:start" href="' + pageUrl("about") + '">اقرأ المزيد عن VINTRO</a>' +
      (B.founder ? '<div class="founder"><span class="m">' + logo("mark") + '</span><div><b>' + esc(B.founder) + '</b><small>' + esc(B.founder_title || "") + '</small></div></div>' : "") + '</div>' +
      '<div class="contact-card" id="contact"><h3>تواصل معنا</h3><dl>' +
      [B.phone, B.phone2].filter(Boolean).map(function (ph, i) { return '<div><dt class="latin">' + (i ? "Phone 2" : "Phone") + '</dt><dd><a class="ltr" href="tel:' + esc(ph.replace(/\s/g, "")) + '">' + esc(ph) + '</a></dd></div>'; }).join("") +
      [B.email, B.email2].filter(Boolean).map(function (m) { return '<div><dt class="latin">Email</dt><dd><a class="ltr" href="mailto:' + esc(m) + '">' + esc(m) + '</a></dd></div>'; }).join("") +
      (B.address ? '<div><dt class="latin">Address</dt><dd>' + esc(B.address) + '</dd></div>' : "") + '</dl>' +
      (wa ? '<a class="btn wa block" href="https://wa.me/' + wa + '" target="_blank" rel="noopener">' + IC.wa + 'راسلنا على واتساب</a>' : "") + '</div></div></section>';
    if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(function () { t.scrollIntoView(); }, 50); }
  }

  function collection() {
    var qs = new URLSearchParams(location.search);
    var id = document.body.getAttribute("data-season") || qs.get("id"), s = seasonOf(id);
    if (!s) { $("#main").innerHTML = '<div class="loading pad">لم نعثر على هذه المجموعة. <a class="link-u" href="' + pageUrl("collections") + '">كل المجموعات</a></div>'; return; }
    document.title = s.ar + " — VINTRO";
    var items = P.filter(function (p) { return p.season === id; }), cats = catsOf(items);
    var cat = new URLSearchParams(location.search).get("cat") || "all"; if (cat !== "all" && cats.indexOf(cat) < 0) cat = "all";
    var big = false; try { big = localStorage.getItem("vintro-view") === "2"; } catch (e) {}
    $("#main").innerHTML = '<header class="col-head pad"><span class="latin">' + s.latin + '</span><h1>' + s.ar + '</h1>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : "") + '</header>' +
      '<div class="toolbar"><div class="toolbar-in pad"><div class="filters" role="group" aria-label="النوع"></div><span class="count" id="count"></span>' +
      '<div class="view" role="group" aria-label="طريقة العرض"><button data-view="2" aria-label="عرض كبير">' + IC.g2 + '</button><button data-view="4" aria-label="عرض صغير">' + IC.g4 + '</button></div></div></div>' +
      '<section class="grid pad" id="grid" aria-live="polite"></section>';
    function draw() {
      $(".filters").innerHTML = ["all"].concat(cats).map(function (c) { return '<button class="chip" data-cat="' + esc(c) + '" aria-pressed="' + (c === cat) + '">' + (c === "all" ? "الكل" : esc(c)) + '</button>'; }).join("");
      var shown = items.filter(function (p) { return cat === "all" || p.category === cat; });
      var g = $("#grid"); g.classList.toggle("big", big);
      g.innerHTML = shown.length ? shown.map(card).join("") : '<div class="empty">ستُعرض موديلات هذا الموسم هنا قريباً.</div>';
      $("#count").textContent = toAr(shown.length) + " موديل";
      document.querySelectorAll("[data-view]").forEach(function (b) { b.setAttribute("aria-pressed", String((b.getAttribute("data-view") === "2") === big)); });
    }
    document.addEventListener("click", function (e) {
      var c = e.target.closest("[data-cat]");
      if (c) { cat = c.getAttribute("data-cat"); draw(); try { var q = new URLSearchParams(location.search); if (cat === "all") q.delete("cat"); else q.set("cat", cat); var qq = q.toString(); history.replaceState(null, "", location.pathname + (qq ? "?" + qq : "")); } catch (er) {} return; }
      var v = e.target.closest("[data-view]");
      if (v) { big = v.getAttribute("data-view") === "2"; try { localStorage.setItem("vintro-view", big ? "2" : "4"); } catch (er) {} draw(); }
    });
    draw();
  }

  function model() {
    var id = new URLSearchParams(location.search).get("id");
    var p = P.find(function (x) { return (x.code || x.name) === id; });
    if (!p) { $("#main").innerHTML = '<div class="loading pad">لم نعثر على هذا الموديل. <a class="link-u" href="' + d(ROOT) + '">العودة إلى الرئيسية</a></div>'; return; }
    var s = seasonOf(p.season) || mkSeason("summer-2026"), cols = arr(p.colors), sizes = arr(p.sizes);
    document.title = p.name + (p.code ? " · " + p.code : "") + " — VINTRO";
    var ci = Math.max(0, cols.findIndex(function (c) { return arr(c.images).length; })), size = null, ii = 0;
    var wa = digits(B.whatsapp);
    var related = P.filter(function (x) { return x !== p && x.season === p.season; });
    related.sort(function (a, b) { return (b.category === p.category) - (a.category === p.category); });

    function draw() {
      var c = cols[ci] || {}, imgs = arr(c.images).filter(Boolean);
      var pics = imgs.length ? imgs.map(function (im, i) { if (ii >= imgs.length) ii = 0; return '<div class="pic' + (i === ii ? " on" : "") + '"><img src="' + esc(url(im)) + '" alt="' + esc(p.name + " — " + (c.name || "") + " " + (i + 1)) + '"' + (i ? ' loading="lazy"' : "") + '></div>'; }).join("")
        : '<div class="pic on">' + art(p, hexOf(c)) + '</div>';
      var thumbs = imgs.length > 1 ? '<div class="thumbs">' + imgs.map(function (im, i) { return '<button data-i="' + i + '" aria-pressed="' + (i === ii) + '" aria-label="صورة ' + toAr(i + 1) + '"><img src="' + esc(url(im)) + '" alt=""></button>'; }).join("") + '</div>' : "";
      var msg = "مرحباً VINTRO، أرغب بالاستفسار عن الموديل " + (p.code || p.name) + " (" + p.name + ")" + (c.name ? "\nاللون: " + c.name : "") + (size ? "\nالمقاس: " + size : "");
      $("#main").innerHTML = '<nav class="crumbs pad" aria-label="المسار"><a href="' + d(ROOT) + '">الرئيسية</a> / <a href="' + seasonUrl(s.id) + '">' + s.ar + '</a>' +
        (p.category ? ' / <a href="' + seasonUrl(s.id, p.category) + '">' + esc(p.category) + '</a>' : "") + '</nav>' +
        '<div class="pdp pad"><div class="gal"><div class="pics" id="pics">' + pics + '</div>' + thumbs + (imgs.length > 1 && imgs.length > 1 ? '<div class="dots-nav">' + imgs.map(function (_, i) { return '<i' + (i ? "" : ' class="on"') + '></i>'; }).join("") + '</div>' : "") + '</div>' +
        '<aside class="panel-info"><div>' + (p.code ? '<div class="code">' + esc(p.code) + '</div>' : "") + '<h1>' + esc(p.name) + '</h1>' +
        (p.price ? '<div class="price">' + esc(p.price) + '</div>' : '<div class="price ask">السعر عند الطلب</div>') + '</div>' +
        (cols.length ? '<div><div class="opt-label"><span>اللون</span><b>' + esc(c.name || "") + '</b></div><div class="colors">' + cols.map(function (k, i) {
          var im = arr(k.images)[0];
          return '<button data-c="' + i + '" aria-pressed="' + (i === ci) + '" aria-label="' + esc(k.name) + '" title="' + esc(k.name) + '">' + (im ? '<img src="' + esc(url(im)) + '" alt="">' : '<span class="fill" style="background:' + esc(hexOf(k)) + '"></span>') + '</button>';
        }).join("") + '</div></div>' : "") +
        (sizes.length ? '<div><div class="opt-label"><span>المقاس</span><b>' + esc(size || "اختر مقاساً") + '</b></div><div class="sizes" dir="ltr">' + sizes.map(function (z) { return '<button data-s="' + esc(z) + '" aria-pressed="' + (z === size) + '">' + esc(z) + '</button>'; }).join("") + '</div></div>' : "") +
        '<div class="cta">' + (wa ? '<a class="btn wa block" href="https://wa.me/' + wa + '?text=' + encodeURIComponent(msg) + '" target="_blank" rel="noopener">' + IC.wa + 'استفسر واطلب عبر واتساب</a>' : "") +
        (B.email ? '<a class="btn block" href="mailto:' + esc(B.email) + '?subject=' + encodeURIComponent("استفسار عن " + (p.code || p.name)) + '&body=' + encodeURIComponent(msg) + '">راسلنا بالبريد</a>' : "") +
        '<p class="note">البيع بالجملة. الأسعار والكميات حسب الطلب.</p></div>' +
        '<div>' + (p.description ? '<details class="acc" open><summary>الوصف</summary><div class="in">' + esc(p.description) + '</div></details>' : "") +
        '<details class="acc"' + (p.description ? "" : " open") + '><summary>التفاصيل</summary><div class="in"><dl class="specs">' +
        (p.fabric ? '<dt>القماش</dt><dd>' + esc(p.fabric) + '</dd>' : "") + (p.category ? '<dt>النوع</dt><dd>' + esc(p.category) + '</dd>' : "") +
        '<dt>الموسم</dt><dd>' + s.ar + '</dd>' + (sizes.length ? '<dt>المقاسات</dt><dd class="ltr">' + esc(sizes.join(" · ")) + '</dd>' : "") +
        (p.min_order ? '<dt>أقل كمية</dt><dd>' + esc(p.min_order) + '</dd>' : "") + '</dl></div></details></div></aside></div>' +
        (related.length ? '<section class="sec pad" style="border-top:1px solid var(--line)"><div class="sec-head"><div><span class="latin">You may also like</span><h2>من نفس المجموعة</h2></div><a class="link-u" href="' + seasonUrl(s.id) + '">عرض الكل</a></div><div class="strip">' + related.slice(0, 10).map(card).join("") + '</div></section>' : "");
      var pk = $("#pics"), dots = document.querySelectorAll(".dots-nav i");
      /* hover zoom on desktop: the photo enlarges and follows the mouse */
      if (pk && window.matchMedia && matchMedia("(hover: hover) and (min-width: 901px)").matches) {
        pk.addEventListener("mousemove", function (e) {
          var pic = e.target.closest(".pic.on"); if (!pic) return; var im = pic.querySelector("img"); if (!im) return;
          var r = pic.getBoundingClientRect();
          im.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + "% " + ((e.clientY - r.top) / r.height * 100) + "%";
          pic.classList.add("zoom");
        });
        pk.addEventListener("mouseleave", function () { var z = pk.querySelector(".zoom"); if (z) z.classList.remove("zoom"); });
      }
      if (pk && dots.length) pk.addEventListener("scroll", function () { var i = Math.round(Math.abs(pk.scrollLeft) / pk.clientWidth); dots.forEach(function (dd, j) { dd.classList.toggle("on", i === j); }); }, { passive: true });
    }
    document.addEventListener("click", function (e) {
      var tb = e.target.closest("[data-i]"); if (tb) { ii = +tb.getAttribute("data-i"); var y0 = window.scrollY; draw(); window.scrollTo(0, y0); return; }
      var cb = e.target.closest("[data-c]"); if (cb) { ci = +cb.getAttribute("data-c"); ii = 0; var y = window.scrollY; draw(); window.scrollTo(0, y); return; }
      var sb = e.target.closest("[data-s]"); if (sb) { var v = sb.getAttribute("data-s"); size = size === v ? null : v; var y2 = window.scrollY; draw(); window.scrollTo(0, y2); }
    });
    draw();
  }

  /* ---------- extra pages ---------- */
  function pageHead(latin, ar, lead) {
    return '<header class="page-head pad"><span class="latin">' + latin + '</span><h1>' + ar + '</h1>' + (lead ? '<p>' + esc(lead) + '</p>' : "") + '</header>';
  }
  function waLink(text) { var wa = digits(B.whatsapp); return wa ? "https://wa.me/" + wa + (text ? "?text=" + encodeURIComponent(text) : "") : ""; }

  function collections() {
    if (new URLSearchParams(location.search).get("id")) return collection();
    document.title = "المجموعات — VINTRO";
    var k = 0;
    $("#main").innerHTML = pageHead("Collections", "المجموعات", "كل مجموعات VINTRO مرتّبة حسب السنة والموسم، لكل موديل ألوانه ومقاساته وصوره.") +
      years().map(function (y) {
        return '<div class="year-head pad"><span class="yr latin">' + y + '</span><span class="yl">مجموعات ' + toAr(y) + '</span></div>' +
          SEASONS.filter(function (s) { return s.year === y; }).map(function (s) { return collBlock(s, k++); }).join("");
      }).join("");
  }
  function collBlock(s, i) {
        var items = P.filter(function (p) { return p.season === s.id; }), cats = catsOf(items), cover = s.cover;
        return '<section class="coll ' + s.cls + (i % 2 ? " flip" : "") + '"><a class="coll-media' + (cover ? " has-img" : "") + '" href="' + seasonUrl(s.id) + '" aria-label="' + s.ar + '">' +
          (cover ? '<img src="' + esc(url(cover)) + '" alt="">' : lines() + '<span class="mark">' + logo("mark") + '</span>') + '<span class="latin big">' + s.latin + '</span></a>' +
          '<div class="coll-txt pad"><span class="latin">' + s.latin + '</span><h2>' + s.ar + '</h2><p>' + esc(s.intro || "") + '</p>' +
          '<div class="coll-meta"><span>' + toAr(items.length) + ' موديل</span><span>' + toAr(cats.length) + ' أنواع</span></div>' +
          (cats.length ? '<ul class="coll-cats">' + cats.map(function (c) { return '<li><a href="' + seasonUrl(s.id, c) + '">' + esc(c) + '</a></li>'; }).join("") + '</ul>' : "") +
          '<a class="btn solid" href="' + seasonUrl(s.id) + '">تصفّح ' + s.ar + '</a></div></section>' +
          (items.length ? '<div class="pad" style="padding-block:28px 72px"><div class="strip">' + items.slice(0, 8).map(card).join("") + '</div></div>' : "");
  }

  function about() {
    document.title = "من نحن — VINTRO";
    var values = arr(B.values).filter(function (v) { return v && v.title; });
    $("#main").innerHTML = pageHead("About VINTRO", "من نحن", B.tagline) +
      '<section class="pad about-hero"><div class="ab-mark">' + lines() + logo("full") + '</div><div class="ab-txt"><p class="big">' + esc(B.headline || "") + '</p><p>' + esc(B.about || "") + '</p>' +
      (B.story ? '<p>' + esc(B.story) + '</p>' : "") +
      (B.founder ? '<div class="founder"><span class="m">' + logo("mark") + '</span><div><b>' + esc(B.founder) + '</b><small>' + esc(B.founder_title || "") + '</small></div></div>' : "") + '</div></section>' +
      (values.length ? '<section class="sec pad"><div class="sec-head"><div><span class="latin">What we stand for</span><h2>ما يميّزنا</h2></div></div><div class="values">' +
        values.map(function (v) { return '<div class="value"><span class="vm">' + logo("mark") + '</span><h3>' + esc(v.title) + '</h3><p>' + esc(v.text || "") + '</p></div>'; }).join("") + '</div></section>' : "") +
      '<section class="band"><div class="pad band-in"><div><span class="latin">Wholesale</span><h2>تبحث عن مورّد ألبسة بالجملة؟</h2><p>تعرّف على طريقة الطلب أو تواصل معنا مباشرة.</p></div><div class="band-btns"><a class="btn light" href="' + pageUrl("wholesale") + '">طريقة الطلب</a>' +
      (waLink() ? '<a class="btn wa" href="' + waLink("مرحباً VINTRO، أرغب بالتعرّف على منتجاتكم.") + '" target="_blank" rel="noopener">' + IC.wa + 'واتساب</a>' : "") + '</div></div></section>';
  }

  function wholesale() {
    document.title = "الجملة وطريقة الطلب — VINTRO";
    var steps = [
      ["اختر الموديلات", "تصفّح المجموعات وسجّل أرقام الموديلات التي تهمّك."],
      ["أرسل طلبك", "أرسل لنا رقم كل موديل مع الألوان والمقاسات والكمية المطلوبة."],
      ["عرض السعر", "نرسل لك عرض سعر وموعد تسليم حسب الكمية والموديل."],
      ["التصنيع والتسليم", "بعد التأكيد نبدأ الإنتاج ونتابع معك حتى استلام الطلبية."]
    ];
    var faq = arr(B.faq).filter(function (f) { return f && f.q; });
    $("#main").innerHTML = pageHead("Wholesale", "الجملة وطريقة الطلب", "نتعامل مع التجّار والموزّعين بالجملة. هكذا تطلب من VINTRO في أربع خطوات.") +
      '<section class="pad steps">' + steps.map(function (s, i) { return '<div class="step"><span class="n latin">' + String(i + 1).padStart(2, "0") + '</span><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div>'; }).join("") + '</section>' +
      '<section class="sec pad"><div class="ws-grid"><div><div class="sec-head"><div><span class="latin">Order template</span><h2>نموذج رسالة الطلب</h2></div></div>' +
      '<p class="muted">انسخ هذا النموذج واملأه، أو اضغط الزر ليفتح واتساب مع النموذج جاهزاً.</p>' +
      '<pre class="tpl" id="tpl">الاسم / اسم المحل:\nالمدينة والبلد:\n\nرقم الموديل:\nالألوان:\nالمقاسات والكمية:\n\nرقم الموديل:\nالألوان:\nالمقاسات والكمية:</pre>' +
      '<div class="band-btns">' + (waLink() ? '<a class="btn wa" id="tpl-wa" href="#" target="_blank" rel="noopener">' + IC.wa + 'أرسل عبر واتساب</a>' : "") + '<button class="btn" id="tpl-copy" type="button">نسخ النموذج</button></div></div>' +
      (faq.length ? '<div><div class="sec-head"><div><span class="latin">FAQ</span><h2>أسئلة شائعة</h2></div></div>' + faq.map(function (f, i) { return '<details class="acc"' + (i ? "" : " open") + '><summary>' + esc(f.q) + '</summary><div class="in">' + esc(f.a || "") + '</div></details>'; }).join("") + '</div>' : "") + '</div></section>';
    var tpl = $("#tpl").textContent, w = $("#tpl-wa");
    if (w) w.href = waLink("مرحباً VINTRO، أرغب بتقديم طلبية:\n\n" + tpl);
    $("#tpl-copy").addEventListener("click", function (e) {
      var b = e.currentTarget;
      function done() { b.textContent = "تم النسخ"; setTimeout(function () { b.textContent = "نسخ النموذج"; }, 1800); }
      function selectTpl() { var r = document.createRange(); r.selectNodeContents($("#tpl")); var s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "حدّد النص وانسخه"; }
      try { navigator.clipboard.writeText(tpl).then(done, selectTpl); } catch (er) { selectTpl(); }
    });
  }

  function contact() {
    document.title = "تواصل معنا — VINTRO";
    var phones = [[B.phone, B.phone_label], [B.phone2, B.phone2_label]].filter(function (x) { return x[0]; });
    $("#main").innerHTML = pageHead("Contact", "تواصل معنا", "يسعدنا استقبال استفساراتك وطلباتك.") +
      '<section class="pad contact-grid"><div class="c-cards">' +
      phones.map(function (x) { return '<div class="c-card"><span class="lbl">' + esc(x[1] || "هاتف") + '</span><a class="ltr big" href="tel:' + esc(x[0].replace(/\s/g, "")) + '">' + esc(x[0]) + '</a></div>'; }).join("") +
      [B.email, B.email2].filter(Boolean).map(function (m) { return '<div class="c-card"><span class="lbl">البريد الإلكتروني</span><a class="ltr" href="mailto:' + esc(m) + '">' + esc(m) + '</a></div>'; }).join("") +
      (B.address ? '<div class="c-card"><span class="lbl">العنوان</span><span>' + esc(B.address) + '</span><a class="link-u" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(B.address_map || B.address) + '" target="_blank" rel="noopener">افتح على الخريطة</a></div>' : "") +
      (B.hours ? '<div class="c-card"><span class="lbl">أوقات العمل</span><span>' + esc(B.hours) + '</span></div>' : "") + '</div>' +
      '<form class="c-form" id="cform" novalidate><h2>أرسل استفسارك</h2>' +
      '<label class="f" for="c-name"><span>الاسم</span><input id="c-name" required autocomplete="name"></label>' +
      '<label class="f" for="c-co"><span>اسم المحل أو الشركة</span><input id="c-co" autocomplete="organization"></label>' +
      '<label class="f" for="c-city"><span>المدينة والبلد</span><input id="c-city"></label>' +
      '<label class="f" for="c-codes"><span>أرقام الموديلات (اختياري)</span><input id="c-codes" dir="ltr" placeholder="S26-101, W26-501"></label>' +
      '<label class="f" for="c-msg"><span>رسالتك</span><textarea id="c-msg" rows="4" required></textarea></label>' +
      '<p class="err" id="c-err" hidden>اكتب اسمك ورسالتك قبل الإرسال.</p>' +
      '<div class="band-btns">' + (waLink() ? '<button class="btn wa" type="submit">' + IC.wa + 'إرسال عبر واتساب</button>' : "") + (B.email ? '<button class="btn" type="button" id="c-mail">إرسال بالبريد</button>' : "") + '</div></form></section>';
    function compose() {
      var v = function (id) { return $("#" + id).value.trim(); };
      if (!v("c-name") || !v("c-msg")) { $("#c-err").hidden = false; return null; }
      $("#c-err").hidden = true;
      return "مرحباً VINTRO،\nالاسم: " + v("c-name") + (v("c-co") ? "\nالمحل/الشركة: " + v("c-co") : "") + (v("c-city") ? "\nالمدينة: " + v("c-city") : "") + (v("c-codes") ? "\nالموديلات: " + v("c-codes") : "") + "\n\n" + v("c-msg");
    }
    $("#cform").addEventListener("submit", function (e) { e.preventDefault(); var t = compose(); if (!t) return; var a = document.createElement("a"); a.href = waLink(t); a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove(); });
    var m = $("#c-mail"); if (m) m.addEventListener("click", function () { var t = compose(); if (t) location.href = "mailto:" + B.email + "?subject=" + encodeURIComponent("استفسار من الموقع") + "&body=" + encodeURIComponent(t); });
  }

  /* ---------- boot ---------- */
  function getJSON(p) { return fetch(ROOT + p, { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error(p); return r.json(); }); }
  function loadPreview() {
    return new Promise(function (ok, fail) {
      var s = document.createElement("script"); s.src = ROOT + "assets/preview-data.js";
      s.onload = function () { var w = window.__PREVIEW__; w ? ok([w.brand, w.products, w.collections || []]) : fail(); };
      s.onerror = fail; document.head.appendChild(s);
    });
  }
  ((LOCAL || FRAMED) ? loadPreview() : Promise.all([getJSON("data/brand.json"), getJSON("data/products.json"), getJSON("data/collections.json").catch(function () { return []; })])).then(function (res) {
    B = res[0] || {}; P = arr(res[1]).filter(function (p) { return p && p.name; });
    buildSeasons(res[2]);
    var qid = new URLSearchParams(location.search).get("id");
    header(PAGE === "season" ? (document.body.getAttribute("data-season") || qid) : (PAGE === "collections" && qid) ? qid : PAGE);
    var R = { home: home, season: collection, model: model, collections: collections, about: about, wholesale: wholesale, contact: contact };
    (R[PAGE] || home)();
    footer();
  }).catch(function () {
    $("#main").innerHTML = '<div class="loading pad">تعذّر تحميل الموديلات. حدّث الصفحة بعد قليل.</div>';
  });
})();
