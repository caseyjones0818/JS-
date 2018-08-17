看书笔记
Javascrpt高程笔记
on note.js


# 第3章   基 本 概 念
局部变量
<pre><code>
function test(){
 var message = "hi"; // 局部变量
}
test();
alert(message); // 错误！
</code></pre>
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

# 第5章   引 用 类 型
*Object 类型
1.创建 Object 实例的方式有两种。第一种是使用 new 操作符后跟 Object 构造函数，如下所示：
var person = new Object();
person.name = "Nicholas";
person.age = 29; 
2.另一种方式是使用对象字面量表示法。对象字面量是对象定义的一种简写形式，目的在于简化创建
包含大量属性的对象的过程。下面这个例子就使用了对象字面量语法定义了与前面那个例子中相同的
person 对象：
var person = {
 name : "Nicholas",
 age : 29
}; 
在最后一个属性后面添加逗号，会在 IE7 及更早版本和
Opera 中导致错误。

3.在使用对象字面量语法时，属性名也可以使用字符串，如下面这个例子所示。
var person = {
 "name" : "Nicholas",
 "age" : 29,
 5 : true
};
这个例子会创建一个对象，包含三个属性：name、age 和 5。但这里的数值属性名会自动转换为字
符串。

4.另外，使用对象字面量语法时，如果留空其花括号，则可以定义只包含默认属性和方法的对象，如
下所示：
var person = {}; //与 new Object()相同
person.name = "Nicholas";
person.age = 29; 

# 推荐使用对象方法 虽然可以使用前面介绍的任何一种方法来定义对象，但开发人员更青睐对象字面量语法，因为这种
# 语法要求的代码量少，而且能够给人封装数据的感觉。实际上，对象字面量也是向函数传递大量可选参数的首选方式，例如：
function displayInfo(args) {
 var output = "";
 if (typeof args.name == "string"){
   output += "Name: " + args.name + "\n";
 }
 if (typeof args.age == "number") {
   output += "Age: " + args.age + "\n";
 }
 alert(output);
}
displayInfo({
 name: "Nicholas",
 age: 29
});
displayInfo({
 name: "Greg"
}); 
这种传递参数的模式最适合需要向函数传入大量可选参数的情形。一般来讲，命
名参数虽然容易处理，但在有多个可选参数的情况下就会显示不够灵活。最好的做法
是对那些必需值使用命名参数，而使用对象字面量来封装多个可选参数。

一般来说，访问对象属性时使用的都是点表示法，这也是很多面向对象语言中通用的语法。不过，
在 JavaScript 也可以使用方括号表示法来访问对象的属性。在使用方括号语法时，应该将要访问的属性
以字符串的形式放在方括号中，如下面的例子所示。
alert(person["name"]); //"Nicholas"
alert(person.name); //"Nicholas" 

*Array 类型
创建数组的基本方式有两种。

第一种是使用 Array 构造函数，如下面的代码所示。
var colors = new Array(); 
另外，在使用 Array 构造函数时也可以省略 new 操作符。如下面的例子所示，省略 new 操作符的
结果相同：
var colors = Array(3); // 创建一个包含 3 项的数组
var names = Array("Greg"); // 创建一个包含 1 项，即字符串"Greg"的数组
第二种基本方式是使用数组字面量表示法。数组字面量由一对包含数组项的方括号表
示，多个数组项之间以逗号隔开，如下所示：
var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
var names = []; // 创建一个空数组
var values = [1,2,]; // 不要这样！这样会创建一个包含 2 或 3 项的数组
var options = [,,,,,]; // 不要这样！这样会创建一个包含 5 或 6 项的数组

数组最多可以包含 4 294 967 295 个项，这几乎已经能够满足任何编程需求了。如
果想添加的项数超过这个上限值，就会发生异常。而创建一个初始大小与这个上限值
接近的数组，则可能会导致运行时间超长的脚本错误。

检测数组
if (Array.isArray(value)){
 //对数组执行某些操作
} 

