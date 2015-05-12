Meteor.methods({
  resetServiceConfiguration: function()
  {
    ServiceConfiguration.configurations.remove({});
  }
});