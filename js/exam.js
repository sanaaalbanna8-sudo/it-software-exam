(() => {
  // بعد Deploy لـ Apps Script الصقي رابط الـ Web app هنا:
  const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwjYaW4Rt7r6icZHXzAEDALGBdB50tXxhVtNWHC9eSHSZ6T3pMjT0HhDiTVAijNCRiT/exec";

  const BANK = [
    {
      section: "OS types",
      tag: "الجزء 1 · أنواع أنظمة التشغيل",
      scene: "مستشفى يزرع منظم ضربات قلب (pacemaker). أي تأخير في الاستجابة قد يهدد حياة المريض.",
      ask: "أي نوع نظام تشغيل الأنسب هنا؟",
      choices: [
        "Real time (RTOS) · الزمن الحقيقي",
        "Multitasking · single-user",
        "Multi-user",
        "Single-task · single-user"
      ],
      answer: 0,
      why: "الاستجابة الفورية بلا تأخير ملحوظ = RTOS. السلامة هنا أهم من سهولة سطح المكتب."
    },
    {
      section: "OS types",
      tag: "الجزء 1 · أنواع أنظمة التشغيل",
      scene: "غسالة ملابس ذكية: برنامجها داخل الجهاز نفسه، وظيفتها ثابتة (غسيل/تجفيف)، ولا تحتاج Windows كامل.",
      ask: "هذا مثال على أي نوع؟",
      choices: [
        "Multi-user",
        "Embedded · مدمج",
        "Multitasking · single-user",
        "Command line OS"
      ],
      answer: 1,
      why: "Embedded = نظام مدمج في العتاد للتحكم بجهاز محدد بوظيفة ثابتة."
    },
    {
      section: "OS types",
      tag: "الجزء 1 · أنواع أنظمة التشغيل",
      scene: "جدّة اشتريت هاتفًا رخيصًا للمكالمات والرسائل فقط. لا تطبيقات متزامنة ولا متصفح.",
      ask: "أي تصنيف يناسب هذا الجهاز؟",
      choices: [
        "Multitasking · single-user",
        "Multi-user",
        "Single-task · single-user · مهمة واحدة · مستخدم واحد",
        "Real time (RTOS)"
      ],
      answer: 2,
      why: "تطبيق واحد / وظيفة واضحة لمستخدم واحد = Single-task · single-user."
    },
    {
      section: "OS types",
      tag: "الجزء 1 · أنواع أنظمة التشغيل",
      scene: "طالب يفتح معًا: متصفح + مستند Word + موسيقى على لابتوبه الشخصي.",
      ask: "هذا يصف أي نوع؟",
      choices: [
        "Multi-user",
        "Single-task · single-user",
        "Embedded",
        "Multitasking · single-user · متعدد المهام · مستخدم واحد"
      ],
      answer: 3,
      why: "مستخدم واحد + عدة تطبيقات في آن = Multitasking · single-user (مثل PC والهاتف الذكي)."
    },
    {
      section: "OS types",
      tag: "الجزء 1 · أنواع أنظمة التشغيل",
      scene: "في مدرسة، 200 طالب يدخلون نفس الخادم معًا لرفع الواجبات وطباعة الملفات.",
      ask: "أي نوع نظام تشغيل يلائم هذا السيناريو؟",
      choices: [
        "Single-task · single-user",
        "Multitasking · single-user فقط",
        "Multi-user · متعدد المستخدمين",
        "Embedded"
      ],
      answer: 2,
      why: "عدة مستخدمين على نفس المورد (خادم/سحابة) = Multi-user."
    },
    {
      section: "OS types",
      tag: "الجزء 1 · أنواع أنظمة التشغيل",
      scene: "وسادة هوائية في سيارة يجب أن تنتفخ خلال أجزاء من الثانية عند الاصطدام.",
      ask: "المعيار الأهم لاختيار نوع النظام هنا هو…",
      choices: [
        "أن يدعم عشرات المستخدمين معًا",
        "أن يبدو جميلًا مثل Windows",
        "أن يستجيب في الزمن الحقيقي بلا تأخير خطر",
        "أن يشغّل ألعابًا ثقيلة"
      ],
      answer: 2,
      why: "عندما يكون التأخير خطرًا على السلامة نلجأ لـ Real time (RTOS)."
    },
    {
      section: "OS types",
      tag: "الجزء 1 · مقارنة وفهم",
      scene: "سارة تستخدم هاتفها الذكي وحدها وتفتح واتساب وخرائط ويوتيوب معًا. أحمد وزملاؤه يعدّلون ملف Google Sheets واحد من أجهزة مختلفة.",
      ask: "ما الفرق الصحيح؟",
      choices: [
        "الاثنان Multi-user لأن في تطبيقات كثيرة",
        "سارة: Multitasking · single-user · أحمد وفريقه: Multi-user",
        "سارة: Single-task · أحمد: Embedded",
        "لا فرق — الاثنان نفس نوع نظام التشغيل"
      ],
      answer: 1,
      why: "المفتاح: عدد المستخدمين على نفس المورد. سارة وحدها بعدة تطبيقات؛ الفريق يشارك موردًا واحدًا."
    },
    {
      section: "OS types",
      tag: "الجزء 1 · مقارنة وفهم",
      scene: "طالب يقول: «التلفاز الذكي Embedded، ومنظم ضربات القلب كمان Embedded… يعني نفس الفكرة تمامًا؟»",
      ask: "أي رد أدق؟",
      choices: [
        "نعم متطابقان 100% ولا فرق أبدًا",
        "كلاهما قد يكون مدمجًا، لكن الـ pacemaker يحتاج غالبًا خاصية الزمن الحقيقي لأن التأخير خطر",
        "التلفاز Multi-user والـ pacemaker Single-task فقط",
        "الـ Embedded لا يُستخدم في الأجهزة الطبية"
      ],
      answer: 1,
      why: "الجهاز الطبي يجمع فكرة Embedded مع حاجة RTOS للاستجابة الفورية."
    },
    {
      section: "OS role",
      tag: "الجزء 1 · مهام نظام التشغيل",
      scene: "وصّلت طابعة جديدة باللابتوب، وظهرت رسالة تثبيت تعريف الجهاز ثم بدأت الطباعة.",
      ask: "أي دور لنظام التشغيل ظهر هنا؟",
      choices: [
        "Multitasking",
        "Device drivers · تعريفات الأجهزة",
        "Multi-user licensing",
        "Menu-based UI"
      ],
      answer: 1,
      why: "Device drivers تربط الجهاز الرقمي بالطرفيات مثل الطابعات ولوحة المفاتيح والشاشات."
    },
    {
      section: "OS role",
      tag: "الجزء 1 · مهام نظام التشغيل",
      scene: "فتح الطالب 15 تطبيقًا مع فيديوهات كثيرة، فصار اللابتوب بطيئًا جدًا.",
      ask: "ما التفسير الأدق حسب الدرس؟",
      choices: [
        "نظام التشغيل تعطّل نهائيًا ولا يمكن إصلاحه",
        "الذاكرة وقوة المعالجة محدودة — كثرة التطبيقات تبطئ الأداء",
        "لأن الواجهة كانت Menu-based",
        "لأن الجهاز Embedded"
      ],
      answer: 1,
      why: "من أدوار OS إدارة الذاكرة، لكن الموارد محدودة (Limit)."
    },
    {
      section: "OS role",
      tag: "الجزء 1 · مهام نظام التشغيل",
      scene: "في الشركة: طباعة عن بُعد، حسابات مستخدمين، ونسخ احتياطي للملفات على الشبكة.",
      ask: "هذا يرتبط أساسًا بأي دور؟",
      choices: [
        "Networking",
        "Adapted UI",
        "Single-task OS",
        "File type JPEG"
      ],
      answer: 0,
      why: "Networking: الوصول لموارد الشبكة مثل remote printing وإدارة المستخدمين وfile backup."
    },
    {
      section: "OS role",
      tag: "الجزء 1 · مهام نظام التشغيل",
      scene: "نظام التشغيل يفحص باستمرار محاولات الاختراق ويجمع بيانات عن صحة النظام.",
      ask: "هذا الدور اسمه…",
      choices: [
        "Multitasking",
        "Security",
        "Embedded",
        "Graphical only"
      ],
      answer: 1,
      why: "Security من مهام نظام التشغيل ضد الهجمات الإلكترونية."
    },
    {
      section: "UI",
      tag: "الجزء 1 · الواجهات",
      scene: "طفل صغير يستخدم جهازًا لأول مرة: ينقر أيقونات ويفتح نوافذ بالفأرة بلا كتابة أوامر.",
      ask: "الواجهة الأنسب؟",
      choices: [
        "Command line (CLI)",
        "Graphical (GUI)",
        "Real time OS",
        "Hex editor"
      ],
      answer: 1,
      why: "GUI سهلة للمستخدم الجديد: نوافذ وأيقونات وقوائم ومؤشر — بلا برمجة."
    },
    {
      section: "UI",
      tag: "الجزء 1 · الواجهات",
      scene: "فني شبكات يضبط راوتر عبر أوامر نصية في terminal لأنه يحتاج تحكمًا أدق.",
      ask: "أي واجهة يستخدم؟",
      choices: [
        "Graphical (GUI)",
        "Adapted فقط",
        "Command line (CLI)",
        "Menu-based على ATM"
      ],
      answer: 2,
      why: "CLI للمطورين وفنيي IT والشبكات: مرونة أعلى وتحكم أدق، مع حاجة لمعرفة الأوامر."
    },
    {
      section: "UI",
      tag: "الجزء 1 · الواجهات",
      scene: "عند الصراف الآلي تظهر قائمة: سحب · رصيد · تحويل · خروج. نفس الفكرة في آلة تذاكر أو ميكروويف.",
      ask: "هذا نوع الواجهة…",
      choices: [
        "Command line",
        "Menu-based",
        "Multi-user OS",
        "Raw file interface"
      ],
      answer: 1,
      why: "Menu-based: وظائف عبر قائمة جاهزة — شائعة في ATM والطابعات وآلات التذاكر."
    },
    {
      section: "UI",
      tag: "الجزء 1 · الواجهات",
      scene: "طالب ضعيف البصر يحتاج خطًا أكبر، تباين ألوان أعلى، وأزرار أوضح على الشاشة.",
      ask: "ماذا نسمي هذا التكييف؟",
      choices: [
        "Adapted UI",
        "Embedded OS",
        "Single-task فقط",
        "Multi-user server"
      ],
      answer: 0,
      why: "Adapted = تكييف اللون وحجم الخط والموضع لدعم إمكانية الوصول accessibility."
    },
    {
      section: "UI",
      tag: "الجزء 1 · الواجهات",
      scene: "مقارنة أداء: جهاز ضعيف المواصفات يفتح واجهة ثقيلة مليئة بالرسومات فيصير بطيئًا.",
      ask: "أي جملة صحيحة؟",
      choices: [
        "GUI أخف دائمًا من CLI على التخزين والأداء",
        "GUI غالبًا تزيد المتطلبات على التخزين والأداء مقارنةً بـ CLI أو Menu-based",
        "Menu-based أثقل من كل الواجهات دائمًا",
        "الواجهة لا تؤثر على الأداء أبدًا"
      ],
      answer: 1,
      why: "من الدرس: GUI تستهلك موارد أكثر؛ CLI وMenu-based أخف نسبيًا."
    }
  ];

  const UI4 = [
    "Graphical (GUI)",
    "Command line (CLI)",
    "Menu-based",
    "Adapted"
  ];

  const CLASSIFY_RAW = [
    {
      scene: "مستخدم ينقر أيقونات ويفتح نوافذ بالفأرة على شاشة ويندوز.",
      answer: 0,
      why: "نوافذ + أيقونات + مؤشر = Graphical (GUI)."
    },
    {
      scene: "طفل يفتح لعبة من سطح المكتب بالضغط على صورة البرنامج.",
      answer: 0,
      why: "التفاعل بالأيقونات والصور واجهة رسومية GUI."
    },
    {
      scene: "فني شبكات يكتب أوامر نصية داخل CMD لمعرفة عنوان الـ IP.",
      answer: 1,
      why: "أوامر نصية في سطر الأوامر = Command line (CLI)."
    },
    {
      scene: "مطور يستخدم Terminal لتشغيل أوامر وإعداد السيرفر.",
      answer: 1,
      why: "التحكم النصي الدقيق عبر Terminal = CLI."
    },
    {
      scene: "على الصراف الآلي تظهر خيارات: سحب · رصيد · تحويل · خروج.",
      answer: 2,
      why: "قائمة خيارات جاهزة ثابتة = Menu-based."
    },
    {
      scene: "في الميكروويف تختار من قائمة: تسخين · إذابة · مؤقت.",
      answer: 2,
      why: "وظائف عبر قائمة على جهاز بسيط = Menu-based."
    },
    {
      scene: "آلة تذاكر القطار تعرض قائمة: شراء تذكرة · شحن بطاقة · مساعدة.",
      answer: 2,
      why: "كiosk بقوائم اختيار = Menu-based."
    },
    {
      scene: "طالب ضعيف البصر يكبّر الخط ويرفع تباين الألوان ليسهّل القراءة.",
      answer: 3,
      why: "تكييف الحجم واللون لإمكانية الوصول = Adapted."
    },
    {
      scene: "واجهة تُعدَّل مواضع الأزرار والألوان لمستخدم لديه احتياجات خاصة.",
      answer: 3,
      why: "التكييف حسب احتياج المستخدم = Adapted UI."
    },
    {
      scene: "موظفة تسحب الملفات وتفتح البرامج بالنقر على أيقونات سطح المكتب.",
      answer: 0,
      why: "العمل اليومي بالأيقونات والنوافذ = GUI."
    }
  ];

  const intro = document.getElementById("intro");
  const quiz = document.getElementById("quiz");
  const bridge = document.getElementById("bridge");
  const dnd = document.getElementById("dnd");
  const result = document.getElementById("result");
  const nameInput = document.getElementById("student-name");
  const nameField = document.getElementById("name-field");
  const nameHint = document.getElementById("name-hint");
  const saveStatus = document.getElementById("save-status");
  const qCount = document.getElementById("q-count");
  const examBar = document.getElementById("exam-bar");
  const qTag = document.getElementById("q-tag");
  const qTitle = document.getElementById("q-title");
  const qScene = document.getElementById("q-scene");
  const qChoices = document.getElementById("q-choices");
  const qPrev = document.getElementById("q-prev");
  const qNext = document.getElementById("q-next");
  const poolEl = document.getElementById("dnd-pool");
  const dndLeft = document.getElementById("dnd-left");

  let part1 = [];
  let part2 = [];
  let deck = [];
  let i = 0;
  let selectedId = null;
  let dragId = null;
  let studentName = "";

  function shuffle(arr) {
    const a = [...arr];
    for (let n = a.length - 1; n > 0; n--) {
      const j = Math.floor(Math.random() * (n + 1));
      [a[n], a[j]] = [a[j], a[n]];
    }
    return a;
  }

  function mapQ(q) {
    const indexed = q.choices.map((text, idx) => ({ text, idx }));
    const shuffled = shuffle(indexed);
    const answer = shuffled.findIndex((c) => c.idx === q.answer);
    return {
      section: q.section,
      tag: q.tag,
      scene: q.scene,
      ask: q.ask,
      why: q.why,
      choices: shuffled.map((c) => c.text),
      answer,
      pick: null
    };
  }

  function show(el) {
    [intro, quiz, bridge, dnd, result].forEach((n) => { n.hidden = true; });
    el.hidden = false;
    document.body.classList.toggle("is-dnd", el === dnd);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderQuiz() {
    const q = deck[i];
    qCount.textContent = `الجزء 1: ${i + 1} / ${deck.length}`;
    examBar.style.width = `${((i + 1) / deck.length) * 100}%`;
    qTag.textContent = q.tag;
    qTitle.textContent = q.ask;
    qScene.textContent = q.scene;
    qChoices.innerHTML = "";
    q.choices.forEach((text, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "exam-choice" + (q.pick === idx ? " selected" : "");
      btn.textContent = text;
      btn.addEventListener("click", () => {
        q.pick = idx;
        renderQuiz();
      });
      qChoices.appendChild(btn);
    });
    qPrev.disabled = i === 0;
    qNext.textContent = i === deck.length - 1 ? "إنهاء الجزء 1 ← الجزء 2" : "التالي";
  }

  function placeCard(id, zone) {
    const item = part2.find((x) => x.id === id);
    if (!item) return;
    item.pick = zone === "pool" ? null : Number(zone);
    selectedId = null;
    renderDnd();
  }

  function makeCard(item) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "dnd-card" + (selectedId === item.id ? " selected" : "");
    card.textContent = item.scene;
    card.draggable = true;
    card.dataset.id = item.id;

    card.addEventListener("click", (e) => {
      e.stopPropagation();
      if (selectedId === item.id) selectedId = null;
      else selectedId = item.id;
      renderDnd();
    });

    card.addEventListener("dragstart", (e) => {
      dragId = item.id;
      selectedId = item.id;
      card.classList.add("dragging");
      e.dataTransfer.setData("text/plain", item.id);
      e.dataTransfer.effectAllowed = "move";
    });
    card.addEventListener("dragend", () => {
      dragId = null;
      card.classList.remove("dragging");
    });

    return card;
  }

  function wireDropTarget(el, zone) {
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
      el.classList.add("over");
    });
    el.addEventListener("dragleave", () => el.classList.remove("over"));
    el.addEventListener("drop", (e) => {
      e.preventDefault();
      el.classList.remove("over");
      const id = e.dataTransfer.getData("text/plain") || dragId;
      if (id) placeCard(id, zone);
    });
    el.addEventListener("click", () => {
      if (selectedId) placeCard(selectedId, zone);
    });
  }

  function renderDnd() {
    poolEl.innerHTML = "";
    document.querySelectorAll(".dnd-drop").forEach((drop) => {
      drop.innerHTML = "";
      drop.classList.toggle("has-selected", !!selectedId);
    });

    const unplaced = part2.filter((x) => x.pick === null);
    dndLeft.textContent = String(unplaced.length);

    unplaced.forEach((item) => poolEl.appendChild(makeCard(item)));

    for (let z = 0; z < 4; z++) {
      const drop = document.querySelector(`.dnd-drop[data-drop="${z}"]`);
      part2.filter((x) => x.pick === z).forEach((item) => drop.appendChild(makeCard(item)));
    }
  }

  function sectionStats(all) {
    const map = {};
    all.forEach((q) => {
      if (!map[q.section]) map[q.section] = { ok: 0, total: 0 };
      map[q.section].total += 1;
      if (q.pick === q.answer) map[q.section].ok += 1;
    });
    return map;
  }

  function buildReview(all) {
    const list = document.getElementById("review-list");
    list.innerHTML = "";
    all.forEach((q, n) => {
      const ok = q.pick === q.answer;
      const item = document.createElement("article");
      item.className = "review-item " + (ok ? "ok" : "bad");
      let yours;
      let correct;
      if (q.section === "UI classify") {
        yours = q.pick === null ? "بدون تصنيف" : UI4[q.pick];
        correct = UI4[q.answer];
      } else {
        yours = q.pick === null ? "بدون إجابة" : q.choices[q.pick];
        correct = q.choices[q.answer];
      }
      item.innerHTML = `
        <h3>${n + 1}) ${q.tag || "الجزء 2 · سحب وإفلات"}</h3>
        <p class="exam-scene" style="margin-bottom:8px">${q.scene}</p>
        ${q.ask ? `<p class="pick"><strong>${q.ask}</strong></p>` : ""}
        <p class="pick">إجابتك: <b class="${ok ? "good" : "bad"}">${yours}</b></p>
        <p class="pick">الصحيح: <b class="good">${correct}</b></p>
        <p class="why"><strong>ليش؟</strong> ${q.why}</p>
      `;
      list.appendChild(item);
    });
  }

  function requireName() {
    const name = nameInput.value.trim();
    if (name.length < 2) {
      nameField.classList.add("is-invalid");
      nameHint.textContent = "اكتبي الاسم الثلاثي قبل البدء (إجباري)";
      nameInput.focus();
      return null;
    }
    nameField.classList.remove("is-invalid");
    nameHint.textContent = "الاسم إجباري — الدرجة تُحفظ في جدول العلامات";
    return name;
  }

  function setSaveStatus(kind, text) {
    saveStatus.hidden = false;
    saveStatus.className = "save-status " + kind;
    saveStatus.textContent = text;
  }

  function frac(stats, key) {
    const s = stats[key] || { ok: 0, total: 0 };
    return `${s.ok}/${s.total}`;
  }

  function submitToSheet(payload) {
    if (!SHEETS_ENDPOINT) {
      setSaveStatus("bad", "الدرجة ظهرت هنا، لكن الربط مع الجدول غير مفعّل بعد (يلزم رابط Apps Script).");
      return Promise.resolve(false);
    }
    setSaveStatus("wait", "جاري حفظ الدرجة في جدول العلامات…");
    return fetch(SHEETS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setSaveStatus("ok", "تم حفظ الدرجة في جدول العلامات ✓");
        return true;
      })
      .catch(() => {
        setSaveStatus("bad", "تعذّر حفظ الدرجة في الجدول. تحققي من الاتصال ثم أعيدي المحاولة.");
        return false;
      });
  }

  function finishAll() {
    const unanswered = part2.filter((q) => q.pick === null).length;
    if (unanswered > 0) {
      const go = confirm(`باقي ${unanswered} جملة بلا تصنيف. تسليم الآن؟`);
      if (!go) return;
    }

    const all = [...part1, ...part2];
    const score = all.filter((q) => q.pick === q.answer).length;
    const total = all.length;
    const pct = Math.round((score / total) * 100);
    const name = studentName || nameInput.value.trim();
    document.getElementById("final-score").textContent = `${score}/${total}`;

    let title = "تحتاج مراجعة سريعة";
    let msg = "راجع الإجابات بالأسفل وركّز على الغلط.";
    if (pct >= 90) {
      title = "ممتاز — فهمك واضح";
      msg = "ميّزت الفروقات والتصنيف جيدًا.";
    } else if (pct >= 70) {
      title = "جيد — مع نقاط للمراجعة";
      msg = "الأساس تمام. شوف الأسئلة الغلط في المراجعة.";
    } else if (pct >= 50) {
      title = "مقبول — ثبّت المفاهيم";
      msg = "راجع Embedded مقابل RTOS، وMultitasking مقابل Multi-user، وتصنيف الواجهات.";
    }
    if (name) msg = `${name}: ${msg}`;
    document.getElementById("result-title").textContent = title;
    document.getElementById("result-msg").textContent = msg;

    const labels = {
      "OS types": "أنظمة التشغيل",
      "OS role": "مهام النظام",
      UI: "الواجهات (جزء 1)",
      "UI classify": "سحب وإفلات (جزء 2)"
    };
    const stats = sectionStats(all);
    const box = document.getElementById("breakdown");
    box.innerHTML = "";
    Object.keys(labels).forEach((key) => {
      const s = stats[key] || { ok: 0, total: 0 };
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `<h3>${labels[key]}</h3><p>${s.ok}/${s.total}</p>`;
      box.appendChild(card);
    });

    buildReview(all);
    show(result);

    const part1Score = part1.filter((q) => q.pick === q.answer).length;
    const part2Score = part2.filter((q) => q.pick === q.answer).length;
    submitToSheet({
      timestamp: new Date().toLocaleString("ar-JO", { hour12: false }),
      name,
      score,
      total,
      percent: pct,
      part1: `${part1Score}/${part1.length}`,
      part2: `${part2Score}/${part2.length}`,
      osTypes: frac(stats, "OS types"),
      osRole: frac(stats, "OS role"),
      ui: frac(stats, "UI"),
      uiClassify: frac(stats, "UI classify")
    });
  }

  function endPart1() {
    const unanswered = part1.filter((q) => q.pick === null).length;
    if (unanswered > 0) {
      const go = confirm(`باقي ${unanswered} سؤال في الجزء 1 بلا إجابة. الانتقال للجزء 2؟`);
      if (!go) return;
    }
    show(bridge);
  }

  function startPart1() {
    const name = requireName();
    if (!name) return;
    studentName = name;
    part1 = shuffle(BANK).map(mapQ);
    part2 = shuffle(CLASSIFY_RAW).map((q, idx) => ({
      id: "c" + idx,
      section: "UI classify",
      tag: "الجزء 2 · سحب وإفلات",
      scene: q.scene,
      ask: null,
      why: q.why,
      answer: q.answer,
      pick: null
    }));
    deck = part1;
    i = 0;
    selectedId = null;
    show(quiz);
    renderQuiz();
  }

  function startPart2() {
    selectedId = null;
    show(dnd);
    renderDnd();
  }

  // Wire drop zones once
  wireDropTarget(poolEl, "pool");
  document.querySelectorAll(".dnd-drop").forEach((drop) => {
    wireDropTarget(drop, drop.dataset.drop);
  });
  document.querySelectorAll(".dnd-bin").forEach((bin) => {
    wireDropTarget(bin, bin.dataset.zone);
  });

  document.getElementById("start-exam").addEventListener("click", startPart1);
  document.getElementById("start-part2").addEventListener("click", startPart2);
  document.getElementById("submit-dnd").addEventListener("click", finishAll);

  nameInput.addEventListener("input", () => {
    if (nameField.classList.contains("is-invalid") && nameInput.value.trim().length >= 2) {
      nameField.classList.remove("is-invalid");
      nameHint.textContent = "الاسم إجباري — الدرجة تُحفظ في جدول العلامات";
    }
  });

  qPrev.addEventListener("click", () => {
    if (i > 0) {
      i -= 1;
      renderQuiz();
    }
  });

  qNext.addEventListener("click", () => {
    if (i < deck.length - 1) {
      i += 1;
      renderQuiz();
      return;
    }
    endPart1();
  });

  document.getElementById("retry-btn").addEventListener("click", () => {
    studentName = "";
    saveStatus.hidden = true;
    show(intro);
  });
})();
