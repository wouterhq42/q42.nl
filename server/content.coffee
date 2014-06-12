
Meteor.publish "content", -> Content.find()

Meteor.startup ->
  Content.remove({})
  if Content.find().count() is 0
    project =
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
    Content.insert project