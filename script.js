// Get all the elements with the class "choice"
const choices = document.querySelectorAll(".choice");

// Get reference to display elements
const resultDisplay = document.getElementById("result");
const userChoiceDisplay = document.getElementById("userchoice");
const compChoiceDisplay = document.getElementById("compchoice");
const userScoreDisplay = document.getElementById("users-score");
const compScoreDisplay = document.getElementById("comps-score");

// Initialize user and computer scores
let userScore = 0;
let compScore = 0;

// Function to update the score based on game outcome
const updateScore = (userWin) => {
  if (userWin) {
    userScore += 1;
    resultDisplay.innerText = "You win!";
    resultDisplay.style.backgroundColor = "green"; // Green for a win
  } else {
    compScore += 1;
    resultDisplay.innerText = "You lose!";
    resultDisplay.style.backgroundColor = "red"; // Red for a loss
  }

  // Update score on the UI
  userScoreDisplay.innerText = userScore;
  compScoreDisplay.innerText = compScore;
};

// Function to handle a draw
const handleDraw = () => {
  resultDisplay.innerText = "It's a draw!";
  resultDisplay.style.backgroundColor = "yellow"; // Yellow for a draw
};

// Function to determine the winner
const determineWinner = (userChoice, compChoice) => {
  if (userChoice === compChoice) {
    handleDraw(); // If both choices are the same, it's a draw
  } else {
    let userWin = checkWinner(userChoice, compChoice);
    updateScore(userWin); // Update score based on whether user won or lost
  }
};

// Function to check the winning logic
const checkWinner = (userChoice, compChoice) => {
  switch (userChoice) {
    case "rock":
      return compChoice === "scissors"; // Rock beats scissors
    case "paper":
      return compChoice === "rock"; // Paper beats rock
    case "scissors":
      return compChoice === "paper"; // Scissors beats paper
    default:
      return false;
  }
};

// Function to generate a random move for the computer
const generateCompMove = () => {
  const options = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return options[randomIndex]; // Randomly select rock, paper, or scissors
};

// Function to handle user's choice
const handleUserChoice = (userChoice) => {
  // Display user's choice
  userChoiceDisplay.innerText = `Your choice: ${userChoice}`;

  // Generate computer's move and display it
  const compChoice = generateCompMove();
  compChoiceDisplay.innerText = `Computer's choice: ${compChoice}`;

  // Determine the winner based on choices
  determineWinner(userChoice, compChoice);
};

// Add event listeners to all choice elements
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id"); // Get the id (rock, paper, or scissors)
    handleUserChoice(userChoice); // Handle the user's selection
  });
});
