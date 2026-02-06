const revealNodes = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
}

const tabButtons = [...document.querySelectorAll('.tab-btn[data-tab]')];
const tabPanels = [...document.querySelectorAll('.scenario-panel[data-panel]')];

function activateTab(tabId) {
  tabButtons.forEach((button) => {
    const active = button.dataset.tab === tabId;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.dataset.panel === tabId);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.tab;
    if (tabId) {
      activateTab(tabId);
    }
  });
});

const counters = [...document.querySelectorAll('[data-counter]')];

function animateCounter(element, target) {
  const duration = 1000;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = String(Math.round(target * progress));

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

if ('IntersectionObserver' in window && counters.length > 0) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const node = entry.target;
        const target = Number(node.getAttribute('data-counter'));
        if (!Number.isNaN(target)) {
          animateCounter(node, target);
        }

        observer.unobserve(node);
      });
    },
    {
      threshold: 0.45,
    }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach((counter) => {
    const target = counter.getAttribute('data-counter');
    if (target) {
      counter.textContent = target;
    }
  });
}

const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const observedSections = navLinks
  .map((link) => {
    const selector = link.getAttribute('href');
    if (!selector) {
      return null;
    }

    const section = document.querySelector(selector);
    return section ? { link, section } : null;
  })
  .filter(Boolean);

if ('IntersectionObserver' in window && observedSections.length > 0) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        observedSections.forEach(({ link, section }) => {
          link.classList.toggle('is-active', section === entry.target);
        });
      });
    },
    {
      threshold: 0.16,
      rootMargin: '-30% 0px -54% 0px',
    }
  );

  observedSections.forEach(({ section }) => navObserver.observe(section));
}

const narrativeSteps = [...document.querySelectorAll('.narrative-step[data-step]')];
const narrativeVisual = document.querySelector('.narrative-visual');

function setNarrativeState(stepId) {
  if (!stepId || !narrativeVisual) {
    return;
  }

  narrativeVisual.setAttribute('data-state', stepId);
  narrativeSteps.forEach((step) => {
    step.classList.toggle('is-active', step.dataset.step === stepId);
  });
}

if ('IntersectionObserver' in window && narrativeSteps.length > 0 && narrativeVisual) {
  const stepObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length === 0) {
        return;
      }

      const stepId = visible[0].target.getAttribute('data-step');
      if (stepId) {
        setNarrativeState(stepId);
      }
    },
    {
      threshold: [0.35, 0.55, 0.75],
      rootMargin: '-20% 0px -35% 0px',
    }
  );

  narrativeSteps.forEach((step) => stepObserver.observe(step));
}

const copyButtons = document.querySelectorAll('[data-copy]');
copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy');
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = 'Email скопирован';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
      }, 1600);
    } catch (error) {
      window.location.href = `mailto:${value}`;
    }
  });
});

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
