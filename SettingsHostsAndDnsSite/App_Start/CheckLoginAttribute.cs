using SettingHostsCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace SettingsHostsAndDnsSite
{
    public class CheckLoginAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool Pass = false;
            if (SessionHelper.Get("UserInfo") == null)
            {
                httpContext.Response.StatusCode = 401;//无权限状态码  
                Pass = false;
            }
            else
            {
                Pass = true;
            }

            return Pass;
        }



        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            base.HandleUnauthorizedRequest(filterContext);
            if (filterContext.HttpContext.Response.StatusCode == 401)
            {
                filterContext.Result = new RedirectResult("/");
            }
        }
    }
}