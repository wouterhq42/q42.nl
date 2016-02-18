Template.main.helpers({
    header: () => Utils.getSiteVersion() === "en" ? "en_header" : "header",
    footer: () => Utils.getSiteVersion() === "en" ? "en_footer" : "footer",
    openChat: () => Session.equals("openChat", true),
    visible: () => "visible-backgrounds",
    inverted() {
      return (FlowRouter.getRouteName() === 'home') ? 'inverted' : '';
    },
    showVideo() {
      return (FlowRouter.getRouteName() === 'home') ? 'showVideo' : '';
    }
});
