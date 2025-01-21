// ----------------------------------------
// Import Firebase and Dependencies
// ----------------------------------------
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import Swal from "https://cdn.skypack.dev/sweetalert2@11";
import { auth } from "./configs.js";

// ----------------------------------------
// Sign-In Functionality
// ----------------------------------------
/**
 * Handles Admin Sign-In using Firebase Authentication
 * @param {string} email - Admin email address
 * @param {string} password - Admin password
 * @param {HTMLElement} button - The sign-in button to show loading state
 */
async function signInAdmin(email, password, button) {
  try {
    // Show loading state
    button.disabled = true;
    button.textContent = "Loading...";

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Show success alert
    Swal.fire({
      title: "Success!",
      text: "Sign-in successful.",
      icon: "success",
      confirmButtonText: "OK",
    });

    console.log("Sign-in successful:", user);

    // Save token and redirect to home page
    localStorage.setItem("deolaToken", JSON.stringify(user.accessToken));
    setTimeout(() => {
      window.location.href = "../"; // Adjust redirect URL as needed
    }, 2000);
  } catch (error) {
    const errorMessage = error.message;

    // Show error alert
    Swal.fire({
      title: "Error!",
      text: `Sign-in failed: ${errorMessage}`,
      icon: "error",
      confirmButtonText: "Try Again",
    });

    console.error("Error signing in:", error);
  } finally {
    // Reset button state
    button.disabled = false;
    button.textContent = "Sign In";
  }
}

// ----------------------------------------
// DOM Interaction for Sign-In Form
// ----------------------------------------
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const signInButton = document.getElementById("admin-signin-button");

const admin = localStorage.getItem("deolaToken");

// Add event listener to sign-in button
if (signInButton) {
  signInButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (admin) {
      Swal.fire({
        title: "Error!",
        text: "You're already signed In",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    const email = emailField.value.trim();
    const password = passwordField.value;

    if (!email || !password) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in both email and password fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    signInAdmin(email, password, signInButton);
  });
}
