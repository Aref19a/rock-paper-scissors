// Define constants for class names
const HERO_ELEMENT = document.querySelector(".hero");
const RESULT_ELEMENT = document.getElementById("result");

// Define choices
const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
const winsToWinGame = 5; // Set the number of wins required to win the game
let gameOver = false; // To track if the game is over

// Function to generate computer's choice
function computerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to update the score display
function updateScore() {
    document.getElementById("player-score").textContent = `Your Score: ${playerScore}`;
    document.getElementById("computer-score").textContent = `Computer Score: ${computerScore}`;
}

// Function to handle class manipulation for the hero element
function updateHeroClass(result) {
    HERO_ELEMENT.classList.remove("is-danger", "is-warning");
    if (result === "You win!") {
        HERO_ELEMENT.classList.remove("is-danger");
    } else if (result === "Computer wins!") {
        HERO_ELEMENT.classList.add("is-danger");
    } else {
        HERO_ELEMENT.classList.add("is-warning");
    }
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

// Function to handle player's choice and display the result
function playGame(playerChoice) {
    if (gameOver) return; // Stop the game if it's already over

    const compChoice = computerChoice();
    const result = determineWinner(playerChoice, compChoice);
    const resultElement = document.getElementById("result");
    resultElement.textContent = `You chose ${playerChoice}. Computer chose ${compChoice}. ${result}`;

    if (result === "You win!") {
        playerScore++;
    } else if (result === "Computer wins!") {
        computerScore++;
    }

    // Check if the game is over
    if (playerScore === winsToWinGame || computerScore === winsToWinGame) {
        gameOver = true;
        displayGameWinner();
    }

    // Update the score display and hero class
    updateScore();
    updateHeroClass(result);
}

// Function to reset the game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;

    // Clear the result and winner text
    RESULT_ELEMENT.textContent = "";
    document.getElementById("winner-text").textContent = "";

    // Update the score display and reset hero class
    updateScore();
    updateHeroClass("");
}

// Event listeners for buttons and reset button
document.getElementById("rock").addEventListener("click", () => playGame("rock"));
document.getElementById("paper").addEventListener("click", () => playGame("paper"));
document.getElementById("scissors").addEventListener("click", () => playGame("scissors"));
document.getElementById("reset-button").addEventListener("click", resetGame);
