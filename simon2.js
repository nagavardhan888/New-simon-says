let gameSeq = [];
let userSeq = [];
let colors = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let statusText = document.getElementById("status");
let buttons = document.querySelectorAll(".btn");

/* START GAME */
function startGame() {
  if (!started) {
    started = true;
    gameSeq = [];
    level = 0;
    nextLevel();
  }
}

document.addEventListener("click", startGame);
document.addEventListener("keydown", startGame);

/* NEXT LEVEL */
function nextLevel() {
  userSeq = [];
  level++;
  statusText.innerText = `Level ${level}`;

  let randIndex = Math.floor(Math.random() * colors.length);
  let randColor = colors[randIndex];
  gameSeq.push(randColor);

  let btn = document.getElementById(randColor);
  gameFlash(btn);
}

/* FLASH GAME BUTTON */
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

/* FLASH USER BUTTON */
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 150);
}

/* BUTTON CLICK */
buttons.forEach(btn => {
  btn.addEventListener("click", function () {
    if (!started) return;

    let color = this.id;
    userSeq.push(color);
    userFlash(this);
    checkAnswer(userSeq.length - 1);
  });
});

/* CHECK ANSWER */
function checkAnswer(index) {
  if (userSeq[index] !== gameSeq[index]) {
    gameOver();
    return;
  }

  if (userSeq.length === gameSeq.length) {
    setTimeout(nextLevel, 800);
  }
}

/* GAME OVER */
function gameOver() {
  document.body.style.backgroundColor = "red";
  statusText.innerHTML = `Game Over!<br>Score: <b>${level - 1}</b><br>Tap to restart`;

  setTimeout(() => {
    document.body.style.backgroundColor = "white";
  }, 500);

  started = false;
}
