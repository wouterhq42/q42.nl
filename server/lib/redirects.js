// Use Picker middleware to handle server-side routes
// per https://github.com/meteorhacks/picker/issues/22

const HTTP_REDIRECT_PERMANENT = 302;

redirect(["/meteor", "/swift", "/interaction-engineering", "/io", "/girlcode"],
  "q42.nl", "q42.com");
redirect(["/games", "/vacatures"], "q42.com", "q42.nl");

redirect(["/accessibility", "/a11y"], null,
  "https://q42.com/interaction-engineering");
redirect(["/adventures"], null, "https://adventures.handcraft.com");

const demoUrls = ["/demos/colorblindnesssimulator", "/demos/contrastcheck"];
const seeChromeWebStore = "https://chrome.google.com/webstore/detail/see/" +
                          "dkihcccbkkakkbpikjmpnbamkgbjfdcn";
redirect(demoUrls, null, seeChromeWebStore);

redirect(["/products"], null, "https://q42.com/projects");
redirect(["/producten"], null, "https://q42.nl/projecten");

// XXX: redesign magic 'from' argument
function redirect(urls, from, to) {
  Picker.middleware((req, res, next) => {
    const match = () => from ? req.headers.host === from : true;
    if (match() && urls.indexOf(req.url) !== -1) {
      const destination = from ? `https://${to}${req.url}` : to;
      console.log(`Redirect ${from} to ${destination}`);
      res.writeHead(HTTP_REDIRECT_PERMANENT, {
        Location: destination
      });
      res.end();
    } else {
      next();
    }
  });
}

Picker.middleware((req, res, next) => {
  const host = req.headers.host;
  const fullUrl = `https://${host}${req.url}`;
  if (host.indexOf("www") === 0){
    console.log(`Route: removeWWW (${req.url})`);
    res.writeHead(HTTP_REDIRECT_PERMANENT, {
      Location: fullUrl.replace("www.", "")
    });
    res.end();
  } else {
    next();
  }
});
