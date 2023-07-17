const gameCont = document.querySelector(".game-cont");
let score = document.getElementById("display");
const timer = document.getElementById("timer");

let duration = 7;
let speed = 1000;
document.addEventListener("click", (e) => {
    let value = e.target;
    if (value.id === "monitor") {
        value.parentElement.removeChild(value);
        score.innerText = parseInt(score.innerText) + 10;
        speedChange();
    }
});
let interval;
let playBtn = document.getElementById("play");
playBtn.addEventListener('click', () => {
    setInterval(updateTimer, 1000);
    interval = setInterval(randomPlacement, speed);
    setInterval(FirstElement, 20);
});

//* create a function to change the speed 
function speedChange() {
    scorevalue = parseInt(score.innerText);
    if (scorevalue <= 45) {
        duration = duration;
    } else if (scorevalue <= 65 ) {
        duration = 5;
    } else if (scorevalue <= 85) {
        duration = 4;
    } else if (scorevalue <= 135) {
        duration = 3.75;
        speed = 500;
    } else if (scorevalue <= 185 ) {
        duration = 3.5;
    } else if (scorevalue <= 220) {
        duration = 3;
    } else if (scorevalue > 250) {
        duration = 2.65;
        speed = 300;
    }
    clearInterval(interval);
    interval = setInterval(randomPlacement, speed);
}

//* class used to create an image object with defined width and height
class ImageConstruct {
    constructor(object) {
        this.image = document.createElement("img");
        this.image.setAttribute("src", object['link']);
        this.image.width = 80;
        this.image.height = 80;
        this.image.id = object['id'];
    }
}
//* object which has url links
const urlLinks = {
    monitorUrl: {
        link: "./images/monitor.png",
        id: "monitor"
    },
    mouseUrl: {
        link: "./images/mouse.png",
        id: "mouse"
    },
    keyboardUrl: {
        link: "./images/keyboard.png",
        id: "keyboard"
    }
}
const imageArray = [];
function loadImages(arr) {
    for (let object in urlLinks) {
        let image = new ImageConstruct(urlLinks[object]).image;
        arr.push(image);
    }
}
loadImages(imageArray);


function randChoice(array) {
    let max = array.length;
    let randValue = Math.floor(Math.random() * max);
    return (array[randValue])
}
function randomVal(max) {
    let value;
    return (value = Math.floor(Math.random() * max))
}

let flag = false;
function randomPlacement() {
    let arr = Object.keys(urlLinks);
    let val = randChoice(arr);
    let gamePiece = new ImageConstruct(urlLinks[val]).image;
    gamePiece.classList.add("gamePiece");
    gamePiece.style.animationDuration = `${duration}s`;
    if (!flag) {
        let leftIndex = randomVal(60);
        gamePiece.style.left = `${leftIndex}%`;
        flag = true
    } else {
        let rightIndex = randomVal(60);
        gamePiece.style.right = `${rightIndex}%`;
        flag = false;
    }
    if (gameCont.firstElementChild != "") {
        gameCont.appendChild(gamePiece);
        let childArr = gameCont.children;
        if ((childArr.length > 10)) {
            while (childArr.length > 5) {
                //gameCont.removeChild(gameCont.firstElementChild);
            }
        }
    }
}

let pauseBtn = document.getElementById("pause");
pauseBtn.addEventListener('click', () => {
    clearInterval(interval);
})
function FirstElement() {
    if (gameCont.children.length > 0) {
        let initElem = gameCont.firstElementChild;
        if (initElem.offsetTop < -30) {
            gameCont.removeChild(gameCont.firstElementChild);
        }
    }
}

function updateTimer() {
    let timeArr = timer.innerText.split(":");
    let seconds = parseInt(timeArr[1]);
    if( seconds > 0){
        seconds--;

    } else if (seconds == 0){
        seconds = "00";
        clearInterval(interval);
    }
    timeArr[1] = seconds;
    timer.innerText = timeArr.join(":");
}