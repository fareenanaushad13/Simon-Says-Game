let gameseq = [];
let userSeq = [];

let btns = ["yellow", "red", "blue", "green"];
let sounds = {
  yellow: "sounds/yellow.mp3",
  red: "sounds/red.mp3",
  blue: "sounds/blue.mp3",
  green: "sounds/green.mp3",
  wrong: "sounds/wrong.mp3",
};

let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("h3");
let startBtnContainer = document.getElementById("startBtnContainer");
let startBtn = document.getElementById("startBtn");

document.addEventListener("keypress", function () {
  if (!started) {
    startGame();
  }
});

startBtn.addEventListener("click", function () {
  if (!started) {
    startGame();
  }
});

function startGame() {
  started = true;
  level = 0;
  gameseq = [];
  h2.innerText = "Game Started! Follow the Sequence";
  document.body.style.background = "white";
  levelUp();
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
  playSound(btn.getAttribute("id"));
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 250);
}

function playSound(color) {
  const sound = new Audio(sounds[color]);
  sound.play();
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameseq.push(randColor);

  setTimeout(() => {
    gameFlash(randBtn);
  }, 500);
  console.log(gameseq);
}

function checkAns(idx) {
  if (userSeq[idx] === gameseq[idx]) {
    if (userSeq.length === gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    playSound("wrong");

    h2.innerHTML = `Game Over! Your Score: <b>${
      level - 1
    }</b> <br> Press Any Key or Click The Button To Start`;
    updateHighScore();

    document.body.style.backgroundColor = "red";

    setTimeout(() => {
      document.body.style.background =
        "linear-gradient(135deg, #2c2c2c, #000000)";
    }, 200);

    resetGame();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  playSound(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function updateHighScore() {
  if (level - 1 > highScore) {
    highScore = level - 1;
    highScoreDisplay.innerText = `High Score: ${highScore}`;
  }
}

function resetGame() {
  started = false;
  gameseq = [];
  userSeq = [];
  level = 0;
}
