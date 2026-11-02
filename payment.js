import { storage } from "./firebase.js";
import { db } from "./firebase.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ===============================
// NoteImperial Payment Page
// ===============================

// URL se data lena
const params = new URLSearchParams(window.location.search);

const title = params.get("title");
const subject = params.get("subject");
const semester = params.get("semester");
const price = params.get("price");

// Show Details
document.getElementById("noteTitle").innerText = title || "Note";
document.getElementById("noteSubject").innerText = subject || "-";
document.getElementById("noteSemester").innerText = semester || "-";
document.getElementById("notePrice").innerText = price || "0";

document.getElementById("paidBtn").addEventListener("click", async  function () {

    const screenshot = document.getElementById("paymentScreenshot").files[0];

if (!screenshot) {

    alert("Please upload your payment screenshot first.");

    return;

}

const screenshotRef = ref(
    storage,
    "payment-screenshots/" + Date.now() + "-" + screenshot.name
);

// Abhi upload ko temporarily band rakhte hain
 await uploadBytes(screenshotRef, screenshot);
const screenshotURL = await getDownloadURL(screenshotRef);
await addDoc(collection(db, "payments"), {

    noteTitle: title,

    subject: subject,

    semester: semester,

    price: price,

    paymentStatus: "Pending",

    date: new Date().toLocaleString(),
    screenshotURL: screenshotURL
});

    const status = document.getElementById("status");

    status.style.color = "#16a34a";

    status.innerHTML = `
        ✅ Payment request submitted successfully.<br><br>
        Your payment will be verified within a few minutes.<br>
        After verification, your PDF will be available.
    `;

    document.getElementById("paidBtn").disabled = true;
    document.getElementById("paidBtn").innerText = "Payment Submitted";

});