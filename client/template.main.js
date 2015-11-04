Template.main.helpers({
    header: () => Session.equals("lang", "en") ? "en_header" : "header",
    footer: () => Session.equals("lang", "en") ? "en_footer" : "footer",
    openChat: () => Session.equals("openChat", true),
    visible: () => "visible-backgrounds",
    inverted() {
      return (FlowRouter.getRouteName() === 'home') ? 'inverted' : '';
    }
});
