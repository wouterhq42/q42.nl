var $=window["Spif"]={
 c:"undefined",
 d:"*",
 e:"/",
 f:" ",
 
 g:"display",
 h:"block",
 j:"none",

 k:"threadStart",
 l:"threadEnd",
 m:"beforeChangeClassName",
 n:"changeClassname",
 o:"afterChangeClassName",
 r:"beforeHtmlChanged",
 t:"afterHtmlChanged",
 v:"beforeScatterFrameLoad",
 w:"afterScatterFrameLoad",
 z:"beforeAction",
 A:"afterElementActivation",
 B:"afterElementDeactivation",
 C:"labelExecuteRequest",
 D:400,

 F:"load",
 G:"onload",
 H:"click",
 I:"keydown",
 
 J:"A",
 K:"FORM",
 L:"INPUT",
 M:"LABEL",
 N:"SELECT",
 O:"TEXTAREA",
 

 P:"DXImageTransform.Microsoft.Alpha",

 Q:true,
 R:false,

 S:"morph",
 T:"dontmorph",

 U:"-delay",
 V:"-duration",

 W:(typeof(window.opera)!="undefined"),
 X:(navigator.userAgent.indexOf("MSIE")!=-1)&&!window.opera,
 Y:((navigator.userAgent.indexOf("Gecko")!=-1)&&(navigator.appVersion.indexOf("AppleWebKit")==-1)),
 Z:(navigator.appVersion.indexOf("AppleWebKit")!=-1)
};
 
 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

 $._$={
 $$:function(a$,delay,b$,c$)
{
 return setTimeout(this.d$(a$,b$,c$),delay);
},
 e$:function(a$,f$,b$,c$)
{
 return setInterval(this.d$(a$,b$,c$),f$);
},
 g$:/^\s+|\s+$|(\s)\s+/g,
 h$:function(s)
{
 return s.replace(this.g$,"$1");
},

 d$:function(a$,b$,c$)
{
 if(b$)
 return function(){
 $.i$.j$($.k,null,null);
 a$.apply(b$,c$);
 $.i$.j$($.l,null,null);
};
 else 
 return function(){
 $.i$.j$($.k,null,null);
 a$();
 $.i$.j$($.l,null,null);
};
},
 k$:function(l$,m$,n$,o$,p$)
{
 var q$=null;
 do 
{
 q$=$.r$.match(l$,m$+"-\\w+");
 l$=l$.parentNode;
}
 while(!o$&&l$&&l$.nodeType==1&&!q$);

 for(var i=0;i<q$.length;i++)
{
 var s=q$[i].substring(m$.length+1);
 if(!p$||!p$[s])
 return s;
}

 return n$;
},
 s$:function(l$,t$,u$,o$)
{
 var q$=null;
 do 
{
 q$=$.r$.match(l$,t$+"-?\\d+");
 l$=l$.parentNode;
}
 while(!o$&&l$&&l$.nodeType==1&&!q$);
 return(q$?parseInt(q$[0].substring(t$.length)):u$);
},
 v$:function(l$,w$,x$)
{
 var y$=l$.z$;
 if(!y$)
 y$=l$.z$={};

 y$[w$]=x$;
},
 A$:function(l$,w$)
{
 var y$=l$.z$;
 if(!y$)
 return null;
 else 
 return y$[w$];
},
 B$:function(C$,D$)
{
 for(var i=0;i<C$.length;i++)
 if(C$[i]!=D$[i])
 return false;

 return true;
}
};

 $._$.platform=($.X?"ie":($.Y?"gecko":($.W?"opera":($.Z?"safari":"unknown"))));





 Function.prototype.E$=function(b$)
{
 
 if(!$.F$)
{
 $.F$=[];
 $.G$=[];
 $.H$=[];
}

 
 var I$=this;

 
 var J$=b$.K$;
 if(!J$)
 $.F$[J$=b$.K$=$.F$.length]=b$;

 
 var L$=I$.M$;
 if(!L$)
 $.G$[L$=I$.M$=$.G$.length]=I$;

 
 if(!$.H$[J$])
 $.H$[J$]=[];
 
 
 var N$=$.H$[J$][L$];
 if(N$)
 return N$;

 
 b$=null;
 I$=null;

 
 return $.H$[J$][L$]=function()
{
 return $.G$[L$].apply($.F$[J$],arguments);
};
};

 if(!Array.prototype.push)
{
 Array.prototype.push=function()
{
 for(var i=0;i<arguments.length;i++)
 this[this.length]=arguments[i];
};
}

 if(!Function.prototype.apply)
{
 Function.prototype.apply=function(b$,c$)
{
 b$.O$=this;
 var P$=b$.O$(c$[0],c$[1],c$[2],c$[3],c$[4]);
 b$.O$=null;
 return P$;
}
}
 
 
 
 
 

 $.Q$={
 R$:1,
 S$:2,
 T$:3,
 U$:4,
 V$:5,
 W$:6,
 X$:7,
 Y$:8,
 Z$:9,
 $a:null,
 aa:function()
{
 this.$a={
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 "borderWidth":this.S$,
 "borderTopWidth":this.S$,
 "borderRightWidth":this.S$,
 "borderBottomWidth":this.S$,
 "borderLeftWidth":this.S$,
 "width":this.T$,
 "height":this.T$,
 "scrollTop":this.U$,
 "scrollLeft":this.U$,
 "color":this.V$,
 "backgroundColor":this.V$,
 "borderColor":this.V$,
 "borderTopColor":this.V$,
 "borderRightColor":this.V$,
 "borderBottomColor":this.V$,
 "borderLeftColor":this.V$,
 "opacity":this.W$,
 "zoom":this.X$,
 "display":this.Y$,
 "overflow":this.Y$,
 "visibility":this.Y$,
 "zIndex":this.Z$ 
};
},
 ba:{
 "width":["offsetWidth","paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],
 "height":["offsetHeight","paddingTop","paddingBottom","borderTopWidth","borderBottomWidth"]
},

 ca:function(l$,w$)
{
 var da=this.ea(w$);
 if(!$.X)
{
 var fa=this.ga(w$);
 var ha=document.defaultView.getComputedStyle(l$,"");
 switch(da)
{
 case this.T$:
 if($.W)
{
 var ia=this.ba[w$];
 var x$=l$[ia[0]];
 for(var i=1;i<ia.length;i++)
 x$-=parseInt(l$.currentStyle[ia[i]]);
 return Math.max(0,x$);
}
 case this.S$:
 if(ha.getPropertyValue(fa.replace(/width/,"style"))==$.j)
 return 0;
 case this.Z$:
 case this.R$:
 case this.X$:
 var x$=ha.getPropertyValue(fa);
 var ja=parseInt(x$);
 if(isNaN(ja))
 switch(x$)
{
 case "auto":return 0;
 default:return null;
}
 return ja;
 case this.W$:
 return ha.getPropertyValue(fa);
 case this.U$:
 return l$[w$];
 break;
 case this.V$:
 if(
 fa.indexOf("border")!=-1 
&&ha.getPropertyValue(fa.replace(/color/,"style"))==$.j 
)
 return null;
 return this.ka(ha.getPropertyValue(fa));
 case this.Y$:
 return ha.getPropertyValue(fa);
 default:
 return null;
}
}
 else 
{
 switch(da)
{
 case this.T$:
 var x$=l$.currentStyle[w$];
 var ja=parseInt(x$);
 if(isNaN(ja)||x$.indexOf("px")==-1)
{
 var ia=this.ba[w$];
 ja=l$[ia[0]];
 for(var i=1;i<ia.length;i++)
 ja-=this.ca(l$,ia[i]);
}
 return Math.max(0,ja);
 case this.U$:
 return parseInt(l$[w$]);
 break;
 case this.W$:
 try 
{
 var la=l$.filters.item($.P);
 return la.opacity;
}
 catch(ma)
{
 return 100;
}
 break;
 case this.V$:
 if(
 w$.indexOf("border")!=-1 
&&l$.currentStyle[w$.replace(/Color/,"Style")]==$.j 
)
 return null;
 return this.ka(l$.currentStyle[w$]);
 case this.Y$:
 return l$.currentStyle[w$];
 case this.S$:
 if(l$.currentStyle[w$.replace(/Width/,"Style")]==$.j)
 return 0;
 case this.Z$:
 return parseInt(l$.currentStyle[w$]);
 case this.R$:
 case this.X$:
 var x$=l$.currentStyle[w$];

 if(x$.indexOf("%")!=-1)
{
 var na=parseInt(x$)/100;
 switch(w$)
{
 case "top":
 case "bottom":
 x$=Math.floor(na*this.ca(l$.parentNode,"height"));
 break;
 case "left":
 case "right":
 x$=Math.floor(na*this.ca(l$.parentNode,"width"));
 break;
}
}

 var ja=parseInt(x$);
 if(isNaN(ja))
 switch(x$)
{
 case "auto":return 0;
 case "thin":return 2;
 case "medium":return 4;
 case "thick":return 6;
 default:return parseInt(x$);
}

 return ja;
}
}
},

 oa:function(l$,w$,x$)
{
 var da=this.ea(w$);
 switch(da)
{
 case this.V$:
 l$.style[w$]="rgb("+x$.join(",")+")";
 break;
 case this.Y$:
 case this.Z$:
 l$.style[w$]=x$;
 break;
 case this.T$:
 case this.X$:
 case this.S$:
 case this.R$:
 l$.style[w$]=x$+"px";
 break;
 case this.U$:
 l$[w$]=x$+"px";
 break;
}
},

 pa:function(l$,w$)
{
 if($.X)
 l$.style.removeAttribute(w$);
 else 
 l$.style.removeProperty(w$);
},

 ea:function(w$)
{
 return this.$a[w$]||this.R$;
},

 ga:function(w$)
{
 return w$.replace(/([A-Z])/g,function(qa){return "-"+qa.toLowerCase();});
},
 ra:{
 "aqua":"#00FFFF","azure":"#F0FFFF","beige":"#F5F5DC",
 "black":"#000000","blue":"#0000FF","brown":"#A52A2A",
 "cyan":"#00FFFF","darkblue":"#00008B","darkcyan":"#008B8B",
 "darkgray":"#A9A9A9","darkgreen":"#006400","darkred":"#8B0000",
 "fuchsia":"#FF00FF","gold":"#FFD700","gray":"#808080",
 "green":"#008000","indigo":"#4B0082","lightblue":"#ADD8E6",
 "lightcyan":"#E0FFFF","lightgreen":"#90EE90","lightgrey":"#D3D3D3",
 "lightyellow":"#FFFFE0","lime":"#00FF00","magenta":"#FF00FF",
 "maroon":"#800000","navy":"#000080","orange":"#FFA500",
 "pink":"#FFC0CB","purple":"#800080","red":"#FF0000",
 "silver":"#C0C0C0","steelblue":"#4682B4","turquoise":"#40E0D0",
 "violet":"#EE82EE","white":"#FFFFFF","yellow":"#FFFF00" 
},

 ka:function(sa)
{
 sa=this.ra[sa]||sa;

 if(typeof(sa)=="object")
 return sa;
 if(sa.indexOf("#")==0)
{
 if(sa.length==7)
 return[
 parseInt(sa.substring(1,3),16),
 parseInt(sa.substring(3,5),16),
 parseInt(sa.substring(5,7),16)
];
 else 
 return[
 17*parseInt(sa.substring(1,2),16),
 17*parseInt(sa.substring(2,3),16),
 17*parseInt(sa.substring(3,4),16)
];
}
 if(sa.indexOf("rgb(")==0)
{
 var ta=sa.substring(4,sa.length-1).split(",");
 return[
 parseInt(ta[0]),
 parseInt(ta[1]),
 parseInt(ta[2])
];
}

 return[255,255,255];
}
};

 $.Q$.aa();
 $.ua={
 va:1,
 wa:{},

 xa:function(l$,s,ya)
{
 if(ya!=true)
 $.i$.j$($.r,l$,{toValue:s});
 l$.innerHTML=s;
 if(ya!=true)
 $.i$.j$($.t,l$,{toValue:s});
 return true;
},

 za:function(l$)
{
 if(!l$.id)
{
 var id="qid_"+this.va++;
 l$.id=id;
 this.wa[id]=true;
}

 return l$.id;
},

 Aa:function(l$,ya)
{
 if(ya!=true)
{
 var Ba=l$.parentNode;
 $.i$.j$($.r,Ba);
}
 l$.parentNode.removeChild(l$);
 if(ya!=true)
 $.i$.j$($.t,Ba);
 return true;
},

 Ca:function(l$)
{
 var Da=[];

 if(l$.id&&!this.wa[l$.id])
 Da[0]=l$;

 var Ea=l$.getElementsByTagName($.d);
 var Fa=Ea.length;
 for(var i=0;i<Fa;i++)
{
 var l$=Ea[i];
 if(l$.id&&!this.wa[l$.id])
 Da[Da.length]=l$;
}

 return Da;
},
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 Ga:function(l$,Ha)
{
 var Ia=[];

 while(l$&&l$.nodeType==1)
{
 if($.r$.contains(l$,Ha))
 Ia[Ia.length]=l$;

 l$=l$.parentNode;
}

 return(Ia.length>0)?Ia:null;
},
 Ja:function(l$,Ka)
{
 while(l$&&l$.nodeType==1)
{
 if(l$.nodeName==Ka)
 return l$;

 l$=l$.parentNode;
}

 return null;
},
 La:function(l$)
{
 var Ma=l$.target;
 if(!Ma)
 while(l$&&l$.nodeType==1)
{
 var Ha=$.r$.match(l$,"target-\\w+");
 if(Ha)
 return Ha[0].substring(7);
 l$=l$.parentNode;
}
 return Ma;
},
 Na:function(l$)
{
 if(l$.ownerDocument!=document)
 return false;

 if($.X)
 return l$.parentTextEdit!=null;

 while(l$.parentNode&&l$!=document.body)
 if(l$.parentNode.nodeType==11)
 return false;
 else 
 l$=l$.parentNode;
 return(l$==document.body);
},
 Oa:function(Pa,Qa)
{
 if($.X)
 return Pa.contains(Qa);

 while(Qa)
{
 if(Pa==Qa)
 return true;
 else 
 Qa=Qa.parentNode;
}

 return false;
}
};
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

 

 $.r$={
 Ra:{},
 Sa:{},
 Ta:function(Ha,Ua,f$)
{
 if(this.Sa[Ha])
 alert("Warning in ClassNameAbstraction.addClassNameSequence: a classNameSequence has already been defined for '"+Ha+"'.");

 if(typeof(f$)==$.c)
 f$=1.1*$.D;

 this.Sa[Ha]={
 Ua:Ua,
 Va:"("+Ua.join("-"+Ha)+"-"+Ha+"|"+Ha+")",
 f$:f$ 
};
},
 contains:function(l$,Ha)
{
 return this.Wa(l$.className,Ha);
},
 Wa:function(s,Ha)
{
 var Xa=this.Ya(Ha);
 return(s&&s.match(Xa)!=null);
},
 match:function(l$,Ha)
{
 var Xa=this.Ya(Ha);
 return l$.className.match(Xa);
},
 add:function(l$,Za,ya)
{
 if(!this.contains(l$,Za))
{
 if(this.Sa[Za])
{
 this._b(l$,null,Za,0,ya);
 return;
}

 var $b=l$.className;
 var ab=$b+$.f+Za;
 this.bb(l$,$b,ab,ya);
}
},
 replace:function(l$,cb,Za,ya,db)
{
 if(this.Sa[cb])
 cb=this.Sa[cb].Va;

 if(!db&&this.Sa[Za])
{
 this._b(l$,cb,Za,0,ya);
 return;
}

 var $b=l$.className;
 var ab=this.eb($b,cb,Za);

 this.bb(l$,$b,ab,ya);
},
 eb:function(s,fb,gb)
{
 var Xa=this.Ya(fb);

 var hb=s.replace(Xa,gb);
 var Xa=this.Ya(gb);
 if(!hb.match(Xa))
 hb+=$.f+gb;

 return hb;
},
 ib:function(l$,jb,kb,ya,db)
{
 if(this.contains(l$,kb))
{
 var Ma=jb;
 jb=kb;
 kb=Ma;
}
 this.replace(l$,jb,kb,ya,db);
},
 remove:function(l$,cb,ya)
{
 if(this.Sa[cb])
 cb=this.Sa[cb].Va;

 var Xa=this.Ya(cb);

 var $b=l$.className;
 var ab=$b.replace(Xa,"");
 this.bb(l$,$b,ab,ya);
},
 lb:function(l$,ab,ya)
{
 this.bb(l$,l$.className,ab,ya);

 ab=$._$.h$(ab);
 var mb=ab.split($.f);
 for(var i=0;i<mb.length;i++)
{
 var Ha=mb[i];
 if(this.Sa[Ha])
{
 this._b(l$,Ha,Ha,0,ya);
 return;
}
}
},
 nb:new RegExp("\\s([-+])([\\w-]+)|\\s(\\/)([^ /]+)\\/([^\\s/]+)","g"),
 ob:function(pb,qb)
{
 var rb=" "+pb;

(" "+qb).replace(
 this.nb,
 function(sb,qa,tb,ub,vb,wb)
{
 switch(ub||qa)
{
 case "-":
 case "/":
 rb=rb.replace(new RegExp(" "+(vb||tb),"g")," "+(wb||""));
 break;
 case "+":
 rb+=" "+tb;
}
}
);

 return rb.substring(1);

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
},
 Ya:function(Ha)
{
 return this.Ra[Ha]||(this.Ra[Ha]=new RegExp("\\b"+Ha+"\\b","g"));
},
 bb:function(l$,$b,ab,ya)
{
 $b=$._$.h$($b);
 ab=$._$.h$(ab);
 if(ab==$b)
 return;

 if(!ya)
 $.i$.j$($.m,l$,{fromValue:$b,toValue:ab});
 l$.className=ab;
 if(!ya)
 $.i$.j$($.o,l$,{fromValue:$b,toValue:ab});

 if($.X)
{
 
 
 
 
 if(l$.getAttribute("tabIndex",2)==0)
{
 l$.tabIndex=-1;
 setTimeout(function(){l$.tabIndex=0;},0);
}
}
},
 _b:function(l$,cb,Ha,xb,ya)
{
 var data=this.Sa[Ha];
 var Ua=data.Ua;

 var Za=Ua[xb]+"-"+Ha;

 $._$.v$(l$,$.yb,data.f$);

 if(cb&&this.contains(l$,cb))
 this.replace(l$,cb,Za,ya,true);
 else 
 this.add(l$,Za,ya,true);

 var zb=this;
 if(xb<Ua.length-1)
 $._$.$$(function(){zb._b(l$,Za,Ha,xb+1,ya);},data.f$);
 else 
 $._$.$$(function(){if(zb.contains(l$,Za))zb.replace(l$,Za,Ha,ya,true);},data.f$);
}
};
 
 
 

 
 
 
 
 
 
 
 
 


 
 
 
 
 
 
 

 $.Ab={
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 Bb:null,
 Cb:{},
 Db:function(Eb,Fb,a$,b$)
{
 var Gb=this.Hb(Eb,a$,b$,Fb);

 if(Eb.addEventListener)
 Eb.addEventListener(Fb,Gb,false);
 else 
 Eb.attachEvent("on"+Fb,Gb);
},

 Hb:function(Eb,a$,b$,Fb)
{
 return function(Ib)
{
 Ib=$.Ab.Jb(Ib);


 
 
 
 
 
 

 if(Ib.type==$.H)
{
 if($.X)
{
 
 
 if($.Ab.Bb)
{
 var Kb=$.Ab.Bb;
 $.Ab.Bb=null;
 if(Kb==Ib.srcElement.id+Ib.x+Ib.y)
{
 var Lb=Ib.srcElement.getAttribute("htmlFor");
 if(Lb&&document.getElementById(Lb))
 return;
}
}
 $.Ab.Bb=(Ib.srcElement.nodeName==$.M?Ib.srcElement.htmlFor+Ib.x+Ib.y:null);
}

 
 
 if($.Y&&Ib.Mb)
 return;
}

 var P$=false;

 
 $.i$.j$($.k,Ib);

 this.Nb=a$;
 var P$=this.Nb(Ib,Eb);
 this.Nb=null;

 
 $.i$.j$($.l,Ib);

 return P$;
}.E$(b$||Eb);
},

 Ob:function()
{
 this.preventDefault();
 this.stopPropagation();
},
 Pb:function()
{
 this.returnValue=false;
},
 Qb:function()
{
 this.cancelBubble=true;
},

 Jb:function(Ib)
{
 if($.X)
{
 Ib.preventDefault=this.Pb;
 Ib.stopPropagation=this.Qb;
}
 else if($.Y||$.Z)
{
 Ib.srcElement=Ib.target||Ib.currentTarget;
 if(Ib.srcElement&&Ib.srcElement.nodeType==3)
 Ib.srcElement=Ib.srcElement.parentNode;

 if($.Z)
{
 Ib.Rb=Ib.preventDefault;
 Ib.preventDefault=function()
{
 if(this.type==$.H)
{
 var l$=this.srcElement;
 while(l$&&l$.nodeName.toLowerCase()!="a")
 l$=l$.parentNode;

 if(l$)
{
 l$.Sb=l$.href;
 l$.href="javascript://";
 setTimeout(function(){l$.href=l$.Sb;},10);
}
}
 this.Rb();
}
}
}

 Ib.cancel=this.Ob;

 switch(Ib.type)
{
 case $.H:
 case "mousedown":
 case "mouseup":
 case "mousemove":
 Ib.Tb=(!Ib.Ub&&Ib.button==1)||Ib.Ub==1;
 Ib.Mb=Ib.button==2;
 break;
 case $.I:
 case "keyup":
 case "keypress":
 if($.Y&&Ib.srcElement==document.documentElement)
 
 
 Ib.srcElement=document.body;
 break;
}

 return Ib;
}
};
 $.i$={
 Vb:{},
 Wb:function(Fb,a$,b$)
{
 var Xb=this.Vb[Fb]=this.Vb[Fb]||[];

 Xb[Xb.length]={a$:a$,b$:b$};
},
 j$:function(Fb,Yb,Zb)
{
 var Xb=this.Vb[Fb];

 if(!Xb)
 return true;

 var Ib=Zb||{};
 Ib.type=Fb;
 Ib.srcElement=Yb;

 var P$=true;
 for(var i=Xb.length-1;i>=0;i--)
{
 var a$=Xb[i];
 if(a$.b$)
 P$=(a$.a$.apply(a$.b$,[Ib])!=false)&&P$;
 else 
 P$=(a$.a$(Ib)!=false)&&P$;
}
 
 return P$;
}
};
 
 
 
 
 
 
 
 
 
 


 $._c={
 aa:function()
{
 $.i$.Wb($.o,this.$c,this);
 $.i$.Wb($.t,this.ac,this);
},
 $c:function(Ib)
{
 var l$=Ib.srcElement;

 if($.i$.j$($.z,l$))
{
 var bc=Ib.fromValue.split($.f);
 var cc=Ib.toValue.split($.f);

 var dc={};
 for(var i=0;i<bc.length;i++)
 dc[bc[i]]=true;

 var ec=[];
 for(var i=0;i<cc.length;i++)
 if(!dc[cc[i]])
 ec[ec.length]=cc[i];

 this.fc(l$,ec);
}
},
 
 ac:function(Ib)
{
 var l$=Ib.srcElement;

 if($.i$.j$($.z,l$))
{
 $.i$.j$($.G,l$);

 this.fc(l$,[$.F]);
}
},
 fc:function(gc,hc)
{
 
 for(var i=0;i<hc.length;i++)
 $.i$.j$("on"+hc[i],gc);

 var ic="on"+hc.join("|on");
 var jc=gc.getElementsByTagName($.M);
 var kc=jc.length;
 for(var i=0;i<kc;i++)
{
 var lc=jc[i];

 if($.r$.contains(lc,ic))
 $.i$.j$($.C,lc);
}
}
};

 $._c.aa();
 $.Animator=_a={
 mc:(document.documentElement.style.removeAttribute?"removeAttribute":"removeProperty"),
 nc:$.Z,
 oc:{},
 animate:function(pc,qc)
{
 var rc=pc.length;

 if(this.nc)
{
 for(var i=0;i<rc;i++)
{
 var sc=pc[i];
 var l$=sc.element;
 var tc=sc.targetState;

 for(var uc in tc)
 if(qc.removeAfterwards)
 $.Q$.pa(l$,uc);
 else 
 $.Q$.oa(l$,uc,tc[uc]);
}

 if(qc.onFinish)
 qc.onFinish(pc);

 return;
}

 
 if($.W)
{
 document.body.scrollTop-=1;
 document.body.scrollTop+=1;
}

 
 
 
 
 
 
 
 
 
 var vc=10;
 var wc=1<<vc;

 var xc=7;
 var yc=1<<xc;

 var code=[
 "  var tPhase = Math.min(1, (t - TSTART)/DURATION);\n",
 "if (tPhase>=0){\n",
 "  var f = ",_a.zc[qc.profile],";\n",
 "\n" 
];

 var Ac=[];
 var Bc=[];
 var Cc=[];


 for(var i=0;i<rc;i++)
{
 var sc=pc[i];
 var l$=sc.element;
 var id=$.ua.za(l$);
 var tc=sc.targetState;

 for(var uc in tc)
{
 var Dc=uc;
 if(!$.X)
 Dc=uc.replace(/([A-Z])/g,function(qa){return "-"+qa.toLowerCase();});

 var Ec=tc[uc];

 
 var Fc=(sc.currentState&&typeof(sc.currentState[uc])!=$.c)?sc.currentState[uc]:$.Q$.ca(l$,uc);

 if(uc=="zoom")
{
 
 Fc*=100;
 Ec*=10000;
}

 
 switch($.Q$.ea(uc))
{
 case $.Q$.U$:
 _a[id+"el"]=(l$!=document.body||document.compatMode=="BackCompat")?l$:document.documentElement;
 break;
 case $.Q$.W$:
 if($.X)
{
 _a[id+"opacity"]=l$.filters.item($.P);
 break;
}
 else 
 Fc*=100;
 
 default:
 _a[id+"elStyle"]=l$.style;

 if(qc.removeAfterwards)
 Cc.push("_a['",id,"elStyle']['",_a.mc,"']('"+Dc+"');\n");
}

 
 if($.Q$.ea(uc)=="rgb")
 Ec=$.Q$.ka(Ec);

 if(Ec.constructor==Array)
{
 var Gc=[];
 for(var Hc=0;Hc<Ec.length;Hc++)
 Gc[Hc]=Math.floor(Ec[Hc]-Fc[Hc]);
}
 else if(!isNaN(Ec))
{
 var Gc=Math.floor(Ec-Fc);
}

 
 switch($.Q$.ea(uc))
{
 case $.Q$.V$:
 if($.X)
{
 if(uc=="borderColor")
 Bc.push(
 '_a["',id,'elStyle"].',uc,'=["rgb(",',
 '(',Math.floor(yc*(Fc[0]+0.5)),'+colorPhase*',Gc[0],')>>',xc,',",", ',
 '(',Math.floor(yc*(Fc[1]+0.5)),'+colorPhase*',Gc[1],')>>',xc,',",", ',
 '(',Math.floor(yc*(Fc[2]+0.5)),'+colorPhase*',Gc[2],')>>',xc,', ")"].join("");\n' 
);
 else 
 Bc.push(
 '_a["',id,'elStyle"].',uc,'=',
 '((',Math.floor(yc*(Fc[0]+0.5)),'+colorPhase*',Gc[0],')>>',xc,'<<16) | ',
 '((',Math.floor(yc*(Fc[1]+0.5)),'+colorPhase*',Gc[1],')>>',xc,'<<8) | ',
 '((',Math.floor(yc*(Fc[2]+0.5)),'+colorPhase*',Gc[2],')>>',xc,');\n' 
);
}
 else 
 Bc.push(
 '_a["',id,'elStyle"].',uc,'=["rgb(",',
 '(',Math.floor(yc*(Fc[0]+0.5)),'+colorPhase*',Gc[0],')>>',xc,',",", ',
 '(',Math.floor(yc*(Fc[1]+0.5)),'+colorPhase*',Gc[1],')>>',xc,',",", ',
 '(',Math.floor(yc*(Fc[2]+0.5)),'+colorPhase*',Gc[2],')>>',xc,', ")"].join("");\n' 
);
 break;
 case $.Q$.W$:
 Bc.push('_a["',id,(l$.currentStyle?'opacity"].opacity=(':'elStyle"].opacity=(('),yc*(Fc+0.5),'+colorPhase*',Gc,')>>',xc,(l$.currentStyle?';':')/100;'),"\n");
 break;
 case $.Q$.U$:
 Ac.push('_a["',id,'el"].',uc,'=(',wc*(Fc+0.5),'+normalPhase*',Gc,')>>',vc,';\n');
 break;
 case $.Q$.X$:
 Ac.push('_a["',id,'elStyle"].',uc,'=((',Math.floor(wc*(Fc+0.5)),'+normalPhase*',Gc,')>>',vc,')/10000;\n');
 case $.Q$.Y$:
 switch(uc)
{
 case "display":
 Ac.push('_a["',id,'elStyle"].display = "',(Ec=='none'?Fc:Ec),'";\n');
 break;
 case "overflow":
 Ac.push('_a["',id,'elStyle"].overflow = "hidden";');
 break;
}
 break;
 case $.Q$.Z$:
 Ac.push('_a["',id,'elStyle"].',uc,'=((',Math.floor(wc*(Fc+0.5)),'+normalPhase*',Gc,')>>',vc,')\n');
 default:
 Ac.push('_a["',id,'elStyle"].',uc,'=((',Math.floor(wc*(Fc+0.5)),'+normalPhase*',Gc,')>>',vc,')',(uc=='zoom'?'/10000':''),_a.Ic,"\n");
}

}
}

 if(Ac.length>0)
{
 code.push(
 'var normalPhase=Math.round(',wc,'*f);\n',
 
 
 
 Ac.join("")
 
 
);
}
 if(Bc.length>0)
{
 code.push(
 'var colorPhase=Math.round(',yc,'*f);\n',
 
 
 
 Bc.join("")
 
 
);
}

 if(qc.removeAfterwards)
 code.push(
 "",
 "if(t>=TSTOP)",
 "{",
 Cc.join(""),
 "}\n");

 code.push("}\n\n");

 _a.Jc(code,qc.delay,qc.duration,pc,qc.onFinish);
},

 zc:[
 'tPhase',
 'tPhase*tPhase',
 '(2-tPhase)*tPhase',
 '(1-Math.cos('+Math.PI+'*tPhase)/2.0)',
 '(tPhase<0.5?Math.exp(3*Math.log(tPhase*2))/2:1-Math.exp(3*Math.log((1-tPhase)*2))/2)',
 '(-Math.cos('+4*Math.PI+'*tPhase) + 1)/2',
 '(Math.sin('+2*Math.PI+'*tPhase)*0.4+0.6)*Math.sin('+4*Math.PI+'*tPhase)*0.5+0.5' 
],

 Ic:(document.defaultView?" + 'px';\n":";\n"),
 Kc:0,
 Lc:null,
 Mc:1,
 Nc:0,
 Oc:Infinity,
 Pc:500,
 Qc:"",
 Jc:function(Rc,delay,duration,pc,onFinish)
{
 _a.Kc++;
 _a.Mc++;

 for(var i=0;i<pc.length;i++)
 _a.oc[pc[i].element.id]=_a.Mc++;

 if(onFinish)
{
 _a["__onFinish"+_a.Mc]=onFinish;
 _a["__anims"+_a.Mc]=pc;
}

 Sc=[
 "/*** ",_a.Mc," ***/\n",
 "var t=Math.min(tNow, TSTOP);\n",
 Rc.join(""),
 "if(t==TSTOP)\n",
 "{\n",
 "_a.__rC(",_a.Mc,");\n",
(onFinish?("_a.__onFinish"+_a.Mc+"(_a.__anims"+_a.Mc+");"):""),
 "\n}\n",
 "/*** /",_a.Mc," ***/\n"].join("");

 var Tc=+new Date()+delay-_a.Nc;
 var Uc=Tc+duration;
 Sc=Sc.replace(/TSTART/g,Tc);
 Sc=Sc.replace(/DURATION/g,duration);
 Sc=Sc.replace(/TSTOP/g,Uc);
 Sc=Sc.replace(/RUNINDEX/g,_a.Mc);

 if(_a.Lc)
 _a.Vc(pc);

 _a.Qc=_a.Qc+Sc;

 

 _a.Wc=Function("tNow",_a.Qc);

 

 if(!_a.Lc)
{
 _a.Nc=0;
 _a.Oc=Infinity;

 _a.Xc=0;
 _a.Yc=+new Date()-_a.Nc;

 _a.Lc=setInterval(_a.Zc,1);
 _a.Zc();
}
},
 Zc:function()
{
 var Ma=+new Date()-_a.Nc;

 var _d=Ma-_a.Oc;
 if(_d>_a.Pc)
{
 _a.Nc+=_d;
 Ma-=_d;
}

 _a.Oc=Ma;

 
 

 _a.Wc(Ma);
},
 "__rC":function($d)
{
 var ad="/*** "+$d+" ***/";
 var bd="/*** /"+$d+" ***/";
 _a.Qc=_a.Qc.substring(0,_a.Qc.indexOf(ad))+_a.Qc.substring(_a.Qc.indexOf(bd)+bd.length);

 _a.Wc=Function("tNow",_a.Qc);

 _a.cd($d);

 _a.Kc--;
 if(_a.Kc==0)
{
 clearInterval(_a.Lc);
 _a.oc={};
 _a.Lc=null;
}
},
 cd:function($d)
{
 for(var id in _a.oc)
 if(_a.oc[id]==$d)
 delete _a.oc[id];
},
 Vc:function(pc)
{
 var ed=["xxx"];
 var rc=pc.length;
 for(var i=0;i<rc;i++)
{
 var sc=pc[i];
 var id=sc.element.id.replace(/./g,"\\$1");
 var tc=sc.targetState;

 for(var uc in tc)
{
 
 switch(uc)
{
 case 'scrollTop':
 case 'scrollLeft':
 ed.push("|_a\\['",id,"el'\\].",uc,"[^\\n]+\\n");
 break;
 case "opacity":
 ed.push("|_a\\['",id,"opacity'\\][^\\n]+\\n");
 break;
 default:
 ed.push("|_a\\['",id,"elStyle'\\].",uc,"[^\\n]+\\n");
}
}
}

 var fd=ed.join("");
 if(fd)
 _a.Qc=_a.Qc.replace(new RegExp(fd,"g"),"");
}
};


 $.Modifiers=function()
{
 this.delay=0;
 this.duration=300;
 this.profile=this["SLOWFASTSLOW"];
 this.removeAfterwards=false;
 this.onFinish=null;
};

 $.Modifiers.prototype={
 "LINEAR":0,
 "ACCELERATING":1,
 "DECELERATING":2,
 "NORMAL":3,
 "SLOWFASTSLOW":4,
 "BLINK":5,
 "HEARTBEAT":6 
};
 
 
 
 
 
 
 
 
 
 
 
 

 
 
 

 
 
 
 
 



 $.gd={
 hd:[
 "display",
 "overflow",
 "top",
 "left",
 "right",
 "bottom",
 "width",
 "height",
 "backgroundColor",
 "color",
 
 
 
 
 "marginTop",
 
 
 "marginLeft",
 
 
 
 
 "opacity",
 "fontSize" 
],
 jd:0,
 kd:{},
 ld:{},
 md:[],
 nd:[],
 od:false,
 pd:{body:1,div:1,label:1,img:1,li:1,ol:1,ul:1,span:1,td:1,th:1,tr:1,table:1,h1:1,h2:1,h3:1},
 qd:(document.documentElement.style.removeAttribute?"removeAttribute":"removeProperty"),

 aa:function()
{
 
 if(!$.Z)
{
 $.i$.Wb($.k,this.rd,this);
 $.i$.Wb($.l,this.sd,this);
 $.i$.Wb($.m,this.ud,this);
 $.i$.Wb($.r,this.ud,this);
}
},
 vd:function(wd)
{
 $.D=wd;
},
 xd:function(yd)
{
 var zd={};
 for(var i=0;i<yd.length;i++)
 zd[yd[i]]=1;
 this.pd=zd;
},
 Ad:function(Bd)
{
 this.hd=Bd;
},
 rd:function()
{
 this.md={};
 this.nd=[];
 this.od=false;
 this.kd={};
},
 ud:function(Ib)
{
 var l$=Ib.srcElement;

 var Cd=(
 Ib.type=="beforeChangeClassName" 
&&$.r$.Wa(Ib.toValue,$.S)
);

 if(Cd||!$.r$.contains(l$,$.T))
 this.Dd(l$,this.jd++,Cd);
},
 Ed:function(Fd,l$,Gd,Hd)
{
 if(Hd||$.r$.contains(l$,$.S))
{
 var Id=$.ua.za(l$);
 if(!this.kd[Id])
 Fd[Id]={l$:l$,Gd:Gd};
}
},
 Dd:function(gc,Gd,Cd)
{
 if(!$._$.Jd)
{
 var Kd={};

 this.Ed(Kd,gc,Gd,Cd);

 for(var Ld in this.pd)
{
 var Ea=gc.getElementsByTagName(Ld);
 var Md=Ea.length;
 for(var i=0;i<Md;i++)
 this.Ed(Kd,Ea[i],Gd);
}

 this.od=true;
 this.Nd(Kd,true);

 for(var Id in Kd)
 this.kd[Id]=Kd[Id];
}
},

 sd:function()
{
 if(this.od)
{
 
 
 for(var Id in this.kd)
 if(!$.ua.Na(this.kd[Id].element))
{
 var l$=document.getElementById(Id);
 if(l$)
 this.kd[Id].element=document.getElementById(Id);
 else 
 delete this.kd[Id];
}

 this.Od(this.kd);
 this.Nd(this.kd,false);
 this.Pd(this.kd);

 var Qd=this.Rd();
 this.Sd(Qd);
}

 if(this.nd.length>0)
 var Td=this.Ud();

 this.rd();

 if(Qd)
 this.Vd(Qd);
 if(Td)
 this.Vd(Td);
},
 Od:function(Fd)
{
 for(var Id in Fd)
{
 if(!$.Animator.oc[Id])
 continue;

 var Wd=Fd[Id];
 var l$=Wd.element;

 for(var w$ in Wd.Xd)
{
 var x$=l$.style[w$];
 if(x$)
{
 Wd.Yd[w$]=x$;
 l$.style[this.qd](w$);
}
}
}
},
 Pd:function(Fd)
{
 for(var Id in Fd)
{
 if(!$.Animator.oc[Id])
 continue;

 var Wd=Fd[Id];
 var l$=Wd.element;
 for(var w$ in Wd.Yd)
 l$.style[w$]=Wd.Yd[w$];
}
},
 Nd:function(Fd,Zd)
{
 var _e=[];
 var Wd=null;

 for(var Id in Fd)
{
 if(Zd)
 Fd[Id]=Wd={
 Gd:Fd[Id].Gd,
 element:Fd[Id].l$,
 Yd:{},
 Xd:{},
 $e:{}
};
 else 
 Wd=Fd[Id];

 var l$=Wd.element;
 var ae=(Zd?Wd.Xd:Wd.$e);

 for(var i=0;i<this.hd.length;i++)
{
 var w$=this.hd[i];
 ae[w$]=$.Q$.ca(l$,w$);

 if(w$==$.g&&ae[w$]==$.j)
{
 _e[_e.length]=l$;
 l$.style.display=$.h;
}

 if(!Zd)
{
 
 if(
 w$==$.g 
&&ae.display==$.j 
&&Wd.Xd.display==$.j 
)
{
 delete Fd[Id];
 break;
}
}
}
}

 for(var i=0;i<_e.length;i++)
 $.Q$.pa(_e[i],$.g);
},
 Rd:function()
{
 var Qd={};
 var be={};
 for(var Id in this.kd)
{
 var Wd=this.kd[Id];
 var l$=Wd.element;
 var currentState={};
 var targetState={};
 var ce=false;
 for(var w$ in Wd.$e)
{
 var da=$.Q$.ea(w$);
 var de=Wd.Xd[w$];
 var ee=Wd.$e[w$];

 if(ee==null)
 continue;

 switch(da)
{
 case $.Q$.V$:
 if(!de||!ee||$._$.B$(de,ee))
 continue;
 break;
 default:
 if(de==ee)
 continue;
}

 ce=true;
 currentState[w$]=de;
 targetState[w$]=ee;
}

 if(ce)
{
 if(
 targetState.borderTopColor 
&&targetState.borderRightColor 
&&targetState.borderBottomColor 
&&targetState.borderLeftColor 
&&$._$.B$(targetState.borderTopColor,targetState.borderRightColor)
&&$._$.B$(targetState.borderRightColor,targetState.borderBottomColor)
&&$._$.B$(targetState.borderBottomColor,targetState.borderLeftColor)
&&$._$.B$(currentState.borderTopColor,currentState.borderRightColor)
&&$._$.B$(currentState.borderRightColor,currentState.borderBottomColor)
&&$._$.B$(currentState.borderBottomColor,currentState.borderLeftColor)
)
{
 currentState.borderColor=currentState.borderTopColor;
 targetState.borderColor=targetState.borderTopColor;
 delete targetState.borderTopColor;
 delete targetState.borderRightColor;
 delete targetState.borderBottomColor;
 delete targetState.borderLeftColor;
}

 var delay=$._$.s$(l$,$.U,0);
 var duration=$._$.s$(l$,$.V,$.D);
 var fe=Qd[delay]=Qd[delay]||{};
 var pc=fe[duration]=fe[duration]||[];

 pc[pc.length]={
 Gd:Wd.Gd,
 element:l$,
 currentState:currentState,
 targetState:targetState 
};
}
}
 return Qd;
},
 Vd:function(Qd)
{
 for(var delay in Qd)
{
 delay*=1;
 for(var duration in Qd[delay])
{
 duration*=1;
 var pc=Qd[delay][duration];
 for(var i=0;i<pc.length;i++)
{
 var sc=pc[i];
 for(var w$ in sc.currentState)
 $.Q$.oa(sc.element,w$,sc.currentState[w$]);
}

 var qc=new $.Modifiers();
 qc.delay=1*delay;
 qc.duration=1*duration;
 qc.removeAfterwards=true;


 $.Animator.animate(pc,qc);
}
}
},
 Sd:function(ge)
{
 for(var delay in ge)
{
 delay*=1;
 for(var duration in ge[delay])
{
 duration*=1;
 var pc=ge[delay][duration];
 for(var i=0;i<pc.length;i++)
{
 var sc=pc[i];
 if(this.md[sc.Gd])
{
 var fromValue=this.md[sc.Gd].fromValue;
 var toValue=this.md[sc.Gd].toValue;

 var sa=this.ld[fromValue]||(this.ld[fromValue]={});
 sa=sa[toValue]||(sa[toValue]={});

 var a=sa[delay]||(sa[delay]={});
 a=a[duration]||(a[duration]=[]);
 a[a.length]=sc;
}
}
}
}
},
 Ud:function()
{
 var pc={};

 for(var i=0;i<this.nd.length;i++)
{
 var he=this.nd[i];

 var as=this.ld[he.fromValue][he.toValue];

 for(var delay in as)
{
 delay*=1;
 for(var duration in as[delay])
{
 duration*=1;
 var x=pc[delay]||(pc[delay]={});
 x=x[duration]||(x[duration]=[]);
 for(var Hc=0;Hc<as[delay][duration].length;Hc++)
{
 as[delay][duration][Hc].element=he.l$;
 x[x.length]=as[delay][duration][Hc];
}
}
}
}
 return pc;
}
};

 $.gd.aa();
 
 
 
 
 
 
 
 
 
 
 

 $.ie={
 je:[],
 ke:null,
 le:{},
 me:{},
 ne:null,
 oe:null,
 pe:false,
 aa:function()
{
 $.Ab.Db(document.documentElement,$.H,this.qe,this);
 $.Ab.Db(document.documentElement,$.I,this.qe,this);
},
 re:function(Ha,a$,b$)
{
 this.se(Ha,a$,b$,true);
},
 te:function(Ha,a$,b$)
{
 this.se(Ha,a$,b$,false);
 this.pe=true;
},
 se:function(Ha,a$,b$,ue)
{
 this.je[this.je.length]=Ha;
 this.le[Ha]={a$:a$,b$:b$};
 this.me[Ha]=ue;

 this.je=this.je.sort().reverse();

 this.ke=new RegExp("(\\b"+this.je.join("\\b)|(\\b")+"\\b)|(\\b[\\w\\-]+\\b|\\s+)","g");
},
 qe:function(Ib)
{
 this.oe=(Ib.type==$.H||Ib.keyCode==13||Ib.keyCode==32);

 if(!this.pe&&!this.oe)
 return;

 this.ne=Ib;
 var Ea=[];

 for(var l$=Ib.srcElement;l$&&l$.nodeType==1;l$=l$.parentNode)
 Ea[Ea.length]=l$;

 
 for(var i=Ea.length-1;i>=0;i--)
{
 this.ve=Ea[i];
 if(this.ve.className)
 this.ve.className.replace(this.ke,this.we);
}
},
 we:function()
{
 var zb=$.ie;
 for(var i=1;i<arguments.length-3;i++)
 if(arguments[i])
{
 var Ha=zb.je[i-1];
 if(zb.me[Ha]&&!zb.oe)
 continue;

 var a$=zb.le[Ha];
 if(a$.b$)
 a$.a$.apply(a$.b$,[zb.ve,arguments[i],zb.ne]);
 else 
 a$.a$(zb.ve,arguments[i],zb.ne);
 return;
}
}
};

 $.ie.aa();
 
 
 


 $.xe={
 ye:[],
 ze:"",
 Ae:{},
 Be:{},

 aa:function()
{
 $.Ab.Db(document.documentElement,$.H,this.Ce,this);
 $.Ab.Db(document.documentElement,"keypress",this.De,this);
 $.i$.Wb($.C,this.Ee,this);
},
 Fe:function(Ge,He,Ie,b$)
{
 var Je="("+He.join("|")+")";
 for(var i=0;i<Ge.length;i++)
{
 var Ke=Ge[i];
 this.ye[this.ye.length]=Ke;
 this.Ae[Ke]=Je;
 this.Be[Ke]={a$:Ie,b$:b$};
}

 this.ze="("+this.ye.join("|")+")";
},
 Ce:function(Ib)
{
 this.Ee(Ib);
},
 De:function(Ib)
{
 if(Ib.keyCode==32||Ib.keyCode==13)
 this.Ee(Ib);
},
 Le:function(Ib)
{
 this.Ee(Ib);
},
 Ee:function(Ib)
{
 if(this.ze)
{
 var l$=Ib.srcElement;
 var Ge=null;

 
 while(l$&&l$.nodeType==1)
{
 
 
 if(Ib&&Ib.type=="keypress"&&l$.nodeName=="A")
 return;

 if(l$&&(Ge=$.r$.match(l$,this.ze)))
{
 if($.i$.j$($.z,l$))
{
 var Me=l$;

 for(var i=0;i<Ge.length;i++)
{
 var Ke=Ge[i];
 if(!Ke)
 continue;

 var Ne=this.Oe(Me,Ke);

 if(!Ne||!Ne.l$||!$.i$.j$($.z,Ne.l$))
 continue;

 var a$=this.Be[Ke];
 if(a$.b$)
 a$.a$.apply(a$.b$,[Me,Ke,Ne.l$,Ne.Pe]);
 else 
 a$.a$(Me,Ke,Ne.l$,Ne.Pe);
}
}
}
 l$=l$.parentNode;
}
}
},

 Oe:function(Me,Ke)
{
 var Qe=null;
 var Re=this.Se(Me);

 if(!Re)
 
 for(var l$=Me;!Re&&l$!=document.documentElement;l$=l$.parentNode)
 if(Qe=$.r$.match(l$,this.Ae[Ke]))
 Re=l$;

 if(Re&&!Qe)
 Qe=$.r$.match(Re,this.Ae[Ke]);

 return(Re&&Qe?{l$:Re,Pe:Qe[0]}:null);
},
 Se:function(lc)
{
 var Te=lc.htmlFor||lc["for"];
 return(Te?document.getElementById(Te):null);
}
};

 $.xe.aa();
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

 $.Ue={
 Ve:"once",
 We:"ensureLoad",
 Xe:"keepContent",

 Ye:{},
 aa:function()
{
 $.ie.re(this.Ve,this.Ze,this);
 $.i$.Wb($.w,this._f,this);
 $.i$.Wb($.C,this.$f,this);
},
 Ze:function(l$)
{
 if($.r$.contains(l$,this.We))
 this.Ye[l$.href]=l$;
 else 
 setTimeout(function(){$.Ue.af(l$);},0);
},
 $f:function(Ib,l$)
{
 var l$=Ib.srcElement;
 if($.r$.contains(l$,this.Ve))
 this.Ze(l$);
},
 _f:function(Ib)
{
 var l$=this.Ye[Ib.url];
 if(l$)
{
 this.af(l$);
 delete this.Ye[Ib.url];
}
},
 af:function(l$)
{
 if($.r$.contains(l$,this.Xe))
 while(l$.firstChild)
 l$.parentNode.insertBefore(l$.firstChild,l$)
 $.ua.Aa(l$,true);
}
};

 $.Ue.aa();
 
 
 
 
 
 
 
 
 
 

 $.i$.Wb(
 $.z,
 function(Ib)
{
 return!$.ua.Ga(Ib.srcElement,"actions-disabled");
}
);
 $.bf={
 cf:"exclusive",
 df:"allexclusive",
 ef:"delayexclusive",

 ff:{},
 gf:{},
 hf:{},
 jf:{},
 kf:{},
 lf:{},

 mf:function(Ge,nf,of,pf)
{
 var qf=nf[nf.length-1];
 for(var i=0;i<Ge.length;i++)
{
 var Ke=Ge[i];
 var rf=nf[i];

 this.hf[qf]=rf;
 this.jf[rf]=qf;

 qf=rf;

 this.ff[Ke]=rf;
 this.gf[rf]=Ke;
}

 if(of)
{
 Ge[Ge.length]=of;
 this.kf[of]=true;
 this.ff[of]=nf[0];
}
 if(pf)
{
 Ge[Ge.length]=pf;
 this.lf[pf]=true;
 this.ff[pf]=nf[0];
}

 $.xe.Fe(Ge,nf,this.sf,this);
},
 sf:function(Me,Ke,Re,tf)
{
 var uf=[];
 this.vf(uf,Ke,Re,tf);

 for(var i=0;i<uf.length;i++)
 this.wf(uf[i]);

},
 vf:function(uf,Ke,Re,tf)
{
 var xf=this.ff[Ke];

 if(this.kf[Ke])
{
 xf=this.hf[tf];
 Ke=this.gf[xf];
}
 else if(this.lf[Ke])
{
 xf=this.jf[tf];
 Ke=this.gf[xf];
}

 if(!$.r$.contains(Re,xf))
{
 uf[uf.length]={
 Ke:Ke,
 Re:Re,
 yf:tf,
 xf:xf,
 delay:0 
};

 var zf=null;
 var Af=null;
 if($.ua.Ga(Re,this.cf+xf))
 Af=Re.parentNode.childNodes;
 else if(zf=$.ua.Ga(Re,this.df+xf))
 Af=zf[0].getElementsByTagName($.d);
 if(Af)
{
 var Bf=this.hf[xf];
 var Cf=this.gf[Bf];

 var Df=Af.length;
 for(var i=0;i<Df;i++)
{
 var Ef=Af[i];

 if(Ef.nodeType!=1||Ef==Re||!$.r$.contains(Ef,xf))
 continue;

 if(!$.i$.j$($.z,Ef))
 continue;

 if(uf.length>0&&uf[uf.length-1].delay==0)
 uf[uf.length-1].delay=$._$.s$(Re.parentNode,this.ef,0);

 this.vf(uf,Cf,Ef,xf);
}
}
}
},
 
 wf:function(Ff)
{
 if(Ff.delay)
{
 $._$.$$(function(){$.bf.wf(Ff);},Ff.delay);
 Ff.delay=0;
 return;
}

 
 $.r$.replace(Ff.Re,Ff.yf,Ff.xf,$.R);
}
};
 $.Gf={
 aa:function()
{
 $.xe.Fe(["classchanger"],[],this.sf,this);
},
 sf:function(Me,Ke,Re,tf)
{
 var delay=$._$.s$(Me,$.U,0);

 if(delay==0)
 this.Hf(Re,Me.className);
 else 
 $._$.$$(function(){$.Gf.Hf(Re,Me.className);},delay);
},
 Hf:function(l$,If)
{
 var rb=$.r$.ob(l$.className,If);
 $.r$.lb(l$,rb);
}
};

 $.Gf.aa();
 $.Jf=
{
 Kf:null,
 Lf:[],
 Mf:[],
 Nf:[],
 Of:[],
 Pf:null,
 Qf:null,
 Rf:null,
 Sf:{},
 aa:function()
{
 $.Ab.Db(document.documentElement,$.H,this.Tf,this);
 $.Ab.Db(document.documentElement,"keyup",this.Tf,this);

 $.i$.Wb($.o,this.$c,this);
},
 mf:function(Uf,Vf,Wf)
{
 this.Mf.push(Uf);
 this.Nf.push(Vf);
 if(Wf)
{
 this.Of.push(Uf);
 this.Of.push(Vf);
}
 this.Pf=this.Mf.join("|");
 this.Qf=this.Nf.join("|");
 this.Rf=this.Of.join("|");
 this.Xf=this.Mf.join("|")+"|"+this.Nf.join("|");
 this.Sf[Uf]=Vf;
 this.Sf[Vf]=Uf;
},
 Tf:function(Ib)
{
 var l$=Ib.srcElement;

 if($.ua.Ga(l$,"activation-inert"))
 return;

 if(l$!=this.Kf)
{
 this.Kf=l$;

 var Yf=[];
 for(;l$&&l$.nodeType==1;l$=l$.parentNode)
 if($.r$.contains(l$,this.Xf))
 Yf.push(l$);

 
 Yf.reverse();

 
 var Zf=[];
 for(var i=0;i<this.Lf.length;i++)
 if(this.Lf[i]!=Yf[i])
{
 for(var Hc=this.Lf.length-1;Hc>=i;Hc--)
 Zf.push(this.Lf[Hc]);
 break;
}

 
 this._g(Zf);

 
 var $g=[];
 var ag=[];
 for(var Hc=i;Hc<Yf.length;Hc++)
{
 var l$=Yf[Hc];
 if($.r$.contains(l$,this.Rf))
 ag.push(l$);
 else 
 $g.push(l$);

 $._$.v$(l$,"active",true);
}

 
 if(ag.length>0)
 if(Zf.length>0)
{
 
 var zb=this;
 $._$.$$(function(){zb.bg(ag);},$.D/1.5);
}
 else 
 
 this.bg(ag);

 if($g.length>0)
 
 this.bg($g);

 this.Lf=Yf;
}
},
 $c:function(Ib,l$)
{
 if($.r$.Wa(Ib.toValue,"active")&&!$.r$.Wa(Ib.fromValue,"active"))
 this.Tf(Ib);
},

 _g:function(Ea)
{
 for(var i=0;i<Ea.length;i++)
 this.cg(Ea[i]);
},
 cg:function(l$)
{
 if($.i$.j$($.z,l$))
{
 var dg=$.r$.match(l$,this.Qf);
 if(dg)
{
 for(var i=0;i<dg.length;i++)
{
 var Vf=dg[i];
 $.r$.replace(l$,Vf,this.Sf[Vf]);
 $.i$.j$($.B,l$);
}
}
 $._$.v$(l$,"active",false);
}
},

 bg:function(Ea)
{
 for(var i=0;i<Ea.length;i++)
 this.eg(Ea[i]);
},
 eg:function(l$)
{
 if($._$.A$(l$,"active"))
{
 if($.i$.j$($.z,l$))
{
 var dg=$.r$.match(l$,this.Pf);
 if(dg)
 for(var i=0;i<dg.length;i++)
{
 var Uf=dg[i];
 $.r$.replace(l$,Uf,this.Sf[Uf]);
 $.i$.j$($.A,l$);
}
}
}
}
};

 $.Jf.aa();
 
 
 
 
 
 
 
 

 $.fg={
 gg:500,
 hg:null,
 ig:[],
 jg:[],
 kg:null,
 lg:null,
 mg:0,
 ng:{},
 og:null,
 Sf:{},
 pg:{},
 aa:function()
{
 
 this.mf("mouseout","mouseover",false);
 this.mf("unhover","hover",false);

 $.Ab.Db(document,"mouseover",this.qg,this);

 $.i$.Wb($.A,this.qg,this);
 $.i$.Wb($.B,this.rg,this);
},
 mf:function(sg,tg,ug)
{
 this.ig.push(sg);
 this.jg.push(tg);
 this.vg=this.ig.join("|");
 this.wg=this.jg.join("|");
 this.Sf[sg]=tg;
 this.Sf[tg]=sg;
 this.pg[sg]=ug;
 this.pg[tg]=ug;
},
 qg:function(Ib)
{
 var l$=Ib.srcElement;

 if(this.mg>0)
{
 var xg={};
 var yg=false;
 for(var id in this.ng)
{
 var zg=this.ng[id].l$;
 if(!$.ua.Oa(zg,l$))
{
 if($.i$.j$($.z,zg))
{
 var sg=this.ng[id].sg;
 var tg=this.Sf[sg];

 if(this.pg[tg])
{
 xg[id]={
 l$:zg,
 tg:tg,
 sg:sg 
};
 yg=true;
}
 else 
 this.Ag(zg,id,tg,sg);
}
}
}

 if(yg)
 this.Bg(xg);
}


 while(l$&&l$.nodeType==1)
{
 var Cg=$.r$.match(l$,this.vg);
 if(Cg)
{
 for(var i=0;i<Cg.length;i++)
{
 var sg=Cg[i];

 if(this.pg[sg])
 this.Dg();

 if(!$.i$.j$($.z,l$))
 continue;

 $.r$.replace(l$,sg,this.Sf[sg]);
 this.ng[$.ua.za(l$)]={
 l$:l$,
 sg:sg 
};
 this.mg++;
}
}

 l$=l$.parentNode;
}
},

 rg:function(Ib)
{
 
},

 Bg:function(xg)
{
 if(!this.og)
 this.og=xg;
 else 
 for(var id in xg)
 this.og[id]=xg[id];

 if(this.hg)
 clearTimeout(this.hg);
 this.hg=$._$.$$(this.Dg,this.gg,this);
},
 Dg:function()
{
 for(var id in this.og)
{
 var Eg=this.og[id];
 this.Ag(Eg.l$,id,Eg.tg,Eg.sg);
}

 this.og=null;

 if(this.hg)
{
 clearTimeout(this.hg);
 this.hg=null;
}
},
 Ag:function(zg,id,tg,sg)
{
 $.r$.replace(zg,tg,sg);
 delete this.ng[id];
 this.mg--;
}

};

 $.fg.aa();
 with($)
{
 
 
 var Fg="spif "+_$.platform+(X?" ie"+document.compatMode:"");
 r$.add(document.documentElement,Fg,Q);

 Ab.Db(
 window,
 "load",
 function()
{
 i$.j$(t,document.body);
}
);

 if($.bf)
{
 
 bf.mf(["collapser","expander"],["collapsed","expanded"],"expandcollapser");
 bf.mf(["opener","closer"],["open","close"],"opencloser");
 bf.mf(["selector","unselector"],["selected","unselected"],"selectionswitch");
 bf.mf(["shower","hider"],["shown","hidden"],"showswitch");
 bf.mf(["activator","inactivator"],["active","inactive"],"activationswitch");
 bf.mf(["focuser","blurrer"],["focus","blur"],"focusswitch");
}

 if($.Jf)
{
 
 Jf.mf("inactive","active",false);
 Jf.mf("blur","focus",true);
}
}
 $["isIE"]=$.X;
 $["isOpera"]=$.W;
 $["isGecko"]=$.Y;
 $["isSafari"]=$.Z;
 $["DEFAULTMORPHDURATION"]=$.D;

 with($)
{

 if($._$)
{
 $["Utils"]=_$;
 _$["setTimeoutHandler"]=_$.$$;
 _$["setIntervalHandler"]=_$.e$;
 _$["SUPPRESSEVENTS"]=Q;
 _$["FIREEVENTS"]=R;
}

 if($.r$)
{
 $["ClassNameAbstraction"]=r$;
 r$["addClassNameSequence"]=r$.Ta;
 r$["contains"]=r$.contains;
 r$["add"]=r$.add;
 r$["replace"]=r$.replace;
 r$["toggle"]=r$.ib;
 r$["remove"]=r$.remove;
 r$["set"]=r$.lb;
}

 
 
 

 if($.Ab)
{
 $["DOMEvents"]=Ab;
 Ab["attach"]=Ab.Db;
}
 
 if($.ua)
{
 
 
 
 
}

 if($.Q$)
{
 
 
 
 
}

 
 
 

 if($.bf)
{
 $["Behaviors"]=bf;
 bf["addStateSequence"]=bf.mf;

 
 bf.mf(["collapser","expander"],["collapsed","expanded"],"expandcollapser");
 bf.mf(["opener","closer"],["open","close"],"opencloser");
 bf.mf(["selector","unselector"],["selected","unselected"],"selectionswitch");
 bf.mf(["shower","hider"],["shown","hidden"],"showswitch");
 bf.mf(["activator","inactivator"],["active","inactive"],"activationswitch");
 bf.mf(["focuser","blurrer"],["focus","blur"],"focusswitch");
}

 if($.Gg)
{
 $["Bookmarker"]=Gg;
 Gg["addPrettyHash"]=Gg.Hg;
 Gg["setDefaultFrameName"]=Gg.Ig;
 Gg["setLoadFromBookmarkArgument"]=Gg.Jg;
}

 
 
 
 
 
 
 

 
 
 
 
 
 

 
 
 
 
 
 
 

 
 
 
 
 

 if($.gd)
{
 $["StyleMorpher"]=gd;
 gd["setMorphDuration"]=gd.vd;
 gd["setMorphableNodeNames"]=gd.xd;
 gd["setMorphableProperties"]=gd.Ad;
}
}
