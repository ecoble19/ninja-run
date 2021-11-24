import AssetManager from "../resources/AssetManager";
import GameObject from "./GameObject";
import {speed, WINDOW} from "../config";


export default class Coin extends GameObject {
    constructor (context, x, y, vx, vy){
        super(context, x, y, vx, vy);

        // Set default width and height
        [this.width, this.height] = WINDOW;
    }

    draw(){
        let asset = AssetManager.getAsset('bg');
        this.context.drawImage(asset, this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        this.x -= (speed / 1) * secondsPassed * 25;
        if(-this.x > this.width) {
            this.x += this.width;
        }
    }
}

