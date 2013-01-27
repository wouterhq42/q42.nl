Meteor.autosubscribe(function() {
	Meteor.subscribe("employees");
	
});
Template.employees.employee = function () {
	return Employees.find({});
}
Handlebars.registerHelper('avatar_static', function() {
	return this.imageStatic || this.handle + "zw.jpg";
});
Handlebars.registerHelper('avatar_animated', function() {
	return this.imageAnimated || this.handle + "gif.gif";
});

Handlebars.registerHelper('firstname', function() {
	if (!this.name)
		return "droid";
	return this.name.split(" ")[0];
});
Handlebars.registerHelper('email', function() {
	return this.email || this.handle;
});


var EmployeeGallery = (function () {
	function swapGif() {
		var $color = $(this).find(".color");
		var animatedGif = $color.data("src");
		var colorSrc = $color.attr("src");
		if (animatedGif != colorSrc)
			$color.attr("src", animatedGif);
	}
	function rotatePolaroid() {
		var randomRotation = Math.floor(Math.random() * 21) - 10;
		var polaroid = $(this);
		polaroid.css('-webkit-transform', 'scale(1.0) rotate(' + randomRotation + 'deg)');
		polaroid.css('-webkit-transform', 'scale(1.0) rotate(' + randomRotation + 'deg)');
	}

	function init() {
		$('#colleagues .polaroid').live('mouseenter', _.compose(swapGif, rotatePolaroid));
	};

	init();
})();

