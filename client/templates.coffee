$Template

  home:
    num_employees: -> Employees.find().count()

  error404:
    isEnglish: -> Session.equals("lang", "en")
    url: -> document.location.pathname
  nl_error404:
    url: -> document.location.pathname

  numQers:
    numQers: -> Employees.find().count()

  koppenKoffie:
    koppenKoffie: -> CoffeeCounter.findOne()?.count or 0

  header:
    lightsColor: -> Session.get("lightsColor")
    supportsInputTypeColor: -> Session.equals("supportsInputTypeColor", yes)
    color: -> Lights.find({}, {sort: {date: 1}})
    col1: -> @hex
    col2: ->
      num = parseInt(@hex, 16)
      r = num >> 16
      g = num & 0x0000ff
      b = (num >> 8) & 0x00ff

      r1 = r * .5
      g1 = g
      b1 = b * .3

      String("000000" + (g1 | (b1 << 8) | (r1 << 16)).toString(16)).slice(-6)

  regelsCode:
    regelsCode: ->
      numQers = Employees.find().count()
      counter = 0
      to = null

      class Qer
        constructor: ->
          @codeLinesPerDay = 100 + 200 * Math.random() # 100-600
          @hoursWorkPerDay = 6 + 2 * Math.random() # 6-8

          @startsAt = new Date()
          @startsAt.setHours Math.round(8 + 3 * Math.random()) # 7AM - 10AM
          @startsAt.setMinutes Math.round(60 * Math.random())

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

  io:
    employee: -> Employees.find {handle: $in: "kars stef taco lukas guus".split(" ")}, sort: handle: 1