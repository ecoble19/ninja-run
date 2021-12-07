import {WINDOW} from "./config";
import ECS from "./ECS";
import {AudioManager} from "./resources";
import {spawnBackground, spawnCoin, spawnPlayer, spawnTile, spawnSpike} from "./spawner";

// Add ECS plugins
import './components';
import './systems/render';
import './systems/bgRender';
import './systems/hudRender';
import './systems/movement';
import './systems/score';
import './systems/collision';
import './systems/gravity';
import './systems/endGame';
import './systems/player';
import './systems/difficulty';
import './systems/map';
import Camera from "./camera";
import userInput from "./userInput";
import {generate, TileType} from "./mapBuilder";

let oldTimeStamp = 0;
let running = true;
let camera = new Camera(40);
let music = null;
let handle = null;

const systems = [
    ECS.systems.map,
    ECS.systems.player,
    ECS.systems.movement,
    ECS.systems.collision,
    ECS.systems.gravity,
    ECS.systems.score,
    ECS.systems.endGame,
    ECS.systems.hudRender,
    ECS.systems.render,
    ECS.systems.bgRender,
    ECS.systems.difficulty
];

const gameState = {
    end: () => {
        running = false;
    },
    pause: () => {
        running = false;
    },
    unpause: () => {
        running = true;
    },
    difficulty: 20,
    mute: true,
}


function gameLoop(timeStamp) {
    timeStamp -= oldTimeStamp;
    let params = {entities: ECS.entities, query: ECS.query, timeStamp, canvas: ECS.context, bgCanvas: ECS.bgContext, hudCanvas: ECS.hudContext, camera, gameState, userInput, resources: ECS.resources}
    for (var i = 0, len = systems.length; i < len; i++) {
        // Call the system and pass in entities
        systems[i](params);
    }

    // Run through the systems.
    // continue the loop
    if (running !== false) {
        handle = requestAnimationFrame(gameLoop);
    }
}

function startGame() {
    reset();
    spawnBackground(ECS);
    spawnPlayer(ECS);
    ECS.bgContext = loadCanvas('background');
    ECS.context = loadCanvas('canvas');
    ECS.hudContext = loadCanvas('hud', 1920, 80);
    music = AudioManager.getAsset('main');
    music.loop = true;
    music.play().catch(console.error);
    gameLoop(0);
}

function reset() {
    gameState.end();
    cancelAnimationFrame(handle);
    ECS.entities = {};
    gameState.difficulty = 0;
    running = true;
}

function loadCanvas(id, width = 1920, height = 1080) {
    let c = document.getElementById(id);
    const context = c.getContext("2d");
    context.width = c.width = width;
    context.height = c.height = height;

    return context;
}

window.startGame = startGame;

//startGame();
