using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using log4net;
using log4net.Config;
using Qsite2012.Controllers;

namespace Qsite2012
{
  // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
  // visit http://go.microsoft.com/?LinkId=9394801

  public class MvcApplication : HttpApplication
  {
    private static ILog log;

    public static void RegisterGlobalFilters(GlobalFilterCollection filters)
    {
      filters.Add(new HandleErrorAttribute());
    }

    public static void RegisterRoutes(RouteCollection routes)
    {
      routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

      routes.MapRoute(
          "Default", // Route name
          "{id}", // URL with parameters
          new { controller = "Page", action = "Index" },
          new { id = "Games|Gereegschapskist|Interaction-Engineering|Over-Q42|Producten|Projecten|Systeembeheersysteem" } // regular expression matching all valid controllers
      );

      routes.MapRoute(
         "Home", // Route name
         "", // URL with parameters
         new { controller = "Page", action = "Home", id = UrlParameter.Optional } // Parameter defaults
      );

    }

    protected void Application_Start()
    {
      XmlConfigurator.Configure();
      log = LogManager.GetLogger(typeof(MvcApplication));
      log.Info("Starting website");

      AreaRegistration.RegisterAllAreas();

      RegisterGlobalFilters(GlobalFilters.Filters);
      RegisterRoutes(RouteTable.Routes);

    }

    protected void Application_Error()
    {
      var exception = Server.GetLastError();
      var httpException = exception as HttpException;
      Response.Clear();
      Server.ClearError();
      var routeData = new RouteData();
      routeData.Values["controller"] = "Errors";
      routeData.Values["action"] = "General";
      routeData.Values["exception"] = exception;
      Response.StatusCode = 500;
      if (httpException != null)
      {
        Response.StatusCode = httpException.GetHttpCode();
        switch (Response.StatusCode)
        {
          case 404:
            routeData.Values["action"] = "Http404";
            break;
        }
      }
      // Avoid IIS7 getting in the middle
      Response.TrySkipIisCustomErrors = true;
      IController errorsController = new ErrorsController();
      HttpContextWrapper wrapper = new HttpContextWrapper(Context);
      var rc = new RequestContext(wrapper, routeData);
      errorsController.Execute(rc);
    }
  }
}