# Reflection در ES6

در زبان‌های برنامه‌نویسی مانند سی‌شارپ و یا جاوا می‌توانیم از Reflection جهت خواندن متادیتاها استفاده کنیم. به عنوان مثال امکان تعریف پراپرتی و یا متدها و حتی تایپ‌هایی در زمان اجرا را در اختیارمان قر

- Published: 2016-01-01
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-2296

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/2296) منتشر شده است.

<div class="postBody"><div>در زبان‌های برنامه‌نویسی مانند سی‌شارپ و یا جاوا می‌توانیم از <a href="https://www.dntips.ir/search?term=Reflection">Reflection</a> جهت خواندن متادیتاها استفاده کنیم. به عنوان مثال امکان تعریف پراپرتی و یا متدها و حتی تایپ‌هایی در زمان اجرا را در اختیارمان قرار می‌دهد. اما از آنجائیکه جاوا اسکریپت یک زبان داینامیک است، این قابلیت کمتر مورد توجه قرار گرفته است. در جاوا اسکریپت حین کار با کلاس‌ها و اشیاء، ممکن است نیاز داشته باشید تا از اعضای یک کلاس
کوئری بگیرید و یا اینکه یک سری پراپرتی و متدهایی را در زمان اجرا به اشیاء‌تان اضافه کنید و یا مواردی از این دست.</div> <div>تا قبل از <a href="https://www.dntips.ir/post/2290">ES 6</a> می‌توانستیم به این صورت به اعضای یک کلاس دسترسی داشته باشیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">var person = {&#10;    name: 'Sirwan',&#10;    family: 'Afifi',&#10;    doWork: function () {&#10;        //....&#10;    }&#10;};&#10;&#10;for (var prop in person) {&#10;    console.log(prop); &#10;}</pre>
 </div>
همانطور که مشاهده می‌کنید، توسط سینتکس for...in می‌توانیم به اعضای person دسترسی داشته باشیم. همچنین برای دسترسی به مقادیر هر کدام از اعضای آن می‌توانستیم از bracket syntax استفاده کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">for (var prop in person) {&#10;    console.log(person[prop]); &#10;}</pre>
 </div>
