import ECS from '../ECS';
import {SHOW_HITBOXES, SHOW_GRID, WINDOW} from "../config";

ECS.systems.playerRender = function systemPlayerRender({query, playerCanvas, camera}) {

    let canvas = playerCanvas;
    canvas.setTransform(1,0,0,1,-camera.leftX,0);
    canvas.clearRect(camera.leftX, 0, canvas.width + camera.leftX, canvas.height);

    const playerComponent = query("player")[0];
    const {id, components} = playerComponent;
    const player = components;
    let e = {...player.appearance, ...player.position, ...player.animation};
    if(player.animation) {
        let currentFrame = player.animation.next();
        canvas.drawImage(e.asset, e.size.width * currentFrame, 0,e.size.width, e.size.height,
            e.x, e.y, e.size.width, e.size.height);
    }
    else {
        canvas.drawImage(e.asset, e.x, e.y, e.size.width + 1, e.size.height);
    }
    if(SHOW_HITBOXES) {
        canvas.beginPath();
        canvas.lineWidth = "1";
        canvas.strokeStyle = "red";
        //canvas.rect(e.x, e.y,e.size.width, e.size.height);
        canvas.rect(...calcHitRect(player.position, player.appearance.size, player.hitbox.area));
        canvas.stroke();
    }
}

function calcHitRect(position, size, hitbox) {
    return [position.x + (size.width - hitbox.width) / 2, position.y + (size.height - hitbox.height) / 2, hitbox.width, hitbox.height];
}