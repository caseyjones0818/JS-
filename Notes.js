
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
这种传递参数的模式最适合需要向函数传入大量可选参数的情形。一般来讲，命名参数虽然容易处理，但在有多个可选参数的情况下就会显示不够灵活。
最好的做法是对那些必需值使用命名参数，而使用对象字面量来封装多个可选参数。

一般来说，访问对象属性时使用的都是点表示法，这也是很多面向对象语言中通用的语法。不过，在 JavaScript 也可以使用方括号表示法来访问对象的属性。
在使用方括号语法时，应该将要访问的属性以字符串的形式放在方括号中，如下面的例子所示。
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

2.比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回 0，
如果第一个参数应该位于第二个之后则返回一个正数。以下就是一个简单的比较函数：
function compare(value1, value2) {
 if (value1 < value2) {
 return -1;
 } else if (value1 > value2) {
 return 1;
 } else {
 return 0;
 }
}

这个比较函数可以适用于大多数数据类型，只要将其作为参数传递给 sort()方法即可，如下面这个例子所示。
var values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); //0,1,5,10,15 
在将比较函数传递到 sort()方法之后，数值仍然保持了正确的升序。当然，也可以通过比较函数产生降序排序的结果，只要交换比较函数返回的值即可。
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
reduce()和 reduceRight(), reduce(), 方法从数组的第一项开始，逐个遍历到最后。而 reduceRight()则从数组的最后一项开始，向前遍历到第一项。
这两个方法都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。传给 reduce()和 reduceRight()的函数接收 4 个参数：前一个值、当前值、项的索引和数组对象。这
个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数就是数组的第二项。
使用 reduce()方法可以执行求数组中所有值之和的操作，比如：
var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array){
 return prev + cur;
});
alert(sum); //15 
第一次执行回调函数，prev 是 1，cur 是 2。第二次，prev 是 3（1 加 2 的结果），cur 是 3（数组的第三项）。
这个过程会持续到把数组中的每一项都访问一遍，最后返回结果。reduceRight()的作用类似，只不过方向相反而已。来看下面这个例子。
var values = [1,2,3,4,5];
var sum = values.reduceRight(function(prev, cur, index, array){
 return prev + cur;
});
alert(sum); //15 
#在这个例子中，第一次执行回调函数，prev 是 5，cur 是 4。当然，最终结果相同，因为执行的都是简单相加的操作。
使用 reduce()还是 reduceRight()，主要取决于要从哪头开始遍历数组。除此之外，它们完全相同。

*Date 类型
要创建一个日期对象 var now = new Date(); 
ECMAScript 提供了两个方法：Date.parse()和 Date.UTC()。
Date.parse()方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应日期的毫秒数。
 “月/日/年”，如 6/13/2004；
 “英文月名 日,年”，如 January 12,2004；
 “英文星期几 英文月名 日 年 时:分:秒 时区”，如 Tue May 25 2004 00:00:00 GMT-0700。
 ISO 8601 扩展格式 YYYY-MM-DDTHH:mm:ss.sssZ（例如 2004-05-25T00:00:00）。只有兼容
ECMAScript 5 的实现支持这种格式。
例如，要为 2004 年 5 月 25 日创建一个日期对象，可以使用下面的代码：
// 1
var someDate = new Date(Date.parse("May 25, 2004")); 
// 2
var someDate = new Date("May 25, 2004");这行代码将会得到与前面相同的日期对象。

// 3
ECMAScript 5 添加了 Data.now()方法，返回表示调用这个方法时的日期和时间的毫秒数。这个方
法简化了使用 Data 对象分析代码的工作。例如：
//取得开始时间
var start = Date.now();
//调用函数
doSomething();
//取得停止时间
var stop = Date.now(),
 result = stop – start; 

// 4
在不支持Date.now()的浏览器中，使用+操作符把 Data 对象转换成字符串，也可以达到同样的目的。
//取得开始时间
var start = +new Date();
//调用函数
doSomething();
//取得停止时间
var stop = +new Date(),
 result = stop - start; 

日期格式化方法
Date 类型还有一些专门用于将日期格式化为字符串的方法，这些方法如下。
 toDateString()——以特定于实现的格式显示星期几、月、日和年；
 toTimeString()——以特定于实现的格式显示时、分、秒和时区；
 toLocaleDateString()——以特定于地区的格式显示星期几、月、日和年；
 toLocaleTimeString()——以特定于实现的格式显示时、分、秒；
 toUTCString()——以特定于实现的格式完整的 UTC 日期。
