import ECS from '../ECS';
import {SHOW_HITBOXES, SHOW_GRID, WINDOW} from "../config";
ECS.systems.movement = function systemRender({entities, timeStamp, canvas, camera}) {
    for(let entityId in entities) {
        let curr = entities[entityId].components;
        if(curr.velocity && curr.position) {
            let {vx, vy} = curr.velocity;
            curr.position.x += vx;
            curr.position.y += vy;

            if(curr.player) {
                camera.onPlayerMove(curr.position.x);
            }
        }

    }
}