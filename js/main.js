async function loadComponent(id, file) {
  const response = await fetch(file);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("navbar", "components/navbar.html");
  await loadComponent("sidebar", "components/sidebar.html");
  await loadComponent("main-content", "components/home.html");

  window.showSection = async (sectionId) => {
    const map = {
      home: "components/home.html",
      forum: "components/forum.html",
      mapa: "components/mapa-cultural.html",
      recursos_teoricos: "components/recursos_teoricos.html",
      recursos_praticos: "components/recursos_praticos.html",
      biblioteca: "components/biblioteca.html"
    };
    if (map[sectionId]) {
      await loadComponent("main-content", map[sectionId]);
    }
  };

  setTimeout(() => {
    const toggleButton = document.querySelector(".navbar-toggler");
    const sidebar = document.querySelector(".sidebar");
    const content = document.querySelector(".content");

    if (toggleButton && sidebar && content) {
      toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("show");
        content.classList.toggle("shifted");
      });

      // Fecha o menu ao clicar em um item (opcional)
      const sidebarLinks = sidebar.querySelectorAll("a");
      sidebarLinks.forEach(link => {
        link.addEventListener("click", () => {
          if (window.innerWidth <= 768) {
            sidebar.classList.remove("show");
            content.classList.remove("shifted");
          }
        });
      });

      // Fecha o menu ao redimensionar para desktop
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          sidebar.classList.remove("show");
          content.classList.remove("shifted");
        }
      });
    }
  }, 500);
});