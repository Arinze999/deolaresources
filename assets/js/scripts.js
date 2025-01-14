// ----------------------------------------
// Import Firebase and Dependencies
// ----------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import Swal from "https://cdn.skypack.dev/sweetalert2@11";

// ----------------------------------------
// Firebase Initialization
// ----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyAWGP7BrK07_erEaXgSVU3ZhlwBp3Qy3Bc",
  authDomain: "shadeproject-e6cdd.firebaseapp.com",
  projectId: "shadeproject-e6cdd",
  storageBucket: "shadeproject-e6cdd.firebasestorage.app",
  messagingSenderId: "170836665346",
  appId: "1:170836665346:web:7ec2c062f4c158f0a1f31b",
};

// Initialize Firebase with a custom app name
const app = initializeApp(firebaseConfig, "scriptApp");
const auth = getAuth(app);

// ----------------------------------------
// Navbar Logic
// ----------------------------------------
const navBar = document.getElementById("d-navigate");
const navBtn = document.getElementById("nav-toggle");
const openNav = document.getElementById("open");
const closeNav = document.getElementById("close");

navBtn.addEventListener("click", () => {
  navBtn.classList.toggle("rotate-nav");
  navBar.classList.toggle("show-nav");
  navBar.classList.toggle("hide");
  openNav.classList.toggle("hidden");
  closeNav.classList.toggle("hidden");
});

// ----------------------------------------
// User Authentication and Logout
// ----------------------------------------
const user = localStorage.getItem("deolaToken");
const userbtn = document.getElementsByClassName("user-btn");

if (user) {
  Array.from(userbtn).forEach((btn) => {
    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Admin-Logout";
    logoutButton.classList.add("logout");
    btn.classList.remove("bg-deolaDarkGreen", "hover:bg-deolaDarkGreen2");
    btn.innerHTML = ""; // Clear existing content
    btn.appendChild(logoutButton);

    logoutButton.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("deolaToken");
          Swal.fire({
            title: "Success!",
            text: "Logged out successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch((error) => {
          console.error("Error logging out:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred during logout. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    });
  });
}

// ----------------------------------------
// Hero Section Logic
// ----------------------------------------
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
  img.classList.toggle("active", index === 0); // First image is active
  imageWrapper.appendChild(img);
});

const imgElements = document.querySelectorAll("#image-wrapper img");

function updateHeroImages() {
  imgElements[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % images.length;
  imgElements[currentIndex].classList.add("active");
}

// Change images every 5 seconds
setInterval(updateHeroImages, 5000);

// ----------------------------------------
// Carousel Logic
// ----------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const dots = document.querySelectorAll(".dot");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  const itemsPerSlide = window.innerWidth < 640 ? 1 : 1;
  const totalItems = document.querySelectorAll(".carousel-item").length;
  const totalSlides = Math.ceil(totalItems / itemsPerSlide);

  let currentIndex = 0;
  const autoScroll = setInterval(() => moveToNext(), 5000);

  function updateCarousel() {
    carousel.style.transform = `translateX(-${
      (currentIndex * 100) / itemsPerSlide
    }%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function moveToPrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function moveToNext() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  prev.addEventListener("click", () => {
    clearInterval(autoScroll);
    moveToPrev();
  });

  next.addEventListener("click", () => {
    clearInterval(autoScroll);
    moveToNext();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(autoScroll);
      currentIndex = index;
      updateCarousel();
    });
  });

  updateCarousel(); // Initial render
});

// ----------------------------------------
// FAQ Section Logic
// ----------------------------------------
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

// ----------------------------------------
// WhatsApp Buttons Logic
// ----------------------------------------
const whatsappButtons = document.querySelectorAll(".whatsapp-button");

whatsappButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const phone = button.getAttribute("data-phone");
    const message = encodeURIComponent(button.getAttribute("data-message"));
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappURL, "_blank");
  });
});
