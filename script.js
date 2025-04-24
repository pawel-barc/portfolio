//Carrousel
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;

function showSlide(index) {
  const totalSlides = slides.length;
  if (index >= totalSlides) currentIndex = 0;
  else if (index < 0) currentIndex = totalSlides - 1;
  else currentIndex = index;

  const offset = -currentIndex * 100 + "%";
  document.querySelector(
    ".carousel-container"
  ).style.transform = `translateX(${offset})`;
}

prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));

setInterval(() => showSlide(currentIndex + 1), 50000);

// Formulaire
window.onload = () => {
  const hash = window.location.hash;
  if (hash === "#thanks") {
    const successMessage = document.getElementById("thanks");
    const form = document.getElementById("contact-form");
    if (form && successMessage) {
      form.style.display = "none";
      successMessage.style.display = "block";
      successMessage.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        form.style.display = "flex";
        successMessage.style.display = "none";
        history.replaceState(null, null, "");
      }, 3000);
    }
  }
};

//Burger menu
const toggleBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
