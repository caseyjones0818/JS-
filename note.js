
# 第3章   基 本 概 念
局部变量
function test(){
 var message = "hi"; // 局部变量
}
test();
alert(message); // 错误！
全局变量
function test(){
 message = "hi"; // 全局变量
}
test();
alert(message); // "hi" 

数据类型
ECMAScript 中有 5 种简单数据类型（也称为基本数据类型）：Undefined、Null、Boolean、Number
和 String。还有 1种复杂数据类型——Object，Object 本质上是由一组无序的名值对组成的。

# 第4章 变量、作用域和内存问题 
动态的属性
var person = new Object();
person.name = "Nicholas";
alert(person.name); //"Nicholas" 


但是，我们不能给基本类型的值添加属性，尽管这样做不会导致任何错误。比如：
var name = "Nicholas";
name.age = 27;
alert(name.age); //undefined 

复制变量值
// 1
var num1 = 5;
var num2 = num1; 
// 2
var obj1 = new Object();
var obj2 = obj1;
obj1.name = "Nicholas";
alert(obj2.name); //"Nicholas" 

传递参数
// 1
function addTen(num) {
 num += 10;
 return num;
} 
// 2
var count = 20;
var result = addTen(count);
alert(count); //20，没有变化
alert(result); //30 
// 3
function setName(obj) {
 obj.name = "Nicholas";
}
var person = new Object();
setName(person);
alert(person.name); //"Nicholas" 
// 4
function setName(obj) {
 obj.name = "Nicholas";
 obj = new Object();
 obj.name = "Greg";
}
var person = new Object();
setName(person);
alert(person.name); //"Nicholas" 

检测类型
var s = "Nicholas";
var b = true;
var i = 22;
var u;
var n = null;
var o = new Object();
alert(typeof s); //string
alert(typeof i); //number
alert(typeof b); //boolean
alert(typeof u); //undefined
alert(typeof n); //object
alert(typeof o); //object 

执行环境及作用域
// 1
var color = "blue";
function changeColor(){
 var anotherColor = "red";
 function swapColors(){
 var tempColor = anotherColor;
 anotherColor = color;
 color = tempColor;

 // 这里可以访问 color、anotherColor 和 tempColor
 }
 // 这里可以访问 color 和 anotherColor，但不能访问 tempColor
 swapColors();
}
// 这里只能访问 color
changeColor(); 

以上代码共涉及 3 个执行环境：全局环境、changeColor()的局部环境和 swapColors()的局部
环境。全局环境中有一个变量 color 和一个函数 changeColor()。changeColor()的局部环境中有
一个名为 anotherColor 的变量和一个名为 swapColors()的函数，但它也可以访问全局环境中的变
量 color。swapColors()的局部环境中有一个变量 tempColor，该变量只能在这个环境中访问到。
无论全局环境还是 changeColor()的局部环境都无权访问 tempColor。然而，在 swapColors()内部
则可以访问其他两个环境中的所有变量，因为那两个环境是它的父执行环境。图 4-3 形象地展示了前面
这个例子的作用域链。

没有块级作用域
// 1
if (true) {
 var color = "blue";
}
alert(color); //"blue"
这里是在一个 if 语句中定义了变量 color。如果是在 C、C++或 Java 中，color 会在 if 语句执
行完毕后被销毁。但在 JavaScript 中，if 语句中的变量声明会将变量添加到当前的执行环境（在这里是
全局环境）中。在使用 for 语句时尤其要牢记这一差异，例如：
// 2
for (var i=0; i < 10; i++){
 doSomething(i);
}
alert(i); //10 

