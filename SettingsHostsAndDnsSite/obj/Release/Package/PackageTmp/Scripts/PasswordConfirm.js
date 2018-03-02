$("body").keydown(function () {
    if (event.keyCode == "13") {
        $('#login_l').click();
    }
});

$("#login_l").click(function () {
    var password = $("#password_l").val();
    $.post(siteUrl.PasswordConfirm, { password: password }, function (data) {
        if (data.IsSuccess) {
            window.location = "/DataCleaning/Index";
        }
        else {
            Alert.alert.gantan(data.Msg);
            $("#password_l").val("");
        }
    });
})
