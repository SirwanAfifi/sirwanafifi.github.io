# ساختارهای داده‌ی توکار ES 6

در ES 5 تنها آرایه (Array) و آبجکت (Object) را به عنوان ساختار داده‌ایی، به صورت توکار در اختیار داریم. Array یک کالکشن مبتنی بر ایندکس است. همچنین می‌توان هر نوع مقداری را در آن ذخیره کرد: var collec

- Published: 2016-01-04
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-2302

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/2302) منتشر شده است.

<div class="postBody">در ES 5 تنها آرایه (Array) و آبجکت (Object) را به عنوان ساختار داده‌ایی، به صورت توکار در اختیار داریم.<div>Array یک کالکشن مبتنی بر ایندکس است. همچنین می‌توان هر نوع مقداری را در آن ذخیره کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">var collection = ['a', 1, /3/, {}];</pre>
 </div>
یعنی هر کدام از اعضای آرایه می‌توانند جنس متفاوتی داشته باشند. همانطور که در کد فوق مشاهده می‌کنید اعضای آرایه به ترتیب از کاراکتر، عدد، عبارت با قاعده و در نهایت یک شیء خالی تشکیل شده است. همانطور که عنوان شد آرایه‌ها در جاوا اسکریپت همانند دیگر زبان‌های برنامه‌نویسی مبتنی بر ایندکس هستند، یعنی می‌توان براساس ایندکس به هر کدام از اعضای آرایه دسترسی داشت:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">collection[0];</pre>
 </div>
می‌توان از پراپرتی length نیز برای دریافت سایز آرایه استفاده کرد: </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">collection.length</pre>
 </div>
همانطور که در مثال ابتدای بحث مشاهده کردید، آرایه‌ها در جاوا اسکریپت توسط سینتکس [] قابل تعریف هستند. تعدادی تابع توکار برای کار با آرایه‌ها موجود است که در <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#Array_methods">اینجا</a> می‌توانید لیست کامل آنها را مشاهد نمائید. همچنین می‌توانید از کتابخانه‌های دیگری مانند Underscore.js که در واقع هدف آن‌ها افزودن یکسری قابلیت‌ها به جاوا اسکریپت است، استفاده کنید:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var numbers = [1, 2, 3];&#10;&#10;_.each(numbers, function (num) {&#10;    write(num);&#10;});</pre>
 </div>
در ES 6 تعدادی تابع جدید به Array اضافه شده که کار با آرایه‌ها را ساده‌تر کرده است. در ادامه تعدادی از این توابع را بررسی خواهیم کرد.</div> <div> <b>تابع find</b> </div> <div>این تابع از ورودی، یک callback را گرفته و نتایج یافته شده را در خروجی برمی‌گرداند:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var ary = [1, 5, 10];&#10;var match = ary.find(item =&gt; item &gt; 8);</pre>
 </div> <b>تابع findIndex</b> </div> <div>این تابع مشابه تابع find عمل می‌کند با این تفاوت که در خروجی ایندکس عنصر یافته شده را برمی‌گرداند:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var match = ary.findIndex(item =&gt; item &gt; 8);</pre>
 </div> <b>تابع fill</b> </div> <div>از این تابع می‌توان جهت مقداردهی اعضای آرایه با پارامتر موردنظر استفاده کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;"> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">ary.find('a');&#10;// خروجی ["a", "a", "a"]</pre>
 </div> </div>
لازم به ذکر است، به این تابع می‌توانیم دو پارامتر دیگر را نیز پاس دهیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var ary = [1, 5, 10, 5, 6];&#10;ary.fill('a', 2, 3)</pre>
 </div>
در کد فوق پارامتر دوم یعنی نقطه شروع و پارامتر سوم یعنی نقطه پایان:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">// خروجی&#10;[ 1, 5, "a", 5, 6 ]</pre>
 </div> <b>تابع copyWithin</b> </div> <div>با کمک این تابع می‌توانیم قسمتی از یک آرایه را کپی کرده و در محل دیگری از آرایه ذخیره کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">[1, 2, 3, 4, 5].copyWithin(0, 3);</pre>
 </div>
