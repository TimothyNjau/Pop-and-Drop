const gameCont = document.querySelector(".game-cont");
let score = document.getElementById("display");

let duration = 6;
let speed = 1000
document.addEventListener("click", (e) => {
    let value = e.target;
    console.log(value.id);
    if (value.id === "monitor") {
        value.style.display = "none";
        if (score.innerText == "") {
            score.innerText = 10;
        } else {
            score.innerText = parseInt(score.innerText) + 10;
            speedChange();
        }
    }
});
let interval;
let playBtn = document.getElementById("play");
playBtn.addEventListener('click', () => {
    interval = setInterval(randomPlacement, speed);
});

//* create a function to change the speed 
function speedChange(){
    if(parseInt(score.innerText) > 45){
        duration -= .5;
    } else if (parseInt(score.innerText) > 65) {
        duration -= 1;
    } else if (parseInt(score.innerText) > 85){
        duration -= .5;
    } else if (parseInt(score.innerText) > 105) {
        duration -= .5;
    }
    clearInterval(interval);
    interval = setInterval(randomPlacement, speed);
}

//* class used to create an image object with defined width and height
class ImageConstruct {
    constructor(object) {
        this.image = document.createElement("img");
        this.image.setAttribute("src", object['link']);
        this.image.width = 60;
        this.image.height = 60;
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


function randomPlacement() {
    let arr = Object.keys(urlLinks);
    let val = randChoice(arr);
    let gamePiece = new ImageConstruct(urlLinks[val]).image;
    gamePiece.classList.add("gamePiece");
    gamePiece.style.animationDuration = `${duration}s`;
    let leftIndex = randomVal(60);
    gamePiece.style.left = `${leftIndex}%`;

    if (gameCont.firstElementChild != "") {
        gameCont.appendChild(gamePiece);
        let childArr = gameCont.children;
        if ((childArr.length > 10)) {
            for (let x = 0; x < 3; x++) {
                gameCont.removeChild(gameCont.children[x]);
            }
        }
    }
}

let pauseBtn = document.getElementById("pause");
pauseBtn.addEventListener('click', () => {
    clearInterval(interval);
})

