# PowerShell 7.x - قسمت هفتم - غنی‌سازی PowerShell

غنی‌سازی پاورشل PowerShell توسط اپلیکیشن‌های مختلفی مانند VS Code یا Console قابل میزبانی است. با کمک این اپلیکیشن‌ها، دستورات به موتور PowerShell ارسال میشوند. این موتور است که دستورات را دریافت کرده

- Published: 2022-12-09
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-3431

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/3431) منتشر شده است.

<div class="postBody"><div> <b>غنی‌سازی پاورشل</b> </div> <div>PowerShell توسط اپلیکیشن‌های مختلفی مانند VS Code یا Console قابل میزبانی است. با کمک این اپلیکیشن‌ها، دستورات به موتور PowerShell ارسال میشوند. این موتور است که دستورات را دریافت کرده و آنها را اجرا میکند و در نهایت خروجی، درون این اپلیکشن‌های میزبان، نمایش داده خواهند شد. علاوه بر آن، یک اپلیکیشن میزبان، مسئولیت بارگذاری و اجرای اسکریپت‌ها را با هربار اجرای شل، بر عهده دارد. درون این اسکریپت‌ها، فرصت این را خواهیم داشت تا ماژول‌های موردنیازمان را بارگذاری کنیم؛ دایرکتوری پیش‌فرض را تغییر دهیم، یکسری توابع را تعریف و یا فراخوانی کنیم. بنابراین این امکان را داریم تا موتور PowerShell را درون یک پراسس NET. میزبانی کنیم. در این‌حالت باید خودمان Input/Output را هندل کنیم. به عنوان مثال میتوانیم Error streams را درون یک Message Box نمایش دهیم، یا اینکه Information streams را درون یکسری RichText Box نمایش دهیم. در <a href="https://www.youtube.com/watch?v=B-uvhmbnMx4">اینجا</a> میتوانید مراحل پیاده‌سازی یک نمونه Host سفارشی را مشاهده کنید. </div> <div>برای مشاهده‌ی مشخصات اپلیکیشن میزبان میتوانید از دستور Get-Host یا از متغیر خودکار host$ نیز استفاده کنید:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">PS /&gt; Get-Host&#10;&#10;Name             : ConsoleHost&#10;Version          : 7.3.0&#10;InstanceId       : c3f625f0-dad8-4325-a0a1-f6499afecb8a&#10;UI               : System.Management.Automation.Internal.Host.InternalHostUserInte&#10;                   rface&#10;CurrentCulture   : en-GB&#10;CurrentUICulture : en-GB&#10;PrivateData      : Microsoft.PowerShell.ConsoleHost+ConsoleColorProxy&#10;DebuggerEnabled  : True&#10;IsRunspacePushed : False&#10;Runspace         : System.Management.Automation.Runspaces.LocalRunspace</pre>
 </div>
یکسری از بخش‌های Host نیز درون سشن جاری، قابل سفارشی‌سازی هستند؛ به عنوان مثال:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">Function Write-Color {&#10;    Param (&#10;        [ValidateNotNullOrEmpty()]&#10;        [string] $newColor&#10;    )&#10;    $oldColor = $host.UI.RawUI.ForegroundColor&#10;    $host.UI.RawUI.ForegroundColor = $newColor&#10;    If ($args) {&#10;        Write-Output $args&#10;    }&#10;    Else {&#10;        $input | Write-Output&#10;    }&#10;    $host.UI.RawUI.ForegroundColor = $oldColor&#10;}</pre>
 </div> <div> <b>سفارش‌سازی Prompt</b> </div> <div>حالت پیش‌فرض نمایش prompt اینچنین است:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code"># macOS&#10;PS /{current_dir}&gt;&#10;&#10;# Windows&#10;PS C:\&gt;</pre>
 </div>
این نحوه نمایش، توسط تابعِ خودکار Prompt تعیین میشود. این تابع قابل بازنویسی نیز میباشد و خروجی آن میتواند یک شیء یا یک رشته باشد. اما توصیه میشود خروجی به صورت یک رشته‌ی فرمت شده برگردانده شود:  <br/> </div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">PS /&gt; function prompt { "Hello, World &gt; " }                 &#10;Hello, World &gt;</pre>
 </div>
منظور از شیء نیز این است که حتی خروجی تابع Prompt میتواند اینچنین نیز باشد:  </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">PS /&gt; Function prompt { Get-Process Slack }</pre>
 </div>
در اینحالت خروجی که درون Prompt نمایش داده میشود، پیاده‌سازی پیش‌فرض متد ToString شیء استفاده شده خواهد بود:  </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">System.Diagnostics.Process (Slack)</pre>
 </div>
بنابراین خروجی را میتوانید به هر حالتی که بخواهید نمایش دهید. به عنوان مثال در ادامه یک رشته‌ی فرمت شده را که حاوی زمان جاری، به همراه نام کامپیوتر میزبان است، بجای Prompt نمایش داده‌ایم:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">function prompt { &#10;$time = (Get-Date).ToShortTimeString() &#10;"$time $([net.dns]::GetHostName()):&gt; "&#10;}&#10;&#10;# eg: &#10;11:00 Sirwans-MacBook-Pro.local:&gt;</pre>
 </div>
