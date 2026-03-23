<<<<<<< HEAD
window.addEventListener('DOMContentLoaded', function() {

    let t = 60;
=======
//SOUND
let pullAudio = new Audio('audio/pullingSound.mp3');
let awayAudio = new Audio('audio/awaySound.mp3');
window.addEventListener('DOMContentLoaded', function() {

    let t = 45;
>>>>>>> 01bf2bb (game 3 v2)
    let timeDisplay = document.getElementById('time-display');
    let numberDisplay = document.getElementById('number-display');

    let rope = this.document.getElementById('rope');
<<<<<<< HEAD
    let camera = document.querySelector('a-camera');
=======
    let player = document.getElementById('player');
>>>>>>> 01bf2bb (game 3 v2)

    let ropePosition = -12; 
    let cameraPositionZ = 0; 

    let gameOver = false;
    let timeoutId; 

    let currentNumber = null;

<<<<<<< HEAD
    let bgMusic = document.getElementById("bgMusic");
    let loseSound = document.getElementById("loseSound");
    let winSound = document.getElementById("winSound");

    if (bgMusic) {
    bgMusic.loop = true;
    bgMusic.volume = 0.3;

    
    bgMusic.play().catch(() => {
        console.log("Autoplay blocked");
    });
}


    function endGame(message) {
    gameOver = true;

    // 🎵 
    let bgMusic = document.getElementById("bgMusic");
    if (bgMusic) {
        bgMusic.pause();
    }

    // 😱 
    if (message.includes("LOSE")) {
        if (loseSound) {
            loseSound.currentTime = 0;
            loseSound.play();
        }
    }

    // 🎉 
    if (message.includes("WIN")) {
        if (winSound) {
            winSound.currentTime = 0;
            winSound.play();
        }
    }

    alert(message);

     setTimeout(() => {
       
        if (message.includes("WIN")) {
            window.location.href = "ending.html";
        } else {
            window.location.href = "";
        }
    }, 500); 
}

// Timer function
    function countdown() {
        if (gameOver) return;

        if (timeDisplay) {
            timeDisplay.textContent = `Time: ${t}`;
        }

        t--;

        if (t < 0) {
            endGame("TIME'S UP! GAME OVER!");
            return;
        }

        if (t < 10 && bgMusic) {
            bgMusic.volume = 0.7; 
}

        timeoutId = setTimeout(countdown, 1000);
    }

    countdown();
// random numbers
    function number(){
        if (gameOver) return;

        currentNumber = Math.floor(Math.random() * 9) + 1;

        numberDisplay.textContent = "Press: " + currentNumber;
    }

    number();

    let musicStarted = false;

     document.addEventListener("keydown", function (event) {
        if (gameOver) return;

         if (!musicStarted && bgMusic) {
            bgMusic.play();
            musicStarted = true;
    }

        let playerInput = parseInt(event.key);

        if (playerInput === currentNumber) {
           
            ropePosition += 2;  
            cameraPositionZ += 0.3; 
        } else {
           
            ropePosition -=2;
            cameraPositionZ -= 0.3;
        }

       
        rope.setAttribute("position", `0 1.6 ${ropePosition}`);
        camera.setAttribute("position", `0 1.6 ${cameraPositionZ}`);

        if (cameraPositionZ <= -17) endGame("YOU LOSE!");
        if (ropePosition >= 0) endGame("YOU WIN!");
       
        number();
    });

     function autoPull() {
        if (gameOver) return;

        ropePosition -= 1.0; 
        cameraPositionZ -= 1.0;

        rope.setAttribute("position", `0 1.6 ${ropePosition}`);
        camera.setAttribute("position", `0 1.6 ${cameraPositionZ}`);

        if (cameraPositionZ <= -17) endGame("YOU LOSE!");
        if (ropePosition >= -5) endGame("YOU WIN!");

        if (cameraPositionZ < -10 && bgMusic) {
            bgMusic.volume = 1.0;
}
       
       
    }

    setInterval(autoPull, 2000); 
    

=======
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
    
>>>>>>> 01bf2bb (game 3 v2)
});