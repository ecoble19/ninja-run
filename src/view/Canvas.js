// function startGame(map) {
//     myGameArea.start();
//
// }

const myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawImage: function(...args) {
        this.context.drawImage(...args);
    }

}

export default myGameArea;