// DOM Elements
const choices = document.querySelectorAll(".choice");
const userScoreDisplay = document.getElementById("users-score");
const compScoreDisplay = document.getElementById("comps-score");
const streakBadge = document.getElementById("streak-badge");
const bestStreakDisplay = document.getElementById("best-streak-display");
const highScoreDisplay = document.getElementById("high-score-display");
const rankBadge = document.getElementById("rank-badge");
const comboBurst = document.getElementById("combo-burst");
const outcomeBurst = document.getElementById("outcome-burst");
const userChoiceVal = document.getElementById("userchoice");
const compChoiceVal = document.getElementById("compchoice");
const gameContainer = document.getElementById("game-container");
const resetBtn = document.getElementById("reset-btn");

// Game State
let userScore = 0;
let compScore = 0;
let winStreak = 0;
let bestStreak = localStorage.getItem("rps-best-streak") || 0;
let highScore = localStorage.getItem("rps-high-score") || 0;
let isPlaying = false;

/**
 * Ranks based on total wins
 */
const getRank = (score) => {
  if (score >= 50) return "Grandmaster";
  if (score >= 30) return "Master";
  if (score >= 20) return "Elite";
  if (score >= 10) return "Veteran";
  return "Rookie";
};

/**
 * Updates HUD stats and Rank
 */
const updateStats = () => {
  if (userScore > highScore) {
    highScore = userScore;
    localStorage.setItem("rps-high-score", highScore);
  }
  highScoreDisplay.innerText = `Best Score: ${highScore}`;

  if (winStreak > bestStreak) {
    bestStreak = winStreak;
    localStorage.setItem("rps-best-streak", bestStreak);
  }
  bestStreakDisplay.innerText = `Best: ${bestStreak}`;

  rankBadge.innerText = `Rank: ${getRank(userScore)}`;

  if (winStreak >= 2) {
    streakBadge.innerText = `🔥 Streak: ${winStreak}`;
    streakBadge.classList.add("active");
  } else {
    streakBadge.classList.remove("active");
  }
};

/**
 * Triggers Burst Animations (Combo or Outcome)
 */
const triggerBurst = (type, text, outcome) => {
  const target = type === "combo" ? comboBurst : outcomeBurst;
  
  target.innerText = text;
  target.className = type === "combo" ? "combo-burst active" : `outcome-burst active ${outcome}`;
  
  setTimeout(() => {
    target.classList.remove("active");
  }, 2000); // Increased duration for better visibility
};

/**
 * Visual Feedback for Wins/Losses
 */
const triggerFeedback = (outcome) => {
  gameContainer.classList.remove("win-flash", "lose-flash", "draw-pulse");
  void gameContainer.offsetWidth; 
  
  if (outcome === "win") {
    gameContainer.classList.add("win-flash");
    if (winStreak >= 2) triggerBurst("combo", `COMBO x${winStreak}`);
  } else if (outcome === "lose") {
    gameContainer.classList.add("lose-flash");
  } else {
    gameContainer.classList.add("draw-pulse");
  }
};

/**
 * Updates the game score and triggers the burst
 */
const finalizeRound = (outcome, userChoice, compChoice) => {
  if (outcome === "win") {
    userScore++;
    winStreak++;
  } else if (outcome === "lose") {
    compScore++;
    winStreak = 0;
  } else {
    winStreak = 0;
  }

  userChoiceVal.innerText = userChoice;
  compChoiceVal.innerText = compChoice;

  const resultText = outcome === "win" ? "VICTORY!" : (outcome === "lose" ? "DEFEAT" : "DRAW");
  triggerBurst("outcome", resultText, outcome);
  triggerFeedback(outcome);
  updateStats();

  userScoreDisplay.innerText = userScore;
  compScoreDisplay.innerText = compScore;
  
  isPlaying = false;
};

const playRound = (userChoice) => {
  if (isPlaying) return;
  isPlaying = true;

  const options = ["rock", "paper", "scissors"];
  const compChoice = options[Math.floor(Math.random() * options.length)];
  
  const winConditions = { rock: "scissors", paper: "rock", scissors: "paper" };
  const outcome = userChoice === compChoice ? "draw" : (winConditions[userChoice] === compChoice ? "win" : "lose");
  
  finalizeRound(outcome, userChoice, compChoice);
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  winStreak = 0;
  userScoreDisplay.innerText = "0";
  compScoreDisplay.innerText = "0";
  userChoiceVal.innerText = "—";
  compChoiceVal.innerText = "—";
  updateStats();
};

// Initialize
updateStats();

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    playRound(choice.getAttribute("id"));
  });
});

resetBtn.addEventListener("click", resetGame);
