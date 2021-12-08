import {ImageManager, AudioManager} from "./resources";

function loanImages(cb) {
    ImageManager.queueDownload('bg','../assets/hills/layer-1.png');
    ImageManager.queueDownload('tile','../assets/hills/tile2.png');
    ImageManager.queueDownload('ninjaRun','../assets/ninja/run.png');
    ImageManager.queueDownload('ninjaJump','../assets/ninja/jump.png');
    ImageManager.queueDownload('ninjaDie','../assets/ninja/die.png');
    ImageManager.queueDownload('spike','../assets/obstacles/spike C.png');
    ImageManager.queueDownload('coin','../assets/coins/coin48.png');
    ImageManager.downloadAll(cb);
}

function loanAudio(cb) {
    AudioManager.queueDownload('main', '../assets/sounds/theme.ogg');
    AudioManager.queueDownload('jump', '../assets/sounds/jump.flac');
    AudioManager.queueDownload('coin','../assets/sounds/coinsplash.ogg');
    AudioManager.downloadAll(cb);
}

loanImages(() => {})
loanAudio(() => {})

const ECS = {
    $canvas: document.getElementById('canvas'),
    context: document.getElementById('canvas').getContext("2d"),
    $output: document.getElementById('output'),
    resources: {
        images: ImageManager,
        audio: AudioManager,
    },
    entities: {},
    systems: {},
    query: (component) => Object.entries(ECS.entities).filter(([key, v]) => Object.entries(v.components).find(([key, c]) => key === component)).map(x => x[1])
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