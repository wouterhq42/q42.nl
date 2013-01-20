Meteor.autosubscribe(function() {
	Meteor.subscribe("employees");
});
Template.employees.employee = function () {
	return Employees.find({});
}
Handlebars.registerHelper('avatar_static', function() {
	return this.image || this.handle + "zw.jpg";
});
Handlebars.registerHelper('avatar_animated', function() {
	return this.image || this.handle + "gif.gif";
});
