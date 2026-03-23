// SOUND
let bgAudio = new Audio('audio/game1.mp3');
let greenLight = new Audio('audio/dollAudio.mp3');

let valueDisplay;
let doll;
let attack = false;
let gameOver = false;

let myHp = 100; 
let otherHp = 100;

let lastAttackTime = 0;
let attackCooldown = 1000;

let lastEnemyHit = 0;
let enemyCooldown = 800;

window.addEventListener("DOMContentLoaded",function() {

    let player = document.getElementById("player");
    let otherGuy = document.getElementById("otherGuy"); // ✅ FIXED NAME

    let knife = document.getElementById("knife");
    let knife2 = document.getElementById("knife2");

    let myHpBar = document.getElementById("myHpBar");
    let myHpBarBg = document.getElementById("myHpBarBg");
    let otherHpBar = document.getElementById("otherHpBar");

    valueDisplay = document.getElementById("valueDisplay");

    function dist(a, b){
        return Math.sqrt(
            (a.x - b.x)**2 +
            (a.y - b.y)**2 +
            (a.z - b.z)**2
        );
    }

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

    function updateHpBars(){
        // YOUR HP
        let myRatio = myHp / 100;
        let myRatioStatic = myHp / 100;

        myHpBar.setAttribute("width", 0.6 * myRatio);

        // ✅ KEEP IT CENTERED PROPERLY
        myHpBar.setAttribute("position", `${-0.3 - (0.6 * (1 - myRatio) / 2)} 0.4 -0.97`);

        // ENEMY HP
        let otherRatio = otherHp / 100;

        otherHpBar.setAttribute("width", 2 * otherRatio);
        otherHpBar.setAttribute("position", `${- (2 * (1 - otherRatio) / 2)} 3 0.01`);
    }
    updateHpBars();

    // 👇 PLAYER ATTACK
    window.addEventListener("click", () => {

        let now = Date.now();
        if(now - lastAttackTime < attackCooldown) return;

        lastAttackTime = now;

        // animation
        knife.object3D.rotation.set(-(Math.PI/2),0,0);
        attack = true;

        setTimeout(()=>{
            knife.object3D.rotation.set(0,0,0);
            attack = false;
        }, 200);
    });

    // 👇 MAIN LOOP
    let mainLoop = setInterval(()=>{

        let p = player.object3D.position;
        let e = otherGuy.object3D.position;

        // ===== ENEMY FOLLOW =====
        let dx = p.x - e.x;
        let dz = p.z - e.z;
        let distToPlayer = Math.sqrt(dx*dx + dz*dz);

        if(distToPlayer > 1){
            e.x += dx * 0.02;
            e.z += dz * 0.02;
        }

        otherGuy.object3D.lookAt(p);

        // ===== GET KNIFE WORLD POSITIONS =====
        let k1 = new THREE.Vector3();
        let k2 = new THREE.Vector3();

        knife.object3D.getWorldPosition(k1);
        knife2.object3D.getWorldPosition(k2);

        // ===== YOUR HIT =====
        if(attack && dist(k1, e) < 2){

            otherHp -= 10;
            if(otherHp < 0) otherHp = 0;

            // 💥 knockback enemy
            e.x -= dx * 0.3;
            e.z -= dz * 0.3;

            updateHpBars();

            if(otherHp <= 0){
                otherHp = 0;

                // fall over once
                otherGuy.setAttribute('rotation', {x:-90,y:0,z:0});
                otherGuy.setAttribute('position', {x:0,y:-0.75,z:0});
                setTimeout(() => {
                    window.location.href = 'ending.html';
                }, 2000);

                // 🚫 STOP EVERYTHING
                clearInterval(mainLoop);

                return;
            }
        }

        // ===== ENEMY HIT =====
        let now = Date.now();

        if(dist(k2, p) < 2 && now - lastEnemyHit > enemyCooldown){

            lastEnemyHit = now;

            myHp -= 10;
            if(myHp < 0) myHp = 0;

            // 💥 knockback player
            p.x += dx * 0.2;
            p.z += dz * 0.2;

            updateHpBars();

            if(myHp <= 0){
                valueDisplay.setAttribute('value', "YOU DIED");
            }
        }

    }, 50);

    if(myHp <= 0){
        setTimeout(() => {
            window.location.href = 'ending.html';
        }, 2000);
            
    }
});