//SOUND
let greenLight = new Audio('dollAudio.mp3');
let dollActive = false;

window.addEventListener("DOMContentLoaded",function() {
    let progress = localStorage.getItem('points') || 0;
    let finish = document.getElementById("finishLine");
    let winStatus = true;
    let player = document.getElementById("player");
    let doll = document.getElementById("doll");
    let valueDisplay = document.getElementById("valueDisplay");

    let timeDisplay = this.document.getElementById("timeDisplay");
    let timeMin = 1;
    let timeSec = 30;
    let gameOver = false;

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
        if(timeMin === 1 && timeSec === 28 && !dollActive){
            dollRotate();
            dollActive = true;
        }

    }, 1000);

    setInterval(()=>{
        if(player.object3D.position.z <= finish.object3D.position.z){
            progress ++;
            valueDisplay.setAttribute('value', `YOU WIN!`);
            localStorage.setItem('points', progress);
            
         } else {
            if(gameOver){
                timeDisplay.setAttribute('value', `TIME'S UP!`);
                valueDisplay.setAttribute('value', `YOU LOSE!`);
                winStatus = false;
                window.location.href = 'scene2.html'
            } else {
                valueDisplay.setAttribute('value', `KEEP WALKING`);
            }
         }

         checkMovement();

         if(valueDisplay.getAttribute('value') === "CAUGHT! Player moved during Red Light."){
            valueDisplay.setAttribute('value', "CAUGHT! Player moved during Red Light.");
         }

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

    if(winStatus === false){
        valueDisplay.setAttribute('value', "you lose!")
    } else if(winStatus === true){
        valueDisplay.setAttribute('value', "you win!")
    } else{
        alueDisplay.setAttribute('value', "keep going!")
    }

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

    let randomDelay = Math.random() * (8000 - 2100) + 2100;
    let speed = 8 / (randomDelay/1000);

    if (rotationStatus.y === 180) {
        doll.setAttribute('rotation', '0 0 0');
        greenLight.playbackRate = speed;
        greenLight.play();
    } else {
        doll.setAttribute('rotation', '0 180 0');
        greenLight.pause();
    }

    setTimeout(dollRotate, randomDelay);

    return rotationStatus;
}

let lastZ = 135;

function checkMovement() {
    let currentZ = player.object3D.position.z;

    let dollRotation = Math.round(doll.getAttribute('rotation').y);

    if (dollRotation === 45 && (Math.abs(currentZ - lastZ) > 0.25)) {
            valueDisplay.setAttribute('value', "CAUGHT!");
            winStatus = false;
            return true;
    }

    lastZ = currentZ;
}



