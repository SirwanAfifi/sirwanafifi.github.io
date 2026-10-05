# قابلیت Templated Razor Delegate

Razor دارای قابلیتی با نام Templated Razor Delegates است. همانطور که از نام آن مشخص است، یعنی Razor Template هایی که Delegate هستند. در ادامه این قابلیت را با ذکر چند مثال توضیح خواهیم داد. مثال اول: 

- Published: 2014-12-14
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1933

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1933) منتشر شده است.

<div class="postBody"><div>Razor دارای قابلیتی با نام Templated Razor Delegates است. همانطور که از نام آن مشخص است، یعنی Razor Template هایی که Delegate هستند. در ادامه این قابلیت را با ذکر چند مثال توضیح خواهیم داد.</div> <div> <b>مثال اول:</b> </div> <div>می‌خواهیم تعدادی تگ li را در خروجی رندر کنیم، این کار را می‌توانیم با استفاده از Razor helpers نیز به این صورت انجام دهیم:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">@helper ListItem(string content) {&#10; &lt;li&gt;@content&lt;/li&gt;&#10;}&#10;&lt;ul&gt;&#10; @foreach(var item in Model) {&#10; @ListItem(item)&#10; }&#10;&lt;/ul&gt;</pre>
 </div>
همین کار را می‌توانیم توسط Templated Razor Delegate به صورت زیر نیز انجام دهیم:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">@{&#10; Func&lt;dynamic, HelperResult&gt; ListItem = @&lt;li&gt;@item&lt;/li&gt;;&#10;}&#10;&lt;ul&gt;&#10; @foreach(var item in Model) {&#10; @ListItem(item)&#10; }&#10;&lt;/ul&gt;</pre>
 </div> <div>برای اینکار از نوع <a href="https://www.dntips.ir/post/998">Func</a> استفاده خواهیم کرد. این Delegate یک پارامتر را می‌پذیرد. این پارامتر می‌تواند از هر نوعی باشد. در اینجا از نوع dynamic استفاده کرده‌ایم. خروجی این Delegate نیز یک HelperResult است. همانطور که مشاهده می‌کنید آن را برابر با الگویی که قرار است رندر شود تعیین کرده‌ایم. در اینجا از یک پارامتر ویژه با نام item استفاده شده است. نوع این پارامتر dynamic است؛ یعنی همان مقداری که برای پارامتر ورودی Func انتخاب کردیم. در نتیجه پارامتر ورودی یعنی رشته item جایگزین item@ درون Delegate خواهد شد. </div>
در واقع دو روش فوق خروجی یکسانی را تولید میکنند. برای حالت‌هایی مانند کار با آرایه‌ها و یا Enumerations بهتر است از روش دوم استفاده کنید؛ از این جهت که نیاز به کد کمتری دارد و نگهداری آن خیلی از روش اول ساده‌تر است.<br/> <br/> </div> <div> <b>مثال دوم:   </b> <br/> </div> <div>اجازه دهید یک مثال دیگر را بررسی کنیم. به طور مثال معمولاً در یک فایل Layout برای بررسی کردن وجود یک section از کدهای زیر استفاده می‌کنیم:<br/> </div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">&lt;header&gt;  &#10;    @if (IsSectionDefined("Header"))  &#10;    {  &#10;        @RenderSection("Header")  &#10;    }  &#10;    else  &#10;    {  &#10;        &lt;div&gt;Default Content for Header Section&lt;/div&gt;  &#10;    }  &#10;&lt;/header&gt;</pre>
 </div>
روش فوق به درستی کار خواهد کرد اما می‌توان آن را با یک خط کد، درون ویو نیز نوشت. در واقع می‌توانیم با استفاده از Templated Razor Delegate یک متد الحاقی برای کلاس ViewPage بنویسیم؛ به طوریکه یک محتوای پیش‌فرض را برای حالتی که section خاصی وجود ندارد، نمایش دهد:<br/> </div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">public static HelperResult RenderSection(this WebViewPage page, string name,  &#10;    Func&lt;dynamic, HelperResult&gt; defaultContent)  &#10;{  &#10;    if (page.IsSectionDefined(name))  &#10;    {  &#10;        return page.RenderSection(name);  &#10;    }  &#10;    return defaultContent(null);  &#10;}</pre>
 </div>
بنابراین درون ویو می‌توانیم از متد الحاقی فوق به این صورت استفاده کرد:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">&lt;header&gt;  &#10;   @this.RenderSection("Header", @&lt;div&gt;Default Content for Header Section&lt;/div&gt;)  &#10;&lt;/header&gt;</pre>
 </div>
نکته: جهت بوجود نیامدن تداخل با نمونه اصلی RenderSection درون ویو، از کلمه this استفاده کرده‌ایم.<br/> <br/> </div> <div> <b>مثال سوم:   </b>شبیه‌سازی کنترل Repeater:</div> <div> <div>یکی از ویژگی‌های جذاب WebForm کنترل Repeater است. توسط این کنترل به سادگی می‌توانستیم یکسری داده را نمایش دهیم؛ این کنترل در واقع یک کنترل DataBound و همچنین یک Templated Control است. یعنی در نهایت کنترل کاملی بر روی Markup آن خواهید داشت. برای نمایش هر آیتم خاص داخل لیست می‌توانستید از ItemTemplate استفاده کنید. همچنین می‌توانستید از AlternatingItemtemplate استفاده کنید. یا اگر می‌خواستید هر آیتم را با چیزی از یکدیگر جدا کنید، می‌توانستید از SeparatorTemplate استفاده کنید. در این مثال می‌خواهیم همین کنترل را در MVC شبیه‌سازی کنیم.</div> <div>به طور مثال ویوی Index ما یک مدل از نوع IEnumerable&lt;string&gt; را دارد:  <br/> </div> </div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">@model IEnumerable&lt;string&gt;  &#10;@{  &#10;    ViewBag.Title = "Test";  &#10;}</pre>
 </div>