与 toLocaleString()和 toString()方法一样，以上这些字符串格式方法的输出也是因浏览器
而异的，因此没有哪一个方法能够用来在用户界面中显示一致的日期信息。

# 除了前面介绍的方法之外，还有一个名叫 toGMTString()的方法，
# 这是一个与toUTCString()等价的方法，其存在目的在于确保向后兼容。
# 不过，ECMAScript 推荐现在编写的代码一律使用 toUTCString()方法。

日期/时间组件方法
getTime() 返回表示日期的毫秒数；与valueOf()方法返回的值相同
setTime(毫秒) 以毫秒数设置日期，会改变整个日期
getFullYear() 取得4位数的年份（如2007而非仅07）
getUTCFullYear() 返回UTC日期的4位数年份
setFullYear(年) 设置日期的年份。传入的年份值必须是4位数字（如2007而非仅07）
setUTCFullYear(年) 设置UTC日期的年份。传入的年份值必须是4位数字（如2007而非仅07）
getMonth() 返回日期中的月份，其中0表示一月，11表示十二月
getUTCMonth() 返回UTC日期中的月份，其中0表示一月，11表示十二月
setMonth(月) 设置日期的月份。传入的月份值必须大于0，超过11则增加年份
setUTCMonth(月) 设置UTC日期的月份。传入的月份值必须大于0，超过11则增加年份
getDate() 返回日期月份中的天数（1到31）
getUTCDate() 返回UTC日期月份中的天数（1到31）
setDate(日) 设置日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份
setUTCDate(日) 设置UTC日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份
getDay() 返回日期中星期的星期几（其中0表示星期日，6表示星期六）
getUTCDay() 返回UTC日期中星期的星期几（其中0表示星期日，6表示星期六）
getHours() 返回日期中的小时数（0到23）
getUTCHours() 返回UTC日期中的小时数（0到23）
setHours(时) 设置日期中的小时数。传入的值超过了23则增加月份中的天数
setUTCHours(时) 设置UTC日期中的小时数。传入的值超过了23则增加月份中的天数
getMinutes() 返回日期中的分钟数（0到59）
getUTCMinutes() 返回UTC日期中的分钟数（0到59）
setMinutes(分) 设置日期中的分钟数。传入的值超过59则增加小时数
setUTCMinutes(分) 设置UTC日期中的分钟数。传入的值超过59则增加小时数
getSeconds() 返回日期中的秒数（0到59）
getUTCSeconds() 返回UTC日期中的秒数（0到59）
setSeconds(秒) 设置日期中的秒数。传入的值超过了59会增加分钟数
setUTCSeconds(秒) 设置UTC日期中的秒数。传入的值超过了59会增加分钟数
getMilliseconds() 返回日期中的毫秒数
getUTCMilliseconds() 返回UTC日期中的毫秒数
setMilliseconds(毫秒) 设置日期中的毫秒数
setUTCMilliseconds(毫秒) 设置UTC日期中的毫秒数
getTimezoneOffset() 返回本地时间与UTC时间相差的分钟数。例如，美国东部标准时间返回300。在某
地进入夏令时的情况下，这个值会有所变化

RegExp 类型
// RegExp使用不多不用记录

*Function 类型
函数通常是使用函数声明语法定义的，如下面的例子所示。
// 1
function sum (num1, num2) {
 return num1 + num2;
}
这与下面使用函数表达式定义函数的方式几乎相差无几。
// 2
var sum = function(num1, num2){
 return num1 + num2;
}; 
以上代码定义了变量 sum 并将其初始化为一个函数。有读者可能会注意到，function 关键字后面
没有函数名。这是因为在使用函数表达式定义函数时，没有必要使用函数名——通过变量 sum 即可以引
用函数。另外，还要注意函数末尾有一个分号，就像声明其他变量时一样。
// 3
var sum = new Function("num1", "num2", "return num1 + num2"); // 不推荐

