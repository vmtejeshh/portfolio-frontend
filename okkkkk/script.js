// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDulkdtxda8ad1olEYVS37M_ce-ojukcx4",
  authDomain: "my-portfolio-a552e.firebaseapp.com",
  projectId: "my-portfolio-a552e",
  storageBucket: "my-portfolio-a552e.firebasestorage.app",
  messagingSenderId: "185549159877",
  appId: "1:185549159877:web:0f1569f51f4a6248f51fac",
  measurementId: "G-8TSDBTS9QR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");

  // ❗ Ensure form exists
  if (!form) {
    console.error("❌ contactForm not found in HTML");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show sending state
    if (status) status.innerText = "Sending...";

    // Get values safely
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    // ❗ Validate inputs
    if (!name || !email || !message) {
      if (status) status.innerText = "❌ Please fill all fields";
      return;
    }

    try {
      // Save directly to Firestore Collection 'contact_messages'
      await addDoc(collection(db, "contact_messages"), {
        name: name,
        email: email,
        message: message,
        createdAt: serverTimestamp()
      });

      if (status) status.innerText = "✅ Message sent successfully!";
      form.reset();

    } catch (error) {
      console.error("❌ Firebase Write Error:", error);
      if (status) status.innerText = "❌ Failed to send message. Please try again.";
    }
  });
});