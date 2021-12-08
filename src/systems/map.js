import {BLOCK, CHUNK_SIZE, WINDOW} from "../config";
import {generate, TileType} from "../mapBuilder";
import ECS from '../ECS';
import {spawnCoin, spawnSpike, spawnTile} from "../spawner";

ECS.systems.map = function systemMap({query, entities, timeStamp, gameState}) {
    const playerComponent = query("player")[0];
    const {id, components} = playerComponent;
    const player = components;

    if(player.position.x / BLOCK > CHUNK_SIZE * gameState.currentChunk / 2) {
        console.log('RENDER');

        let map = generate(CHUNK_SIZE, gameState.difficulty);
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === TileType.Land) {
                    spawnTile(ECS, {x: j * BLOCK + (gameState.currentChunk * CHUNK_SIZE * BLOCK), y: WINDOW[1] - BLOCK * (i + 1)})
                } else if (map[i][j] === TileType.Coin) {
                    spawnCoin(ECS, {x: j * BLOCK  + (gameState.currentChunk * CHUNK_SIZE * BLOCK), y: WINDOW[1] - 120 * (i + 1)})
                } else if(map[i][j] === TileType.Spike) {
                    spawnSpike(ECS, {x: j * BLOCK + (gameState.currentChunk * CHUNK_SIZE * BLOCK), y: WINDOW[1] - 120 * (i + 1)})
                }
            }
        }
        gameState.currentChunk++;

    }

}