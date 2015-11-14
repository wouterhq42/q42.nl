RouteUtils = {

  // return the correct name of the template
  // depending on the current language
  getTemplate(name) {
    const enName = `en_${name}`;
    const isEn = Utils.getSiteVersion() === "en";
    if (isEn && Template[enName]) {
      return enName;
    } else if (isEn && !Template[enName]) {
      return "error404";
    } else if (!isEn && !Template[name]){
      return "error404";
    } else
      return name;
  }
};
