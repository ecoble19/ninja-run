import ECS from '../ECS';
import {SHOW_HITBOXES, SHOW_GRID, WINDOW} from "../config";

ECS.systems.render = function systemRender({entities, timeStamp, canvas, camera}) {
    // clear the canvas

    canvas.setTransform(1,0,0,1,-camera.leftX,0);
    canvas.clearRect(camera.leftX, 0, canvas.width + camera.leftX, canvas.height);

    for(let entityId in entities) {
        let curr = entities[entityId].components;

        if(curr.appearance && curr.position && !curr.background && !curr.player) {
            let e = {...curr.appearance, ...curr.position, ...curr.animation};
            if(!camera.isVisible(e.x,e.size.width)) {
                if(camera.leftX > e.x) {
                    delete entities[entityId];
                }
                continue;
            }
            if(curr.animation) {
                let currentFrame = curr.animation.next();
                canvas.drawImage(e.asset, e.size.width * currentFrame, 0,e.size.width, e.size.height,
                    e.x, e.y, e.size.width, e.size.height);
            }
            else {
                canvas.drawImage(e.asset, e.x, e.y, e.size.width + 1, e.size.height);
            }
            if(SHOW_HITBOXES && !curr.background) {
                canvas.beginPath();
                canvas.lineWidth = "1";
                canvas.strokeStyle = "red";
                //canvas.rect(e.x, e.y,e.size.width, e.size.height);
                canvas.rect(...calcHitRect(curr.position, curr.appearance.size, curr.hitbox.area));
                canvas.stroke();
            }
        }
    }
}

function calcHitRect(position, size, hitbox) {
    return [position.x + (size.width - hitbox.width) / 2, position.y + (size.height - hitbox.height) / 2, hitbox.width, hitbox.height];
}