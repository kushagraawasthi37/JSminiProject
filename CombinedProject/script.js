document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const themeToggle = document.getElementById("theme-toggle");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  // Project paths (one folder up)
  const projectPaths = {
    todo: "../TodoList/index.html",
    expense: "../ExpenseTracker/index.html",
    quiz: "../QuizApp/index.html",
    ecommerce: "../EcommerceCart/index.html",
    weather: "../Weather-App/index.html",
  };

  // Load project in iframe
  function loadProject(project) {
    sections.forEach((section) => {
      section.innerHTML = "";
      section.classList.remove("active");
    });

    const section = document.getElementById(project);
    if (section) {
      const iframe = document.createElement("iframe");
      iframe.src = projectPaths[project];
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "none";
      section.appendChild(iframe);
      section.classList.add("active");
    }
  }

  // Sidebar nav clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      loadProject(link.dataset.target);
    });
  });

  // Dark/Light mode
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") 
      ? "☀️ Light Mode" 
      : "🌙 Dark Mode";
  });

  // Sidebar collapse toggle
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // Load default project
  loadProject("todo");
});
