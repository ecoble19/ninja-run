import {CAMERA_OFFSET, WINDOW} from "./config";

export default class Camera {
    constructor(playerX) {
        this.leftX = playerX - CAMERA_OFFSET;
        this.rightX = playerX - CAMERA_OFFSET + WINDOW[0];
    }

    onPlayerMove(playerX) {
        this.leftX = playerX - CAMERA_OFFSET;
        this.rightX = playerX - CAMERA_OFFSET + WINDOW[0];
    }
    isVisible(x, width) {
        //console.log(x, width, this.leftX);
        return x + width >= this.leftX && x <= this.rightX;
    }

}