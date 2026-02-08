const prefersReducedMotion =
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const supportsObserver = "IntersectionObserver" in window;

const SOURCE_DATA = {
  "source-q3": {
    title: "Q3_Management_Report_2025.pdf",
    location: "Раздел 4.2, стр. 17",
    snippet:
      "Логистика и штрафы по SLA формируют 63% отклонения маржи относительно планового уровня за Q3.",
  },
  "source-contract": {
    title: "Master_Supply_Contract_v7.docx",
    location: "Раздел 8.1, пункт 4",
    snippet:
      "Срок поставки может изменяться в одностороннем порядке без компенсации, если иное не согласовано допсоглашением.",
  },
  "source-policy": {
    title: "Policy_PD_17_Data_Protection.pdf",
    location: "Раздел 2.4, таблица контроля доступа",
    snippet:
      "Доступ к документам с персональными данными ограничивается ролевой моделью и журналируется на уровне запроса и ответа.",
  },
  "source-sla": {
    title: "ITSM_SLA_Q3_2025.csv",
    location: "Срез за октябрь 2025",
    snippet:
      "Нарушения SLA концентрируются в потоках согласования договоров и закрытия критичных инцидентов.",
  },
};

const WORKFLOW_DATA = {
  "policy-knowledge": {
    title: "Агент знаний по политикам",
    summary: "Отвечает сотрудникам по регламентам и возвращает проверяемые цитаты.",
    steps: [
      "Получает вопрос и роль пользователя через IAM.",
      "Ищет релевантные фрагменты в индексированных документах RAG.",
      "Формирует ответ с цитатами и блокирует нерелевантные источники.",
      "Пишет событие в журнал аудита с версией политики.",
    ],
  },
  "support-triage": {
    title: "Агент триажа поддержки",
    summary: "Классифицирует обращение и готовит действие для сервис-деска.",
    steps: [
      "Извлекает контекст из заявки и вложений.",
      "Определяет приоритет и категорию обращения.",
      "Формирует черновик ответа и маршрут исполнителя в ITSM.",
      "Фиксирует SLA-метку и трассировку в журнале аудита.",
    ],
  },
  "onboarding-copilot": {
    title: "Агент онбординга",
    summary: "Подсказывает процессы и учебные материалы по роли сотрудника.",
    steps: [
      "Определяет роль и подразделение сотрудника.",
      "Подбирает релевантные регламенты и инструкции.",
      "Собирает маршрут онбординга с обязательными шагами.",
      "Отмечает прогресс и обновляет журнал активности.",
    ],
  },
  "contract-risk": {
    title: "Агент рисков договора",
    summary: "Находит рисковые условия и отклонения от шаблона договора.",
    steps: [
      "Размечает документ по структуре договора.",
      "Сопоставляет пункты с эталонными шаблонами.",
      "Выделяет риски и формирует ссылку на фрагменты.",
      "Передаёт итог юристу и в риск-офис.",
    ],
  },
  "tender-summary": {
    title: "Агент резюме тендера",
    summary: "Готовит резюме тендера и аргументы для решения.",
    steps: [
      "Собирает требования из пакета закупки.",
      "Извлекает сроки, риски и условия допуска.",
      "Формирует сводку с цитатами на требования.",
      "Передаёт пакет в закупки и владельцу кейса.",
    ],
  },
  "sales-drafter": {
    title: "Агент коммерческих предложений",
    summary: "Черновик КП с проверкой формулировок и соответствия политике.",
    steps: [
      "Берёт контекст из CRM и базы успешных предложений.",
      "Генерирует структуру и ключевые аргументы.",
      "Проверяет ограничения по политике и бренду.",
      "Сохраняет версию документа с трассировкой изменений.",
    ],
  },
  "compliance-monitor": {
    title: "Агент контроля политик",
    summary: "Контролирует соблюдение политик ПДн и внутренних ограничений.",
    steps: [
      "Читает ответ агента и его цитаты.",
      "Проверяет запреты и допустимые источники.",
      "Маркирует риск-статус и эскалацию при нарушении.",
      "Записывает событие проверки в неизменяемый лог.",
    ],
  },
  "audit-evidence": {
    title: "Агент доказательств для аудита",
    summary: "Собирает воспроизводимую доказательную цепочку по кейсу.",
    steps: [
      "Сопоставляет вопрос, ответ, пользователя и контекст.",
      "Добавляет ссылки на источники и их версии.",
      "Формирует пакет доказательств для аудита.",
      "Публикует отчёт в контур контроля.",
    ],
  },
  "incident-narrative": {
    title: "Агент отчёта по инцидентам",
    summary: "Готовит нарратив инцидента из SIEM и ITSM потоков.",
    steps: [
      "Забирает события инцидента и тикеты из систем.",
      "Строит хронологию действий и отклонений.",
      "Формирует пояснение для риск-офиса.",
      "Передаёт отчёт с контрольными ссылками.",
    ],
  },
  "operations-intake": {
    title: "Агент входящего потока операций",
    summary: "Автоматизирует входящий поток заявок и вложений в операционном потоке.",
    steps: [
      "Читает документ и извлекает поля заявки.",
      "Проверяет полноту и корректность данных.",
      "Маршрутизирует задачу в нужный процесс.",
      "Фиксирует результат и SLA-метку.",
    ],
  },
  "sla-control": {
    title: "Агент контроля SLA",
    summary: "Отслеживает риски срыва SLA и предлагает действие.",
    steps: [
      "Мониторит текущие очереди и дедлайны.",
      "Определяет отклонения от целевого SLA.",
      "Рекомендует перераспределение нагрузки.",
      "Записывает решение и владельца действия.",
    ],
  },
  "report-qa": {
    title: "Агент ответов по отчётам",
    summary: "Отвечает по метрикам DWH с указанием источника и времени среза.",
    steps: [
      "Принимает вопрос и проверяет доступ пользователя.",
      "Находит релевантные витрины и отчётные срезы.",
      "Строит ответ с цитатами и метаданными.",
      "Публикует ответ в канал и журнал аудита.",
    ],
  },
};

