const quizDiv = document.getElementById("quiz");
const wordBankDiv = document.getElementById("wordBank");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const showAnswersBtn = document.getElementById("showAnswersBtn");

let quizQuestions = [];
let draggedWord = null;
let hintMode = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createWord(text) {
  const word = document.createElement("div");
  word.className = "word";
  word.textContent = text;
  word.draggable = true;

  word.addEventListener("dragstart", () => draggedWord = word);
  word.addEventListener("dragend", () => draggedWord = null);

  return word;
}

function loadQuiz() {
  quizDiv.innerHTML = "";
  wordBankDiv.innerHTML = "";
  scoreDiv.textContent = "";
  showAnswersBtn.classList.add("hidden");

  quizQuestions = shuffle([...allQuestions]).slice(0, 5);
  const words = shuffle(quizQuestions.map(q => q.answer));

  words.forEach(w => wordBankDiv.appendChild(createWord(w)));

  quizQuestions.forEach(q => {
    const row = document.createElement("div");
    row.className = "question";

    const drop = document.createElement("span");
    drop.className = "drop";
    drop.dataset.answer = q.answer;

    if (hintMode) {
      drop.innerHTML = `<span class="hint">${q.answer[0]}...</span>`;
    }

    drop.addEventListener("dragover", e => e.preventDefault());
    drop.addEventListener("drop", () => handleDrop(drop));

    const parts = q.text.split("___");
    row.append(parts[0], drop, parts[1]);
    quizDiv.appendChild(row);
  });
}

function handleDrop(drop) {
  if (!draggedWord) return;

  const existing = drop.querySelector(".word");
  if (existing) wordBankDiv.appendChild(existing);

  drop.innerHTML = "";
  drop.appendChild(draggedWord);
}

wordBankDiv.addEventListener("dragover", e => e.preventDefault());

wordBankDiv.addEventListener("drop", () => {
  if (draggedWord) {
    wordBankDiv.appendChild(draggedWord);
  }
});

submitBtn.addEventListener("click", () => {
  let score = 0;

  document.querySelectorAll(".drop").forEach(drop => {
    const word = drop.querySelector(".word");
    const correct = drop.dataset.answer.toLowerCase();

    if (!word) return;

    word.classList.remove("correct", "incorrect");

    if (word.textContent.toLowerCase() === correct) {
      word.classList.add("correct");
      score++;
    } else {
      word.classList.add("incorrect");
    }
  });

  scoreDiv.textContent = `Score: ${score} / ${quizQuestions.length}`;
  showAnswersBtn.classList.remove("hidden");
});

showAnswersBtn.addEventListener("click", () => {
  document.querySelectorAll(".drop").forEach(drop => {
    drop.innerHTML = "";
    const correctWord = createWord(drop.dataset.answer);
    correctWord.classList.add("correct");
    drop.appendChild(correctWord);
  });
});

resetBtn.addEventListener("click", loadQuiz);

loadQuiz();
``