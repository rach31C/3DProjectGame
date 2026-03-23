//SOUND
let bgAudio = new Audio('audio/game1.mp3');
let greenLight = new Audio('audio/dollAudio.mp3');

let valueDisplay;
let doll;
let dollActive = false;
let gameOver = false;

let keyPressed = {};

window.addEventListener('keydown', (event) => {
    keyPressed[event.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (event) => {
    keyPressed[event.key.toLowerCase()] = false;
});

window.addEventListener("DOMContentLoaded",function() {

    let player = document.getElementById("player");
    doll = document.getElementById("doll");
    let gltfModel = doll.querySelector('a-gltf-model');
    let finish = document.getElementById("finishLine");

    valueDisplay = document.getElementById("valueDisplay");

    let timeDisplay = this.document.getElementById("timeDisplay");
    let timeMin = 1;
    let timeSec = 31;

    doll.addEventListener('model-loaded', () => {
        console.log("Game fully loaded");
        startGame();
    });

    function startGame(){

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
            if(timeMin == 1 && timeSec == 30 && !dollActive){
                dollRotate();
                dollActive = true;
            }


        }, 1000);

        setInterval(()=>{
            if(player.object3D.position.z <= finish.object3D.position.z){
                valueDisplay.setAttribute('value', `YOU WIN!`); 

                if(!gameOver){
                    setTimeout(() => {
                        window.location.href = 'game2.html';
                    }, 2500);
                } 

            } else {
                if(gameOver){
                    timeDisplay.setAttribute('value', `TIME'S UP!`);
                    valueDisplay.setAttribute('value', `YOU LOSE!`);
                    setTimeout(() => {
                        window.location.href = 'game2.html';
                    }, 2000);
                }
            }

        }, 500);

        setInterval(()=>{
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
    }
});

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

        let movementCheckInterval = setInterval(() => {
            if(isMoving() && doll.object3D.rotation.y == 0 && !gameOver){
                clearInterval(movementCheckInterval);
                valueDisplay.setAttribute('value', `YOU LOSE!`);
                gameOver = true;
                setTimeout(() => {
                    window.location.href = 'lose.html';
                }, 2500);
            }
        }, 100);

        setTimeout(() => {
            clearInterval(movementCheckInterval);
        }, randomDelay);
    }

    setTimeout(dollRotate, randomDelay);

    return rotationStatus;
}

function isMoving(){
    return keyPressed['w'] || keyPressed['a'] || keyPressed['s'] || keyPressed['d'];
}







