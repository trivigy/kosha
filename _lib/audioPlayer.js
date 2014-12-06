if(window.jQuery) {
	jQuery.fn.audioPlayer = function (options) {
		if (this.length <= 1) {
			if (arguments.length > 0) {
				this[0].audioPlayer = new AudioPlayer(this[0], options);
			}
			else {
				return this[0].audioPlayer;
			}
			
		}
	}
}

function AudioPlayer(obj, options) {	
	var defaults = {
		fx: null,
		repeat: false,
		shuffle: false,
		start: 1,
		width: 50,
		height: 30,
		color: [0, 0, 0],
	}
	
	// Setting global variables.
	this.isPlaying = false;
	this.currentSong = 0;
	this.tag = obj;
	
	// Creating the options object.
	this.options = {}
    for (var index in defaults) {
		this.options[index] = defaults[index];
	}
    for (var index in options) {
		this.options[index] = options[index];
	}
	
	// Creating and appending the appropriate tags.
	this.audio = new Audio();
	if (this.options.start <= this.options.playlist.length) {
		this.audio.src = this.options.playlist[this.options.start - 1].src;
		this.currentSong = this.options.start;
	}
	this.audio.addEventListener('ended', this.next.bind(this), false);
	
	if (this.tag !== undefined || this.tag !== null) {
		this.tag.appendChild(this.audio);
		if (this.options.fx !== null) {
			this.visualizer = new AudioVisualizer(this.tag, this.options);
		}
	}
	
	if (document.readyState !== "complete") {
		window.addEventListener('load', this.onload.bind(this), false);
	}
	else {
		this.onload();
	}
};

AudioPlayer.prototype.onload = function () {
	// Create the audio nodes.
	this.source = context.createMediaElementSource(this.audio);
	this.gainNode = context.createGain();
	this.source.connect(this.gainNode);
	
	if (this.options.fx != null) {
		this.analyser = context.createAnalyser();
		this.gainNode.connect(this.analyser);
		this.analyser.connect(context.destination);
	}
	else {
		this.gainNode.connect(context.destination);
	}
}

AudioPlayer.prototype.volume = function (value) {
	var fraction = value / 100;
	this.gainNode.gain.value = fraction * fraction;
}

AudioPlayer.prototype.play = function () {
  this.audio.play();
  this.isPlaying = true;
  requestAnimationFrame(this.visualizer.draw.bind(this));
}

AudioPlayer.prototype.pause = function () {
  this.audio.pause();
  this.isPlaying = false;
}

AudioPlayer.prototype.next = function () {
	this.isPlaying = false;
	if (this.options.repeat == true) {
		this.play();
	}
	else if (this.options.shuffle == true) {
		var randSong = Math.floor(Math.random() * this.options.playlist.length);
		this.audio.src = this.options.playlist[randSong].src;
		this.currentSong = randSong + 1;
		this.play();
	}
	else if (this.options.playlist.length > 1) {
		if ((this.currentSong + 1) > this.options.playlist.length) {
			this.currentSong = 1;
		}
		else {
			this.currentSong += 1;
		}
		
		this.audio.src = this.options.playlist[this.currentSong - 1].src;
		this.play();
	}
}

function AudioVisualizer(obj, options) {	
	switch (options.fx) {
		case "bars":
			// Create css rules.
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = ".bar {float: left;} .box {height: 6px; width: 6px; margin: 1px;} .show {opacity: 1; transition: opacity 0.1s ease-in; -ms-transition: opacity 0.1s ease-in; -moz-transition: opacity 0.1s ease-in; -webkit-transition: opacity 0.1s ease-in;} .hide {opacity: 0; transition: opacity 0.1s ease-in; -ms-transition: opacity 0.1s ease-in; -moz-transition: opacity 0.1s ease-in; -webkit-transition: opacity 0.1s ease-in;}";
			document.getElementsByTagName('head')[0].appendChild(style);
			
			// Create the html elements.
			for (var i = 1; i <= options.width; i++) {
				var bar = document.createElement("div");
				bar.classList.add("bar");
				for (var j = options.height; j > 0; j--) {
					var box = document.createElement("div")
					box.classList.add("box");
					box.classList.add("show");
					box.setAttribute("style", "background-color: rgba(" + options.color[0] + "," + options.color[1]+ "," + options.color[2] + "," + options.color[3] + ")");
					bar.appendChild(box);
				}
				obj.appendChild(bar);
			}
			break;
		case "waves":
			// this.fx = new AudioVisualizerWaves(obj, options);
			break;
	}
}

AudioVisualizer.prototype.draw = function () {
	if (this.isPlaying == true) {
		switch (this.options.fx) {
			case "bars":
				var freqs = new Uint8Array(this.analyser.frequencyBinCount);
				this.analyser.getByteFrequencyData(freqs);
				var step = Math.floor((freqs.length / this.options.width) * 0.7);
				var i = 0;
				var j = 0;
				while (i < this.options.width) {
					// Figuring out how many boxes need to be set to hide.
					var hideCount = this.options.height - Math.floor((freqs[j] / 256) * this.options.height);
					var bars = this.tag.getElementsByClassName("bar");
					var boxes = bars[i].childNodes;
					
					var k = 0;
					while (k < hideCount) {
						boxes.item(k).classList.remove("show");
						boxes.item(k).classList.add("hide");
						k++;
					}
					while (k < boxes.length) {
						boxes.item(k).classList.remove("hide");
						boxes.item(k).classList.add("show");
						k++;
					}
					
					j += step;
					i++;
				}
				break;
			case "waves":
				// this.fx = new AudioVisualizerWaves(obj, options);
				break;
		}
		requestAnimationFrame(this.visualizer.draw.bind(this));
	}
}

AudioVisualizer.prototype.setValue = function () {
	switch (this.options.fx) {
		case "bars":
			if ((typeof index !== "undefined") && (typeof value !== "undefined")) {
				
			}
			break;
		case "waves":
			// this.fx = new AudioVisualizerWaves(obj, options);
			break;
	}
}

//Overhead variable and assignments that to be make at module load time.
var context;
try {
	// Start off by initializing a new context.
	context = new (window.AudioContext || window.webkitAudioContext)();
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
}
catch(e) {
alert("Error" + e + "\nWeb Audio API is not supported in this browser");
}