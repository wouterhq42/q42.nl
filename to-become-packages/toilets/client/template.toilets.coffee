Template.toilets.helpers
  getState: ->
    if Session.equals "lang", "nl"
      return (if @state is "available" then "vrij" else "bezet")
    return @state
