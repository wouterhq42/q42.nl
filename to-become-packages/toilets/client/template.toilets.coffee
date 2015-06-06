Template.toilets.helpers
  getState: ->
    if Session.equals "lang", "nl"
      return switch @state
        when "available" then "vrij"
        when "occupied" then "bezet"
        else "vrij"
    return @state

$Template
  toilets:
    toilet: -> Toilets.find()