کد فوق از نقطه‌ی سوم شروع به کپی کردن آیتم‌ها کرده و آنها را در موقعیت صفرم آرایه به بعد قرار می‌دهد. در نتیجه خروجی آن به این صورت است:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">// [4, 5, 3, 4, 5]</pre>
 </div>
لازم به ذکر است که یک پارامتر سوم را نیز می‌توانیم جهت تعیین نقطه‌ی پایان به تابع فوق اضافه کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;"> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">[1, 2, 3, 4, 5].copyWithin(0, 3, 4);&#10;// خروجی &#10;// [4, 2, 3, 4, 5]</pre>
 </div> </div>
در ES 6 علاوه بر سینتکس literal می‌توان از سازنده‌ی کلاس Array نیز جهت تعریف آرایه‌ها، استفاده کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var ary = new Array(1, 2);</pre>
 </div>
کد فوق یک آرایه را با دو مقدار 1 و 2 ایجاد می‌کند. اگر بخواهیم یک آیتم جدید را به آرایه‌ی فوق اضافه کنیم، باید آن را نیز به پارامترهای فوق اضافه کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var ary = new Array(1, 2, 3);</pre>
 </div>
ممکن است فکر کنید توسط کد زیر آرایه‌ایی تنها با یک آیتم برای ما ایجاد خواهد شد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var ary = new Array(3);</pre>
 </div>
در واقع کد فوق یک آرایه با اندازه‌ی سه و محتوای undefined را برای شما ایجاد خواهد کرد. در نتیجه برای ایجاد آرایه‌ایی با یک آیتم و مقدار 3 باید از متد Of کلاس Array استفاده کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var Ofary = Array.of(3);</pre>
 </div> </div> <div> <b> <br/> </b> </div> <div> <b>Set</b> </div> <div>Set یک ساختار داده‌ایی جدید در ES 6 است. این ساختار داده‌ایی امکان تعریف کالکشنی از مقادیر را به صورت unique، در اختیارمان قرار می‌دهد. برخلاف آرایه‌ها مقادیر درون Set نمی‌تواند یکسان باشند. در کد زیر نحوه‌ی ایجاد یک Set نشان داده شده است:</div> <div> <div align="left" dir="ltr" style="direction: ltr;"> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var set = new Set();&#10;set.add(1);&#10;set.add(2);&#10;set.add(3);&#10;console.log(set.size); // logs 3</pre>
 </div> </div>
 Set به صورت یک مجموعه‌ی  <a href="https://www.dntips.ir/post/2297">Iterable</a> است یعنی می‌توان اعضای این مجموعه را آیتم به آیتم پیمایش کرد. همانطور که در کد فوق مشاهده می‌کنید توسط add می‌توانیم آیتم جدیدی را به مجموعه اضافه کنیم. همچنین اگر مایل بودید می‌توانید مجموعه را توسط یک آرایه به صورت زیر نیز مقداردهی کنید: </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var set = new Set([1, 2, 3]);&#10;console.log(set.size); // logs 3</pre>
 </div>
از توابع has, delete, clear نیز به ترتیب می‌توان جهت خالی کردن مجموعه، حذف یک آیتم از مجموعه و بررسی یک آیتم در مجموعه استفاده کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var set = new Set();&#10;set.has(1); // false&#10;set.add(1);&#10;set.has(1); // true&#10;set.clear();&#10;set.has(1); // false&#10;set.add(1);&#10;set.add(2);&#10;set.size;   // 2&#10;set.delete(2);&#10;set.size;   // 1</pre>
 </div>
