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