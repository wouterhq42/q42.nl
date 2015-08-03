addLabel = (label, handles) ->
  handles = if _.isString(handles) then handles.split(" ") else handles
  for handle in handles
    Employees.update {handle: handle}, {$addToSet: {labels: label}}

allHandles = _.pluck Employees.find().fetch(), "handle"

# Roles
roles =
  "Projectleider": "jasper korjan timd gerard laurens meindert taco silvy"
  "Software Engineer": _.without(
    allHandles,
    "stef", "cynthia", "suzanne", "corina", "silvy", "ineke"
  )
  "Interaction Engineer": "rahul elaine johan roelfjan frank guido richard"
  "Q'er": allHandles
  "Oprichter": "kars"
  "Student": "herman tomas jimmy"
  "Ex-stagiair": "jeroen lukas chris bob katja timl tims kamil"
  "Ex-klant": "gerard stef taco"
  "Ex-concullega": [
    "arjen", "sander", "bas", "guido", "jaap", "jasper", "jasperh", "johan",
    "roelfjan", "marcel", "mark", "mathijs", "michiel", "stef", "timd", "taco",
    "wouter", "corina", "silvy"
  ]
  "Ex-ex-q'er": "sjoerd laurens suzanne"
  "Ex-Fabriquer": "sander"
  "Mr. Sarien.net": "martin"

# Arbitrary selections
arbitrary =
  "Girl Code": "ineke katja kristin"
  "Codeuur": "kars lukas johan kim"
  "Speelt nog World of Warcraft": "rahul christiaan richard markj benjamin tims"
  "Weet wat Spiffy is": "bob timl martin remco lukas sjoerd kars laurens" # LOL!
  "Team Wintersport": [
    "lukas", "bob", "chris", "mark", "jeroen", "katja", "stef", "roelfjan",
    "sjoerd", "meindert", "jaapm", "kars", "timd", "guido", "arjen"
  ]
  "Heeft een baard": "rahul richard arian christiaan kamil jasperh marcel"
  "Stokoud": "stef johan"
  "Broers": "tom rob"
  "Tatoeage": "chris jeroen jasperh elaine marcel tomas"
  "Voortgeplant": [
    "martin", "chris", "mark", "kars", "bas", "cynthia", "gerard", "jaap",
    "jasper", "johan", "korjan", "michiel", "remco", "sander", "stef",
    "suzanne", "timd", "laurens", "taco", "bart"
  ]
  "Rijdt soms op een motor": "stef jeroen arian tom lukas bob jasperh chris"
  "Gaat binnenkort naar Microsoft":"michiel"
  "Vroeger stewardess geweest": "cynthia"
  "Verdient minder dan Jasper": _.without allHandles, "jasper"
  "Google IO alumni": [
    "kars", "rahul", "martin", "jaap", "mark", "remco", "kamil", "christiaan",
    "chris", "arian", "guus", "stef", "lukas", "taco", "wouter"
  ]
  "WWDC kaartje kwijtgeraakt": "tims"
  "Heeft Max Raabe live gezien": "kars martin laurens bob lukas"
  "Schoenmaat 42": "rahul chris arian guus christiaan mark"
  "IQ boven de 200": "sjoerd"
  "Blessure tijdens werktijd": "rahul guus"
  "Nerfgun owner": "mark chris arian jeroen frank guus kars benjamin"
  "Kan stiekem best programmeren": "chris"
  "Namespace collision": [
    "jaap", "jaapm", "jasper", "jasperh", "mark", "markj", "timl", "tims",
    "timd", "leonard", "gerard"
  ]
  "Emigrant": "rahul"
  "Gewerkt met de Two Guys": "martin rahul richard"
  "Troll": "benjamin"

addLabel label, handles for label, handles of _.extend(roles, arbitrary)
