let rnd = (l,u) => Math.random() * (u-l) + l;

AFRAME.registerComponent('start-button', {
  init: function () {
    this.el.addEventListener('click', function () {
      window.location.href = `cookie${Math.round(Math.random() * 2 + 1)}.html`;
    });
  }
});

let dalgonaMap;
window.addEventListener("DOMContentLoaded",function() {
  let player = document.getElementById('player');
  dalgonaMap = document.getElementById('dalgonaMap');
  
  dalgonaMap.addEventListener('model-loaded', () => {
        console.log("Game fully loaded");
        startGame();
  });
  
  function startGame(){
    setInterval(()=>{
        if(player.object3D.position.x >= 6){
            player.object3D.position.x = 6;
        }

        if(player.object3D.position.x <= -6){
            player.object3D.position.x = -6;
        }

        if(player.object3D.position.z >= 1){
            player.object3D.position.z = 1;
        }

        if(player.object3D.position.z <= -75){
            player.object3D.position.z = -75;
        }

    }, 10);
  }

  AFRAME.registerComponent('start-button', {
    init: function () {
      this.el.addEventListener('click', function (evt) {
        window.location.href = `cookie${Math.round(Math.random()*2+1)}.html`;
        console.log()
      });
    }
<<<<<<< HEAD

    // Fallback direct listener for click events if A-Frame component loads late.
    startBtn.addEventListener('click', () => {
      window.location.href = `cookie${Math.round(Math.random() * 2 + 1)}.html`;
    });
  };

  

=======
  });
>>>>>>> 01bf2bb (game 3 v2)

});

