document.addEventListener("DOMContentLoaded", function () {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Set initial theme based on saved preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        themeSwitch.checked = savedTheme === 'light';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeSwitch.checked = false;
    }

    themeSwitch.addEventListener('change', function () {
        if (this.checked) {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    const jobs = document.querySelectorAll('.job');

    const sections = document.querySelectorAll('.section');



    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('is-visible');

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.1

    });



    jobs.forEach(job => {

        observer.observe(job);

    });



    sections.forEach(section => {

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
            behavior: 'smooth'
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
                message: document.getElementById('message').value
            };

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Use Formspree endpoint (you'll need to replace this with your actual Formspree URL)
            // For now, I'll implement a fallback that shows the data would be sent
            console.log('Form submission:', formData);

            // Simulate API call (replace this with actual Formspree fetch call)
            setTimeout(() => {
                // This is a simulation - in production you would use:
                fetch('https://formspree.io/f/mldqvozv', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                // For now, show success message
                showFormStatus('success', 'Thank you for your message! I will get back to you soon.');
                contactForm.reset();

                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 1500);
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
    if (today.getMonth() === 11) { // 11 is for December
        const snowContainer = document.createElement('div');
        snowContainer.id = 'snow-container';
        document.body.appendChild(snowContainer);

        for (let i = 0; i < 100; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.width = Math.random() * 5 + 'px';
            snowflake.style.height = snowflake.style.width;
            snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
            snowflake.style.animationDelay = Math.random() * 5 + 's';
            snowContainer.appendChild(snowflake);
        }
    }
});