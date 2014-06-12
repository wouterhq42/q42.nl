Template.body.rendered = ->
  reattachBehavior()
  FastClick.attach document.body

Template.body.events
  "click a[href^='/']": (evt) ->
    href = evt.target.getAttribute("href")
    if $(evt.target).data().ignore?
      evt.preventDefault()
      window.location.href = href

Template.body.isPhantom = -> /phantom/i.test navigator.userAgent



Template._project.project = ->
  project =
    name: "Staatsloterij"
    subtitle: "De nieuwe prijswinnende website"
    html: """
    <p>Op de nieuwe Staatsloterij website kun je nu vrijwel alle producten online kopen.</p>
    <p>We ontwikkelden de nieuwe site in samenwerking met Fabrique en het Digital team van de Staatsloterij.</p>
    <p>De site is tablet first ontwikkeld, maar werkt door het responsive design ook perfect op hele grote schermen en alle gangbare smartphones.</p>
    """
    linkTitle: "Waag eens een gokje"
    url: "http://www.staatsloterij.nl"
    image: "images/projecten/staatsloterij.jpg"
    imageTitle: "Jackpot!"
  project

Template._project.sizeEquals = (size1, size2) -> size1 is size2