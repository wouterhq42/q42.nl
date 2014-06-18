
Meteor.publish "content", -> Content.find()

Content.allow
  update: -> yes

Meteor.methods
  "updateContent": (id, field, value) ->
    #return unless @userId
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
    html: """
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
    html: """
    <p>Responsive, tablet-first, fijne animaties: de nieuwe Rijksmuseum website. Een opvallend onderdeel van de site is Rijksstudio: jouw eigen verzameling, knutselplek en museumshop in één.</p>
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
    html: """
    <p>Samen met Philips de toekomst van lampen uitvinden als Internet of Things product, dat op Google App Engine laten draaien, en het vervolgens in de Apple Store verkopen. Dat is Hue.</p>
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
    html: """
    <p>600 gram is genoeg voor alle schoolboeken. Schooltas van ThiemeMeulenhoff is leerboek, werkboek en schrift in één waardoor leerlingen volledig via de iPad kunnen werken.</p>
    """
    linkTitle: "Meer over Schooltas"
    url: "http://schooltas.net"
    image: "images/schooltas3.jpg"
    imageTitle: "Zaten we zelf nog maar op school. #jaloers"