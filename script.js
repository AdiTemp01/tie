const questions = [
    "Select all EVEN numbers that are directly above OR immediate right of .",
    "Select all numbers that are directly above EVEN numbers AND immediate left of .",
    "Select all numbers that are NOT directly below OR NOT immediate right of .",
    "Select all prime numbers that are directly above EVEN numbers AND NOT immediate right of .",
];

const gridColors = [
    "red", "yellow", "red", "green", "red",
    "green", "red", "yellow", "green", "red",
    "yellow", "green", "red", "yellow", "green",
    "red", "yellow", "green", "red", "yellow",
    "green", "red", "yellow", "green", "red",
    "yellow", "green", "red", "yellow", "green"
];

const correctAnswers = [
   [2,8,14,20],
   [9,21],
   [2,11,14,,17,20,26,29],
   [3]
];

let cll = 0;
let css = [];
let sc = 0;
let sm = questions.length;

function createGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = ""; // Clear any previous grid
    gridColors.forEach((color, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell", color);
        cell.textContent = index + 1;
        cell.addEventListener("click", () => handleCellClick(cell, index + 1));
        grid.appendChild(cell);
    });
}

function handleCellClick(cell, cellIndex) {
    if (css.includes(cellIndex)) {
        cell.classList.remove("selected");
        css = css.filter(c => c !== cellIndex);
    } else {
        cell.classList.add("selected");
        css.push(cellIndex);
    }
}

function loadQuestion() {
    const questionElement = document.getElementById("current-question");
    if (questionElement) {
        questionElement.textContent = questions[cll];
    } else {
        console.error("Question element not found. Ensure your HTML has an element with id='current-question'.");
    }
}

function submitAnswer() {
    const correct = correctAnswers[cll];
    const ctt = correct.length;
    const selectedCorrect = css.filter(c => correct.includes(c)).length;
    const selectedIncorrect = css.filter(c => !correct.includes(c)).length;

    let scoreForThisQuestion = 0;

    if (selectedIncorrect > 0) {
        scoreForThisQuestion = 0; 
        alert(`You included wrong cells. No marks awarded for this question.`);
    } else if (selectedCorrect > 0) {
        scoreForThisQuestion = (selectedCorrect / ctt).toFixed(2);
        alert(`You selected ${selectedCorrect}/${ctt} correct cells. Marks awarded: ${scoreForThisQuestion * (45 / sm)}`);
    } else {
        alert(`No correct cells selected. No marks awarded.`);
    }

    sc += parseFloat(scoreForThisQuestion);
    css = [];
    document.querySelectorAll(".selected").forEach(cell => cell.classList.remove("selected"));

    // Display total points after each level
    alert(`Your total score so far is: ${(sc * 45 / sm).toFixed(2)}`);

    if (cll < questions.length - 1) {
        cll++;
        loadQuestion();
    } else {
        const finalPercentage = (((sc / sm) * 100).toFixed(2)) * 45 / 100;
        alert(`Game Over! Your final score is ${finalPercentage}.`);
        location.reload();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createGrid();
    loadQuestion();
    document.getElementById("submit-answer").addEventListener("click", submitAnswer);
});
