window.addEventListener('DOMContentLoaded', function() {

    let t = 60;
    let timeDisplay = document.getElementById('time-display');
    let numberDisplay = document.getElementById('number-display');

    let rope = this.document.getElementById('rope');
    let camera = document.querySelector('a-camera');

    let ropePosition = -12; 
    let cameraPositionZ = 0; 

    let gameOver = false;
    let timeoutId; 

    let currentNumber = null;

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

    // 🎵 停止背景音乐
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
    

});