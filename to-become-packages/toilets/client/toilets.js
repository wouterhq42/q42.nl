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
