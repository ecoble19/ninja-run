import ECS from '../ECS';
import {JUMP_POWER} from "../config";

let jumpStart = null;

ECS.systems.player = function systemPlayer({query, camera, userInput, timeStamp, resources, gameState}) {
    const playerComponent = query("player")[0];
    const {id, components} = playerComponent;
    const player = components;
    let jumpTime = timeStamp - (jumpStart || timeStamp);

    if(!userInput.space.pressed) {
        jumpStart = null;
    }
    if(player.player.dying) {
        if(!player.die) {
            playerComponent.addComponent(new ECS.Components.Die());
            playerComponent.removeComponent("animation");
            playerComponent.removeComponent("appearance");

            playerComponent.addComponent(new ECS.Components.Animation(8, 5, false));
            playerComponent.addComponent(new ECS.Components.Appearance(resources.images.getAsset('ninjaDie'), {width: 192, height: 190}));

            playerComponent.components.velocity.vx = 0;

            // Game over
            setTimeout(gameState.end, 1700);
        }

    }
    else if(player.velocity && player.gravity.grounded && userInput.space.pressed && !jumpStart) {
        jumpStart = timeStamp;
        player.velocity.vy -= JUMP_POWER
        player.gravity.grounded = false;
        player.player.jumping = true;
        resources.audio.getAsset('jump').volume = .1;
        resources.audio.getAsset('jump').play();

        playerComponent.removeComponent("animation");
        playerComponent.removeComponent("appearance");

        playerComponent.addComponent(new ECS.Components.Animation(10, 10, false));
        playerComponent.addComponent(new ECS.Components.Appearance(resources.images.getAsset('ninjaJump'), {width: 150, height: 190}));
    }
    else if(player.velocity && userInput.space.pressed && jumpTime !== 0 && jumpTime < 500) {
        player.velocity.vy -= 3.2  * (1 - jumpTime / 300);
        //player.velocity.vy  -= (timeStamp - player.gravity.timeStamp) / 50000.0 * GRAVITY
    }

    else if(player.gravity.grounded && player.player.jumping) {
        playerComponent.removeComponent("appearance");
        playerComponent.addComponent(new ECS.Components.Appearance(resources.images.getAsset('ninjaRun'), {width: 151, height: 190}));
        playerComponent.removeComponent("animation");
        playerComponent.addComponent(new ECS.Components.Animation(10, 10));
        player.player.jumping = false;
    }
}