// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Scroll Animation
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.3 });

sections.forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});

// Back to Top Button
const topBtn = document.getElementById("topBtn");

window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
  }
});

// Skill Bars
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillLevel = entry.target.dataset.skill;
      entry.target.style.width = skillLevel + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Project Cards Click
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const url = card.dataset.url;
    if (url) window.open(url, '_blank');
  });
});

// Image Slider
const sliderTrack = document.querySelector('.slider-track');
const slides = sliderTrack.querySelectorAll('img');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentSlide = 0;

function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
  updateSlider();
});

// Auto Slide
setInterval(() => {
  currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
  updateSlider();
}, 5000);

// Contact Form
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value;
  const email = contactForm.email.value;
  const message = contactForm.message.value;

  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill in all fields';
    formMessage.className = 'hidden-message error-message';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMessage.textContent = 'Enter a valid email address';
    formMessage.className = 'hidden-message error-message';
    return;
  }

  formMessage.textContent = 'Message sent successfully!';
  formMessage.className = 'hidden-message success-message';
  contactForm.reset();

  setTimeout(() => {
    formMessage.className = 'hidden-message';
  }, 3000);
});

// Canvas Drawing
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, '#84fab0');
gradient.addColorStop(1, '#8fd3f4');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Circle
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2 - 20, 50, 0, Math.PI * 2);
ctx.fillStyle = '#fff';
ctx.fill();
ctx.strokeStyle = '#333';
ctx.lineWidth = 2;
ctx.stroke();

// Text
ctx.font = '20px Poppins';
ctx.fillStyle = '#333';
ctx.textAlign = 'center';
ctx.fillText('Hello Canvas', canvas.width / 2, canvas.height / 2 + 60);
