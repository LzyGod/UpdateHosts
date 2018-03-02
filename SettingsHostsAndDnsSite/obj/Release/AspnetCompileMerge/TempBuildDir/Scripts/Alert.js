
 
function UseLayUI()
{
    layui.use(['form', 'laydate'], function () {
        form = layui.form()
        , layer = layui.layer,
        laydate = layui.laydate;
    });
    
}

function init() {
    try {
        if (typeof (layer) == "undefined") {
            UseLayUI();
        }
    } catch (e) {
        UseLayUI();
    }
}

window.onload = init();

var Alert = {

    /*
        打开窗口
    */
    ShowWindow: function (title, content, width_height) {
        //页面层
        if (width_height == null) {
            width_height = ['auto'];
        }

        layer.open({
            type: 1,
            title: title,
            area: width_height, //宽高
            content: content
        });
    },

    /*
        打开Html页面
    */
    ShowHtml: function (title, Url, width_height) {

        if (width_height == null) {
            width_height = ['480px', '450px'];
        }

        layer.open({
            type: 2,
            title: title,
            area: width_height,
            content: Url
        });
    },

    /*
        消息提醒   不带确定按钮
    */
    msg: {
        /*
            默认提醒  不带图标
        */
        def: function (text) {
            layer.msg(text);
        },

        /*
            带感叹图标
        */
        gantan: function (text) {
            layer.msg(text, { icon: 0 });
        },

        /*
            带正确图标
        */

        zhengque: function (text) {
            layer.msg(text, { icon: 1 });
        },

        /*
            带错误图标
        */
        cuowu: function (text) {
            layer.msg(text, { icon: 2 });
        },

        /*
            带问号图标
        */
        wenhao: function (text) {
            layer.msg(text, { icon: 3 });
        },
        /*
            带Loadding图标
        */
        loadding: function (text) {
            var index = layer.msg(text, { icon: 16, shade: 0.3, time: 0 });
            return index;
        },
    },


    alert: {
        /*
            默认提醒  不带图标
         */
        def: function (text) {
            layer.alert(text);
        },

        /*
            带感叹图标
        */
        gantan: function (text) {
            layer.alert(text, { icon: 0 });
        },
        gantan: function (text,callback) {
            layer.alert(text, { icon: 0 }, callback);
        },

        /*
            带正确图标
        */

        zhengque: function (text) {
            layer.alert(text, { icon: 1 });
        },
        zhengque: function (text, callback) {
            layer.alert(text, { icon: 1 }, callback);
        },

        /*
            带错误图标
        */
        cuowu: function (text) {
            layer.alert(text, { icon: 2 });
        },
        cuowu: function (text, callback) {
            layer.alert(text, { icon: 2 }, callback);
        },


        /*
            带问号图标
        */
        wenhao: function (text) {
            layer.alert(text, { icon: 3 });
        },
    },

    /*

        确认消息
        调用示例：
        Alert.confirm("你确定要删除吗？", function (index) {
                //代码区域
                layer.close(index);
        });
        
    */
    confirm: function (text, callback) {
        layer.confirm(text, { icon: 3, title: '提示' }, callback);
    },

    close: function (index) {
        layer.close(index);
    },

    closeAll: function () {
        layer.closeAll();
    },


};

