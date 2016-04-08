import { Template } from 'meteor/templating'

import { WhatsPlaying } from '../lib/collections'

Template.whatsplaying.onCreated(function() {
  this.subscribe("whatsplaying");
});

Template.whatsplaying.helpers({
  songPlaying070() {
    const whatsplaying = WhatsPlaying.findOne({roomName: "keuken070"});
    if (whatsplaying) {
      const track = whatsplaying.currentTrack;
      return `${track.artist} - ${track.title}`;
    }
  },
  songPlaying020() {
    const whatsplaying = WhatsPlaying.findOne({roomName: "keuken020"});
    if (whatsplaying) {
      const track = whatsplaying.currentTrack;
      return `${track.artist} - ${track.title}`;
    }
  }
});
