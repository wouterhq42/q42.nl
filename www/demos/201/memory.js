var Memory =
{
  pair: [],
  onClick: function(evt)
  {
    var el = window.event? event.srcElement : evt.target;
    if (Class.contains(el, "picture"))
      Memory.onClickPicture(el);    
  },
  onClickPicture: function(el)
  {
    if (Memory.pair.length == 2)
    {
      Class.replace(this.pair[0], "visible", "hidden");
      Class.replace(this.pair[1], "visible", "hidden");
      Memory.pair = [];
    }
    else if (Class.contains(el, "picture-hidden"))
    {
      Class.replace(el, "hidden", "visible");
      Memory.pair.push(el);
      if (Memory.pair.length == 2 && Memory.pair[0].className == Memory.pair[1].className)
      {
        Class.remove(this.pair[0], "visible");
        Class.remove(this.pair[1], "visible");
        Memory.pair = [];
      }
    }
  }
}, Class = Spif.ClassNameAbstraction;
document.onclick = Memory.onClick;