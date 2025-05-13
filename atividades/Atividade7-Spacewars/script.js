let faseAtual = 1;
let aliensRestantes = 3;
let gameRunning = true;
let timer = 0;
let life = 3;
let score = 0;
let vidaEmPerigo = false;
let alienSpeed = 30;

const loseText = document.getElementById('lose');
const gameOverText = document.getElementById('gameOver');
const player = document.getElementById('player');
const pausedText = document.getElementById('paused');
const lifeDisplay = document.getElementById('life');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const game = document.getElementById('game');

const fundos = [
  'url(img/background.jpg)', 
  'url(img/background2.jpg)', 
  'url(img/background3.jpg)', 
  'url(img/background4.jpg)'
];

// Timer
setInterval(() => {
  if (gameRunning) {
    timer++;
    const h = String(Math.floor(timer / 3600)).padStart(2, '0');
    const m = String(Math.floor((timer % 3600) / 60)).padStart(2, '0');
    const s = String(timer % 60).padStart(2, '0');
    timerDisplay.textContent = `${h}:${m}:${s}`;
  }
}, 1000);

// Pausar
window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyP') {
    gameRunning = !gameRunning;
    pausedText.style.display = gameRunning ? 'none' : 'block';
  }
});

// Movimento e tiro
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
  const activeMissiles = document.querySelectorAll('.missile').length;
  if (activeMissiles >= 2) return;

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

function spawnAliens() {
  const spacing = 100;
  const alienWidth = 100;
  const totalWidth = (3 * alienWidth) + (2 * spacing);
  const startX = (window.innerWidth - totalWidth) / 2;

  aliensRestantes = 3;

  for (let i = 0; i < 3; i++) {
    const alien = document.createElement('img');
    alien.src = 'img/alien.png';
    alien.className = 'alien';
    alien.style.position = 'absolute';
    alien.style.width = `${alienWidth}px`;
    alien.style.top = '0px';
    alien.style.left = `${startX + i * (alienWidth + spacing)}px`;
    game.appendChild(alien);
    moveAlien(alien);
  }
}

function moveAlien(alien) {
  const interval = setInterval(() => {
    if (!gameRunning || !document.body.contains(alien)) {
      clearInterval(interval);
      return;
    }

    const top = parseInt(alien.style.top);
    if (top >= window.innerHeight - 120) {
      clearInterval(interval);
      alien.remove();
      if (gameRunning && !vidaEmPerigo) {
        perderVida();
      }
    } else {
      alien.style.top = `${top + 2}px`;
    }
  }, alienSpeed);
}

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
      aliensRestantes--;
      scoreDisplay.textContent = score;

      if (aliensRestantes === 0) {
        setTimeout(nextPhase, 1000);
      }
    }
  });
}

function perderVida() {
  if (vidaEmPerigo) return;
  vidaEmPerigo = true;

  life--;
  lifeDisplay.textContent = life;
  loseText.style.display = 'block';

  if (life > 0) {
    setTimeout(() => {
      loseText.style.display = 'none';
      resetAliens();
    }, 2000);
  } else {
    setTimeout(() => {
      loseText.style.display = 'none';
      gameOverText.style.display = 'block';
      setTimeout(() => {
        gameOverText.style.display = 'none';
        restartGame();
      }, 3000);
    }, 2000);
  }
}

function resetAliens() {
  document.querySelectorAll('.alien, .missile').forEach(e => e.remove());
  spawnAliens();
  vidaEmPerigo = false;
}

function nextPhase() {
  faseAtual++;

  if (faseAtual > fundos.length) {
    gameRunning = false;
    const winText = document.getElementById('win');
    winText.style.display = 'block';

    setTimeout(() => {
      winText.style.display = 'none';
      restartGame();
    }, 3000);
    return;
  }

  game.style.backgroundImage = fundos[faseAtual - 1];
  alienSpeed = Math.max(10, alienSpeed - 5);

  document.querySelectorAll('.missile, .alien').forEach(e => e.remove());
  spawnAliens();
}

function restartGame() {
  alert('Game Over! Reiniciando...');
  life = 3;
  score = 0;
  timer = 0;
  vidaEmPerigo = false;
  faseAtual = 1;
  alienSpeed = 30;
  gameRunning = true;
  lifeDisplay.textContent = life;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = '00:00:00';
  pausedText.style.display = 'none';
  game.style.backgroundImage = fundos[0];
  document.querySelectorAll('.alien, .missile').forEach(e => e.remove());
  spawnAliens();
}

// Inicialização
game.style.backgroundImage = fundos[0];
spawnAliens();
