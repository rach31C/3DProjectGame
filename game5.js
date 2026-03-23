//SOUND
let awayAudio = new Audio('audio/awaySound.mp3');

let player;
let glassTiles;
let glassR;
let glassL;

let gameOver = false;
let timeUp = false;
let fellDown = false;

window.addEventListener("DOMContentLoaded", function () {
    let finish = document.getElementById("finishLine");

    player = document.getElementById("player");
    

    let timeDisplay = document.getElementById("timeDisplay");
    let timeMin = 1;
    let timeSec = 30;

    glassR = document.querySelectorAll('.glass');
    glassL = document.querySelectorAll('.glassL');
    glassTiles = document.querySelectorAll('.glass, .glassL');

    setInterval(() => {
        timeDisplay.setAttribute('value',`Time: ${timeMin}:${timeSec.toString().padStart(2, '0')}`);

        if (timeSec > 0) {
            timeSec--;
        } else if (timeMin <= 0 && timeSec <= 0) {
            gameOver = true;
            timeUp = true;
        } else {
            timeMin--;
            timeSec = 59;
        }
    }, 1000);

    setInterval(()=>{
        if(player.object3D.position.z <= finish.object3D.position.z){
            timeDisplay.setAttribute('value', `YOU WIN!`); 

            if(!gameOver){
                setTimeout(() => {
                    window.location.href = 'game6.html';
                }, 2500);
            } 

        } else {
            if(gameOver && timeUp){
                timeDisplay.setAttribute('value', `TIME'S UP!`);
                setTimeout(() => {
                    window.location.href = 'lose.html';
                }, 1500);
            }
            
            if(gameOver && fellDown){
                timeDisplay.setAttribute('value', `YOU LOSE!`);
                setTimeout(() => {
                    window.location.href = 'lose.html';
                }, 1500);
            }
        }

    }, 500);

    // borders
    setInterval(() => {
        if (player.object3D.position.x >= 5) player.object3D.position.x = 5;
        if (player.object3D.position.x <= -5) player.object3D.position.x = -5;

        if (player.object3D.position.z >= 85) player.object3D.position.z = 85;
        if (player.object3D.position.z <= -45) player.object3D.position.z = -45;

    }, 10);

    // is it good or is it bad????
    for (let i = 0; i < glassR.length; i++) {

        let sturdy = Math.random() < 0.5;

        if (sturdy) {
            glassR[i].classList.add("glassGood");
            glassL[i].classList.add("glassBad");

        } else {
            glassR[i].classList.add("glassBad");
            glassL[i].classList.add("glassGood");

        }
    }

    setInterval(playerPick, 50);
});


function playerPick() {

    if (!player) return;

    let playerPos = player.object3D.position;

    let playerFeetY = playerPos.y - 28; 


    glassTiles.forEach(tile => {

        let tilePos = tile.object3D.position;

        let halfSize = 2.5;

        let onX = Math.abs(playerPos.x - tilePos.x) <= halfSize;
        let onZ = Math.abs(playerPos.z - tilePos.z) <= halfSize;

        let onY = playerFeetY >= tilePos.y - 0.5 && playerFeetY <= tilePos.y + 1;

        let falling = player.prevY === undefined || playerPos.y <= player.prevY;
        player.prevY = playerPos.y;

        if (onX && onZ && onY && falling) {
            handleGlass(tile);
        }
    });
}


function handleGlass(tile) {

    if (tile.classList.contains("checked")) return;
    tile.classList.add("checked");

    if (tile.classList.contains("glassBad")) {
        awayAudio.currentTime = 0;
        awayAudio.play();
        // player bye bye (dies)
        player.object3D.position.y -= 25;
        let pos = player.object3D.position;
        let fallSpeed = 0.5;
        let fallInterval = setInterval(() => {
            pos.y -= fallSpeed;
            player.object3D.position.set(pos.x, pos.y, pos.z);

            if (pos.y <= -10) {
                clearInterval(fallInterval);
            }
        }, 10);

        gameOver = true;
                fellDown = true;

    } else {
        console.log("✅ Safe!");
    }
}