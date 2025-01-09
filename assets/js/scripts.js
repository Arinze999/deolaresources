import Swal from "https://cdn.skypack.dev/sweetalert2@11";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHZ3FJUgWG3ZF7jvUOqXH0q_yIRBocfaI",
  authDomain: "deolaresources-f2a14.firebaseapp.com",
  projectId: "deolaresources-f2a14",
  storageBucket: "deolaresources-f2a14.firebasestorage.app",
  messagingSenderId: "396593158918",
  appId: "1:396593158918:web:072aac4acc6cb35b1edc87",
};

// Firebase configuration
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// navbar details
const navBar = document.getElementById("d-navigate");
const navBtn = document.getElementById("nav-toggle");
const openNav = document.getElementById("open");
const closeNav = document.getElementById("close");
const user = localStorage.getItem("deolaToken");
const userbtn = document.getElementsByClassName("user-btn");

// Select all buttons with the class "whatsapp-button"
const whatsappButtons = document.querySelectorAll(".whatsapp-button");

if (user) {
  for (let i = 0; i < userbtn.length; i++) {
    const button = document.createElement("button");
    button.innerHTML = "Admin-Logout";
    userbtn[i].innerHTML = ""; // Clear existing content if necessary
    userbtn[i].appendChild(button);

    button.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          // Clear localStorage
          localStorage.removeItem("deolaToken");

          // Show SweetAlert popup
          Swal.fire({
            title: "Success!",
            text: "Logged out successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });

          // Delay the page reload
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.error("Error logging out:", error);

          // Show error popup
          Swal.fire({
            title: "Error!",
            text: "An error occurred during logout. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    });
  }
}

//navbar responsive function
navBtn.addEventListener("click", () => {
  console.log("clicked");
  console.log(navBar);
  navBtn.classList.toggle("rotate-nav");
  navBar.classList.toggle("show-nav");
  navBar.classList.toggle("hide");
  openNav.classList.toggle("hidden");
  closeNav.classList.toggle("hidden");
});

// hero logic
const images = [
  "assets/images/heroImg1.jpg",
  "assets/images/heroImg2.jpg",
  "assets/images/heroImg3.jpg",
  "assets/images/heroImg4.jpg",
  "assets/images/heroImg5.jpg",
  "assets/images/heroImg6.jpg",
  "assets/images/heroImg7.jpg",
];

const imageWrapper = document.getElementById("image-wrapper");
let currentIndex = 0;

// Create and append img elements
images.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Hero Image ${index + 1}`;
  img.className = index === 0 ? "active" : ""; // Set the first image as active
  imageWrapper.appendChild(img);
});

const imgElements = document.querySelectorAll("#image-wrapper img");

// Function to update images
function updateHeroImages() {
  const currentImage = imgElements[currentIndex];
  currentImage.classList.remove("active");

  currentIndex = (currentIndex + 1) % images.length;

  const nextImage = imgElements[currentIndex];
  nextImage.classList.add("active");
}

// Change images every 5 seconds
setInterval(updateHeroImages, 5000);

//   carousel
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const dots = document.querySelectorAll(".dot");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  const itemsPerSlide = window.innerWidth < 640 ? 1 : 1;
  const totalItems = document.querySelectorAll(".carousel-item").length;
  const totalSlides = Math.ceil(totalItems / itemsPerSlide);

  let currentIndex = 0;

  // Auto-scroll function
  const autoScroll = setInterval(() => {
    moveToNext();
  }, 5000);

  // Update carousel position
  function updateCarousel() {
    carousel.style.transform = `translateX(-${
      (currentIndex * 100) / itemsPerSlide
    }%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Move to the previous slide
  function moveToPrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Move to the next slide
  function moveToNext() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  // Add event listeners
  prev.addEventListener("click", () => {
    clearInterval(autoScroll); // Pause auto-scroll when manually controlled
    moveToPrev();
  });

  next.addEventListener("click", () => {
    clearInterval(autoScroll); // Pause auto-scroll when manually controlled
    moveToNext();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(autoScroll);
      currentIndex = index;
      updateCarousel();
    });
  });

  // Initial render
  updateCarousel();
});

// faqs
document.querySelectorAll(".question").forEach((question) => {
  question.addEventListener("click", function () {
    const parent = this.parentElement;
    const answer = this.nextElementSibling;
    const chevron = this.querySelector("span img");

    parent.classList.toggle("expand");
    answer.classList.toggle("show-answer");
    chevron.classList.toggle("rotate-chevron");
  });
});

// Add click event listener to each button
whatsappButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const phone = button.getAttribute("data-phone"); // Get the phone number
    const message = encodeURIComponent(button.getAttribute("data-message")); // Get and encode the message

    // Construct WhatsApp URL
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;

    // Open the URL in a new tab
    window.open(whatsappURL, "_blank");
  });
});
