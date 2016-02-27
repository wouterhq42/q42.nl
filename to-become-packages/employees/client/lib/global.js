export let polaroidVisibility = new ReactiveDict();

Meteor.startup( () => Session.setDefault("employees_filter", "Q'er") );
