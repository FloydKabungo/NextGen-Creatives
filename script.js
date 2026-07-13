document.addEventListener("click", function(event) {
    const link = event.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || link.target === "_blank" || link.hasAttribute("download")) {
        return;
    }

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;

    event.preventDefault();
    document.body.classList.add("fade-out");
    setTimeout(function() {
        window.location.href = url.href;
    }, 320);
});

window.addEventListener("pageshow", function(event) {
    if (event.persisted) {
        document.body.classList.remove("fade-out");
    }
});

if (typeof emailjs !== "undefined" && emailjs.init) {
    emailjs.init({
        publicKey: "V2o7R3OR6NHpQLBil"
    });
}

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!formStatus) return;

        if (typeof emailjs === "undefined" || !emailjs.send) {
            formStatus.textContent = "Email service is unavailable. Please contact us by email or phone.";
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const phoneField = document.getElementById("phone");
        const projectField = document.getElementById("project");
        const budgetField = document.getElementById("budget");
        const messageField = document.getElementById("message");

        const phone = phoneField && phoneField.value.trim()
            ? phoneField.value.trim()
            : "Not provided";
        const budget = budgetField && budgetField.value.trim()
            ? budgetField.value.trim()
            : "Not specified";

        const templateParams = {
            name: nameField ? nameField.value.trim() : "",
            email: emailField ? emailField.value.trim() : "",
            title: projectField ? projectField.value : "General Enquiry",
            message: [
                messageField ? messageField.value.trim() : "",
                "",
                "Phone: " + phone,
                "Estimated budget: " + budget
            ].join("\n")
        };

        formStatus.textContent = "Sending message...";
        if (submitButton) submitButton.disabled = true;

        emailjs.send(
            "service_r3rqpyp",
            "template_407jnoh",
            templateParams
        )
        .then(() => {
            formStatus.textContent = "Message sent successfully!";
            contactForm.reset();
        })
        .catch((error) => {
            formStatus.textContent = "Failed to send message. Please try again.";
            console.error(error);
        })
        .finally(() => {
            if (submitButton) submitButton.disabled = false;
        });
    });
}

(function () {
    const pageScope = document.querySelector('.home-page, .portfolio-page, .services-page, .about-page, .management-page, .contact-page');
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (pageScope && menuToggle && siteNav) {
        menuToggle.addEventListener('click', function () {
            const isOpen = siteNav.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        });

        siteNav.addEventListener('click', function (event) {
            if (event.target.closest('a')) {
                siteNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Open navigation');
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) {
                siteNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const filterButtons = document.querySelectorAll('.portfolio-page .portfolio-filter');
    const projectCards = document.querySelectorAll('.portfolio-page .project-card');

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const selectedFilter = button.dataset.filter;

                filterButtons.forEach(function (item) {
                    item.classList.remove('active');
                    item.setAttribute('aria-pressed', 'false');
                });

                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');

                projectCards.forEach(function (card) {
                    const matches = selectedFilter === 'all' || card.dataset.category === selectedFilter;
                    card.classList.toggle('is-hidden', !matches);
                });
            });
        });

        filterButtons[0].setAttribute('aria-pressed', 'true');
    }
})();
