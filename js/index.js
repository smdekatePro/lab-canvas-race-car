const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Global Variables
let car;
let obstacles = [];
let frames = 0;
let score = 0;
let animationId;

// ----- Classes -----
class Car {
  constructor() {
    this.x = 225;
    this.y = 580;
    this.width = 50;
    this.height = 100;
    this.img = new Image();
    this.img.src = "./images/car.png";
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    if (this.x > 0) this.x -= 20;
  }

  moveRight() {
    if (this.x + this.width < canvas.width) this.x += 20;
  }
}

class Obstacle {
  constructor(x, width) {
    this.x = x;
    this.y = 0;
    this.width = width;
    this.height = 20;
    this.color = "brown";
  }

  draw() {
    this.y += 5; // speed
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// ----- Game Logic -----
function startGame() {
  car = new Car();
  obstacles = [];
  frames = 0;
  score = 0;

  animate();
}

// ----- Drawing Functions -----
function drawRoad() {
  const roadImg = new Image();
  roadImg.src = "./images/road.png";
  ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 20, 40);
}

// ----- Collision -----
function checkCollision(obstacle) {
  return (
    car.x < obstacle.x + obstacle.width &&
    car.x + car.width > obstacle.x &&
    car.y < obstacle.y + obstacle.height &&
    car.y + car.height > obstacle.y
  );
}

// ----- Animation Loop -----
function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawRoad();
  car.draw();
  drawScore();

  // Add obstacles
  frames++;
  if (frames % 120 === 0) {
    const x = Math.floor(Math.random() * 350); // limit so width fits
    const width = Math.floor(Math.random() * 100) + 100;
    obstacles.push(new Obstacle(x, width));
  }

  // Move and draw obstacles
  obstacles.forEach((ob, i) => {
    ob.draw();

    if (checkCollision(ob)) {
      cancelAnimationFrame(animationId);
      alert(`Game Over! Your score: ${score}`);
    }

    if (ob.y > canvas.height) {
      obstacles.splice(i, 1);
      score++;
    }
  });
}

// ----- Keyboard Controls -----
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") car.moveLeft();
  if (e.key === "ArrowRight") car.moveRight();
});

// ----- Start Button -----
window.addEventListener("load", () => {
  document.getElementById("start-button").addEventListener("click", () => {
    startGame();
  });
});
