let rnd = (l,u) => Math.random() * (u-l) + l
let scene, time_text, time_left = 50;

window.addEventListener("DOMContentLoaded",function() {
  time_text = document.getElementById("time");
}

function updateTimer(){
  time_text.setAttribute("value", "Time: " + time_left);
  time_left--;

  if (time_left >= 0) {
    setTimeout(updateTimer, 1000);
  
  }
}

function () {
    this.games = [
      { id: "#lobby", position: "0 0 0", scale: "1 1 1" },
      { id: "#game1", position: "0 0 0", scale: "1 1 1" },
      { id: "#tug",   position: "0 0 0", scale: "1 1 1" },
      { id: "#glass", position: "0 0 0", scale: "1 1 1" }  
    ];

    this.currentGameIndex = 0;
    this.gameDuration = 1 * 30 * 1000; // 30s

    this.container = document.querySelector("#game-container");

    this.loadGame();
    this.startCycle();
  },

  loadGame: function () {
    // Clear previous game
    this.container.innerHTML = "";

    const gameData = this.games[this.currentGameIndex];

    const gameEntity = document.createElement("a-gltf-model");
    gameEntity.setAttribute("src", gameData.id);
    gameEntity.setAttribute("position", gameData.position);
    gameEntity.setAttribute("scale", gameData.scale);

    this.container.appendChild(gameEntity);

    console.log("Loaded game:", gameData.id);
  },

  nextGame: function () {
    this.currentGameIndex =
      (this.currentGameIndex + 1) % this.games.length;

    this.loadGame();
  },

  startCycle: function () {
    setInterval(() => {
      this.nextGame();
    }, this.gameDuration);
  }

    window.requestAnimationFrame(loop);
}
});

