// Get references to the elements
const instructionsButton = document.getElementById('rightImg');
const instructionsModal = document.getElementById('instructions-modal');
const overlay = document.getElementById("modal-overlay");
const closeInstructionsButton = document.getElementById('close-instructions-btn');

// Show the instructions modal when the button is clicked
instructionsButton.addEventListener('click', () => {
  instructionsModal.style.display = 'flex'; // Show the modal
  overlay.style.display = 'block';
});

// Hide the instructions modal when the close button is clicked
closeInstructionsButton.addEventListener('click', () => {
  instructionsModal.style.display = 'none'; // Hide the modal
  overlay.style.display = "none";
});



