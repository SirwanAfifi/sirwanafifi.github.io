# نمایش بلادرنگ اعلامی به تمام کاربران در هنگام درج یک رکورد جدید

در ادامه می‌خواهیم اعلام عمومی نمایش افزوده شدن یک پیام جدید را بعد از ثبت رکوردی جدید، به تمامی کاربران متصل به سیستم ارسال کنیم. پیش نیاز مطلب جاری موارد زیر می‌باشند: دوره "معرفی SignalR و ارتباطات

- Published: 2014-10-07
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1885

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1885) منتشر شده است.

<div class="postBody">در ادامه می‌خواهیم اعلام عمومی نمایش افزوده شدن یک پیام جدید را بعد از ثبت رکوردی جدید، به تمامی کاربران متصل به سیستم ارسال کنیم. پیش نیاز مطلب جاری موارد زیر می‌باشند:<div> <ul> <li> <a href="https://www.dntips.ir/courses/details/3">دوره "معرفی SignalR و ارتباطات بلادرنگ"</a> <br/> </li> <li> <a href="https://www.dntips.ir/post/1366">نگاهی به اجزای تعاملی Twitter Bootstrap </a> <br/> </li> </ul> <div>ابتدا مدل زیر را در نظر داشته باشید:</div> </div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">namespace ShowAlertSignalR.Models&#10;{&#10;    public class Product&#10;    {&#10;        public int Id { get; set; }&#10;        public string Title { get; set; }&#10;        public string Description { get; set; }&#10;        public float Price { get; set; }&#10;        public Category Category { get; set; }&#10;&#10;    }&#10;&#10;    public enum Category&#10;    {&#10;        [Display(Name = "دسته بندی اول")]&#10;        Cat1,&#10;        [Display(Name = "دسته بندی دوم")]&#10;        Cat2,&#10;        [Display(Name = "دسته بندی سوم")]&#10;        Cat3&#10;    }&#10;}</pre>
 </div>
در اینجا مدل ما شامل عنوان، توضیح، قیمت و یک enum برای دسته‌بندی یک محصول ساده می‌باشد.</div> <div>کلاس context نیز به صورت زیر می‌باشد:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">namespace ShowAlertSignalR.Models&#10;{&#10;    public class ProductDbContext : DbContext&#10;    {&#10;        public ProductDbContext() : base("productSample")&#10;        {&#10;            Database.Log = sql =&gt; Debug.Write(sql);&#10;        }&#10;        public DbSet&lt;Product&gt; Products { get; set; }&#10;    }&#10;}</pre>
 </div>
همانطور که در ابتدا عنوان شد، می‌خواهیم بعد از ثبت یک رکورد جدید، پیامی عمومی به تمامی کاربران متصل به سایت نمایش داده شود. در کد زیر اکشن متد Create را مشاهده می‌کنید: </div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">[HttpPost]&#10;        [ValidateAntiForgeryToken]&#10;        public ActionResult Create(Product product)&#10;        {&#10;            if (ModelState.IsValid)&#10;            {&#10;                db.Products.Add(product);&#10;                db.SaveChanges();&#10;                return RedirectToAction("Index");&#10;            }&#10;&#10;            return View(product);&#10;        }</pre>
 </div>
می‌توانیم از ViewBag برای اینکار استفاده کنیم؛ به طوریکه یک پارامتر از نوع bool برای متد Index تعریف کرده و سپس مقدار آن را درون این شیء ViewBag انتقال دهیم، این متغییر بیانگر حالتی است که آیا اطلاعات جدیدی برای نمایش وجود دارد یا خیر؟ بنابراین اکشن متد Index را به اینصورت تعریف می‌کنیم:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">public ActionResult Index(bool notifyUsers = false)&#10;        {&#10;            ViewBag.NotifyUsers = notifyUsers;&#10;            return View(db.Products.ToList());&#10;        }</pre>
 </div>
در اینجا مقدار پیش‌فرض این متغیر، false می‌باشد. یعنی اطلاعات جدیدی برای نمایش موجود نمی‌باشد. در نتیجه اکشن متد Create را به صورتی تغییر می‌دهیم که بعد از درج رکورد موردنظر و هدایت کاربر به صفحه‌ی Index، مقدار این متغییر به true تنظیم شود:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">[HttpPost]&#10;        [ValidateAntiForgeryToken]&#10;        public ActionResult Create(Product product)&#10;        {&#10;            if (ModelState.IsValid)&#10;            {&#10;                db.Products.Add(product);&#10;                db.SaveChanges();&#10;                return RedirectToAction("Index", new { notifyUsers = true });&#10;            }&#10;&#10;            return View(product);&#10;        }</pre>
 </div>
قدم بعدی ایجاد یک هاب SignalR می‌باشد:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">namespace ShowAlertSignalR.Hubs&#10;{&#10;    public class NotificationHub : Hub&#10;    {&#10;        public void SendNotification()&#10;        {&#10;            Clients.Others.ShowNotification();&#10;        }&#10;    }&#10;}</pre>
 </div>
در ادامه کدهای سمت کلاینت را برای هاب فوق، داخل ویوی Index اضافه می‌کنیم:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">@section scripts&#10;{&#10;    &#10;    &lt;script src="~/Scripts/jquery.signalR-2.0.2.min.js"&gt;&lt;/script&gt;&#10;    &lt;script src="~/signalr/hubs"&gt;&lt;/script&gt;&#10;    &lt;script&gt;&#10;&#10;        var notify = $.connection.notificationHub;&#10;        notify.client.showNotification = function() {&#10;            $('#result').append("&lt;div class='alert alert-info alert-dismissable'&gt;" +&#10;                "&lt;button type='button' class='close' data-dismiss='alert' aria-hidden='true'&gt;&amp;times;&lt;/button&gt;" +&#10;            "رکورد جدیدی هم اکنون ثبت گردید، برای مشاهده آن صفحه را بروزرسانی کنید" + "&lt;/div&gt;");&#10;        };&#10;        $.connection.hub.start().done(function() {&#10;            @{&#10;                if (ViewBag.NotifyUsers)&#10;                {&#10;                    &lt;text&gt;notify.server.sendNotification();&lt;/text&gt;&#10;                }&#10;            }&#10;        });&#10;    &lt;/script&gt;&#10;}</pre>
 </div>
همانطور که در کدهای فوق مشاهده می‌کنید، بعد از اینکه اتصال با موفقیت برقرار شد (درون متد done) شرط چک کردن متغییر NotifyUsers را بررسی کرده‌ایم. یعنی در این حالت اگر مقدار آن true بود، متد درون هاب را فراخوانی کرده‌ایم. در نهایت پیام به یک div با آی‌دی result اضافه شده است.</div> <div>لازم به ذکر است برای حالت‌های حذف و به‌روزرسانی نیز روال کار به همین صورت می‌باشد.<br/> <b>
سورس مثال جاری</b> <span> <b>:</b> </span> <a href="https://www.dntips.ir/file/userfile?name=ShowAlertSignalR.zip">ShowAlertSignalR.zip</a> <br/> </div></div>
