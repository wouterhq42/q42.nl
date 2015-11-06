const HTTP_REDIRECT_TEMPORARY = 301;
const HTTP_REDIRECT_PERMANENT = 302;
const urlsToRedirectToEn = ["/meteor", "/swift", "/vr",
                            "/interaction-engineering"];
const urlsToRedirectToNl = ["/games"];
const demoUrls = ["/demos/colorblindnesssimulator", "/demos/contrastcheck"];

// Use Picker middleware to handle server-side routes
// per https://github.com/meteorhacks/picker/issues/22

// .NL ==> .COM
Picker.middleware((req, res, next) => {
  if (req.headers.host === "q42.nl"){
    if (urlsToRedirectToEn.indexOf(req.url) !== -1){
      console.log(`Redirect NL to EN: ${req.url}`);
      res.writeHead(HTTP_REDIRECT_PERMANENT, {
        Location: `http://q42.com${req.url}`
      });
      res.end();
    }
  } else {
    next();
  }
});

// .COM ==> .NL
Picker.middleware((req, res, next) => {
  if (req.headers.host === "q42.com"){
    if (urlsToRedirectToEn.indexOf(req.url) !== -1){
      console.log(`Redirect EN to NL: ${req.url}`);
      res.writeHead(HTTP_REDIRECT_PERMANENT, {
        Location: `http://q42.nl${req.url}`
      });
      res.end();
    }
  } else {
    next();
  }
});

Picker.middleware((req, res, next) => {
  if (_.contains(["/accessibility", "/a11y"], req.url)){
    res.writeHead(HTTP_REDIRECT_PERMANENT, {
      Location: "http://q42.com/interaction-engineering"
    });
    res.end();

  } else if (req.url === "/adventures"){
    res.writeHead(HTTP_REDIRECT_TEMPORARY, {
      Location: "http://adventures.handcraft.com"
    });
    res.end();

  // SEE extension
  } else if (_.contains(demoUrls, req.url)){
    res.writeHead(HTTP_REDIRECT_PERMANENT,{
      Location: `https://chrome.google.com/webstore/
                detail/see/dkihcccbkkakkbpikjmpnbamkgbjfdcn`
    });
    res.end();

  } else {
    next();
  }
});

// XXX: make this easier
Picker.middleware((req, res, next) => {
  const isDotCom = req.headers.host === "q42.com";
  if (isDotCom && _.contains("products", req.url)) {
    res.writeHead(HTTP_REDIRECT_PERMANENT, {
      Location: "http://q42.com/projects"
    });
    res.end();
  }
  else if (!isDotCom && _.contains("producten", req.url)) {
    res.writehead(HTTP_REDIRECT_PERMANENT, {
      Location: "http://q42.nl/projecten"
    });
    res.end();
  } else {
    next();
  }
});

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
