/**
 * Created by luojw on 2017-3-3.
 */
/**
 * Created by luojw on 2017-2-28.
 */
var textbox = document.getElementById("input");
var queue = document.querySelector(".numQueue");
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
    // removeHandler : function(element, type, handler) {
    //     if(element.addEventListener) {
    //         element.addEventListener(type, handler, false);
    //     } else if (element.attachEvent) {
    //         element.attachEvent("on" + type, handler);
    //     } else {
    //         element["on" + type] = handler;
    //     }
    // },
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

var dataList = new Array();

var dataHandler = {
    //渲染子节点
    render : function() {
        queue.innerHTML = "";
        for (var m = 0; m < dataList.length; m++) {
            var innerText;
            innerText += "<div>" +"</div>";
        }
        queue.innerHTML = innerText;
        var dataDiv = queue.querySelectorAll("div");
        for (var i = 0; i < dataDiv.length; i++) {
            dataDiv[i].style.height = dataDiv[i] * 5 + "px";
        }
    },
    //检测输入是否符合
    createNode : function() {
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

    //将数据放入dataList前端
    leftInput : function() {
        var addNode = textbox.value;
        dataList.unshift(addNode);
        dataHandler.render();
    },
    //将数据放入dataList后端
    rightInput : function(node) {
        dataList.push(node);
    },
    //删除队列最后一个节点并输出
    rightDel : function() {
        var delNode = dataList.pop();
        alert(delNode);
    },
    //删除队列第一个节点并输出
    leftDel : function() {
        // var delNode = queue.removeChild(queue.firstChild);
        // return delNode;
        var delNode = dataList.shift();
        alert(delNode);
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
    var childNode = dataHandler.createNode();
    if(childNode != false) {
        dataHandler.leftInput();
        dataHandler.clearInput(textbox);
    }

});
//绑定右侧入点击事件
var rightInput = document.querySelector(".right-input");
EventUtil.addHandler(rightInput, "click", function() {
    var childNode = dataHandler.createNode();
    if(childNode != false) {
        dataHandler.rightInput(childNode);
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



