using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using log4net;
using Qsite2012.Models;

namespace Qsite2012.Controllers
{
  [ValidateInput(false)]
  public class ErrorController : Controller
  {
    [PreventDirectAccess]
    public ActionResult ServerError()
    {
      return View("Exception", new ErrorModel() { StatusCode = 500 });
    }

    [PreventDirectAccess]
    public ActionResult AccessDenied()
    {
      return View("Exception", new ErrorModel() { StatusCode = 403 });
    }

    public ActionResult NotFound()
    {
      return View("404", new ErrorModel() { StatusCode = 404 });
    }

    [PreventDirectAccess]
    public ActionResult OtherHttpStatusCode(int httpStatusCode)
    {
      return View("Exception", new ErrorModel() { StatusCode = httpStatusCode });
    }

    /// <summary>
    /// small attribute to prevent direct access of the actionresults but only allow via global.asax application_error
    /// </summary>
    private class PreventDirectAccessAttribute : FilterAttribute, IAuthorizationFilter
    {
      public void OnAuthorization(AuthorizationContext filterContext)
      {
        object value = filterContext.RouteData.Values["fromAppErrorEvent"];
        if (!(value is bool && (bool)value))
          filterContext.Result = new ViewResult { ViewName = "404" };
      }
    }
  }
}