لازم به ذکر است می‌توانستیم از متدهایی همانند Array.isArray, Object.getOwnPropertyDescriptor و حتی Object.keys نیز جهت دسترسی به اعضای پنهان یک شیء استفاده کنیم. اکنون قابلیت توکاری با نام Reflect این امکان را به <a href="https://www.dntips.ir/post/2290">ES 6</a> اضافه کرده است تا تمام اعمال فوق را به راحتی انجام داد.<br/> <br/> </div> <div> <b>Reflect</b> </div> <div>همانطور که عنوان شد توسط API جدیدی با نام Reflect، می‌توانیم به سادگی اعمال مربوط به Reflection را انجام دهیم. به عنوان مثال برای دسترسی به اعضای شیء person با استفاده از این API می‌توانیم به این صورت عمل کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var person = {&#10;    name: 'Sirwan',&#10;    family: 'Afifi',&#10;    doWork: function () {&#10;        //....&#10;    }&#10;};&#10;&#10;for (let prop of Reflect.enumerate(person)) {&#10;    console.log(`the value for ${prop} is ${person[prop]}`); &#10;  &#10;}</pre>
 </div>
در کد فوق از متد enumerate استفاده شده است، این متد یک پارامتر target را از ورودی می‌پذیرد. در واقع target همان شیءایی است که می‌خواهید پراپرتی‌های آن را پیمایش کنید. همچنین مقدار بازگشتی این متد یک iterator می‌باشد. مفهوم iterator نیز خیلی ساده است. به زبان ساده، امکان پیمایش درون یک کالکشن را در اختیارمان قرار می‌دهد. نکته‌ی دیگری که در کد فوق وجود دارد، استفاده از سینتکس for..of است، این سینتکس شبیه به for...in عمل می‌کند، با این تفاوت که در اینجا به جای پیمایش درون یکسری keys، درون values پیمایش می‌کنیم. در نتیجه برای پیمایش iterators باید از این سینتکس استفاده شود.<br/> <br/> </div> <div> <b>متدهای شیء Reflect</b> </div> <div>در ادامه تعدادی از متدهای شیء Reflect را مشاهده می‌کنید:</div> <div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="JScript" name="code">Reflect.get(target, name, [receiver])&#10;&#10;Reflect.set(target, name, value, [receiver])&#10;&#10;Reflect.has(target, name)&#10;&#10;Reflect.apply(target, receiver, args)&#10;&#10;Reflect.construct(target, args)&#10;&#10;Reflect.getOwnPropertyDescriptor(target, name)&#10;&#10;Reflect.defineProperty(target, name, desc)&#10;&#10;Reflect.getPrototypeOf(target)&#10;&#10;Reflect.setPrototypeOf(target, newProto)&#10;&#10;Reflect.deleteProperty(target, name)&#10;&#10;Reflect.enumerate(target)&#10;&#10;Reflect.preventExtensions(target)&#10;&#10;Reflect.isExtensible(target)&#10;&#10;Reflect.ownKeys(target)</pre>
 </div>
تعدادی از متدهای فوق خیلی مشابه متدهای Object هستند؛ با این تفاوت که متدهای فوق اطلاعات بهتری را بر می‌گردانند. به عنوان مثال متد Reflect.defineProperty در صورت ایجاد شدن یک پراپرتی جدید، مقدار true را برمی‌گرداند: </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var yay = Reflect.defineProperty(target, 'foo', { value: 'bar' })&#10;if (yay) {&#10;  // yay!&#10;} else {&#10;  // oops.&#10;}</pre>
 </div>
اگر همین کار را با استفاده از متد Object.defineProperty انجام می‌دادیم می‌بایست کد را درون بلاک try/catch می‌نوشتیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">try {&#10;  Object.defineProperty(target, 'foo', { value: 'bar' })&#10;  // yay!&#10;} catch (e) {&#10;  // oops.&#10;}</pre>
 </div>
به عنوان یک مثال دیگر، قبلاً برای حذف یک پراپرتی از یک شیء از کلمه کلیدی delete به اینصورت استفاده می‌کردیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var target = { foo: 'bar', baz: 'wat' }&#10;delete target.foo&#10;console.log(target)&#10;// &lt;- { baz: 'wat' }</pre>
 </div>
اما با کمک متد Reflect.deleteProperty به راحتی می‌توانیم یک پراپرتی را حذف کنیم: </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var target = { foo: 'bar', baz: 'wat' }&#10;let isDeleted = Reflect.deleteProperty(target, 'foo')&#10;console.log(isDeleted );&#10;// true</pre>
 </div>
در این‌حالت همانند متد Reflect.defineProperty، در صورت موفقیت‌آمیز بودن عمل حذف، مقدار true برگردانده می‌شود. </div> <div>برای مشاهده‌ی لیست کامل متدهای فوق می‌توانید به <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect">اینجا</a> مراجعه کنید. همچنین می‌توان با مراجعه به قسمت <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#Browser_compatibility">Browser compatibility</a> وضعیت پشتیبانی هر کدام را در مرورگرهای مختلف مشاهده کرد.<br/> <br/> </div> <div> <b>نکاتی که در حین کار کردن با Reflect باید در نظر بگیرید:</b> </div> <div> <ul> <li>این شیء فاقد متد [[Construct]] می‌باشد. یعنی نمی‌تواند همراه با کلمه‌ی کلیدی new مورد استفاده قرار گیرد. </li> <li>همچنین نمی‌توان آن را همانند یک تابع فراخوانی کرد.</li> <li>تمام متدهای آن به صورت استاتیک تعریف شده‌اند (همانند شیء Math).</li> </ul> </div> </div></div>
