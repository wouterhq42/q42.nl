// Template.hero.onRendered(function() {
//   const client = new WebSocket('ws://floating-everglades-9343.herokuapp.com/');
//   const canvas = document.getElementById('bgvid');
//   try {
//     new jsmpeg(client, {canvas:canvas});
//   }
//   catch (e) {}
// });

Template.hero.helpers({
  show: function() {
    return (FlowRouter.getRouteName() === "home");
  }
});
