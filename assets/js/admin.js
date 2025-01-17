// ----------------------------------------
// Import Firebase Firestore
// ----------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Initialize Firebase (renaming the app instance to avoid conflicts)
const firebaseConfig = {
  apiKey: "AIzaSyAWGP7BrK07_erEaXgSVU3ZhlwBp3Qy3Bc",
  authDomain: "shadeproject-e6cdd.firebaseapp.com",
  projectId: "shadeproject-e6cdd",
  storageBucket: "shadeproject-e6cdd.firebasestorage.app",
  messagingSenderId: "170836665346",
  appId: "1:170836665346:web:7ec2c062f4c158f0a1f31b",
};

const appAdmin = initializeApp(firebaseConfig, "adminApp");
const db = getFirestore(appAdmin);

// ----------------------------------------
// DOM Elements
// ----------------------------------------
const feedbackContainer = document.getElementById("feedbacks");
const feedbackTab = document.createElement("h2");
const emailTab = document.createElement("h2");

// Create and append tabs to the DOM
feedbackTab.textContent = "Feedbacks";
emailTab.textContent = "Email List";

feedbackTab.className = "tab active-tab"; // Active by default
emailTab.className = "tab";

const tabsContainer = document.createElement("div");
tabsContainer.className = "tabs-container";

tabsContainer.appendChild(feedbackTab);
tabsContainer.appendChild(emailTab);
feedbackContainer.parentNode.insertBefore(tabsContainer, feedbackContainer);

// ----------------------------------------
// Render Feedbacks
// ----------------------------------------
const renderFeedbacks = () => {
  const feedbacksRef = collection(db, "feedbacks");

  // Real-time listener to reflect changes
  onSnapshot(feedbacksRef, (snapshot) => {
    feedbackContainer.innerHTML = ""; // Clear existing feedbacks
    snapshot.forEach((doc) => {
      const feedback = doc.data();
      const feedbackCard = document.createElement("div");
      feedbackCard.className = "feedback-card";

      const isDisplayed = feedback.display;
      feedbackCard.innerHTML = `
        <p><strong>Full Name:</strong> ${feedback.fullName}</p>
        <p><strong>Email:</strong> ${feedback.email}</p>
        <p><strong>Occupation:</strong> ${feedback.occupation || "N/A"}</p>
        <p><strong>Location:</strong> ${feedback.location || "N/A"}</p>
        <p><strong>Message:</strong> ${feedback.message}</p>
        <button 
          class="toggle-btn ${isDisplayed ? "remove-btn" : "display-btn"}"
          data-id="${doc.id}" 
          data-display="${isDisplayed}">
          ${isDisplayed ? "Remove" : "Display"}
        </button>
      `;

      feedbackContainer.appendChild(feedbackCard);
    });

    // Add event listeners to toggle buttons
    document.querySelectorAll(".toggle-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const id = event.target.getAttribute("data-id");
        const currentDisplay =
          event.target.getAttribute("data-display") === "true";

        try {
          // Update the display field in Firestore
          const feedbackDoc = doc(db, "feedbacks", id);
          await updateDoc(feedbackDoc, {
            display: !currentDisplay,
          });

          // UI will automatically update due to the real-time listener
        } catch (error) {
          console.error("Error updating display field:", error);
          alert("An error occurred while updating the display field.");
        }
      });
    });
  });
};

// ----------------------------------------
// Render Email List
// ----------------------------------------
const renderEmailList = () => {
  const emailListRef = collection(db, "emailList");

  // Fetch all emails
  getDocs(emailListRef)
    .then((snapshot) => {
      feedbackContainer.innerHTML = ""; // Clear container
      snapshot.forEach((doc) => {
        const emailData = doc.data();

        const emailCard = document.createElement("div");
        emailCard.className = "email-card";
        emailCard.innerHTML = `
          <p><strong>Email:</strong> ${emailData.email}</p>
        `;

        feedbackContainer.appendChild(emailCard);
      });

      // Handle empty state
      if (snapshot.empty) {
        feedbackContainer.innerHTML = "<p>No emails available.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching emails:", error);
      feedbackContainer.innerHTML =
        "<p>Failed to load emails. Please try again later.</p>";
    });
};

// ----------------------------------------
// Tab Switching Logic
// ----------------------------------------
feedbackTab.addEventListener("click", () => {
  feedbackTab.classList.add("active-tab");
  emailTab.classList.remove("active-tab");

  renderFeedbacks();
});

emailTab.addEventListener("click", () => {
  emailTab.classList.add("active-tab");
  feedbackTab.classList.remove("active-tab");

  renderEmailList();
});

// ----------------------------------------
// Initial Load: Feedbacks
// ----------------------------------------
renderFeedbacks();