转换方法
// 1
var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
alert(colors.toString()); // red,blue,green
alert(colors.valueOf()); // red,blue,green
alert(colors); // red,blue,green 
// 2
var colors = ["red", "green", "blue"];
alert(colors.join(",")); //red,green,blue
alert(colors.join("||")); //red||green||blue 
如果数组中的某一项的值是 null 或者 undefined，那么该值在 join()、
toLocaleString()、toString()和 valueOf()方法返回的结果中以空字符串表示。

栈方法
栈是一种 LIFO（Last-In-First-Out，后进先出）的数据结构，也就是最新添加的项最早被移除。而栈中项的插入（叫做推入）和移除（叫做
弹出），只发生在一个位置——栈的顶部。ECMAScript 为数组专门提供了 push()和 pop()方法，以便
实现类似栈的行为。

push()方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。而
pop()方法则从数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。请看下面的例子：
var colors = new Array(); // 创建一个数组
var count = colors.push("red", "green"); // 推入两项
alert(count); //2
count = colors.push("black"); // 推入另一项
alert(count); //3
var item = colors.pop(); // 取得最后一项
alert(item); //"black"
alert(colors.length); //2 

队列方法
1.而队列数据结构的访问规则是 FIFO（First-In-First-Out，先进先出）。
结合使用 shift()和 push()方法，可以像使用队列一样使用数组。
var colors = new Array(); //创建一个数组
var count = colors.push("red", "green"); //推入两项
alert(count); //2
count = colors.push("black"); //推入另一项
alert(count); //3
var item = colors.shift(); //取得第一项
alert(item); //"red"
alert(colors.length); //2

2.ECMAScript 还为数组提供了一个 unshift()方法。顾名思义，unshift()与 shift()的用途相反：
它能在数组前端添加任意个项并返回新数组的长度。因此，同时使用 unshift()和 pop()方法，可以
从相反的方向来模拟队列，即在数组的前端添加项，从数组末端移除项，如下面的例子所示。
var colors = new Array(); //创建一个数组
var count = colors.unshift("red", "green"); //推入两项
alert(count); //2 
count = colors.unshift("black"); //推入另一项
alert(count); //3
var item = colors.pop(); //取得最后一项
alert(item); //"green"
alert(colors.length); //2 
后是"black"，数组中各项的顺序为"black"、"red"、"green"。在调用 pop()方法时，移除并返回
的是最后一项，即"green"。

重排序方法
1.数组中已经存在两个可以直接用来重排序的方法：reverse()和 sort()。有读者可能猜到了，
reverse()方法会反转数组项的顺序。请看下面这个例子。
var values = [1, 2, 3, 4, 5];
values.reverse();
alert(values); //5,4,3,2,1 

2.比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等
则返回 0，如果第一个参数应该位于第二个之后则返回一个正数。以下就是一个简单的比较函数：
function compare(value1, value2) {
 if (value1 < value2) {
 return -1;
 } else if (value1 > value2) {
 return 1;
 } else {
 return 0;
 }
}

这个比较函数可以适用于大多数数据类型，只要将其作为参数传递给 sort()方法即可，如下面这
个例子所示。
var values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); //0,1,5,10,15 
在将比较函数传递到 sort()方法之后，数值仍然保持了正确的升序。当然，也可以通过比较函数
产生降序排序的结果，只要交换比较函数返回的值即可。
function compare(value1, value2) {
 if (value1 < value2) {
 return 1;
 } else if (value1 > value2) {
 return -1;
 } else {
 return 0;
 }
}
var values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); // 15,10,5,1,0 

在这个修改后的例子中，比较函数在第一个值应该位于第二个之后的情况下返回 1，而在第一个值
应该在第二个之前的情况下返回1。交换返回值的意思是让更大的值排位更靠前，也就是对数组按照降
序排序。当然，如果只想反转数组原来的顺序，使用 reverse()方法要更快一些。