یک مثال دیگر نیز نمایش اطلاعات Git، درون پوشه‌ی جاری میباشد:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">Function Write-Branch {&#10;    If (Test-Path .git) {&#10;        $branch = git branch --show-current&#10;        $lastCommitAuthor = git log -1 --pretty=format:"%an"&#10;        If ($null -ne $lastCommitAuthor) {&#10;            Return "($branch - latest commit written by 🤦👉 $lastCommitAuthor)"&#10;        }&#10;        Return "($branch)"&#10;    }&#10;    Else {&#10;        "Not in a git repo"&#10;    }&#10;}&#10;&#10;&#10;Function Prompt {&#10;    $CurrentDirectory = Split-Path -Path $pwd -Leaf&#10;    Write-Host "`nPS " -NoNewline -ForegroundColor Cyan&#10;    Write-Host $($CurrentDirectory) -NoNewline -ForegroundColor Green&#10;    Write-Host " $(Write-Branch) " -NoNewline -ForegroundColor Yellow&#10;    Return '&gt; '&#10;}</pre>
 </div>
در کد فوق ابتدا یک تابع را برای استخراج متادیتای گیت تهیه کرده‌ایم. ابتدا بررسی شده‌است که درون دایرکتوری جاری گیت، initialise شده باشد. سپس توسط دستور git branch —show-current برنچ جاری را دریافت کرده و به یک متغیر انتساب داده‌ایم. در ادامه با کمک git log آخرین کامیت (با کمک 1-) را استخراج کرده‌ایم. در ادامه درون تابع Prompt، دایرکتوری جاری را دریافت کرده و در نهایت آن را با نتیجه‌ی فراخوانی تابع Write-Branch ادغام کرده‌ایم:  <br/> </div> <div> <p style="margin-left: auto; margin-right: auto;"> <img src="/img/dntips/4b33e4681a9a4599846d.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default; height: 109px;"/> </p> <p style="margin-left: auto; margin-right: auto;"> <b> <br/> </b> </p> <p style="margin-left: auto; margin-right: auto;"> <b>ذخیره‌سازی تقییرات شل درون پروفایل</b> </p> <p style="margin-left: auto; margin-right: auto;">نکته‌ایی که باید به آن دقت داشته باشید این است که تغییرات، تنها برای سشن جاری ذخیره خواهند شد و به محض بستن سشن، این تغییرات از حافظه پاک خواهند شد. همانطور که در <a href="/blog/fa/dntips-3424/">قسمت قبل</a>  نیز اشاره شد، برای اینکه تغییرات را همیشه موقع باز کردن شل مشاهده کنیم، باید کدها را درون پروفایل ذخیره کنیم. به این معنا که هر وقت PowerShell را باز کنیم، توابع و کدهایی که درون پروفایل تعریف شده باشند، به صورت سراسری قابل استفاده خواهند بود. توسط متغیر خودکار Profile$ میتوانیم پروفایل جاری را مشاهده کنیم:   </p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">PS /&gt; $Profile&#10;&#10;{HOME_USER}/.config/powershell/Microsoft.PowerShell_profile.ps1</pre>
 </div> <p style="margin-left: auto; margin-right: auto;">دقت داشته باشید که پرفایل فوق، برای Host جاری و همچنین کاربر جاری میباشد. به این معنا که محتویات داخل این پروفایل، تاثیری در دیگر شل‌هایی که توسط اپلیکیشن‌های دیگر میزبانی میشوند ندارد. توسط دستور زیر میتوانید لیست پروفایل‌ها را مشاهده نمائید:  <br/> </p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">PS /&gt; $PROFILE | Get-Member -Type NoteProperty | Select-Object Name, Value&#10;&#10;Name                   Value&#10;----                   -----&#10;AllUsersAllHosts&#10;AllUsersCurrentHost&#10;CurrentUserAllHosts&#10;CurrentUserCurrentHost</pre>
 </div> <p style="margin-left: auto; margin-right: auto;">مسیر هر کدام از پروفایل‌های فوق را میتوانید در <a href="https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.3#the-profile-files">اینجا</a> مشاهده نمائید. همچنین توسط پرچم NoProfile- میتوانیم PowerShell را بدون بارگذاری هیچ پروفایلی باز کنیم:  <br/> </p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">pwsh -NoProfile</pre>
 </div> <p style="margin-left: auto; margin-right: auto;">بنابراین برای ذخیره‌ی تغییرات قبل، میتوانیم توابع تعریف شده را درون پروفایل موردنظر قرار دهیم، تا با هربار باز شدن سشن، کدهای موردنظر قابل استفاده باشند:  <br/> </p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">PS /&gt; code $PROFILE.CurrentUserCurrentHost&#10;&#10;Function Write-Branch {&#10;    # As before&#10;}&#10;&#10;&#10;Function Prompt {&#10;    # As before&#10;}</pre>
 </div> <p style="margin-left: auto; margin-right: auto;">اگر از ماژول <a href="https://ohmyposh.dev/">Posh</a> برای تغییر ظاهر PowerShell استفاده کرده باشید، متوجه خواهید شد که این ماژول نیز به همین روال کار میکند؛ یعنی با هربار باز شدن سشن، این دستور برای بارگذاری Prompt سفارشی فراخوانی خواهد شد:  <br/> </p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">oh-my-posh init pwsh | Invoke-Expression</pre>
 </div> <p style="margin-left: auto; margin-right: auto;"> <img src="/img/dntips/3a93f6d3255459e0f4ac.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default; height: 181px;"/> </p> <p style="margin-left: auto; margin-right: auto;"> <br/> </p> </div></div>
