document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");

  if (!form) {
    console.error("❌ contactForm not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (status) status.innerText = "Sending...";

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    // ✅ validation safety
    if (!name || !email || !message) {
      if (status) status.innerText = "❌ All fields required";
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      let result = {};
      try {
        result = await res.json();
      } catch {
        // fallback if response is not JSON
        result.msg = "Invalid server response";
      }

      if (res.ok) {
        if (status) status.innerText = "✅ Message sent successfully!";
        form.reset();
      } else {
        if (status) status.innerText = result.msg || "❌ Failed to send";
      }

    } catch (err) {
      console.error("Fetch error:", err);
      if (status) status.innerText = "❌ Server not reachable";
    }
  });

});