/**
 * Created by luojw on 2017-3-9.
 */
var textbox = document.getElementById("input"),
    inputData,
    dataArr;

//事件对象
var EventUtil = {
    addHandler : function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

//    获取事件的event对象
    getEvent : function(event) {
        return event ? event : window.event;
    }
};




// 输入数据处理方法块 \r,，、\s\t
var dataHandler = {

    // 将数据分割成数组
    splitData : function() {
        inputData = textbox.value;
        dataArr = inputData.split(/[\n\r,，、\s\t]/);
        alert(dataArr);

    }
}

var test = document.querySelector(".left-input");
EventUtil.addHandler(test, "click", function () {

    dataHandler.splitData();
})