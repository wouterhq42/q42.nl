function codeteller() {

  var $counter = $('#regels-code');
  codeCounter(42);


  function codeCounter(numQers) {
    var Qers = [], to;
    for (var i = 0; i < numQers; i++) Qers.push(new Qer());

    (function cycle() {
      clearTimeout(to);
      var lines = 0;
      var now = new Date();
      for (var i = 0; i < numQers; i++) lines += Qers[i].linesWritten(now);
      lines = Math.round(lines);
      $counter.html(Math.max(lines, 0))
      to = setTimeout(cycle, 1000);
    })();
  };

  function Qer() {
    var codeLinesPerDay = 100 + 200 * Math.random(); //100-600
    var hoursWorkPerDay = 6 + 2 * Math.random(); //6-8

    var startsAt = new Date();
    startsAt.setHours(Math.round(8 + 3 * Math.random())); //7AM - 10AM
    startsAt.setMinutes(Math.round(60 * Math.random()));

    var workLength = new Date(0);
    workLength.setHours(Math.round(hoursWorkPerDay));

    this.linesWritten = function (date) {
      var linesWritten = 0;
      var timeWorked = new Date(date.getTime() - startsAt.getTime());
      var perc = Math.min(1, timeWorked.getTime() / workLength.getTime());
      return codeLinesPerDay * perc;
    }
  };

}