const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");
const images = document.querySelectorAll(".slide-img");
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
let curIndex = 0;

function slideImage() {
  images.forEach((image, index) => {
    if (curIndex === index) {
      image.classList.add("visible");
    } else {
      image.classList.remove("visible");
    }
  });

  if (curIndex === images.length - 1) {
    curIndex = 0;
  } else {
    curIndex++;
  }

  window.setTimeout(() => {
    slideImage();
  }, 10000);
}

slideImage();