# 一个函数可能会有多个名字，如下面的例子所示。
function sum(num1, num2){
 return num1 + num2;
}
alert(sum(10,10)); //20
var anotherSum = sum;
alert(anotherSum(10,10)); //20
sum = null;
alert(anotherSum(10,10)); //20 
以上代码首先定义了一个名为 sum()的函数，用于求两个值的和。然后，又声明了变量 anotherSum，
并将其设置为与 sum 相等（将 sum 的值赋给 anotherSum）。注意，使用不带圆括号的函数名是访问函
数指针，而非调用函数。此时，anotherSum 和 sum 就都指向了同一个函数，因此 anotherSum()也
可以被调用并返回结果。即使将 sum 设置为 null，让它与函数“断绝关系”，但仍然可以正常调用
anotherSum()。

# 没有重载（深入理解）
将函数名想象为指针，也有助于理解为什么 ECMAScript 中没有函数重载的概念。以下是曾在第 3章使用过的例子。
function addSomeNumber(num){
 return num + 100;
}
function addSomeNumber(num) {
 return num + 200;
}
显然，这个例子中声明了两个同名函数，而结果则是后面的函数覆盖了前面的函数。以上代码实际上与下面的代码没有什么区别。
var addSomeNumber = function (num){
 return num + 100;
};
addSomeNumber = function (num) {
 return num + 200;
};
var result = addSomeNumber(100); //300
通过观察重写之后的代码，很容易看清楚到底是怎么回事儿——在创建第二个函数时，实际上覆盖
了引用第一个函数的变量 addSomeNumber

 *函数声明和函数表达式区别
 #解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。
 #解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，
 #才会真正被解释执行。请看下面的例子。
 // 1
 alert(sum(10,10));
 function sum(num1, num2){
  return num1 + num2;
 } 
以上代码完全可以正常运行。因为在代码开始执行之前，解析器就已经通过一个名为函数声明提升（function declaration hoisting）的过程，
读取并将函数声明添加到执行环境中。对代码求值时，JavaScript引擎在第一遍会声明函数并将它们放到源代码树的顶部。
所以，即使声明函数的代码在调用它的代码后面，JavaScript 引擎也能把函数声明提升到顶部。如果像下面例子所示的，把上面的函数声明改为等价
的函数表达式，就会在执行期间导致错误。
// 2
alert(sum(10,10));
var sum = function(num1, num2){
 return num1 + num2;
}; 
以上代码之所以会在运行期间产生错误，原因在于函数位于一个初始化语句中，而不是一个函数声明。
换句话说，在执行到函数所在的语句之前，变量 sum 中不会保存有对函数的引用；而且，由于第一行代码就会导致“unexpected identifier”（意外标识符）错误，
实际上也不会执行到下一行。除了什么时候可以通过变量访问函数这一点区别之外，函数声明与函数表达式的语法其实是等价的。
#也可以同时使用函数声明和函数表达式，例如 var sum = function sum(){}。不过，这种语法在 Safari 中会导致错误。

*作为值的函数
因为 ECMAScript 中的函数名本身就是变量，所以函数也可以作为值来使用。也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，
而且可以将一个函数作为另一个函数的结果返回。来看一看下面的函数。
function callSomeFunction(someFunction, someArgument){
 return someFunction(someArgument);
} 
这个函数接受两个参数。第一个参数应该是一个函数，第二个参数应该是要传递给该函数的一个值。然后，就可以像下面的例子一样传递函数了。
// 1
function add10(num){
 return num + 10;
}
var result1 = callSomeFunction(add10, 10);
alert(result1); //20
// 2
function getGreeting(name){
 return "Hello, " + name;
}
var result2 = callSomeFunction(getGreeting, "Nicholas");
alert(result2); //"Hello, Nicholas" 

这里的 callSomeFunction()函数是通用的，即无论第一个参数中传递进来的是什么函数，它都
会返回执行第一个参数后的结果。还记得吧，要访问函数的指针而不执行函数的话，必须去掉函数名后
面的那对圆括号。
#因此上面例子中传递给 callSomeFunction()的是 add10 和 getGreeting，而不是执行它们之后的结果。

函数内部属性
在函数内部，有两个特殊的对象：arguments 和 this。
#arguments 暂时不写

this引用的是函数据以执行的环境对象——或者也可以说是 this 值（当在网页的全局作用域中调用函数时，
this 对象引用的就是 window）。来看下面的例子。
window.color = "red";
var o = { color: "blue" };
function sayColor(){
 alert(this.color);
}
sayColor(); //"red"
o.sayColor = sayColor;
o.sayColor(); //"blue" 

