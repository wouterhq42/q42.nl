using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using log4net;

namespace Qsite2012.Controllers
{
  public class PageController : Controller
  {
    public ActionResult Index(string id)
    {
      return View(id);
    }

    public ActionResult Home()
    {
      return View();
    }

    public ActionResult Error()
    {
      return View();
    }


  }
}
