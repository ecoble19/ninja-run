import AssetManager from "../resources";
import {speed, WINDOW} from "../config";


export default class Background {
    constructor (context, x, y){
        this.context = context;
        this.x = x;
        this.y = y;
        // Set default width and height
        [this.width, this.height] = WINDOW;
    }

    draw(){
        let asset = AssetManager.getAsset('bg');
        this.context.drawImage(asset, this.x, this.y, this.width, this.height);
        this.context.drawImage(asset, this.x + this.width - 1, this.y, this.width, this.height);
    }

    update(secondsPassed){
        this.x -= (speed / 1) * secondsPassed * 25;
        if(-this.x > this.width) {
            this.x += this.width;
        }
    }
}

