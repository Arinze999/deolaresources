// ----------------------------------------
// Import Firebase and Dependencies
// ----------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";
import Swal from "https://cdn.skypack.dev/sweetalert2@11";

// ----------------------------------------
// Firebase Configurations
// ----------------------------------------
const helperStorageConfig = {
  apiKey: "AIzaSyCwPsG2yyWCaBlKBA_97WBtxlY_x-wkNMg",
  authDomain: "coinkeep-a5f93.firebaseapp.com",
  projectId: "coinkeep-a5f93",
  storageBucket: "coinkeep-a5f93.appspot.com",
  messagingSenderId: "905184825938",
  appId: "1:905184825938:web:9c644227cd868ad1bf858b",
};
const config = {
  apiKey: "AIzaSyAWGP7BrK07_erEaXgSVU3ZhlwBp3Qy3Bc",
  authDomain: "shadeproject-e6cdd.firebaseapp.com",
  projectId: "shadeproject-e6cdd",
  storageBucket: "shadeproject-e6cdd.firebasestorage.app",
  messagingSenderId: "170836665346",
  appId: "1:170836665346:web:7ec2c062f4c158f0a1f31b",
};

// Initialize Firebase Apps
const helperStorageApp = initializeApp(helperStorageConfig);
const helperStorage = getStorage(helperStorageApp);
const blogApp = initializeApp(config, "blogApp");
const blogDb = getFirestore(blogApp);

// ----------------------------------------
// DOM Elements
// ----------------------------------------
const viewFormButton = document.getElementById("view-form");
const modal = document.getElementById("post-form-modal");
const modalContent = document.getElementById("modal-content");
const closeModalButton = document.getElementById("close-modal");
const postImgInput = document.getElementById("postImg");
const postTextInput = document.getElementById("postText");
const imagePreview = document.getElementById("image-preview");
const postForm = document.getElementById("post-form");
const postsContainer = document.getElementById("posts-container");
const admin = localStorage.getItem("deolaToken");

// ----------------------------------------
// Modal Handling
// ----------------------------------------
if (!admin) {
  viewFormButton.innerHTML = "";
}

viewFormButton.addEventListener("click", () => {
  modal.classList.add("active");
  setTimeout(() => {
    modalContent.classList.add("active");
  }, 50);
});

const closeModal = () => {
  modalContent.classList.remove("active");
  setTimeout(() => {
    modal.classList.remove("active");
  }, 500);
};

closeModalButton.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ----------------------------------------
// Image Preview Handling
// ----------------------------------------
postImgInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  imagePreview.innerHTML = "";

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
// Firebase Blog Upload Handler
// ----------------------------------------
async function handleBlogUpload(imageFile, text) {
  console.log("Uploading blog post...");

  try {
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}_${imageFile.name}`;
    const filePath = `shadesproject/blogPhotos/${uniqueFileName}`;

    const fileRef = ref(helperStorage, filePath);
    const uploadTaskSnapshot = await uploadBytes(fileRef, imageFile);
    const imageUrl = await getDownloadURL(uploadTaskSnapshot.ref);

    console.log("Image uploaded successfully:", imageUrl);

    const docRef = await addDoc(collection(blogDb, "blogs"), {
      text,
      imageUrl,
      timestamp: new Date().toISOString(),
    });

    console.log("Blog post saved successfully!");

    const blogPosts = await fetchBlogPosts();
    renderBlogPosts(blogPosts);

    Swal.fire("Success", "Blog post submitted successfully!", "success");
  } catch (error) {
    console.error("Error uploading blog post:", error);
    Swal.fire("Error", "Failed to upload blog post.", "error");
    throw new Error("Blog upload failed.");
  }
}

// ----------------------------------------
// Blog Post Deletion Handler
// ----------------------------------------
async function handleDelete(blogId, imageUrl) {
  const { isConfirmed } = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (!isConfirmed) return;

  try {
    const blogDocRef = doc(blogDb, "blogs", blogId);
    await deleteDoc(blogDocRef);

    const decodedUrl = decodeURIComponent(imageUrl);
    const filePath = decodedUrl
      .split("coinkeep-a5f93.appspot.com/o/")[1]
      ?.split("?")[0];

    if (filePath) {
      const imageRef = ref(helperStorage, filePath);
      await deleteObject(imageRef);
      console.log("Image deleted from Firebase Storage:", filePath);
    }

    const blogPosts = await fetchBlogPosts();
    renderBlogPosts(blogPosts);

    Swal.fire("Deleted!", "The blog post has been deleted.", "success");
  } catch (error) {
    console.error("Error deleting blog post:", error);
    Swal.fire("Error", "Failed to delete blog post.", "error");
  }
}

// ----------------------------------------
// Fetch Blog Posts
// ----------------------------------------
async function fetchBlogPosts() {
  try {
    const blogsCollection = collection(blogDb, "blogs");
    const querySnapshot = await getDocs(blogsCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    Swal.fire("Error", "Failed to fetch blog posts.", "error");
    throw new Error("Failed to fetch blog posts.");
  }
}

// ----------------------------------------
// Render Blog Posts
// ----------------------------------------
async function renderBlogPosts(blogPosts) {
  postsContainer.innerHTML = "<p>Loading Blog Data...</p>";

  if (blogPosts.length === 0) {
    postsContainer.innerHTML = "<p>No blog posts available.</p>";
    return;
  }

  postsContainer.innerHTML = "";

  blogPosts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("border-b-[2px]", "h-fit", "w-full", "p-2");

    postElement.innerHTML = `
      <div class="h-[13rem] md:h-[15rem] w-full overflow-hidden mb-5">
        <img src="${
          post.imageUrl
        }" alt="post.jpg" class="object-cover w-full h-full" />
      </div>
      <p class="text-[14px] mb-5">${post.text}</p>
      ${
        admin
          ? `<button class="delete-btn px-4 py-[0.35rem] rounded" data-id="${post.id}" data-image-url="${post.imageUrl}">Delete</button>`
          : ""
      }
    `;

    postsContainer.appendChild(postElement);

    const deleteButton = postElement.querySelector(".delete-btn");
    if (deleteButton) {
      deleteButton.addEventListener("click", () =>
        handleDelete(post.id, post.imageUrl)
      );
    }
  });
}

// ----------------------------------------
// Form Submission Handling
// ----------------------------------------
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = e.target.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Posting...";

  const selectedFile = postImgInput.files[0];
  const postText = postTextInput.value;

  if (!selectedFile) {
    Swal.fire("Error", "Please select an image.", "error");
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
    return;
  }

  if (!postText.trim()) {
    Swal.fire("Error", "Please enter some text.", "error");
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
    return;
  }

  try {
    await handleBlogUpload(selectedFile, postText);
    postImgInput.value = "";
    postTextInput.value = "";
    imagePreview.innerHTML = "<p>No image selected</p>";
    closeModal();
  } catch (error) {
    console.error("Error submitting blog:", error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
  }
});

// ----------------------------------------
// Initial Fetch and Render
// ----------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const blogPosts = await fetchBlogPosts();
    renderBlogPosts(blogPosts);
  } catch (error) {
    console.error("Error rendering blog posts:", error);
  }
});
