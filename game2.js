let rnd = (l,u) => Math.random() * (u-l) + l;

let dalgonaMap;
window.addEventListener("DOMContentLoaded",function() {
  let player = document.getElementById('player');
  dalgonaMap = document.querySelector('a-scene');
  
  dalgonaMap.addEventListener('loaded', () => {
        console.log("Game fully loaded");
        startGame(dalgonaMap, player);
  });
  
  function startGame(dalgonaMap, player){

    setInterval(()=>{
        if(player.object3D.position.x >= 30){
            player.object3D.position.x = 30;
        }

        if(player.object3D.position.x <= -30){
            player.object3D.position.x = -30;
        }

        if(player.object3D.position.z >= 70){
            player.object3D.position.z = 70;
        }

        if(player.object3D.position.z <= -72){
            player.object3D.position.z = -72;
        }

    }, 10);
    
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

