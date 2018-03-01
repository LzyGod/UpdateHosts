using System.Collections.Generic;
using System.Linq;
using System.Configuration;
using System.Web;

namespace SettingHostsCommon
{
    public class AppConfig
    {
        private static string _admin;
        /// <summary>
        /// 后台登录帐号密码
        /// </summary>
        public static string Admin
        {
            get
            {
                if (string.IsNullOrEmpty(_admin))
                {
                    _admin = ConfigurationManager.AppSettings["admin"];
                }
                return _admin;
            }
        }
        private static string _timingInterval = string.Empty;
        /// <summary>
        /// 定时间隔（单位：小时）
        /// </summary>
        public static string TimingInterval
        {
            get
            {
                if (string.IsNullOrEmpty(_timingInterval))
                {
                    _timingInterval = ConfigurationManager.AppSettings["TimingInterval"];
                }
                return _timingInterval;
            }
        }

        private static List<string> _MachinePath = new List<string>();
        /// <summary>
        /// 远程服务器地址
        /// </summary>
        public static List<string> MachinePath
        {
            get
            {
                if (_MachinePath.Count == 0)
                {
                    _MachinePath = ConfigurationManager.AppSettings["MachinePath"].Split('|').ToList();
                }
                return _MachinePath;
            }
        }
        private static List<string> _LogUser = new List<string>();
        /// <summary>
        /// 远程服务器用户名
        /// </summary>
        public static List<string> LogUser
        {
            get
            {
                if (_LogUser.Count == 0)
                {
                    _LogUser = ConfigurationManager.AppSettings["LogUser"].Split('|').ToList();
                }
                return _LogUser;
            }
        }
        private static List<string> _LogPass = new List<string>();
        /// <summary>
        /// 远程服务器密码
        /// </summary>
        public static List<string> LogPass
        {
            get
            {
                if (_LogPass.Count == 0)
                {
                    _LogPass = ConfigurationManager.AppSettings["LogPass"].Split('|').ToList();
                }
                return _LogPass;
            }
        }


        private static string _SQLitePath = string.Empty;
        public static string SQLitePath
        {
            get
            {
                if (string.IsNullOrEmpty(_SQLitePath))
                {
                    _SQLitePath = HttpContext.Current.Server.MapPath(ConfigurationManager.ConnectionStrings["SqlliteEF6"].ConnectionString);
                }
                return _SQLitePath;
            }
        }

        private static string _dataEntities = string.Empty;
        public static string DataEntities
        {
            get
            {
                if (!string.IsNullOrEmpty(_dataEntities)) return _dataEntities;
                _dataEntities = ConfigurationManager.ConnectionStrings["DataEntities"].ConnectionString;
                var splitData = _dataEntities.Split('|');
                _dataEntities = splitData[splitData.Length - 1];
                return _dataEntities;
            }
        }
    }
}
