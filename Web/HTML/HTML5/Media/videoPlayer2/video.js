//简单视频播放器
function VideoPlayer(options){
    /* 设置为this是为什么: self作为新实例 */
    let self = this;
    self.element = options.element;
    console.log(options);
    console.log(this);
    
    //options
    /* options.playClass 为了什么 */
    self.playClass = options.playClass || "pause";

    //derived
    self.video = self.element.querySelector(".video");
    self.juice = self.element.querySelector(".orange-juice");
    self.playToggleButton = self.element.querySelector("#play-toggle");

    //状态改变时, 改变self.playClass
    self.video.addEventListener("play", ()=>{
        self.playClass = "play";
    });

    self.video.addEventListener("pause", ()=>{
        self.playClass = "pause";
    });

    self.video.addEventListener("ended", ()=> {
        self.playToggleButton.className = "play";
    });

    //将self.playClass作为sign
    self.playToggleButton.addEventListener("click", ()=>{
        self.playToggleButton.className = self.playClass;
        self.togglePlayPause();
    });

    self.video.addEventListener("timeupdate", ()=>{
        self.juice.style.width = self.showProgress(self.juice.style.width);
    });

}

VideoPlayer.prototype.togglePlayPause = function() {
    if(this.video.paused){
        this.video.play()
    }else{
        this.video.pause();
    }
}

VideoPlayer.prototype.showProgress = function(width) {
    let juicePos = this.video.currentTime / this.video.duration;
    width = juicePos * 100 + "%";
    return width;
};