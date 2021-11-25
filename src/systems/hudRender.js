import ECS from '../ECS';
import {SHOW_HITBOXES, SHOW_GRID, WINDOW} from "../config";

let score = -1;
let money = 0;
ECS.systems.hudRender = function systemRender({entities, hudCanvas}) {

    let newScore = score;
    for(let entityId in entities) {
        let curr = entities[entityId].components;

        if (curr.player) {
            newScore = curr.player.score;
        }
    }
    if(newScore !== score) {
        score = newScore;
        hudCanvas.clearRect(0, 0, hudCanvas.width, hudCanvas.height);
        const gradient = hudCanvas.createLinearGradient(0,0,0, hudCanvas.height);
        gradient.addColorStop(0, "rgba(32,32,47,1)");
        gradient.addColorStop(.62, "rgba(40,40,55,1)");
        gradient.addColorStop(.98, "rgba(51,51,68,1)");
        //gradient.addColorStop(1, "rgba(51,51,68,0.2)");
        hudCanvas.fillStyle = gradient;
        hudCanvas.fillRect(0, 0,hudCanvas.width, hudCanvas.height);
        hudCanvas.font = "48px PerfectDark";
        hudCanvas.fillStyle = "#DDD";
        hudCanvas.textBaseline = "top";
        hudCanvas.fillText("Score", 18, 16);

        hudCanvas.font = "38px PerfectDark";
        hudCanvas.fillStyle = "#F3F3F3";
        hudCanvas.textBaseline = "top";
        hudCanvas.fillText(score, 220, 21);
    }
}