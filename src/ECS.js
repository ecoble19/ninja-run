import ResourceManager from "./resources";

function loadAssets(cb) {
    ResourceManager.assets.queueDownload('bg','../assets/hills/layer-1.png');
    ResourceManager.assets.queueDownload('tile','../assets/hills/tile2.png');
    ResourceManager.assets.queueDownload('ninjaRun','../assets/ninja/run3.png');
    ResourceManager.assets.queueDownload('spike','../assets/obstacles/spike D.png');
    ResourceManager.assets.queueDownload('coin','../assets/coins/coin48.png');
    ResourceManager.assets.downloadAll(cb);
}

loadAssets(() => {})

const ECS = {
    $canvas: document.getElementById('canvas'),
    context: document.getElementById('canvas').getContext("2d"),
    $output: document.getElementById('output'),
    resources: ResourceManager,
    entities: {},
    systems: {}
};

ECS.Components = {};

ECS.Entity = function Entity(){
    // Generate a pseudo random ID
    this.id = (+new Date()).toString(16) +
        (Math.random() * 100000000 | 0).toString(16) +
        ECS.Entity.prototype._count;

    // increment counter
    ECS.Entity.prototype._count++;

    // The component data will live in this object
    this.components = {};

    return this;
};
// keep track of entities created
ECS.Entity.prototype._count = 0;

ECS.Entity.prototype.addComponent = function addComponent (component){
    this.components[component.name] = component;
    return this;
};
ECS.Entity.prototype.removeComponent = function removeComponent ( componentName ){
    let name = componentName;

    if(typeof componentName === 'function'){
        name = componentName.prototype.name;
    }

    // Remove component data by removing the reference to it
    delete this.components[name];
    return this;
};

ECS.Entity.prototype.print = function print () {
    // Function to print / log information about the entity
    console.log(JSON.stringify(this, null, 4));
    return this;
};


export default ECS;