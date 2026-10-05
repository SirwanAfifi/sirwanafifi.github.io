# حذف هدرهای مربوط به وب سرور از طریق برنامه نویسی

در تکمیل این مطلب برای حذف هدرهای مربوط به وب سرور در برنامه‌های ASP.NET MVC از روش زیر می‌توانیم استفاده کنیم. در حالت پیش فرض تمام پاسخهای که به سمت سرور ارسال میشوند به همراه خود یک سری جزئیات را ن

- Published: 2013-03-09
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1249

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1249) منتشر شده است.

<div class="postBody">در تکمیل <a href="https://www.dntips.ir/post/391">این مطلب</a> برای حذف هدرهای مربوط به وب سرور در برنامه‌های ASP.NET MVC از روش زیر می‌توانیم استفاده کنیم.<div><br/><div><div>در حالت پیش فرض تمام پاسخهای که به سمت سرور ارسال میشوند به همراه خود یک سری جزئیات را نیز منتقل میکنند.<br/><br/></div><div><p><img src="/img/dntips/2f64edb0d2c9ad53d31c.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/></p></div><div>برای یک وب اپلیکیشن APS.NET MVC این هدرها را داریم :</div><div><div><ul><li>Server: که توسط IIS اضافه میشود.<br/></li><li>X-AspNet-Version: که در زمانFlush در httpresponse اضافه میشود.<br/></li><li>X-AspNetMvc-Version: که توسط MvcHandler در System.Web.dll اضافه میشود.<br/></li><li>X-Powered-By: این مورد نیز توسط IIS اضافه میشود.<br/></li></ul></div></div><div> هکرها از اینکه فریم ورک مورد استفاده چه چیزی است خوشحال خواهند شد: اگر سرور شما برای مدتی Update نشده باشد و یک آسیب پذیری امنیتی بزرگ برای ورژن فریم ورکی که استفاده می‌کنید پیدا شود در نتیجه به هکرها برای رسیدن به هدفشان کمک کرده اید.<br/></div><div>به علاوه این هدرها فضایی را برای تمام پاسخ‌ها در نظر میگیرند (البته در حد چندین بایت ولی در اینجا بحث برروی Optimization است). <br/></div><div>برای حذف این هدرها باید مراحل زیر را انجام دهیم: <br/></div><div><ol><li>حذف کردن هدر Server : به Global.asax.cs رفته و رویداد Application_PreSendRequestHeaders  با کد زیر را به آن اضافه کنید : <div align="left" dir="ltr"><div align="left" dir="ltr">
<pre language="CSharp" name="code">    protected void Application_PreSendRequestHeaders(object sender, EventArgs e)&#10;     {&#10;         var app = sender as HttpApplication;&#10;         if (app == null || !app.Request.IsLocal || app.Context == null)&#10;             return;&#10;         var headers = app.Context.Response.Headers;&#10;         headers.Remove("Server");&#10;     }</pre>
</div></div></li><li>حذف کردن هدر X-AspNetMvc-Version: در فایل Global.asax.cs  به رویداد Application_Start  این کد زیر را اضافه کنید : <div align="left" dir="ltr"><div align="left" dir="ltr">
<pre language="CSharp" name="code">protected void Application_Start()&#10;     {&#10;         ...&#10;         MvcHandler.DisableMvcResponseHeader = true;&#10;         ...&#10;     }</pre>
</div></div></li><li>حذف کردن هدر X-AspNet-Version: به فایل Web.Config مراجعه کرده و این المنت را در داخل system.web اضافه کنید: <div align="left" dir="ltr"><div align="left" dir="ltr">
<pre language="CSharp" name="code">&lt;system.web&gt;&#10;         ...&#10;         &lt;httpRuntime enableVersionHeader="false" /&gt;&#10;         ...&#10;&lt;/system.web&gt;</pre>
</div></div></li><li>حذف کردن هدر X-Powered-By: در داخل فایل Web.Config در داخل system.webServer این خطوط را اضافه کنید: <div align="left" dir="ltr"><div align="left" dir="ltr">
<pre language="CSharp" name="code">&lt;system.webServer&gt;&#10;         ...&#10;         &lt;httpProtocol&gt;&#10;             &lt;customHeaders&gt;&#10;                 &lt;remove name="X-Powered-By" /&gt;&#10;             &lt;/customHeaders&gt;&#10;         &lt;/httpProtocol&gt;&#10;         ...&#10;&lt;/system.webServer&gt;</pre>
</div></div></li></ol><div>با انجام مراحل فوق پاسخ‌های سرور سبک‌تر شده و در نهایت حاوی اطلاعات مهم در مورد ورژن فریم ورک نمی‌باشد. <br/></div></div></div></div></div>