let closeActiveDrawer = null;

function setupReveal() {
  const nodes = [...document.querySelectorAll(".reveal")];
  if (nodes.length === 0) {
    return;
  }

  nodes.forEach((node, index) => {
    node.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
  });

  if (!supportsObserver || prefersReducedMotion) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const aboveFold = window.innerHeight * 0.88;
  nodes.forEach((node) => {
    if (node.getBoundingClientRect().top <= aboveFold) {
      node.classList.add("is-visible");
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  nodes.forEach((node) => {
    if (!node.classList.contains("is-visible")) {
      revealObserver.observe(node);
    }
  });
}

function setupTabs() {
  const buttons = [...document.querySelectorAll(".tab-btn[data-tab]")];
  const panels = [...document.querySelectorAll(".scenario-panel[data-panel]")];

  if (buttons.length === 0 || panels.length === 0) {
    return;
  }

  function activateTab(tabId) {
    buttons.forEach((button) => {
      const active = button.dataset.tab === tabId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      const active = panel.dataset.panel === tabId;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
      panel.setAttribute("aria-hidden", active ? "false" : "true");
    });
  }

  const moveFocus = (currentIndex, direction) => {
    const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
    const nextButton = buttons[nextIndex];
    if (!nextButton) {
      return;
    }

    const tabId = nextButton.dataset.tab;
    if (tabId) {
      activateTab(tabId);
    }
    nextButton.focus();
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;
      if (tabId) {
        activateTab(tabId);
      }
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveFocus(index, 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveFocus(index, -1);
      }
    });
  });
}

function animateNumber(node, target) {
  if (prefersReducedMotion) {
    node.textContent = String(target);
    return;
  }

  const duration = 1100;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    node.textContent = String(value);

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

function setupCounters() {
  const counters = [...document.querySelectorAll("[data-counter]")];
  if (counters.length === 0) {
    return;
  }

  const startCounter = (node) => {
    const raw = node.getAttribute("data-counter");
    const target = Number.parseInt(raw || "", 10);
    if (Number.isNaN(target)) {
      return;
    }

    animateNumber(node, target);
  };

  if (!supportsObserver) {
    counters.forEach(startCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        startCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.45,
    }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function setupNavHighlight() {
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => {
      const selector = link.getAttribute("href");
      if (!selector) {
        return null;
      }

      const section = document.querySelector(selector);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!supportsObserver || sections.length === 0) {
    return;
  }

  const visibility = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      let active = null;
      let maxRatio = 0;

      sections.forEach(({ section }) => {
        const ratio = visibility.get(section) || 0;
        if (ratio > maxRatio) {
          maxRatio = ratio;
          active = section;
        }
      });

      if (!active) {
        return;
      }

      sections.forEach(({ link, section }) => {
        link.classList.toggle("is-active", section === active);
      });
    },
    {
      threshold: [0.2, 0.45, 0.7],
      rootMargin: "-26% 0px -44% 0px",
    }
  );

  sections.forEach(({ section }) => observer.observe(section));
}

function setupContourBoard() {
  const board = document.querySelector(".contour-board");
  const visual = document.querySelector(".contour-visual");
  const steps = [...document.querySelectorAll(".contour-step[data-step]")];

  if (!board || !visual || steps.length === 0) {
    return;
  }

  const stepIds = steps.map((step) => step.dataset.step).filter(Boolean);
  let activeIndex = 0;
  let autoRotate = null;

  const setState = (stepId) => {
    if (!stepId) {
      return;
    }

    const nextIndex = stepIds.indexOf(stepId);
    if (nextIndex >= 0) {
      activeIndex = nextIndex;
    }

    visual.setAttribute("data-state", stepId);
    steps.forEach((step) => {
      const active = step.dataset.step === stepId;
      step.classList.toggle("is-active", active);
      step.setAttribute("aria-selected", active ? "true" : "false");
    });
  };

  const stopRotation = () => {
    if (autoRotate) {
      window.clearInterval(autoRotate);
      autoRotate = null;
    }
  };

  const startRotation = () => {
    if (prefersReducedMotion || autoRotate || document.hidden || stepIds.length < 2) {
      return;
    }

    autoRotate = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % stepIds.length;
      setState(stepIds[activeIndex]);
    }, 3600);
  };

  steps.forEach((step) => {
    step.addEventListener("click", () => {
      setState(step.dataset.step);
    });

    step.addEventListener("mouseenter", () => {
      stopRotation();
      setState(step.dataset.step);
    });
  });

  board.addEventListener("mouseleave", () => {
    startRotation();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopRotation();
    } else {
      startRotation();
    }
  });

  setState(stepIds[activeIndex]);

  if (supportsObserver) {
    const boardObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries[0];
        if (!visible || !visible.isIntersecting) {
          stopRotation();
          return;
        }

        startRotation();
      },
      {
        threshold: 0.25,
        rootMargin: "-8% 0px -8% 0px",
      }
    );

    boardObserver.observe(board);
  } else {
    startRotation();
  }
}

