// Get references to the elements
const instructionsButton = document.getElementById('instructions-btn');
const instructionsModal = document.getElementById('instructions-modal');
const closeInstructionsButton = document.getElementById('close-instructions-btn');

// Show the instructions modal when the button is clicked
instructionsButton.addEventListener('click', () => {
  instructionsModal.style.display = 'flex'; // Show the modal
});

// Hide the instructions modal when the close button is clicked
closeInstructionsButton.addEventListener('click', () => {
  instructionsModal.style.display = 'none'; // Hide the modal
});
