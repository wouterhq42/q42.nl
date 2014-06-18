
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