操作方法
// 1
concat()方法可以基于当前数组中的所有项创建一个新数组。具体来说，这个方法会先创建当前数组一个副本，然后将接收到的参数
添加到这个副本的末尾，最后返回新构建的数组。在没有给 concat()方法传递参数的情况下，它只是
复制当前数组并返回副本。如果传递给 concat()方法的是一或多个数组，则该方法会将这些数组中的
每一项都添加到结果数组中。如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾。下
面来看一个例子。
var colors = ["red", "green", "blue"];
var colors2 = colors.concat("yellow", ["black", "brown"]);
alert(colors); //red,green,blue
alert(colors2); //red,green,blue,yellow,black,brown 
以上代码开始定义了一个包含 3 个值的数组 colors。然后，基于 colors 调用了 concat()方法，
并传入字符串"yellow"和一个包含"black"和"brown"的数组。最终，结果数组 colors2 中包含了
"red"、"green"、"blue"、"yellow"、"black"和"brown"。至于原来的数组 colors，其值仍然
保持不变。

// 2
slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下，slice()方法返回从该
参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项—
—但不包括结束位置的项。注意，slice()方法不会影响原始数组。请看下面的例子。
var colors = ["red", "green", "blue", "yellow", "purple"];
var colors2 = colors.slice(1);
var colors3 = colors.slice(1,4);
alert(colors2); //green,blue,yellow,purple
alert(colors3); //green,blue,yellow 
在这个例子中，开始定义的数组 colors 包含 5 项。调用 slice()并传入 1 会得到一个包含 4 项的
新数组；因为是从位置 1 开始复制，所以会包含"green"而不会包含"red"。这个新数组 colors2 中
包含的是"green"、"blue"、"yellow"和"purple"。接着，我们再次调用 slice()并传入了 1 和 4，
表示复制从位置 1 开始，到位置 3 结束。结果数组 colors3 中包含了"green"、"blue"和"yellow"。
#如果 slice()方法的参数中有一个负数，则用数组长度加上该数来确定相应的位置。
#例如，在一个包含 5 项的数组上调用 slice(-2,-1)与调用 slice(3,4)得到的结果相同。如果结束位置小于起始位置，则返回空数组。

// 3
splice()的主要用途是向数组的中部插入项，但使用这种方法的方式则有如下 3 种。
 删除：可以删除任意数量的项，只需指定 2 个参数：要删除的第一项的位置和要删除的项数。
例如，splice(0,2)会删除数组中的前两项。
 插入：可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、0（要删除的项数）
和要插入的项。如果要插入多个项，可以再传入第四、第五，以至任意多个项。例如，
splice(2,0,"red","green")会从当前数组的位置 2 开始插入字符串"red"和"green"。
 替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起
始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，
splice (2,1,"red","green")会删除当前数组位置 2 的项，然后再从位置 2 开始插入字符串
"red"和"green"。
splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何
项，则返回一个空数组）。下面的代码展示了上述 3 种使用 splice()方法的方式。
var colors = ["red", "green", "blue"];
var removed = colors.splice(0,1); // 删除第一项
alert(colors); // green,blue
alert(removed); // red，返回的数组中只包含一项
removed = colors.splice(1, 0, "yellow", "orange"); // 从位置 1 开始插入两项
alert(colors); // green,yellow,orange,blue
alert(removed); // 返回的是一个空数组
removed = colors.splice(1, 1, "red", "purple"); // 插入两项，删除一项
alert(colors); // green,red,purple,orange,blue
alert(removed); // yellow，返回的数组中只包含一项
上面的例子首先定义了一个包含 3项的数组 colors。第一次调用 splice()方法只是删除了这个数组的
第一项，之后 colors 还包含"green"和"blue"两项。第二次调用 splice()方法时在位置 1插入了两项，
结果 colors 中包含"green"、"yellow"、"orange"和"blue"。这一次操作没有删除项，因此返回了一个
空数组。最后一次调用 splice()方法删除了位置 1处的一项，然后又插入了"red"和"purple"。在完成以
上操作之后，数组 colors 中包含的是"green"、"red"、"purple"、"orange"和"blue"。

