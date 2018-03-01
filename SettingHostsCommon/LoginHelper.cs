using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SettingHostsCommon
{
    public class LoginHelper
    {
        /// <summary>
        /// 获取用户列表
        /// </summary>
        /// <returns></returns>
        private static Dictionary<string, string> UserList()
        {
            string[] login = AppConfig.Admin.Split('|');
            return login.ToDictionary(item => item.Split(',')[0].ToString(), item => item.Split(',')[1].ToString());
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="sUserName">登录的账号</param>
        /// <param name="sUserPass">登录的密码</param>
        /// <returns></returns>
        public static Result Login(string sUserName, string sUserPass)
        {
            var userList = UserList();
            var pass = string.Empty;

            if (!userList.TryGetValue(sUserName, out pass) || !sUserPass.Equals(pass))
            {
                return Result.Fail("用户名密码有误");
            }

            SessionHelper.Add("UserInfo", sUserName);
            return Result.Success();
        }

        /// <summary>
        /// 退出登录
        /// </summary>
        public static void LoginOut()
        {
            SessionHelper.Delete("UserInfo");
            HttpContext.Current.Session.Abandon();
        }

    }
}
