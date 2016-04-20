import { Template } from 'meteor/templating'
import { Utils } from '../../lib/utils'

Template.registerHelper("langEn", () => Meteor.settings.public.siteVersion === "en");
Template.registerHelper("isPhantom", () => /phantom/i.test(navigator.userAgent));
Template.registerHelper("assetsUrl", () => Utils.getStaticAssetsUrl());
