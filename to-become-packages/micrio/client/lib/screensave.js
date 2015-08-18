Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}

function Screensaver(container,images,speed) {
	this.images = images;
	this.container = container;
	this.instances = new Array(images.length);
	this.currentIndex = -1;
	this.speed = speed || 30000;
};

Screensaver.prototype = {
	goto: function(index) {
		index = index % this.images.length;

		if(this.currentIndex == index) return;

		var previous = this.instances[this.currentIndex];
		var current = null;
		var that = this;
		this.currentIndex = index;
		(current = this.instances[index]
			|| (this.instances[index] = new Micrio({
				id: this.images[index].id,
				width: this.images[index].width,
				height: this.images[index].height,
				path: 'http://az736305.vo.msecnd.net/public/',
				container: this.container,
				autoInit: false,
				hookEvents: false,
				initType: 'cover'
			}))).show().then(function(e){
				if(previous) {
					previous.el.classList.remove('shown');
					setTimeout(previous.hide.bind(previous),3000);
				}
				current.camera.reset();
				current.el.classList.add('shown');
				current.camera.easeTo(.4+Math.random()*.2,.4+Math.random()*.2,1,that.speed);
				setTimeout(function(){
					that.next();
				},that.speed-5000);
			});
	},

	next: function(){
		this.goto(this.currentIndex+1);
	},

	prev: function(){
		this.goto(this.currentIndex-1);
	}

};

window.Screensaver = Screensaver;
