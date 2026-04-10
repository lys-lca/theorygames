/* -------------------------------------------------------
   RUN.JS — Flashcard Engine
   Reads from config.js + data-*.js files
------------------------------------------------------- */

let currentSubject  = "ICT";
let currentCategory = "ALL";
let activeDeck      = [];
let currentIndex    = 0;
let correct         = 0;
let incorrect       = 0;
let incorrectCards  = [];
let isFlipped       = false;


/* -------------------------------------------------------
   ON LOAD
------------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
    buildSubjectDropdown();
    buildCategoryDropdown();
    loadDeck();
    loadCard();
    restoreDarkMode();
});


/* -------------------------------------------------------
   DROPDOWNS
------------------------------------------------------- */
function buildSubjectDropdown() {
    const sel = document.getElementById("subject-select");
    sel.innerHTML = "";

    const allOpt = document.createElement("option");
    allOpt.value = "ALL";
    allOpt.textContent = "All Subjects";
    sel.appendChild(allOpt);

    SUBJECTS.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s.name;
        opt.textContent = s.name;
        sel.appendChild(opt);
    });

    sel.value = currentSubject;
    sel.addEventListener("change", () => {
        currentSubject = sel.value;
        currentCategory = "ALL";
        buildCategoryDropdown();
        loadDeck();
        loadCard();
    });
}

function buildCategoryDropdown() {
    const sel = document.getElementById("category-select");
    sel.innerHTML = "";

    const allOpt = document.createElement("option");
    allOpt.value = "ALL";
    allOpt.textContent = "All Categories";
    sel.appendChild(allOpt);

    const cats = getCategories(currentSubject === "ALL" ? "ALL" : currentSubject);
    cats.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        sel.appendChild(opt);
    });

    sel.value = currentCategory;
    sel.addEventListener("change", () => {
        currentCategory = sel.value;
        loadDeck();
        loadCard();
    });
}


/* -------------------------------------------------------
   DECK MANAGEMENT
------------------------------------------------------- */
function loadDeck() {
    let entries = getAllEntries(currentSubject === "ALL" ? "ALL" : currentSubject);

    if (currentCategory !== "ALL") {
        entries = entries.filter(e => e.category === currentCategory);
    }

    activeDeck   = shuffle(entries);
    currentIndex = 0;
    correct      = 0;
    incorrect    = 0;
    incorrectCards = [];
    updateScore();
}

function loadTwentyCards() {
    let entries = getAllEntries(currentSubject === "ALL" ? "ALL" : currentSubject);
    if (currentCategory !== "ALL") {
        entries = entries.filter(e => e.category === currentCategory);
    }
    activeDeck   = shuffle(entries).slice(0, 20);
    currentIndex = 0;
    loadCard();
}

function reviewIncorrect() {
    if (incorrectCards.length === 0) {
        alert("No incorrect cards to review!");
        return;
    }
    activeDeck   = shuffle([...incorrectCards]);
    currentIndex = 0;
    loadCard();
}


/* -------------------------------------------------------
   LOAD CARD
------------------------------------------------------- */
function loadCard() {
    if (activeDeck.length === 0) return;

    const card = activeDeck[currentIndex];
    isFlipped   = false;

    // Reset flip state
    const cardEl = document.getElementById("flashcard");
    cardEl.classList.remove("flipped");

    // Front side
    document.getElementById("card-category").textContent = card.category || "";
    document.getElementById("card-question").textContent = card.acronym  || "";
    document.getElementById("card-hint").textContent     = card.hint     || "";
    document.getElementById("card-hint").classList.remove("visible");
    document.getElementById("hint-btn").textContent = "Show hint";

    // Back side
    document.getElementById("card-full").textContent   = card.full   || "";
    document.getElementById("card-answer").textContent = card.answer || "";

    // Image (front)
    const img = document.getElementById("card-image");
    if (card.image) {
        img.src = card.image;
        img.style.display = "block";
    } else {
        img.style.display = "none";
    }

    // Counter + progress
    document.getElementById("counter").textContent =
        `${currentIndex + 1} / ${activeDeck.length}`;

    const pct = ((currentIndex + 1) / activeDeck.length) * 100;
    document.getElementById("progress-bar").style.width = pct + "%";

    updateScore();
}


/* -------------------------------------------------------
   FLIP
------------------------------------------------------- */
function revealAnswer() {
    const cardEl = document.getElementById("flashcard");
    if (!isFlipped) {
        cardEl.classList.add("flipped");
        isFlipped = true;
    }
}

function toggleHint() {
    const hintEl = document.getElementById("card-hint");
    const btn    = document.getElementById("hint-btn");
    const showing = hintEl.classList.toggle("visible");
    btn.textContent = showing ? "Hide hint" : "Show hint";
}


/* -------------------------------------------------------
   NAVIGATION & SCORING
------------------------------------------------------- */
function nextCard() {
    currentIndex = (currentIndex + 1) % activeDeck.length;
    loadCard();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + activeDeck.length) % activeDeck.length;
    loadCard();
}

function markCorrect() {
    correct++;
    nextCard();
}

function markIncorrect() {
    incorrect++;
    const card = activeDeck[currentIndex];
    if (!incorrectCards.includes(card)) incorrectCards.push(card);
    nextCard();
}

function resetScores() {
    correct        = 0;
    incorrect      = 0;
    incorrectCards = [];
    updateScore();
}

function updateScore() {
    document.getElementById("correct").textContent   = correct;
    document.getElementById("incorrect").textContent = incorrect;
}


/* -------------------------------------------------------
   PRINT INCORRECT
------------------------------------------------------- */
function printIncorrect() {
    if (incorrectCards.length === 0) {
        alert("No incorrect cards to print!");
        return;
    }

    const printArea  = document.getElementById("print-area");
    let html = "<h1>Incorrect Flashcards Review</h1>";

    incorrectCards.forEach(card => {
        html += `
            <div style="margin-bottom:25px;padding:15px;border:1px solid #999;border-radius:8px;">
                <h2>${card.acronym}</h2>
                <p><strong>Full:</strong> ${card.full}</p>
                <p><strong>Category:</strong> ${card.category}</p>
                <p><strong>Hint:</strong> ${card.hint}</p>
                <p><strong>Answer:</strong> ${card.answer}</p>
            </div>`;
    });

    printArea.innerHTML = html;
    document.querySelector(".screen").style.display = "none";
    printArea.style.display = "block";
    window.print();
    printArea.style.display = "none";
    document.querySelector(".screen").style.display = "";
}


/* -------------------------------------------------------
   DARK MODE
------------------------------------------------------- */
function toggleDarkMode() {
    const enabled = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", enabled);
    document.getElementById("dark-btn").textContent =
        enabled ? "Light mode" : "Dark mode";
}

function restoreDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        const btn = document.getElementById("dark-btn");
        if (btn) btn.textContent = "Light mode";
    }
}