#caller暂时不写

函数属性和方法
每个函数都包含两个属性：length 和 prototype。
其中，length 属性表示函数希望接收的命名参数的个数，如下面的例子所示。
function sayName(name){
 alert(name);
}
function sum(num1, num2){
 return num1 + num2;
}
function sayHi(){
 alert("hi");
}
alert(sayName.length); //1
alert(sum.length); //2
alert(sayHi.length); //0 

#每个函数都包含两个非继承而来的方法：apply()和 call()。
这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内 this 对象的值。
apply()方法，接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以是 Array 的实例，也可以是arguments 对象。
例如：
function sum(num1, num2){
 return num1 + num2;
}
function callSum1(num1, num2){
 return sum.apply(this, arguments); // 传入 arguments 对象
}
function callSum2(num1, num2){
 return sum.apply(this, [num1, num2]); // 传入数组
}
alert(callSum1(10,10)); //20
alert(callSum2(10,10)); //20 
#在上面这个例子中，callSum1()在执行 sum()函数时传入了 this 作为 this 值（因为是在全局
#作用域中调用的，所以传入的就是 window 对象）和 arguments 对象。而 callSum2 同样也调用了
#sum()函数，但它传入的则是 this 和一个参数数组。这两个函数都会正常执行并返回正确的结果。

call()方法与 apply()方法的作用相同，它们的区别仅在于接收参数的方式不同。
# 在使用call()方法时，传递给函数的参数必须逐个列举出来
function sum(num1, num2){
 return num1 + num2;
}
function callSum(num1, num2){
 return sum.call(this, num1, num2);
}
alert(callSum(10,10)); //20 

#传递参数并非 apply()和 call()真正的用武之地；它们真正强大的地方是能够扩充函数赖以运行的作用域。
call()，下面例子
window.color = "red";
var o = { color: "blue" };
function sayColor(){
 alert(this.color);
}
sayColor(); //red
sayColor.call(this); //red
sayColor.call(window); //red
sayColor.call(o); //blue 
在前面例子的第一个版本中，我们是先将 sayColor()函数放到了对象 o 中

bind()，这个方法会创建一个函数的实例，其 this 值会被绑定到传给 bind()函数的值。
例如：
window.color = "red";
var o = { color: "blue" };
function sayColor(){
 alert(this.color);
}
var objectSayColor = sayColor.bind(o);
objectSayColor(); //blue 

Boolean类型
Number类型
String类型
暂定

# 第6章 面向对象的程序设计
ECMAScript 中没有类的概念，因此它的对象也与基于类的语言中的对象有所不同。
ECMA-262 把对象定义为：“无序属性的集合，其属性可以包含基本值、对象或者函数。”
我们可以把 ECMAScript 的对象想象成散列表：无非就是一组名值对，其中值可以是数据或函数。
每个对象都是基于一个引用类型创建的，这个引用类型可以是第 5 章讨论的原生类型，也可以是开发人员定义的类型。

