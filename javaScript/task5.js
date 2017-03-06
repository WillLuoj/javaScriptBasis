/**
 * Created by luojw on 2017-3-3.
 */
/**
 * Created by luojw on 2017-2-28.
 */

var textbox = document.getElementById("input");

var queue = document.querySelector(".numQueue");

var dataList = new Array();

//创建跨浏览器事件对象
var EventUtil = {

    //给事件添加响应程序
    addHandler : function(element, type, handler) {
        if(element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },


    //获取事件的event对象
    getEvent : function(event) {
        return event ? event : window.event;
    },

    //取消事件的默认行为，本例中取消keypress的输入
    preventDefault : function(event) {
        if(event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    //获取当前事件输入的字符
    getCharCode : function(event) {
        if (typeof event.charCode == "number" ) {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }
};

//绑定input输入事件，限制输入类型必须为数字
EventUtil.addHandler(textbox, "keypress", function(event) {
    event = EventUtil.getEvent(event);
    var charCode = EventUtil.getCharCode(event);
    if(!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {
        EventUtil.preventDefault(event);
        alert("请输入数字");
    }
});


//创建输入数据处理对象
var dataHandler = {

    //检测输入是否符合
    detector : function() {
        var data = textbox.value;
        if (data != '' && !isNaN(Number(data)) && Number(data) >= 10 && Number(data) <= 100 && dataList.length < 60) {
            return true;
        } else if(dataList.length >= 60) {
            alert("输入已达上限，队列最多只能承受60个");
            dataHandler.clearInput(textbox);
            return false;
        } else {
            alert("您输入的内容不符合要求，请输入10-100间的数字");
            dataHandler.clearInput(textbox);
            return false;
        }
    },

    //将数据渲染到页面中
    render : function(list) {
        var arr = list;
        queue.innerHTML = "";
        for (var m = 0; m < arr.length; m++) {
            queue.innerHTML += "<div>" + arr[m] + "</div>";
            var dataDiv = queue.querySelectorAll("div");
            dataDiv[m].style.height = arr[m] * 5 + "px";
        }
    },

    //将queue数据进行冒泡排序，并将每次排序结果存储到data中

    bubbleSort : function() {
        var len = dataList.length;
        var data = [];
        for (var i = 0; i < len; i++) {
            for( var j = 0; j < len - 1 - i; j++) {

                if ( dataList[j] > dataList[j+1]) {
                    var temp = dataList[j+1];
                    dataList[j+1] = dataList[j];
                    dataList[j] = temp;

                    if(dataList != undefined) {
                        data.push(JSON.parse(JSON.stringify(dataList)));

                    }
                }
            }
        }

        //设置延迟函数，使每次渲染间隔1000，达到可视化的效果
        setInterval(forSortRender,1000);
        function forSortRender(){
            var s ;
            s = data.shift();
            if (s !== undefined) {
                dataHandler.render(s);
            }

        }
    },

    //将数据放入dataList前端
    leftInput : function() {
        var addNode = textbox.value;
        dataList.unshift(addNode);
        dataHandler.render(dataList);
    },

    //将数据放入dataList后端
    rightInput : function() {
        var addNode = textbox.value;
        dataList.push(addNode);
        dataHandler.render(dataList);
    },

    //删除队列最后一个节点并输出
    rightDel : function() {
        var delNode = dataList.pop();
        alert(delNode);
        dataHandler.render(dataList);
    },

    //删除队列第一个节点并输出
    leftDel : function() {
        // var delNode = queue.removeChild(queue.firstChild);
        // return delNode;
        var delNode = dataList.shift();
        alert(delNode);
        dataHandler.render(dataList);
    },

    //事件结束后清除input内的输入
    clearInput : function(input) {
        if (input.value) {
            try {
                input.value = ''; //for IE11, latest Chrome/Firefox/Opera...
            } catch (err) {
                if (input.value) { //for IE5 ~ IE10
                    var form = document.createElement('form'), ref = input.nextSibling, p = input.parentNode;
                    form.appendChild(input);
                    form.reset();
                    p.insertBefore(input, ref);
                }
            }
        }
    }
};

//绑定左侧入点击事件
var leftInput = document.querySelector(".left-input");

EventUtil.addHandler(leftInput, "click", function() {
    var childNode = dataHandler.detector();
    if(childNode != false) {
        dataHandler.leftInput();
        dataHandler.clearInput(textbox);
    }

});

//绑定右侧入点击事件
var rightInput = document.querySelector(".right-input");

EventUtil.addHandler(rightInput, "click", function() {
    var childNode = dataHandler.detector();
    if(childNode != false) {
        dataHandler.rightInput();
        dataHandler.clearInput(textbox);
    }
});

//绑定右侧出点击事件
var rightDel = document.querySelector(".right-del");

EventUtil.addHandler(rightDel, "click", function() {
    dataHandler.rightDel();
});

//绑定左侧出点击事件
var leftDel = document.querySelector(".left-del");

EventUtil.addHandler(leftDel, "click", function() {
    dataHandler.leftDel();
    // alert(dataHandler.leftDel().firstChild.nodeValue);
});

//绑定冒泡排序可视化
var bubbleSort = document.querySelector(".bubbleSort");

EventUtil.addHandler(bubbleSort, "click", function() {
    dataHandler.bubbleSort();
});



