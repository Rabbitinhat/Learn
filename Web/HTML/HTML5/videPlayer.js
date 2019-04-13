function VideoPlayer(options){
    let self = this;
    console.log(options);
    console.log(this);
    //options
    //? .element
    self.element = options.element;
    self.playClass = options.playClass || "play";
    self.muteClass = options.muteClass || "mute";

    //Derived
    //保存video element
    self.video = self.element.querySelector("video");
    //保存button element
    self.playToggleButton = self.element.querySelector(".play-toggle");
    self.muteToggleButton = self.element.querySelector(".mute-toggle");
    self.loopToggleButton = self.element.querySelector(".loop-toggle");
    //handle play
    self.video.addEventListener("play", function(){
        //? 是否添加到option.className中? 何作用
        //? classList
        self.element.classList.add(self.playClass);
    });

    //handle pause
    self.video.addEventListener("pause", function(){
        self.element.classList.remove(self.playClass);
    });

    //handle mute
    self.video.addEventListener("volumechange", function(){
        //? self.elemement.classList & self.classList 区别
        if(self.video.muted) self.element.classList.add(self.muteClass);
        else self.element.classList.remove(self.muteClass);
    });

    //Enable play toggle button
    self.playToggleButton.addEventListener("click", function(){
        self.togglePlay();
    });
    //Enable play mute button
    self.muteToggleButton.addEventListener("click", function(){
        self.toggleMute();
    });

    self.loopToggleButton.addEventListener("click", function(){
        self.toggleLoop();
    })
}

// Toggles video play/pause
VideoPlayer.prototype.togglePlay = function(){
    if(this.video.paused) this.video.play();
    else this.video.pause();
};

VideoPlayer.prototype.toggleMute = function(){
    /* if(this.video.muted) this.video.muted = "false";
    else this.video.muted = "true"; */
    this.video.muted = !this.video.muted;
}

// Toggles video play loop
VideoPlayer.prototype.toggleLoop = function(){
    this.video.loop = !this.video.loop;
}