addLabel = (label, handles) ->
  if handles and not _.isArray handles
    handles = handles.split " "
  _.each handles, (handle) ->
    Employees.update {handle: handle}, {$addToSet: {labels: label}}

allHandles = _.pluck Employees.find().fetch(), "handle"

inserts = 0
updates = 0
_.each currentQers, (e) ->
  e.labels = []
  e.floorplan =
    q070: x: 0, y: 0
    q020bg: x: 0, y: 0
    q020boven: x: 0, y: 0

  qer = Employees.findOne handle: e.handle

  if not qer
    Employees.insert e
    inserts++
  else
    if qer.floorplan?.x
      qer.floorplan = e.floorplan
    else if qer.floorplan
      e.floorplan = qer.floorplan

    Employees.update {handle: e.handle}, e
    updates++

# Roles
addLabel "Projectleider",                 "jasper korjan timd gerard laurens meindert taco silvy"
addLabel "Software Engineer",             _.without allHandles, "stef", "cynthia", "suzanne", "corina", "silvy" ,"ineke"
addLabel "Interaction Engineer",          "rahul elaine johan roelfjan frank guido richard"
addLabel "Q'er",                          allHandles
addLabel "Oprichter",                     "kars"
addLabel "Student",                       "herman tomas jimmy"
addLabel "Ex-stagiair",                   "jeroen lukas chris bob katja timl tims kamil"
addLabel "Ex-klant",                      "gerard stef taco"
addLabel "Ex-concullega",                 "arjen sander bas guido jaap jasper jasperh johan roelfjan marcel mark mathijs michiel stef timd taco wouter corina silvy"
addLabel "Ex-ex-q'er",                    "sjoerd laurens suzanne"
addLabel "Ex-Fabriquer",                  "sander"
addLabel "Mr. Sarien.net",                "martin"

# Arbitrary selections
addLabel "Speelt nog World of Warcraft",  "rahul christiaan richard markj benjamin tims"
addLabel "Weet wat Spiffy is",            "bob timl martin remco lukas sjoerd kars laurens" # LOL!
addLabel "Team Wintersport",              "lukas bob chris mark jeroen katja stef roelfjan sjoerd meindert jaapm kars timd guido arjen"
addLabel "Heeft een baard",               "rahul richard arian christiaan kamil jasperh marcel"
addLabel "Stokoud",                       "stef johan"
addLabel "Broers",                        "tom rob"
addLabel "Tatoeage",                      "chris jeroen jasperh elaine marcel tomas"
addLabel "Voortgeplant",                  "martin chris mark kars bas cynthia gerard jaap jasper johan korjan michiel remco sander stef suzanne timd laurens taco bart"
addLabel "Rijdt soms op een motor",       "stef jeroen arian tom lukas bob jasperh chris"
addLabel "Gaat binnenkort naar Microsoft","michiel"
addLabel "Vroeger stewardess geweest",    "cynthia"
addLabel "Verdient minder dan Jasper",    _.without allHandles, "jasper"
addLabel "Google IO alumni",              "kars rahul martin jaap mark remco kamil christiaan chris arian guus stef lukas taco wouter"
addLabel "WWDC kaartje kwijtgeraakt",     "tims"
addLabel "Heeft Max Raabe live gezien",   "kars martin laurens bob lukas"
addLabel "Schoenmaat 42",                 "rahul chris arian guus christiaan mark"
addLabel "IQ boven de 200",               "sjoerd"
addLabel "Blessure tijdens werktijd",     "rahul guus"
addLabel "Nerfgun owner",                 "mark chris arian jeroen frank guus kars benjamin"
addLabel "Kan stiekem best programmeren", "chris"
addLabel "Namespace collision",           "jaap jaapm jasper jasperh mark markj timl tims timd leonard gerard"
addLabel "Emigrant",                      "rahul"
addLabel "Girl Code",                     "ineke katja"
addLabel "Gewerkt met de Two Guys",       "martin rahul richard"

Employees.allow
  insert: -> false

# Delete employees whose handles are no longer there
employeeCountBefore = Employees.find().count()
Employees.remove handle: $nin: _.map currentQers, (e) -> e.handle

employeeCountAfter = Employees.find().count()
deletes = Math.max 0, employeeCountBefore - employeeCountAfter

console.log "Employee update complete. Inserts: #{inserts}. Updates: #{updates}. Deletes: #{deletes}"

Meteor.startup ->
  EmployeeCount.update EmployeeCount.findOne()?._id, {$set: count: employeeCountAfter}, upsert: yes

Meteor.publish "employees", -> Employees.find({}, sort: name: 1)
Meteor.publish "employeeCount", -> EmployeeCount.find()

Meteor.methods
  updatePosition: (id, x, y, loc) ->
    # used by floorplan.meteor.com app
    obj = {}
    obj["floorplan.#{loc}.x"] = x
    obj["floorplan.#{loc}.y"] = y
    Employees.update id, $set: obj
