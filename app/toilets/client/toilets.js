import { Template } from 'meteor/templating'
import { Utils } from '../../../lib/utils'
import { $Template } from '../../../client/lib/_template'
import { Toilets } from '../lib/shared'

Template.toilets.helpers({
  getState: function() {
    if ( Utils.getSiteVersion() === "nl" ){
      this.state = this.state === "occupied" ? "bezet" : "vrij";
    }
    return this.state;
  }
});

$Template({
  toilets: {
    toilet: () => Toilets.find()
  }
});
