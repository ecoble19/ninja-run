import ECS from "./ECS";

ECS.Components.Player = function ComponentPlayer(score, money) {
    this.score = score || 0;
    this.money = money || 0;
    this.jumping = false;
    return this;
};
ECS.Components.Player.prototype.name = 'player';

ECS.Components.Gravity = function ComponentGravity(grounded = true) {
    this.grounded = grounded;
    this.timeStamp = null;
    return this;
};
ECS.Components.Gravity.prototype.name = 'gravity';

ECS.Components.Tile = function ComponentTile() {
    return this;
};
ECS.Components.Tile.prototype.name = 'tile';


ECS.Components.Trap = function ComponentTrap() {
    return this;
};
ECS.Components.Trap.prototype.name = 'trap';

ECS.Components.Position = function ComponentPosition(x,y) {
    this.x = x;
    this.y = y;
    return this;
};

ECS.Components.Position.prototype.name = 'position';

ECS.Components.Velocity = function ComponentVelocity(x,y) {
    this.vx = x;
    this.vy = y;
    return this;
};

ECS.Components.Velocity.prototype.name = 'velocity';

ECS.Components.Collision = function ComponentCollision() {
    this.collides = true;
    return this;
};
ECS.Components.Collision.prototype.name = 'collision';

ECS.Components.Money = function ComponentMoney(value) {
    this.value = value || 100;
    return this;
};
ECS.Components.Money.prototype.name = 'money';

ECS.Components.Animation = function ComponentAnimation(frames, animationsPerSecond, repeat = true) {
    this.frames = frames;
    this.animationsPerSecond = animationsPerSecond;
    this.start = performance.now();
    this.next = function() {
        let interval = 1000 / this.animationsPerSecond;
        let currentFrame = Math.floor((performance.now() - this.start) / interval);
        if(!repeat && currentFrame >= (this.frames.length - 1)) {
            console.log('NOT REPEATING')
            return frames.length - 1;
        }
        return currentFrame % this.frames;
    }
    return this;
}

ECS.Components.Animation.prototype.name = 'animation';

ECS.Components.Appearance = function ComponentAppearance(asset, size) {
    this.asset = asset;
    this.size = size;
    return this;
};
ECS.Components.Appearance.prototype.name = 'appearance';

ECS.Components.Background = function ComponentBackground() {
    return this;
};
ECS.Components.Background.prototype.name = 'background';