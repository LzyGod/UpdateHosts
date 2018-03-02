//执行
$("#DataClear").click(function () {
    var selectDay = $("#selectDay").val();
    if (selectDay == "" || selectDay == null)
    {
        alert("请选择天数!");
    }
    if (confirm("是否删除" + selectDay + "天前的数据?"))
    {
        $.post(siteUrl.DataClear, { days: selectDay }, function (data) {
            if (data.IsSuccess) {
                Alert.alert.zhengque(data.Msg);
            }
            else
            {
                Alert.alert.gantan(data.Msg);
            }
        });
    }
})