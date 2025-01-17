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
// Import Firestore
// ----------------------------------------
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

// Initialize Firestore
const db = getFirestore(app);

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
// Admin Login/Logout Button Visibility
// ----------------------------------------
const admin = localStorage.getItem("deolaToken"); // Check for admin token

document.addEventListener("DOMContentLoaded", () => {
  const loginButtons = document.querySelectorAll(".login");
  const logoutButtons = document.querySelectorAll(".logout");

  // Check if login and logout buttons exist
  if (loginButtons.length > 0 && logoutButtons.length > 0) {
    if (admin) {
      // If admin exists, hide login buttons and show logout buttons
      loginButtons.forEach((button) => {
        button.style.display = "none";
      });

      logoutButtons.forEach((button) => {
        button.style.display = "block";

        // Add click event to logout buttons
        button.addEventListener("click", async () => {
          try {
            await signOut(auth); // Sign out the admin using Firebase Auth
            localStorage.removeItem("deolaToken"); // Remove admin token

            Swal.fire({
              title: "Success!",
              text: "You have been logged out successfully.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              window.location.reload(); // Reload page to update state
            });
          } catch (error) {
            console.error("Error logging out:", error);
            Swal.fire({
              title: "Error",
              text: "An error occurred during logout. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });
      });
    } else {
      // If no admin, show login buttons and hide logout buttons
      loginButtons.forEach((button) => {
        button.style.display = "block";
      });

      logoutButtons.forEach((button) => {
        button.style.display = "none";
      });
    }
  }
});

// ----------------------------------------
// Hero Section Logic
// ----------------------------------------
const imageWrapper = document.getElementById("image-wrapper");

if (imageWrapper) {
  const images = [
    "assets/images/heroImg1.jpg",
    "assets/images/heroImg2.jpg",
    "assets/images/heroImg3.jpg",
    "assets/images/heroImg4.jpg",
    "assets/images/heroImg5.jpg",
    "assets/images/heroImg6.jpg",
    "assets/images/heroImg7.jpg",
  ];

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
}

// ----------------------------------------
// Carousel Logic
// ----------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const dots = document.querySelectorAll(".dot");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  if (carousel && dots) {
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
  }
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

// ----------------------------------------
// Feedback Form Submission Logic
// ----------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.querySelector(".form-section");
  if (feedbackForm) {
    const submitButton = feedbackForm.querySelector(".form-btn");

    feedbackForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Disable the button and show loading state
      submitButton.textContent = "Submitting...";
      submitButton.disabled = true;

      // Get form values
      const fullName = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const occupation =
        document.getElementById("occupation").value.trim() || "Not provided";
      const location =
        document.getElementById("location").value.trim() || "Not provided";
      const message = document.getElementById("message").value.trim();

      // Validate required fields
      if (!fullName || !email || !message) {
        Swal.fire({
          title: "Error!",
          text: "Please fill out all required fields.",
          icon: "error",
          confirmButtonText: "OK",
        });
        // Reset button state
        submitButton.textContent = "Submit Feedback";
        submitButton.disabled = false;
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.fire({
          title: "Error!",
          text: "Please enter a valid email address.",
          icon: "error",
          confirmButtonText: "OK",
        });
        // Reset button state
        submitButton.textContent = "Submit Feedback";
        submitButton.disabled = false;
        return;
      }

      try {
        // Generate document ID using email and timestamp
        const timestamp = new Date();
        const formattedTimestamp = `${timestamp.getFullYear()}${(
          "0" +
          (timestamp.getMonth() + 1)
        ).slice(-2)}${("0" + timestamp.getDate()).slice(-2)}-${(
          "0" + timestamp.getHours()
        ).slice(-2)}${("0" + timestamp.getMinutes()).slice(-2)}`;
        const documentId = `${email}-${formattedTimestamp}`;

        // Feedback data
        const feedbackData = {
          fullName,
          email,
          occupation,
          location,
          message,
          display: false, // Additional boolean field
          timestamp: timestamp.toISOString(), // Optional: full timestamp
        };

        // Save to Firestore
        const feedbackDoc = doc(db, "feedbacks", documentId);
        await setDoc(feedbackDoc, feedbackData);

        Swal.fire({
          title: "Success!",
          text: "Your feedback has been submitted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Optionally clear the form
        feedbackForm.reset();
      } catch (error) {
        console.error("Error submitting feedback:", error);
        Swal.fire({
          title: "Error!",
          text:
            "An error occurred while submitting your feedback. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        // Reset button state
        submitButton.textContent = "Submit Feedback";
        submitButton.disabled = false;
      }
    });
  }
});

// panel button
// Get all elements with the class 'panel-btn'
const panelButtons = document.querySelectorAll(".panel-btn");

// Check if there is a admin
if (!admin) {
  // Hide all panel buttons if no admin
  panelButtons.forEach((panel) => {
    panel.style.display = "none";
  });
} else {
  // Show all panel buttons if there is a admin
  panelButtons.forEach((panel, index) => {
    panel.style.display = "block";
    panel.style.cursor = "pointer";

    // Add click event listener
    panel.addEventListener("click", () => {
      // currentIndex = index;
      // Example navigation
      window.location.href = `/admin-panel`;
    });
  });
}

// FEEDBACK DISPLAY LOGIC
document.addEventListener("DOMContentLoaded", async () => {
  const feedbacksContainer = document.getElementById("feedbacks-container");

  if (feedbacksContainer) {
    try {
      // Reference to the 'feedbacks' collection
      const feedbacksRef = collection(db, "feedbacks");

      // Query for feedbacks where display is true
      const displayQuery = query(feedbacksRef, where("display", "==", true));

      // Get the query snapshot
      const querySnapshot = await getDocs(displayQuery);

      // Clear the feedbacks container
      feedbacksContainer.innerHTML = "";

      // Iterate through the feedbacks and render them
      querySnapshot.forEach((doc) => {
        const feedback = doc.data();

        // Create the card element
        const feedbackCard = document.createElement("div");
        feedbackCard.className = "test-card";

        feedbackCard.innerHTML = `
        <div class="test-card-image">
          <img src="assets/icons/icons8-user-50.png" alt="${
            feedback.fullName
          }" />
        </div>
        <div class="test-card-content">
          <p class="test-name">${feedback.fullName}</p>
          ${
            feedback.occupation
              ? `<p class="test-occupation">${feedback.occupation}</p>`
              : ""
          }
          <p class="test-message">"${feedback.message}"</p>
        </div>
      `;

        // Append the card to the container
        feedbacksContainer.appendChild(feedbackCard);
      });

      // If no feedbacks are available, display a message
      if (querySnapshot.empty) {
        feedbacksContainer.innerHTML = "<p>Nothing at the moment.</p>";
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      feedbacksContainer.innerHTML =
        "<p>Failed to load feedbacks. Please try again later.</p>";
    }
  }
});

// ----------------------------------------
// Auto Logout After 1 Hour
// ----------------------------------------
function startAutoLogoutTimer() {
  // Set a timeout to log the admin out after 1 hour (3600000 milliseconds)
  const logoutTimeout = 60 * 60 * 1000; // 1 hour in milliseconds

  setTimeout(() => {
    // Sign out the admin
    signOut(auth)
      .then(() => {
        localStorage.removeItem("deolaToken"); // Clear the token
        Swal.fire({
          title: "Session Expired",
          text: "You have been logged out due to inactivity.",
          icon: "info",
          confirmButtonText: "OK",
        });
        setTimeout(() => window.location.reload(), 2000); // Reload page after logout
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred during logout. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }, logoutTimeout);
}

// ----------------------------------------
// Initialize Auto Logout for Admin
// ----------------------------------------
if (admin) {
  // Start the auto logout timer if the admin is logged in
  startAutoLogoutTimer();
}

// ----------------------------------------
// Email Subscription Logic with SweetAlert
// ----------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Select elements by class name
  const emailInputs = document.querySelectorAll(".email-input");
  const submitButtons = document.querySelectorAll(".email-submit");

  // Ensure elements exist
  if (emailInputs.length > 0 && submitButtons.length > 0) {
    submitButtons.forEach((button, index) => {
      const input = emailInputs[index]; // Match button with the corresponding input

      if (button && input) {
        // Add event listener to the button
        button.addEventListener("click", async (event) => {
          event.preventDefault(); // Prevent default form submission behavior

          const email = input.value.trim(); // Get the email value

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            Swal.fire({
              title: "Invalid Email",
              text: "Please enter a valid email address.",
              icon: "warning",
              confirmButtonText: "OK",
            });
            return;
          }

          try {
            // Add email to Firestore
            const emailDoc = doc(collection(db, "emailList")); // Generate a new document ID
            await setDoc(emailDoc, { email });

            Swal.fire({
              title: "Success!",
              text: "Email added",
              icon: "success",
              confirmButtonText: "OK",
            });
            input.value = ""; // Clear the input field
          } catch (error) {
            console.error("Error adding email to Firestore:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to add email. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });
      }
    });
  }
});

// animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animate");

  // Intersection Observer Options
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  // Intersection Observer Callback
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active"); // Add active class
        observer.unobserve(entry.target); // Stop observing once triggered
      }
    });
  };

  // Create Intersection Observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe Each Element
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});
