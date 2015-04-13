$Template

  home:
    num_employees: -> EmployeeCount.findOne()?.count

  numQers:
    numQers: -> Employees.find().count()

  koppenKoffie:
    koppenKoffie: -> CoffeeCounter.findOne()?.count or 0

  header:
    headerGameActive: -> Session.equals "headerGameActive", yes
    dev: -> window.location.href.indexOf("localhost") > -1

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
