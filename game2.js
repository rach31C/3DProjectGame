let rnd = (l,u) => Math.random() * (u-l) + l

let dalgonaMap;
window.addEventListener("DOMContentLoaded",function() {
  dalgonaMap = document.getElementById('dalgonaMap');
  
  dalgonaMap.addEventListener('loaded', () => {
        console.log("Game fully loaded");
        startGame(dalgonaMap);
  });
  
  startGame(dalgonaMap){
    const startBtn = document.querySelector('#startBtn');

    if (!startBtn) {
      console.error('startBtn not found');
      return;
    }

    AFRAME.registerComponent('start-button', {
      init: function () {
        this.el.addEventListener('click', function (evt) {
          window.location.href = `cookie${Math.round(Math.random()*2+1)}.html`;
          console.log()
        });
      }
    });
  };

  


});

