# ایجاد یک فیلتر سفارشی جهت تعیین Layout برای کنترلر و یا اکشن متد

همانطور که می‌دانید در صورت عدم تعریف صریح layout در یک View، این تعریف از فایل Views\_ViewStart.cshtml دریافت می‌گردد: @{ Layout = "~/Views/Shared/_Layout.cshtml"; } برای معرفی صریح فایل layout، تنها

- Published: 2013-12-10
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1588

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1588) منتشر شده است.

<div class="postBody">همانطور که می‌دانید در صورت عدم تعریف صریح layout در یک View، این تعریف از فایل Views\_ViewStart.cshtml دریافت می‌گردد: <div align="left" dir="ltr"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">@{&#10;    Layout = "~/Views/Shared/_Layout.cshtml";&#10;}</pre>
 </div> <br/> </div>
برای معرفی صریح فایل layout، تنها کافی است مسیر کامل فایل layout را در یک View مشخص کنیم:  <br/> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">@{&#10;    ViewBag.Title = "Index";&#10;    Layout = "~/Views/Shared/_Layout.cshtml";&#10;}&#10; &#10;&lt;h2&gt;Index&lt;/h2&gt;</pre>
 </div>
حال ما می‌خواهیم یک فیلتر سفارشی را تعریف کنیم تا به براحتی امکان تعریف Layout در سطح کنترلر و هم در سطح اکشن متد به صورت Attribute را داشته باشد :</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">[SetLayoutAttribute("_MyLayout")]&#10;public ActionResult Index()&#10;{&#10;      return View();&#10;}</pre>
 </div> <br/> <div align="left" dir="ltr"> </div>
 همچنین می‌توانیم این فیلتر سفارشی را در سطح کنترلر تعریف کنیم تا تمام اکشن متدهای داخل کنترلر از Layout مربوطه استفاده کنند:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">[SetLayoutAttribute("_MyLayout")]&#10;    public class HomeController : Controller&#10;    {&#10;        &#10;        public ActionResult Index()&#10;        {&#10;            return View();&#10;        }&#10;&#10;        public ActionResult About()&#10;        {&#10;            ViewBag.Message = "Your application description page.";&#10;&#10;            return View();&#10;        }&#10;&#10;        public ActionResult Contact()&#10;        {&#10;            ViewBag.Message = "Your contact page.";&#10;&#10;            return View();&#10;        }&#10;    }</pre>
 </div> <br/> <div align="left" dir="ltr"> </div>
 برای تعریف چنین اکشن فیلتری کد زیر را می‌نویسیم :</div> <div> <div align="left" dir="ltr"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">public class SetLayoutAttribute : ActionFilterAttribute&#10;    {&#10;        private readonly string _masterName;&#10;        public SetLayoutAttribute(string masterName)&#10;        {&#10;            _masterName = masterName;&#10;        }&#10;&#10;        public override void OnActionExecuted(ActionExecutedContext filterContext)&#10;        {&#10;            base.OnActionExecuted(filterContext);&#10;            var result = filterContext.Result as ViewResult;&#10;            if (result != null)&#10;            {&#10;                result.MasterName = _masterName;&#10;            }&#10;        }&#10;    }</pre>
 </div> <br/> </div>
 همانطور که می‌دانید برای تعریف یک اکشن فیلتر سفارشی می‌بایست از کلاس ActionFilterAttribute ارث بری کنیم، حالا برای کلاسی که تعریف کرده ایم یک خصوصیت readonly را تعریف و سپس برابر با یک پارامتر با نام masterName که از طریق سازنده کلاس دریافت می‌شود قرار داده ایم. در نهایت متد OnActionExecuted را بازنویسی کرده ایم به این صورت که مقدار دریافتی توسط سازنده کلاس را برابر با نام Layout موردنظرمان است را به خاصیت <a href="http://msdn.microsoft.com/en-us/library/system.web.mvc.viewresult.mastername(v=vs.118).aspx">MasterName</a>  اختصاص میدهیم.</div></div>
