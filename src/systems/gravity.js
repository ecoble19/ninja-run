import {GRAVITY, BLOCK} from "../config";
import ECS from '../ECS';


ECS.systems.gravity = function systemGravity({entities, timeStamp}) {

    for(let entityId in entities) {
        let curr = entities[entityId].components;
        if(curr.position && curr.gravity && curr.velocity) {
            const e = {...curr.position, ...curr.gravity};
            // // start time stamp for each gravity calculation
            if(!e.timeStamp) {
                curr.gravity.timeStamp = timeStamp;
            }
            if(e.grounded) {
                curr.velocity.vy = 0;
                curr.gravity.timeStamp = null;
            }
            else {
                //curr.velocity.vy += (timeStamp - curr.gravity.timeStamp) / 1000.0 * GRAVITY;
                curr.velocity.vy += .3 * GRAVITY;

                // Max fall speed cap at 100
                if(curr.velocity.vy > 100) {
                    curr.velocity.vy = 100;
                }
            }
        }
    }
}