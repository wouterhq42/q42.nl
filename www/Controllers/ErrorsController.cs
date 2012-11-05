using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using log4net;

namespace Qsite2012.Controllers
{
  public class ErrorsController : Controller
  {
    public ActionResult General(Exception exception)
    {
      return View("Exception", exception);
    }

    public ActionResult Http404()
    {
      return View("404");
    }
  }
}