理解对象
var person = {
 name: "Nicholas",
 age: 29,
 job: "Software Engineer",
 sayName: function(){
 alert(this.name);
 }
}; 
属性类型
ECMAScript 中有两种属性：数据属性和访问器属性。
1. 数据属性
数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有 4 个描述其行为的特性。
 [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特
性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的
这个特性默认值为 true。
 [[Enumerable]]：表示能否通过 for-in 循环返回属性。像前面例子中那样直接在对象上定
义的属性，它们的这个特性默认值为 true。
 [[Writable]]：表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的
这个特性默认值为 true。
 [[Value]]：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，
把新值保存在这个位置。这个特性的默认值为 undefined。
对于像前面例子中那样直接在对象上定义的属性，它们的[[Configurable]]、[[Enumerable]]
和[[Writable]]特性都被设置为 true，而[[Value]]特性被设置为指定的值。例如：
var person = {};
Object.defineProperty(person, "name", {
 writable: false,
 value: "Nicholas"
});
alert(person.name); //"Nicholas"
person.name = "Greg";
alert(person.name); //"Nicholas" 
这个例子创建了一个名为 name 的属性，它的值"Nicholas"是只读的。这个属性的值是不可修改
的，如果尝试为它指定新值，则在非严格模式下，赋值操作将被忽略；在严格模式下，赋值操作将会导
致抛出错误。
类似的规则也适用于不可配置的属性。例如：
var person = {};
Object.defineProperty(person, "name", {
 configurable: false,
 value: "Nicholas"
});
alert(person.name); //"Nicholas"
delete person.name;
alert(person.name); //"Nicholas" 
多数情况下，可能都没有必要利用 Object.defineProperty()方法提供的这些高级功能。不过，理解这些概念对理解 JavaScript 对象却非常有用。
2. 访问器属性
访问器属性不包含数据值；它们包含一对儿 getter 和 setter 函数（不过，这两个函数都不是必需的）。
访问器属性不能直接定义，必须使用 Object.defineProperty()来定义。请看下面的例子。
var book = {
 _year: 2004,
 edition: 1
};
Object.defineProperty(book, "year", {
 get: function(){
 return this._year;
 },
 set: function(newValue){
 if (newValue > 2004) {
 this._year = newValue;
 this.edition += newValue - 2004;
 }
 }
});
book.year = 2005;
alert(book.edition); //2 

定义多个属性
Object.defineProperties()方法。利用这个方法可以通过描述符一次定义多个属性。这个方法接收两个对象参数：第一
个对象是要添加和修改其属性的对象，第二个对象的属性与第一个对象中要添加或修改的属性一一对
应。例如：
var book = {};
Object.defineProperties(book, {
 _year: {
 value: 2004
 },

 edition: {
 value: 1
 },
 year: {
 get: function(){ 
  return this._year;
 },
 set: function(newValue){
 if (newValue > 2004) {
 this._year = newValue;
 this.edition += newValue - 2004;
    }
   }
 }
}); 
以上代码在 book 对象上定义了两个数据属性（_year 和 edition）和一个访问器属性（year）。
最终的对象与上一节中定义的对象相同。唯一的区别是这里的属性都是在同一时间创建的。

读取属性的特性
使用 ECMAScript 5 的 Object.getOwnPropertyDescriptor()方法，可以取得给定属性的描述
符。这个方法接收两个参数：属性所在的对象和要读取其描述符的属性名称。返回值是一个对象，如果
是访问器属性，这个对象的属性有 configurable、enumerable、get 和 set；如果是数据属性，这
个对象的属性有 configurable、enumerable、writable 和 value。例如：
var book = {};
Object.defineProperties(book, {
 _year: {
 value: 2004
 },
 edition: {
 value: 1
 },
 year: {
 get: function(){
 return this._year;
 },
 set: function(newValue){
 if (newValue > 2004) {
 this._year = newValue;
 this.edition += newValue - 2004;
 }
 }
 }
});
var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
alert(descriptor.value); //2004
alert(descriptor.configurable); //false 
alert(typeof descriptor.get); //"undefined"
var descriptor = Object.getOwnPropertyDescriptor(book, "year");
alert(descriptor.value); //undefined
alert(descriptor.enumerable); //false
alert(typeof descriptor.get); //"function" 

**创建对象
虽然 Object 构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同
一个接口创建很多对象，会产生大量的重复代码。为解决这个问题，人们开始使用工厂模式的一种变体。

工厂模式是软件工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的过程（本书后
面还将讨论其他设计模式及其在 JavaScript 中的实现）。考虑到在 ECMAScript 中无法创建类，开发人员
就发明了一种函数，用函数来封装以特定接口创建对象的细节，如下面的例子所示。
function createPerson(name, age, job){
   var o = new Object();
   o.name = name;
   o.age = age;
   o.job = job;
   o.sayName = function(){
   alert(this.name);
   };
   return o;
}
var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");
#工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。随着 JavaScript的发展，又一个新模式出现了。
*构造函数模式
ECMAScript 中的构造函数可用来创建特定类型的对象。像 Object 和 Array 这样的原生构造函数，在运行时会自动出现在执行环境中。此外，也可以创建自定义的构造函数，
从而定义自定义对象类型的属性和方法。例如，可以使用构造函数模式将前面的例子重写如下。
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function(){
  alert(this.name);
  };
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor"); 
我们注意到，Person()中的代码除了与 createPerson()中相同的部分外，还存在以下不同之处：
 没有显式地创建对象；
 直接将属性和方法赋给了 this 对象；
 没有 return 语句。
此外，还应该注意到函数名 Person 使用的是大写字母 P。按照惯例，构造函数始终都应该以一个
大写字母开头，而非构造函数则应该以一个小写字母开头。这个做法借鉴自其他 OO 语言，主要是为了
区别于 ECMAScript 中的其他函数；因为构造函数本身也是函数，只不过可以用来创建对象而已。
要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下
4个步骤：
(1) 创建一个新对象；
(2) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
(3) 执行构造函数中的代码（为这个新对象添加属性）；
(4) 返回新对象
在前面例子的最后，person1 和 person2 分别保存着 Person 的一个不同的实例。
#这两个对象都有一个 constructor（构造函数）属性，该属性指向 Person，如下所示。
alert(person1.constructor == Person); //true
alert(person2.constructor == Person); //true 
对象的 constructor 属性最初是用来标识对象类型的。但是，提到检测对象类型，还是 instanceof操作符要更可靠一些。
我们在这个例子中创建的所有对象既是 Object 的实例，同时也是 Person的实例，这一点通过 instanceof 操作符可以得到验证。
alert(person1 instanceof Object); //true
alert(person1 instanceof Person); //true
alert(person2 instanceof Object); //true
alert(person2 instanceof Person); //true 
#创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型；而这正是构造函数模式胜过工厂模式的地方。
在这个例子中，person1 和 person2 之所以同时是 Object 的实例，是因为所有对象均继承自 Object（详细内容稍后讨论）。

将构造函数当作函数
任何函数，只要通过 new 操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过 new 操作符来调用，
那它跟普通函数也不会有什么两样。例如，前面例子中定义的 Person()函数可以通过下列任何一种方式来调用。
// 当作构造函数使用
var person = new Person("Nicholas", 29, "Software Engineer");
person.sayName(); //"Nicholas"
// 作为普通函数调用
Person("Greg", 27, "Doctor"); // 添加到 window
window.sayName(); //"Greg"
// 在另一个对象的作用域中调用
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName(); //"Kristen" 

构造函数的问题
使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。在前面的例子中，person1 和 person2 都有一个名为 sayName()的方法，但那
两个方法不是同一个 Function 的实例。

*原型模式* #（重点攻克区）
prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。
换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中，如下面的例子所示。
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
 alert(this.name);
};
var person1 = new Person();
person1.sayName(); //"Nicholas"
var person2 = new Person(); 
person2.sayName(); //"Nicholas"
alert(person1.sayName == person2.sayName); //true 
要理解原型模式的工作原理，必须先理解 ECMAScript 中原型对象的性质。

