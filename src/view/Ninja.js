import AssetManager from "../resources/AssetManager";
import GameObject from "./GameObject";
import {speed} from "../config";


export default class Ninja extends GameObject {
    static frameCount = 10;
    constructor (context, x, y, vx, vy){
        super(context, x, y, vx, vy);

        // Set default width and height
        this.width = 365;
        this.height = 458;
        this.frame = 0;
        this.isJumping = false;
        this.isFalling = false;
    }

    jump() {
        this.frame = 0;
        this.isJumping = true;
        this.isFalling = false;
    }

    fall() {
        this.isFalling = true;
        this.isJumping = false;
    }

    land() {
        this.frame = 0;
        this.isFalling = false;
        this.isJumping = false;
    }

    draw(){
        let currentFrame = Math.floor(this.frame) % Ninja.frameCount;
        let asset = this.isJumping ? null : AssetManager.getAsset('ninjaRun');

        this.context.drawImage(asset, this.width * currentFrame, 0,this.width, this.height, this.x, this.y, this.width / 2, this.height / 2);
    }

    update(secondsPassed){
        let nextFrame = this.frame + secondsPassed;
        if(this.isJumping && nextFrame >= 10) {
            this.isJumping = false;
        }

        if(this.isJumping) {
            this.y += this.vy * secondsPassed;
        }
        else if(this.isFalling) {
            this.y -= this.vy * secondsPassed;
        }
        this.frame += secondsPassed * speed;
    }
}

