document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
  const linkPath = new URL(link.href, window.location.origin).pathname;
  const currentPath = window.location.pathname;

  if (linkPath === currentPath || (currentPath.endsWith("/") && linkPath.endsWith("/index.html"))) {
    link.classList.add("active");
  }
});