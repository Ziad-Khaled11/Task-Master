let max_particles = 2500;
let particles = [];
let frequency = 20; // Adjusted frequency to control particle creation rate
let init_num = max_particles;
let max_time = frequency * max_particles;
let time_to_recreate = false;

// Enable repopulate
setTimeout(function () {
  time_to_recreate = true;
}.bind(this), max_time);

// Create and configure canvas
var tela = document.createElement('canvas');
var loginBox = document.querySelector('.login-box');

// Create a container for the canvas
var canvasContainer = document.createElement('div');
canvasContainer.classList.add('canvas-container');
canvasContainer.style.width = '100%';
canvasContainer.style.height = '100%';
canvasContainer.style.borderRadius = '20px'; // Add border radius
canvasContainer.style.overflow = 'hidden'; // Clip content to border radius
canvasContainer.style.position = 'relative'; // Ensure proper positioning

// Function to update canvas size
function updateCanvasSize() {
  tela.width = loginBox.offsetWidth;
  tela.height = loginBox.offsetHeight;
}

updateCanvasSize();
loginBox.appendChild(canvasContainer); // Append container to login-box
canvasContainer.appendChild(tela); // Append canvas to container

var canvas = tela.getContext('2d');

class Particle {
  constructor(canvas) {
    let random = Math.random();
    this.canvas = canvas;
    this.x = tela.width * Math.random();
    this.y = tela.height * Math.random();
    this.s = Math.random() * 1; // Increased movement speed
    this.a = Math.random() * 2 * Math.PI; // Random direction
    this.radius = random > .2 ? Math.random() * 1 : Math.random() * 3;
    this.color = random > .2 ? "#694FB9" : "#2E2F70";
    this.radius = random > .8 ? Math.random() * 2.2 : this.radius;
    this.color = random > .8 ? "#104369" : this.color;

    // Increased random movement characteristics
    this.dx = (Math.random() - 0.5) * 4; // Increased velocity in x direction
    this.dy = (Math.random() - 0.5) * 4; // Increased velocity in y direction
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {
    // Move the particle randomly
    this.x += this.dx;
    this.y += this.dy;

    // Bounce particles off edges
    if (this.x < 0 || this.x > tela.width) this.dx *= -1;
    if (this.y < 0 || this.y > tela.height) this.dy *= -1;

    this.render();

    // Remove particle if it gets very small (you can adjust this)
    return this.radius > 0.1;
  }
}

function popolate(num) {
  for (var i = 0; i < num; i++) {
    setTimeout(
      function (x) {
        return function () {
          // Add particle
          particles.push(new Particle(canvas));
        };
      }(i),
      frequency * i
    );
  }
  return particles.length;
}

function clear() {
  canvas.globalAlpha = 0.2;
  // canvas.fillStyle = '#110031'; // Background color
  // canvas.fillRect(0, 0, tela.width, tela.height);
  // canvas.globalAlpha = 1;
}

/*
 * Function to update particles in canvas
 */
function update() {
  particles = particles.filter(function (p) { return p.move(); });

  // Recreate particles
  if (time_to_recreate) {
    if (particles.length < init_num) { popolate(1); }
  }

  clear();
  requestAnimationFrame(update.bind(this));
}

// Initial population of particles
popolate(max_particles);

// Listen for resize events to update canvas size
window.addEventListener('resize', function() {
  updateCanvasSize();
  // Optionally update positions of particles based on new canvas size
});

update();
