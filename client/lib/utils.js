Utils = {

  getSiteVersion: () => window.location.hostname === "q42.com" ? "en" : "nl",

  // return the pages to be displayed as pagination on the blog
  getPagination: (pageNum, tag) => {
    pageNum = pageNum * 1;
    const item = PageCounts.findOne({tag: (tag || "")});
    const pages = item ? item.count : 1;
    const lang = Utils.getSiteVersion();
    const older = lang === "en" ? "older" : "ouder";
    const newer = lang === "en" ? "newer" : "nieuwer";
    let items = [];

    if (pages !== 1) {
      const page = pageNum || 1;
      const min = Math.max(1, page - 3);
      const max = Math.min(pages, page + 3);

      if (page > 1) items.push({ label: newer, page: page - 1 });

      for (let i = min; i <= max; i++)
        items.push({ label: i, page: i, active: i === page });

      if (page < pages) items.push({ label: older, page: page + 1 });
    }

    return items;
  },

  // if the page is reloaded with a hash in the url,
  // scroll to the correct position
  setScrollPosition: () => {
    if (window.location.hash){
      const $el = $(window.location.hash);
      if ($el[0]){
        Meteor.setTimeout( (() => $el[0].scrollIntoView()), 100);
      } else {
        Meteor.setTimeout( (() => Utils.setScrollPosition()), 1000);
      }
    } else {
      window.scrollTo(0,0);
    }
  },

  // set the correct <title> and meta info
  setTitleAndMeta: () => {

    Meteor.startup(() => {
      Tracker.autorun(() => {
        FlowRouter.watchPathChange();

        Meteor.setTimeout(() => {
          const routeName = FlowRouter.getRouteName();
          if (routeName === "home" || routeName === undefined){
            document.title = "Q42";
          } else {
            let title = $('h1').first().text();
            title = title.trim();
            title = title.charAt(0).toUpperCase() + title.substring(1);
            document.title = `${title} - Q42`;
          }

          $("meta[property='og:title']").attr("content", document.title);

          const isBlogpost = $(".blog-post").length > 0;
          let imgSrc;
          if (isBlogpost)
            imgSrc = "http://static.q42.nl/images/q42-logo.png";
          else
            imgSrc = $(".block-large img:first-of-type").attr("src");
          $("meta[property='og:image']").attr("content", imgSrc);

          // XXX: fix, since Facebook parses this into "localhost:20049"
          // $("meta[property='og:url']").attr("content", window.location.href);

          const desc = $(".blog-post p:not(.post-date)").first().text() ||
                       $("p:first-of-type").first().text();
          $("meta[property='og:description']").attr("content", desc);
          $("meta[name='description']").attr("content", desc);
        }, 200);

      });
    });

  },

  getPictureURL: (user) => {
    const anon = "http://static.q42.nl/images/employees/anonymous.jpg";
    const s = user ? user.services : null;

    if (!s)               return anon;
    else if (s.twitter)   return s.twitter.profile_image_url;
    else if (s.google)    return s.google.picture;
    else if (s.facebook)
      return `https://graph.facebook.com/${s.facebook.id}/picture`;
    else if (s.github)    return Gravatar.imageUrl(s.github.email || "");
    else                  return anon;
  }

};
