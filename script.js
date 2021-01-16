const pickedsButton = document.querySelectorAll(".play-screen .picked-container");
const playAgainButton = document.querySelector(".play-again");
const playScreen = document.querySelector(".play-screen");

const resultScreen = document.querySelector(".result-screen");

const userPickedContainer = document.querySelector(".you-picked .picked-container");
const botPickedContainer = document.querySelector(".house-picked .picked-container");

const rules = document.querySelector(".rules");
const rulesButton = document.querySelector(".rules-button button");
const closeButton = document.querySelector(".rules button");

const pickeds = ["rock","paper","scissors"];

function showPicked (element,picked){
    const icon = document.createElement("img");

    icon.src = `./images/icon-${picked}.svg`;
    icon.alt = picked;

    element.children[0].children[0].innerHTML = "";
    element.children[0].children[0].appendChild(icon);
    element.classList.add(picked);
    setTimeout(() => element.classList.add("show-picked"), 1);
}

function showResult(result){
    

    document.querySelector(".result-container h1").innerText = result;
    setTimeout(() => resultScreen.classList.add("show-result"),700);
}

function calculeteResult(user,bot){
    const draw = user === bot
    const win = (user === "paper" && bot === "rock") || (user === "scissors" && bot === "paper") || (user === "rock" && bot === "scissors");

    if (draw){
        showResult("DRAW");
    }
    else{
        if (win){
            showResult("YOU WIN");
            setTimeout(() => calculeteScore(1),1400);
        }
        else{
            showResult("YOU LOSE");
            setTimeout(() => calculeteScore(-1),1400);
        }
    }
}

function calculeteScore(point){
    const score = document.querySelector(".score");
    const currentScore = Number(score.innerText);

    score.innerText = currentScore + point >= 0 ? currentScore + point : currentScore;
}

function play (){
    const user = this.classList[1];
    const pickedID = Math.floor(Math.random() * (3 - 0)) + 0;
    const bot = pickeds[pickedID];

    playScreen.classList.add("off");
    resultScreen.classList.remove("off");

    showPicked(userPickedContainer,user);
    setTimeout(() => showPicked(botPickedContainer,bot),700);
    setTimeout(() => calculeteResult(user,bot),700);
}

function playAgain(){
    const userPicked = userPickedContainer.classList[1];
    const botPicked = botPickedContainer.classList[1];

    resultScreen.classList.add("off");
    playScreen.classList.remove("off");

    userPickedContainer.classList.remove("show-picked",userPicked);
    botPickedContainer.classList.remove("show-picked",botPicked);

    resultScreen.classList.remove("show-result");
}

const showRules = () => rules.classList.add("active");

const closeRules = () => rules.classList.remove("active");

pickedsButton.forEach(picked => picked.addEventListener("click",play));
playAgainButton.addEventListener("click", playAgain);
rulesButton.addEventListener("click",showRules);
closeButton.addEventListener("click",closeRules);