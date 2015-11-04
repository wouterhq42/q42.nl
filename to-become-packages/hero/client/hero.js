Template.hero.onRendered(function() {
  let client = new WebSocket('ws://floating-everglades-9343.herokuapp.com/');
  let canvas = document.getElementById('bgvid');
  let player = new jsmpeg(client, {canvas:canvas});
});

Template.hero.helpers({
  show: function() {
    return (FlowRouter.getRouteName() === "home");
  }
})
