(() => {
  const url = "https://script.google.com/macros/s/AKfycbyFVd72f5Qmi12w6ap_3tSgYTinJw1nOeNSZg_NLmDxSFk5Xj1OjqWIRH9UxDmF220D/exec";
  const form = document.getElementById('contact-form');
  if (!form) return;
  const button = document.getElementById('form-button');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled) return;
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');
    for (const field of [name, email, message]) field.value = field.value.trim();
    if (!form.reportValidity()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value)) {
      status.className = 'form-status error';
      status.textContent = 'Por favor, escribe un correo válido.';
      email.focus(); return;
    }
    const original = button.innerHTML;
    const params = new URLSearchParams(new FormData(form));
    params.set('lang', document.documentElement.lang || 'es');
    button.disabled = true;
    button.textContent = 'Enviando...';
    status.className = 'form-status';
    status.textContent = '';
    try {
      await fetch(url, {
        method: 'POST', mode: 'no-cors',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: params.toString()
      });
      status.className = 'form-status success';
      status.textContent = 'Gracias por tu mensaje, te responderemos lo antes posible.';
    } catch (error) {
      status.className = 'form-status error';
      status.textContent = 'No se pudo enviar la solicitud. Conservamos tus datos en el formulario para que puedas reintentar.';
      console.error('Formulario del blog:', error);
    } finally {
      button.disabled = false;
      button.innerHTML = original;
    }
  });
})();
