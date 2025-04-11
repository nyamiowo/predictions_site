async function getPrediction() {
    const name = document.getElementById('username').value;
    if (!name) {
      alert("Введите имя!");
      return;
    }

    const response = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    const data = await response.json();
    document.getElementById('greeting').innerText = `Привет, ${name}!`;
    document.getElementById('prediction').innerText = "Прогноз: " + data.prediction;
    saveToLocalStorage(name, data.prediction);
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
  }

  async function clearHistory() {
    localStorage.removeItem('history');
    document.getElementById('historyList').innerHTML = '';
    document.getElementById('greeting').innerText = '';
    document.getElementById('prediction').innerText = '';

    await fetch('http://127.0.0.1:8000/clear_history', { method: 'DELETE' });
  }