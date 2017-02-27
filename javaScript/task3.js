/**
 * Created by luojw on 2017-2-27.
 */
/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */



function getData() {
    var dataUl = document.getElementById("source");
    var li = dataUl.getElementsByTagName("li");//获取source的所有li子节点
    var data = new Array();
    for(var i = 0;i < li.length;i++) {
        var b = li[i].firstElementChild;
        var bText = b.firstChild.nodeValue;
        var liText = li[i].firstChild.nodeValue;
        data.push([liText,bText]);
    }
    return data;
}
/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    // data = getData();
    function compare(data1,data2) {
        if(data1[1] > data2[1]) {
            return 1;
        }else if(data1[1] < data2[1]) {
            return -1;
        } else {
            return 0;
        }
    }
    data.sort(compare);
    return data;
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
    // data = sortAqiData();
    var dataHtml = "";
    for(var i = 0;i < data.length;i++) {
        var chineseNum = [ "一","二","三","四", "五", "六", "七", "八", "九"];
        dataHtml += "<li>" + "第" +chineseNum[i] + "名：" + data[i][0] + "<b>" + data[i][1] + "</b>" + "</li>";
    }
    var render = document.querySelector("#resort");
    render.innerHTML = dataHtml;
}

function btnHandle() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);
}

function init() {

    // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
    var but = document.getElementById("sort-btn");
    but.onclick = btnHandle;
}

init();