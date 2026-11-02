import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Login Check
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// ===============================
// NoteImperial Admin Dashboard
// ===============================

// Form Elements
const titleInput = document.getElementById("title");
const subjectInput = document.getElementById("subject");
const semesterInput = document.getElementById("semester");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const pdfInput = document.getElementById("pdfFile");
const publishBtn = document.getElementById("publishBtn");
const notesList = document.getElementById("notesList");
const paymentsList = document.getElementById("paymentsList");
const logoutBtn = document.getElementById("logoutBtn");

// ===============================
// Load Notes
// ===============================

let notes = [];
let editId = null;
loadNotes();
loadPayments();
// ===============================
// Publish Note
// ===============================

publishBtn.addEventListener("click", async function () {

    const title = titleInput.value.trim();
    const subject = subjectInput.value.trim();
    const semester = semesterInput.value;
    const price = priceInput.value.trim();
    const description = descriptionInput.value.trim();
    const pdfFile = pdfInput.files[0];

    if (
        title === "" ||
        subject === "" ||
        semester === "Select Semester" ||
        price === "" ||
        description === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    const newNote = {
    title,
    subject,
    semester,
    price,
    description,
    pdfName: pdfFile ? pdfFile.name : ""
};

// Firebase me bhi save karo

if (editId) {

    await updateDoc(doc(db, "notes", editId), newNote);

    editId = null;

    alert("✅ Note Updated Successfully!");

} else {

    await addDoc(collection(db, "notes"), newNote);

    alert("✅ Note Published Successfully!");

}

clearForm();

await loadNotes();

});

async function loadNotes() {

    notes = [];

    const querySnapshot = await getDocs(collection(db, "notes"));

    querySnapshot.forEach((document) => {

        notes.push({
            id: document.id,
            ...document.data()
        });

    });

    showNotes();

}
    async function loadPayments() {

    paymentsList.innerHTML = "";

    const paymentSnapshot = await getDocs(collection(db, "payments"));

    if (paymentSnapshot.empty) {

        paymentsList.innerHTML = "<p>No payment requests yet.</p>";

        return;

    }

    paymentSnapshot.forEach((payment) => {

        const data = payment.data();

        paymentsList.innerHTML += `

        <div class="note-card">

            <h3>${data.noteTitle}</h3>

            <p><b>Subject:</b> ${data.subject}</p>

            <p><b>${data.semester}</b></p>

            <p><b>₹${data.price}</b></p>

            <p><b>Status:</b> ${data.paymentStatus}</p>

            <p>${data.date}</p>

        </div>

        `;

    });

}

// ===============================
// Show Notes
// ===============================

function showNotes() {

    if (notes.length === 0) {

        notesList.innerHTML = "<p>No notes uploaded yet.</p>";

        return;
    }

    notesList.innerHTML = "";

    notes.forEach((note, index) => {

        notesList.innerHTML += `

        <div class="note-card">

            <h3>${note.title}</h3>

            <p><b>Subject:</b> ${note.subject}</p>

            <p><b>${note.semester}</b></p>

            <p><b>₹${note.price}</b></p>

            <p>${note.description}</p>
<p><b>PDF:</b> ${note.pdfName || "No PDF"}</p>

            <br>

            <button onclick="editNote(${index})">✏️ Edit</button>

            <button onclick="deleteNote(${index})">🗑 Delete</button>

        </div>

        `;

    });

}

// ===============================
// Delete Note
// ===============================

async function deleteNote(index) {

    if (!confirm("Delete this note?")) return;

    await deleteDoc(doc(db, "notes", notes[index].id));

    alert("✅ Note Deleted!");

    await loadNotes();

}

// ===============================
// Edit Note
// ===============================

function editNote(index) {

    const note = notes[index];

    titleInput.value = note.title;
    subjectInput.value = note.subject;
    semesterInput.value = note.semester;
    priceInput.value = note.price;
    descriptionInput.value = note.description;

    editId = note.id;

}

// ===============================
// Clear Form
// ===============================

function clearForm() {

    titleInput.value = "";
    subjectInput.value = "";
    semesterInput.selectedIndex = 0;
    priceInput.value = "";
    descriptionInput.value = "";

}

// ===============================
// Logout
// ===============================

logoutBtn.addEventListener("click", function () {

    localStorage.removeItem("isLoggedIn");

    alert("Logged Out Successfully!");

    window.location.href = "login.html";

});

window.editNote = editNote;
window.deleteNote = deleteNote;
