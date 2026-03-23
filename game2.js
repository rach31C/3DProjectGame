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

  setInterval(()=>{
      if(player.object3D.position.x >= 30){
          player.object3D.position.x = 30;
      }

      if(player.object3D.position.x <= -30){
          player.object3D.position.x = -30;
      }

      if(player.object3D.position.z >= 72){
          player.object3D.position.z = 72;
      }

      if(player.object3D.position.z <= -72){
          player.object3D.position.z = -72;
      }

    }, 10);

  AFRAME.registerComponent('start-button', {
    init: function () {
      this.el.addEventListener('click', function (evt) {
        window.location.href = `cookie${Math.round(Math.random()*2+1)}.html`;
        console.log()
      });
  }
});
});

