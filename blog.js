const toggle=document.querySelector('.menu-toggle');const menu=document.getElementById('nav-menu');function closeMenu(){if(menu&&toggle){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');}}if(toggle&&menu){toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});}const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("showMoreBtn");
  if (!btn) return;

  const wrapper = btn.closest(".blog-more");

  // Los artículos se leen de más nuevo a más antiguo.
  // Los primeros 3 se muestran; del cuarto en adelante se ocultan.
  const LIMITE_VISIBLE = 3;
  const articulos = document.querySelectorAll(".bp-list article");

  articulos.forEach((articulo, indice) => {
    if (indice >= LIMITE_VISIBLE) {
      articulo.classList.add("hidden-post");
    }
  });

  const ocultos = document.querySelectorAll(".bp-list .hidden-post");

  // Si no hay artículos ocultos, no mostramos el botón
  if (ocultos.length === 0) {
    if (wrapper) wrapper.style.display = "none";
    return;
  }

  btn.addEventListener("click", () => {

    ocultos.forEach(articulo => articulo.classList.remove("hidden-post"));

    if (wrapper) wrapper.style.display = "none";

  });

});
