Carrousel = [
  {
    url: "/blog/post/48609991339/rijksmuseum-wins-3-awards-at-the-museums-and-the-web"
    bg: "/images/carrousel/rijksmuseum-awards.jpg"
    text: "3 Museum and the Web awards voor het Rijksmuseum"
    en_text: "3 Museum and the Web awards for the Rijksmuseum"
    pos: "left"
  }
  {
    url: "/blog/post/45861370772/q42-is-de-best-place-to-work-in-nederland"
    bg: "/images/carrousel/GPTW.jpg"
    text: "Q42 officieel dé Greatest Place to Work"
    en_text: "Q42 is officially the Greatest Place to Work"
    pos: "left"
  }
  {
    url: "http://quento.nl"
    en_url: "http://quento.com"
    bg: "/images/carrousel/quento.png"
    text: "Quento nu beschikbaar voor iOS en Android"
    en_text: "Quento now available for iOS and Android"
  }
  {
    url: "/blog/post/44245650650/kars-en-stef-waren-deze-week-bij-google-in"
    bg: "/images/carrousel/GoogleAward.jpg"
    text: "Q42 is Google Cloud Platform Partner of the Year"
  }
  {
    url: "/blog/post/41360239268/schooltas-heeft-de-not-innovatieprijs-gewonnen"
    bg: "/images/carrousel/kindmetschooltasipad.jpeg"
    text: "Schooltas wint de NOT Innovatieprijs"
    en_text: "Schooltas wins the NOT Innovation prize"
  }
  {
    url: "/blog/post/34827577445/trots-op-philips-hue"
    bg: "/images/hue.jpeg"
    text: "Philips Hue lanceert wereldwijd"
    en_text: "Philips Hue launches worldwide"
    pos: "left"
  }
]

Template.carrousel_items.item = -> Carrousel
Template.carrousel_items.pos = -> @pos || "right"
Template.carrousel_items.url = ->
  if @en_url and Session.equals "lang", "en"
    @en_url
  else
    @url
Template.carrousel_items.text = ->
  if @en_text and Session.equals "lang", "en"
    @en_text
  else
    @text
Template.carrousel_items.bg = ->
  if @en_bg and Session.equals "lang", "en"
    @en_bg
  else
    @bg