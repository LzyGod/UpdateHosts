using SettingHostsCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SettingsHostsAndDnsSite.Controllers
{
    [CheckLogin]
    public class MainController : Controller
    {
        /// <summary>
        /// 框架页面
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            ViewBag.UserName = SessionHelper.GetStr("UserInfo");
            return View();
        }

        /// <summary>
        /// 框架首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Main()
        {
            return View();
        }
    }
}