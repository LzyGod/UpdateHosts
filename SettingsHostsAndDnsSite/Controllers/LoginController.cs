using SettingHostsCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SettingsHostsAndDnsSite.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="uname">用户名</param>
        /// <param name="upass">密码</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Login(string uname, string upass)
        {
            return Json(LoginHelper.Login(uname, upass));
        }

        /// <summary>
        /// 用户退出
        /// </summary>
        /// <returns></returns>
        public ActionResult LoginOut()
        {
            LoginHelper.LoginOut();
            return RedirectToAction("Index", "Login");
        }
    }
}