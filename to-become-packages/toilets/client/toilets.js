Template.toilets.helpers({
  getState: function() {
    if ( Session.equals("lang", "nl") ){
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
