using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class t_Hosts
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        /// <summary>
        /// IP地址
        /// </summary>
        public string ipAddress { get; set; }
        /// <summary>
        /// 域名
        /// </summary>
        public string DomainName { get; set; }
    }
}
