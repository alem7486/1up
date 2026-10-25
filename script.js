document.documentElement.classList.add("js");

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyFVd72f5Qmi12w6ap_3tSgYTinJw1nOeNSZg_NLmDxSFk5Xj1OjqWIRH9UxDmF220D/exec";

const form = document.getElementById("contact-form");
const button = document.getElementById("form-button");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

const emailField = document.getElementById("email");
const emailValue = emailField ? emailField.value.trim() : "";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

if (!emailPattern.test(emailValue)) {
  status.className = "form-status error";
  status.textContent = "Por favor, escribe un correo válido, por ejemplo nombre@dominio.com";
  if (emailField) emailField.focus();
  return;
}

    const params = new URLSearchParams();
    form.querySelectorAll("input, textarea").forEach(function (field) {
      params.append(field.name || field.id, field.value);
    });
    params.append("lang", document.documentElement.lang || "es");

    if (button) {
      button.disabled = true;
      button.textContent = "Enviando...";
    }

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    }).finally(function () {
      form.reset();
      if (status) {
        status.className = "form-status success";
        status.textContent = 'Gracias por tu mensaje, te responderemos lo antes posible.';
      }
      if (button) {
        button.disabled = false;
        button.textContent = "Enviar mensaje";
      }
    });
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(function (el) { observer.observe(el); });
} else {
  revealItems.forEach(function (el) { el.classList.add("is-visible"); });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const loader = document.getElementById("loader");
const loaderFill = document.getElementById("loader-fill");
const loaderHero = document.getElementById("loader-hero");
const loaderPct = document.getElementById("loader-pct");

function hideLoader() {
  if (loader) {
    loader.classList.add("done");
    document.body.style.overflow = "";
  }
}

if (loader && loaderFill && loaderHero) {
  document.body.style.overflow = "hidden";
  let progress = 0;

  const timer = setInterval(function () {
    progress = Math.min(100, progress + Math.random() * 9 + 3);
    loaderFill.style.width = progress + "%";
loaderHero.style.left = "calc(" + progress + "% - " + progress * 0.46 + "px)";
    loaderPct.textContent = Math.floor(progress);

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(hideLoader, 350);
    }
  }, 110);

  setTimeout(hideLoader, 4000);
}

const scrollFill = document.getElementById("scroll-fill");
const scrollHero = document.getElementById("scroll-hero");
const scoreEl = document.getElementById("score");

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;

  if (scrollFill) scrollFill.style.width = pct + "%";
  if (scrollHero) scrollHero.style.left = "calc(" + pct + "% - " + pct * 0.34 + "px)";
  if (scoreEl) scoreEl.textContent = String(Math.round(pct * 1000)).padStart(6, "0");
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();