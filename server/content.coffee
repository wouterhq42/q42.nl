
Meteor.publish "content", -> Content.find()

Content.allow
  update: -> yes

Meteor.methods
  "updateContent": (id, field, value) ->
    return unless @userId
    changeObj = {}
    changeObj[field] = value
    Content.update id, $set: changeObj

Meteor.startup ->
  Content.remove({})

  Content.insert
    lang: "nl"
    id: "staatsloterij"
    name: "Staatsloterij"
    subtitle: "De nieuwe prijswinnende website"
    tags: ["project", "staatsloterij"]
    body: """
    <p>Op de nieuwe Staatsloterij website kun je nu vrijwel alle producten online kopen.</p>
    <p>We ontwikkelden de nieuwe site in samenwerking met Fabrique en het Digital team van de Staatsloterij.</p>
    <p>De site is tablet first ontwikkeld, maar werkt door het responsive design ook perfect op hele grote schermen en alle gangbare smartphones.</p>
    """
    linkTitle: "Waag eens een gokje"
    url: "http://www.staatsloterij.nl"
    image: "images/projecten/staatsloterij.jpg"
    imageTitle: "Jackpot!"

  Content.insert
    lang: "nl"
    id: "rijksmuseum"
    name: "Rijksmuseum"
    subtitle: "High resolution art"
    tags: ["project", "rijksmuseum"]
    intro: """
    <p>Responsive, tablet-first, fijne animaties: de nieuwe Rijksmuseum website. Een opvallend onderdeel van de site is Rijksstudio: jouw eigen verzameling, knutselplek en museumshop in één.</p>
    """
    body: """
    <p>In 2004 hebben wij samen met Fabrique een prijswinnende website voor het Rijks neergezet. Deze was inmiddels echter wel toe aan een verbouwing.</p>
    <p>De nieuwe Rijksmuseum website is lekker modern: responsive, tablet-first, fijne animaties. Een opvallend onderdeel van de site is Rijksstudio: jouw eigen verzameling, knutselplek en museumshop in één. Met de 125.000 beschikbare kunstwerken in hoge resolutie hoef je je voorlopig niet te vervelen!</p>
    """
    linkTitle: "Bezoek het Rijksmuseum (.nl)"
    url: "http://rijksmuseum.nl"
    image: "images/rijks.jpg"
    imageTitle: '"De beste website ooit," aldus Vasilis'

  Content.insert
    lang: "nl"
    id: "hue"
    name: "Philips Hue"
    subtitle: "Bedien je lampen met je smartphone"
    tags: ["project", "philips", "hue"]
    intro: """
    <p>Samen met Philips de toekomst van lampen uitvinden als Internet of Things product, dat op Google App Engine laten draaien, en het vervolgens in de Apple Store verkopen. Dat is Hue.</p>
    """
    body: """
    <p>Philips had een cunning plan: Iets met gekleurde lampen, iPhone apps, prototyping, een portal plus campagnesite en of wij met ze op avontuur wilden gaan.</p>
    <p>Hoe zeg je nee tegen zo'n voorstel?</p>
    <p>Onze derde samenwerking met Philips werd een van de meest fantastische projecten die een club techneuten zich wensen kan. We bouwden de eerste prototypes tegen een emulator, waarna de portal en de promotiesite volgden in Google App Engine. En nu liggen de lampen in Apple Stores!</p>
    """
    linkTitle: "Lees verder"
    url: "/blog/post/34827577445/trots-op-philips-hue"
    image: "images/huesmall.jpg"
    imageTitle: "Lampen voor nerds."

  Content.insert
    lang: "nl"
    id: "schooltas"
    name: "Schooltas"
    subtitle: "ThiemeMeulenhoff's iPad app"
    tags: ["project", "thiememeulenhoff", "schooltas"]
    intro: """
    <p>600 gram is genoeg voor alle schoolboeken. Schooltas van ThiemeMeulenhoff is leerboek, werkboek en schrift in één waardoor leerlingen volledig via de iPad kunnen werken.</p>
    """
    body: """
    <p>Het Haagse "Vroegâh was alles betâh" gaat niet altijd op. Stinkend jaloers zijn wij Haagse nerds namelijk op de 20 scholen (and counting) waar leerlingen elke ochtend met een iPad van start gaan. Geen zware schooltas met papieren boeken meer, maar een moderne digitale versie die de toepasselijke naam Schooltas 2.0 draagt.</p>
    <p>Wij ontwikkelen Schooltas met veel plezier samen met ThiemeMeulenhoff, Fabrique en vele scholen, docenten en leerlingen.</p>
    """
    linkTitle: "Meer over Schooltas"
    url: "http://schooltas.net"
    image: "images/schooltas3.jpg"
    imageTitle: "Zaten we zelf nog maar op school. #jaloers"

  Content.insert
    lang: "nl"
    id: "w00tcamp"
    name: "w00tcamp"
    subtitle: "Een heel weekend lekker lang nerden"
    intro: """
    <p>Ieder jaar komt iedereen bij Q42 bij elkaar om twee dagen lang aan een hackathon competitie mee te doen die w00tcamp heet. Dit jaar hebben we het weer gedaan in November.</p>
    """
    linkTitle: "Bekijk de resultaten!"
    url: "/w00tcamp"
    image: "images/w00tcamp/oculus.jpg"
    imageTitle: "Oculus Unrift"

  Content.insert
    lang: "nl"
    id: "games"
    name: "Games"
    subtitle: "Digitaal en analoog"
    intro: """
    <p>Peter Pan blijft altijd jong. Q-ers eigenlijk ook. Games spelen zit in ons bloed en dus maken we ook graag onze eigen spellen. Een soort pleziertherapie.</p>
    """
    linkTitle: "Check al onze games."
    url: "/games"
    image: "images/gamessmall.jpg"
    imageTitle: "Spelen en maken. Digitaal en analoog."

  Content.insert
    lang: "nl"
    id: "handcraft"
    name: "Handcraft"
    subtitle: "HTML prototyping"
    intro: """
    <p>Met Handcraft maak je in de browser prototypes door gewoon code te schrijven. Onbeperkte file uploads, makkelijk je werk delen, en een supergelikte interface.</p>
    """
    linkTitle: "Probeer Handcraft gratis"
    url: "http://handcraft.com"
    image: "images/handcraft-small.jpg"
    imageTitle: "Prototyping met HTML is beter dan zonder."

  Content.insert
    lang: "nl"
    id: "projects-intro"
    body: """
    <p>Wij houden erg van samen mooie internetdingen maken. Om verschillende redenen. Omdat we van internetdingen houden, of het nou webapplicaties of mobiele apps zijn. Omdat we graag uitgedaagd worden en de grenzen opzoeken van wat technisch mogelijk is. Omdat we enthousiast worden van opdrachtgevers met passie voor hun vak. Omdat we het geweldig vinden om gebruikers blij te maken met mooi spul dat niet alleen nuttig, maar ook vriendelijk is. En omdat we zo trots zijn op alle mooie dingen die we al gebouwd hebben.</p>
    """

  Content.insert
    lang: "nl"
    id: "dordrechtsmuseum"
    name: "Dordrechts Museum"
    subtitle: "Willem II Kunstkoning"
    intro: """
    <p>In maart 2014 vindt een unieke tentoonstelling plaats in het Dordrechts Museum, ‘Willem II - Kunstkoning’. Het wordt de grootste tentoonstelling die ooit in het museum heeft plaatsgevonden en daar moest een speciale website voor ontwikkeld worden.</p>
    """
    linkTitle: "Mooie klus voor Q dus!"
    url: "http://wii-kunstkoning.nl"
    image: "images/Dordrechtsmuseum2.jpg"
    imageTitle: "Een koninklijke site"

  Content.insert
    lang: "nl"
    id: "spotvogel"
    name: "Spotvogel"
    subtitle: "Het zie, zoek en zeg spel"
    intro: """
    <p>In samenwerking met Vroege Vogels (VARA) en het Nederlands Instituut voor Beeld en Geluid maakten we Spotvogel, een toffe online game voor video. Spelers voegen trefwoorden (tags) aan het videomateriaal toe met als doel de doorzoekbaarheid van het videomateriaal te verbeteren. Voor het invoeren van de tags ontvang je punten en kun je coole badges verzamelen.</p>
    """
    linkTitle: "Probeer het zelf"
    url: "http://spotvogel.vroegevogels.vara.nl"
    image: "images/spotvogel2.jpg"
    imageTitle: "Beter een vogel in de hand..."

  Content.insert
    lang: "nl"
    id: "rocmondriaan"
    name: "ROC Mondriaan"
    subtitle: "Nieuwe website"
    intro: """
    <p>ROC Mondriaan is een Regionaal Opleidingen Centrum met vestigingen in Den Haag, Delft, Leiden en Naaldwijk. Samen met onze vrienden van Fabrique maakten we een moderne, frisse website voor ze!</p>
    """
    linkTitle: "Bekijk de website"
    url: "http://www.rocmondriaan.nl"
    image: "images/roc2.jpg"
    imageTitle: "Prachtig gebouw!"

  Content.insert
    lang: "nl"
    id: "lakenhal"
    name: "Museum de lakenhal"
    subtitle: "Met Ruby on Rails"
    body: """
    <p>Leiden heeft een rijk kunstenaarsverleden. Niemand minder dan Rembrandt van Rijn, Jan Steen en Gerrit Dou waren van Leidse komaf. Naast stukken van deze en andere Leidse kunstenaars vind je in Museum de Lakenhal stukken over de Leidse geschiedenis en de kunstnijverheid in de stad.</p>
    <p>In samenwerking met Fabrique maakten wij de nieuwe website, ditmaal (voor het eerst!) met Ruby on Rails.</p>
    """
    linkTitle: "Bekijk de verhalen"
    url: "http://lakenhal.nl"
    image: "images/projecten/lakenhal.jpg"
    imageTitle: 'Beter dan "dekenhal"!'

  Content.insert
    lang: "nl"
    id: "9292"
    name: "9292"
    subtitle: "De hele mikmak: web & apps"
    body: """
    <p><a href="http://9292.nl" class="external">De website van 9292</a> was toe aan een nieuw jasje. Samen met Fabrique en 9292 hebben wij de site omgebouwd van gereedschap naar goede vriend. Dat begint met de vraag ‘waar wil je heen’ en gaat verder met een slimme planner met goede autosuggest en herkenning van plaatsen zoals ‘Efteling’. Tegen een vriend zeg je namelijk niet dat je van station Delft naar Europalaan 1 in Kaatsheuvel reist. Nee, je gaat van je huis naar de Efteling.</p>
    <p>Naast de website en de mobiele variant hebben we ook de <a href="https://itunes.apple.com/nl/app/9292/id556557690" class="external">iPhone</a>, <a href="https://play.google.com/store/apps/details?id=nl.negentwee&amp;hl=nl" class="external">Android</a> en <a href="http://www.windowsphone.com/nl-NL/apps/1f4b557a-ed22-47f7-a6e6-8571906a886d" class="external">Windows Phone</a> apps gebouwd. En er komt nog veel meer mooi spul aan!</p>
    """
    linkTitle: "Plan je reis"
    url: "http://9292.nl"
    image: "images/9292.jpg"
    imageTitle: "'Waar wil je heen?' Existentiële vraag, eigenlijk."

  Content.insert
    lang: "nl"
    id: "mendo"
    name: "Mendo"
    subtitle: "Spannend HTML5 & CSS3 spul"
    intro: """
    <p>“MENDO is a candy store for book aficionados,” is hoe Roy, Joeri en Joost hun Amsterdamse winkel treffend omschrijven. Die beleving, maar dan online. Dat was de opdracht die Perceptor en Q42 kregen. Een uitdaging, maar met de fantastische content van MENDO en de unieke ontwerp-skills van Perceptor was het voor ons een feest om dat te verrijken met hippe web-technologieën.</p>
    """
    linkTitle: "Bekijk Mendo.nl"
    url: "http://mendo.nl"
    image: "images/mendo2.jpg"
    imageTitle: "Een site waar je boeken kunt shizzlen."

  Content.insert
    lang: "nl"
    id: "uitapp"
    name: "UIT app"
    subtitle: "Voor iPhone en nu ook voor Android"
    intro: """
    <p><a href="http://itunes.apple.com/nl/app/uit/id385525154?mt=8" class="external">De Uit app</a> is een onmisbare app voor uitgaand Nederland. Met "Nu & Dichtbij" vraag je direct de evenementen in de buurt op. Je kan ook langer van tevoren een avondje plannen door slimme lijsten te maken op datum, locatie, genre of artiest. De app loodst je naar de ticketverkoop en via de kaart naar de plek van het evenement.</p>
    """
    linkTitle: "Download de UIT app voor Android"
    url: "https://play.google.com/store/apps/details?id=nl.uitburo.uit"
    image: "images/uitapp.jpg"
    imageTitle: "Uitgaand Nederland ziet er zo uit. In ons hoofd."

  Content.insert
    lang: "nl"
    id: "charmequality"
    name: "Charme & Quality"
    subtitle: "Herbruikbaar Orchard framework"
    intro: """
    <p>Jaren na ons werk voor <a href="http://www.vacanceselect.nl" class="external">vacanceselect.nl</a> mochten wij weer voor Viaselect aan de slag. Ditmaal voor hun <a href="http://www.charmequality.nl" class="external">Charme & Quality website</a>. We hebben daarmee meteen een op <a href="http://www.orchardproject.net" class="external">Orchard</a> gebaseerd framework neergezet dat makkelijk herbruikbaar is voor alle komende Viaselect websites.</p>
    """
    linkTitle: "Bekijk de vakantiehuizen met karakter"
    url: "http://www.charmequality.nl"
    image: "images/charmquality.jpg"
    imageTitle: "Voel je de vakantiekriebels al?"

  Content.insert
    lang: "nl"
    id: "digibord"
    name: "Malmberg Digibord"
    subtitle: "Van krijtjes naar Youtube"
    image: "images/digibord.jpg"
    imageTitle: "Waarom hadden wij dit vroeger niet?"

  Content.insert
    lang: "nl"
    id: "schaatsen"
    name: "Schaatsen.nl"
    subtitle: "De schaats-portal van de KNSB"
    url: "http://schaatsen.nl"
    image: "images/schaatsen.jpg"
    imageTitle: "It Giet Oan!"

  Content.insert
    lang: "nl"
    id: "stedelijk"
    name: "Stedelijk Museum"
    subtitle: "De nieuwe website"
    url: "http://www.stedelijk.nl"
    image: "images/stedelijkmuseumamsterdam.jpg"
    imageTitle: "In een nieuw jasje."

  Content.insert
    lang: "nl"
    id: "iemandzoalsik"
    name: "Iemand Zoals Ik"
    subtitle: "Dé site voor en door chronisch zieken"
    url: "http://www.iemandzoalsik.nl"
    image: "images/iemandzoalsik.jpg"
    imageTitle: "Dé site voor en door chronisch zieken"

  Content.insert
    lang: "nl"
    id: "xwashier"
    name: "X Was Hier"
    subtitle: "Rijke iPhone app met geavanceerde beeldherkenning"
    url: "http://itunes.apple.com/us/app/xwashier/id436744605?mt=8&ls=1"
    image: "images/xwashier.jpg"
    imageTitle: "X marks the spot"

  Content.insert
    lang: "nl"
    id: "idealenkompas"
    name: "Idealenkompas"
    subtitle: "Maatschappelijke marktplaats voor goede ideeën"
    url: "http://www.idealenkompas.nl"
    image: "images/kompas.jpg"
    imageTitle: "Goed idee?"

  Content.insert
    lang: "nl"
    id: "wellantcollege"
    name: "Wellant College"
    subtitle: "Een grote website voor een grote onderwijsinstelling"
    url: "http://wellant.nl"
    image: "images/wellantcollege.jpg"
    imageTitle: "Alwéér een mooie site met Fabrique"