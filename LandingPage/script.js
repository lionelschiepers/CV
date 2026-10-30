document.addEventListener('DOMContentLoaded', function () {
  const root = document.documentElement;

  // Theme: a saved choice wins, otherwise follow the system setting.
  const themeSwitch = document.getElementById('theme-switch');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
  }

  themeSwitch.checked = currentTheme() === 'dark';

  themeSwitch.addEventListener('change', function () {
    const theme = this.checked ? 'dark' : 'light';
    root.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Storage unavailable; the choice still applies for this visit.
    }
  });

  systemDark.addEventListener('change', () => {
    themeSwitch.checked = currentTheme() === 'dark';
  });

  // Career chart: extend the current role to today. Positions are months since January 2019.
  const career = document.getElementById('career');
  if (career) {
    const now = new Date();
    const monthsToNow = (now.getFullYear() - 2019) * 12 + now.getMonth() + 1;
    career.style.setProperty('--total', monthsToNow + 1);
    career.querySelectorAll('[data-ongoing]').forEach((row) => {
      row.style.setProperty('--e', monthsToNow);
    });
  }

  // Years of experience, kept current without editing the page.
  document.querySelectorAll('[data-years-since]').forEach((el) => {
    const [year, month] = el.dataset.yearsSince.split('-').map(Number);
    const now = new Date();
    el.textContent = now.getFullYear() - year - (now.getMonth() + 1 < month ? 1 : 0);
  });

  // Back to top button
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener(
    'scroll',
    () => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 600);
    },
    { passive: true },
  );

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0 });
    document.getElementById('name').focus({ preventScroll: true });
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const sendFailed = "Your message wasn't sent. Check your connection and try again, or email me directly.";

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
      };

      const submitBtn = contactForm.querySelector("button[type='submit']");
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;
      showFormStatus('', '');

      fetch('https://formspree.io/f/mldqvozv', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            showFormStatus('success', "Message sent. I'll get back to you soon.");
            contactForm.reset();
          } else {
            return response.json().then((data) => {
              if (Object.hasOwn(data, 'errors')) {
                showFormStatus('error', data['errors'].map((error) => error['message']).join(', '));
              } else {
                showFormStatus('error', sendFailed);
              }
            });
          }
        })
        .catch(() => {
          showFormStatus('error', sendFailed);
        })
        .finally(() => {
          submitBtn.textContent = 'Send message';
          submitBtn.disabled = false;
        });
    });
  }

  function showFormStatus(type, message) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Snow in December
  const today = new Date();
  if (today.getMonth() === 11 && !reduceMotion) {
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    snowContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(snowContainer);

    for (let i = 0; i < 100; i++) {
      const snowflake = document.createElement('div');
      const size = Math.random() * 4 + 1 + 'px';
      snowflake.className = 'snowflake';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.width = size;
      snowflake.style.height = size;
      snowflake.style.animationDuration = Math.random() * 5 + 5 + 's';
      snowflake.style.animationDelay = Math.random() * 5 + 's';
      snowContainer.appendChild(snowflake);
    }
  }
});
