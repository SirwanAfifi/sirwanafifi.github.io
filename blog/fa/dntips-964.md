# نکاتی در مورد ELMAH

سفارشی سازی ایمیل ارسالی : در مورد ELMAH(Erro Logging Module And Handlers) آقای نصیری چندین مطلب نوشته اند ( + و + و ... ) قبل از ارسال ایمیل توسط ELMAH رخدادی به نام Mailing اجرا (Raise) می‌شود. اگر 

- Published: 2012-07-27
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-964

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/964) منتشر شده است.

<div class="postBody"><div><b>سفارشی سازی ایمیل ارسالی :</b><br/>
</div>
در مورد ELMAH(Erro Logging Module And Handlers) آقای نصیری چندین مطلب نوشته اند ( <a href="https://www.dntips.ir/post/240">+</a> و <a href="https://www.dntips.ir/post/514">+</a> و ... )<div>قبل از ارسال ایمیل توسط ELMAH رخدادی به نام Mailing اجرا (Raise) می‌شود. اگر برای این رخداد یک Event Handler ایجاد کنیم، می‌توانیم جزئیات مربوط به خطایی که قرار است ارسال شود را تغییر دهیم. به عنوان مثال می‌توانیم بگوئیم اگر Error ما از نوع Application Exception بود آنرا به آدرس دیگری ارسال کن و .... برای ایجاد یک Event Handler برای رخداد Mailing ابتدا فایل Global.asax رو به پروژه اضافه کنید و کد زیر را به آن اضافه کنید :</div>
<div><div align="left" dir="ltr">

<pre language="CSharp" name="code">void ErrorMailModuleName_Mailing(object sender, Elmah.ErrorMailEventArgs e)&#10;{&#10;        &#10;}</pre>

</div>
</div>
<div> دقت داشته باشید که در کد فوق به جای <span style="text-align: -webkit-left; ">ErrorMailModuleName نام  HTTPModule را بنویسید، این ماژول در فایل Web.Config قرار دارد :</span></div>
<div><div align="left" dir="ltr">

<pre language="XML" name="code">&lt;httpModules&gt;     &#10;      &lt;add name="ErrorMail" type="Elmah.ErrorMailModule, Elmah" /&gt;      &#10;&lt;/httpModules&gt;</pre>

</div>
</div>
<div>که در کد فوق ErrorMail می‌باشد در نهایت :</div>
<div><div align="left" dir="ltr">

<pre language="CSharp" name="code"> void ErrorMail_Mailing(object sender, Elmah.ErrorMailEventArgs e)&#10;    {&#10;        &#10;    }</pre>

</div>
</div>
<div>به عنوان مثال در کد زیر اگر Error از نوع Application Exception بود Error Log به آدرس sir1afifi@gmail.com نیز ارسال می‌شود :</div>
<div><div align="left" dir="ltr">

<pre language="CSharp" name="code">void ErrorMail_Mailing(object sender, Elmah.ErrorMailEventArgs e)&#10;    {&#10;        if (e.Error.Exception is ApplicationException)&#10;        {&#10;            e.Mail.To.Add("sir1afifi@gmail.com");&#10;        }&#10;    }</pre>

</div>
</div>
<div><b><br/>
ذخیره Error‌ها در دیتابیس SQL SERVER :</b></div>
<div>ELMAH خطاهای Log شده را در جدولی با نام ELMAH_Error ذخیره می‌کند، اگر به داخل پوشه ELMAH توجه کرده باشید یک فایل با نام SQLServer.sql وجود دارد که حاوی اسکریپت مربوط به ساخت جدول فوق می‌باشد. با اجرای این اسکریپت جدول مربوطه همرا با سه SP با نام‌های ELMAH_GetErrorsXml ، ELMAH_GetErrorXml ،  ELMAH_LogError ساخته می‌شوند. بعد از ساخت جدول مربوطه باید تگ زیر را در فایل Web.Config بنویسیم :</div>
<div><div align="left" dir="ltr">

<pre language="XML" name="code"> &lt;errorLog type="Elmah.SqlErrorLog, Elmah" &#10;            connectionStringName="..." /&gt;</pre>

</div>
</div>
<div>connectionStringName هم نام کانکشن استرینگ را در این قسمت قرار می‌دهیم به عنوان مثال با داشتن کانکشن استرینگ زیر :<br/>
</div>
<div><div align="left" dir="ltr">

<pre language="XML" name="code">&lt;connectionStrings&gt;&#10;    &lt;add name="conn" connectionString="Data Source=.;Initial Catalog=test;User ID=user1;Password=123456;"/&gt;&#10;  &lt;/connectionStrings&gt;</pre>

</div>
</div>
<div>به این صورت connectionStringName  برابر با مقدار name یعنی conn می‌شود. </div></div>
