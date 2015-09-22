Template.numLinesOfCode.helpers
  numLinesOfCode: ->
    numQers = Employees.find().count()
    counter = 0
    to = null

    class Qer
      constructor: ->
        @codeLinesPerDay = _.random 100, 600
        @hoursWorkPerDay = _.random 6, 8

        @startsAt = new Date()
        @startsAt.setHours _.random 8, 11
        @startsAt.setMinutes _.random 60

        @workLength = new Date(0)
        @workLength.setHours Math.round @hoursWorkPerDay

      linesWritten: (date) ->
        linesWritten = 0
        timeWorked = new Date(date.getTime() - @startsAt.getTime())
        perc = Math.min(1, timeWorked.getTime() / @workLength.getTime())
        @codeLinesPerDay * perc

    Qers = []
    _.times numQers, -> Qers.push new Qer()

    (cycle = ->
      Meteor.clearTimeout(to)
      lines = 0
      _.times numQers, (i) -> lines += Qers[i].linesWritten new Date()
      counter = Math.max Math.round(lines), 0
      to = Meteor.setTimeout cycle, 1000
    )()

    return counter
