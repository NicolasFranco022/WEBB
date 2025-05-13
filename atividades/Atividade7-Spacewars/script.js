let gameRunning = true;
let timer = 0;
let life = 3;
let score = 0;
const player = document.getElementById('player');
const pausedText = document.getElementById('paused');
const lifeDisplay = document.getElementById('life');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const game = document.getElementById('game');


setInterval(() => {
  if (gameRunning) {
    timer++;
    const h = String(Math.floor(timer / 3600)).padStart(2, '0');
    const m = String(Math.floor((timer % 3600) / 60)).padStart(2, '0');
    const s = String(timer % 60).padStart(2, '0');
    timerDisplay.textContent = `${h}:${m}:${s}`;
  }
}, 1000);


window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    gameRunning = !gameRunning;
    pausedText.style.display = gameRunning ? 'none' : 'block';
  }
});


window.addEventListener('keydown', (e) => {
  if (!gameRunning) return;
  const step = 20;
  const left = player.offsetLeft;
  if (e.code === 'ArrowLeft' && left > 0) {
    player.style.left = `${left - step}px`;
  }
  if (e.code === 'ArrowRight' && left < window.innerWidth - player.offsetWidth) {
    player.style.left = `${left + step}px`;
  }
  if (e.code === 'Space') {
    shootMissile();
  }
});


function shootMissile() {
  const missile = document.createElement('div');
  missile.className = 'missile';
  missile.style.left = `${player.offsetLeft + player.offsetWidth / 2 - 5}px`;
  missile.style.bottom = '100px';
  game.appendChild(missile);

  const interval = setInterval(() => {
    const bottom = parseInt(missile.style.bottom);
    if (bottom >= window.innerHeight) {
      clearInterval(interval);
      missile.remove();
    } else {
      missile.style.bottom = `${bottom + 10}px`;
      detectHit(missile, interval);
    }
  }, 30);
}


function spawnAlien() {
  if (!gameRunning) return;

  const alien = document.createElement('img');
  alien.src = 'img/alien.png';
  alien.className = 'alien';
  alien.style.position = 'absolute';
  alien.style.width = '50px';
  alien.style.top = '0px';
  alien.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  game.appendChild(alien);

  const interval = setInterval(() => {
    if (!gameRunning || !document.body.contains(alien)) return;
    const top = parseInt(alien.style.top);
    if (top >= window.innerHeight - 100) {
      clearInterval(interval);
      alien.remove();
      if (gameRunning) {
        life--;
        lifeDisplay.textContent = life;
        if (life <= 0) restartGame();
      }
    } else {
      alien.style.top = `${top + 2}px`;
    }
  }, 30);
}

setInterval(() => {
  if (gameRunning) spawnAlien();
}, 2000);


function detectHit(missile, missileInterval) {
  const aliens = document.querySelectorAll('.alien');
  aliens.forEach(alien => {
    const mRect = missile.getBoundingClientRect();
    const aRect = alien.getBoundingClientRect();
    if (
      mRect.top < aRect.bottom &&
      mRect.bottom > aRect.top &&
      mRect.left < aRect.right &&
      mRect.right > aRect.left
    ) {
      alien.remove();
      missile.remove();
      clearInterval(missileInterval);
      score++;
      scoreDisplay.textContent = score;
    }
  });
}


function restartGame() {
  gameRunning = false;
  alert('Game Over! Reiniciando...');
  life = 3;
  score = 0;
  timer = 0;
  lifeDisplay.textContent = life;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = '00:00:00';
  pausedText.style.display = 'none';
  document.querySelectorAll('.alien, .missile').forEach(e => e.remove());
  gameRunning = true;
}