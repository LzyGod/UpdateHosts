using DAL;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SettingsHostsAndDnsSite.Controllers
{
    public class GetInfoController : Controller
    {
        public string GetHosts(string token)
        {
            if (token == "chezhanayu")
            {
                BaseDAL<t_Hosts> hostsDal = new BaseDAL<t_Hosts>();
                string result = "";
                var hostsList = hostsDal.GetModels(t => true);
                foreach (var hosts in hostsList)
                {
                    result += hosts.ipAddress + "," + hosts.DomainName + "|";
                }
                if (!string.IsNullOrEmpty(result))
                {
                    result = result.Substring(0, result.Length - 1);
                }
                return result;
            }
            return "";
        }

        public string GetDns(string token)
        {
            if (token == "chezhanayu")
            {
                BaseDAL<t_Dns> DnsDal = new BaseDAL<t_Dns>();
                string result = "";
                var Dns = DnsDal.GetModels(t => true).FirstOrDefault();
                result += Dns.MainDns + "," + Dns.BackUpDns;
                return result;
            }
            return "";
        }
    }
}