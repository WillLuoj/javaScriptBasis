/**
 * Created by Administrator on 2017/2/26.
 */
var aqiData = [
    ["北京", 90],
    ["上海", 50],
    ["福州", 10],
    ["广州", 50],
    ["成都", 90],
    ["西安", 100]
];
(function() {
    //遍历数组，获取存有达到条件的污染城市的数组
    var pollutionLi = aqiData.filter(function(item,index,array) {
        return(item[1] > 60);
    });
    //先利用循环得到需要写入页面的HTML内容，支队innerHTML执行一次赋值操作，增加效率
    var pushHtml = "";
    for (var i = 0; i < pollutionLi.length; i++) {
        pushHtml += "<li>" + pollutionLi[i] + "</li>";
    }
    //在ul标签内插入li子元素
    var ul = document.querySelector("#aqi-list");
    ul.innerHTML = pushHtml;
})();
