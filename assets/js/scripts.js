// navbar details
const navBar = document.getElementById("d-navigate");
const navBtn = document.getElementById("nav-toggle");
const openNav = document.getElementById("open");
const closeNav = document.getElementById("close");

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