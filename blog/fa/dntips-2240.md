# C# 6 - Expression-Bodied Members

در ادامه مطالب منتشر شده در رابطه با قابلیت‌های جدید سی‌شارپ 6، در این مطلب به بررسی یکی دیگر از این قابلیت‌ها، با نام Expression-Bodied Members خواهیم پرداخت. در واقع در سی‌شارپ 6، هدف، ساده‌سازی سین

- Published: 2015-10-10
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-2240

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/2240) منتشر شده است.

<div class="postBody"><a href="https://www.dntips.ir/search/label/c%23%206.0">در ادامه مطالب</a> منتشر شده در رابطه با قابلیت‌های جدید سی‌شارپ 6، در این مطلب به بررسی یکی دیگر از این قابلیت‌ها، با نام Expression-Bodied Members خواهیم پرداخت. در واقع در سی‌شارپ 6، هدف، ساده‌سازی سینتکس و افزایش بهره‌وری برنامه‌نویس می‌باشد. در نسخه‌های قبلی سی‌شارپ برای یکسری از اعمال روتین می‌بایستی روالی‌هایی را مدام تکرار می‌کردیم؛ به عنوان مثال در تعریف پراپرتی‌های یک کلاس در حالت get-only باید هر بار توسط return مقداری را برگردانیم: <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class Person&#10;{&#10;   public string FirstName { get; set; }&#10;   public string LastName { get; set; }&#10;   public string FullName&#10;   {&#10;       get&#10;       {&#10;                return FirstName + " " + LastName;&#10;       }&#10;   }&#10;}</pre>
 </div>
نوشتن پراپرتی‌هایی همانند FullName منجر به نوشتن خطوط کد اضافه‌تری خواهد شد، هرچند می‌توان این حالت را با برداشتن خطوط اضافی بهبود بخشید:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public string FullName&#10;{&#10;       get { return FirstName + " " + LastName; }&#10;}</pre>
 </div>
اما در سی‌شارپ 6 میتوان آن را توسط expression body به یک خط کاهش داد!<br/> <br/> </div> <div> <b>استفاده از expression body برای پراپرتی‌های get-only (فقط خواندنی): </b> </div> <div> <b> <br/> </b> </div> <div>اگر در کلاس‌هایتان پراپرتی‌های get-only دارید، به راحتی می‌توانید بدنه‌ی پراپرتی را با استفاده از expression syntax خلاصه‌نویسی کنید. در واقع شما با استفاده از سینتکس lambda expression اقدام به نوشتن بدنه پراپرتی‌های موردنظرتان می‌کنید. یعنی به جای نوشتن کدی مانند: </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">{ get { return your expression; } }</pre>
 </div>
به راحتی می‌توانید از سینتکس زیر استفاده نمائید:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">=&gt; your expression;</pre>
 </div>
به عنوان مثال، میتوان پراپرتی FullName را در کلاس Person با کمک قابلیت expression body به صورت زیر بازنویسی کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class Person&#10;{&#10;        public string FirstName { get; set; }&#10;        public string LastName { get; set; }&#10;&#10;        public string FullName =&gt; FirstName + " " + LastName;&#10;}</pre>
 </div>
با کد فوق به راحتی توانستیم قسمت‌های اضافه‌ای را حذف کنیم. اکنون ممکن است بپرسید آیا این تغییر در performance برنامه تاثیری دارد؟ خیر؛ زیرا سینتکس فوق دقیقاً همان کد ILی را تولید خواهد کرد که در حالت عادی تولید می‌شود. همچنین delegateی را تولید نخواهد کرد؛ بلکه تنها از سینتکس lambda expression برای خلاصه‌نویسی بدنه پراپرتی استفاده می‌کند. در حال حاضر برای حالت setter سینتکسی ارائه نشده است.<br/> <br/> </div> <div> <b>استفاده از expression body برای Indexerها:  </b> <br/> </div> <div> <b> <br/> </b> </div> <div>همچنین از این قابلیت برای Indexerها نیز میتوان استفاده کرد، مثلاً به جای نوشتن کد زیر:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public string this[int number]&#10;{&#10;            get&#10;            {&#10;                if (number &gt;= 0 &amp;&amp; number &lt; _values.Length)&#10;                {&#10;                    return _values[number];&#10;                }&#10;                return "Error";&#10;            }&#10;}</pre>
 </div>
می‌توانیم کد فوق را به این صورت خلاصه‌نویسی کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public string this[int number] =&gt; (number &gt;= 0 &amp;&amp; number &lt; _values.Length) ? _values[number] : "Error";</pre>
 </div> <b>نکته:</b> توجه داشته باشید که در هر دو حالت فوق تنها می‌توانیم برای get از expression body استفاده کنیم، هنوز سینتکسی برای حالت set ارائه نشده است.<br/> <br/> </div> <div> <b>استفاده از expression body برای متدها:   </b> <br/> </div> <div> <b> <br/> </b> </div> <div>برای متدها نیز می‌توانیم از قابلیت عنوان شده استفاده نمائیم، به عنوان مثال اگر داخل کلاس Person متد زیر را داشته باشیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public override string ToString()&#10;{&#10;      return FirstName;&#10;}</pre>
 </div>
