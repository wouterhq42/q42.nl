import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'

import { WhatsPlaying } from '../lib/collections'

// should become https://sonos.q42.net or something
const keukenStateServerUrl = "http://localhost:5005/keuken/state";

Meteor.publish("whatsplaying", function() {
  return WhatsPlaying.find();
});

Meteor.startup(() => {
  Meteor.setInterval(() => {
    let state = HTTP.get(keukenStateServerUrl);
    if (state) {
      state = JSON.parse(state.content);
      // state = _.pick(state, "artist", "title");
      state.roomName = "keuken070";
      WhatsPlaying.upsert({roomName: "keuken070"}, state);
    }
  }, 20000);
});