function createDrawer(drawerId, backdropId) {
  const drawer = document.getElementById(drawerId);
  const backdrop = document.getElementById(backdropId);
  const closeButtons = [...document.querySelectorAll(`[data-close="${drawerId}"]`)];

  if (!drawer || !backdrop) {
    return null;
  }

  let lastFocused = null;

  const hideDrawer = () => {
    drawer.classList.remove("is-open");
    window.setTimeout(() => {
      drawer.hidden = true;
      backdrop.hidden = true;
    }, prefersReducedMotion ? 0 : 180);

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }

    if (closeActiveDrawer === hideDrawer) {
      closeActiveDrawer = null;
    }
  };

  const showDrawer = (opener) => {
    if (closeActiveDrawer && closeActiveDrawer !== hideDrawer) {
      closeActiveDrawer();
    }

    lastFocused = opener || null;
    drawer.hidden = false;
    backdrop.hidden = false;

    requestAnimationFrame(() => {
      drawer.classList.add("is-open");
    });

    const focusTarget = drawer.querySelector(".drawer-close");
    if (focusTarget) {
      focusTarget.focus();
    }

    closeActiveDrawer = hideDrawer;
  };

  closeButtons.forEach((button) => {
    button.addEventListener("click", hideDrawer);
  });

  backdrop.addEventListener("click", hideDrawer);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !drawer.hidden) {
      hideDrawer();
    }
  });

  return {
    drawer,
    showDrawer,
    hideDrawer,
  };
}

function setupWorkflowDrawer() {
  const manager = createDrawer("workflowDrawer", "workflowDrawerBackdrop");
  const title = document.getElementById("workflowDrawerTitle");
  const body = document.getElementById("workflowDrawerBody");
  const triggers = [...document.querySelectorAll(".agent-workflow-btn[data-agent]")];

  if (!manager || !title || !body || triggers.length === 0) {
    return;
  }

  const renderWorkflow = (agentId) => {
    const flow = WORKFLOW_DATA[agentId];
    if (!flow) {
      return;
    }

    title.textContent = flow.title;
    body.textContent = "";

    const summary = document.createElement("p");
    summary.textContent = flow.summary;

    const list = document.createElement("ol");
    list.className = "workflow-steps";

    flow.steps.forEach((step, index) => {
      const item = document.createElement("li");
      const label = document.createElement("strong");
      label.textContent = `Шаг ${index + 1}`;
      item.append(label, step);
      list.append(item);
    });

    body.append(summary, list);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const agentId = trigger.getAttribute("data-agent");
      if (!agentId || !WORKFLOW_DATA[agentId]) {
        return;
      }

      renderWorkflow(agentId);
      manager.showDrawer(trigger);
    });
  });
}

function setupSourceDrawer() {
  const manager = createDrawer("sourceDrawer", "sourceDrawerBackdrop");
  const title = document.getElementById("sourceDrawerTitle");
  const body = document.getElementById("sourceDrawerBody");

  if (!manager || !title || !body) {
    return;
  }

  const renderSource = (sourceId) => {
    const source = SOURCE_DATA[sourceId];
    if (!source) {
      return false;
    }

    title.textContent = source.title;
    body.textContent = "";

    const meta = document.createElement("div");
    meta.className = "drawer-meta";

    const metaLabel = document.createElement("p");
    metaLabel.textContent = "Источник";

    const metaLocation = document.createElement("span");
    metaLocation.textContent = source.location;

    const snippet = document.createElement("p");
    snippet.textContent = source.snippet;

    meta.append(metaLabel, metaLocation);
    body.append(meta, snippet);

    return true;
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".citation-badge[data-source-id], .source-item[data-source-id]");
    if (!trigger) {
      return;
    }

    const sourceId = trigger.getAttribute("data-source-id");
    if (!sourceId) {
      return;
    }

    const rendered = renderSource(sourceId);
    if (!rendered) {
      return;
    }

    manager.showDrawer(trigger);
  });
}

function setupYear() {
  const node = document.getElementById("year");
  if (node) {
    node.textContent = String(new Date().getFullYear());
  }
}

setupReveal();
setupTabs();
setupCounters();
setupNavHighlight();
setupContourBoard();
setupWorkflowDrawer();
setupSourceDrawer();
setupYear();
