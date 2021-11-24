import ECS from '../ECS';
import {SHOW_HITBOXES, SHOW_GRID, WINDOW} from "../config";

ECS.systems.bgRender = function systemRender({entities, timeStamp, bgCanvas, camera}) {
    // clear the canvas
    const vLeft = (camera.leftX / 4) % WINDOW[0];
    const canvas = bgCanvas;
    canvas.setTransform(1,0,0,1,-vLeft,0);
    canvas.clearRect(vLeft, 0, canvas.width + vLeft, canvas.height);

    for(let entityId in entities) {
        let curr = entities[entityId].components;

        if(curr.background && curr.position) {
            let e = {...curr.appearance, ...curr.position, ...curr.animation};
            // Create continuous background effect
            if(curr.background) {
                canvas.drawImage(e.asset, e.x, e.y, e.size.width, e.size.height);
                canvas.drawImage(e.asset, e.x + e.size.width - 1, e.y, e.size.width, e.size.height);
            }
        }
    }
    if(SHOW_GRID) {
        const start = vLeft;
        for(let x = start; x < WINDOW[0] + start; x += 120) {
            canvas.beginPath();
            canvas.lineWidth = "1";
            canvas.strokeStyle = "rgba(0,0,0,0.3)";
            canvas.moveTo(x,0);
            canvas.lineTo(x, WINDOW[1]);
            canvas.stroke();
        }

        for(let y = 0; y < WINDOW[1]; y += 120) {
            canvas.beginPath();
            canvas.lineWidth = "1";
            canvas.strokeStyle = "rgba(0,0,0,0.3)";
            canvas.moveTo(0,y);
            canvas.lineTo(WINDOW[0] + start, y);
            canvas.stroke();
        }

    }
    //canvas.restore();

}