از تابع feorach نیز می‌توانیم برای حرکت بین آیتم‌های مجموعه استفاده کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var set = new Set();&#10;set.add('Vahid');&#10;set.add('Sirwan');&#10;&#10;var i = 0;&#10;set.forEach(item =&gt; i++);&#10;console.log(i);</pre>
 </div>
همچنین از سینتکس for...of نیز می‌توان برای پیمایش مجموعه استفاده کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var set = new Set();&#10;set.add('Vahid');&#10;set.add('Sirwan');&#10;&#10;var i = 0;&#10;for(let item of set) {&#10;    i++;&#10;}&#10;console.log(i);</pre>
 </div>
Set دارای یک تابع دیگر با نام entries است. با کمک این تابع یک iterator از مجموعه برگردانده خواهد شد که با کمک تابع next می‌توان به عناصر بعدی مجموعه دسترسی پیدا کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;"> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var set = new Set();&#10;set.add("Sirwan");&#10;set.add(1);&#10;set.add("Afifi");&#10;&#10;var setIter = set.entries();&#10;&#10;console.log(setIter.next().value); // ["Sirwan", "Sirwan"]&#10;console.log(setIter.next().value); // [1, 1]&#10;console.log(setIter.next().value); // ["Afifi", "Afifi"]</pre>
 </div> </div> <b> <div> <b> <br/> </b> </div>
Map</b> </div> <div>برخلاف Set که یک مجموعه از مقادیر (values) است، Map یک مجموعه از کلید/مقدار (key/value) می‌باشد. در اینجا نیز کلیدها باید unique باشند. همچنین می‌توان از هر نوعی برای کلید استفاده کرد. برای افزودن یک مقدار به این مجموعه باید از تابع set استفاه کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">var map = new Map();&#10;map.set('name', 'Sirwan');&#10;&#10;map.get('name'); // Sirwan</pre>
 </div>
همانطور که مشاهده می‌کنید توسط تابع get نیز می‌توانیم با استفاده از کلید، به مقدار آن دسترسی داشته باشیم. همچنین می‌توانیم آرایه‌ایی از آرایه‌ها را به عنوان کلید در یک Map ذخیره کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;"> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var map = new Map([['name', 'Sirwan'], ['age', 27]]);&#10;map.has('age'); // true&#10;map.get('age'); // 27&#10;map.get('name'); // Sirwan</pre>
 </div> <br/> </div>
نکته‌ایی که در استفاده از Map باید به آن دقت کنید این است که در اینجا هیچ تبدیل نوعی را بر روی کلیدها نداریم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var map = new Map();&#10;&#10;map.set(1, true);&#10;map.has("1"); // false&#10;&#10;map.set("1", true);&#10;map.has("1"); // true</pre>
 </div>
همانند Set برای Map نیز می‌توانیم از توابع delete و clear استفاده کنیم. برای استفاده از foreach باید برای callback دو پارامتر را ارائه دهیم. یکی برای value و دیگری برای key:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">var map = new Map([['name', 'Sirwan'], ['age', 27]]);&#10;var i = 0;&#10;map.forEach(function (value, key) {&#10;    i++;&#10;});&#10;console.log(i); // log 2</pre>
 </div>
برای سینتکس for...of نیز می‌توانیم به اینصورت عمل کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">for (var [key, value] of map) {&#10;    i++;&#10;}</pre>
 </div> <div>شاید بپرسید که همین کار را می‌توان با استفاده از آرایه‌ها نیز انجام داد و چه نیازی به یک ساختار داده‌ایی جدید است؟</div> <div>اگر بخواهید Map را با استفاده از آرایه‌ها شبیه‌سازی کنید باید از Associative Arrays استفاده کنید؛ به زبان ساده در این‌حالت به جای استفاده از عدد به جای ایندکس می‌توان رشته‌ها نیز استفاده کرد. به عنوان مثال کد زیر را در نظر بگیرید:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">var newArray = new Array();&#10;newArray["name"] = "Sirwan";&#10;newArray["lastName"] = "Afifi";</pre>
 </div>
