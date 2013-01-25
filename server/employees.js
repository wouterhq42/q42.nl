var _kickAssQ42Folk = [
 { name: "Alexander Overvoorde", handle:"alexander", image: "anonymous.jpg"},
 { name: "Arian van Gend", handle:"arian"},
 { name: "Bas Warmerdam", handle:"bas"},
 { name: "Benjamin de Jager", handle:"benjamin"},
 { name: "Bob van Oorschot", handle:"bob"},
 { name: "Chris Waalberg", handle:"chris"},
 { name: "Christiaan Hees", handle:"christiaan"},
 //{ name: "Cihan Duruer", handle:"cihan"},
 { name: "Coen Bijpost", handle:"coen"},
 { name: "Cynthia Wijntje", handle:"cynthia"},
 { name: "Elaine Oliver", handle:"elaine"},
 { name: "Frank Raterink", handle:"frank"},
 { name: "Herman Banken", handle:"herman"},
 { name: "Ivo de Kler", handle:"ivo"},
 { name: "Jaap Taal", handle:"jaap"},
 { name: "Jan Willem Maneschijn", handle:"janwillem"},
 { name: "Jasper Kaizer", handle:"jasper"},
 { name: "Jelle Visser", handle:"jelle"},
 { name: "Jeroen Gijsman", handle:"jeroen"},
 { name: "Johan Huijkman", handle:"johan"},
 { name: "Kamil Afsar", handle:"kamil"},
 { name: "Kars Veling", handle:"kars"},
 { name: "Katja Hollaar", handle:"katja"},
 { name: "Korjan van Wieringen", handle:"korjan"},
 { name: "Leonard Punt", handle:"leonard"},
 { name: "Lukas van Driel", handle:"lukas"},
 { name: "Marcel Duin", handle:"marcel"},
 { name: "Mark van Straten", handle:"mark"},
 { name: "Martijn Laarman", handle:"martijnl"},
 { name: "Martijn van Steenbergen", handle:"martijn"},
 { name: "Martin Kool", handle:"martin"},
 { name: "Michiel Post", handle:"michiel"},
 { name: "Paul Visschers", handle:"paul"},
 { name: "Rahul Choudhury", handle:"rahul"},
 { name: "Remco Veldkamp", handle:"remco"},
 { name: "Richard Lems", handle:"richard"},
 { name: "Roelf-Jan de Vries", handle:"roelfjan"},
 { name: "Sander de Vos", handle:"sander"},
// { name: "Sanjay Sheombar", handle:"sanjay"},
 { name: "Sjoerd Visscher", handle:"sjoerd"},
 { name: "Stef Brooijmans", handle:"stef"},
 { name: "Suzanne Waalberg", handle:"suzanne"},
 { name: "Tim Logtenberg", handle:"timl"},
 { name: "Tim van Deursen", handle:"timd"},
 { name: "Tim van Steenis", handle:"tims"},
 { name: "Thijs van der Meulen", handle:"thijs"},
 { name: "Tom Lokhorst", handle:"tom"},
 { name: "Wilbert Mekenkamp", handle:"wilbert"}
];

//Get an ACL going on, clients should not get to insert q folk.
Employees.allow({
	insert: function () {
		return false;
	}
});

//minimongo has no support for mongodb's upserts :(
console.log("trying to insert q42 peeps");
var inserts = 0, updates = 0;
_.each(_kickAssQ42Folk, function(e) {
	var count = Employees.find({handle: e.handle}).count()
	if (count === 0) {
		Employees.insert(e);
		inserts++;
	}
	else {
		Employees.update({handle: e.handle}, e, {set: e });
		updates++;
	}
});
console.log("Inserted " + inserts + " and updated " + updates + " q peeps");

var employeeHandles = _.map(_kickAssQ42Folk, function(e) { return e.handle;  });

//Delete employees whos handles are no longer there:
var employeeCountBefore = Employees.find({}).count();
Employees.remove({ handle: { $nin: employeeHandles } });

var employeeCountAfter = Employees.find({}).count();
console.log("Deleted " + Math.max(0, employeeCountBefore - employeeCountAfter) + " q peeps");

Meteor.publish("employees", function () {
	return Employees.find({}, { sort : { handle: 1 } }); 
});

Meteor.publish("employeeHandles", function () {
	return employeeHandles;
});
//client 

//var x = new Meteor.Collection("Employees")
//undefined
//Meteor.subscribe("employees");
//Object
//var c = x.find({})
//undefined
//c.count()
//45
