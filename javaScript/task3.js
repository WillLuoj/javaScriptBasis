/**
 * Created by luojw on 2017-2-27.
 */
/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
var dataUl = document.getElementById("source");
var Li = dataUl.firstElementChild;
var b = Li.firstElementChild;
alert(Li.firstChild.nodeValue);
alert(b.firstChild.nodeValue);
//
// function getData() {
//     var dataUl = document.querySelector("#source");
//
//
//     return data;
//
// }

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {

}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {

}

function btnHandle() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);
}

function init() {

    // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数

}

init();