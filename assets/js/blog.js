// Import Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

// Import Firestore
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Import Storage
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";

// Get user token from local storage
const user = localStorage.getItem("deolaToken");
console.log(user);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHZ3FJUgWG3ZF7jvUOqXH0q_yIRBocfaI",
  authDomain: "deolaresources-f2a14.firebaseapp.com",
  projectId: "deolaresources-f2a14",
  storageBucket: "deolaresources-f2a14.firebasestorage.app",
  messagingSenderId: "396593158918",
  appId: "1:396593158918:web:072aac4acc6cb35b1edc87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const viewFormButton = document.getElementById("view-form");
  const modal = document.getElementById("post-form-modal");
  const modalContent = document.getElementById("modal-content");
  const closeModalButton = document.getElementById("close-modal");
  const postImgInput = document.getElementById("postImg");
  const postTextInput = document.getElementById("postText");
  const imagePreview = document.getElementById("image-preview");
  const postForm = document.getElementById("post-form");

  // ----------------------------------------
  // Modal Handling
  // ----------------------------------------

  // Open Modal
  if (!user) {
    viewFormButton.innerHTML = "";
  }

  viewFormButton.addEventListener("click", () => {
    modal.classList.add("active");
    setTimeout(() => {
      modalContent.classList.add("active");
    }, 50); // Delay to allow overlay transition
  });

  // Close Modal
  const closeModal = () => {
    modalContent.classList.remove("active");
    setTimeout(() => {
      modal.classList.remove("active");
    }, 500); // Matches the duration of the content transition
  };

  closeModalButton.addEventListener("click", closeModal);

  // Close modal when clicking outside the content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // ----------------------------------------
  // Image Preview Handling
  // ----------------------------------------

  postImgInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    imagePreview.innerHTML = ""; // Clear previous content

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        imagePreview.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else {
      const noImageText = document.createElement("p");
      noImageText.textContent = "No image selected";
      imagePreview.appendChild(noImageText);
    }
  });

  // ----------------------------------------
  // Form Submission Handling
  // ----------------------------------------

  postForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Get the selected file and text input
    const selectedFile = postImgInput.files[0];
    const postText = postTextInput.value;

    // Ensure data is present
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    if (!postText.trim()) {
      alert("Please enter some text.");
      return;
    }

    // Log the form data for debugging
    console.log("Form data ready to send:");
    console.log("Image:", selectedFile);
    console.log("Text:", postText);

    // Call the Firebase handler to upload the blog
    try {
      await handleBlogUpload(selectedFile, postText);
      alert("Blog post submitted successfully!");

      // Clear the form and close the modal
      postImgInput.value = "";
      postTextInput.value = "";
      imagePreview.innerHTML = "<p>No image selected</p>";
      closeModal();
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Failed to submit post.");
    }
  });
});

// ----------------------------------------
// Firebase Blog Upload Handler
// ----------------------------------------

async function handleBlogUpload(imageFile, text) {
  console.log("Uploading blog post...");

  try {
    // Step 1: Create a unique folder path
    const timestamp = Date.now(); // Current timestamp
    const uniqueFileName = `${timestamp}_${imageFile.name}`;
    const filePath = `blogPhotos/${uniqueFileName}`;

    // Step 2: Firebase Storage Reference
    const fileRef = ref(storage, filePath);

    // Step 3: Upload the image to Firebase Storage
    const uploadTaskSnapshot = await uploadBytes(fileRef, imageFile);

    // Step 4: Get the download URL of the uploaded image
    const imageUrl = await getDownloadURL(uploadTaskSnapshot.ref);

    console.log("Image uploaded successfully:", imageUrl);

    // Proceed to save blog data to Firestore (not yet implemented in this snippet)
  } catch (error) {
    console.error("Error uploading blog post:", error);
    throw new Error("Blog upload failed.");
  }
}
