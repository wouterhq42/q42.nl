import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'

import { WhatsPlaying } from '../lib/collections'

// should become https://sonos.q42.net or something
const keukenStateServerUrl = "http://localhost:5005/keuken/state";

Meteor.publish("whatsplaying", function() {
  return WhatsPlaying.find();
});

Meteor.startup(() => {
  Meteor.setInterval(function() {
    const res = HTTP.get(keukenStateServerUrl);
    if (res && res.data.playerState === "PLAYING") {
      let currentTrack = res.data.currentTrack;
      currentTrack = _.pick(currentTrack, "artist", "title");
      currentTrack.roomName = "keuken070";
      WhatsPlaying.upsert({roomName: "keuken070"}, currentTrack);
    } else {
      WhatsPlaying.remove({roomName: "keuken070"});
    }
  }, 20000);
});
