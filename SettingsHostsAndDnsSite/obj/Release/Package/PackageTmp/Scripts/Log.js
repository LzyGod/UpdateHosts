/**
 * 初始化layui表单模块
 */
layui.use(['form'], function () {
    var form = layui.form()
        , layer = layui.layer;
    form.on('checkbox', function (data) {
        var elem = $(data.elem);
        if (elem.attr("title") == "全选") {
            LogPage.selectAll($("#ckList div input"), data.elem.checked);
            form.render('checkbox');
        } else {
            LogPage.selectComputer(elem.attr('title'));
        }
    });
});
/**
 * 日志页面相关JS
 */
var LogPage = (function () {
    /**
     * 设备信息
     */
    var ComputerInfo = "";
    /**
     * 选择的设备数量
     */
    var selectCount = 0;
    /**
     * 在标签栏中打开详细页面
     * @param {} url 需要打开的链接
     * @param {} text 标签栏显示的标题
     * @returns {} 
     */
    var GoTo = function (url, text) {
        parent.addIframe($("<a href=\"" + url + "\"><i class=\"icon-font\"></i><span>" + text + "</span></a>"));
    };
    /**
     * 查询日志数据
     */
    var Query = function () {
        if (selectCount > 0) {
            var loadingIndex = Alert.msg.loadding("正在为您加载数据中...");
            $.post(siteUrl.GetLog, { projectUrl: $("#projectId").val(), date: $("#dateId").val(), computerInfo: ComputerInfo }, function (data) {
                $("#LogList").html(JsonToHtml(data));
                Alert.close(loadingIndex);
            }, "json");
            //tools.goToUrl(siteUrl.LogIndex + "?projectUrl=" + $("#projectId").val() + "&date=" + $("#dateId").val() + "&computerInfo=" + ComputerInfo);
        } else {
            Alert.msg.gantan("请选择需要查询的设备!");
        }

    };
    //获取项目js
    var loading = function () {
        $.ajax({
            type: "post",
            url: siteUrl.GetLoading,
            async: false,
            success: function (data) {
                $("#projectId").html("");
                $.each(data, function (i, item) {
                    $("#projectId").append("<option value=" + item.f_ProjectPath + ">" + item.f_ProjectName + "</option>");  
                    renderForm();//表单重新渲染
                })
            }
        });
    }
    //重新渲染表单
    function renderForm() {
        layui.use('form', function () {
            var form = layui.form();
            form.render();
        });
    }
    /**
     * 日志Json数据转成需要显示的HTML
     * @param {} data 日志JSON
     * @returns {} HTML
     */
    var JsonToHtml = function (data) {
        var result = "";
        $(data).each(function (i, item) {
            result += "<tr onclick=\"LogPage.goto('/Log/Detail?EventCode=" + item["EventCode"] + "&EventTime=" + ConvertDate(item["EventTime"]) + "&EventID=" + item["EventID"] + "','" + item["EventMessage"] + "') \">";
            result += "<td>" + item["EventCode"] + "</td>";
            result += "<td>" + ConvertDate(item["EventTime"]) + "</td>";
            result += "<td>" + item["EventMessage"] + "</td>";
            result += "<td>" + item["ExceptionMessage"] + "</td>";
            result += "<td>" + item["ExceptionType"] + "</td>";
            result += "<td>" + item["MachineName"] + "</td>";
            result += "<td>" + item["ApplicationPath"] + "</td>";
            result += "</tr>";
        });
        return result;
    };
    var ConvertDate = function (strdate) {
        var date = new Date(parseInt(strdate.replace("/Date(", "").replace(")/", ""), 10));
        //月份为0-11，所以+1，月份小于10时补个0
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + currentDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();;
    }
    /**
     * 加载远程设备列表
     * @returns {} 
     */
    var LoadComputer = function () {
        Alert.ShowWindow("请选择需要加载的远程设备列表", $("#pcList"), ['600px', '360px']);
    };
    /**
     * 选择远程设备
     * @param {} path 设备地址
     * @param {} user 账号
     * @param {} pass 密码
     * @returns {} 
     */
    var SelectComputer = function (title) {
        var computer = title + ',';
        if (ComputerInfo.indexOf(computer) >= 0) {
            selectCount--;
            ComputerInfo = ComputerInfo.replace(title, "");
        } else {
            selectCount++;
            ComputerInfo = ComputerInfo + computer;
        }
        UpdateComputerCount();
    };
    /**
     * 选择远程设备(全选)
     * @param {} objs 待选择的设备集合
     * @param {} checked 是全选还是取消全选
     * @returns {} 
     */
    var SelectAll = function (objs, checked) {
        var cpList = "";
        objs.each(function (i, item) {
            item.checked = checked;
            cpList += $(item).attr("title") + ",";
        });
        if (checked) {
            ComputerInfo = cpList;
            selectCount = objs.length;
        } else {
            ComputerInfo = "";
            selectCount = 0;
        }
        UpdateComputerCount();
    };
    /**
     * 更改界面上显示选择设备数量
     * @returns {} 
     */
    var UpdateComputerCount = function () {
        $("#sbIndex").text(selectCount);
    };
    return {
        goto: GoTo,
        query: Query,
        loadComputer: LoadComputer,
        selectComputer: SelectComputer,
        selectAll: SelectAll,
        loading: loading
    };
})();