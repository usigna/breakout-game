const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const boardWidth = 890;
const boardHeight = 500;
const blockWidth = 100;
const blockHeight = 20;
const userStart = [230, 10];
let currentPosition = userStart;
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;
let timerId;
const ballDiameter = 20;
let xDirection = -2;
let yDirection = 2;
let score = 0;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis],
    this.bottomRight = [xAxis + blockWidth, yAxis],
    this.topLeft = [xAxis, yAxis + blockHeight],
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  }
}

// create blocks
const blocks = [
  new Block(10, 470),
  new Block(120, 470),
  new Block(230, 470),
  new Block(340, 470),
  new Block(450, 470),
  new Block(560, 470),
  new Block(670, 470),
  new Block(780, 470),
  new Block(10, 440),
  new Block(120, 440),
  new Block(230, 440),
  new Block(340, 440),
  new Block(450, 440),
  new Block(560, 440),
  new Block(670, 440),
  new Block(780, 440),
  new Block(10, 410),
  new Block(120, 410),
  new Block(230, 410),
  new Block(340, 410),
  new Block(450, 410),
  new Block(560, 410),
  new Block(670, 410),
  new Block(780, 410),
  new Block(10, 380),
  new Block(120, 380),
  new Block(230, 380),
  new Block(340, 380),
  new Block(450, 380),
  new Block(560, 380),
  new Block(670, 380),
  new Block(780, 380),
]

// draw all blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    grid.appendChild(block);
  }
}

addBlocks();

// create user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

// draw the user
function drawUser() {
  user.style.left = currentPosition[0] + 'px';
  user.style.bottom = currentPosition[1] + 'px';
}

// move user
function moveUser(e) {
  switch(e.key) {
    case 'ArrowLeft':
      if(currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
    break;
    case 'ArrowRight':
      if(currentPosition[0] < (boardWidth - blockWidth)) {
        currentPosition[0] += 10;
        drawUser();
      }
    break;
  }
}

document.addEventListener('keydown', moveUser);

// add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

// draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px';
  ball.style.bottom = ballCurrentPosition[1] + 'px';
}

// move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 15);

// check for collisions
function checkForCollisions() {
  // check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if ((ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0])
      && ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])) {
        const allBlocks = Array.from(document.querySelectorAll('.block'));
        allBlocks[i].classList.remove('block');
        blocks.splice(i, 1);
        changeDirection();
        score++;
        scoreDisplay.textContent = score;

        // check for win
        if (blocks.length === 0) {
          scoreDisplay.textContent = 'You win!';
          clearInterval(timerId);
          document.removeEventListener('keydown', moveBall);
        }
      }
  }

  // check for wall collisions
  if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) 
    || ballCurrentPosition[1] >= (boardHeight - ballDiameter)
    || ballCurrentPosition[0] <= 0) {
      changeDirection();
  }

  // check for user collisions
  if ((ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth)
    && (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)) {
      changeDirection();
    }

  // check for game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.textContent = 'You lose!';
    document.removeEventListener('keydown', moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }

  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }

  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }

  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}