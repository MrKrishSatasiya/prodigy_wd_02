let interval;
let startTime;
let accumulatedTime = 0;
let isRunning = false;
let lapCounter = 1;

function displayTime(ms) {
  const minutes = Math.floor((ms / 60000) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  const currentTime = Date.now() - startTime + accumulatedTime;
  document.getElementById('display').textContent = displayTime(currentTime);
}

function startStop() {
  if (isRunning) {
    clearInterval(interval);
    accumulatedTime += Date.now() - startTime;
    isRunning = false;
    document.querySelector('.btn').textContent = 'Start';
  } else {
    if (accumulatedTime === 0) {
      startTime = Date.now();
    } else {
      startTime = Date.now() - (accumulatedTime - (Date.now() - startTime));
    }
    interval = setInterval(updateDisplay, 10);
    isRunning = true;
    document.querySelector('.btn').textContent = 'Pause';
  }
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  accumulatedTime = 0;
  document.querySelector('.btn').textContent = 'Start';
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('lapTimes').textContent = '';
  lapCounter = 1;
}

function lap() {
  if (isRunning) {
    const currentTime = Date.now() - startTime + accumulatedTime;
    const lapTime = displayTime(currentTime);
    const lapTimesElement = document.getElementById('lapTimes');
    lapTimesElement.innerHTML += `<p>Lap ${lapCounter}: ${lapTime}</p>`;
    lapCounter++;
  }
}

