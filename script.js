AFRAME.registerComponent("game-manager", {
  init: function () {
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
});

