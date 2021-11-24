import MAP from "../model/Map";
import AssetManager from "../resources/AssetManager";
import Canvas from "../view/Canvas";
import {BLOCK} from "../config";

function load() {
    let tile = AssetManager.getAsset('tile');
    console.log('BLOCK', BLOCK, tile)
    for(let i = 0; i < 16; i++) {
        Canvas.drawImage(tile, BLOCK * i,100,BLOCK + 1,BLOCK + 1);
    }
}

export default {load}