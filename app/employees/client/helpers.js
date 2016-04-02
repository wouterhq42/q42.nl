import { Template } from 'meteor/templating'

Template.registerHelper("avatar_static", function() {
  return this.imageStatic || `${this.handle}.jpg`;
});

Template.registerHelper("avatar_animated", function() {
  return this.imageAnimated || `${this.handle}.gif`;
});
