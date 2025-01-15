// ----------------------------------------
// Import Firebase Firestore
// ----------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
// Fetch and Display Feedbacks
// ----------------------------------------
const feedbackContainer = document.getElementById("feedbacks");

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
        <p><strong>Occupation:</strong> ${feedback.occupation}</p>
        <p><strong>Location:</strong> ${feedback.location}</p>
        <p><strong>Message:</strong> ${feedback.message}</p>
        <button 
          class="toggle-btn ${isDisplayed ? 'remove-btn' : 'display-btn'}"
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
        const currentDisplay = event.target.getAttribute("data-display") === "true";

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

// Initial render
renderFeedbacks();
