// ===============================
// NOTEIMPERIAL LOGIN SYSTEM
// ===============================

// Elements
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

// Login Button
loginBtn.addEventListener("click", function () {

    // Input Values
    const user = username.value.trim();
    const pass = password.value.trim();

    // Empty Fields Check
    if (user === "" || pass === "") {
        message.style.color = "orange";
        message.innerText = "Please fill all fields!";
        return;
    }

    // Login Check
    if (user === "munashshir" && pass === "786") {

        message.style.color = "green";
        message.innerText = "✅ Login Successful!";
localStorage.setItem("isLoggedIn", "true");
        // Redirect after 1 second
        setTimeout(function () {
            window.location.href = "admin.html";
        }, 1000);

    } else {

        message.style.color = "red";
        message.innerText = "❌ Invalid Username or Password";

    }

});