import ECS from "../ECS";

let startingDifficulty = null;
ECS.systems.difficulty = function systemDifficulty({entities, query, gameState, timeStamp}) {

    const player = query("player")[0];
    if(startingDifficulty === null) {
        startingDifficulty = gameState.difficulty;
    }

    let difficulty = startingDifficulty + Math.floor(timeStamp / 5000);
    if(!player.components.player.dying && difficulty !== gameState.difficulty) {
        gameState.difficulty = difficulty;
        player.components.velocity.vx = Math.min(20, difficulty) + 10;
    }

    if(!player.components.player.jumping && !player.components.player.dying) {
        player.components.animation.animationsPerSecond = Math.min(10, difficulty) + 10;
    }
}