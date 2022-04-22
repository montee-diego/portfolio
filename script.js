const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");
const slideImages = document.querySelectorAll(".slide-img");
const slideDots = document.querySelectorAll(".dot");
const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector(".submit-btn");
const submitMsg = document.querySelector(".submit-message");

// Navbar
burger.addEventListener("click", () => {
  // Toggle Nav
  nav.classList.toggle("nav-active");

  // Animate Links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.5}s`;
    }
  });

  // Burger Animation
  burger.classList.toggle("burger-toggle");
});

// Contact Form
contactForm.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  var data = new FormData(event.target);

  fetch(event.target.action, {
    method: contactForm.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then(response => {
      if (response.ok) {
        // Update form status
        submitMsg.innerText = "I'll get back to you shortly!";
        submitMsg.style.opacity = 1;
        submitBtn.innerText = "Thanks!";
        submitBtn.disabled = true;

        // Reset form
        contactForm.reset();
      } else {
        submitMsg.innerText = "Oops, something went wrong. Please try again.";
        submitMsg.style.opacity = 1;
      }
    })
    .catch(error => {
      submitMsg.innerText = "Oops, something went wrong. Please try again.";
      submitMsg.style.opacity = 1;
    });
}

// Image Slider
let slideIndex = 0;
let slideTimer = null;

slideDots.forEach(dot => {
  dot.addEventListener("click", slideImageByIndex);
});

function slideImageByIndex(e) {
  if (slideTimer) {
    window.clearTimeout(slideTimer);
  }

  slideIndex = e.target.dataset.index - 1;
  slideImage();
}

function slideImage() {
  slideImages.forEach((slideImage, index) => {
    if (slideIndex === index) {
      slideImage.classList.add("visible");
      slideDots[index].classList.add("active");
    } else {
      slideImage.classList.remove("visible");
      slideDots[index].classList.remove("active");
    }
  });

  if (slideIndex === slideImages.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }

  slideTimer = window.setTimeout(() => {
    slideImage();
  }, 10000);
}

slideImage();
