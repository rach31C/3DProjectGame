let scene;
let time_text;
let time_left = 30;
let timerInterval = null;

let games = [
  { id: "#lobby", position: "0 0 0", scale: "1 1 1" },
  { id: "#game1", position: "0 0 0", scale: "1 1 1" },
  { id: "#tug", position: "0 0 0", scale: "1 1 1" },
  { id: "#glass", position: "0 0 0", scale: "1 1 1" }
];

let currentGameIndex = 0;
let gameDuration = 30 * 1000; // 30 seconds
let container;

// ---------------- KEYBOARD INPUT ----------------
let keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// ---------------- INIT ----------------
window.addEventListener("DOMContentLoaded", function () {
  scene = document.querySelector("a-scene");
  container = document.querySelector("#game-container");
  time_text = document.getElementById("time");

  loadGame();
  startCycle();
});

// ---------------- TIMER ----------------
function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  time_left = 30;
  time_text.setAttribute("value", "Time: " + time_left);

  timerInterval = setInterval(() => {
    time_left--;
    time_text.setAttribute("value", "Time: " + time_left);

    if (time_left <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

// ---------------- GAME LOADING ----------------
function loadGame() {
  container.innerHTML = "";

  let gameData = games[currentGameIndex];

  let gameEntity = document.createElement("a-gltf-model");
  gameEntity.setAttribute("src", gameData.id);
  gameEntity.setAttribute("position", gameData.position);
  gameEntity.setAttribute("scale", gameData.scale);

  container.appendChild(gameEntity);

  // reset players position on map change
  let p1 = document.querySelector("#player1");
  let p2 = document.querySelector("#player2");

  if (p1) p1.setAttribute("position", "-1 0.5 -3");
  if (p2) p2.setAttribute("position", "1 0.5 -3");

  startTimer();

  console.log("Loaded game:", gameData.id);
}

// ---------------- GAME CYCLING ----------------
function nextGame() {
  currentGameIndex = (currentGameIndex + 1) % games.length;
  loadGame();
}

function startCycle() {
  setInterval(() => {
    nextGame();
  }, gameDuration);
}

// ---------------- PLAYER 1 (WASD) ----------------
AFRAME.registerComponent("player1-controls", {
  tick: function () {
    let pos = this.el.object3D.position;

    if (keys["w"]) pos.z -= 0.05;
    if (keys["s"]) pos.z += 0.05;
    if (keys["a"]) pos.x -= 0.05;
    if (keys["d"]) pos.x += 0.05;
  }
});


// ---------------- PLAYER 2 (ARROWS) ----------------
AFRAME.registerComponent("player2-controls", {
  tick: function () {
    let pos = this.el.object3D.position;

    if (keys["ArrowUp"]) pos.z -= 0.05;
    if (keys["ArrowDown"]) pos.z += 0.05;
    if (keys["ArrowLeft"]) pos.x -= 0.05;
    if (keys["ArrowRight"]) pos.x += 0.05;
  }
});
