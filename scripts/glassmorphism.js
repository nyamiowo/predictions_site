async function getPrediction() {
const name = document.getElementById('username').value;
if (!name) {
    alert("Введите имя!");
    return;
}

try {
    const response = await fetch('http://127.0.0.1:8000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
    });

    const data = await response.json();

    document.getElementById('greeting').innerText = `Привет, ${name}!`;
    document.getElementById('prediction').innerText = "Прогноз: " + data.prediction;

    saveToLocalStorage(name, data.prediction);
    showHistory();
    updateContainerHeight();

} catch (error) {
    console.error('Ошибка при получении прогноза:', error);
}
}

function saveToLocalStorage(name, prediction) {
const history = JSON.parse(localStorage.getItem('history')) || [];
history.push({ name, prediction });
localStorage.setItem('history', JSON.stringify(history));
}

function showHistory() {
const history = JSON.parse(localStorage.getItem('history')) || [];
const list = document.getElementById('historyList');
list.innerHTML = '';

history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name}: ${item.prediction}`;
    list.appendChild(li);
});

updateContainerHeight();
}

async function clearHistory() {
localStorage.removeItem('history');

document.getElementById('greeting').innerText = '';
document.getElementById('prediction').innerText = '';
document.getElementById('historyList').innerHTML = '';

await fetch('http://127.0.0.1:8000/clear_history', { method: 'DELETE' });

updateContainerHeight();
}

function updateContainerHeight() {
const container = document.querySelector('.glassmorphism-container');
const content = document.querySelector('.glassmorphism');
const newHeight = content.scrollHeight + 40; // добавляем немного отступа

container.style.height = `${newHeight}px`;
}

// Обновим размер при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
showHistory();
updateContainerHeight();
});