در اینجا ایندکس‌ها به ترتیب name و lastName هستند و به عنوان کلید مورد استفاده قرار می‌گیرند. کلیدها نیز به مقادیر "Sirwan" و "Afifi" مپ شده‌اند. حالت فوق شبیه به یک دیکشنری عمل می‌کند. اما همانطور که عنوان شد در اینجا کلید به صورت رشته‌ایی است و نمی‌توان از اشیاء به عنوان کلید استفاده کرد؛ زیرا در نهایت تبدیل به رشته خواهند شد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">let user1 = { name: "Vahid" };&#10;let user2 = { name: "Sirwan" };&#10;&#10;let result = {};&#10;result[user1] = 10;&#10;result[user2] = 20;&#10;&#10;console.log(result[user1]); // logs 20&#10;console.log(result[user2]); // logs 20</pre>
 </div>
در کد فوق هر کدام از شیء‌ها را به عنوان کلید در نظر گرفته‌ایم و برای هر کدام مقادیر 10 و 20 را ست کرده‌ایم. اما خروجی هر کدام 20 است؛ در حالیکه باید به ترتیب عدد 10 و سپس عدد 20 در خروجی نمایش داده شود. دلیل آن نیز کاملاً مشخص است زیرا اگر در جاوا اسکریپت برای یک شیء تابع toString را فراخوانی کنیم، مقدار "[object object]" در خروجی نمایش داده خواهد شد. در نتیجه در کد فوق در واقع هر بار ایندکس "[object object]" را به‌روز رسانی کرده‌ایم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">result["[object object]"] = 10;&#10;result["[object object]"] = 20;&#10;&#10;console.log(result["[object object]"]); // logs 20&#10;console.log(result["[object object]"]); // logs 20</pre>
 </div> <br/> </div> <b>WeakMap and WeakSet</b> </div> <div>فرض کنید درون DOM سه عنصر div دارید و می‌خواهید این سه div را درون یک Set ذخیره کنید:</div> <div> <p style="margin-left: auto; margin-right: auto;"> <img src="/img/dntips/3d8822a0299cc30fae94.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/> </p> </div> <div>در این‌حالت آیتم‌های درون Set ارجاع مستقیمی را به عناصر موجود در DOM دارند. اکنون حالتی را در نظر بگیرید که بخواهیم یکی از عناصر موجود درون DOM را حذف کنیم. در اینحالت آیتم درون Set که به این عنصر اشاره دارد هنوز حذف نشده است و همچنان ارجاعی را به آن عنصر دارد. بنابراین تا زمانیکه آیتم از Set حذف نشود Garbage Collector نمی‌تواند حافظه‌ی اختصاص داده شده را مجدداً بازیابی کند. در نتیجه استفاده از Set و یا Map در چنین سناریوهایی منجر به نشتی حافظه خواهد شد. برای حل این مشکل می‌توانیم از WeakMap و یا WeakSet استفاده کنیم. در این‌حالت WeakMap و WeakSet ارجاع مستقیمی به اشیایی که به آنها اضافه می‌شوند، ندارند. در نتیجه GC به راحتی می‌تواند حافظه‌ی اختصاص داده شده را بعد از حذف اشیاء بازیابی کند.</div> <div>صرف‌نظر از رفع مشکل حافظه، WeakMap و WeakSet شبیه به Map و Set عمل می‌کنند، اما یکسری محدودیت‌هایی در استفاده از آنها وجود دارد:</div> <div> <ul> <li> <span style="line-height: 1.5em; font-size: 9pt;">WeakMap و WeakSet فاقد پراپرتی‌های size, entries, values و متد foreach هستند.</span> <br/> </li> <li> <span style="line-height: 1.5em; font-size: 9pt;">WeakMap همچنین فاقد keys است.</span> <br/> </li> </ul> </div></div>
