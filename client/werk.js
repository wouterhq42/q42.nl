Template.werk.helpers({
  stef: function(){
    var stef = Employees.findOne({handle:"stef"});
    console.log(stef);
    return stef;
  }
});
