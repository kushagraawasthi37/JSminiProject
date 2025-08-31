document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  // Dark / Light Mode Toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";
  });

  // Responsive Burger Menu Toggle
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Smooth scroll for nav links
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        // Close menu on mobile
        navLinks.classList.remove("active");
      }
    });
  });

  // Optional: contact form alert
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      contactForm.reset();
    });
  }
});