و اکشن متد ما نیز به این صورت اطلاعات را به ویوی فوق پاس میدهد:  <br/> </div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">public ActionResult Index()  &#10;{  &#10;    var names = new string[]  &#10;    {  &#10;        "Vahid Nasiri",  &#10;        "Masoud Pakdel",  &#10;        ...  &#10;     };  &#10;  &#10;    return View(names);  &#10;}</pre>
 </div>
 اکنون در ویوی Index می‌خواهیم هر کدام از اسامی فوق را نمایش دهیم. اینکار را می‌توانیم درون ویو با یک حلقه‌ی foreach و بررسی زوج با فرد بودن ردیف‌ها انجام دهیم اما کد زیادی را باید درون ویو بنویسیم. اینکار را می‌توانیم درون یک متد الحاقی نیز انجام دهیم. بنابراین یک متد الحاقی برای HtmlHelper به صورت زیر خواهیم نوشت:  <br/> </div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">public static HelperResult Repeater&lt;T&gt;(this HtmlHelper html,  &#10;    IEnumerable&lt;T&gt; items,  &#10;    Func&lt;T, HelperResult&gt; itemTemplate,  &#10;    Func&lt;T, HelperResult&gt; alternatingitemTemplate = null,  &#10;    Func&lt;T, HelperResult&gt; seperatorTemplate = null)  &#10;{  &#10;    return new HelperResult(writer =&gt;  &#10;    {  &#10;        if (!items.Any())  &#10;        {  &#10;            return;  &#10;        }  &#10;        if (alternatingitemTemplate == null)  &#10;        {  &#10;            alternatingitemTemplate = itemTemplate;  &#10;        }  &#10;        var lastItem = items.Last();  &#10;        int ii = 0;  &#10;        foreach (var item in items)  &#10;        {  &#10;           var func = ii % 2 == 0 ? itemTemplate : alternatingitemTemplate;  &#10;           func(item).WriteTo(writer);  &#10;           if (seperatorTemplate != null &amp;&amp; !item.Equals(lastItem))  &#10;           {  &#10;               seperatorTemplate(item).WriteTo(writer);  &#10;           }  &#10;           ii++;  &#10;        }  &#10;    });  &#10;}</pre>
 </div> <div> <b>توضیح کدهای فوق:</b> </div>
خوب، همانطور که ملاحظه می‌کنید متد را به صورت Generic تعریف کرده‌ایم، تا بتواند با انواع نوع‌ها به خوبی کار کند. زیرا ممکن است لیستی از اعداد را داشته باشیم. از آنجائیکه این متد را برای کلاس HtmlHelper می‌نویسیم، پارامتر اول آن را از این نوع می‌گیریم. پارامتر دوم آن، آیتم‌هایی است که می‌خواهیم نمایش دهیم. پارامتر‌های بعدی نیز به ترتیب برای ItemTemplate، AlternatingItemtemplate و SeperatorItemTemplate تعریف شده‌اند و از نوع Delegate با پارامتر ورودی T و خروجی HelperResult هستند. در داخل متدمان یک HelperResult را برمیگردانیم. این کلاس یک Action را از نوع TextWriter از ورودی می‌پذیرد. اینکار را با ارائه یک Lambda Expression با نام writer انجام می‌دهیم. در داخل این Delegate به تمام منطقی که برای نمایش یک آیتم نیاز هست دسترسی داریم.  <br/> </div> <div>ابتدا بررسی کرده‌ایم که آیا آیتم برای نمایش وجود دارد یا خیر. سپس اگر AlternatingItemtemplate برابر با null بود همان ItemTemplate را در خروجی نمایش خواهیم داد. مورد بعدی دسترسی به آخرین آیتم در Collection است. زیرا بعد از هر آیتم باید یک SeperatorItemTemplate را در خروجی نمایش دهیم. سپس توسط یک حلقه درون آیتم‌ها پیمایش میکنیم و ItemTemplate و  AlternatingItemtemplate را توسط متغیر func از یکدیگر تشخیص می‌دهیم و در نهایت درون ویو به این صورت از متد الحاقی فوق استفاده می‌کنیم: <br/> </div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">@Html.Repeater(Model, @&lt;div&gt;@item&lt;/div&gt;, @&lt;p&gt;@item&lt;/p&gt;, @&lt;hr/&gt;)</pre>
 </div>
متد الحاقی فوق قابلیت کار با انواع ورودی‌ها را دارد به طور مثال مدل زیر را در نظر بگیرید:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">public class Product&#10;{&#10;        public int Id { set; get; }&#10;        public string Name { set; get; }&#10;}</pre>
 </div>
می‌خواهیم اطلاعات مدل فوق را در ویوی مربوط درون یک جدول نمایش دهیم، می‌توانیم به این صورت توسط متد الحاقی تعریف شده اینکار را به این صورت انجام دهیم:</div> <div> <div align="left" dir="ltr"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">&lt;table&gt;&#10;    &lt;tr&gt;&#10;        &lt;td&gt;Id&lt;/td&gt;&#10;        &lt;td&gt;Name&lt;/td&gt;&#10;    &lt;/tr&gt;&#10;    @Html.Repeater(Model, @&lt;tr&gt;&lt;td&gt;@item.Id&lt;/td&gt;&lt;td&gt;@item.Name&lt;/td&gt;&lt;/tr&gt;)&#10;&lt;/table&gt;</pre>
 </div> <br/> </div> </div></div>
