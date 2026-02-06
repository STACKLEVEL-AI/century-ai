const prefersReducedMotion =
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const supportsObserver = "IntersectionObserver" in window;

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
    });

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === tabId);
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;
      if (tabId) {
        activateTab(tabId);
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
setupYear();
