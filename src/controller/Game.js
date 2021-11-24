
import AssetManager from "../resources/AssetManager";
import Canvas from "../view/Canvas";
import MapLoader from "./MapLoader";
import Ninja from "../view/Ninja";
import MAP from "../model/Map";
import Background from "../view/Background";
import {speed} from "../config";

let gameObjects;
let oldTimeStamp = 0;

function Game() {
    Canvas.start();
    loadAssets(reset);
    console.log('Starting');
    createWorld();
    gameLoop(0);
}

function loadAssets(cb) {
    AssetManager.queueDownload('bg','../assets/hills/layer-1.png');
    AssetManager.queueDownload('tile','../assets/hills/tile.png');
    AssetManager.queueDownload('ninjaRun','../assets/ninja/run.png');
    AssetManager.queueDownload('spike','../assets/obstacles/spike D.png');
    AssetManager.queueDownload('coin','../assets/coins/coin48.png');
    AssetManager.downloadAll(cb);
}

function createWorld() {
    gameObjects = [
        new Background(Canvas.context, 0, 0, 0, 0),
        new Ninja(Canvas.context, 10, 730, 0, 9.81)
    ]
}

function gameLoop(timeStamp)
{
    let secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Loop over all game objects
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].update(secondsPassed);
    }

    Canvas.clear();

    // Do the same to draw
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw();
    }

    window.requestAnimationFrame(gameLoop);
}

function reset() {
    let bg = AssetManager.getAsset('bg');
    Canvas.drawImage(bg, 0,0,1920,1080);
    MapLoader.load();

}

export default Game;