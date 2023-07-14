const gameCont = document.querySelector(".game-cont");

//* create class of game area which has canvas element
class GameArea {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvas";
        this.canvas.style.background = "white";
    }
    start() {
        this.canvas.width = gameCont.clientWidth - 10;
        this.canvas.height = gameCont.clientHeight;
        this.ctx = this.canvas.getContext("2d");
        gameCont.append(this.canvas);
    }
    clear() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    }
}
//* initiate game area object and its start function
const myGame = new GameArea();
myGame.start();

//* canv refers to the canvas which has been created.
let canv = myGame.canvas;
//* class used to create an image object with defined width and height
class ImageConstruct {
    constructor(url) {
        this.image = document.createElement("img");
        this.image.setAttribute("src", `${url}`);
        this.image.width = 60;
        this.image.height = 60;
    }
}
/*
* object constructor used to create components at 
* specified positions in the canvas
*/
function GameComponent(x, y, image) {
    this.y = y;
    let context = myGame.ctx;
    context.drawImage(image, x, y, image.width, image.height);
    this.update = () => {
        myGame.clear();
        this.y += 1;
        context.drawImage(image, x, y, image.width, image.height);
    }

}
//* object which has url links
const urlLinks = {
    monitorUrl: "./images/monitor.png",
    mouseUrl: "./images/mouse.png",
    keyboardUrl: "./images/keyboard.png"
}
const imageArray = [];
function loadImages(arr) {
    for (let link in urlLinks) {
        let image = new ImageConstruct(urlLinks[link]).image;
        arr.push(image);
    }
}
loadImages(imageArray);
let x = 50; let y = 400;
let gamePiece;
for (let image of imageArray) {
    gamePiece = new GameComponent(x, y, image);
    x += 100;
    //setInterval(gamePiece.update(), 1000);
}