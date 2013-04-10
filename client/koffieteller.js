koffieteller = function () {

  var date = new Date();
  var day = date.getDay();
  var timeZoneOffsetHours;
  var utcDateHours;
  var utcDateMinutes;
  var utcDateSeconds;
  var timeInMS;
  var seed;

  setCurrentTime();

  function setCurrentTime() {
    timeZoneOffsetHours = date.getTimezoneOffset() / 60;
    day = date.getDay();
    utcDateHours = date.getUTCHours() + (timeZoneOffsetHours * -1);
    utcDateMinutes = date.getUTCMinutes();
    utcDateMilliseconds = date.getUTCMilliseconds();
    timeInMS = (utcDateHours * 60 * 60 * 1000) + (utcDateMinutes * 60 * 1000) + utcDateMilliseconds;
    seed = parseInt(date.getUTCFullYear() + "" + date.getUTCMonth() + "" + date.getUTCDate());
  }

  /* editable vars */
  var qers = Employees.find().count();
  var averageCupsPerQer = 3;
  var variation = 20;
  var coffeeCupsMeasurePoints = { 8: 0, 10: 40, 12: 60, 14: 90, 17: 100 }; // hours, percentage
  /* end editable vars  */

  // make variation random between 0 - 20
  var mt = new MersenneTwister(seed); // to get a consistent random int for everyone on the same day

  var randomizedTotalCups = qers * averageCupsPerQer - variation + (Math.round(variation * mt.random()) * 2);
  //console.log("mt: ", randomVariation, randomizedTotalCups);
  // vrijdag was random 17 en random totaal 143

  var coffeeCounter = 0;
  var workdayFinished = false;

  //calculate cups at Measure Points
  var splitAmounts = {};
  $.each(coffeeCupsMeasurePoints, function (time, perc) {
    var ms = time * 60 * 60 * 1000;
    splitAmounts[ms] = Math.round((perc * parseInt(randomizedTotalCups)) / 100);
  });

  function calculatePreviousMP(timeInMS) {
    setCurrentTime();
    var matchingInterval = [], i = 0, matchingMPs = 0;
    for (var a in splitAmounts) {
      if (timeInMS > a) {
        matchingInterval = [i, a];
        matchingMPs++;
      }
      i++;
    }

    if (matchingMPs == i) {
      //set cups to max because the workday is over
      coffeeCounter = splitAmounts[matchingInterval[1]];
      workdayFinished = true;
    }
    if (day == 6 || day == 7 || matchingMPs == 0) {
      //reset cups when the day isn't started yet
      //reset cups on weekend days
      coffeeCounter = 0;
    }
    return matchingInterval;
  }

  function calculateIntervalSpeed(prevMP) {
    var intervalSpeeds = [], previousTime, i = 0;
    for (var s in splitAmounts) {
      if (previousTime == null) {
        previousTime = s;
      }
      else {
        var msPerCup = Math.round((s - previousTime) / (splitAmounts[s] - splitAmounts[previousTime]));
        intervalSpeeds[i] = msPerCup;
        previousTime = s;
        i++;
      }
    }
    return intervalSpeeds[prevMP[0]]
  }

  var previousInterval = calculatePreviousMP(timeInMS);
  fireCounter(previousInterval);

  function fireCounter(previousInterval) {
    if (previousInterval.length != 0 && !workdayFinished) {
      var intervalSpeed = calculateIntervalSpeed(previousInterval);
      var startAmountCups = splitAmounts[previousInterval[1]];
      var msPassedMP = timeInMS - previousInterval[1];
      var cupsInCurrentInterval = Math.round(msPassedMP / intervalSpeed);
      var cupsAtCurrentTime = startAmountCups + cupsInCurrentInterval;

      //write number of cups to screen
      coffeeCounter = cupsAtCurrentTime;

      // start cupsUpdater
      setTimeout(function () { updateCups(coffeeCounter) }, intervalSpeed);
    } else {
      // there is no previous MP. That's because it's early dude! Retry in 1 minutos
      setTimeout(function () {
        fireCounter(previousInterval);
      }, 60000);
    }

    function updateCups(counter) {
      //repeat this function with the intervalspeed
      counter = counter + 1;
      previousInterval = calculatePreviousMP(timeInMS);
      intervalSpeed = calculateIntervalSpeed(previousInterval);
      setTimeout(function () { updateCups(counter) }, intervalSpeed);
    }
  }

  return coffeeCounter;
}