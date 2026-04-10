/* -------------------------------------------------------
   SCRIPT.JS — Match Game Engine
   Reads from config.js + data-*.js files
   Only uses entries where isAcronym: true
------------------------------------------------------- */

const PAIR_COUNT = 8;   // cards on board = PAIR_COUNT * 2

let currentSubject = "ICT";
let flipped      = [];
let matchedCount = 0;
let moves        = 0;
let locked       = false;


/* -------------------------------------------------------
   ON LOAD — build subject dropdown and start game
------------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
    const subjectSelect = document.getElementById("subject-select");

    SUBJECTS.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s.name;
        opt.textContent = s.name;
        subjectSelect.appendChild(opt);
    });

    subjectSelect.value = currentSubject;
    subjectSelect.addEventListener("change", () => {
        currentSubject = subjectSelect.value;
        initGame();
    });

    initGame();
});


/* -------------------------------------------------------
   INIT GAME — pick random pairs and build the board
------------------------------------------------------- */
function initGame() {
    moves        = 0;
    matchedCount = 0;
    flipped      = [];
    locked       = false;

    document.getElementById("moves").textContent   = 0;
    document.getElementById("matches").textContent = 0;
    document.getElementById("win-box").classList.remove("show");

    const pool = getAcronymEntries(currentSubject);

    if (pool.length < PAIR_COUNT) {
        document.getElementById("board").innerHTML =
            `<p class="error">Not enough acronym entries in ${currentSubject} (need ${PAIR_COUNT}, have ${pool.length}).</p>`;
        return;
    }

    const picked = shuffle(pool).slice(0, PAIR_COUNT);

    document.getElementById("total-pairs").textContent = PAIR_COUNT;

    const deck = shuffle([
        ...picked.map((entry, i) => ({ id: i, type: "acronym",    text: entry.acronym })),
        ...picked.map((entry, i) => ({ id: i, type: "definition", text: entry.full    }))
    ]);

    const board = document.getElementById("board");
    board.innerHTML = "";

    deck.forEach(data => {
        const wrap = document.createElement("div");
        wrap.className = "card-wrap";
        wrap.dataset.id = data.id;

        wrap.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front">?</div>
                <div class="card-face card-back ${data.type === "acronym" ? "is-acronym" : "is-definition"}">${data.text}</div>
            </div>`;

        wrap.addEventListener("click", () => onCardClick(wrap));
        board.appendChild(wrap);
    });
}


/* -------------------------------------------------------
   CARD CLICK
------------------------------------------------------- */
function onCardClick(card) {
    if (locked) return;
    if (card.classList.contains("flipped"))  return;
    if (card.classList.contains("matched"))  return;
    if (flipped.length === 2) return;

    card.classList.add("flipped");
    flipped.push(card);

    if (flipped.length === 2) {
        moves++;
        document.getElementById("moves").textContent = moves;
        checkMatch();
    }
}


/* -------------------------------------------------------
   CHECK FOR MATCH
------------------------------------------------------- */
function checkMatch() {
    const [a, b] = flipped;

    if (a.dataset.id === b.dataset.id) {
        a.classList.add("matched");
        b.classList.add("matched");
        a.classList.remove("flipped");
        b.classList.remove("flipped");
        matchedCount++;
        document.getElementById("matches").textContent = matchedCount;
        flipped = [];

        if (matchedCount === PAIR_COUNT) {
            document.getElementById("final-moves").textContent = moves;
            setTimeout(() => document.getElementById("win-box").classList.add("show"), 400);
        }
    } else {
        locked = true;
        setTimeout(() => {
            a.classList.remove("flipped");
            b.classList.remove("flipped");
            flipped  = [];
            locked   = false;
        }, 1000);
    }
}
