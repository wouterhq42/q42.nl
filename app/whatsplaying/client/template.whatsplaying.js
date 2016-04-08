import { Template } from 'meteor/templating'

import { WhatsPlaying } from '../lib/collections'

Template.whatsplaying.onCreated(function() {
  this.subscribe("whatsplaying");
});

Template.whatsplaying.helpers({
  songPlaying070() {
    const track = WhatsPlaying.findOne({roomName: "keuken070"});
    if (track) {
      return `${track.artist} - ${track.title}`;
    }
  },
  songPlaying020() {
    const track = WhatsPlaying.findOne({roomName: "keuken020"});
    if (track) {
      return `${track.artist} - ${track.title}`;
    }
  }
});
