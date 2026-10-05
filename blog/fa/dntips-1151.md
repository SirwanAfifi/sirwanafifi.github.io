# Import و Export کردن Breakpointها در Visual Studio

ویژوال استدیو Breakpointها را در یک فایل XML ذخیره میکند.برای ذخیره Breakpointها فقط کافی است بر روی دکمه Export در پنجره Breakpoint که در شکل زیر نمایش داده شده است کلیک کنید. شما می‌توانید فایل XML 

- Published: 2012-12-12
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1151

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1151) منتشر شده است.

<div class="postBody">ویژوال استدیو Breakpointها را در یک فایل XML ذخیره میکند.برای ذخیره Breakpointها فقط کافی است بر روی دکمه Export در پنجره Breakpoint که در شکل زیر نمایش داده شده است کلیک کنید. <br/>
<br/>
<p><img alt="Breakpoint_Window" src="/img/dntips/96502ce7a14da2165a11.jpg" style="display: block; margin: 0px auto; cursor: default; float: none;"/></p>
<p>شما می‌توانید فایل XML ذخیره شده را بعدا استفاده کنید و یا می‌توانید آن را به برنامه نویسان دیگر هم بدهید.<br/>
اجازه دهید نگاهی داشته باشیم بر محتویات داخل فایل XML . فایل XML کلکسیونی از تگ BreakPoints داخل BreakpointCollection است.هر تگ Breakpoint حاوی اطلاعاتی در مورد یک Breakpoint خاص است.<br/>
</p>
<p><img alt="XML File" src="/img/dntips/5a917a612201860d57d0.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default; width: 520.163px; height: 550px;"/></p>
<p>
اگر شما هر زمانی همه Breakpointها را از کدتان حذف کردید به راحتی می‌توانید آن را تنها با کلیک بر روی Import وارد کدتان بکنید و تمام Breakpoint‌های ذخیره شده را بازآوری کنید.<br/>
<b>نکته: </b>Import کردن Breakpoint براساس شماره خط کد شما می‌باشد یعنی همان خطی که شما Breakpoint را گذاشته اید پس اگر شماره خط کد شما تغییر کند Breakpoint بروی خط قبلی گذاشته میشود.<br/>
 <br/>
</p></div>
