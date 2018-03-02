using DAL;
using Models;
using SettingHostsCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SettingsHostsAndDnsSite.Controllers
{
    [CheckLogin]
    public class ProjectController : Controller
    {
        /// <summary>
        /// 初始项目服务
        /// </summary>
        private BaseDAL<t_Hosts> hostsDal = new BaseDAL<t_Hosts>();
        private BaseDAL<t_Dns> DnsDal = new BaseDAL<t_Dns>();
        /// <summary>
        /// 获取项目列表
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View(hostsDal.GetModels(t => true).ToList());
        }
        /// <summary>
        /// 添加项目页面
        /// </summary>
        /// <returns></returns>
        public ActionResult Create()
        {
            return View();
        }
        /// <summary>
        /// 添加项目操作
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ipAddress,DomainName")]t_Hosts model)
        {
            if (ModelState.IsValid)
            {
                hostsDal.Add(model);
                hostsDal.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(model);
        }
        /// <summary>
        /// 编辑项目页面
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public ActionResult Edit(int pid)
        {
            return View(hostsDal.GetModels(t => t.Id == pid).FirstOrDefault());
        }
        /// <summary>
        /// 编辑项目操作
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,ipAddress,DomainName")]t_Hosts model)
        {
            if (ModelState.IsValid)
            {
                hostsDal.Update(model);
                hostsDal.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(model);
        }
        /// <summary>
        /// 删除项目操作
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var model = hostsDal.GetModels(t => t.Id == id).FirstOrDefault();
            if (model != null)
            {
                hostsDal.Delete(model);
                return Json(Result.Success());
            }
            return Json(Result.Fail("删除失败"));
        }

        /// <summary>
        /// 获取项目列表
        /// </summary>
        /// <returns></returns>
        public ActionResult DnsIndex()
        {
            return View(DnsDal.GetModels(t => true).ToList());
        }

        /// <summary>
        /// 编辑项目页面
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public ActionResult DnsEdit(int pid)
        {
            return View(DnsDal.GetModels(t => t.Id == pid).FirstOrDefault());
        }
        /// <summary>
        /// 编辑项目操作
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DnsEdit([Bind(Include = "Id,MainDns,BackUpDns")]t_Dns model)
        {
            if (ModelState.IsValid)
            {
                DnsDal.Update(model);
                DnsDal.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(model);
        }
    }
}