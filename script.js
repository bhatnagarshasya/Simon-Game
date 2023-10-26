let gameseq = [];
let userseq = [];
let started = false;
let level = 0;
let highScr = [];

let btns = ["blue", "yellow", "green", "purple"]

let h2 = document.querySelector("h2");

//Step 1 Start game
document.addEventListener("keypress", function(){
    if(started == false){
        started = true;

        levelUp();
    }
});

//Step 2 Game Flashing button function
function gameFlash(btn){
    //add flash class from css
    btn.classList.add("flash"); 

    //remove flash class after that
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 300)
}

// Flash for user click function
function userFlash(btn){
    //add flash class from css
    btn.classList.add("userflash"); 

    //remove flash class after that
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 300)
}

//Leveling up function
function levelUp(){
    userseq = [];

    // level up
    level++;
    h2.innerText = `Level ${level}`;

    //random number from index 0-3
    let randIndx = Math.floor(Math.random() * 3);
    //random color
    let randColor = btns[randIndx];
    //select the button
    let randbtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    console.log(gameseq);

    //random btn choosen
    gameFlash(randbtn);
};

function checkAnswer(index){
    
    //click is correct
    if(userseq[index] === gameseq[index]){
        // last click condition
        if(userseq.length == gameseq.length){
            setTimeout(levelUp, 1000);
        }
    }

    //if wrong clicked
    else{
        // highest of old score
        highScr.push(level-1);
        let highest = Math.max.apply(null, highScr);


        h2.innerHTML = `Game Over! Your score was <b>${level-1}</b> <br> Highest Score ${highest} <br> Press Any key to start again`;

        //flash red background and back
        document.querySelector("body").style.backgroundColor = "#F88379";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "mistyrose";
        }, 150);
        reset();
    }
    
}

//btn is in different functs - funct scope is applied

// After press button function
function btnPress(){
    let btn = this;

    // To flash the button
    userFlash(btn);

    // to get color of button from id of div
    userColor = btn.getAttribute("id");
    // adds to the array
    userseq.push(userColor);

    //check the last button clicked is correct
    checkAnswer(userseq.length-1);
}

//Event listener to button - check all buttons if they were clicked
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

// to restart the game
function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}