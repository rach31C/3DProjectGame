let rnd = (l, u) => Math.random() * (u - l) + l;

let scene;
let time_text;
let time_left = 30;

let games = [
  { id: "#lobby", position: "0 0 0", scale: "1 1 1" },
  { id: "#game1", position: "0 0 0", scale: "1 1 1" },
  { id: "#tug", position: "0 0 0", scale: "1 1 1" },
  { id: "#glass", position: "0 0 0", scale: "1 1 1" }
];

let currentGameIndex = 0;
let gameDuration = 30 * 1000; // 30 seconds
let container;

window.addEventListener("DOMContentLoaded", function () {

  scene = document.querySelector("a-scene");
  container = document.querySelector("#game-container");
  time_text = document.getElementById("time");

  loadGame();
  updateTimer();
  startCycle();
});


// ---------------- TIMER ----------------
function updateTimer() {
  time_text.setAttribute("value", "Time: " + time_left);
  time_left--;

  if (time_left >= 0) {
    setTimeout(updateTimer, 1000);
  }
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

  console.log("Loaded game:", gameData.id);
}


// ---------------- GAME CYCLING ----------------
function nextGame() {
  currentGameIndex = (currentGameIndex + 1) % games.length;
  loadGame();
}

function startCycle() {
  setInterval(function () {
    nextGame();
  }, gameDuration);
}
