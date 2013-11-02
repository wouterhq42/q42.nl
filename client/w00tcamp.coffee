datetime = moment().format('hh:mm:ss A MM/DD/YY')
dateTimeDep = new Deps.Dependency
getDateTime = ->
  dateTimeDep.depend()
  return datetime

setDateTime = (dt) ->
  datetime = dt
  dateTimeDep.changed()

Meteor.setInterval ->
  setDateTime moment().format('hh:mm:ss A MM/DD/YY')
, 1000

Template.w00tcamp.countdown = -> countdown()

Template.video_overlay.currentDateTime = -> getDateTime()

countdown = ->
  now = new Date()
  round1 = new Date(2013, 9, 3)
  round2 = new Date(2013, 9, 17)
  w00t = new Date(2013, 10, 8)
  if now < round1
    msg days(now, round1), "Pitchronde 1"
  else if days(now, round1) == 0
    "Vandaag is <strong>Pitchronde 1</strong>!"
  else if now < round2
    msg days(now, round2), "Pitchronde 2"
  else if days(now, round2) == 0
    "Vandaag is <strong>Pitchronde 2</strong>!"
  else if now < w00t
    msg days(now, w00t), "w00tcamp"
  else if days(now, w00t) <= -2
    "<strong>w00tcamp 2013</strong> is voorbij"
  else
    "<strong>w00tcamp</strong> vindt nu plaats"

msg = (days, name) ->
  weeks = Math.ceil(days / 7)
  if days >= 7
    "Nog <span id=ticker>" + weeks + "</span> " + ((if weeks is 1 then "week" else "weken")) + " tot <strong>" + name + "</strong>!"
  else
    "Nog <span id=ticker>" + days + "</span> " + ((if days is 1 then "dag" else "dagen")) + " tot <strong>" + name + "</strong>!"

days = (d1, d2) ->
  Math.ceil (d2 - d1) / 1000 / 60 / 60 / 24

Meteor.setTimeout ->
  $('#background-video')[0]?.play()
, 1000
