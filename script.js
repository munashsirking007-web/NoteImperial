import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function () {

    // ===========================
    // SEARCH
    // ===========================

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function searchNotes() {

        const value = searchInput.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    }

    if (searchBtn) {
        searchBtn.addEventListener("click", searchNotes);
    }

    if (searchInput) {
        searchInput.addEventListener("input", searchNotes);
    }


    // ===========================
    // ADMIN NOTES LOAD
    // ===========================

    const adminContainer = document.getElementById("adminNotes");

    if (!adminContainer) return;

    const notes = [];

const querySnapshot = await getDocs(collection(db, "notes"));

querySnapshot.forEach((document) => {

    notes.push(document.data());

});

    notes.forEach(note => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
<div class="card-icon">📚</div>

<h3>${note.title}</h3>

<p>${note.subject}</p>

<p>${note.semester}</p>

<div class="rating">⭐⭐⭐⭐⭐</div>

<p class="price">₹${note.price}</p>

<p>${note.description}</p>

<button class="buyBtn">Buy Now</button>

<br><br>

<a href="PDF/${note.pdfName}" download>
    
</a>
`;


        adminContainer.appendChild(card);

        // BUY BUTTON

        const buyBtn = card.querySelector(".buyBtn");


       buyBtn.addEventListener("click", function () {

    window.location.href =
    `payment.html?title=${encodeURIComponent(note.title)}&subject=${encodeURIComponent(note.subject)}&semester=${encodeURIComponent(note.semester)}&price=${encodeURIComponent(note.price)}`;

});

        });

    });

    // CLOSE MODAL

const modal = document.getElementById("purchaseModal");

const closeModal = document.getElementById("closeModal");


if(closeModal){

closeModal.onclick = function(){
    modal.style.display="none";
}

}


// PAYMENT SUBMIT

const confirmBuy = document.getElementById("confirmBuy");


if(confirmBuy){

confirmBuy.onclick = function(){

alert(
"Payment proof submitted!\nWe will verify and send your notes."
);

modal.style.display="none";

}

}