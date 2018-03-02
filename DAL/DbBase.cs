using SettingHostsCommon;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DbBase
    {
        /// <summary>
        /// 创库建表
        /// </summary>
        public void InitDB()
        {
            var dbDirectory = System.Web.HttpContext.Current.Server.MapPath("/App_Data");
            if (!Directory.Exists(dbDirectory))
            {
                Directory.CreateDirectory(dbDirectory);
            }
            if (!File.Exists(dbDirectory + AppConfig.DataEntities))
            {
                SQLiteConnection.CreateFile(dbDirectory + AppConfig.DataEntities);
                using (SQLiteConnection conn = new SQLiteConnection("Data Source=" + dbDirectory + AppConfig.DataEntities))
                {
                    conn.Open();
                    SQLiteCommand cmd = new SQLiteCommand();
                    cmd.CommandText = "CREATE TABLE t_Hosts (Id INTEGER PRIMARY KEY ASC AUTOINCREMENT UNIQUE, ipAddress nvarchar(50), DomainName nvarchar(100));CREATE TABLE t_Dns (Id INTEGER PRIMARY KEY ASC AUTOINCREMENT UNIQUE, MainDns nvarchar(50), BackUpDns nvarchar(100));";
                    cmd.Connection = conn;
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = "Insert into t_Dns values(1,'0.0.0.0','0.0.0.0')";
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
        }
    }
}
