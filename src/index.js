import {WINDOW} from "./config";
import ECS from "./ECS";
import {spawnBackground, spawnCoin, spawnPlayer, spawnTile} from "./spawner";

// Add ECS plugins
import './components';
import './systems/render';
import './systems/bgRender';
import './systems/hudRender';
import './systems/movement';
import './systems/score';
import './systems/collision';
import Camera from "./camera";
import {generate, TileType} from "./mapBuilder";

let oldTimeStamp = 0;
let running = true;
let camera = new Camera(40);

const systems = [
    ECS.systems.movement,
    ECS.systems.collision,
    ECS.systems.score,
    ECS.systems.hudRender,
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

    let params = {entities: ECS.entities, query: ECS.query, timeStamp, canvas: ECS.context, bgCanvas: ECS.bgContext, hudCanvas: ECS.hudContext, camera}
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
    ECS.bgContext = loadCanvas('background');
    ECS.context = loadCanvas('canvas');
    ECS.hudContext = loadCanvas('hud', 1920, 80);
    gameLoop(0);
}

function loadCanvas(id, width = 1920, height = 1080) {
    let c = document.getElementById(id);
    const context = c.getContext("2d");
    context.width = c.width = width;
    context.height = c.height = height;

    return context;
}

startGame();
