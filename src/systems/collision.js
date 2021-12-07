import ECS from '../ECS';


ECS.systems.collision = function systemCollision({entities, query, resources}) {

    const {id, components} = query("player")[0];
    const player = components;
    player.gravity.grounded = false;

    for(let entityId in entities) {
        if(entities[entityId] === player) {
            continue;
        }
        let curr = entities[entityId].components;
        if(curr.position && curr.appearance && curr.collision &&
            didCollide({...player.position, ...player.appearance.size}, {...curr.position, ...curr.appearance.size})) {

            if(curr.money) {
                // Collect the money
                entities[id].components.player.money += curr.money.value;
                resources.audio.getAsset('coin').cloneNode().play();
                delete entities[entityId];
            }
            else if(curr.tile && player.position.y < curr.position.y) {
                player.gravity.grounded = true;
                player.gravity.timeStamp = null;
            }

            if(!curr.money && player.position.y < curr.position.y) {
                player.velocity.vy = 0;
                player.position.y = curr.position.y - player.appearance.size.height + 15;
            }
            if(!curr.money && player.position.x > curr.position.x) {
                player.position.x = curr.position.x + player.appearance.size.width + 15;
            }
            if(!curr.money && player.position.y > curr.position.y) {
                player.velocity.vy = 0;
                player.position.y = curr.position.y + curr.appearance.size.height;
            }
            if(!curr.money && player.position.x > curr.position.x) {
                player.position.x = curr.position.x + player.appearance.size.width + 15;
            }
        }


    }
}

function didCollide(item1, item2) {
    return isWithin(item1, item2) || isWithin(item2, item1);
}

function isWithin(item1, item2) {
    return isWithinX(item1, item2) && isWithinY(item1, item2);
}

function isWithinX(item1, item2) {
    return item1.x < item2.x && item1.x + item1.width - 10 > item2.x;
}

function isWithinY(item1, item2) {
    return item1.y < item2.y && item1.y + item1.height - 10 > item2.y;
}