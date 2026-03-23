//SOUND
let pullAudio = new Audio('audio/pullingSound.mp3');
let awayAudio = new Audio('audio/awaySound.mp3');
window.addEventListener('DOMContentLoaded', function() {

    let t = 45;
    let timeDisplay = document.getElementById('time-display');
    let numberDisplay = document.getElementById('number-display');

    let rope = this.document.getElementById('rope');
    let player = document.getElementById('player');

    let ropePosition = -12; 
    let cameraPositionZ = 0; 

    let gameOver = false;
    let timeoutId; 

    let currentNumber = null;

    let TOWMap = document.getElementById('TOWMap');
    let gltfModel = TOWMap.querySelector('a-gltf-model');

    gltfModel.addEventListener('model-loaded', () => {
        console.log("Game fully loaded");
        startGame();
    });

    function startGame(){
    // Timer function
        function countdown() {
            if (gameOver) return;

            if (timeDisplay) {
                timeDisplay.setAttribute('value', `Time: ${t}`);
            }

            t--;

            if (t < 0) {
                endGame("TIME'S UP! GAME OVER!");
                return;
            }

            timeoutId = setTimeout(countdown, 1000);
        }

        countdown();
    
        
     // random numbers
        function number(){
            if (gameOver) return;

            currentNumber = Math.floor(Math.random() * 9) + 1;

            numberDisplay.setAttribute('value', `Press: ${currentNumber}`);
        }

        number();
        
        //robot
        function autoPull() {
            if (gameOver) return;

            ropePosition -= 1.0; 
            cameraPositionZ -= 1.0;

            rope.setAttribute("position", `0 1.6 ${ropePosition}`);
            player.setAttribute("position", `0 1.6 ${cameraPositionZ}`);

            

            if (cameraPositionZ <= -17) endGame("YOU LOSE!");
            if (ropePosition >= -5) endGame("YOU WIN!");
        
        
        }

        setInterval(autoPull, 2000); // 每2秒拉一次
        
        document.addEventListener("keydown", function (event) {
            if (gameOver) return;

            let playerInput = parseInt(event.key);

            if (playerInput === currentNumber) {
                ropePosition += 2;  
                cameraPositionZ += 0.3;
                pullAudio.currentTime = 0;
                pullAudio.play();
                awayAudio.currentTime = 0;
                awayAudio.play();
                numberDisplay.setAttribute('color', '#29b7b4');
                
                
            } else {    
                ropePosition -=2;
                cameraPositionZ -= 0.3;
                awayAudio.currentTime = 0;
                awayAudio.play();
                pullAudio.currentTime = 0;
                pullAudio.play();
                numberDisplay.setAttribute('color', '#ed1b76');
            }
        
            rope.setAttribute("position", `0 1.6 ${ropePosition}`);
            player.setAttribute("position", `0 1.6 ${cameraPositionZ}`);

            if (cameraPositionZ <= -17) endGame("YOU LOSE!");
            if (ropePosition >= 0) endGame("YOU WIN!");
        
            number();
        });
        
        function endGame(message) {
            gameOver = true;
            if (timeoutId) clearTimeout(timeoutId);
            numberDisplay.setAttribute('value', message);
            numberDisplay.setAttribute('position', {x: -0.28, y: -0.5, z: -1});
            numberDisplay.setAttribute('color', 'white');
        }
    }
    
});