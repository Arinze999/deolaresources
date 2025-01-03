import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import Swal from "https://cdn.skypack.dev/sweetalert2@11";

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

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Function to handle sign-in
async function signInAdmin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Success alert with SweetAlert2
    Swal.fire({
      title: "Success!",
      text: "Sign-in successful.",
      icon: "success",
      confirmButtonText: "OK",
    });

    console.log("Sign-in successful:", user);
    localStorage.setItem("deolaToken", JSON.stringify(user.accessToken));
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // Error alert with SweetAlert2
    Swal.fire({
      title: "Error!",
      text: `Sign-in failed: ${errorMessage}`,
      icon: "error",
      confirmButtonText: "Try Again",
    });

    console.error("Error signing in:", errorCode, errorMessage);
  }
}

// Target the form fields and button
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const signInButton = document.getElementById("admin-signin-button");

// Add event listener to the sign-in button
signInButton.addEventListener("click", (event) => {
  event.preventDefault();
  const email = emailField.value;
  const password = passwordField.value;
  signInAdmin(email, password);
});
