import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Utils } from '../lib/utils'

Template.main.helpers({
  header: () => Utils.getSiteVersion() === "en" ? "en_header" : "header",
  footer: () => Utils.getSiteVersion() === "en" ? "en_footer" : "footer",
  openChat: () => Session.equals("openChat", true),
  visible: () => "visible-backgrounds",
  inverted() {
    return (FlowRouter.getRouteName() === 'home') ? 'inverted' : '';
  }
});
