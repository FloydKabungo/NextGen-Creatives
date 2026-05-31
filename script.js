emailjs.init({
    publicKey: "V2o7R3OR6NHpQLBil"
});

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