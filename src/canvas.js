require('./style.scss');

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth / 1.2;
canvas.height = innerHeight / 1.5;

const colors = [
  '#02C39A',
  '#00A896',
  '#028090',
  '#05668D',
];

const gravity = 0.2;
const friction = 0.9;

document.querySelector('a').addEventListener('click', function(){
  canvas.classList.add('hiding');
  this.classList.add('no-hover');
  setTimeout(function() {
    document.querySelector('a').classList.remove('no-hover');
    canvas.classList.remove('hiding');
    init();
  }, 1000);
});

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// The balls
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = function () {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy;
      this.dy = this.dy * friction;
      this.dx = this.dx * friction;
    } else {
      this.dy += gravity;
    }

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx * friction;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  };
}

// Implementation
let ballArray = [];

function init() {
  ballArray = [];
  for (let i = 0; i < 200; i += 1) {
    const radius = randomIntFromRange(10, 30);
    const x = randomIntFromRange(radius, canvas.width - radius);
    const y = randomIntFromRange(0, canvas.height - radius);
    const dx = randomIntFromRange(-3, 3);
    const dy = randomIntFromRange(-2, 2);
    ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors)));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballArray.length; i += 1) {
    ballArray[i].update();
  }
}

init();
animate();
