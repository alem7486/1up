const form = document.getElementById("contact-form");
const button = document.getElementById("form-button");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const isEnglish = document.documentElement.lang === "en";

    button.disabled = true;
    button.textContent = isEnglish ? "Sending..." : "Enviando...";
    status.className = "form-status";
    status.textContent = "";

    const payload = {
      name: document.getElementById("name")?.value || document.getElementById("nombre")?.value,
      email: document.getElementById("email").value,
      message: document.getElementById("message")?.value || document.getElementById("mensaje")?.value,
      lang: document.documentElement.lang || "es"
    };

    try {
      const response = await fetch("https://oneup-va3y.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        form.reset();
        status.className = "form-status success";
        status.textContent = isEnglish
          ? "Thanks for your message. I’ll get back to you soon."
          : "Gracias por tu mensaje. Te responderé pronto.";
      } else {
        status.className = "form-status error";
        status.textContent = result.error || (
          isEnglish
            ? "The message could not be sent."
            : "No se pudo enviar el mensaje."
        );
      }
    } catch (error) {
      status.className = "form-status error";
      status.textContent = isEnglish
        ? "Connection error. Please try again."
        : "Hubo un problema de conexión. Intenta nuevamente.";
    }

    button.disabled = false;
    button.textContent = isEnglish ? "Send message" : "Enviar mensaje";
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
