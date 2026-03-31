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
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      let result = {};

      // ❗ Handle invalid JSON safely
      try {
        result = await res.json();
      } catch {
        result.msg = "Invalid server response";
      }

      if (res.ok) {
        if (status) status.innerText = "✅ Message sent successfully!";
        form.reset();
      } else {
        if (status) status.innerText = result.msg || "❌ Failed to send";
      }

    } catch (error) {
      console.error("❌ Fetch error:", error);
      if (status) status.innerText = "❌ Server not reachable";
    }
  });

});