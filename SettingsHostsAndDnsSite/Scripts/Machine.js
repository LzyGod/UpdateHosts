var TIMER = null;
$(function () {
    document.getElementById("outTime").value = "不刷新";
})

//下拉框Change事件
layui.use(['form'], function () {
    var form = layui.form()
        , layer = layui.layer;
    form.on('select(periodTypeId)', function (data) {
        window.clearInterval(TIMER);
        TIMER = null;
        //获取选中下拉的值
        var refTime = data.value;
        if (refTime == "不刷新") {
            document.getElementById("outTime").value = "不刷新";
        } else {
            document.getElementById("outTime").value = "将在" + refTime.substring(1, refTime.length - 3) + "秒后刷新";
            //开启倒计时
            TIMER = window.setInterval(TimingRefresh, 1000);
            refTimer();
        }
    });
});

//更新按钮点击事件
function refTime() {
    window.clearInterval(TIMER);
    TIMER = null;
    //获取下拉选中的值
    var refTime = $('#periodType input').val();
    if (refTime == "不刷新") {
        document.getElementById("outTime").value = "正在刷新...";
        //禁用按钮和下拉框
        $('#selType').attr("disabled", true);
        $('#refBtn').attr({ "disabled": "disabled" });
        $('#refBtn').attr({ "class": "layui-btn layui-btn-disabled" });
        //请求数据
        PostData();
        renderForm();
    } else {
        document.getElementById("outTime").value = "正在刷新...";
        window.clearInterval(TIMER);
        TIMER = null;
        //禁用按钮和下拉框
        $('#selType').attr("disabled", true);
        $('#refBtn').attr({ "disabled": "disabled" });
        $('#refBtn').attr({ "class": "layui-btn layui-btn-disabled" });
        PostData();
        renderForm();
    }
}

//重新渲染表单
function renderForm() {
    layui.use('form', function () {
        var form = layui.form();
        form.render();
    });
}

//数据查询完成执行根据配置执行定时刷新或不刷新
function refTimer() {
    window.clearInterval(TIMER);
    TIMER = null;
    //获取下拉配置的值
    var refTime = $('#periodType input').val();
    if (refTime == "不刷新") {
        document.getElementById("outTime").value = "不刷新";
    } else {
        document.getElementById("outTime").value = "将在" + refTime.substring(1, refTime.length - 3) + "秒后刷新";
        //开启定时器
        TIMER = window.setInterval(TimingRefresh, 1000);
    }
}

//定时刷新
function TimingRefresh() {
    var OutTime = document.getElementById("outTime").value;
    //倒计时结束后执行
    if (parseInt(OutTime.substring(2, OutTime.length - 4)) - 1 == 0) {
        var refTime = $('#periodType input').val();
        document.getElementById("outTime").value = "正在刷新...";
        window.clearInterval(TIMER);
        TIMER = null;
        //禁用按钮和下拉框
        $("#selType").attr("disabled", true);
        $('#refBtn').attr({ "disabled": "disabled" });
        $('#refBtn').attr({ "class": "layui-btn layui-btn-disabled" });
        //请求数据
        PostData();
        renderForm();
    }
    else {
        document.getElementById("outTime").value = "将在" + (parseInt(OutTime.substring(2, OutTime.length - 4)) - 1).toString() + "秒后刷新";
    }
}

//请求数据
function PostData() {
    return $.ajax({
        type: "POST",
        url: "/Machine/GetData",
        data: {},
        success: (function (data) {
            //拼接数据展示
            $("#ComputerInfoList").empty();
            $("#ComputerInfoList").html(JsonToHtml(data));
            //设置展示样式
            SetColor();
            //解除按钮和下拉框的禁用
            $('#refBtn').removeAttr("disabled");
            $('#refBtn').attr({ "class": "layui-btn" });
            $('#selType').removeAttr("disabled");
            //重新渲染
            renderForm();
            refTimer();
        })
    })
}

//循环拼接数据展示
function JsonToHtml(data) {
    var result = "";
    $(data).each(function (i, item) {
        result += "<div class='contentBox'>";
        result += "     <div class='contentBox_frist'>";
        result += "         <p> " + item["Alias"] + "</p>"
        result += "     </div> ";
        result += "     <div class='contentBox_two'>"
        result += "         <div class='contentBox_two_one' " + "id= 'CPU' " + "style='width:" + (item["CPU"] == null ? "0" : item["CPU"]) + "%;' ></div>"
        result += "         <span>CPU= " + (item["CPU"] == null ? "0" : item["CPU"]) + "</span>";
        result += "     </div > ";
        result += "     <div class='contentBox_two'>";
        result += "         <div class='contentBox_two_one'" + " id= 'Memory' " + "style='width:" + (item["MemoryProportion"] == null ? "0" : item["MemoryProportion"]) + "%;'></div>";
        result += "         <span>内存=" + (item["Memory"] == null ? "0" : item["Memory"]) + "GB</span >";
        result += "     </div>";
        result += "     <div class='contentBox_two'>";
        result += "         <div class='contentBox_two_one'" + " id= 'Thread'" + " style='width:" + (item["ThreadCount"] == null ? "0" : item["ThreadCount"]) + "%;'></div>";
        result += "         <span>线程=" + (item["Thread"] == null ? "0" : item["Thread"]) + "</span>";
        result += "     </div >";
        result += "</div >";
    })
    return result;
}

//设置设备信息展示样式
function SetColor() {
    var aBox = $(".contentBox");
    for (var i = 0; i < aBox.length; i++) {
        //取cpu的占比
        var cpuWidth = aBox[i].children[1].children[0].style.width;
        var cpuColor = "";
        if (parseInt(cpuWidth) > 0 && parseInt(cpuWidth) <= 35) {
            cpuColor = "LightGreen";
        }
        else if (parseInt(cpuWidth) > 35 && parseInt(cpuWidth) <= 70) {
            cpuColor = "Yellow";
        }
        else if (parseInt(cpuWidth) > 70) {
            cpuColor = "Red";
        }
        aBox[i].children[1].children[0].style.backgroundColor = cpuColor;
        //取内存的占比
        var memoryWidth = aBox[i].children[2].children[0].style.width;
        var memoryColor = "";
        if (parseInt(memoryWidth) > 0 && parseInt(memoryWidth) <= 35) {
            memoryColor = "LightGreen";
        }
        else if (parseInt(memoryWidth) > 35 && parseInt(memoryWidth) <= 70) {
            memoryColor = "Yellow";
        }
        else if (parseInt(memoryWidth) > 70) {
            memoryColor = "Red";
        }
        aBox[i].children[2].children[0].style.backgroundColor = memoryColor;
        //取线程的值
        var threadWidth = aBox[i].children[3].children[1].innerText;
        var threadConut = parseInt(threadWidth.substring(3, threadWidth.length));
        var threadColor = "";
        if (threadConut > 0 && threadConut <= 600) {
            threadColor = "LightGreen";
        }
        else if (threadConut > 600 && threadConut <= 800) {
            threadColor = "Yellow";
        }
        else if (threadConut > 800) {
            threadColor = "Red";
        }
        aBox[i].children[3].children[0].style.backgroundColor = threadColor;
    }
}