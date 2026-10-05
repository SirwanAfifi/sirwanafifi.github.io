# PowerShell 7.x - قسمت سوم - آشنایی با Redirection

در PowerShell به صورت پیش‌فرض، خروجی، PowerShell Host یا همان کنسول است. PowerShell از چندین استریم پشتیبانی میکند: Success Error Warning Verbose Debug Information برای هر کدام از استریم‌های فوق یک آی

- Published: 2022-10-16
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-3416

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/3416) منتشر شده است.

<div class="postBody"><div>در PowerShell به صورت پیش‌فرض، خروجی، PowerShell Host یا همان کنسول است. PowerShell از چندین استریم پشتیبانی میکند:<br/> </div> <div> <ul> <li>Success</li> <li>Error</li> <li>Warning</li> <li>Verbose</li> <li>Debug</li> <li>Information </li> </ul> <div>برای هر کدام از استریم‌های فوق یک آی‌دی اختصاص داده شده‌است که به ترتیب از 1 تا ۶ میباشد. همچنین برای هرکدام یک cmdlet مجزا وجود دارد:</div> </div> <div> <table> <tbody> <tr> <td> <b>cmdlet </b> </td> <td> <b>Name </b> </td> <td> <b> Id</b> </td> </tr> <tr> <td> Write-Output</td> <td> Success</td> <td> 1</td> </tr> <tr> <td> Write-Error</td> <td> Error</td> <td> 2</td> </tr> <tr> <td> Write-Warning</td> <td> Warning</td> <td> 3</td> </tr> <tr> <td> Write-Verbose</td> <td> Verbose</td> <td> 4</td> </tr> <tr> <td> Write-Debug</td> <td> Debug</td> <td> 5</td> </tr> <tr> <td> Write-Information</td> <td> Information</td> <td> 6</td> </tr> </tbody> </table> <p>به جز دو مورد اول، بقیه cmdletها خروجی را به صورت پیش‌فرض درون کنسول نمایش نمیدهند. به عنوان مثال اسکریپت زیر را در نظر بگیرید:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">Write-Output 'Output'                          &#10;Write-Error 'This is an error'                 &#10;Write-Warning 'This is a warning'              &#10;&#10;Write-Verbose 'This is verbose'                &#10;Write-Debug 'This is Debug'                    &#10;Write-Information 'This is information'</pre>
 </div> <p>با اجرای اسکریپت فوق خروجی زیر را خواهیم داشت:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">Output&#10;Write-Error: This is an error&#10;WARNING: This is a warning</pre>
 </div> <p>همانطور که مشاهده میکنید سه cmdlet فوق، خروجی را درون کنسول نمایش نداده‌اند. این رفتار توسط مفهومی تحت عنوان Action Preference قابل تنظیم است که در واقع یک Enum است با مقدار زیر:</p> <table> <tbody> <tr> <td> </td> <td>6</td> <td> Break</td> </tr> <tr> <td>رخداد به صورت عادی مدیریت شده و برنامه ادامه پیدا میکند </td> <td>2</td> <td> Continue</td> </tr> <tr> <td>به طور کلی از رخداد صرفنظر خواهد شد؛ بدون اینکه چیزی در استریم نمایش داده شود</td> <td>4</td> <td> Ignore</td> </tr> <tr> <td>سوال پرسیده خواهد شد که برنامه را ادامه دهد یا متوقف کند </td> <td>3</td> <td> Inquire</td> </tr> <tr> <td>به طور کلی از رخداد صرفنظر خواهد شد      <br/> </td> <td>0</td> <td> SilentlyContinue</td> </tr> <tr> <td> دستور را متوقف خواهد کرد</td> <td>1 </td> <td> Stop</td> </tr> <tr> <td> دستور به نوعی معلق خواهد شد</td> <td>5</td> <td> Suspend</td> </tr> </tbody> </table> <p>بنابراین با تغییر Action Preference برای هر کدام از cmdletها میتوانیم رفتار اسکریپت قبلی را تغییر دهیم:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">Write-Output 'Output'                          &#10;Write-Error 'This is an error'                 &#10;Write-Warning 'This is a warning'              &#10;&#10;$VerbosePreference = 'Continue'&#10;Write-Verbose 'This is verbose'&#10;&#10;$DebugPreference = 'Continue'&#10;Write-Debug 'This is Debug'  &#10;&#10;$InformationPreference = 'Continue'&#10;Write-Information 'This is information'</pre>
 </div> <p>اکنون اگر اسکریپت فوق را اجرا کنید، سه خروجی آخر را نیز مشاهده خواهید کرد:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">Output&#10;Write-Error: This is an error&#10;WARNING: This is a warning&#10;VERBOSE: This is verbose&#10;DEBUG: This is Debug&#10;This is information</pre>
 </div> <p>هر کدام از استریم‌های فوق قابل redirect شدن نیز هستند؛ برای اینکار میتوانیم از redirect operatorهایی که در PowerShell پشتیبانی میشود استفاده کنیم:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">&gt;&#10;&gt;&gt;&#10;&gt;&amp;1</pre>
 </div> <p>به عنوان مثال میتوانیم تمام خطاها یا هشدارهای درون یک اسکریپت را به یک فایل منتقل کنیم:<br/> </p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">./script.ps1 2&gt;&amp;1 &gt; .\logs.txt</pre>
 </div> <p> <b>یا میتوانیم تمام Success streamها را به یک فایل هدایت کنیم:</b> </p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">.\script.ps1 &gt; script.log</pre>
 </div> <p> <b>ارسال تمام Success, Warning, Errorها به یک فایل:</b> </p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">&amp;{&#10;   Write-Warning "hello"&#10;   Write-Error "hello"&#10;   Write-Output "hi"&#10;} 3&gt;&amp;1 2&gt;&amp;1 &gt; C:\Temp\redirection.log</pre>
 </div> <p> <b>ارسال تمام استریم‌ها به یک فایل:</b> </p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">.\script.ps1 *&gt; script.log</pre>
 </div> <p>همچنین میتوانیم استریمی را به اصطلاح suppress کنیم که در خروجی نمایش داده نشود:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">./script.ps1 1&gt; $null 2&gt; $null&#10;&#10;./script.ps1 *&gt; $null</pre>
 </div> <p>از تکنیک فوق برای drop کردن خروجی‌هایی که نمیخواهیم نمایش داده شوند، استفاده میشود. در کد فوق دو Idهای ۱ و ۲ را به متغیر ویژه‌ی null هدایت کرده‌ایم؛ همچنین میتوانستیم از یک رشته‌ی خالی نیز بجای null استفاده کنیم. در خط بعدی از * استفاده کرده‌ایم که به معنای تمامی استریم‌های موجود است؛ با اینکار چیزی در خروجی نمایش داده نخواهد شد. یک روش دیگر برای drop کردن، استفاده از دستور Out-Null است:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">Get-ChildItem | Out-Null</pre>
 </div> <p>لازم به ذکر است که این cmdlet تا قبل از نسخه ۶ خیلی کند بود؛ زیرا همانند دیگر cmdletهای درون pipeline میبایست یک ورودی (InputObject) را دریافت کند که باعث میشد هزینه‌ی پردازشی بالایی داشته باشد. اما در نسخه ۶ به بعد این مشکل رفع شده‌است و پارزر به محض رسیدن به این keyword به صورت کلی خروجی را discard میکند بدون اینکه Out-Null را فراخوانی کند؛ در واقع این cmdlet یک hint برای پارزر است. روش دیگر برای drop کردن خروجی، انتساب نتیجه یک دستور به متغییر null است:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">New-Item -Type Directory -Path $path | Out-Null&#10;&#10;$null = New-Item -Type Directory -Path $path</pre>
 </div> <p>همچنین میتوانیم خروجی یک دستور را به void تبدیل کنیم؛ که نتیجه مشابه با تکنیک‌های فوق دارد:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">[void](New-Item -Name test -ItemType Directory)</pre>
 </div> <p> <b>یک نکته در مورد Out-Null</b> </p> <p>در loopهای بزرگ ممکن است Out-Null حتی در PowerShell 7.x هم کند عمل کند:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">PS &gt; Measure-Command { for($i=0; $i -lt 1mb; $i++) { $i | Out-Null } } | Select-Object TotalSeconds&#10;&#10;TotalSeconds&#10;------------&#10;   4.3056315&#10;&#10;&#10;PS &gt; Measure-Command { for($i=0; $i -lt 1mb; $i++) { $null = $i } } | Select-Object TotalSeconds&#10;&#10;TotalSeconds&#10;------------&#10;   1.1210884&#10;&#10;PS &gt; Measure-Command { for($i=0; $i -lt 1mb; $i++) { [void]$i } } | Select-Object TotalSeconds&#10;&#10;TotalSeconds&#10;------------&#10;    1.130507&#10;&#10;PS &gt; Measure-Command { for($i=0; $i -lt 1mb; $i++) { $i &gt; $null } } | Select-Object TotalSeconds&#10;&#10;TotalSeconds&#10;------------&#10;   1.3832427</pre>
 </div> </div></div>
