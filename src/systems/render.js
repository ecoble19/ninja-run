import ECS from '../ECS';
import {SHOW_HITBOXES, SHOW_GRID, WINDOW} from "../config";

ECS.systems.render = function systemRender({entities, timeStamp, canvas, camera}) {
    // clear the canvas

    canvas.setTransform(1,0,0,1,-camera.leftX,0);
    canvas.clearRect(camera.leftX, 0, canvas.width + camera.leftX, canvas.height);

    for(let entityId in entities) {
        let curr = entities[entityId].components;

        if(curr.appearance && curr.position) {
            let e = {...curr.appearance, ...curr.position, ...curr.animation};
            if(!camera.isVisible(e.x,e.size.width)) {
                continue;
            }
            if(curr.animation) {
                let interval = 1000 / e.animationsPerSecond;
                let currentFrame = Math.floor((timeStamp / interval) % e.frames);
                canvas.drawImage(e.asset, e.size.width * currentFrame, 0,e.size.width, e.size.height,
                    e.x, e.y, e.size.width, e.size.height);
            }
            // Create continuous background effect
            else if(curr.background) {
                //canvas.drawImage(e.asset, e.x, e.y, e.size.width, e.size.height);
                //canvas.drawImage(e.asset, e.x + e.size.width - 1, e.y, e.size.width, e.size.height);
            }
            else {
                canvas.drawImage(e.asset, e.x, e.y, e.size.width + 1, e.size.height);
            }
            if(SHOW_HITBOXES && !curr.background) {
                canvas.beginPath();
                canvas.lineWidth = "1";
                canvas.strokeStyle = "red";
                canvas.rect(e.x, e.y,e.size.width, e.size.height);
                canvas.stroke();
            }
        }
    }
    canvas.clearRect(camera.leftX, 0, canvas.width + camera.leftX, 500);
    //canvas.restore();

}