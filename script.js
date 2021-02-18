let order = [];
let playerOrder=[];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.getElementById("turn");
const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");
const strictButton = document.getElementById("strict");
const onButton = document.getElementById("on");
const startButton = document.getElementById("start");

strictButton.addEventListener('click', (_event) => {
    if (strictButton.checked == true){
        strict = true;
    } else {
        strict = false;
    }
});

onButton.addEventListener('click', (_event) => {
    if (onButton.checked == true){
        on = true;
        turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});

startButton.addEventListener('click', (event) => {
    if (on || win) {
        play();
    }
});

function play(){
// set all variables to original, set Interval for light flasing and set Timeout for light flashing
    order = [];
    playerOrder = [];
    flash = 0;
    good = true;
    compTurn = false;
    turn = 1;
    win = false;
    intervalId = 0;
    turnCounter.innerHTML = 1;
    for (i = 0; i < 20; i++){
    order.push(Math.floor(Math.random()  * 4) + 1);
    }
    console.log(order);
    compTurn = true;
    
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        on = true;
        clearColor();
    } 
    if (compTurn) {
        clearColor();

        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++ ;
        }, 200);
    } 
}

function one() {
    if (noise) {
        var audio1 = new Audio("sounds/simonSound1.mp3");
        audio1.play();
    }
    noise = true;    
    topLeft.style.backgroundColor = "lightgreen";
};

function two() {
    if (noise) {
        var audio2 = new Audio("sounds/simonSound2.mp3");
        audio2.play();
    }
    noise = true;    
    topRight.style.backgroundColor = "tomato";
};

function three() {
    if (noise) {
        var audio3 = new Audio("sounds/simonSound3.mp3");
        audio3.play();
    }
    noise = true;    
    bottomLeft.style.backgroundColor = "yellow";
};

function four() {
    if (noise) {
        var audio4 = new Audio("sounds/simonSound4.mp3");
        audio4.play();
    }
    noise = true;    
    bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor(){
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
};

function flashColor(){
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightblue";
};

topLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1);
        one();
        check();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

topRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(2);
        two();
        check();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(3);
        three();
        check();
        if (!win) {
            setTimeout(() => {
                 clearColor();
            }, 300);
        }
    }
});

bottomRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(4);
        four();
        check();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

function check() {
    
    if (playerOrder[playerOrder.length-1] !== order[playerOrder.length-1]) good = false;

    if (playerOrder.length == 20 && good) {
        winGame();
    }

    if (good == false) {

        flashColor();
        turnCounter.innerHTML = "NO!"
        setTimeout(() => {
            
            turnCounter.innerHTML = turn;
            clearColor();

            if (strict) {
                play();
            }

            if (!strict) {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        noise = false;
    }
    if  (turn == playerOrder.length && good && !win) {
        turn ++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
};

function winGame () {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    win = true;
}; 