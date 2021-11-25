import ECS from '../ECS';


ECS.systems.score = function systemRender({entities, timeStamp, hudCanvas}) {

    for(let entityId in entities) {
        let curr = entities[entityId].components;

        if (curr.player && curr.position) {
            let e = {...curr.player, ...curr.position};
            curr.player.score = Math.floor(e.x / 1000) * 100 + e.money;
            //console.log(e.money);
        }
    }
}