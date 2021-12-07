import {CAMERA_OFFSET, WINDOW} from "../config";


export function spawnPlayer(ecs) {
    const entity = new ecs.Entity();
    entity.addComponent(new ecs.Components.Appearance(ecs.resources.images.getAsset('ninjaRun'), {width: 159, height: 200}));
    entity.addComponent(new ecs.Components.Animation(10, 15));
    entity.addComponent(new ecs.Components.Collision());
    entity.addComponent(new ecs.Components.Position(CAMERA_OFFSET,-500)); //775
    entity.addComponent(new ecs.Components.Player());
    entity.addComponent(new ecs.Components.Gravity());
    entity.addComponent(new ecs.Components.Velocity(10, 0));
    ecs.entities[entity.id] = entity;
}

export function spawnBackground(ecs) {
    const entity = new ecs.Entity();
    entity.addComponent(new ecs.Components.Appearance(ecs.resources.images.getAsset('bg'), {width: WINDOW[0], height: WINDOW[1]}));
    entity.addComponent(new ecs.Components.Position(0,0));
    entity.addComponent(new ecs.Components.Background());
    entity.addComponent(new ecs.Components.Velocity(0, 0));
    ecs.entities[entity.id] = entity;
}

export function spawnCoin(ecs, point) {
    const entity = new ecs.Entity();
    entity.addComponent(new ecs.Components.Collision());
    entity.addComponent(new ecs.Components.Appearance(ecs.resources.images.getAsset('coin'), {width: 48, height: 48}));
    entity.addComponent(new ecs.Components.Money(500));
    entity.addComponent(new ecs.Components.Position(point.x + 36, point.y + 36));
    entity.addComponent(new ecs.Components.Animation(59, 22));
    ecs.entities[entity.id] = entity;
}

export function spawnTile(ecs, point) {
    const entity = new ecs.Entity();
    entity.addComponent(new ecs.Components.Collision());
    entity.addComponent(new ecs.Components.Appearance(ecs.resources.images.getAsset('tile'), {width: 120, height: 120}));
    entity.addComponent(new ecs.Components.Position(point.x, point.y))
    entity.addComponent(new ecs.Components.Tile());
    ecs.entities[entity.id] = entity;
}

export function spawnSpike(ecs, point) {
    const entity = new ecs.Entity();
    entity.addComponent(new ecs.Components.Collision());
    entity.addComponent(new ecs.Components.Appearance(ecs.resources.images.getAsset('spike'), {width: 120, height: 120}));
    entity.addComponent(new ecs.Components.Position(point.x, point.y))
    entity.addComponent(new ecs.Components.Tile());
    ecs.entities[entity.id] = entity;
}