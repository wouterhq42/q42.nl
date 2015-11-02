Meteor.publish("work", (slug) => {
  check(slug, String);
  if (slug)
    return Work.find({slug: slug});
  else
    return Work.find();
});

Meteor.startup(() => {
  if (Work.find().count() === 0) {
    Work.insert({
      slug: "klm-apple-watch",
      name: "KLM for Apple Watch",
      clientName: "KLM",
      subtitle: "Check in from your watch",
      intro: `
        <p>Together with AKQA we made checking in with KLM even easier!
        Your Apple Watch gives you insight into your next flight, terminal,
        gate, seat and even how long it'll take to walk to your gate.</p>
        <p><a href="http://localhost/blog/post/125336396528/klms-apple-watch-app-catches-your-plane">Read how we did it</a></p>
      `,
      properties: {
        pinned: no,
        category: "project",
        qers: ["guus", "kamil", "jasper"],
        date: new Date("2015-09-01"),
        tags: ["travel", "apple-watch", "swift", "ios", "app", "wearable"]
      },
      image: {
        url: "http://static.q42.nl/images/projecten/klm-applewatch3.jpg",
        caption: "So much more convenient than a stack of paper"
      },
      things: [
        {
          size: 'large',
          thingId: 'tesloop',
          align: 'right'
        },
        {
          size: 'small',
          thingId: 'game-of-drones'
        },
        {
          size: 'large',
          thingId: 'shell'
        }
      ]
    });
  }
});
