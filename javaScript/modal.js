// modal.js
const modal = document.getElementById("game-modal");
const closeButton = document.querySelector(".close-button");
const okButton = document.getElementById("modal-ok-button");
const modalMessage = document.getElementById("modal-message");
const gameOverlay = document.getElementById("modal-overlay");

const showModal = (message, restart = false) => {
  modalMessage.textContent = message;
  modal.style.display = "block";
  gameOverlay.style.display = "block";

  okButton.onclick = () => {
    modal.style.display = "none";
    gameOverlay.style.display = "none";
    if (restart) {
      startGame();
    } else {
      displaySequence();
    }
  };
};
