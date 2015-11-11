// Use Picker middleware to handle server-side routes
// per https://github.com/meteorhacks/picker/issues/22

redirect(["/meteor", "/swift", "/interaction-engineering"],
  "q42.nl", "q42.com");
redirect(["/games"], "q42.com", "q42.nl");

redirect(["/accessibility", "/a11y"], null,
  "http://q42.com/interaction-engineering");
redirect(["/adventures"], null, "http://adventures.handcraft.com");

const demoUrls = ["/demos/colorblindnesssimulator", "/demos/contrastcheck"];
const seeChromeWebStore = "https://chrome.google.com/webstore/detail/see/" +
                          "dkihcccbkkakkbpikjmpnbamkgbjfdcn";
redirect(demoUrls, null, seeChromeWebStore);

redirect(["/products"], null, "http://q42.com/projects");
redirect(["/producten"], null, "http://q42.nl/projecten");

function redirect(urls, from, to) {
  const HTTP_REDIRECT_PERMANENT = 302;
  Picker.middleware((req, res, next) => {
    const check = (from) => from ? req.headers.host === from : true;
    if (check(from) && urls.indexOf(req.url) !== -1) {
      const destination = from ? `http://${to}${req.url}` : to;
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
  const fullUrl = `http://${host}${req.url}`;
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
