function AudioManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.downloadQueue = [];
    this.cache = {};
}

AudioManager.prototype.queueDownload = function(key, path) {
    this.downloadQueue.push({key, path});
}

AudioManager.prototype.downloadAll = function(downloadCallback) {
    if (this.downloadQueue.length === 0) {
        downloadCallback();
    }
    for (let i = 0; i < this.downloadQueue.length; i++) {
        let {key, path} = this.downloadQueue[i];
        let audio = new Audio(path);
        let that = this;
        audio.addEventListener("load", function() {
            that.successCount += 1;
            if (that.isDone()) {
                downloadCallback();
            }
        }, false);
        audio.addEventListener("error", function() {
            that.errorCount += 1;
            if (that.isDone()) {
                downloadCallback();
            }
        }, false);

        //audio.load();
        this.cache[key] = audio;
    }
}

AudioManager.prototype.isDone = function() {
    return (this.downloadQueue.length === this.successCount + this.errorCount);
}

AudioManager.prototype.getAsset = function(key) {
    return this.cache[key];
}

AudioManager.prototype.mute = function() {
    this.cache.map(x => x.muted = true);
}

AudioManager.prototype.unMute = function() {
    this.cache.map(x => x.muted = false);
}

const Resources = new AudioManager();

export default Resources;
