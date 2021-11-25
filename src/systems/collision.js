import ECS from '../ECS';


ECS.systems.collision = function systemRender({entities, query}) {

    const {id, components} = query("player")[0];
    const player = components;
    for(let entityId in entities) {
        if(entities[entityId] === player) {
            continue;
        }
        let curr = entities[entityId].components;
        if(curr.position && curr.appearance && curr.collision &&
            didCollide({...player.position, ...player.appearance.size}, {...curr.position, ...curr.appearance.size})) {

            if(curr.money) {
                entities[id].components.player.money += curr.money.value;
                delete entities[entityId];
            }
        }
    }
}

function didCollide(item1, item2) {
    return isWithin(item1, item2) || isWithin(item2, item1);
}

function isWithin(item1, item2) {
    return item1.x < item2.x && item1.x + item1.width - 10 >= item2.x
        && item1.y < item2.y && item1.y + item1.height - 10 >= item2.y;
}