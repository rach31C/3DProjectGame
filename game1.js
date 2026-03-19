//SOUND
let bgAudio = new Audio('audio/game1.mp3');
let greenLight = new Audio('audio/dollAudio.mp3');
let dollActive = false;

window.addEventListener("DOMContentLoaded",function() {
    // let progress = localStorage.getItem('points') || 0;

    let player = document.getElementById("player");
    let doll = document.getElementById("doll");
    let finish = document.getElementById("finishLine");
    let valueDisplay = document.getElementById("valueDisplay");

    let timeDisplay = this.document.getElementById("timeDisplay");
    let timeMin = 1;
    let timeSec = 31;
    let gameOver = false;

    bgAudio.volume = 0.5;
    bgAudio.loop = true;
    bgAudio.play();

    //CLOCK
    setInterval(()=>{
        timeDisplay.setAttribute('value', ` ${timeMin}:${timeSec.toString().padStart(2, '0')}`);
        if(timeSec > 0){
            timeSec--;
        } else if(timeMin<=0 && timeSec<=0){
            gameOver = true;
        } else {
            timeMin--;
            timeSec = 59;
        }

        //Doll: "Red Light, Green Light!"
        if(timeMin === 1 && timeSec === 30 && !dollActive){
            dollRotate();
            dollActive = true;
        }

    }, 1000);

    setInterval(()=>{
        if(player.object3D.position.z <= finish.object3D.position.z){
            valueDisplay.setAttribute('value', `YOU WIN!`);
         } else {
            if(gameOver){
                timeDisplay.setAttribute('value', `TIME'S UP!`);
                valueDisplay.setAttribute('value', `YOU LOSE!`);
                window.location.href = 'scene2.html'
            } else {
                valueDisplay.setAttribute('value', `KEEP WALKING`);
            }
         }

         //make sure that I don't go thru the wall
         if(player.object3D.position.x >= 47){
            player.object3D.position.x = 47;
         }

         if(player.object3D.position.x <= -47){
            player.object3D.position.x = -47;
         }

         if(player.object3D.position.z >= 146){
            player.object3D.position.z = 146;
         }

         if(player.object3D.position.z <= -147){
            player.object3D.position.z = -147;
         }

    }, 10);

})


//https://www.dafont.com/ds-digital.font

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}   

function dollRotate(){
    let rotationStatus = doll.getAttribute('rotation');

    let randomDelay = Math.random() * (5000 - 2100) + 2100;
    let speed = 5 / (randomDelay/1000);

    if (rotationStatus.y === 0) {
        doll.setAttribute('rotation', '0 180 0');
        greenLight.currentTime = 0;
        greenLight.playbackRate = speed;
        greenLight.play();
    } else {
        doll.setAttribute('rotation', '0 0 0');
        greenLight.pause();
    }

    checkMovement();

    setTimeout(dollRotate, randomDelay);

    return rotationStatus;
}

let lastZ = 135;

function checkMovement() {
    let currentZ = player.object3D.position.z;

    let dollRotation = Math.round(doll.getAttribute('rotation').y);

    if (dollRotation === 0 && (Math.abs(currentZ - lastZ) > 0.1)) {
            valueDisplay.setAttribute('value', "YOU DIED!");
            return true;
    }

    lastZ = currentZ;
}



