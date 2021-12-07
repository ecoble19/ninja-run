import ECS from '../ECS';

ECS.systems.movement = function systemMovement({entities, timeStamp, canvas, camera}) {
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