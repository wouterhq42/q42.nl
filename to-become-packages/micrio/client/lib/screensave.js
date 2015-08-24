function Screensaver(container,images,speed) {
	this.images = images;
	this.container = container;
	this.instances = new Array(images.length);
	this.currentIndex = -1;
	this.speed = speed || 30000;

	this.checkScroll = this.checkScroll.bind(this);

	// Internals
	this.firstOneLoaded = false;
	this.aniStartedAt = null;
	this._nextTo = null;
}

Screensaver.prototype = {
	goto: function(index) {
		index = index % this.images.length;

		if(this.currentIndex == index) return;

		var previous = this.instances[this.currentIndex];
		var current = null;
		var that = this;
		this.currentIndex = index;

		clearInterval(this.checkScrollInt);
		this.checkScrollInt = setInterval(this.checkScroll,1000);

		(current = this.instances[index] || (this.instances[index] = new Micrio({
				id: this.images[index].id,
				width: this.images[index].width,
				height: this.images[index].height,
				container: this.container,
				autoInit: false,
				hookEvents: false,
				initType: 'cover'
			}))).show().then(function(e){
				var isFirst = !this.firstOneLoaded;

				if(that.firstOneLoaded)
					that.container.classList.add('loaded');
				that.firstOneLoaded = true;

				if(previous) {
					previous.el.classList.remove('shown');
					setTimeout(previous.hide.bind(previous),3000);
				}
				current.camera.reset();
				current.el.classList.add('shown');
				current.camera.easeTo(
					0.4 + Math.random() * 0.2,
					0.4 + Math.random() * 0.2,
					1,
					that.speed,
					undefined,
					isFirst && Beziers.easeIn
				);

				that.aniStartedAt = performance.now();
				clearTimeout(that._nextTo);
				that._nextTo = setTimeout(function(){
				  if(!that.paused) that.next();
				},that.speed-5000);
			});

			if(!this.firstOneLoaded)
				this.setBackground();
			else this.clearBackground();
	},

	next: function(){
		this.goto(this.currentIndex + 1);
	},

	prev: function(){
		this.goto(this.currentIndex - 1);
	},

	pause: function(){
	  if(this.currentIndex < 0 || this.paused) return;
	  this.paused = true;
	  clearTimeout(this._nextTo);
	  this.instances[this.currentIndex].camera.pause();
	  this.pausedAfter = performance.now() - this.aniStartedAt;
	},

	resume: function(){
	  if(!this.paused) return;
	  this.paused = false;
	  this.instances[this.currentIndex].camera.resume();
	  this.aniStartedAt = performance.now();
	  clearTimeout(this._nextTo);
	  this._nextTo = setTimeout(function(){
	    this.next();
	  }.bind(this),Math.max(0, this.speed - this.pausedAfter - 5000));
	},

	setBackground: function(){
		var current = this.instances[this.currentIndex];
		current.container.style.backgroundImage = 'url('+current.thumbSrc+')';
	},

	clearBackground: function(){
		this.container.style.backgroundImage = null;
	},

	checkScroll: function(){
		if(!this.instances[this.currentIndex]) return;
		var offsetY = this.instances[this.currentIndex].camera
									.getRenderedOffset(this.container).top - 
									(window.scrollY || window.pageYOffset);
		var isInside = offsetY + this.container.offsetHeight > 0;
		if(!isInside) this.pause();
		else this.resume();
	}
};

window.Screensaver = Screensaver;
