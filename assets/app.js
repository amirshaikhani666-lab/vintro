/* VINTRO catalog — shared code for every page, in Arabic, English, Turkish, German, French and Italian.
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
  /* Arabic and English are built in; Turkish, German, French and Italian come from assets/i18n.js */
  var LANGS = [["ar", "العربية", "ع"], ["en", "English", "EN"], ["tr", "Türkçe", "TR"], ["de", "Deutsch", "DE"], ["fr", "Français", "FR"], ["it", "Italiano", "IT"]];
  function okLang(l) { return LANGS.some(function (x) { return x[0] === l; }); }
  var LANG = QS.get("lang");
  if (!okLang(LANG)) { LANG = null; try { LANG = localStorage.getItem("vintro-lang"); } catch (e) {} }
  if (!okLang(LANG)) LANG = "ar";
  try { localStorage.setItem("vintro-lang", LANG); } catch (e) {}
  var EN = LANG !== "ar"; /* every language except Arabic: Latin script, left to right, English as the fallback */
  var X = {}, XD = {};
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
    sendMail: ["إرسال بالبريد", "Send by email"],
    shopBy: ["تصفّح حسب النوع", "Shop by category"], quick: ["نظرة سريعة", "Quick view"], fullDetails: ["عرض التفاصيل الكاملة", "View full details"],
    sample: ["اطلب عيّنة", "Request a sample"], sampleH: ["اطلب عيّنة قبل الطلبية", "Request a sample before you order"],
    sampleP: ["أرسل لنا الموديل واللون والمقاس، ونرتّب معك إرسال عيّنة لتعاين القماش والقصّة بنفسك.", "Tell us the model, colour and size, and we'll arrange a sample so you can check the fabric and fit yourself."],
    fModel: ["رقم الموديل", "Model number"], sendReq: ["أرسل الطلب عبر واتساب", "Send the request on WhatsApp"], sErr: ["اكتب اسمك ورقم الموديل.", "Please add your name and the model number."],
    catalog: ["الكتالوج", "Catalogue"], catalogH: ["كتالوج المجموعة", "Collection catalogue"], dlCatalog: ["حمّل الكتالوج", "Download the catalogue"],
    catalogP: ["كل موديلات الموسم في ملف واحد مرتّب، جاهز للطباعة أو للحفظ PDF وإرساله لشركائك.", "Every model of the season in one tidy file, ready to print or save as a PDF and share with your partners."],
    savePdf: ["حفظ PDF أو طباعة", "Save as PDF or print"], pdfHint: ["اضغط الزر، ثم اختر «حفظ بصيغة PDF» من نافذة الطباعة.", "Press the button, then choose “Save as PDF” in the print window."],
    factoryH: ["من داخل مصنعنا", "Inside our factory"], chatWith: ["تحدّث مع ", "Chat with "], salesRole: ["مبيعات الجملة", "Wholesale sales"],
    prev: ["السابق", "Previous"], next: ["التالي", "Next"], editOf: ["مختارات ", "The edit · "], language: ["اللغة", "Language"], logoHome: ["VINTRO — الرئيسية", "VINTRO — Home"]
  };
  function t(k) { if (X.s && X.s[k]) return X.s[k]; var v = S[k]; return v ? v[EN ? 1 : 0] : k; }
  var ONE = { models: " model", results: " result", types: " category" };
  function cnt(n, k) {
    var one = LANG === "en" ? ONE : (X.one || {});
    return (EN ? String(n) : String(n).replace(/\d/g, function (x) { return "٠١٢٣٤٥٦٧٨٩"[x]; })) + (EN && +n === 1 && one[k] ? one[k] : t(k));
  }

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
  /* Arabic texts used until they are filled in the CMS */
  var AR_DEFAULT = { headline: "ألبسة جاهزة بتصميم عصري وجودة تصنيع تليق بالتصدير", tagline: "مصنع ألبسة جاهزة — بيع بالجملة وتصدير" };
  function bt(f) { if (!EN) return B[f] || AR_DEFAULT[f] || ""; return B[f + "_" + LANG] || (LANG !== "en" && XD[f]) || B[f + "_en"] || EN_DEFAULT[f] || B[f] || ""; }
  /* a field in the current language: "name_tr" from the CMS, then the translation file, then English, then Arabic */
  function px(o, f) {
    if (!o) return "";
    if (!EN) return o[f] || "";
    if (o[f + "_" + LANG]) return o[f + "_" + LANG];
    if (LANG !== "en" && X.models && o.code != null) {
      var m = X.models[String(o.code).trim()], i = f === "name" ? 0 : f === "description" ? 1 : -1;
      if (m && i >= 0 && m[i]) return m[i];
    }
    return o[f + "_en"] || o[f] || "";
  }
  /* a value or question written in the CMS, in the current language */
  function vt(v, f, i, list) {
    if (!EN) return v[f] || "";
    var d = (LANG !== "en" && XD[list] && XD[list][i]) || (EN_DEFAULT[list] && EN_DEFAULT[list][i]) || {};
    return v[f + "_" + LANG] || (LANG !== "en" && d[f]) || v[f + "_en"] || d[f] || v[f] || "";
  }
  function place(en) { return (X.places && X.places[en]) || en; }

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
  /* seasons can be written "winter-2026" or "شتاء ٢٠٢٦"; both mean the same collection */
  function normSeason(v) {
    var s = String(v || "").trim().replace(/[٠-٩]/g, function (x) { return "٠١٢٣٤٥٦٧٨٩".indexOf(x); });
    var m = /^(summer|winter|صيف|صيفي|شتاء|شتوي)[\s\-_·]*(\d{4})$/i.exec(s);
    if (!m) return s;
    return (/^(summer|صيف)/i.test(m[1]) ? "summer" : "winter") + "-" + m[2];
  }
  function mkSeason(id, cfg) {
    id = normSeason(id);
    var m = /^(summer|winter)-(\d{4})$/.exec(String(id || "").trim()); if (!m) return null;
    var ty = TYPES[m[1]], y = m[2]; cfg = cfg || {};
    var introAr = cfg.intro || B[m[1] + "_intro"] || ty.intro;
    var xs = X.seasons || {};
    var introEn = cfg["intro_" + LANG] || B[m[1] + "_intro_" + LANG] || xs[m[1] + "Intro"] || cfg.intro_en || B[m[1] + "_intro_en"] || ty.introEn;
    var nameL = xs[m[1]] || ty.en;
    return { id: m[0], type: m[1], year: +y, cls: m[1], latin: ty.en + " " + y, label: EN ? nameL + " " + y : ty.ar + " " + toAr(y),
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
    "معطف": "Coats", "كنزة": "Sweaters", "هودي": "Hoodies", "شورت": "Shorts", "بلوزة": "Blouses", "تنورة": "Skirts", "عباية": "Abayas", "بيجامة": "Pyjamas", "سويت شيرت": "Sweatshirts", "طقم": "Sets", "بدلة": "Suits", "بولو": "Polos", "تريكو": "Knitwear", "كنزات": "Sweaters" };
  function catL(c) {
    if (!EN) return c;
    var p = P.find(function (x) { return x.category === c && (x["category_" + LANG] || x.category_en); });
    if (p && p["category_" + LANG]) return p["category_" + LANG];
    var en = (p && p.category_en) || CAT_EN[c] || c;
    return (X.cats && X.cats[en]) || en;
  }
  var COLORS = { "أسود": ["#1A1A1A", "Black"], "اسود": ["#1A1A1A", "Black"], "نبيتي": ["#4E1428", "Burgundy"], "فانيلا": ["#EEE6D3", "Vanilla"], "كاميل": ["#B06E3B", "Camel"], "أوف وايت": ["#F2EEE4", "Off-white"], "بترولي": ["#0E5047", "Petrol"], "أبيض": ["#F4F4F2", "White"], "ابيض": ["#F4F4F2", "White"], "كحلي": ["#1E2A44", "Navy"], "رمادي": ["#8A8D91", "Grey"],
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
  function colEn(c) {
    if (c.name_en) return c.name_en;
    var n = String(c.name || "").trim(), shade = "";
    if (/ فاتح$/.test(n)) { shade = "Light "; n = n.replace(/ فاتح$/, ""); }
    else if (/ (غامق|داكن)$/.test(n)) { shade = "Dark "; n = n.replace(/ (غامق|داكن)$/, ""); }
    return COLORS[n] ? shade + (shade ? COLORS[n][1].toLowerCase() : COLORS[n][1]) : (c.name || "");
  }
  /* English colour name -> current language; "White / navy stripe" and "Navy / red tipping" are built from their parts */
  function colX(en) {
    var C = X.colours || {}, cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
    function one(w) { w = String(w).trim(); var k = cap(w.toLowerCase()); return C[w] || C[k] || w; }
    var m = /^(.+?)\s*\/\s*(.+?)\s+(stripe|stripes|striped|tipping)$/i.exec(en);
    if (m) {
      var a = one(m[1]), b = one(m[2]), f = /tip/i.test(m[3]) ? X.tipping : X.stripe;
      if (f) return f(a, b);
    }
    return one(en);
  }
  function colL(c) {
    if (!c) return "";
    if (!EN) return c.name || "";
    if (c["name_" + LANG]) return c["name_" + LANG];
    var en = colEn(c);
    return LANG === "en" ? en : colX(en);
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
    /* the small decorative labels are English; keep Turkish capitalisation rules (i → İ) off them */
    if (LANG === "tr") document.querySelectorAll(".latin, .new").forEach(function (el) { el.setAttribute("lang", "en"); });
    if (!IO) return;
    document.querySelectorAll(".sec-head, #main .card, .cats a, .arch-card, .value, .step, .coll-txt, .c-card, .year-head, .ab-txt, .ab-mark, .tpl, .ctile, .ed-big, .ed-txt, .fx-txt, .fx-pic, .stats>div, .smp-in").forEach(function (el, i) {
      if (el.classList.contains("rv")) return;
      el.classList.add("rv"); el.style.setProperty("--rd", (i % 4) * 70 + "ms"); IO.observe(el);
    });
  }

  /* ---------- shared pieces ---------- */
  function secHead(latin, title, link) {
    var showLatin = latin && !(EN && latin.toLowerCase() === String(title).toLowerCase());
    return '<div class="sec-head"><div>' + (showLatin ? '<span class="latin">' + latin + '</span>' : "") + '<h2>' + title + '</h2></div>' + (link || "") + '</div>';
  }
  /* ---------- photos ----------
     The winter photos are sheets with several shots and printed text. In cards and tiles only the main shot is shown,
     using the positions in assets/crops.js. The photo files themselves are never changed. */
  var CROPS = {};
  function cropOf(src) {
    var k = String(src || "").replace(/^https?:\/\/[^\/]+/, "").replace(/^.*?(\/images\/)/, "$1");
    if (k.charAt(0) !== "/") k = "/" + k;
    return CROPS[k];
  }
  function hasCrop(src) { return !!cropOf(src); }
  /* a photo that fills a box whose width ÷ height is A */
  function pic(src, A, alt, lazy, cls) {
    var at = ' src="' + esc(url(src)) + '" alt="' + esc(alt || "") + '"' + (lazy ? ' loading="lazy"' : "") + ' decoding="async"';
    var c = cropOf(src);
    if (!c) return '<img class="fill' + (cls ? " " + cls : "") + '"' + at + '>';
    var W = c[0], H = c[1], x0 = c[2] * W, y0 = c[3] * H, rw = (c[4] - c[2]) * W, rh = (c[5] - c[3]) * H, cw, ch, cx, cy;
    y0 += rh * .05; rh *= .95; /* leaves out the small logo printed at the top of some sheets */
    if (rw / rh > A) { ch = rh; cw = rh * A; cx = x0 + (rw - cw) / 2; cy = y0; }
    else { cw = rw; ch = rw / A; cx = x0; cy = y0 + (rh - ch) * .12; }
    var st = "width:" + (W / cw * 100).toFixed(3) + "%;height:" + (H / ch * 100).toFixed(3) + "%;left:" + (-cx / cw * 100).toFixed(3) + "%;top:" + (-cy / ch * 100).toFixed(3) + "%";
    return '<img class="crop' + (cls ? " " + cls : "") + '" style="' + st + '"' + at + '>';
  }
  /* the photo that represents a model in tiles: the main shot of a sheet, or the first photo */
  function heroImg(p) { var im = imagesOf(p); return im.find(hasCrop) || im[0] || ""; }
  function byCode(code) { return P.find(function (x) { return String(x.code || x.name) === String(code); }); }

  var CARD_A = 808 / 951;
  function cardMedia(p, ci) {
    var cols = arr(p.colors), c = cols[ci] || cols[0] || {}, name = px(p, "name");
    var im = arr(c.images).filter(Boolean), all = imagesOf(p);
    if (!im.length) im = all;
    if (!im.length) return art(p, hexOf(c));
    var nx = cols[(ci + 1) % cols.length], second = im[1] || (nx && nx !== c ? arr(nx.images)[0] : "");
    return pic(im[0], CARD_A, name, true) + (second ? pic(second, CARD_A, "", true, "alt") : "");
  }
  function card(p) {
    var cols = arr(p.colors), first = cols[0] || {}, name = px(p, "name"), sz = arr(p.sizes);
    return '<a class="card" href="' + esc(modelUrl(p)) + '" data-code="' + esc(p.code || p.name) + '"><div class="ph"><div class="ph-m">' + cardMedia(p, 0) + '</div>' + (p.featured ? '<span class="new latin">New</span>' : "") +
      '<span class="qv" role="button" tabindex="0">' + t("quick") + '</span>' +
      (sz.length ? '<div class="qs" dir="ltr">' + sz.map(function (z) { return '<span>' + esc(z) + '</span>'; }).join("") + '</div>' : "") + '</div>' +
      '<div class="body"><span class="nm">' + esc(name) + '</span><div class="sub"><span class="code">' + esc(p.code || "") + '</span><span>' +
      (cols.length > 1 ? num(cols.length) + t("colorsN") : esc(colL(first))) + '</span></div>' +
      '<div class="sws">' + cols.slice(0, 7).map(function (c, i) { return '<i data-k="' + i + '"' + (i ? "" : ' class="on"') + ' title="' + esc(colL(c)) + '" style="background:' + esc(hexOf(c)) + '"></i>'; }).join("") +
      (cols.length > 7 ? '<small>+' + num(cols.length - 7) + '</small>' : "") + '</div></div></a>';
  }
  /* hovering (or tapping) a colour dot shows that colour on the card */
  function swapCard(sw) {
    var cd = sw.closest(".card"), p = cd && byCode(cd.getAttribute("data-code")); if (!p) return;
    var k = +sw.getAttribute("data-k"); if (cd.getAttribute("data-k") === String(k)) return;
    cd.setAttribute("data-k", k);
    cd.querySelector(".ph-m").innerHTML = cardMedia(p, k);
    cd.querySelectorAll(".sws i").forEach(function (x) { x.classList.toggle("on", x === sw); });
  }
  document.addEventListener("mouseover", function (e) { var sw = e.target.closest && e.target.closest(".card .sws i[data-k]"); if (sw) swapCard(sw); });
  document.addEventListener("click", function (e) {
    var sw = e.target.closest(".card .sws i[data-k]");
    if (sw) { e.preventDefault(); swapCard(sw); return; }
    var q = e.target.closest(".card .qv");
    if (q) { e.preventDefault(); var cd = q.closest(".card"), p = byCode(cd.getAttribute("data-code")); if (p) quickView(p, +(cd.getAttribute("data-k") || 0)); }
  });
  document.addEventListener("keydown", function (e) {
    var q = e.target.closest && e.target.closest(".card .qv");
    if (q && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); q.click(); }
  });

  /* ---------- pop-up windows: quick view and sample request ---------- */
  function modal(html, cls) {
    var m = document.createElement("div");
    m.className = "modal " + (cls || ""); m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true");
    m.innerHTML = '<div class="modal-bg" data-mclose></div><div class="modal-box"><button class="ico-btn modal-x" type="button" data-mclose aria-label="' + t("close") + '">' + IC.close + '</button>' + html + '</div>';
    document.body.appendChild(m); document.body.classList.add("lock");
    requestAnimationFrame(function () { m.classList.add("on"); });
    function onKey(e) { if (e.key === "Escape") close(); }
    function close() { m.remove(); document.removeEventListener("keydown", onKey); if (!document.querySelector(".modal")) document.body.classList.remove("lock"); }
    m.addEventListener("click", function (e) { if (e.target.closest("[data-mclose]")) close(); });
    document.addEventListener("keydown", onKey);
    setTimeout(function () { var f = m.querySelector("input, .qv-info button, .modal-x"); if (f) f.focus(); }, 60);
    return { el: m, close: close };
  }
  /* WhatsApp message about a model: Arabic on the Arabic site, English for every other language */
  function askMsg(p, c, size) {
    var name = px(p, "name"), cn = c ? colL(c) : "";
    return EN
      ? "Hello VINTRO, I'd like to ask about model " + (p.code || name) + " (" + name + ")" + (cn ? "\nColour: " + (LANG === "en" ? cn : colEn(c)) : "") + (size ? "\nSize: " + size : "")
      : "مرحباً VINTRO، أرغب بالاستفسار عن الموديل " + (p.code || p.name) + " (" + p.name + ")" + (c && c.name ? "\nاللون: " + c.name : "") + (size ? "\nالمقاس: " + size : "");
  }
  function quickView(p, ci0) {
    var cols = arr(p.colors), ci = ci0 || 0, size = null, ii = 0, name = px(p, "name"), s = seasonOf(p.season);
    if (!arr((cols[ci] || {}).images).length) ci = Math.max(0, cols.findIndex(function (c) { return arr(c.images).length; }));
    var M = modal('<div class="qv-in"></div>', "qv-modal"), wa = digits(B.whatsapp);
    function draw() {
      var c = cols[ci] || {}, imgs = arr(c.images).filter(Boolean), cn = colL(c), sizes = arr(p.sizes);
      if (ii >= imgs.length) ii = 0;
      M.el.querySelector(".qv-in").innerHTML =
        '<div class="qv-gal"><div class="qv-pic">' + (imgs.length ? '<img src="' + esc(url(imgs[ii])) + '" alt="' + esc(name + " — " + cn) + '">' : art(p, hexOf(c))) + '</div>' +
        (imgs.length > 1 ? '<div class="thumbs">' + imgs.map(function (im, i) { return '<button type="button" data-qi="' + i + '" aria-pressed="' + (i === ii) + '" aria-label="' + t("image") + num(i + 1) + '"><img src="' + esc(url(im)) + '" alt=""></button>'; }).join("") + '</div>' : "") + '</div>' +
        '<div class="qv-info">' + (p.code ? '<div class="code">' + esc(p.code) + '</div>' : "") + '<h2>' + esc(name) + '</h2>' +
        '<p class="muted qv-meta">' + (s ? s.label : "") + (p.category ? " · " + esc(catL(p.category)) : "") + '</p>' +
        (p.price ? '<div class="price">' + esc(p.price) + '</div>' : '<div class="price ask">' + t("priceAsk") + '</div>') +
        (cols.length ? '<div><div class="opt-label"><span>' + t("color") + '</span><b>' + esc(cn) + '</b></div><div class="colors">' + cols.map(function (k, i) {
          var im = arr(k.images)[0];
          return '<button type="button" data-qc="' + i + '" aria-pressed="' + (i === ci) + '" aria-label="' + esc(colL(k)) + '" title="' + esc(colL(k)) + '">' + (im ? '<img src="' + esc(url(im)) + '" alt="">' : '<span class="fill" style="background:' + esc(hexOf(k)) + '"></span>') + '</button>';
        }).join("") + '</div></div>' : "") +
        (sizes.length ? '<div><div class="opt-label"><span>' + t("size") + '</span><b>' + esc(size || t("pickSize")) + '</b></div><div class="sizes" dir="ltr">' + sizes.map(function (z) { return '<button type="button" data-qs="' + esc(z) + '" aria-pressed="' + (z === size) + '">' + esc(z) + '</button>'; }).join("") + '</div></div>' : "") +
        '<div class="cta">' + (wa ? '<a class="btn wa block" href="https://wa.me/' + wa + '?text=' + encodeURIComponent(askMsg(p, c, size)) + '" target="_blank" rel="noopener">' + IC.wa + t("orderWa") + '</a>' : "") +
        '<button class="btn block" type="button" data-qsample>' + t("sample") + '</button>' +
        '<a class="link-u qv-more" href="' + esc(modelUrl(p)) + '">' + t("fullDetails") + '</a></div></div>';
    }
    M.el.addEventListener("click", function (e) {
      var b;
      if ((b = e.target.closest("[data-qi]"))) { ii = +b.getAttribute("data-qi"); draw(); }
      else if ((b = e.target.closest("[data-qc]"))) { ci = +b.getAttribute("data-qc"); ii = 0; draw(); }
      else if ((b = e.target.closest("[data-qs]"))) { var v = b.getAttribute("data-qs"); size = size === v ? null : v; draw(); }
      else if (e.target.closest("[data-qsample]")) sampleForm(p, cols[ci], size);
    });
    draw();
  }
  function field(id, label, val, extra) {
    return '<label class="f" for="' + id + '"><span>' + label + '</span><input id="' + id + '"' + (val ? ' value="' + esc(val) + '"' : "") + (extra ? " " + extra : "") + '></label>';
  }
  function sampleForm(p, c, size) {
    var M = modal('<form class="c-form sample-form" novalidate><span class="latin eyebrow">Sample request</span><h2>' + t("sampleH") + '</h2><p class="muted">' + t("sampleP") + '</p>' +
      field("s-name", t("fName"), "", 'autocomplete="name" required') + field("s-co", t("fCo"), "", 'autocomplete="organization"') + field("s-city", t("fCity")) +
      '<div class="f-row">' + field("s-model", t("fModel"), p ? (p.code || p.name) : "", 'dir="ltr" required') + field("s-size", t("size"), size || "", 'dir="ltr"') + '</div>' +
      field("s-col", t("color"), c ? (EN ? colL(c) : c.name) : "") +
      '<p class="err" hidden>' + t("sErr") + '</p>' + (digits(B.whatsapp) ? '<button class="btn wa block" type="submit">' + IC.wa + t("sendReq") + '</button>' : "") + '</form>', "form-modal");
    M.el.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (i) { return M.el.querySelector("#" + i).value.trim(); };
      if (!v("s-name") || !v("s-model")) { M.el.querySelector(".err").hidden = false; return; }
      var msg = EN
        ? "Hello VINTRO, I'd like to request a sample.\nName: " + v("s-name") + (v("s-co") ? "\nShop/company: " + v("s-co") : "") + (v("s-city") ? "\nCity: " + v("s-city") : "") + "\nModel: " + v("s-model") + (v("s-col") ? "\nColour: " + v("s-col") : "") + (v("s-size") ? "\nSize: " + v("s-size") : "")
        : "مرحباً VINTRO، أرغب بطلب عيّنة.\nالاسم: " + v("s-name") + (v("s-co") ? "\nالمحل/الشركة: " + v("s-co") : "") + (v("s-city") ? "\nالمدينة: " + v("s-city") : "") + "\nالموديل: " + v("s-model") + (v("s-col") ? "\nاللون: " + v("s-col") : "") + (v("s-size") ? "\nالمقاس: " + v("s-size") : "");
      var a = document.createElement("a"); a.href = waLink(msg); a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove(); M.close();
    });
  }
  function catalogUrl(id) { return pageUrl("catalog") + "?id=" + encodeURIComponent(id); }
  function catsOf(list) { var c = []; list.forEach(function (p) { if (p.category && c.indexOf(p.category) < 0) c.push(p.category); }); return c; }
  function waLink(text) { var wa = digits(B.whatsapp); return wa ? "https://wa.me/" + wa + (text ? "?text=" + encodeURIComponent(text) : "") : ""; }
  function phoneLabel(raw) { return EN ? place(PLACES[raw] || raw) : raw; }

  function langMenu(cls) { return LANGS.map(function (l) { return '<li><button type="button" class="' + cls + '" data-lang="' + l[0] + '" lang="' + l[0] + '"' + (l[0] === LANG ? ' aria-current="true"' : "") + '>' + l[1] + '</button></li>'; }).join(""); }
  function header(current) {
    var top = LATEST.length ? LATEST[0].year : "";
    var ann = EN ? (B["announcement_" + LANG] || (LANG === "en" || !X.ann ? B.announcement_en : "") || (B.announcement === "-" ? "-" : "")) : (B.announcement || "");
    if (!ann) ann = EN ? (X.ann || "Wholesale only  ·  Collections ") + top : "البيع بالجملة فقط  ·  مجموعات " + num(top);
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
      '<div class="end"><div class="lang-pick"><button class="lang" id="lang" type="button" aria-haspopup="true" aria-expanded="false" aria-label="' + t("language") + '" title="' + t("language") + '"><span lang="' + LANG + '">' + LANGS.filter(function (l) { return l[0] === LANG; })[0][2] + '</span></button>' +
      '<ul class="lang-menu" id="lang-menu" hidden>' + langMenu("") + '</ul></div>' +
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
      '<div class="drawer-foot"><ul class="lang-list" aria-label="' + t("language") + '">' + langMenu("") + '</ul>' +
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
        return [p.name, p.name_en, px(p, "name"), p.code, p.category, catL(p.category), p.fabric, p.fabric_en].concat(arr(p.colors).map(function (c) { return c.name + " " + colL(c) + " " + (c.name_en || ""); })).join(" ").toLowerCase().indexOf(q) >= 0;
      }) : [];
      $("#q-res").innerHTML = res.slice(0, 24).map(card).join("");
      $("#q-hint").textContent = q ? (res.length ? cnt(res.length, "results") : t("noResults")) : t("searchHint");
    });
  }

  /* switching language reloads the same page in the other language */
  function switchLang(code) {
    if (!okLang(code) || code === LANG) return;
    try { localStorage.setItem("vintro-lang", code); } catch (e) {}
    var q = new URLSearchParams(location.search); q.set("lang", code);
    location.search = q.toString();
  }
  function langPop(show) {
    var m = $("#lang-menu"), b = $("#lang"); if (!m) return;
    if (show === undefined) show = m.hidden;
    m.hidden = !show; b.setAttribute("aria-expanded", show ? "true" : "false");
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") langPop(false); });
  document.addEventListener("click", function (e) {
    var lb = e.target.closest("[data-lang]");
    if (lb) { e.preventDefault(); switchLang(lb.getAttribute("data-lang")); return; }
    if (e.target.closest("#lang")) { e.preventDefault(); langPop(); return; }
    if (!e.target.closest("#lang-menu")) langPop(false);
    /* keep the chosen language while moving between pages, even when the browser blocks storage */
    var a = e.target.closest("a[href]"); if (!a || !EN) return;
    var h = a.getAttribute("href");
    if (!h || /^(https?:|mailto:|tel:|#|javascript:)/i.test(h) || /[?&]lang=/.test(h)) return;
    var hash = ""; var hi = h.indexOf("#"); if (hi >= 0) { hash = h.slice(hi); h = h.slice(0, hi); }
    a.setAttribute("href", h + (h.indexOf("?") >= 0 ? "&" : "?") + "lang=" + LANG + hash);
  }, true);

  function footer() {
    var wa = digits(B.whatsapp);
    $("#foot").innerHTML = '<div class="foot-in pad"><div class="fbrand">' + logo("full") + '<p>' + esc(bt("tagline")) + '</p></div>' +
      '<div><h4>' + t("collections") + '</h4><ul>' + LATEST.map(function (s) { return '<li><a href="' + seasonUrl(s.id) + '">' + s.label + '</a></li>'; }).join("") + '<li><a href="' + pageUrl("collections") + '">' + t("allCollections") + '</a></li>' + (LATEST.length ? '<li><a href="' + catalogUrl(LATEST[0].id) + '">' + t("catalog") + '</a></li>' : "") + '</ul>' +
      '<h4 style="margin-top:22px">' + t("company") + '</h4><ul><li><a href="' + pageUrl("about") + '">' + t("aboutUs") + '</a></li><li><a href="' + pageUrl("wholesale") + '">' + t("wholesaleFull") + '</a></li><li><a href="' + pageUrl("contact") + '">' + t("contact") + '</a></li></ul></div>' +
      '<div><h4>' + t("contact") + '</h4><ul>' +
      [B.phone, B.phone2].filter(Boolean).map(function (ph) { return '<li><a class="ltr" ' + tel(ph) + '>' + esc(ph) + '</a></li>'; }).join("") +
      [B.email, B.email2].filter(Boolean).map(function (m) { return '<li><a class="ltr" href="mailto:' + esc(m) + '">' + esc(m) + '</a></li>'; }).join("") + '</ul></div>' +
      '<div><h4>' + t("address") + '</h4><ul>' + (bt("address") ? '<li>' + esc(bt("address")) + '</li>' : "") +
      (B.instagram ? '<li><a class="ltr" href="https://instagram.com/' + esc(String(B.instagram).replace(/^@/, "")) + '" target="_blank" rel="noopener">Instagram</a></li>' : "") +
      (B.facebook ? '<li><a class="ltr" href="' + esc(B.facebook) + '" target="_blank" rel="noopener">Facebook</a></li>' : "") +
      '</ul><ul class="lang-list" aria-label="' + t("language") + '">' + langMenu("") + '</ul></div></div>' +
      '<div class="pad"><div class="foot-bot"><span>© ' + num(new Date().getFullYear()) + ' VINTRO. ' + t("rights") + '</span><span class="latin" style="font-size:.7rem">Ready-to-wear manufacturer</span></div></div>';
    if (wa && PAGE !== "model") {
      var a = document.createElement("a");
      var first = String(bt("founder") || "").split(/\s+/)[0];
      a.className = "wa-float"; a.href = "https://wa.me/" + wa; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", t("waUs"));
      a.innerHTML = '<span class="wf-av">' + (B.founder_photo ? '<img src="' + esc(url(B.founder_photo)) + '" alt="">' : IC.wa) + '</span>' +
        (first ? '<span class="wf-t"><b>' + esc(t("chatWith").indexOf("{n}") >= 0 ? t("chatWith").replace("{n}", first) : t("chatWith") + first) + '</b><small>' + t("salesRole") + '</small></span>' : "");
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
    var latest = P.filter(inLatest);
    var featured = P.filter(function (p) { return p.featured; });
    if (featured.length < 4) featured = featured.concat(latest.filter(function (p) { return featured.indexOf(p) < 0; })).slice(0, 12);
    var older = SEASONS.filter(function (s) { return s.year !== top; });
    var wa = digits(B.whatsapp), used = [];
    function pick(list, n) { /* models with a clean main shot first, each used once on the page */
      var a = list.filter(function (p) { return used.indexOf(p) < 0 && imagesOf(p).length; });
      a.sort(function (x, y) { return hasCrop(heroImg(y)) - hasCrop(heroImg(x)); });
      a = a.slice(0, n); used = used.concat(a); return a;
    }

    /* 1. opening: an animated tech sketch of a knit sweater, drawn line by line in gold */
    var hero = '<section class="hx art" aria-label="VINTRO"><div class="hx-knit" aria-hidden="true"></div>' + threads() + '<div class="hx-dust" aria-hidden="true"></div>' +
      '<div class="hx-in pad"><span class="hx-eyebrow latin">VINTRO · Collections ' + top + '</span><h1>' + esc(bt("headline")) + '</h1>' +
      (bt("tagline") ? '<p>' + esc(bt("tagline")) + '</p>' : "") +
      '<div class="op-btns"><a class="btn gold" href="' + pageUrl("collections") + '">' + t("discover") + '</a><a class="btn light" href="' + pageUrl("wholesale") + '">' + t("howOrder") + '</a></div></div>' +
      '<div class="hx-art">' + sketch() + '</div>' + tape() + '</section>';

    /* 2. a moving ribbon of words */
    var words = ["Ready-to-wear", "Made in Egypt"].concat(LATEST.map(function (s) { return s.latin; })).concat(["Wholesale & export", "Knitwear"]);
    var once = words.map(function (w) { return '<span>' + esc(w) + '</span><i>' + logo("mark") + '</i>'; }).join("");
    var ribbon = '<div class="mq latin" aria-hidden="true"><div class="mq-track">' + once + once + '</div></div>';

    /* 3. the season panels; a season without a cover shows two of its photos */
    function panelMedia(s) {
      if (s.cover) return '<img src="' + esc(url(s.cover)) + '" alt="">';
      var two = P.filter(function (p) { return p.season === s.id; }).map(function (p) { return imagesOf(p)[0]; }).filter(function (im) { return im && !hasCrop(im); }).slice(0, 2);
      return two.length === 2 ? '<div class="duo">' + two.map(function (im) { return '<img src="' + esc(url(im)) + '" alt="" loading="lazy">'; }).join("") + '</div>' : lines();
    }
    var panels = '<section class="hero' + (LATEST.length === 1 ? " one" : "") + '" id="seasons" aria-label="' + t("collections") + '">' + LATEST.slice(0, 2).map(function (s) {
      var pm = panelMedia(s), img = /<img/.test(pm);
      return '<a class="panel ' + s.cls + (img ? " has-img" : "") + '" href="' + seasonUrl(s.id) + '"><div class="media">' + pm + '</div>' +
        (img ? "" : '<span class="mark">' + logo("mark") + '</span>') +
        '<div class="cap"><span class="latin">' + s.latin + '</span><span class="ar">' + esc(s.intro) + '</span><span class="go">' + t("explore") + cnt(countOf(s.id), "models") + '</span></div></a>';
    }).join("") + '</section>';

    /* 4. newest models on a rail with arrows */
    var rail = featured.length ? '<section class="sec pad" style="padding-top:72px">' + secHead("New In", t("newIn"), '<a class="link-u" href="' + pageUrl("collections") + '">' + t("allCollections") + '</a>') +
      '<div class="rail"><div class="strip big">' + featured.map(card).join("") + '</div>' +
      '<div class="rail-ctl"><button type="button" class="r-btn" data-rail="-1" aria-label="' + t("prev") + '"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><span class="r-bar"><i></i></span>' +
      '<button type="button" class="r-btn" data-rail="1" aria-label="' + t("next") + '"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button></div></div></section>' : "";

    /* 5. categories as photo tiles */
    var byCat = {}, catOrder = [];
    latest.forEach(function (p) { if (!p.category) return; if (!byCat[p.category]) { byCat[p.category] = []; catOrder.push(p.category); } byCat[p.category].push(p); });
    catOrder.sort(function (a, b) { return byCat[b].length - byCat[a].length; });
    var tiles = catOrder.length > 1 ? '<section class="sec pad">' + secHead("Categories", t("shopBy")) + '<div class="ctiles n' + Math.min(catOrder.length, 5) + '">' + catOrder.map(function (c) {
      var list = byCat[c], rep = pick(list, 1)[0] || list[0], cnts = {};
      list.forEach(function (p) { cnts[p.season] = (cnts[p.season] || 0) + 1; });
      var sid = Object.keys(cnts).sort(function (a, b) { return cnts[b] - cnts[a]; })[0];
      return '<a class="ctile" href="' + seasonUrl(sid, c) + '"><div class="ct-m">' + (imagesOf(rep).length ? pic(heroImg(rep), .75, "", true) : art(rep, hexOf(arr(rep.colors)[0]))) + '</div>' +
        '<div class="ct-t"><strong>' + esc(catL(c)) + '</strong><span>' + cnt(list.length, "models") + '</span></div></a>';
    }).join("") + '</div></section>' : "";

    /* 6. one editorial block per season, like a magazine spread */
    var edits = LATEST.map(function (s, i) {
      var two = pick(P.filter(function (p) { return p.season === s.id; }), 2);
      if (!two.length) return "";
      var a = two[0], b = two[1];
      return '<section class="edit' + (i % 2 ? " flip" : "") + '"><a class="ed-big" href="' + esc(modelUrl(a)) + '">' + pic(heroImg(a), .8, px(a, "name"), true) + '</a>' +
        '<div class="ed-txt"><span class="latin eyebrow">The ' + (s.type === "summer" ? "Summer" : "Winter") + ' Edit</span><h2>' + s.label + '</h2><p>' + esc(s.intro) + '</p>' +
        (b ? '<a class="ed-small" href="' + esc(modelUrl(b)) + '"><span class="ed-m">' + pic(heroImg(b), .8, px(b, "name"), true) + '</span><span class="ed-cap"><b>' + esc(px(b, "name")) + '</b><small class="ltr">' + esc(b.code || "") + '</small></span></a>' : "") +
        '<div class="band-btns"><a class="btn solid" href="' + seasonUrl(s.id) + '">' + t("browse") + s.label + '</a><a class="btn" href="' + catalogUrl(s.id) + '">' + t("dlCatalog") + '</a></div></div></section>';
    }).join("");

    /* 7. catalogue download */
    var catBand = LATEST.length ? '<section class="band cat-band"><div class="pad band-in"><div><span class="latin">Catalogue ' + top + '</span><h2>' + t("catalogH") + '</h2><p>' + t("catalogP") + '</p></div><div class="band-btns">' +
      LATEST.map(function (s) { return '<a class="btn light" href="' + catalogUrl(s.id) + '">' + t("dlCatalog") + ' · ' + s.label + '</a>'; }).join("") + '</div></div></section>' : "";

    $("#main").innerHTML = hero + ribbon + panels + rail + tiles + edits + factory() + catBand +
      (older.length ? '<section class="sec pad" style="padding-top:72px">' + secHead("Archive", t("archive"), '<a class="link-u" href="' + pageUrl("collections") + '">' + t("allCollections") + '</a>') + '<div class="arch">' +
        older.map(function (s) {
          return '<a class="arch-card ' + s.cls + '" href="' + seasonUrl(s.id) + '"><div class="am">' + (s.cover ? '<img src="' + esc(url(s.cover)) + '" alt="" loading="lazy">' : lines() + '<span class="mark">' + logo("mark") + '</span>') + '</div>' +
            '<div class="at">' + (EN ? "" : '<span class="latin">' + s.latin + '</span>') + '<strong>' + s.label + '</strong><small>' + cnt(countOf(s.id), "models") + '</small></div></a>';
        }).join("") + '</div></section>' : "") +
      '<section class="sec pad" id="about" style="padding-block:96px"><div class="about"><div class="txt"><span class="eyebrow latin">About VINTRO</span><h2 style="font-size:clamp(1.8rem,3.4vw,2.6rem)">' + t("aboutUs") + '</h2><p>' + esc(bt("about")) + '</p><a class="link-u" style="justify-self:start" href="' + pageUrl("about") + '">' + t("readMore") + '</a>' +
      founderCard() + '</div>' +
      '<div class="contact-card" id="contact">' + lines() + '<h3>' + t("contact") + '</h3><dl>' +
      [[B.phone, B.phone_label], [B.phone2, B.phone2_label]].filter(function (x) { return x[0]; }).map(function (x) { return '<div><dt class="latin">' + esc(EN ? (phoneLabel(x[1]) || "Phone") : (x[1] || "Phone")) + '</dt><dd><a class="ltr" ' + tel(x[0]) + '>' + esc(x[0]) + '</a></dd></div>'; }).join("") +
      [B.email, B.email2].filter(Boolean).map(function (m) { return '<div><dt class="latin">Email</dt><dd><a class="ltr" href="mailto:' + esc(m) + '">' + esc(m) + '</a></dd></div>'; }).join("") +
      (bt("address") ? '<div><dt class="latin">Address</dt><dd>' + esc(bt("address")) + '</dd></div>' : "") + '</dl>' +
      (wa ? '<a class="btn wa block" href="https://wa.me/' + wa + '" target="_blank" rel="noopener">' + IC.wa + t("waUs") + '</a>' : "") + '</div></div></section>';
    rails();
    heroLife();
    if (location.hash) { var el = document.getElementById(location.hash.slice(1)); if (el) setTimeout(function () { el.scrollIntoView(); }, 50); }
  }

  /* three garments the sketch changes between: crew neck sweater, polo, half-zip */
  function P_(d, dl) { return '<path class="d" d="' + d + '" pathLength="1" style="--dl:' + (dl || 0) + 's"/>'; }
  var zipTeeth = (function () { var z = "", y; for (y = 92; y <= 226; y += 6) z += "M297 " + y + "h6"; return z; })();
  var STYLES = [
    ["KNITWEAR · CREW NECK", P_("M232 99Q300 156 368 99", 2.3)],
    ["KNITWEAR · POLO", P_("M245 95L262 136L300 128L338 136L355 95", .1) + P_("M292 128V206H308V128", .5) +
      '<g class="btns"><circle cx="300" cy="150" r="2.6"/><circle cx="300" cy="171" r="2.6"/><circle cx="300" cy="192" r="2.6"/></g>'],
    ["KNITWEAR · HALF-ZIP", P_("M245 95L249 70Q300 82 351 70L355 95", .1) + P_("M300 78V232", .5) +
      '<path class="teeth" d="' + zipTeeth + '"/><rect class="pull" x="295.5" y="86" width="9" height="16" rx="2"/>']
  ];
  /* moves every point of a path outward from a centre, for the cutting line around the sweater */
  function grow(d, k, cx, cy) {
    var i = 0; return d.replace(/-?\d+(\.\d+)?/g, function (n) { var v = +n, r = (i++ % 2 ? cy + (v - cy) * k : cx + (v - cx) * k); return r.toFixed(1); });
  }
  /* loose golden threads waving across the background */
  function threads() {
    var w = [
      ["M-20 140C180 60 320 240 520 150S860 40 1020 120", "M-20 120C200 200 340 70 520 170S880 210 1020 90", 11],
      ["M-20 420C160 360 360 520 560 430S880 330 1020 400", "M-20 460C200 520 380 360 560 450S860 520 1020 430", 14],
      ["M-20 560C220 500 420 600 640 540S900 500 1020 560", "M-20 540C180 600 440 500 640 570S920 590 1020 520", 17]
    ];
    return '<svg class="hx-threads" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">' + w.map(function (x, i) {
      var a = '<animate attributeName="d" values="' + x[0] + ";" + x[1] + ";" + x[0] + '" dur="' + x[2] + 's" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/>';
      return '<path class="tw" d="' + x[0] + '">' + a + '</path><path class="tw spark" style="--sd:' + (6 + i * 2) + 's;--sl:' + (-i * 2.3) + 's" d="' + x[0] + '" pathLength="1">' + a + '</path>';
    }).join("") + '</svg>';
  }
  /* keeps the opening alive: floating dust, the drawing following the mouse, and the garment changing every few seconds */
  function heroLife() {
    var hx = $(".hx.art"); if (!hx) return;
    var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dust = $(".hx-dust"), h = "", i;
    for (i = 0; i < 26; i++) h += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;--s:' + (1 + Math.random() * 2.4).toFixed(1) + 'px;--t:' + (12 + Math.random() * 16).toFixed(1) + 's;--l:-' + (Math.random() * 28).toFixed(1) + 's;--x:' + (Math.random() * 60 - 30).toFixed(0) + 'px"></i>';
    dust.innerHTML = h;
    if (still) return;
    if (window.matchMedia && matchMedia("(hover: hover)").matches) {
      var raf = 0;
      hx.addEventListener("mousemove", function (e) {
        var r = hx.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        cancelAnimationFrame(raf); raf = requestAnimationFrame(function () { hx.style.setProperty("--px", x.toFixed(3)); hx.style.setProperty("--py", y.toFixed(3)); });
      });
      hx.addEventListener("mouseleave", function () { hx.style.setProperty("--px", 0); hx.style.setProperty("--py", 0); });
    }
    var k = 0, det = $("#hx-det"), lab = $("#hx-style");
    setInterval(function () {
      if (document.hidden || !det) return;
      det.classList.add("out");
      setTimeout(function () { k = (k + 1) % STYLES.length; det.innerHTML = STYLES[k][1].replace(/--dl:[\d.]+s/g, function (m) { return "--dl:" + (parseFloat(m.slice(5)) % 1 + .1) + "s"; }); lab.textContent = STYLES[k][0]; det.classList.remove("out"); }, 650);
    }, 7000);
  }
  /* the opening drawing: a pattern-maker's sketch of a knit sweater with seams, stitches, measurements and a sewing needle */
  function sketch() {
    function L(d, cls, delay, extra) { return '<path class="' + cls + '" d="' + d + '"' + (delay != null ? ' style="--dl:' + delay + 's"' : "") + (extra || "") + '/>'; }
    var ribs = "", i;
    for (i = 206; i <= 396; i += 7) ribs += "M" + i + " 532V558";
    for (i = 0; i <= 6; i++) { ribs += "M" + (86 + i * 7.6) + " " + (432 + i * 1.6) + "L" + (82 + i * 7.6) + " " + (455 + i * 1.6); ribs += "M" + (514 - i * 7.6) + " " + (432 + i * 1.6) + "L" + (518 - i * 7.6) + " " + (455 + i * 1.6); }
    var ticks = "";
    for (i = 0; i <= 600; i += 10) { var k = i % 100 === 0 ? 9 : i % 50 === 0 ? 6 : 3.5; ticks += "M" + (20 + i) + " 20v" + k + "M20 " + (20 + i) + "h" + k; }
    var outline = "M245 95Q300 138 355 95L435 120Q472 134 486 200L520 455L472 465L405 250L400 560L200 560L195 250L128 465L80 455L114 200Q128 134 165 120Z";
    return '<svg class="hx-svg" viewBox="0 0 640 640" role="img" aria-label="VINTRO knitwear sketch"><defs>' +
      '<pattern id="hx-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" stroke-width=".35"/></pattern>' +
      '<pattern id="hx-knit" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M1 1.5L4.5 7.5L8 1.5" fill="none" stroke="currentColor" stroke-width=".55"/></pattern>' +
      '<marker id="hx-ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="currentColor" stroke-width="1.1"/></marker>' +
      '<clipPath id="hx-body"><path d="' + outline + '"/></clipPath>' +
      '<mask id="hx-sew" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="640"><rect x="0" y="0" height="640" width="204" fill="#fff"><animate attributeName="width" values="204;396;396" keyTimes="0;.82;1" dur="6s" repeatCount="indefinite"/></rect></mask></defs>' +
      '<rect class="g-grid" x="20" y="20" width="600" height="600" fill="url(#hx-grid)"/>' +
      '<path class="g-ticks" d="' + ticks + '"/>' +
      '<g class="g-tag latin"><text x="40" y="58">VINTRO · TECH SKETCH</text><text x="40" y="74" class="sm" id="hx-style">' + STYLES[0][0] + '</text></g>' +
      '<g transform="translate(20 20)">' +
        '<rect class="g-fill" x="60" y="80" width="480" height="500" fill="url(#hx-knit)" clip-path="url(#hx-body)"/>' +
        L(outline, "d", .2, ' pathLength="1"') +
        '<g class="det" id="hx-det">' + STYLES[0][1] + '</g>' +
        '<path class="glint" d="' + outline + '" pathLength="1"/>' +
        '<path class="cut" d="' + grow(outline, 1.075, 300, 330) + '"/>' +
        '<g class="scis"><animateMotion dur="22s" repeatCount="indefinite" rotate="auto" path="' + grow(outline, 1.075, 300, 330) + '"/>' +
          '<g class="bl"><animateTransform attributeName="transform" type="rotate" values="-14;0;-14" dur=".55s" repeatCount="indefinite"/><path d="M0 0L19 -3.2L19 -1.2Z"/><circle cx="-9" cy="-5.5" r="4.2"/><path d="M0 0L-5.5 -3.5"/></g>' +
          '<g class="bl"><animateTransform attributeName="transform" type="rotate" values="14;0;14" dur=".55s" repeatCount="indefinite"/><path d="M0 0L19 3.2L19 1.2Z"/><circle cx="-9" cy="5.5" r="4.2"/><path d="M0 0L-5.5 3.5"/></g>' +
          '<circle class="piv" r="1.4"/></g>' +
        L("M200 530H400", "d", 2.5, ' pathLength="1"') +
        L("M84 431L135 441M516 431L465 441", "d", 2.7, ' pathLength="1"') +
        '<path class="ribs" d="' + ribs + '"/>' +
        L("M246 103L170 126M354 103L430 126M168 126Q186 190 198 250M432 126Q414 190 402 250M198 256L202 552M402 256L398 552", "st") +
        '<path class="st sew" d="M204 525H396" mask="url(#hx-sew)"/>' +
        '<g class="ms"><path d="M200 300H400" marker-start="url(#hx-ar)" marker-end="url(#hx-ar)"/><text x="300" y="290">CHEST · 56</text>' +
          '<path class="gd" d="M440 95H572M412 560H572"/><path d="M560 98V557" marker-start="url(#hx-ar)" marker-end="url(#hx-ar)"/><text x="0" y="0" transform="translate(576 330) rotate(90)">LENGTH · 72</text>' +
          '<path d="M96 186L61 438" marker-start="url(#hx-ar)" marker-end="url(#hx-ar)"/><text x="0" y="0" transform="translate(66 300) rotate(-82)">SLEEVE · 64</text></g>' +
        '<g class="needle"><animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.82;1" calcMode="linear" path="M204 525H396"/>' +
          '<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -11;0 0" dur=".42s" repeatCount="indefinite"/>' +
          '<path d="M0 -62V-3" class="nd"/><path d="M-1.6 -60V-6L0 0L1.6 -6V-60Z" class="nf"/><ellipse cx="0" cy="-54" rx=".8" ry="3" class="ne"/>' +
          '<path d="M0 -54C14 -70 26 -96 70 -118" class="th"/></g></g>' +
      '</g></svg>';
  }
  /* a tailor's tape measure that slides along the bottom of the opening */
  function tape() {
    var t1 = "", n = "", i;
    for (i = 0; i <= 150; i++) { var x = i * 12; t1 += "M" + x + " 0v" + (i % 10 === 0 ? 14 : i % 5 === 0 ? 10 : 6); if (i % 10 === 0 && i) n += '<text x="' + x + '" y="27">' + i + '</text>'; }
    var one = '<svg width="1800" height="34" viewBox="0 0 1800 34"><path d="' + t1 + '"/>' + n + '</svg>';
    return '<div class="hx-tape" aria-hidden="true" dir="ltr"><div class="tp-track">' + one + one + '</div></div>';
  }

  /* arrows and progress bar under a row of cards */
  function rails() {
    document.querySelectorAll(".rail").forEach(function (r) {
      var st = r.querySelector(".strip"), bar = r.querySelector(".r-bar i"); if (!st) return;
      function upd() { var m = st.scrollWidth - st.clientWidth, f = m > 0 ? Math.abs(st.scrollLeft) / m : 1; bar.style.width = Math.max(12, Math.round((st.clientWidth / st.scrollWidth) * 100)) + "%"; bar.style.insetInlineStart = (f * (100 - parseFloat(bar.style.width))) + "%"; r.classList.toggle("no-ctl", m <= 2); }
      st.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd); upd();
      r.addEventListener("click", function (e) { var b = e.target.closest("[data-rail]"); if (!b) return; st.scrollBy({ left: +b.getAttribute("data-rail") * st.clientWidth * .85 * (EN ? 1 : -1), behavior: "smooth" }); });
    });
  }
  /* the founder, with a photo when one is added in the CMS */
  function founderCard() {
    if (!bt("founder")) return "";
    return '<div class="founder"><span class="m">' + (B.founder_photo ? '<img src="' + esc(url(B.founder_photo)) + '" alt="">' : logo("mark")) + '</span><div><b>' + esc(bt("founder")) + '</b><small>' + esc(bt("founder_title")) + '</small></div></div>';
  }
  /* "inside our factory": shown only once there are photos, numbers or text for it in the CMS */
  function factory() {
    var imgs = arr(B.factory_images).filter(Boolean), stats = arr(B.stats).filter(function (x) { return x && x.value; }), txt = bt("factory_text");
    if (!imgs.length && !stats.length && !txt) return "";
    return '<section class="fx"><div class="pad fx-in"><div class="fx-txt"><span class="latin eyebrow">Inside the factory</span><h2>' + t("factoryH") + '</h2>' + (txt ? '<p>' + esc(txt) + '</p>' : "") +
      (stats.length ? '<dl class="stats">' + stats.map(function (x, i) { return '<div><dt class="ltr">' + esc(x.value) + '</dt><dd>' + esc(vt(x, "label", i, "stats")) + '</dd></div>'; }).join("") + '</dl>' : "") + '</div>' +
      (imgs.length ? '<div class="fx-pics n' + Math.min(imgs.length, 3) + '">' + imgs.slice(0, 3).map(function (im) { return '<div class="fx-pic"><img src="' + esc(url(im)) + '" alt="" loading="lazy"></div>'; }).join("") + '</div>' : "") + '</div></section>';
  }

  /* ---------- printable catalogue: every model of a season, six to a page ---------- */
  function catalog() {
    var id = normSeason(QS.get("id") || (LATEST[0] && LATEST[0].id) || ""), s = seasonOf(id);
    if (!s) { $("#main").innerHTML = '<div class="loading pad">' + t("notFoundColl") + ' <a class="link-u" href="' + pageUrl("collections") + '">' + t("allCollections") + '</a></div>'; return; }
    var items = P.filter(function (p) { return p.season === s.id; });
    document.title = t("catalogH") + " · " + s.label + " — VINTRO";
    function item(p) {
      var cols = arr(p.colors), im = heroImg(p), name = px(p, "name");
      return '<article class="ci"><div class="ci-m">' + (im ? pic(im, .78, name, false) : art(p, hexOf(cols[0] || {}))) + '</div><div class="ci-t">' +
        '<b class="ltr">' + esc(p.code || "") + '</b><strong>' + esc(name) + '</strong>' +
        '<span class="ci-c">' + cols.map(function (c) { return '<i style="background:' + esc(hexOf(c)) + '"></i>'; }).join("") + '</span>' +
        '<small>' + esc(cols.map(colL).join(" · ")) + '</small>' + (arr(p.sizes).length ? '<small class="ltr">' + esc(arr(p.sizes).join(" · ")) + '</small>' : "") + '</div></article>';
    }
    var pages = [];
    for (var i = 0; i < items.length; i += 6) pages.push(items.slice(i, i + 6));
    var contact = [B.whatsapp ? "WhatsApp " + B.whatsapp : "", B.email || ""].filter(Boolean);
    $("#main").innerHTML =
      '<div class="cat-tools pad"><div><span class="latin eyebrow">Catalogue</span><h1>' + t("catalogH") + '</h1><p class="muted">' + t("pdfHint") + '</p></div><div class="band-btns">' +
      '<select id="cat-s" aria-label="' + t("season") + '">' + SEASONS.map(function (x) { return '<option value="' + x.id + '"' + (x.id === s.id ? " selected" : "") + '>' + x.label + '</option>'; }).join("") + '</select>' +
      '<button class="btn solid" type="button" id="cat-print">' + t("savePdf") + '</button></div></div>' +
      '<div class="book">' +
      '<section class="sheet cover">' + lines() + '<div class="cv-in"><span class="cv-logo">' + logo("full") + '</span><span class="latin cv-l">' + s.latin + '</span><h2>' + s.label + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : "") + '<span class="cv-n">' + cnt(items.length, "models") + '</span></div>' +
      '<div class="cv-foot">' + contact.map(function (c) { return '<span class="ltr">' + esc(c) + '</span>'; }).join("") + (bt("address") ? '<span>' + esc(bt("address")) + '</span>' : "") + '</div></section>' +
      pages.map(function (pg, n) {
        return '<section class="sheet"><header class="sh-head"><span class="sh-logo">' + logo("word") + '</span><span>' + s.label + '</span></header><div class="sh-grid">' + pg.map(item).join("") + '</div>' +
          '<footer class="sh-foot"><span class="ltr">' + esc(contact.join("  ·  ")) + '</span><span>' + num(n + 2) + '</span></footer></section>';
      }).join("") + '</div>';
    $("#cat-print").addEventListener("click", function () { window.print(); });
    $("#cat-s").addEventListener("change", function (e) { var q = new URLSearchParams(location.search); q.set("id", e.target.value); location.search = q.toString(); });
  }

  function collection() {
    var id = document.body.getAttribute("data-season") || QS.get("id"), s = seasonOf(id);
    if (!s) { $("#main").innerHTML = '<div class="loading pad">' + t("notFoundColl") + ' <a class="link-u" href="' + pageUrl("collections") + '">' + t("allCollections") + '</a></div>'; return; }
    document.title = s.label + " — VINTRO";
    var items = P.filter(function (p) { return p.season === s.id; }), cats = catsOf(items);
    var cat = QS.get("cat") || "all"; if (cat !== "all" && cats.indexOf(cat) < 0) cat = "all";
    var big = false; try { big = localStorage.getItem("vintro-view") === "2"; } catch (e) {}
    $("#main").innerHTML = '<header class="col-head pad">' + (EN ? '<span class="latin">' + t("collections") + '</span>' : '<span class="latin">' + s.latin + '</span>') + '<h1>' + s.label + '</h1>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : "") + (items.length ? '<a class="link-u col-cat" href="' + catalogUrl(s.id) + '">' + t("dlCatalog") + '</a>' : "") + '</header>' +
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
      var msg = askMsg(p, c, size);
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
        '<button class="btn block" type="button" id="ask-sample">' + t("sample") + '</button>' +
        (B.email ? '<a class="link-u mail-l" href="mailto:' + esc(B.email) + '?subject=' + encodeURIComponent((EN ? "Enquiry about " : "استفسار عن ") + (p.code || name)) + '&body=' + encodeURIComponent(msg) + '">' + t("mailUs") + '</a>' : "") +
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
      if (e.target.closest("#ask-sample")) { sampleForm(p, cols[ci], size); return; }
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
      return { title: vt(v, "title", i, "values"), text: vt(v, "text", i, "values") };
    });
    $("#main").innerHTML = pageHead("About VINTRO", t("aboutUs"), bt("tagline")) +
      '<section class="pad about-hero"><div class="ab-mark">' + lines() + logo("full") + '</div><div class="ab-txt"><p class="big">' + esc(bt("headline")) + '</p><p>' + esc(bt("about")) + '</p>' +
      (bt("story") ? '<p>' + esc(bt("story")) + '</p>' : "") +
      founderCard() + '</div></section>' + factory() +
      (values.length ? '<section class="sec pad">' + secHead("What we stand for", t("valuesH")) + '<div class="values">' +
        values.map(function (v) { return '<div class="value"><span class="vm">' + logo("mark") + '</span><h3>' + esc(v.title) + '</h3><p>' + esc(v.text || "") + '</p></div>'; }).join("") + '</div></section>' : "") +
      '<section class="band"><div class="pad band-in"><div><span class="latin">Wholesale</span><h2>' + t("bandH") + '</h2><p>' + t("bandP") + '</p></div><div class="band-btns"><a class="btn light" href="' + pageUrl("wholesale") + '">' + t("howOrder") + '</a>' +
      (waLink() ? '<a class="btn wa" href="' + waLink(EN ? "Hello VINTRO, I'd like to learn more about your products." : "مرحباً VINTRO، أرغب بالتعرّف على منتجاتكم.") + '" target="_blank" rel="noopener">' + IC.wa + t("wa") + '</a>' : "") + '</div></div></section>';
  }

  function wholesale() {
    document.title = t("wholesaleFull") + " — VINTRO";
    var steps = (LANG !== "ar" && LANG !== "en" && X.steps) || (EN ? [
      ["Choose your models", "Browse the collections and note the model numbers you're interested in."],
      ["Send your order", "Send us each model number with the colours, sizes and quantities you need."],
      ["Get a quote", "We reply with a price and delivery date based on quantity and model."],
      ["Production & delivery", "Once you confirm, we start production and keep you updated until delivery."]
    ] : [
      ["اختر الموديلات", "تصفّح المجموعات وسجّل أرقام الموديلات التي تهمّك."],
      ["أرسل طلبك", "أرسل لنا رقم كل موديل مع الألوان والمقاسات والكمية المطلوبة."],
      ["عرض السعر", "نرسل لك عرض سعر وموعد تسليم حسب الكمية والموديل."],
      ["التصنيع والتسليم", "بعد التأكيد نبدأ الإنتاج ونتابع معك حتى استلام الطلبية."]
    ]);
    var faq = arr(B.faq).filter(function (f) { return f && f.q; }).map(function (f, i) {
      return { q: vt(f, "q", i, "faq"), a: vt(f, "a", i, "faq") };
    });
    var tpl = EN ? "Name / shop name:\nCity and country:\n\nModel number:\nColours:\nSizes and quantity:\n\nModel number:\nColours:\nSizes and quantity:"
      : "الاسم / اسم المحل:\nالمدينة والبلد:\n\nرقم الموديل:\nالألوان:\nالمقاسات والكمية:\n\nرقم الموديل:\nالألوان:\nالمقاسات والكمية:";
    $("#main").innerHTML = pageHead("Wholesale", t("wholesaleFull"), t("wsLead")) +
      '<section class="pad steps">' + steps.map(function (s, i) { return '<div class="step"><span class="n latin">' + String(i + 1).padStart(2, "0") + '</span><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div>'; }).join("") + '</section>' +
      '<section class="sec pad"><div class="ws-grid"><div>' + secHead("Order template", t("tplH")) +
      '<p class="muted">' + t("tplP") + '</p><pre class="tpl" id="tpl">' + esc(tpl) + '</pre>' +
      '<div class="band-btns">' + (waLink() ? '<a class="btn wa" id="tpl-wa" href="#" target="_blank" rel="noopener">' + IC.wa + t("sendWa") + '</a>' : "") + '<button class="btn" id="tpl-copy" type="button">' + t("copyTpl") + '</button></div></div>' +
      (faq.length ? '<div>' + secHead("FAQ", t("faqH")) + faq.map(function (f, i) { return '<details class="acc"' + (i ? "" : " open") + '><summary>' + esc(f.q) + '</summary><div class="in">' + esc(f.a || "") + '</div></details>'; }).join("") + '</div>' : "") + '</div></section>' +
      '<section class="smp"><div class="pad smp-in"><div><span class="latin">Samples</span><h2>' + t("sampleH") + '</h2><p>' + t("sampleP") + '</p></div><div class="band-btns">' +
      '<button class="btn gold" type="button" id="ws-sample">' + t("sample") + '</button>' + (LATEST.length ? '<a class="btn light" href="' + catalogUrl(LATEST[0].id) + '">' + t("dlCatalog") + '</a>' : "") + '</div></div></section>';
    $("#ws-sample").addEventListener("click", function () { sampleForm(null, null, null); });
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
  /* Turkish, German, French and Italian load their texts first; if the file can't load, the page shows in English */
  function loadScript(src) { return new Promise(function (ok) { var sc = document.createElement("script"); sc.src = ROOT + src; sc.onload = sc.onerror = function () { ok(); }; document.head.appendChild(sc); }); }
  function loadCrops() { return loadScript("assets/crops.js?v=1").then(function () { CROPS = window.VINTRO_CROPS || {}; }); }
  function loadLang() {
    if (LANG === "ar" || LANG === "en") return Promise.resolve();
    return new Promise(function (ok) {
      var s = document.createElement("script"); s.src = ROOT + "assets/i18n.js?v=1";
      s.onload = s.onerror = function () {
        X = (window.VINTRO_I18N && window.VINTRO_I18N[LANG]) || {}; XD = X.defaults || {}; ok();
      };
      document.head.appendChild(s);
    });
  }
  Promise.all([loadLang(), loadCrops()]).then(function () { return (LOCAL || FRAMED) ? loadPreview() : Promise.all([getJSON("data/brand.json"),
    /* models live in data/catalog.json ({ "models": [...] }); the older data/products.json is read only if that file is missing */
    getJSON("data/catalog.json").then(function (c) { if (!c || !Array.isArray(c.models)) throw 0; return c.models; }).catch(function () { return getJSON("data/products.json"); }),
    getJSON("data/collections.json").catch(function () { return []; })]); }).then(function (res) {
    B = res[0] || {}; P = arr(res[1]).filter(function (p) { return p && p.name; });
    P.forEach(function (p) { p.season = normSeason(p.season); });
    buildSeasons(res[2]);
    var qid = QS.get("id");
    header(PAGE === "season" ? (document.body.getAttribute("data-season") || qid) : (PAGE === "collections" && qid) ? qid : PAGE);
    var R = { home: home, season: collection, model: model, collections: collections, about: about, wholesale: wholesale, contact: contact, catalog: catalog };
    (R[PAGE] || home)();
    footer();
    reveal();
  }).catch(function () {
    $("#main").innerHTML = '<div class="loading pad">' + t("loadErr") + '</div>';
  });
})();
