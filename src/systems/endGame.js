import {WINDOW} from "../config";
import ECS from '../ECS';

ECS.systems.endGame = function systemEndGame({query, timeStamp, canvas, camera, gameState}) {
    const {id, components} = query("player")[0];
    const player = components;

    // if(player.position.y > WINDOW[1] || player.velocity.vx === 0) {
    //     gameState.end();
    // }
}