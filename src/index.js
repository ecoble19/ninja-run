import {WINDOW} from "./config";
import ECS from "./ECS";
import {spawnBackground, spawnCoin, spawnPlayer, spawnTile} from "./spawner";

// Add ECS plugins
import './components';
import './systems/render';
import './systems/bgRender';
import './systems/movement';
import Camera from "./camera";
import {generate, TileType} from "./mapBuilder";

let oldTimeStamp = 0;
let running = true;
let camera = new Camera(40);

const systems = [
    ECS.systems.movement,

    ECS.systems.render,
    ECS.systems.bgRender,


];

function createWorld(map) {
    spawnBackground(ECS);

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === TileType.Land) {
                spawnTile(ECS, {x: j * 120, y: WINDOW[1] - 120 * (i + 1)})
            } else if (map[i][j] === TileType.Coin) {
                spawnCoin(ECS, {x: j * 120, y: WINDOW[1] - 120 * (i + 1)})
            }
        }
    }
    spawnPlayer(ECS);

}


function gameLoop(timeStamp) {
    let secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    let params = {entities: ECS.entities, timeStamp, canvas: ECS.context, bgCanvas: ECS.bgContext, camera}
    for (var i = 0, len = systems.length; i < len; i++) {
        // Call the system and pass in entities
        // NOTE: One optimal solution would be to only pass in entities
        // that have the relevant components for the system, instead of
        // forcing the system to iterate over all entities
        systems[i](params);
    }

    // Run through the systems.
    // continue the loop
    if (running !== false) {
        requestAnimationFrame(gameLoop);
    }
}

function startGame() {
    console.log('Starting');
    createWorld(generate(100));
    ECS.bgContext = loadCanvas('background').getContext("2d");
    ECS.context = loadCanvas('canvas').getContext("2d");

    ECS.context.width = ECS.bgContext.width = 1920;
    ECS.context.height = ECS.bgContext.height = 1080;
    gameLoop(0);
}

function loadCanvas(id) {
    let c = document.getElementById(id);
    c.width = 1920;
    c.height = 1080;
    return c;
}

startGame();
