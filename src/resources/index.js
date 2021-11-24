function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.downloadQueue = [];
    this.cache = {};
}

AssetManager.prototype.queueDownload = function(key, path) {
    this.downloadQueue.push({key, path});
}

AssetManager.prototype.downloadAll = function(downloadCallback) {
    if (this.downloadQueue.length === 0) {
        downloadCallback();
    }
    for (let i = 0; i < this.downloadQueue.length; i++) {
        let {key, path} = this.downloadQueue[i];
        let img = new Image();
        let that = this;
        img.addEventListener("load", function() {
            that.successCount += 1;
            if (that.isDone()) {
                downloadCallback();
            }
        }, false);
        img.addEventListener("error", function() {
            that.errorCount += 1;
            if (that.isDone()) {
                downloadCallback();
            }
        }, false);
        img.src = path;
        this.cache[key] = img;
    }
}

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length == this.successCount + this.errorCount);
}

AssetManager.prototype.getAsset = function(key) {
    return this.cache[key];
}

const Resources = {assets: new AssetManager()};

export default Resources;