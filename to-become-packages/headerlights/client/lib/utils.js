supportsInputTypeColor = () => {
  // http://stackoverflow.com/a/8278718/16308
  i = document.createElement("input");
  i.setAttribute("type", "color");
  return i.type !== "text";
};
