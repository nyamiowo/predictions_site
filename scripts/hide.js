const input = document.getElementById('username');
const buttonContainer = document.querySelector('.button-container');

input.addEventListener('input', () => {
  if (input.value.trim() !== '') {
    buttonContainer.classList.add('visible');
  } else {
    buttonContainer.classList.remove('visible');
  }
});