理解原型对象
无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 prototype
属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 constructor
（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针。
# isPrototypeOf()
虽然在所有实现中都无法访问到[[Prototype]]，但可以通过 isPrototypeOf()方法来确定对象之
间是否存在这种关系。从本质上讲，如果[[Prototype]]指向调用 isPrototypeOf()方法的对象
（Person.prototype），那么这个方法就返回 true，如下所示：
alert(Person.prototype.isPrototypeOf(person1)); //true
alert(Person.prototype.isPrototypeOf(person2)); //true 
#这里，我们用原型对象的 isPrototypeOf()方法测试了 person1 和 person2。因为它们内部都有一个指向 Person.prototype 的指针，因此都返回了 true。
#getPrototypeOf()
ECMAScript 5 增加了一个新方法，叫 Object.getPrototypeOf()，在所有支持的实现中，这个
方法返回[[Prototype]]的值。例如：
alert(Object.getPrototypeOf(person1) == Person.prototype); //true
alert(Object.getPrototypeOf(person1).name); //"Nicholas" 

#实例中添加与实例原型中的一个属性同名，该属性将会屏蔽原型中的那个属性。来看下面的例子。 
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
 alert(this.name);
};
var person1 = new Person(); 
var person2 = new Person();
person1.name = "Greg";
alert(person1.name); //"Greg"——来自实例
alert(person2.name); //"Nicholas"——来自原型
#使用 delete 操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性，如下所示。
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
 alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
person1.name = "Greg";
alert(person1.name); //"Greg"——来自实例
alert(person2.name); //"Nicholas"——来自原型
delete person1.name;
alert(person1.name); //"Nicholas"——来自原型

