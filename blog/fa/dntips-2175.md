# تزریق وابستگی‌های رایج ASP.NET MVC به برنامه

در پروژه خود می‌توانیم StructureMap را به گونه‌ایی تنظیم کنیم که کار تزریق لایه‌های انتزاعی ASP.NET را نیز انجام دهد؛ مثلاً CurrentHttpContext و یا داده‌های مربوط به مسیریابی و... به عنوان مثال در برن

- Published: 2015-08-08
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-2175

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/2175) منتشر شده است.

<div class="postBody"><div>در پروژه خود می‌توانیم StructureMap را به گونه‌ایی تنظیم کنیم که کار تزریق لایه‌های انتزاعی ASP.NET را نیز انجام دهد؛ مثلاً CurrentHttpContext و یا داده‌های مربوط به مسیریابی و...</div>
به عنوان مثال در برنامه شما ممکن است کدهای زیر چندین و چند بار تکرار شده باشند:<div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var userId= User.Identity.GetUserId();&#10;var user = _context.Users.Find(userId);&#10;&#10;var user = int.Parse(User.Identity.GetUserId());</pre>
 </div>
کدهای فوق به این معنی است که پروژه‌ی شما به صورت کامل به سیستم ASP.NET Identity گره خورده است. خوب، این حالت زمانی پیچیده‌تر خواهد شد که در آینده بخواهید به یک سیستم Identity جدیدتر مهاجرت کنید.</div> <div>در ادامه نحوه‌ی تزریق وابستگی‌های رایج ASP.NET را بررسی خواهیم کرد. ابتدا یک کلاس رجستری را به صورت زیر ایجاد خواهیم کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class CommonASPNETRegistry : StructureMap.Configuration.DSL.Registry&#10;{&#10;        public CommonASPNETRegistry()&#10;        {&#10;            For&lt;IIdentity&gt;().Use(() =&gt; HttpContext.Current.User.Identity);&#10;            // Other dependencies&#10;        }&#10;}</pre>
 </div>
در کد فوق همانطور که مشخص است، یک کلاس ریجستری ایجاد کرده‌ایم (Registry در واقع یکی از مفاهیم مربوط به استراکچرمپ می‌باشد که امکان ماژولار کردن تنظیمات را درون کلاس‌هایی مجزا، در اختیارمان قرار می‌دهد). درون سازنده‌ی این کلاس گفته‌ایم: زمانیکه درخواستی برای اینترفیس IIdentity داده شد، یک وهله از HttpContext.Current.User.Identity را در اختیار درخواست کننده قرار بده.</div> <div style="direction: rtl;">لازم به ذکر است می‌توانستیم از وابستگی‌های عنوان شده نیز بدون تزریق کردن آنها درون کنترلرها نیز استفاده کنیم. اما ریجستر کردن آنها این امکان را در اختیارمان قرار می‌دهد تا در هر جایی از برنامه‌مان بتوانیم به آنها دسترسی پیدا کنیم. در ادامه خواهید دید که دسترسی آسان به آنها می‌تواند خیلی مفید واقع شود؛ همچنین امکان تست کردن نیز آسانتر خواهد شد.</div> <div style="direction: rtl;">قدم بعدی افزودن Registry ایجاد شده به تنظیمات IoC Containerمان است:</div> <div style="direction: rtl;"> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public static class SmObjectFactory&#10;{&#10;        private static readonly Lazy&lt;Container&gt; _containerBuilder =&#10;            new Lazy&lt;Container&gt;(defaultContainer, LazyThreadSafetyMode.ExecutionAndPublication);&#10;&#10;        public static IContainer Container&#10;        {&#10;            get { return _containerBuilder.Value; }&#10;        }&#10;&#10;        private static Container defaultContainer()&#10;        {&#10;            return new Container(ioc =&gt;&#10;            {&#10;                // Other settings&#10;                ioc.AddRegistry(new CommonASPNETRegistry());&#10;                &#10;            });&#10;        }&#10;}</pre>
 </div>
اکنون به سادگی می‌توانیم از وابستگی‌های عنوان شده در برنامه‌مان استفاده کنیم. برای استفاده‌ی از آن، مثال اول را در نظر بگیرید "<b>یافتن کاربر فعلی</b>". همانطور که عنوان شد، استفاده از کدهایی شبیه به حالت زیر جهت یافتن کاربر جاری در برنامه ممکن است چندین بار تکرار شده باشد:</div> <div style="direction: rtl;"> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var user = int.Parse(User.Identity.GetUserId());</pre>
 </div> <div style="direction: rtl;"> <span style="line-height: 1.5em; font-size: 9pt;">خوب، برای حل این مشکل اینترفیس زیر را اضافه می‌کنیم:</span> </div> <div style="direction: rtl;"> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public interface ICurrentUser&#10;{&#10;        ApplicationUser User { get; }&#10;}</pre>
 </div>
پیاده‌سازی آن نیز به این صورت خواهد بود:</div> <div style="direction: rtl;"> <div align="left" dir="ltr" style="direction: ltr;"> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class CurrentUser : ICurrentUser&#10;{&#10;        private readonly IIdentity _identity;&#10;        private readonly IApplicationUserManager _userManager;&#10;        private ApplicationUser _user;&#10;        public CurrentUser(IIdentity identity, IApplicationUserManager userManager)&#10;        {&#10;            _identity = identity;&#10;            _userManager = userManager;&#10;        }&#10;        public ApplicationUser User&#10;        {&#10;            get { return _user ?? (_user = _userManager.FindById(int.Parse(_identity.GetUserId()))); }&#10;        }&#10;}</pre>
 </div> <div style="direction: rtl; text-align: right;">درون کلاس فوق به اینترفیس IIdentity جهت ارائه آی‌دی کاربر جاری و اینترفیس IApplicationUserManager جهت یافتن اطلاعات کاربر نیاز خواهیم داشت. همانطور که مشاهده می‌کنید فیلد user_ در صورتیکه از قبل موجود باشد، برگردانده خواهد شد؛ در غیر اینصورت آن را از کانتکست مربوطه واکشی خواهد کرد.</div> <div style="direction: rtl; text-align: right;">اکنون با استفاده از روش فوق نه تنها درون کنترلرهایمان بلکه در هر جایی از برنامه‌مان می‌توانیم به کاربر جاری دسترسی داشته باشیم. همچنین در آینده نیز به راحتی می‌توانیم از سیستم ASP.NET Identity به هر سیستم دیگری سوئیچ کنیم.</div> <div style="direction: rtl; text-align: right;">برای استفاده از اینترفیس فوق نیز به این صورت عمل خواهیم کرد:</div> <div style="direction: rtl; text-align: right;"> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public class HomeController : BaseController&#10;{&#10;    private readonly ICurrentUser _currentUser;&#10;    public HomeController(ICurrentUser user)&#10;    {&#10;        _user = user;&#10;    }&#10;    public ActionResult Index()&#10;    {&#10;        // user&#10;        var user = _currentUser.User;&#10;        // user id&#10;        var userId = _currentUser.User.Id;&#10;    }&#10;}</pre>
 </div> </div> <div style="direction: rtl; text-align: right;"> <br/> </div> </div> </div> </div></div>
