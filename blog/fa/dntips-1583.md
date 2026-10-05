# قابلیت Attribute Routing در ASP.NET MVC 5

در ASP.NET MVC 5 یک قابلیت جدید با نام Attribute Routing افزوده شده است که به ما این اجازه را می‌دهد تا Route‌های سفارشی برای کنترلرها و اکشن متدهایمان با اضافه کردن یک Attribute با نام Route تعریف کن

- Published: 2013-12-08
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1583

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1583) منتشر شده است.

<div class="postBody">در ASP.NET MVC 5 یک قابلیت جدید با نام <a href="http://blogs.msdn.com/b/webdev/archive/2013/10/17/attribute-routing-in-asp-net-mvc-5.aspx">Attribute Routing</a>  افزوده شده است که به ما این اجازه را می‌دهد تا Route‌های سفارشی برای کنترلرها و اکشن متدهایمان با اضافه کردن یک Attribute با نام Route تعریف کنیم. <br/>
همچنین می‌توانیم ویژگی RoutePrefix نیز برای کنترلرهایمان تعریف کنیم تا همه‌ی اکشن متدها نیز از آن پیروی کنند. این ویژگی را با ذکر یک مثال معرفی میکنیم :<br/> <br/>
ابتدا لازم است این ویژگی را در کلاس RouteConfig فعال کنیم :<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">public static void RegisterRoutes(RouteCollection routes) &#10;{&#10;    routes.IgnoreRoute("{resource}.axd/{*pathInfo}");&#10;&#10;    routes.MapMvcAttributeRoutes();&#10;&#10;    // ...&#10;}</pre>
 </div> <br/>
قدم بعدی تنها افزودن Attribute‌های ذکر شده به کنترلر و اکشن متدهایمان می‌باشد، به طور مثال ما در اینجا یک کنترلر با نام ProductController ایجاد کرده ایم و کنترلر را با ویژگی RoutePrefix مزین کرده ایم که در این حالت به ASP.NET MVC می‌گویم که تمام اکشن متدهای داخل این کنترلر با products شروع شوند :<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">[RoutePrefix("products")]&#10;public class ProductsController : Controller &#10;{&#10;    public ProductsController() &#10;    { &#10;    }&#10;&#10;    [Route]&#10;    public ActionResult Index() &#10;    {&#10;        return View();&#10;    }&#10;}</pre>
 </div> <br/>
همانطور که در کد فوق ملاحظه می‌کنید اکشن متد Index را با افزودن ویژگی Route که آدرس ~/products را تطبیق می‌دهد تعیین کرده ایم.<br/> <b> <br/>
نحوه تعیین Optional URI Parameter :</b> <br/>
کافی است علامت سوال را به آخر پارامتر اضافه کنیم :<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">[Route("{id?}")]&#10;public ActionResult Index(int id) &#10;{&#10;   return View();&#10;}</pre>
 </div> <b>نحوه تعیین Default Route </b> :<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">[RoutePrefix("products")]&#10;[Route("{action=index}")]&#10;public class ProductsController : Controller &#10;{&#10;    public ProductsController() &#10;    { &#10;    }&#10;    public ActionResult Index() &#10;    {&#10;        return View();&#10;    }&#10;}</pre>
 </div> <b> نحوه تعیین Constraint برای Routeها : </b> <br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">[Route("{id:int}")]&#10;public ActionResult Delete(int id) &#10;{&#10;   return View();&#10;}</pre>
 </div>
در مثال فوق گفته ایم که Id باید از نوع عدد صحیح باشد در غیر اینصورت آن را تطبیق نمی‌دهد.<br/>
همچنین می‌توانید از عبارات Regex نیز استفاده کنید به طور مثال در کد زیر پارامتر title باید یک متن و یا عبارت فارسی باشد در غیر اینصورت تطبیقی صورت نمی‌گیرد:<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">​[Route("{title:regex(\u0600-\u06FF)}")]&#10;public ActionResult Search(string title)&#10;{&#10;   return View();&#10;}​</pre>
 </div>
در لینکی که در بالا معرفی شده لیست کامل Constraint‌ها را می‌توانید مشاهده نمائید،<br/></div>
