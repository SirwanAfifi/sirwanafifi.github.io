# تنظیمات امنیتی Glimpse

در مورد glimpse پیشتر مطالبی در سایت منتشر شده است : آشنایی و بررسی ابزار Glimpse بعد از آپلود سایت ما می‌توانیم دسترسی به تنظیمات خاص glimpse را تنها به کاربران عضو محدود کنیم: <location path="Glimps

- Published: 2013-11-05
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1547

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1547) منتشر شده است.

<div class="postBody">در مورد glimpse پیشتر مطالبی در سایت منتشر شده است :<br/> <a href="https://www.dntips.ir/post/1427"> آشنایی و بررسی ابزار Glimpse</a>    <br/>
 بعد از آپلود سایت ما می‌توانیم دسترسی به تنظیمات خاص  glimpse را تنها به کاربران عضو محدود کنیم:<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">&lt;location path="Glimpse.axd" &gt;&#10;    &lt;system.web&gt;&#10;        &lt;authorization&gt;&#10;            &lt;allow users="Administrator" /&gt;&#10;            &lt;deny users="*" /&gt;&#10;        &lt;/authorization&gt;&#10;    &lt;/system.web&gt;&#10;&lt;/location&gt;</pre>
 </div> <br/>
یا می‌توانیم آنرا غیرفعال کنیم :<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">&lt;glimpse defaultRuntimePolicy="Off" xdt:Transform="SetAttributes"&gt;&#10;&lt;/glimpse&gt;</pre>
 </div> <br/>
همچنین می‌توانیم با پیاده سازی اینترفیس IRuntimePolicy سیاست‌های مختلف نمایش تب‌های glimpse را تعیین کنیم :<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">using Glimpse.AspNet.Extensions;&#10;using Glimpse.Core.Extensibility;&#10;&#10;namespace Test&#10;{&#10;    public class GlimpseSecurityPolicy:IRuntimePolicy&#10;    {&#10;        public RuntimePolicy Execute(IRuntimePolicyContext policyContext)&#10;        {&#10;            // You can perform a check like the one below to control Glimpse's permissions within your application.&#10;// More information about RuntimePolicies can be found at http://getglimpse.com/Help/Custom-Runtime-Policy&#10;var httpContext = policyContext.GetHttpContext();&#10;            if (!httpContext.User.IsInRole("Administrator "))&#10;            {&#10;                return RuntimePolicy.Off;&#10;            }&#10;&#10;            return RuntimePolicy.On;&#10;        }&#10;&#10;        public RuntimeEvent ExecuteOn&#10;        {&#10;            get { return RuntimeEvent.EndRequest; }&#10;        }&#10;    }&#10;}</pre>
 </div> <br/>
زمانیکه glimpse را از طریق Nuget نصب می‌کنید کلاس فوق به صورت اتوماتیک به پروژه اضافه می‌شود با این تفاوت که به صورت کامنت شده است تنها کاری شما باید انجام بدید کدهای فوق را از حالت کامنت خارج کنید و Role مربوطه را جایگزین کنید.  <br/> <br/> <b>نکته : کلاس فوق نیاز به رجیستر شدن ندارد و تشخیص آن توسط Glimpse به صورت خودکار انجام می‌شود.</b>   <br/></div>
