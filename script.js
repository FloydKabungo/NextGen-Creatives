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

        formStatus.textContent = "Sending message...";

        emailjs.sendForm(
            "service_r3rqpyp",
            "template_407jnoh",
            contactForm
        )
        .then(() => {
            formStatus.textContent = "Message sent successfully!";
            contactForm.reset();
        })
        .catch((error) => {
            formStatus.textContent = "Failed to send message.";
            console.error(error);
        });
    });
}
// Portfolio page interactions
(function () {
    const menuToggle = document.querySelector('.portfolio-page .menu-toggle');
    const siteNav = document.querySelector('.portfolio-page .site-nav');

    if (menuToggle && siteNav) {
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
