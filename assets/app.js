/* VINTRO catalog — shared code for every page, in Arabic and English.
   Data: data/brand.json, data/products.json, data/collections.json (edited from Pages CMS).
   English text comes from the "_en" fields; when one is empty the Arabic text is shown. */
(function () {
  "use strict";
  var ROOT = document.documentElement.getAttribute("data-root") || "./";
  var PAGE = document.body.getAttribute("data-page");
  var LOCAL = location.protocol === "file:";
  var FRAMED = false; try { FRAMED = window.top !== window.self; } catch (e) { FRAMED = true; }
  /* online, folders open their index.html by themselves; from disk or inside a preview they need it spelled out */
  function d(p) { return (LOCAL || FRAMED) ? p + "index.html" : p; }
  function pageUrl(name) { return d(ROOT + name + "/"); }

  /* ---------- language ---------- */
  var QS = new URLSearchParams(location.search);
  var LANG = QS.get("lang");
  if (LANG !== "en" && LANG !== "ar") { LANG = null; try { LANG = localStorage.getItem("vintro-lang"); } catch (e) {} }
  if (LANG !== "en") LANG = "ar";
  try { localStorage.setItem("vintro-lang", LANG); } catch (e) {}
  var EN = LANG === "en";
  document.documentElement.lang = LANG;
  document.documentElement.dir = EN ? "ltr" : "rtl";

  var S = {
    menu: ["القائمة", "Menu"], search: ["بحث", "Search"], contactShort: ["تواصل", "Contact"], close: ["إغلاق", "Close"],
    home: ["الرئيسية", "Home"], collections: ["المجموعات", "Collections"], about: ["من نحن", "About"], wholesale: ["الجملة", "Wholesale"],
    wholesaleFull: ["الجملة وطريقة الطلب", "Wholesale & ordering"], contact: ["تواصل معنا", "Contact us"], allCollections: ["كل المجموعات", "All collections"],
    collectionsOf: ["مجموعات ", "Collections "], company: ["الشركة", "Company"], address: ["العنوان", "Address"], rights: ["جميع الحقوق محفوظة.", "All rights reserved."],
    searchPh: ["ابحث باسم الموديل أو رقمه أو اللون", "Search by name, model number or colour"], searchHint: ["مثال: جاكيت، كحلي، W26-501", "e.g. jacket, navy, W26-501"],
    results: [" نتيجة", " results"], noResults: ["لا توجد نتائج. جرّب كلمة أخرى.", "No results. Try another word."],
    colorsN: [" ألوان", " colours"], models: [" موديل", " models"], types: [" أنواع", " categories"],
    waUs: ["راسلنا على واتساب", "Message us on WhatsApp"], wa: ["واتساب", "WhatsApp"],
    discover: ["اكتشف المجموعات", "Discover the collections"], scrollDown: ["انزل إلى المجموعات", "Scroll to the collections"], explore: ["اكتشف المجموعة · ", "Explore · "],
    newIn: ["أحدث الموديلات", "Latest arrivals"], allModels: ["كل الموديلات", "All models"], archive: ["مجموعات سابقة", "Past collections"],
    aboutUs: ["من نحن", "About us"], readMore: ["اقرأ المزيد عن VINTRO", "More about VINTRO"],
    all: ["الكل", "All"], view: ["طريقة العرض", "View"], bigView: ["عرض كبير", "Large view"], smallView: ["عرض صغير", "Small view"], typeFilter: ["النوع", "Category"],
    soon: ["ستُعرض موديلات هذا الموسم هنا قريباً.", "Models for this season will appear here soon."],
    notFoundColl: ["لم نعثر على هذه المجموعة.", "We couldn't find this collection."], notFoundModel: ["لم نعثر على هذا الموديل.", "We couldn't find this model."], backHome: ["العودة إلى الرئيسية", "Back to home"],
    priceAsk: ["السعر عند الطلب", "Price on request"], color: ["اللون", "Colour"], size: ["المقاس", "Size"], pickSize: ["اختر مقاساً", "Choose a size"],
    orderWa: ["استفسر واطلب عبر واتساب", "Enquire & order on WhatsApp"], mailUs: ["راسلنا بالبريد", "Email us"],
    wsNote: ["البيع بالجملة. الأسعار والكميات حسب الطلب.", "Wholesale only. Prices and quantities on request."],
    desc: ["الوصف", "Description"], details: ["التفاصيل", "Details"], fabric: ["القماش", "Fabric"], category: ["النوع", "Category"], season: ["الموسم", "Season"],
    sizes: ["المقاسات", "Sizes"], minOrder: ["أقل كمية", "Minimum order"], sameColl: ["من نفس المجموعة", "From the same collection"], viewAll: ["عرض الكل", "View all"],
    image: ["صورة ", "Image "], path: ["المسار", "Breadcrumb"], loadErr: ["تعذّر تحميل الموديلات. حدّث الصفحة بعد قليل.", "Couldn't load the models. Please refresh in a moment."],
    collLead: ["كل مجموعات VINTRO مرتّبة حسب السنة والموسم، لكل موديل ألوانه ومقاساته وصوره.", "Every VINTRO collection by year and season, each model with its colours, sizes and photos."],
    browse: ["تصفّح ", "Browse "], valuesH: ["ما يميّزنا", "What we stand for"],
    bandH: ["تبحث عن مورّد ألبسة بالجملة؟", "Looking for a wholesale clothing supplier?"], bandP: ["تعرّف على طريقة الطلب أو تواصل معنا مباشرة.", "See how ordering works, or contact us directly."], howOrder: ["طريقة الطلب", "How to order"],
    wsLead: ["نتعامل مع التجّار والموزّعين بالجملة. هكذا تطلب من VINTRO في أربع خطوات.", "We supply retailers and distributors at wholesale. Here is how to order from VINTRO in four steps."],
    tplH: ["نموذج رسالة الطلب", "Order message template"], tplP: ["انسخ هذا النموذج واملأه، أو اضغط الزر ليفتح واتساب مع النموذج جاهزاً.", "Copy this template and fill it in, or tap the button to open WhatsApp with it ready."],
    sendWa: ["أرسل عبر واتساب", "Send on WhatsApp"], copyTpl: ["نسخ النموذج", "Copy template"], copied: ["تم النسخ", "Copied"], selectCopy: ["حدّد النص وانسخه", "Select the text and copy it"],
    faqH: ["أسئلة شائعة", "Questions"], contactLead: ["يسعدنا استقبال استفساراتك وطلباتك.", "We'd be glad to hear from you."],
    phone: ["هاتف", "Phone"], email: ["البريد الإلكتروني", "Email"], map: ["افتح على الخريطة", "Open in Maps"], hours: ["أوقات العمل", "Opening hours"],
    formH: ["أرسل استفسارك", "Send an enquiry"], fName: ["الاسم", "Name"], fCo: ["اسم المحل أو الشركة", "Shop or company"], fCity: ["المدينة والبلد", "City and country"],
    fCodes: ["أرقام الموديلات (اختياري)", "Model numbers (optional)"], fMsg: ["رسالتك", "Your message"], fErr: ["اكتب اسمك ورسالتك قبل الإرسال.", "Please add your name and your message."],
    sendMail: ["إرسال بالبريد", "Send by email"], langName: ["English", "العربية"], langCode: ["EN", "ع"], logoHome: ["VINTRO — الرئيسية", "VINTRO — Home"]
  };
  function t(k) { var v = S[k]; return v ? v[EN ? 1 : 0] : k; }
  var ONE = { models: " model", results: " result", types: " category" };
  function cnt(n, k) { return (EN ? String(n) : String(n).replace(/\d/g, function (x) { return "٠١٢٣٤٥٦٧٨٩"[x]; })) + (EN && +n === 1 && ONE[k] ? ONE[k] : t(k)); }

  /* English versions of the texts written for the site; the CMS "_en" fields override them */
  var EN_DEFAULT = {
    headline: "Modern ready-to-wear, made to export standards",
    tagline: "Ready-to-wear manufacturer — wholesale and export",
    about: "VINTRO is a ready-to-wear clothing manufacturer based in Al Obour City, Egypt.\nWe design and produce seasonal collections with close attention to fabric, cut and finishing, and we supply retailers and distributors at wholesale.",
    founder: "Anas Al Khateb", founder_title: "CEO & Founder", address: "Al Obour City, Egypt",
    values: [
      { title: "Fabric quality", text: "We choose fabrics carefully and test them before cutting, so colour and size hold after washing." },
      { title: "Precise manufacturing", text: "Hands-on supervision of every stage: cutting, sewing, finishing, pressing and packing." },
      { title: "On-time delivery", text: "A clear production schedule for every order, with follow-up until delivery." },
      { title: "A flexible range", text: "Several colours and sizes for every model, to suit your market." }],
    faq: [
      { q: "Do you sell retail?", a: "We work at wholesale with retailers and distributors." },
      { q: "What is the minimum order?", a: "It depends on the model. You'll find it on the model page, or contact us and we'll tell you." },
      { q: "How do I get prices?", a: "Send us the model numbers and quantities, and we'll reply with a quote for your order." },
      { q: "Can I order colours or sizes that aren't shown?", a: "Send us the details and we'll look at what we can produce." }]
  };
  var PLACES = { "مصر": "Egypt", "سوريا": "Syria", "سورية": "Syria", "تركيا": "Turkey", "العراق": "Iraq", "الأردن": "Jordan", "لبنان": "Lebanon", "السعودية": "Saudi Arabia", "الإمارات": "UAE" };
  function bt(f) { if (!EN) return B[f] || ""; return B[f + "_en"] || EN_DEFAULT[f] || B[f] || ""; }
  function px(o, f) { return (EN && o && o[f + "_en"]) || (o && o[f]) || ""; }

  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function toAr(n) { return String(n).replace(/\d/g, function (x) { return "٠١٢٣٤٥٦٧٨٩"[x]; }); }
  function num(n) { return EN ? String(n) : toAr(n); }
  function arr(x) { return Array.isArray(x) ? x : (x ? [x] : []); }
  function url(p) { if (!p) return ""; if (/^(https?:)?\/\//.test(p) || /^data:/.test(p)) return p; return ROOT + String(p).replace(/^\/+/, ""); }
  function modelUrl(p) { return d(ROOT + "model/") + "?id=" + encodeURIComponent(p.code || p.name); }
  function digits(s) { return String(s || "").replace(/[^\d]/g, ""); }
  function imagesOf(p) { var o = []; arr(p.colors).forEach(function (c) { arr(c.images).forEach(function (i) { if (i) o.push(i); }); }); return o; }
  function tel(ph) { return 'href="tel:' + esc(String(ph).replace(/\s/g, "")) + '"'; }

  var B = {}, P = [];

  /* ---------- collections: "summer-2025", "winter-2026"… newest year first, summer before winter ---------- */
  var TYPES = {
    summer: { ar: "صيف", en: "Summer", intro: "أقمشة خفيفة وقصّات مريحة لأيام الحر", introEn: "Light fabrics and easy cuts for warm days" },
    winter: { ar: "شتاء", en: "Winter", intro: "طبقات دافئة وأقمشة ثقيلة لموسم البرد", introEn: "Warm layers and heavier fabrics for the cold season" }
  };
  var ALL = [], SEASONS = [], LATEST = [];
  function mkSeason(id, cfg) {
    var m = /^(summer|winter)-(\d{4})$/.exec(String(id || "").trim()); if (!m) return null;
    var ty = TYPES[m[1]], y = m[2]; cfg = cfg || {};
    var introAr = cfg.intro || B[m[1] + "_intro"] || ty.intro;
    var introEn = cfg.intro_en || B[m[1] + "_intro_en"] || ty.introEn;
    return { id: m[0], type: m[1], year: +y, cls: m[1], latin: ty.en + " " + y, label: EN ? ty.en + " " + y : ty.ar + " " + toAr(y),
      intro: EN ? introEn : introAr, cover: cfg.cover || (y === "2026" ? B[m[1] + "_cover"] : "") || "", hidden: !!cfg.hidden };
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

  /* ---------- names of categories and colours in English ---------- */
  var CAT_EN = { "تيشرت": "T-shirts", "تي شيرت": "T-shirts", "قميص": "Shirts", "فستان": "Dresses", "بنطال": "Trousers", "جينز": "Jeans", "جاكيت": "Jackets", "جاكيتة": "Jackets",
    "معطف": "Coats", "كنزة": "Sweaters", "هودي": "Hoodies", "شورت": "Shorts", "بلوزة": "Blouses", "تنورة": "Skirts", "عباية": "Abayas", "بيجامة": "Pyjamas", "سويت شيرت": "Sweatshirts", "طقم": "Sets", "بدلة": "Suits" };
  function catL(c) {
    if (!EN) return c;
    var p = P.find(function (x) { return x.category === c && x.category_en; });
    return (p && p.category_en) || CAT_EN[c] || c;
  }
  var COLORS = { "أسود": ["#1A1A1A", "Black"], "أبيض": ["#F4F4F2", "White"], "ابيض": ["#F4F4F2", "White"], "كحلي": ["#1E2A44", "Navy"], "رمادي": ["#8A8D91", "Grey"],
    "زيتي": ["#5B6033", "Olive"], "بيج": ["#D9C7A7", "Beige"], "خمري": ["#6E1F2E", "Burgundy"], "أحمر": ["#B3261E", "Red"], "احمر": ["#B3261E", "Red"],
    "أزرق": ["#2F5DA8", "Blue"], "ازرق": ["#2F5DA8", "Blue"], "سماوي": ["#9CC3D5", "Sky blue"], "أخضر": ["#2F6B45", "Green"], "اخضر": ["#2F6B45", "Green"],
    "بني": ["#6B4A2F", "Brown"], "كريمي": ["#E9E2D0", "Cream"], "زهري": ["#E7A3B6", "Pink"], "وردي": ["#E7A3B6", "Pink"], "أصفر": ["#E2B93B", "Yellow"], "اصفر": ["#E2B93B", "Yellow"],
    "برتقالي": ["#D9772B", "Orange"], "بنفسجي": ["#6A4C93", "Purple"], "رملي": ["#CDB78F", "Sand"], "عسلي": ["#B07A32", "Honey"], "فضي": ["#BFC3C7", "Silver"],
    "ذهبي": ["#C9A246", "Gold"], "كاكي": ["#8C8461", "Khaki"], "موف": ["#9C7FA6", "Mauve"], "نيلي": ["#2C3E73", "Indigo"] };
  function hexOf(c) {
    var h = String(c && c.hex || "").trim();
    if (/^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(h)) return h[0] === "#" ? h : "#" + h;
    var n = String(c && c.name || "").trim();
    for (var k in COLORS) if (n.indexOf(k) === 0) return COLORS[k][0];
    return "#9A9C98";
  }
  function colL(c) {
    if (!c) return "";
    if (!EN) return c.name || "";
    if (c.name_en) return c.name_en;
    var n = String(c.name || "").trim(), shade = "";
    if (/ فاتح$/.test(n)) { shade = "Light "; n = n.replace(/ فاتح$/, ""); }
    else if (/ (غامق|داكن)$/.test(n)) { shade = "Dark "; n = n.replace(/ (غامق|داكن)$/, ""); }
    return COLORS[n] ? shade + (shade ? COLORS[n][1].toLowerCase() : COLORS[n][1]) : (c.name || "");
  }
  function mix(hex, k) { // blend a colour toward ivory
    var h = hex.replace("#", ""); if (h.length === 3) h = h.replace(/./g, "$&$&");
    var a = [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }), b = [250, 248, 244];
    return "rgb(" + a.map(function (v, i) { return Math.round(v * (1 - k) + b[i] * k); }).join(",") + ")";
  }

  /* ---------- drawings ---------- */
  var LOGO = window.VINTRO_LOGO || "";
  function logo(kind, cls) {
    var vb = { full: "84 84 129.5 88.5", mark: "124 84.5 49.5 51.5", word: "84.5 148 128.5 24" }[kind];
    return '<svg class="logo-svg ' + (cls || "") + '" viewBox="' + vb + '" role="img" aria-label="VINTRO">' + LOGO + "</svg>";
  }
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

  /* ---------- gentle reveal while scrolling ---------- */
  var IO = null;
  if ("IntersectionObserver" in window && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    IO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); IO.unobserve(e.target); } }); }, { rootMargin: "0px 0px -6% 0px" });
    document.documentElement.classList.add("js-rv");
  }
  function reveal() {
    if (!IO) return;
    document.querySelectorAll(".sec-head, #main .card, .cats a, .arch-card, .value, .step, .coll-txt, .c-card, .year-head, .ab-txt, .ab-mark, .tpl").forEach(function (el, i) {
      if (el.classList.contains("rv")) return;
      el.classList.add("rv"); el.style.setProperty("--rd", (i % 4) * 70 + "ms"); IO.observe(el);
    });
  }

  /* ---------- shared pieces ---------- */
  function secHead(latin, title, link) {
    var showLatin = latin && !(EN && latin.toLowerCase() === String(title).toLowerCase());
    return '<div class="sec-head"><div>' + (showLatin ? '<span class="latin">' + latin + '</span>' : "") + '<h2>' + title + '</h2></div>' + (link || "") + '</div>';
  }
  function card(p) {
    var imgs = imagesOf(p), cols = arr(p.colors), first = cols[0] || {}, name = px(p, "name"), sz = arr(p.sizes);
    var media = imgs.length
      ? '<img src="' + esc(url(imgs[0])) + '" alt="' + esc(name) + '" loading="lazy">' + (imgs[1] ? '<img class="alt" src="' + esc(url(imgs[1])) + '" alt="" loading="lazy">' : "")
      : art(p, hexOf(first));
    return '<a class="card" href="' + esc(modelUrl(p)) + '"><div class="ph">' + media + (p.featured ? '<span class="new latin">New</span>' : "") +
      (sz.length ? '<div class="qs" dir="ltr">' + sz.map(function (z) { return '<span>' + esc(z) + '</span>'; }).join("") + '</div>' : "") + '</div>' +
      '<div class="body"><span class="nm">' + esc(name) + '</span><div class="sub"><span class="code">' + esc(p.code || "") + '</span><span>' +
      (cols.length > 1 ? num(cols.length) + t("colorsN") : esc(colL(first))) + '</span></div>' +
      '<div class="sws">' + cols.slice(0, 6).map(function (c) { return '<i style="background:' + esc(hexOf(c)) + '"></i>'; }).join("") + '</div></div></a>';
  }
  function catsOf(list) { var c = []; list.forEach(function (p) { if (p.category && c.indexOf(p.category) < 0) c.push(p.category); }); return c; }
  function waLink(text) { var wa = digits(B.whatsapp); return wa ? "https://wa.me/" + wa + (text ? "?text=" + encodeURIComponent(text) : "") : ""; }
  function phoneLabel(raw) { return EN ? (PLACES[raw] || raw) : raw; }

  function header(current) {
    var top = LATEST.length ? LATEST[0].year : "";
    var ann = EN ? (B.announcement_en || (B.announcement === "-" ? "-" : "")) : (B.announcement || "");
    if (!ann) ann = EN ? "Wholesale only  ·  Collections " + top : "البيع بالجملة فقط  ·  مجموعات " + num(top);
    if (ann !== "-") {
      var bar = document.createElement("div");
      bar.className = "ann"; bar.innerHTML = '<div class="pad">' + esc(ann) + '</div>';
      $("#head").parentNode.insertBefore(bar, $("#head"));
    }
    var NAV = [{ id: "collections", label: t("collections"), href: pageUrl("collections") }].concat(LATEST.map(function (s) { return { id: s.id, label: s.label, href: seasonUrl(s.id) }; }))
      .concat([{ id: "about", label: t("about"), href: pageUrl("about") }, { id: "wholesale", label: t("wholesale"), href: pageUrl("wholesale") }]);
    var h = $("#head");
    h.className = "head";
    h.innerHTML = '<div class="head-in pad"><div class="start"><button class="ico-btn" id="open-menu" aria-label="' + t("menu") + '">' + IC.menu + '<span class="t">' + t("menu") + '</span></button>' +
      '<nav class="links" aria-label="' + t("menu") + '">' + NAV.map(function (n) { return '<a href="' + n.href + '"' + (current === n.id ? ' aria-current="page"' : "") + '>' + n.label + '</a>'; }).join("") + '</nav></div>' +
      '<a class="brand" href="' + d(ROOT) + '" aria-label="' + t("logoHome") + '"><span class="bm">' + logo("mark") + '</span><span class="bw">' + logo("word") + '</span></a>' +
      '<div class="end"><button class="lang" id="lang" type="button" lang="' + (EN ? "ar" : "en") + '" aria-label="' + t("langName") + '" title="' + t("langName") + '">' + t("langCode") + '</button>' +
      '<button class="ico-btn" id="open-search" aria-label="' + t("search") + '">' + IC.search + '<span class="t">' + t("search") + '</span></button>' +
      '<a class="ico-btn" href="' + pageUrl("contact") + '" aria-label="' + t("contact") + '"' + (current === "contact" ? ' aria-current="page"' : "") + '>' + IC.phone + '<span class="t">' + t("contactShort") + '</span></a></div></div>';
    window.addEventListener("scroll", function () { h.classList.toggle("scrolled", window.scrollY > 4); }, { passive: true });

    var menu = document.createElement("div");
    menu.className = "drawer-wrap"; menu.id = "menu"; menu.hidden = true;
    var waM = digits(B.whatsapp);
    function li(id, href, label) { return '<li><a href="' + href + '"' + (current === id ? ' aria-current="page"' : "") + '>' + label + '</a></li>'; }
    menu.innerHTML = '<div class="drawer-bg" data-close></div><nav class="drawer" role="dialog" aria-modal="true" aria-label="' + t("menu") + '">' +
      '<div class="drawer-top"><a href="' + d(ROOT) + '" class="drawer-logo">' + logo("word") + '</a><button class="ico-btn" data-close aria-label="' + t("close") + '">' + IC.close + '</button></div>' +
      '<ul class="drawer-list">' + li("home", d(ROOT), t("home")) + li("collections", pageUrl("collections"), t("collections")) +
      years().map(function (y, yi) {
        var ss = SEASONS.filter(function (s) { return s.year === y; });
        var open = ss.some(function (s) { return s.id === current; }) || (yi === 0 && !SEASONS.some(function (s) { return s.id === current; }));
        return '<li><details' + (open ? " open" : "") + '><summary>' + t("collectionsOf") + num(y) + '<small>' + num(ss.reduce(function (n, s) { return n + countOf(s.id); }, 0)) + '</small></summary><ul class="sub">' +
          ss.map(function (s) { return '<li><a href="' + seasonUrl(s.id) + '"' + (current === s.id ? ' aria-current="page"' : "") + '>' + s.label + ' <small>(' + num(countOf(s.id)) + ')</small></a></li>'; }).join("") + '</ul></details></li>';
      }).join("") +
      li("about", pageUrl("about"), t("aboutUs")) + li("wholesale", pageUrl("wholesale"), t("wholesaleFull")) + li("contact", pageUrl("contact"), t("contact")) + '</ul>' +
      '<div class="drawer-foot"><button class="lang-row" type="button" data-lang>' + t("langName") + '</button>' +
      [B.phone, B.phone2].filter(Boolean).map(function (ph) { return '<a class="ltr" ' + tel(ph) + '>' + esc(ph) + '</a>'; }).join("") +
      (waM ? '<a class="btn wa block" href="https://wa.me/' + waM + '" target="_blank" rel="noopener">' + IC.wa + t("wa") + '</a>' : "") + '</div></nav>';
    document.body.appendChild(menu);

    var search = document.createElement("div");
    search.className = "overlay"; search.id = "search"; search.hidden = true; search.setAttribute("role", "dialog"); search.setAttribute("aria-label", t("search"));
    search.innerHTML = '<div class="overlay-top pad"><span class="latin" style="font-size:.8rem">Search</span><button class="ico-btn" data-close aria-label="' + t("close") + '">' + IC.close + '</button></div>' +
      '<div class="pad"><label class="search-box">' + IC.search.replace("<svg", '<svg style="width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.4"') +
      '<input id="q" type="search" placeholder="' + t("searchPh") + '" autocomplete="off" aria-label="' + t("search") + '"></label><p class="search-hint" id="q-hint">' + t("searchHint") + '</p><div class="grid" id="q-res"></div></div>';
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
        return [p.name, p.name_en, p.code, p.category, catL(p.category), p.fabric, p.fabric_en].concat(arr(p.colors).map(function (c) { return c.name + " " + colL(c) + " " + (c.name_en || ""); })).join(" ").toLowerCase().indexOf(q) >= 0;
      }) : [];
      $("#q-res").innerHTML = res.slice(0, 24).map(card).join("");
      $("#q-hint").textContent = q ? (res.length ? cnt(res.length, "results") : t("noResults")) : t("searchHint");
    });
  }

  /* switching language reloads the same page in the other language */
  function switchLang() {
    var other = EN ? "ar" : "en";
    try { localStorage.setItem("vintro-lang", other); } catch (e) {}
    var q = new URLSearchParams(location.search); q.set("lang", other);
    location.search = q.toString();
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("#lang, [data-lang]")) { e.preventDefault(); switchLang(); return; }
    /* keep English while moving between pages, even when the browser blocks storage */
    var a = e.target.closest("a[href]"); if (!a || !EN) return;
    var h = a.getAttribute("href");
    if (!h || /^(https?:|mailto:|tel:|#|javascript:)/i.test(h) || /[?&]lang=/.test(h)) return;
    var hash = ""; var hi = h.indexOf("#"); if (hi >= 0) { hash = h.slice(hi); h = h.slice(0, hi); }
    a.setAttribute("href", h + (h.indexOf("?") >= 0 ? "&" : "?") + "lang=en" + hash);
  }, true);

  function footer() {
    var wa = digits(B.whatsapp);
    $("#foot").innerHTML = '<div class="foot-in pad"><div class="fbrand">' + logo("full") + '<p>' + esc(bt("tagline")) + '</p></div>' +
      '<div><h4>' + t("collections") + '</h4><ul>' + LATEST.map(function (s) { return '<li><a href="' + seasonUrl(s.id) + '">' + s.label + '</a></li>'; }).join("") + '<li><a href="' + pageUrl("collections") + '">' + t("allCollections") + '</a></li></ul>' +
      '<h4 style="margin-top:22px">' + t("company") + '</h4><ul><li><a href="' + pageUrl("about") + '">' + t("aboutUs") + '</a></li><li><a href="' + pageUrl("wholesale") + '">' + t("wholesaleFull") + '</a></li><li><a href="' + pageUrl("contact") + '">' + t("contact") + '</a></li></ul></div>' +
      '<div><h4>' + t("contact") + '</h4><ul>' +
      [B.phone, B.phone2].filter(Boolean).map(function (ph) { return '<li><a class="ltr" ' + tel(ph) + '>' + esc(ph) + '</a></li>'; }).join("") +
      [B.email, B.email2].filter(Boolean).map(function (m) { return '<li><a class="ltr" href="mailto:' + esc(m) + '">' + esc(m) + '</a></li>'; }).join("") + '</ul></div>' +
      '<div><h4>' + t("address") + '</h4><ul>' + (bt("address") ? '<li>' + esc(bt("address")) + '</li>' : "") +
      (B.instagram ? '<li><a class="ltr" href="https://instagram.com/' + esc(String(B.instagram).replace(/^@/, "")) + '" target="_blank" rel="noopener">Instagram</a></li>' : "") +
      (B.facebook ? '<li><a class="ltr" href="' + esc(B.facebook) + '" target="_blank" rel="noopener">Facebook</a></li>' : "") +
      '<li><button class="lang-row" type="button" data-lang>' + t("langName") + '</button></li></ul></div></div>' +
      '<div class="pad"><div class="foot-bot"><span>© ' + num(new Date().getFullYear()) + ' VINTRO. ' + t("rights") + '</span><span class="latin" style="font-size:.7rem">Ready-to-wear manufacturer</span></div></div>';
    if (wa && PAGE !== "model") {
      var a = document.createElement("a");
      a.className = "wa-float"; a.href = "https://wa.me/" + wa; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", t("waUs")); a.innerHTML = IC.wa;
      document.body.appendChild(a);
    }
  }

  /* ---------- pages ---------- */
  function splash() {
    var seen = false; try { seen = sessionStorage.getItem("vintro-intro") === "1"; sessionStorage.setItem("vintro-intro", "1"); } catch (e) {}
    if (seen || QS.get("lang") || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
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
    document.title = "VINTRO";
    var inLatest = function (p) { return LATEST.some(function (s) { return s.id === p.season; }); };
    var featured = P.filter(function (p) { return p.featured; });
    if (featured.length < 4) featured = featured.concat(P.filter(function (p) { return featured.indexOf(p) < 0 && inLatest(p); })).slice(0, 10);
    var older = SEASONS.filter(function (s) { return s.year !== top; });
    var wa = digits(B.whatsapp);
    $("#main").innerHTML =
      '<section class="opening" aria-label="VINTRO">' + lines() + '<div class="op-in pad">' +
        '<span class="op-logo">' + logo("full") + '</span>' +
        '<span class="op-eyebrow latin">Collections ' + top + '</span>' +
        '<h1>' + esc(bt("headline")) + '</h1>' + (bt("tagline") ? '<p>' + esc(bt("tagline")) + '</p>' : "") +
        '<div class="op-btns"><a class="btn gold" href="' + pageUrl("collections") + '">' + t("discover") + '</a><a class="btn light" href="' + pageUrl("contact") + '">' + t("contact") + '</a></div>' +
        '</div><a class="op-down" href="#seasons" aria-label="' + t("scrollDown") + '"><span></span></a></section>' +
      '<section class="hero' + (LATEST.length === 1 ? " one" : "") + '" id="seasons" aria-label="' + t("collections") + '">' + LATEST.slice(0, 2).map(function (s) {
        var cover = s.cover, n = countOf(s.id);
        return '<a class="panel ' + s.cls + (cover ? " has-img" : "") + '" href="' + seasonUrl(s.id) + '"><div class="media">' + (cover ? '<img src="' + esc(url(cover)) + '" alt="">' : lines()) + '</div>' +
          (cover ? "" : '<span class="mark">' + logo("mark") + '</span>') +
          '<div class="cap fade"><span class="latin">' + s.latin + '</span><span class="ar">' + esc(s.intro) + '</span><span class="go">' + t("explore") + cnt(n, "models") + '</span></div></a>';
      }).join("") + '</section>' +
      (featured.length ? '<section class="sec pad" style="padding-top:56px">' + secHead("New In", t("newIn"), '<a class="link-u" href="' + pageUrl("collections") + '">' + t("allCollections") + '</a>') + '<div class="strip">' + featured.map(card).join("") + '</div></section>' : "") +
      LATEST.map(function (s) {
        var cats = catsOf(P.filter(function (p) { return p.season === s.id; }));
        return cats.length ? '<section class="sec pad" style="padding-top:24px">' + secHead(s.latin, s.label, '<a class="link-u" href="' + seasonUrl(s.id) + '">' + t("allModels") + '</a>') + '<div class="cats">' +
          cats.map(function (c) { var n = P.filter(function (p) { return p.season === s.id && p.category === c; }).length; return '<a href="' + seasonUrl(s.id, c) + '"><strong>' + esc(catL(c)) + '</strong><span>' + cnt(n, "models") + '</span></a>'; }).join("") + '</div></section>' : "";
      }).join("") +
      (older.length ? '<section class="sec pad" style="padding-top:24px">' + secHead("Archive", t("archive"), '<a class="link-u" href="' + pageUrl("collections") + '">' + t("allCollections") + '</a>') + '<div class="arch">' +
        older.map(function (s) {
          return '<a class="arch-card ' + s.cls + '" href="' + seasonUrl(s.id) + '"><div class="am">' + (s.cover ? '<img src="' + esc(url(s.cover)) + '" alt="" loading="lazy">' : lines() + '<span class="mark">' + logo("mark") + '</span>') + '</div>' +
            '<div class="at">' + (EN ? "" : '<span class="latin">' + s.latin + '</span>') + '<strong>' + s.label + '</strong><small>' + cnt(countOf(s.id), "models") + '</small></div></a>';
        }).join("") + '</div></section>' : "") +
      '<section class="sec pad" id="about" style="padding-block:88px"><div class="about"><div class="txt"><span class="eyebrow latin">About VINTRO</span><h2 style="font-size:clamp(1.6rem,3vw,2.3rem)">' + t("aboutUs") + '</h2><p>' + esc(bt("about")) + '</p><a class="link-u" style="justify-self:start" href="' + pageUrl("about") + '">' + t("readMore") + '</a>' +
      (bt("founder") ? '<div class="founder"><span class="m">' + logo("mark") + '</span><div><b>' + esc(bt("founder")) + '</b><small>' + esc(bt("founder_title")) + '</small></div></div>' : "") + '</div>' +
      '<div class="contact-card" id="contact"><h3>' + t("contact") + '</h3><dl>' +
      [[B.phone, B.phone_label], [B.phone2, B.phone2_label]].filter(function (x) { return x[0]; }).map(function (x) { return '<div><dt class="latin">' + esc(EN ? (phoneLabel(x[1]) || "Phone") : (x[1] || "Phone")) + '</dt><dd><a class="ltr" ' + tel(x[0]) + '>' + esc(x[0]) + '</a></dd></div>'; }).join("") +
      [B.email, B.email2].filter(Boolean).map(function (m) { return '<div><dt class="latin">Email</dt><dd><a class="ltr" href="mailto:' + esc(m) + '">' + esc(m) + '</a></dd></div>'; }).join("") +
      (bt("address") ? '<div><dt class="latin">Address</dt><dd>' + esc(bt("address")) + '</dd></div>' : "") + '</dl>' +
      (wa ? '<a class="btn wa block" href="https://wa.me/' + wa + '" target="_blank" rel="noopener">' + IC.wa + t("waUs") + '</a>' : "") + '</div></div></section>';
    if (location.hash) { var el = document.getElementById(location.hash.slice(1)); if (el) setTimeout(function () { el.scrollIntoView(); }, 50); }
  }

  function collection() {
    var id = document.body.getAttribute("data-season") || QS.get("id"), s = seasonOf(id);
    if (!s) { $("#main").innerHTML = '<div class="loading pad">' + t("notFoundColl") + ' <a class="link-u" href="' + pageUrl("collections") + '">' + t("allCollections") + '</a></div>'; return; }
    document.title = s.label + " — VINTRO";
    var items = P.filter(function (p) { return p.season === s.id; }), cats = catsOf(items);
    var cat = QS.get("cat") || "all"; if (cat !== "all" && cats.indexOf(cat) < 0) cat = "all";
    var big = false; try { big = localStorage.getItem("vintro-view") === "2"; } catch (e) {}
    $("#main").innerHTML = '<header class="col-head pad">' + (EN ? '<span class="latin">' + t("collections") + '</span>' : '<span class="latin">' + s.latin + '</span>') + '<h1>' + s.label + '</h1>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : "") + '</header>' +
      '<div class="toolbar"><div class="toolbar-in pad"><div class="filters" role="group" aria-label="' + t("typeFilter") + '"></div><span class="count" id="count"></span>' +
      '<div class="view" role="group" aria-label="' + t("view") + '"><button data-view="2" aria-label="' + t("bigView") + '">' + IC.g2 + '</button><button data-view="4" aria-label="' + t("smallView") + '">' + IC.g4 + '</button></div></div></div>' +
      '<section class="grid pad" id="grid" aria-live="polite"></section>';
    function draw() {
      $(".filters").innerHTML = ["all"].concat(cats).map(function (c) { return '<button class="chip" data-cat="' + esc(c) + '" aria-pressed="' + (c === cat) + '">' + (c === "all" ? t("all") : esc(catL(c))) + '</button>'; }).join("");
      var shown = items.filter(function (p) { return cat === "all" || p.category === cat; });
      var g = $("#grid"); g.classList.toggle("big", big);
      g.innerHTML = shown.length ? shown.map(card).join("") : '<div class="empty">' + t("soon") + '</div>';
      $("#count").textContent = cnt(shown.length, "models");
      document.querySelectorAll("[data-view]").forEach(function (b) { b.setAttribute("aria-pressed", String((b.getAttribute("data-view") === "2") === big)); });
      reveal();
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
    var id = QS.get("id");
    var p = P.find(function (x) { return (x.code || x.name) === id; });
    if (!p) { $("#main").innerHTML = '<div class="loading pad">' + t("notFoundModel") + ' <a class="link-u" href="' + d(ROOT) + '">' + t("backHome") + '</a></div>'; return; }
    var s = seasonOf(p.season) || mkSeason("summer-2026"), cols = arr(p.colors), sizes = arr(p.sizes), name = px(p, "name");
    document.title = name + (p.code ? " · " + p.code : "") + " — VINTRO";
    var ci = Math.max(0, cols.findIndex(function (c) { return arr(c.images).length; })), size = null, ii = 0;
    var wa = digits(B.whatsapp);
    var related = P.filter(function (x) { return x !== p && x.season === p.season; });
    related.sort(function (a, b) { return (b.category === p.category) - (a.category === p.category); });

    function draw() {
      var c = cols[ci] || {}, imgs = arr(c.images).filter(Boolean), cn = colL(c);
      if (ii >= imgs.length) ii = 0;
      var pics = imgs.length ? imgs.map(function (im, i) { return '<div class="pic' + (i === ii ? " on" : "") + '"><img src="' + esc(url(im)) + '" alt="' + esc(name + " — " + cn + " " + (i + 1)) + '"' + (i ? ' loading="lazy"' : "") + '></div>'; }).join("")
        : '<div class="pic on">' + art(p, hexOf(c)) + '</div>';
      var thumbs = imgs.length > 1 ? '<div class="thumbs">' + imgs.map(function (im, i) { return '<button data-i="' + i + '" aria-pressed="' + (i === ii) + '" aria-label="' + t("image") + num(i + 1) + '"><img src="' + esc(url(im)) + '" alt=""></button>'; }).join("") + '</div>' : "";
      var msg = EN
        ? "Hello VINTRO, I'd like to ask about model " + (p.code || name) + " (" + name + ")" + (cn ? "\nColour: " + cn : "") + (size ? "\nSize: " + size : "")
        : "مرحباً VINTRO، أرغب بالاستفسار عن الموديل " + (p.code || p.name) + " (" + p.name + ")" + (c.name ? "\nاللون: " + c.name : "") + (size ? "\nالمقاس: " + size : "");
      var desc = px(p, "description"), fabric = px(p, "fabric"), minO = px(p, "min_order");
      $("#main").innerHTML = '<nav class="crumbs pad" aria-label="' + t("path") + '"><a href="' + d(ROOT) + '">' + t("home") + '</a> / <a href="' + seasonUrl(s.id) + '">' + s.label + '</a>' +
        (p.category ? ' / <a href="' + seasonUrl(s.id, p.category) + '">' + esc(catL(p.category)) + '</a>' : "") + '</nav>' +
        '<div class="pdp pad"><div class="gal"><div class="pics" id="pics">' + pics + '</div>' + thumbs + (imgs.length > 1 ? '<div class="dots-nav">' + imgs.map(function (_, i) { return '<i' + (i ? "" : ' class="on"') + '></i>'; }).join("") + '</div>' : "") + '</div>' +
        '<aside class="panel-info"><div>' + (p.code ? '<div class="code">' + esc(p.code) + '</div>' : "") + '<h1>' + esc(name) + '</h1>' +
        (p.price ? '<div class="price">' + esc(p.price) + '</div>' : '<div class="price ask">' + t("priceAsk") + '</div>') + '</div>' +
        (cols.length ? '<div><div class="opt-label"><span>' + t("color") + '</span><b>' + esc(cn) + '</b></div><div class="colors">' + cols.map(function (k, i) {
          var im = arr(k.images)[0];
          return '<button data-c="' + i + '" aria-pressed="' + (i === ci) + '" aria-label="' + esc(colL(k)) + '" title="' + esc(colL(k)) + '">' + (im ? '<img src="' + esc(url(im)) + '" alt="">' : '<span class="fill" style="background:' + esc(hexOf(k)) + '"></span>') + '</button>';
        }).join("") + '</div></div>' : "") +
        (sizes.length ? '<div><div class="opt-label"><span>' + t("size") + '</span><b>' + esc(size || t("pickSize")) + '</b></div><div class="sizes" dir="ltr">' + sizes.map(function (z) { return '<button data-s="' + esc(z) + '" aria-pressed="' + (z === size) + '">' + esc(z) + '</button>'; }).join("") + '</div></div>' : "") +
        '<div class="cta">' + (wa ? '<a class="btn wa block" href="https://wa.me/' + wa + '?text=' + encodeURIComponent(msg) + '" target="_blank" rel="noopener">' + IC.wa + t("orderWa") + '</a>' : "") +
        (B.email ? '<a class="btn block" href="mailto:' + esc(B.email) + '?subject=' + encodeURIComponent((EN ? "Enquiry about " : "استفسار عن ") + (p.code || name)) + '&body=' + encodeURIComponent(msg) + '">' + t("mailUs") + '</a>' : "") +
        '<p class="note">' + t("wsNote") + '</p></div>' +
        '<div>' + (desc ? '<details class="acc" open><summary>' + t("desc") + '</summary><div class="in">' + esc(desc) + '</div></details>' : "") +
        '<details class="acc"' + (desc ? "" : " open") + '><summary>' + t("details") + '</summary><div class="in"><dl class="specs">' +
        (fabric ? '<dt>' + t("fabric") + '</dt><dd>' + esc(fabric) + '</dd>' : "") + (p.category ? '<dt>' + t("category") + '</dt><dd>' + esc(catL(p.category)) + '</dd>' : "") +
        '<dt>' + t("season") + '</dt><dd>' + s.label + '</dd>' + (sizes.length ? '<dt>' + t("sizes") + '</dt><dd class="ltr">' + esc(sizes.join(" · ")) + '</dd>' : "") +
        (minO ? '<dt>' + t("minOrder") + '</dt><dd>' + esc(minO) + '</dd>' : "") + '</dl></div></details></div></aside></div>' +
        (related.length ? '<section class="sec pad" style="border-top:1px solid var(--line)">' + secHead("You may also like", t("sameColl"), '<a class="link-u" href="' + seasonUrl(s.id) + '">' + t("viewAll") + '</a>') + '<div class="strip">' + related.slice(0, 10).map(card).join("") + '</div></section>' : "");
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
      reveal();
    }
    document.addEventListener("click", function (e) {
      var tb = e.target.closest("[data-i]"); if (tb) { ii = +tb.getAttribute("data-i"); var y0 = window.scrollY; draw(); window.scrollTo(0, y0); return; }
      var cb = e.target.closest("[data-c]"); if (cb) { ci = +cb.getAttribute("data-c"); ii = 0; var y = window.scrollY; draw(); window.scrollTo(0, y); return; }
      var sb = e.target.closest("[data-s]"); if (sb) { var v = sb.getAttribute("data-s"); size = size === v ? null : v; var y2 = window.scrollY; draw(); window.scrollTo(0, y2); }
    });
    draw();
  }

  /* ---------- other pages ---------- */
  function pageHead(latin, title, lead) {
    var showLatin = !(EN && latin.toLowerCase() === String(title).toLowerCase());
    return '<header class="page-head pad">' + (showLatin ? '<span class="latin">' + latin + '</span>' : "") + '<h1>' + title + '</h1>' + (lead ? '<p>' + esc(lead) + '</p>' : "") + '</header>';
  }

  function collections() {
    if (QS.get("id")) return collection();
    document.title = t("collections") + " — VINTRO";
    var k = 0;
    $("#main").innerHTML = pageHead("Collections", t("collections"), t("collLead")) +
      years().map(function (y) {
        return '<div class="year-head pad"><span class="yr latin">' + y + '</span><span class="yl">' + t("collectionsOf") + num(y) + '</span></div>' +
          SEASONS.filter(function (s) { return s.year === y; }).map(function (s) { return collBlock(s, k++); }).join("");
      }).join("");
  }
  function collBlock(s, i) {
    var items = P.filter(function (p) { return p.season === s.id; }), cats = catsOf(items), cover = s.cover;
    return '<section class="coll ' + s.cls + (i % 2 ? " flip" : "") + '"><a class="coll-media' + (cover ? " has-img" : "") + '" href="' + seasonUrl(s.id) + '" aria-label="' + s.label + '">' +
      (cover ? '<img src="' + esc(url(cover)) + '" alt="">' : lines() + '<span class="mark">' + logo("mark") + '</span>') + '<span class="latin big">' + s.latin + '</span></a>' +
      '<div class="coll-txt pad">' + (EN ? "" : '<span class="latin">' + s.latin + '</span>') + '<h2>' + s.label + '</h2><p>' + esc(s.intro || "") + '</p>' +
      '<div class="coll-meta"><span>' + cnt(items.length, "models") + '</span><span>' + cnt(cats.length, "types") + '</span></div>' +
      (cats.length ? '<ul class="coll-cats">' + cats.map(function (c) { return '<li><a href="' + seasonUrl(s.id, c) + '">' + esc(catL(c)) + '</a></li>'; }).join("") + '</ul>' : "") +
      '<a class="btn solid" href="' + seasonUrl(s.id) + '">' + t("browse") + s.label + '</a></div></section>' +
      (items.length ? '<div class="pad" style="padding-block:28px 72px"><div class="strip">' + items.slice(0, 8).map(card).join("") + '</div></div>' : "");
  }

  function about() {
    document.title = t("aboutUs") + " — VINTRO";
    var values = arr(B.values).filter(function (v) { return v && v.title; }).map(function (v, i) {
      var dv = EN_DEFAULT.values[i] || {};
      return EN ? { title: v.title_en || dv.title || v.title, text: v.text_en || dv.text || v.text } : v;
    });
    $("#main").innerHTML = pageHead("About VINTRO", t("aboutUs"), bt("tagline")) +
      '<section class="pad about-hero"><div class="ab-mark">' + lines() + logo("full") + '</div><div class="ab-txt"><p class="big">' + esc(bt("headline")) + '</p><p>' + esc(bt("about")) + '</p>' +
      (bt("story") ? '<p>' + esc(bt("story")) + '</p>' : "") +
      (bt("founder") ? '<div class="founder"><span class="m">' + logo("mark") + '</span><div><b>' + esc(bt("founder")) + '</b><small>' + esc(bt("founder_title")) + '</small></div></div>' : "") + '</div></section>' +
      (values.length ? '<section class="sec pad">' + secHead("What we stand for", t("valuesH")) + '<div class="values">' +
        values.map(function (v) { return '<div class="value"><span class="vm">' + logo("mark") + '</span><h3>' + esc(v.title) + '</h3><p>' + esc(v.text || "") + '</p></div>'; }).join("") + '</div></section>' : "") +
      '<section class="band"><div class="pad band-in"><div><span class="latin">Wholesale</span><h2>' + t("bandH") + '</h2><p>' + t("bandP") + '</p></div><div class="band-btns"><a class="btn light" href="' + pageUrl("wholesale") + '">' + t("howOrder") + '</a>' +
      (waLink() ? '<a class="btn wa" href="' + waLink(EN ? "Hello VINTRO, I'd like to learn more about your products." : "مرحباً VINTRO، أرغب بالتعرّف على منتجاتكم.") + '" target="_blank" rel="noopener">' + IC.wa + t("wa") + '</a>' : "") + '</div></div></section>';
  }

  function wholesale() {
    document.title = t("wholesaleFull") + " — VINTRO";
    var steps = EN ? [
      ["Choose your models", "Browse the collections and note the model numbers you're interested in."],
      ["Send your order", "Send us each model number with the colours, sizes and quantities you need."],
      ["Get a quote", "We reply with a price and delivery date based on quantity and model."],
      ["Production & delivery", "Once you confirm, we start production and keep you updated until delivery."]
    ] : [
      ["اختر الموديلات", "تصفّح المجموعات وسجّل أرقام الموديلات التي تهمّك."],
      ["أرسل طلبك", "أرسل لنا رقم كل موديل مع الألوان والمقاسات والكمية المطلوبة."],
      ["عرض السعر", "نرسل لك عرض سعر وموعد تسليم حسب الكمية والموديل."],
      ["التصنيع والتسليم", "بعد التأكيد نبدأ الإنتاج ونتابع معك حتى استلام الطلبية."]
    ];
    var faq = arr(B.faq).filter(function (f) { return f && f.q; }).map(function (f, i) {
      var df = EN_DEFAULT.faq[i] || {};
      return EN ? { q: f.q_en || df.q || f.q, a: f.a_en || df.a || f.a } : f;
    });
    var tpl = EN ? "Name / shop name:\nCity and country:\n\nModel number:\nColours:\nSizes and quantity:\n\nModel number:\nColours:\nSizes and quantity:"
      : "الاسم / اسم المحل:\nالمدينة والبلد:\n\nرقم الموديل:\nالألوان:\nالمقاسات والكمية:\n\nرقم الموديل:\nالألوان:\nالمقاسات والكمية:";
    $("#main").innerHTML = pageHead("Wholesale", t("wholesaleFull"), t("wsLead")) +
      '<section class="pad steps">' + steps.map(function (s, i) { return '<div class="step"><span class="n latin">' + String(i + 1).padStart(2, "0") + '</span><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div>'; }).join("") + '</section>' +
      '<section class="sec pad"><div class="ws-grid"><div>' + secHead("Order template", t("tplH")) +
      '<p class="muted">' + t("tplP") + '</p><pre class="tpl" id="tpl">' + esc(tpl) + '</pre>' +
      '<div class="band-btns">' + (waLink() ? '<a class="btn wa" id="tpl-wa" href="#" target="_blank" rel="noopener">' + IC.wa + t("sendWa") + '</a>' : "") + '<button class="btn" id="tpl-copy" type="button">' + t("copyTpl") + '</button></div></div>' +
      (faq.length ? '<div>' + secHead("FAQ", t("faqH")) + faq.map(function (f, i) { return '<details class="acc"' + (i ? "" : " open") + '><summary>' + esc(f.q) + '</summary><div class="in">' + esc(f.a || "") + '</div></details>'; }).join("") + '</div>' : "") + '</div></section>';
    var w = $("#tpl-wa");
    if (w) w.href = waLink((EN ? "Hello VINTRO, I'd like to place an order:\n\n" : "مرحباً VINTRO، أرغب بتقديم طلبية:\n\n") + tpl);
    $("#tpl-copy").addEventListener("click", function (e) {
      var b = e.currentTarget;
      function done() { b.textContent = t("copied"); setTimeout(function () { b.textContent = t("copyTpl"); }, 1800); }
      function selectTpl() { var r = document.createRange(); r.selectNodeContents($("#tpl")); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); b.textContent = t("selectCopy"); }
      try { navigator.clipboard.writeText(tpl).then(done, selectTpl); } catch (er) { selectTpl(); }
    });
  }

  function contact() {
    document.title = t("contact") + " — VINTRO";
    var phones = [[B.phone, B.phone_label], [B.phone2, B.phone2_label]].filter(function (x) { return x[0]; });
    var hours = bt("hours");
    $("#main").innerHTML = pageHead("Contact", t("contact"), t("contactLead")) +
      '<section class="pad contact-grid"><div class="c-cards">' +
      phones.map(function (x) { return '<div class="c-card"><span class="lbl">' + esc(phoneLabel(x[1]) || t("phone")) + '</span><a class="ltr big" ' + tel(x[0]) + '>' + esc(x[0]) + '</a></div>'; }).join("") +
      [B.email, B.email2].filter(Boolean).map(function (m) { return '<div class="c-card"><span class="lbl">' + t("email") + '</span><a class="ltr" href="mailto:' + esc(m) + '">' + esc(m) + '</a></div>'; }).join("") +
      (bt("address") ? '<div class="c-card"><span class="lbl">' + t("address") + '</span><span>' + esc(bt("address")) + '</span><a class="link-u" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(B.address_map || bt("address")) + '" target="_blank" rel="noopener">' + t("map") + '</a></div>' : "") +
      (hours ? '<div class="c-card"><span class="lbl">' + t("hours") + '</span><span>' + esc(hours) + '</span></div>' : "") + '</div>' +
      '<form class="c-form" id="cform" novalidate><h2>' + t("formH") + '</h2>' +
      '<label class="f" for="c-name"><span>' + t("fName") + '</span><input id="c-name" required autocomplete="name"></label>' +
      '<label class="f" for="c-co"><span>' + t("fCo") + '</span><input id="c-co" autocomplete="organization"></label>' +
      '<label class="f" for="c-city"><span>' + t("fCity") + '</span><input id="c-city"></label>' +
      '<label class="f" for="c-codes"><span>' + t("fCodes") + '</span><input id="c-codes" dir="ltr" placeholder="S26-101, W26-501"></label>' +
      '<label class="f" for="c-msg"><span>' + t("fMsg") + '</span><textarea id="c-msg" rows="4" required></textarea></label>' +
      '<p class="err" id="c-err" hidden>' + t("fErr") + '</p>' +
      '<div class="band-btns">' + (waLink() ? '<button class="btn wa" type="submit">' + IC.wa + t("sendWa") + '</button>' : "") + (B.email ? '<button class="btn" type="button" id="c-mail">' + t("sendMail") + '</button>' : "") + '</div></form></section>';
    function compose() {
      var v = function (i) { return $("#" + i).value.trim(); };
      if (!v("c-name") || !v("c-msg")) { $("#c-err").hidden = false; return null; }
      $("#c-err").hidden = true;
      return EN
        ? "Hello VINTRO,\nName: " + v("c-name") + (v("c-co") ? "\nShop/company: " + v("c-co") : "") + (v("c-city") ? "\nCity: " + v("c-city") : "") + (v("c-codes") ? "\nModels: " + v("c-codes") : "") + "\n\n" + v("c-msg")
        : "مرحباً VINTRO،\nالاسم: " + v("c-name") + (v("c-co") ? "\nالمحل/الشركة: " + v("c-co") : "") + (v("c-city") ? "\nالمدينة: " + v("c-city") : "") + (v("c-codes") ? "\nالموديلات: " + v("c-codes") : "") + "\n\n" + v("c-msg");
    }
    $("#cform").addEventListener("submit", function (e) { e.preventDefault(); var x = compose(); if (!x) return; var a = document.createElement("a"); a.href = waLink(x); a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove(); });
    var m = $("#c-mail"); if (m) m.addEventListener("click", function () { var x = compose(); if (x) location.href = "mailto:" + B.email + "?subject=" + encodeURIComponent(EN ? "Enquiry from the website" : "استفسار من الموقع") + "&body=" + encodeURIComponent(x); });
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
    var qid = QS.get("id");
    header(PAGE === "season" ? (document.body.getAttribute("data-season") || qid) : (PAGE === "collections" && qid) ? qid : PAGE);
    var R = { home: home, season: collection, model: model, collections: collections, about: about, wholesale: wholesale, contact: contact };
    (R[PAGE] || home)();
    footer();
    reveal();
  }).catch(function () {
    $("#main").innerHTML = '<div class="loading pad">' + t("loadErr") + '</div>';
  });
})();
