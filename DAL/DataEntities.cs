using Models;
using System.Data.Entity;

namespace DAL
{
    /// </summary>
    public class DataEntities : DbContext
    {
        //static SQLiteConnection conn = new SQLiteConnection("Data Source=" + AppConfig.SQLitePath + ";");
        public DataEntities() : base("DataEntities")
        {

        }
        public DbSet<t_Hosts> t_Log { set; get; }
    }
}
