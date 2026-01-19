document.addEventListener('DOMContentLoaded', function () {
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;

  // Set initial theme based on saved preference or default to dark
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.dataset.theme = savedTheme;
    themeSwitch.checked = savedTheme === 'light';
  } else {
    body.dataset.theme = 'dark';
    themeSwitch.checked = false;
  }

  themeSwitch.addEventListener('change', function () {
    if (this.checked) {
      body.dataset.theme = 'light';
      localStorage.setItem('theme', 'light');
    } else {
      body.dataset.theme = 'dark';
      localStorage.setItem('theme', 'dark');
    }
  });

  const jobs = document.querySelectorAll('.job');

  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  jobs.forEach((job) => {
    observer.observe(job);
  });

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Back to top button
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
      };

      // Show loading state
      const submitBtn = contactForm.querySelector("button[type='submit']");
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      fetch('https://formspree.io/f/mldqvozv', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            showFormStatus('success', 'Thank you for your message! I will get back to you soon.');
            contactForm.reset();
          } else {
            response.json().then((data) => {
              if (Object.hasOwn(data, 'errors')) {
                showFormStatus('error', data['errors'].map((error) => error['message']).join(', '));
              } else {
                showFormStatus('error', 'Oops! There was a problem submitting your form');
              }
            });
          }
        })
        .catch((error) => {
          showFormStatus('error', 'Oops! There was a problem submitting your form');
        })
        .finally(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        });
    });
  }

  function showFormStatus(type, message) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type + ' visible';

    // Hide status after 5 seconds
    setTimeout(() => {
      formStatus.className = 'form-status ' + type;
    }, 5000);
  }

  // Snow effect
  const today = new Date();
  if (today.getMonth() === 11) {
    // 11 is for December
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    document.body.appendChild(snowContainer);

    for (let i = 0; i < 100; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.width = Math.random() * 5 + 'px';
      snowflake.style.height = snowflake.style.width;
      snowflake.style.animationDuration = Math.random() * 5 + 5 + 's';
      snowflake.style.animationDelay = Math.random() * 5 + 's';
      snowContainer.appendChild(snowflake);
    }
  }

  // Rotating quotes
  const quotes = [
    "My code doesn't have bugs; it has unexpected features.",
    'Why do programmers prefer dark mode? Because light attracts bugs!',
    "I'm not saying I'm lazy, but I once automated a task that took less time to do manually.",
    'Debugging is like being the detective in a crime movie where you are also the murderer.',
    "My favorite language is 'coffee' – it compiles every morning.",
    'Programmer: A machine that turns coffee into code.',
    "There are 10 types of people in the world: those who understand binary, and those who don't.",
    "I need to get a new keyboard; my 'any' key is broken.",
    'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.',
    'The only thing more frustrating than a bug is a feature that acts like a bug.',
  ];

  const quoteContainer = document.getElementById('quote-container');
  let quoteIndex = 0;

  function showNextQuote() {
    if (quoteContainer) {
      quoteContainer.classList.remove('visible'); // Fade out

      setTimeout(() => {
        quoteContainer.textContent = quotes[quoteIndex];
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteContainer.classList.add('visible'); // Fade in
      }, 500); // Half a second delay to allow fade out
    }
  }

  const contactSection = document.getElementById('contact');
  const quoteObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Initial quote display
          showNextQuote();

          // Change quote every 10 seconds
          setInterval(showNextQuote, 10000);

          quoteObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  if (contactSection) {
    quoteObserver.observe(contactSection);
  }
});
