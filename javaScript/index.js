let sequence = [];
let playerSequence = [];
let level = 1;
let strictMode = false;
let difficultyLevel = 0;
let counter = 0;
let inGame = false;
let soundEnabled = true;
let clickable = false; // A flag to control whether clicks are allowed while board display

// Start the game by initializing the variables and advancing to the first round
const startGame = () => {
  inGame = true;
  sequence = [];
  playerSequence = [];
  level = 1;
  nextRound();
};

// Handle the logic for progressing to the next round
const nextRound = () => {
  playerSequence = [];
  sequence.push(randomColor());
  updateBoard(); // Update the game board based on difficulty
  displaySequence();
  updateLevelDisplay();
};

const updateBoard = () => {
  const isMedium = difficultyLevel === 1;
  const isHard = difficultyLevel === 2;

  document.getElementById("orange").style.display =
    isMedium || isHard ? "block" : "none";
  document.getElementById("purple").style.display =
    isMedium || isHard ? "block" : "none";
  document.getElementById("pink").style.display = isHard ? "block" : "none";
  document.getElementById("cyan").style.display = isHard ? "block" : "none";
  document.getElementById("brown").style.display = isHard ? "block" : "none";

  const gameBoard = document.getElementById("game-board");

  if (isHard) {
    gameBoard.style.gridTemplateColumns = "repeat(3, auto)";
  } else if (isMedium) {
    gameBoard.style.gridTemplateColumns = "repeat(3, auto)";
  } else {
    gameBoard.style.gridTemplateColumns = "repeat(2, auto)";
  }

};

// Generate a random color for the sequence
const randomColor = () => {
  let colors = ["red", "green", "blue", "yellow"];

  if (difficultyLevel === 1) {
    // Medium (6 boxes)
    colors = ["red", "green", "blue", "yellow", "orange", "purple"];
  } else if (difficultyLevel === 2) {
    // Hard (9 boxes)
    colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "orange",
      "purple",
      "pink",
      "cyan",
      "brown",
    ];
  }

  return colors[Math.floor(Math.random() * colors.length)];
};

// Visually display the sequence to the player
const displaySequence = () => {
  inGame = true;
  disableBoard(); // Disable the board before starting the display

  let i = 0;
  const interval = setInterval(() => {
    activateButton(sequence[i]); // Show the button
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      enableBoard(); // Re-enable the board after the sequence is done
    }
  }, 1000);
  counter = 0;
};

const enableBoard = () => {
  clickable = true;
};

const disableBoard = () => {
  clickable = false;
};

// Activate a button with visual and sound effects
const activateButton = (color) => {
  const button = document.getElementById(color);
  if (inGame) {
    // counter++;
    // document.getElementById(color).textContent = `${counter}`;
    button.classList.add("active");
    let sound = "sounds/ding";
    playSound(sound);
    setTimeout(() => button.classList.remove("active"), 500);
  }
};

// Play the sound associated with each button
const playSound = (sound) => {
  if (soundEnabled) {
    const audio = new Audio(`${sound}.mp3`);
    audio.play();
  }
};

// Update the level display on the screen
const updateLevelDisplay = () => {
  document.getElementById("level-display").textContent = `Level: ${level}`;
};

// Handle user input and check if it matches the sequence
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (!clickable) return; // Ignore clicks if the board isn't clickable

    button.classList.add("playerClicked");

    // Play sound when the button is clicked
    let sound = "sounds/mouse-click-sound";
    playSound(sound);

    // Remove the 'playerClicked' class after a short delay
    setTimeout(() => button.classList.remove("playerClicked"), 200);

    // Handle game logic if the game is active
    if (inGame) {
      const color = e.target.id; // Get the color of the clicked button
      playerSequence.push(color); // Add the color to the player's sequence
      checkPlayerInput(); // Check if the player's input is correct
    }
  });
});

// Check the player's input against the sequence
const checkPlayerInput = () => {
  const currentStep = playerSequence.length - 1;
  if (playerSequence[currentStep] === sequence[currentStep]) {
    if (playerSequence.length === sequence.length) {
      level++;
      nextRound();
    }
  } else {
    if (strictMode) {
      showModal("Game Over!", true); // Show modal and restart game
    } else {
      inGame = false;
      showModal("Incorrect, Try again!"); // Show modal and let player try again
      playerSequence = [];
    }
  }
};

// Toggle strict mode on and off
document.getElementById("strict-mode-toggle").addEventListener("click", () => {
  strictMode = !strictMode;
  document.getElementById("strict-mode-toggle").textContent = `Strict Mode: ${
    strictMode ? "On" : "Off"
  }`;
});

// Start the game when the start button clicked
document.getElementById("start-button").addEventListener("click", () => {
  startGame();
});

// Menu buttons cssActive and sound
document.querySelectorAll(".menu-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    button.classList.add("menuButtonClicked");
    if (e.target.id === "start-button") {
      let sound = "sounds/game-start-sound";
      playSound(sound);
    } else {
      let sound = "sounds/mouse-click-sound";
      playSound(sound);
    }
    setTimeout(() => button.classList.remove("menuButtonClicked"), 200);
  });
});

// Add an event listener to the sound toggle button
document.getElementById("sound-toggle").addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  updateSoundButton();
});

// Update the button icon based on the sound state
const updateSoundButton = () => {
  const soundButton = document.getElementById("sound-toggle");
  if (soundEnabled) {
    playSound("sounds/mouse-click-sound");
    soundButton.textContent = "🔊";
  } else {
    soundButton.textContent = "🔇";
  }
};

// Difficulty toggle (0=Easy, 1=Medium, 2=Hard)
document.getElementById("difficulty-toggle").addEventListener("click", () => {
  difficultyLevel = (difficultyLevel + 1) % 3;

  let difficultyText;
  switch (difficultyLevel) {
    case 0:
      difficultyText = "Easy";
      break;
    case 1:
      difficultyText = "Medium";
      break;
    case 2:
      difficultyText = "Hard";
      break;
  }

  document.getElementById(
    "difficulty-toggle"
  ).textContent = `Difficulty: ${difficultyText}`;
  updateBoard(); // Update the board immediately when difficulty changes
});

// Start-game button to game-board transition
document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("menu-container").classList.add("hidden"); // Hide the menu
  document.getElementById("simon-game-container").classList.remove("hidden");
  document.getElementById("menu-container").style.opacity = 0;
  setTimeout(() => {
    document.getElementById("simon-game-container").style.opacity = 1; // Show the game board
  }, 500); // Adjust delay to match CSS transition
});

// Game-board to menu-button transition
document.getElementById("back-to-menu-button").addEventListener("click", () => {
  // Stop the game and reset variables
  inGame = false;
  playerSequence = [];
  sequence = [];
  level = 1;
  clickable = false;
  counter = 0; // Disable board interaction

  document.getElementById("simon-game-container").classList.add("hidden"); // Hide the board
  document.getElementById("menu-container").classList.remove("hidden");
  document.getElementById("simon-game-container").style.opacity = 0;
  setTimeout(() => {
    document.getElementById("menu-container").style.opacity = 1; // Show the game board
  }, 500); // Adjust delay to match CSS transition
});


