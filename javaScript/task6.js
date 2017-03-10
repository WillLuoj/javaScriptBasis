/**
 * Created by luojw on 2017-3-9.
 */
var textbox = document.getElementById("input"),
    inputData,
    dataArr,
    keyCode;

//事件对象
var EventUtil = {
    //根据浏览器对象来使用不同的方法添加事件
    addHandler : function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, true);//dom2级事件处理,在冒泡阶段捕获
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);//ie事件处理
        } else {
            element["on" + type] = handler;//dom0级事件处理
        }
    },

    //取消事件默认行为
    preventDefault : function (event) {
       if (event.preventDefault) {
           event.preventDefault();
       }  else {
           event.returnValue = false;
       }
    },

    //取得event事件对象
    getEvent : function(event) {
        return event ? event : window.event;
    },

    //取得输入的字符编码
    getCharCode : function(event) {
        return event.keyCode;

    },
    //使tab键输出在textarea中
    inputTab : function(event) {
        keyCode = EventUtil.getCharCode(event);
        alert("输入tab");
        EventUtil.preventDefault(event);
        if (keyCode == 9) {
            EventUtil.preventDefault(event);
            alert("输入tab");
            inputData += "  ";
        }
    },

};




// 输入数据处理方法块 [^a-zA-Z\d\u4e00-\u9fa5,.!?()，．；;？]
var dataHandler = {


    // 将数据分割成数组
    splitData : function() {
        inputData = textbox.value;
        dataArr = inputData.split(/[^a-zA-Z\d\u4e00-\u9fa5]/);
        alert(dataArr);

    }
}

var test = document.querySelector(".left-input");
EventUtil.addHandler(test, "click", function () {


    dataHandler.splitData();
});
EventUtil.addHandler(textbox, "keyon", function () {
    EventUtil.inputTab(EventUtil.getEvent());
});