می‌توانیم آن را به صورت زیر بنویسیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public override string ToString() =&gt; FirstName;</pre>
 </div>
همانطور که مشاهده می‌کنید به جای نوشتن curly braces یا {} از lambda arrow یا &lt;= استفاده کرده‌ایم. در اینجا عبارت سمت راست lambda arrow نمایانگر بدنه‌ی متد است. همچنین برای متدهای دارای پارامتر نیز به این صورت عمل می‌کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public int DoubleTheValue(int someValue) =&gt; someValue * 2;</pre>
 </div>
یک عضو از کلاس که به صورت expression body نوشته شده باشد، expression bodied member نامیده می‌شود. این عضو از کلاس در ظاهر شبیه به عبارات لامبدای ناشناس (anonymous lambda expression) است. اما یک expression bodied member باید دارای نام، مقدار بازگشتی و بدنه متد باشد. </div> <div>تقریباً تمامی access modifierها در این حالت قابلیت استفاده را دارند. تنها متدهای abstract نمی‌توانند استفاده شوند.<br/> <br/> </div> <div> <b>محدودیت‌های Expression Bodied Members  </b> </div> <div> <ul> <li>یکی از محدودیت‌های استفاده از expression body داشتن چندین خط دستور برای بدنه متدهایمان است. در اینحالت باید از روش سابق (statement body) استفاده نمائید. </li> <li>یکی دیگر از محدودیت‌ها عدم امکان استفاده از if, else, switch است. به عنوان مثال نمی‌توان کد زیر را با داشتن if و else به صورت expression body نوشت:</li> </ul> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public override string ToString()&#10;{&#10;       if (MiddleName != null)&#10;       {&#10;                return FirstName + " " + MiddleName + " " + LastName;&#10;       }&#10;       else&#10;       {&#10;                return FirstName + " " + LastName;&#10;       }&#10;}</pre>
 </div>
برای حالت فوق به عنوان یک روش جایگزین می‌توان از conditional operator استفاده کرد: </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public override string ToString() =&gt;&#10;                    (MiddleName != null)&#10;                    ? FirstName + " " + MiddleName + " " + LastName&#10;                    : FirstName + " " + LastName;</pre>
 </div> <ul> <li>همچنین نمی‌توان از for, foreach, while, do در expression body استفاده کرد، به جای آن می‌توان از عبارت‌های LINQ برای بدنه تابع استفاده کرد. به عنوان مثال متد زیر:<br/> </li> </ul> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public IEnumerable&lt;int&gt; SmallNumbers()&#10;{&#10;    for (int i = 0; i &lt; 10; i++)&#10;        yield return i;&#10;}</pre>
 </div>
را می‌توان در حالت expression body به این صورت نوشت:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public IEnumerable&lt;int&gt; SmallNumbers() =&gt; from n in Enumerable.Range(0, 10)&#10;                                                                         select n;</pre>
 </div>
و یا به این صورت:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public IEnumerable&lt;int&gt; SmallNumbers() =&gt; Enumerable.Range(0, 10).Select(n =&gt; n);</pre>
 </div> <ul> <li>همانطور که عنوان شد، استفاده از expression body در قسمت پراپرتی‌ها تنها محدود به پراپرتی‌های get-only (فقط خواندنی) میباشد.<br/> </li> <li>استفاده از این قابلیت برای متدهای سازنده</li> <li>استفاده در رخدادها</li> <li>استفاده در finalizers</li> </ul> <div>نکته: اگر می‌خواهید expression bodied member شما هم initializer داشته باشد و همچنین یک read only auto property<span> باشد، باید مقداری سینتکس آن را تغییر دهید. همانطور که می‌دانید auto propertyها نیازی به backing field<span> ندارند؛ بلکه در زمان کامپایل به صورت خودکار تولید خواهند شد. در نتیجه برای مقداردهی اولیه به backing fieldها می‌توانیم درون سازنده کلاس آنها را initialize کنیم:  </span> </span> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">    public class Person&#10;    {&#10;        public string FirstName { get; set; }&#10;        public string LastName { get; set; }&#10;&#10;        public Person()&#10;        {&#10;            this.FirstName = "Sirwan";&#10;            this.LastName = "Afifi";&#10;        }&#10;    }</pre>
 </div>
برای نوشتن پراپرتی‌های فوق به صورت expression body می‌توانیم به این صورت عمل کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public string FirstName { get; set; } = "Sirwan";&#10;public string LastName { get; set; } = "Afifi";</pre>
 </div>
اگر ReSharper را نصب کرده باشید، به شما پیشنهاد می‌دهد که از expression body استفاده نمائید: :<br/> </div> <div>برای حالت فوق:</div> <div> <p style="margin-left: auto; margin-right: auto;"> <img src="/img/dntips/4b5a83266f22fd4de28b.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/> </p> <p style="margin-left: auto; margin-right: auto;">برای پراپرتی‌ها:</p> <p style="margin-left: auto; margin-right: auto;"> <img src="/img/dntips/174a2bd13e5c1478922f.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/> </p> <p style="margin-left: auto; margin-right: auto;"> <br/> </p> <p style="margin-left: auto; margin-right: auto;"> <br/> </p> </div> </div></div>
