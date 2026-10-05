# مبانی TypeScript؛ پیمایشگرها

همانطور که پیشتر در این مطلب نیز توضیح داده شد symbol یک primitive data type مانند number و string است. حین کار کردن با سمبل‌ها باید این نکات را در نظر بگیرید: منحصربفرد و immutable (غیرقابل تغییر) هس

- Published: 2016-03-31
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-2362

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/2362) منتشر شده است.

<div class="postBody"><div>همانطور که پیشتر در <a href="https://www.dntips.ir/post/2298">این مطلب</a> نیز توضیح داده شد symbol یک primitive data type مانند number و string است. حین کار کردن با سمبل‌ها باید این نکات را در نظر بگیرید:<br/> </div> <div> <ul> <li>منحصربفرد و immutable (غیرقابل تغییر) هستند.  <br/> </li> <li>همانند رشته‌ها می‌توان از آن‌ها به عنوان کلیدی برای پراپرتی‌ها یک شیء استفاده کرد.</li> </ul> <div>بنابراین از سمبل‌ها بیشتر جهت توکن‌های منحصر به فرد برای استفاده و به عنوان کلید در پراپرتی‌های اشیاء استفاده خواهد شد. در <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Well-known_symbols">اینجا</a> می‌توانید لیستی از سمبل‌های رایج را مشاهده کنید.</div> <div> <b> <br/> </b> </div> <div> <b>Iterators and Generators</b>   <br/> </div> <div>یک شیء زمانی قابلیت پیمایش را خواهد داشت که یک پیاده‌سازی از Symbol.iterator را داشته باشد: </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="TypeScript" name="code">var myIterable = {}&#10;myIterable[Symbol.iterator] = function* () {&#10;    yield 1;&#10;    yield 2;&#10;    yield 3;&#10;};</pre>
 </div>
در اینحالت می‌توان شیء myIterable را توسط حلقه‌ی for..of پیمایش کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="TypeScript" name="code">for (let item of myIterable) {&#10;  console.log(item);&#10;}</pre>
 </div>
در واقع کار حلقه‌ی for..of حرکت درون یک قابل پیمایش (iterable) است و در هر بار اجرای حلقه پراپرتی Symbol.iterator شیء را فراخوانی خواهد کرد. </div> <div> <b> <br/> </b> </div> <div> <b>تفاوت حلقه‌ی for..of با حلقه‌ی for..in</b> </div> <div>هر دوی این حلقه‌ها یک لیست را پیمایش می‌کنند. با این تفاوت که حلقه‌ی for..in کلید هر آیتم را بر می‌گرداند اما for..of مقدار هر آیتم را بر می‌گرداند:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="TypeScript" name="code">let list = [4, 5, 6];&#10;&#10;for (let i in list) {&#10;   console.log(i); // "0", "1", "2",&#10;}&#10;&#10;for (let i of list) {&#10;   console.log(i); // "4", "5", "6"</pre>
 </div>
نکته‌ی دیگر این است که for..in برای هر شیء‌ی قابل استفاده است یعنی از آن جهت پیمایش پراپرتی‌های یک شیء استفاده خواهد شد. اما for..of برای اشیایی که قابلیت پیمایش را داشته باشند استفاده خواهد شد؛ همانند Map و Set که پراپرتی Symbol.iterator را پیاده‌سازی کرده‌اند.</div> <div>به عنوان مثال کد زیر را در نظر بگیرید:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="TypeScript" name="code">let numbers = [1, 2, 3];&#10;for (let num of numbers) {&#10;    console.log(num);&#10;}</pre>
 </div> </div> <div>اگر <a href="https://www.dntips.ir/post/2360">target</a> را به ES5 و یا ES6 تنظیم کرده باشید، کد تولید شده‌ی یک حلقه‌ی for را به اینصورت برایتان تولید خواهد کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">var numbers = [1, 2, 3];&#10;for (var _i = 0, numbers_1 = numbers; _i &lt; numbers_1.length; _i++) {&#10;    var num = numbers_1[_i];&#10;    console.log(num);&#10;}&#10;//# sourceMappingURL=app.js.map</pre>
 </div> </div> </div></div>
