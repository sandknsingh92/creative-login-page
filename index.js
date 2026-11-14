
const scene = document.getElementById('scene');

const rope = document.getElementById('rope');
const ropeBall = document.getElementById('ropeBall');

const themeNote = document.getElementById('themeNote');

const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

const password = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

// Different background themes

const themes = [
  {
    name: 'Midnight blue',
    a: '#101a3a',
    b: '#263e75',
    accent: '#8de0ff',
    strong: '#4ab8e8'
  },
  {
    name: 'Rose sunset',
    a: '#542d55',
    b: '#a64f72',
    accent: '#ffc0cb',
    strong: '#f07b9b'
  },
  {
    name: 'Emerald glow',
    a: '#103d3b',
    b: '#267b69',
    accent: '#a8f0c6',
    strong: '#54c99a'
  },
  {
    name: 'Violet dream',
    a: '#30245e',
    b: '#684c9c',
    accent: '#d9c2ff',
    strong: '#a78bfa'
  },
  {
    name: 'Golden hour',
    a: '#583b22',
    b: '#a86d38',
    accent: '#ffe0a3',
    strong: '#f3b75e'
  }
];

let themeIndex = 0;
let dragging = false;
let startY = 0;
let pullDistance = 0;
let lastPullAt = 0;

// Change page theme

function applyTheme(index) {
  const theme = themes[index];

  scene.style.setProperty('--bg-a', theme.a);
  scene.style.setProperty('--bg-b', theme.b);
  scene.style.setProperty('--accent', theme.accent);
  scene.style.setProperty('--accent-strong', theme.strong);

  themeNote.textContent =
    `Theme 0${index + 1} · ${theme.name}`;

  scene.classList.add('pulled', 'ringing');

  window.setTimeout(() => {
    scene.classList.remove('pulled', 'ringing');
  }, 1200);
}

// Bell pull action

function ringBell() {
  const now = Date.now();

  if (now - lastPullAt < 350) return;

  lastPullAt = now;

  themeIndex = (themeIndex + 1) % themes.length;

  applyTheme(themeIndex);
}

// Move rope and hanging ball

function setRopePull(distance) {
  const limited = Math.max(0, Math.min(distance, 75));

  rope.style.transform =
    `translateY(${limited}px) rotate(${limited / 18}deg)`;

  ropeBall.style.transform =
    `translateY(${limited}px)`;
}

// Mouse or touch starts pulling

ropeBall.addEventListener('pointerdown', (event) => {
  dragging = true;

  startY = event.clientY;
  pullDistance = 0;

  ropeBall.setPointerCapture(event.pointerId);
});

// While dragging

ropeBall.addEventListener('pointermove', (event) => {
  if (!dragging) return;

  pullDistance = Math.max(0, event.clientY - startY);

  setRopePull(pullDistance);
});

// Release the rope

function releaseRope() {
  if (!dragging) return;

  dragging = false;

  if (pullDistance > 22) {
    ringBell();
  }

  setRopePull(0);
}

ropeBall.addEventListener('pointerup', releaseRope);
ropeBall.addEventListener('pointercancel', releaseRope);

// Keyboard support

ropeBall.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    ringBell();
  }
});

// Click or tap also changes the theme

ropeBall.addEventListener('click', () => {
  ringBell();
});

// Show and hide password

togglePassword.addEventListener('click', () => {
  const isHidden = password.type === 'password';

  password.type = isHidden ? 'text' : 'password';

  togglePassword.textContent =
    isHidden ? 'Hide' : 'Show';

  togglePassword.setAttribute(
    'aria-label',
    isHidden ? 'Hide password' : 'Show password'
  );
});

// Demo login form

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  message.textContent =
    'Demo only — connect a secure authentication service to sign in.';
});

// Forgot password

document.getElementById('forgotLink')
  .addEventListener('click', (event) => {
    event.preventDefault();

    message.textContent =
      'Password reset needs to be connected to your app.';
  });

// Create account

document.getElementById('signupLink')
  .addEventListener('click', (event) => {
    event.preventDefault();

    message.textContent =
      'Account creation is not connected in this front-end demo.';
  });
