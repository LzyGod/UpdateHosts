


var LoginPage = {

    Login: function () {
        var userName = $("#uname").val();
        var userPass = $("#upass").val();
        if ($.trim(userName) == "") {
            Alert.alert.gantan("用户名不能为空");
            return false;
        }

        if ($.trim(userPass) == "") {
            Alert.alert.gantan("密码不能为空");
            return false;
        }
        var layIndex = Alert.msg.loadding("正在为您登录中...");

        $.post(siteUrl.Login, { uname: userName, upass: userPass }, function (data) {
            if (data.IsSuccess) {
                window.location.href = siteUrl.MainIndex;
            } else {
                Alert.close(layIndex);
                Alert.alert.gantan(data.Msg);
            }
        }, "json");
    },

    LoginOut: function () {
        window.location.href = siteUrl.LoginOut;
    },
};

$('body').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        LoginPage.Login();
    }
});