#使用 hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在于原型中。这个方法（不要忘了它是从 Object 继承来的）
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){ 
  alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
alert(person1.hasOwnProperty("name")); //false
person1.name = "Greg";
alert(person1.name); //"Greg"——来自实例
alert(person1.hasOwnProperty("name")); //true
alert(person2.name); //"Nicholas"——来自原型
alert(person2.hasOwnProperty("name")); //false
delete person1.name;
alert(person1.name); //"Nicholas"——来自原型
alert(person1.hasOwnProperty("name")); //false 

要取得对象上所有可枚举的实例属性，可以使用 ECMAScript 5 的 Object.keys()方法。这个方法
接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。例如：
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
 alert(this.name);
};
var keys = Object.keys(Person.prototype);
alert(keys); //"name,age,job,sayName"
var p1 = new Person();
p1.name = "Rob";
p1.age = 31;
var p1keys = Object.keys(p1);
alert(p1keys); //"name,age" 
如果你想要得到所有实例属性，无论它是否可枚举，都可以使用 Object.getOwnPropertyNames()方法。
var keys = Object.getOwnPropertyNames(Person.prototype);
alert(keys); //"constructor,name,age,job,sayName" 
#注意结果中包含了不可枚举的 constructor 属性。Object.keys()和 Object.getOwnPropertyNames()方法都可以用来替代for-in 循环。

***更简单的原型语法
#前面例子中每添加一个属性和方法就要敲一遍 Person.prototype。为减少不必要的输入，也为了从视觉上更好地封装原型的功能，更常见的做法是用一个包含所有属性和方法的
#对象字面量来重写整个原型对象，如下面的例子所示。
function Person(){
}
Person.prototype = {
   name : "Nicholas",
   age : 29,
   job: "Software Engineer",
   sayName : function () {
   alert(this.name);
   }
}; 
在上面的代码中，我们将 Person.prototype 设置为等于一个以对象字面量形式创建的新对象。
最终结果相同，但有一个例外：constructor 属性不再指向 Person 了。
var friend = new Person();
alert(friend instanceof Object); //true
alert(friend instanceof Person); //true
alert(friend.constructor == Person); //false
alert(friend.constructor == Object); //true 
在此，用 instanceof 操作符测试 Object 和 Person 仍然返回 true，但 constructor 属性则
等于 Object 而不等于 Person 了。如果 constructor 的值真的很重要，可以像下面这样特意将它设
置回适当的值。
function Person(){
}
Person.prototype = {
   constructor : Person,
   name : "Nicholas",
   age : 29,
   job: "Software Engineer",
   sayName : function () {
   alert(this.name);
   }
};
注意，以这种方式重设 constructor 属性会导致它的[[Enumerable]]特性被设置为 true。默认情况下，
原生的 constructor 属性是不可枚举的，因此如果你使用兼容 ECMAScript 5 的 JavaScript 引擎，
可以试一试 #Object.defineProperty()。
//重设构造函数，只适用于 ECMAScript 5 兼容的浏览器
Object.defineProperty(Person.prototype, "constructor", {
 enumerable: false,
 value: Person
}); 

原型的动态性
由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上
反映出来——即使是先创建了实例后修改原型也照样如此。请看下面的例子。
// 1
var friend = new Person();
Person.prototype.sayHi = function(){
 alert("hi");
};
friend.sayHi(); //"hi"（没有问题！）
尽管可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来，但如果是重
写整个原型对象，那么情况就不一样了。我们知道，调用构造函数时会为实例添加一个指向最初原型的
[[Prototype]]指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。
请记住：实例中的指针仅指向原型，而不指向构造函数。看下面的例子。
// 2
function Person(){
}
var friend = new Person();

Person.prototype = {
 constructor: Person,
 name : "Nicholas",
 age : 29,
 job : "Software Engineer",
 sayName : function () {
 alert(this.name);
 }
};
friend.sayName(); //error 

原生对象的原型
所有原生引用类型（Object、Array、String，等等）都在其构造函数的原型上定义了方法。
例如，在 Array.prototype 中可以找到 sort()方法，而在 String.prototype 中可以找到
substring()方法，如下所示。
alert(typeof Array.prototype.sort); //"function"
alert(typeof String.prototype.substring); //"function" 
通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。可以像修改自
定义对象的原型一样修改原生对象的原型，因此可以随时添加方法。下面的代码就给基本包装类型
String 添加了一个名为 startsWith()的方法。


