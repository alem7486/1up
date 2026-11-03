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
      status.textContent = 'Please write a valid email address.';
      email.focus(); return;
    }
    const original = button.innerHTML;
    const params = new URLSearchParams(new FormData(form));
    params.set('lang', document.documentElement.lang || 'es');
    button.disabled = true;
    button.textContent = 'Sending...';
    status.className = 'form-status';
    status.textContent = '';
    try {
      await fetch(url, {
        method: 'POST', mode: 'no-cors',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: params.toString()
      });
      status.className = 'form-status success';
      status.textContent = 'Thank you for your message. We will get back to you as soon as possible.';
    } catch (error) {
      status.className = 'form-status error';
      status.textContent = 'Sorry, we could not send your message. We will keep your data in the form so you can try again.';
      console.error('Blog form:', error);
    } finally {
      button.disabled = false;
      button.innerHTML = original;
    }
  });
})();
