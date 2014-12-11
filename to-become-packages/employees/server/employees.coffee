addLabel = (label, handles) ->
  if handles and not _.isArray handles
    handles = handles.split " "
  _.each handles, (handle) ->
    Employees.update {handle: handle}, {$addToSet: {labels: label}}

allHandles = _.pluck Employees.find().fetch(), "handle"

currentQers = [
  { name: "Arian van Gend", handle:"arian" }
  { name: "Arjen van der Ende", handle: "arjen" }
  { name: "Bart Kiers", handle: "bart", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg"}
  { name: "Bas Warmerdam", handle:"bas", phone: "070-4452364" }
  { name: "Benjamin de Jager", handle:"benjamin" }
  { name: "Bob van Oorschot", handle:"bob", phone: "070-4452352" }
  { name: "Chris Waalberg", handle:"chris" , phone: "06-16170184" }
  { name: "Christiaan Hees", handle:"christiaan" }
  { name: "Cynthia Wijntje", handle:"cynthia", phone: "070-4452310" }
  { name: "Elaine Oliver", handle:"elaine" }
  { name: "Frank van den Hoogen", handle:"frank", phone: "070-4452368", web: "http://www.frankvdhoogen.nl" }
  { name: "Gerard Dorst", handle:"gerard" }
  { name: "Guido Bouman", handle:"guido" }
  { name: "Guus Goossens", handle:"guus" }
  { name: "Herman Banken", handle:"herman", web: "http://hermanbanken.nl/" }
  { name: "Hidde Statema", handle:"hidde", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg"}
  { name: "Ineke Scheffers", handle:"ineke", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg" }
  { name: "Jaap Taal", handle:"jaap" }
  { name: "Jaap Mengers", handle: "jaapm" }
  { name: "Jasper Haggenburg", handle:"jasperh", web: "http://jpunt.nl" }
  { name: "Jasper Kaizer", handle:"jasper" }
  { name: "Jeroen Gijsman", handle:"jeroen", phone: "070-4452367" }
  { name: "Johan Huijkman", handle:"johan", phone: "070-4452379" }
  { name: "Kamil Afsar", handle:"kamil", phone: "070-4452357" }
  { name: "Kars Veling", handle:"kars", phone: "070-4452350" }
  { name: "Katja Hollaar", handle:"katja" }
  { name: "Korjan van Wieringen", handle:"korjan" }
  { name: "Kristin Rieping", handle:"kristin", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg" }
  { name: "Laurens van den Oever", handle:"laurens" }
  { name: "Leonard Punt", handle:"leonard" }
  { name: "Lukas van Driel", handle:"lukas", phone: "070-4452366", web: "http://developer.3l.nl/" }
  { name: "Marcel Duin", handle:"marcel", web: "http://webglmarcel.q42.net/" }
  { name: "Mark de Jong", handle:"markj", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg" }
  { name: "Mark van Straten", handle:"mark", phone: "070-4452347" }
  { name: "Martin Kool", handle:"martin", phone: "070-4452362", web: "http://martinkool.com/" }
  { name: "Mathijs Kadijk", handle: "mathijs", web: "http://mathijskadijk.nl/" }
  { name: "Meindert Hart", handle: "meindert", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg" }
  { name: "Michiel Post", handle:"michiel", web: "http://michielpost.nl/" }
  { name: "Rahul Choudhury", handle:"rahul", phone: "070-4452362" }
  { name: "Remco Veldkamp", handle:"remco", phone: "070-4452356", web: "http://realstuffforabstractpeople.com/" }
  { name: "Richard Lems", handle:"richard" }
  { name: "Rob Lokhorst", handle:"rob" }
  { name: "Roelf-Jan de Vries", handle:"roelfjan", web: "http://www.roelf-jandevries.nl" }
  { name: "Sander de Vos", handle:"sander", phone: "070-4452354" }
  { name: "Sjoerd Visscher", handle:"sjoerd", web: "http://w3future.com/" }
  { name: "Stef Brooijmans", handle:"stef", phone: "070-4452351" }
  { name: "Suzanne Waalberg", handle:"suzanne" }
  { name: "Taco Ekkel", handle: "taco" }
  { name: "Ted de Koning", handle:"ted" }
  { name: "Tim Logtenberg", handle:"timl", phone: "070-4452360", email: "tim" }
  { name: "Tim van Deursen", handle:"timd", phone: "070-4452361" }
  { name: "Tim van Steenis", handle:"tims", phone: "070-4452369", web:"http://www.vansteenis-photography.nl/" }
  { name: "Tom Lokhorst", handle:"tom", web: "http://tom.lokhorst.eu/" }
  { name: "Tomas Harkema", handle:"tomas" }
  { name: "Wouter van Drunen", handle: "wouter", imageStatic: "anonymous.jpg", imageAnimated: "anonymous.jpg" }
]

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
addLabel "Projectleider",                 "jasper korjan timd gerard laurens meindert taco"
addLabel "Software Engineer",             _.without allHandles, "stef", "cynthia", "suzanne"
addLabel "Interaction Engineer",          "rahul elaine johan roelfjan frank guido"
addLabel "Q'er",                          allHandles
addLabel "Oprichter",                     "kars"
addLabel "Student",                       "herman tomas"
addLabel "Ex-stagiair",                   "jeroen lukas chris bob katja timl tims kamil"
addLabel "Ex-klant",                      "gerard stef taco"
addLabel "Ex-concullega",                 "arjen sander bas coen guido jaap jasper jasperh johan roelfjan marcel mark mathijs michiel stef timd taco wouter"
addLabel "Ex-ex-q'er",                    "sjoerd laurens suzanne"

# Arbitrary selections
addLabel "Speelt nog World of Warcraft",  "rahul christiaan richard coen markj benjamin tims"
addLabel "Weet wat Spiffy is",            "bob timl martin remco lukas sjoerd kars laurens" # LOL!
addLabel "Team Wintersport",              "lukas bob chris mark jeroen katja stef roelfjan sjoerd meindert jaapm kars timd guido arjen"
addLabel "Heeft een baard",               "rahul richard arian coen christiaan kamil jasperh"
addLabel "Stokoud",                       "stef johan"
addLabel "Broers",                        "tom rob"
addLabel "Tatoeage",                      "chris jeroen jasperh elaine marcel tomas"
addLabel "Voortgeplant",                  "martin chris mark kars bas coen cynthia gerard jasper johan korjan michiel remco sander stef suzanne timd laurens taco bart"
addLabel "Rijdt soms op een motor",       "stef jeroen arian tom lukas bob jasperh chris"
addLabel "Gaat binnenkort naar Microsoft", "michiel"
addLabel "Vroeger stewardess geweest",    "cynthia"
addLabel "Heeft bij Fabrique gewerkt",    "sander"
addLabel "Verdient minder dan Jasper",    _.without allHandles, "jasper"
addLabel "Google IO alumni",              "kars rahul martin jaap mark remco kamil christiaan chris arian guus stef lukas taco"
addLabel "WWDC kaartje kwijtgeraakt",     "tims"
addLabel "Heeft Max Raabe live gezien",   "kars martin laurens bob lukas"
addLabel "Schoenmaat 42",                 "rahul chris arian guus christiaan mark"
addLabel "IQ boven de 200",               "sjoerd"
addLabel "Blessure tijdens werktijd",     "rahul guus"
addLabel "Nerf gun owner",                "mark chris arian jeroen frank guus kars benjamin"
addLabel "Kan stiekem best programmeren",     "chris"
addLabel "Namespace collision",           "jaap jaapm jasper jasperh mark markj timl tims timd leonard gerard"
addLabel "Emigrant",                      "rahul"

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

Meteor.publish "employees", -> Employees.find()
Meteor.publish "employeeCount", -> EmployeeCount.find()

Meteor.methods
  updatePosition: (id, x, y, loc) ->
    # used by floorplan.meteor.com app
    obj = {}
    obj["floorplan.#{loc}.x"] = x
    obj["floorplan.#{loc}.y"] = y
    Employees.update id, $set: obj