位置方法
indexOf()和 lastIndexOf()。
var numbers = [1,2,3,4,5,4,3,2,1];
alert(numbers.indexOf(4)); //3  
alert(numbers.lastIndexOf(4)); //5
alert(numbers.indexOf(4, 4)); //5
alert(numbers.lastIndexOf(4, 4)); //3
var person = { name: "Nicholas" };
var people = [{ name: "Nicholas" }];
var morePeople = [person];
alert(people.indexOf(person)); //-1
alert(morePeople.indexOf(person)); //0 

迭代方法
ECMAScript 5 为数组定义了 5 个迭代方法。
每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响 this 的值。
传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。根据使用的方法不同，这个函数执行后的返回值可能
会也可能不会影响方法的返回值。以下是这 5 个迭代方法的作用。
 every()：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true。
 filter()：对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
 forEach()：对数组中的每一项运行给定函数。这个方法没有返回值。
 map()：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
 some()：对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true。
#以上方法都不会修改数组中的包含的值。

every()和 some()，它们都用于查询数组中的项是否满足某个条件。
var numbers = [1,2,3,4,5,4,3,2,1];
var everyResult = numbers.every(function(item, index, array){
 return (item > 2);
});
alert(everyResult); //false
var someResult = numbers.some(function(item, index, array){
 return (item > 2);
});
alert(someResult); //true 
以上代码调用了 every()和 some()，传入的函数只要给定项大于 2就会返回 true。对于 every()，
它返回的是 false，因为只有部分数组项符合条件。对于 some()，结果就是 true，因为至少有一项
是大于 2 的。

filter(), 它利用指定的函数确定是否在返回的数组中包含某一项。例如，要
返回一个所有数值都大于 2 的数组，可以使用以下代码。
var numbers = [1,2,3,4,5,4,3,2,1];
var filterResult = numbers.filter(function(item, index, array){
 return (item > 2);
});
alert(filterResult); //[3,4,5,4,3] 

map(), 也返回一个数组，而这个数组的每一项都是在原始数组中的对应项上运行传入函数的结果。
例如，可以给数组中的每一项乘以 2，然后返回这些乘积组成的数组，如下所示。
var numbers = [1,2,3,4,5,4,3,2,1];
var mapResult = numbers.map(function(item, index, array){
 return item * 2;
});
alert(mapResult); //[2,4,6,8,10,8,6,4,2]

以上代码返回的数组中包含给每个数乘以 2 之后的结果。这个方法适合创建包含的项与另一个数组一一对应的数组。

forEach()，它只是对数组中的每一项运行传入的函数。这个方法没有返回值，
本质上与使用 for 循环迭代数组一样。来看一个例子。
var numbers = [1,2,3,4,5,4,3,2,1];
numbers.forEach(function(item, index, array){
 //执行某些操作
});

归并方法
reduce()和 reduceRight(), reduce(), 方法从数组的第一项开始，逐个遍历
到最后。而 reduceRight()则从数组的最后一项开始，向前遍历到第一项。
这两个方法都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。传给 reduce()和 reduceRight()的函数接收 4 个参数：前一个值、当前值、项的索引和数组对象。这
个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第
一个参数是数组的第一项，第二个参数就是数组的第二项。
使用 reduce()方法可以执行求数组中所有值之和的操作，比如：
var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array){
 return prev + cur;
});
alert(sum); //15 
第一次执行回调函数，prev 是 1，cur 是 2。第二次，prev 是 3（1 加 2 的结果），cur 是 3（数组
的第三项）。这个过程会持续到把数组中的每一项都访问一遍，最后返回结果。
reduceRight()的作用类似，只不过方向相反而已。来看下面这个例子。
var values = [1,2,3,4,5];
var sum = values.reduceRight(function(prev, cur, index, array){
 return prev + cur;
});
alert(sum); //15 
#在这个例子中，第一次执行回调函数，prev 是 5，cur 是 4。当然，最终结果相同，因为执行的都是简单相加的操作。
使用 reduce()还是 reduceRight()，主要取决于要从哪头开始遍历数组。除此之外，它们完全相同。