#通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。可以像修改自
#定义对象的原型一样修改原生对象的原型，因此可以随时添加方法。下面的代码就给基本包装类型String 添加了一个名为 startsWith()的方法。
String.prototype.startsWith = function (text) {
 return this.indexOf(text) == 0;
};
var msg = "Hello world!";
alert(msg.startsWith("Hello")); //true 

原型对象的问题
原型模式也不是没有缺点。首先，它省略了为构造函数传递初始化参数这一环节，结果所有实例在
默认情况下都将取得相同的属性值。虽然这会在某种程度上带来一些不方便，但还不是原型的最大问题。
原型模式的最大问题是由其共享的本性所导致的。
原型中所有属性是被很多实例共享的，这种共享对于函数非常合适。
function Person(){
}
Person.prototype = {
 constructor: Person,
 name : "Nicholas",
 age : 29,
 job : "Software Engineer",
 friends : ["Shelby", "Court"],
 sayName : function () {
 alert(this.name);
 }
};
var person1 = new Person();
var person2 = new Person();
person1.friends.push("Van");
alert(person1.friends); //"Shelby,Court,Van"
alert(person2.friends); //"Shelby,Court,Van"
alert(person1.friends === person2.friends); //true 

***组合使用构造函数模式和原型模式
创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。
构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，
但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参数；可谓是集两种模式之长。
下面的代码重写了前面的例子。
function Person(name, age, job){ // 构造函数模式
 this.name = name;
 this.age = age;
 this.job = job;
 this.friends = ["Shelby", "Court"];
}
Person.prototype = {     //原型模式
 constructor : Person,
 sayName : function(){
 alert(this.name);
 }
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
alert(person1.friends); //"Shelby,Count,Van"
alert(person2.friends); //"Shelby,Count"
alert(person1.friends === person2.friends); //false
alert(person1.sayName === person2.sayName); //true 
在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性 constructor 和方
法 sayName()则是在原型中定义的。而修改了 person1.friends（向其中添加一个新字符串），并不
会影响到 person2.friends，因为它们分别引用了不同的数组。
#这种构造函数与原型混成的模式，是目前在 ECMAScript 中使用最广泛、认同度最高的一种创建自定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。

动态原型模式
可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。
function Person(name, age, job){
 //属性
 this.name = name;
 this.age = age;
 this.job = job; 
 //方法
 if (typeof this.sayName != "function"){

 Person.prototype.sayName = function(){
 alert(this.name);
 };

 }
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName(); 

寄生构造函数模式
function Person(name, age, job){
 var o = new Object();
 o.name = name;
 o.age = age;
 o.job = job;
 o.sayName = function(){
 alert(this.name);
 };
 return o;
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName(); //"Nicholas" 

稳妥构造函数模式
function Person(name, age, job){

 //创建要返回的对象
 var o = new Object(); 
 //可以在这里定义私有变量和函数
 //添加方法
 o.sayName = function(){
 alert(name);
 };
  //返回对象
 return o;
 } 
 var friend = Person("Nicholas", 29, "Software Engineer");
 friend.sayName(); //"Nicholas" 

 继承
 ECMAScript 只支持实现继承，而且其实现继承主要是依靠原型链来实现的。
 原型链
 ECMAScript 中描述了#原型链的概念，并将原型链作为实现继承的主要方法。
 #其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。
 简单回顾一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型
 对象的内部指针。
 假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实
 例与原型的链条。这就是所谓原型链的基本概念。
 
 实现原型链有一种基本模式，其代码大致如下。
function SuperType(){
  this.property = true;
} 
SuperType.prototype.getSuperValue = function(){
  return this.property;
};
function SubType(){
  this.subproperty = false;
}
//继承了 SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function (){
  return this.subproperty;
};
var instance = new SubType();
alert(instance.getSuperValue()); //true 
以上代码定义了两个类型：SuperType 和 SubType。每个类型分别有一个属性和一个方法。它们
的主要区别是 SubType 继承了 SuperType，而继承是通过创建 SuperType 的实例，并将该实例赋给
SubType.prototype 实现的。
 
 
 







