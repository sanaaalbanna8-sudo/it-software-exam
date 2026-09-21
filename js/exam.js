(() => {
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

  const CLASSIFY = [
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
  ].map((q) => ({
    section: "UI classify",
    tag: "الجزء 2 · صنّف الواجهة",
    scene: q.scene,
    ask: "هذه الجملة تناسب أي واجهة من الأربع؟",
    choices: [...UI4],
    answer: q.answer,
    why: q.why
  }));

  const intro = document.getElementById("intro");
  const quiz = document.getElementById("quiz");
  const bridge = document.getElementById("bridge");
  const result = document.getElementById("result");
  const nameInput = document.getElementById("student-name");
  const qCount = document.getElementById("q-count");
  const examBar = document.getElementById("exam-bar");
  const qTag = document.getElementById("q-tag");
  const qTitle = document.getElementById("q-title");
  const qScene = document.getElementById("q-scene");
  const qChoices = document.getElementById("q-choices");
  const qPrev = document.getElementById("q-prev");
  const qNext = document.getElementById("q-next");

  let part1 = [];
  let part2 = [];
  let deck = [];
  let i = 0;
  let mode = "part1";

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
    [intro, quiz, bridge, result].forEach((n) => { n.hidden = true; });
    el.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function render() {
    const q = deck[i];
    const label = mode === "part1" ? "الجزء 1" : "الجزء 2";
    qCount.textContent = `${label}: ${i + 1} / ${deck.length}`;
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
        render();
      });
      qChoices.appendChild(btn);
    });
    qPrev.disabled = i === 0;
    if (mode === "part1" && i === deck.length - 1) {
      qNext.textContent = "إنهاء الجزء 1 ← الجزء 2";
    } else if (mode === "part2" && i === deck.length - 1) {
      qNext.textContent = "تسليم ومراجعة الإجابات";
    } else {
      qNext.textContent = "التالي";
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
      const yours = q.pick === null ? "بدون إجابة" : q.choices[q.pick];
      const correct = q.choices[q.answer];
      item.innerHTML = `
        <h3>${n + 1}) ${q.tag}</h3>
        <p class="exam-scene" style="margin-bottom:8px">${q.scene}</p>
        <p class="pick"><strong>${q.ask}</strong></p>
        <p class="pick">إجابتك: <b class="${ok ? "good" : "bad"}">${yours}</b></p>
        <p class="pick">الصحيح: <b class="good">${correct}</b></p>
        <p class="why"><strong>ليش؟</strong> ${q.why}</p>
      `;
      list.appendChild(item);
    });
  }

  function finishAll() {
    const unanswered = part2.filter((q) => q.pick === null).length;
    if (unanswered > 0) {
      const go = confirm(`باقي ${unanswered} سؤال في الجزء 2 بلا إجابة. تسليم الآن؟`);
      if (!go) return;
    }

    const all = [...part1, ...part2];
    const score = all.filter((q) => q.pick === q.answer).length;
    const total = all.length;
    const pct = Math.round((score / total) * 100);
    const name = nameInput.value.trim();
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
      "UI classify": "تصنيف الواجهات (جزء 2)"
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
    part1 = shuffle(BANK).map(mapQ);
    part2 = shuffle(CLASSIFY).map(mapQ);
    deck = part1;
    mode = "part1";
    i = 0;
    show(quiz);
    render();
  }

  function startPart2() {
    deck = part2;
    mode = "part2";
    i = 0;
    show(quiz);
    render();
  }

  document.getElementById("start-exam").addEventListener("click", startPart1);
  document.getElementById("start-part2").addEventListener("click", startPart2);

  qPrev.addEventListener("click", () => {
    if (i > 0) {
      i -= 1;
      render();
    }
  });

  qNext.addEventListener("click", () => {
    if (i < deck.length - 1) {
      i += 1;
      render();
      return;
    }
    if (mode === "part1") endPart1();
    else finishAll();
  });

  document.getElementById("retry-btn").addEventListener("click", () => {
    show(intro);
  });
})();
