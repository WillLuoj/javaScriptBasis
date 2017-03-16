/**
 * Created by luojw on 2017-3-9.
 */
var textbox = document.getElementById("input"),
    numQueue = document.querySelector(".numQueue"),
    inputData,//输入到textarea中的值
    dataArr,//将输入的值分割为数组
    data = [],
    keyCode,//输入的键码
    innerData;//渲染至页面的数据


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
        if (keyCode == 9) {
            EventUtil.preventDefault(event);
            textbox.value += "  ";
        }
    }

};

// 输入数据处理方法 [^a-zA-Z\d\u4e00-\u9fa5,.!?()，．；;？]
var dataHandler = {

    // 将数据分割成数组
    splitData : function() {
        inputData = textbox.value.trim();
        dataArr = inputData.split(/[^a-zA-Z\d\u4e00-\u9fa5]+/);
        return dataArr;
    },

    //将数据数组渲染在页面中

    render : function(data) {
        for (var i = 0; i < data.length; i++) {
            if(data != "") {
                innerData += "<div>" + data[i] + "</div>";
            }
        }
        innerData = innerData.replace(undefined,"");
        numQueue.innerHTML = innerData;
        innerData = "";
        dataHandler.clearInput(textbox);
    },

    //事件结束后清除input内的输入
    clearInput : function(textbox) {
        if (textbox.value) {
            try {
                textbox.value = ''; //for IE11, latest Chrome/Firefox/Opera...
            } catch (err) {
                if (textbox.value) { //for IE5 ~ IE10
                    var form = document.createElement('form'), ref = textbox.nextSibling, p = input.parentNode;
                    form.appendChild(textbox);
                    form.reset();
                    p.insertBefore(textbox, ref);
                }
            }
        }
    }

}

//按键事件

var btnHandler = {
    //左侧输入
    leftInput : function() {
        data = dataHandler.splitData().concat(data);
        return data;
    },

    //右侧输入
    rightInput : function() {
        data = data.concat(dataHandler.splitData());
        return data;
    },

    //左侧删除
    leftDel : function() {
        data.shift();
        return data;
    },

    //右侧删除
    rightDel : function() {
        data.pop();
        return data;
    }
};
    //实现输入tab
EventUtil.addHandler(textbox, "keydown", function () {
    EventUtil.inputTab(EventUtil.getEvent());
});

//绑定按键事件

var leftInput = document.querySelector(".left-input");
EventUtil.addHandler(leftInput, "click", function () {
    data = btnHandler.leftInput();
    dataHandler.render(data);
});

var rightInput = document.querySelector(".right-input");
EventUtil.addHandler(rightInput, "click", function () {
    data = btnHandler.rightInput();
    dataHandler.render(data);
});

var leftDel = document.querySelector(".left-del");
EventUtil.addHandler(leftDel, "click", function () {
    data = btnHandler.leftDel();
    dataHandler.render(data);
});

var rightDel = document.querySelector(".right-del");
EventUtil.addHandler(rightDel, "click", function () {
    data = btnHandler.rightDel();
    dataHandler.render(data);
});


//查询事件
var search = document.getElementById("search");
var searchBtn = document.querySelector(".search");

EventUtil.addHandler(searchBtn, "click", function () {
    var searchText = search.value;

    var childNodes = numQueue.childNodes;

    //去除上次搜索结果样式
    Array.prototype.forEach.call(childNodes,function(div) {
        div.classList.remove("active");
    });

    //给搜索到的内容绑定样式
    for (var i = 0; i < data.length; i++) {
        if (data[i].indexOf(searchText) != -1) {
            console.log(childNodes[i]);
            childNodes[i].classList.add("active");
        }
    }
    //去除搜索框输入
    dataHandler.clearInput(search);
});


