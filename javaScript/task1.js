/**
 * Created by Administrator on 2017/2/25.
 */
/*
 在注释下方写下代码
 给按钮button绑定一个点击事件
 在事件处理函数中
 获取aqi-input输入的值，并显示在aqi-display中
 */
var inputText = document.getElementById("aqi-input");
var inputBut = document.getElementById("button");
var displayText = document.getElementById("aqi-display");
//object.addEverntListener(event,function,useCapture)事件监听法
// inputBut.addEventListener('click',function(){
//     displayText.innerText = inputHTML.value;
// })();
inputBut.onclick = function() {
    var x = inputText.value;
    if(x == "") {
        alert("不能为空，请输入");
    } else {
        displayText.innerHTML = x;
    }
};