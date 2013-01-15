var Employees = new Meteor.Collection("Employees");
Employees.allow({
	insert: function () {
		return false;
	}
});

Employees.insert({
	name: "Martijn Laarman",
	shortName: "martijnl",
	githubHandle: "Mpdreamz"
});	


Meteor.publish("employees", function () {
	return Employees.find(); 
});

//How do i get to this on the client?
//var e = new Meteor.Collection("Employees"); e.count() works,
//but i can only instantiate this collection once or i get this:
//
//Error: There is already a collection named 'Employees'
//
//var e = new Meteor.Collection("employees");
//does not work even though that is the name i am publishing it under.
//
