# PowerShell 7.x - قسمت دهم - بررسی مشکلات به همراه پرچم فرمت

خیلی از ابزارهای command line، براساس فلسفه‌ی bash تهیه شده‌اند؛ به این معنا که امکان استفاده‌ی مستقیم از bash، درون دستورات وجود دارد. به عنوان مثال فرض کنید میخواهیم لیست branchهای یک مخزن گیت را با

- Published: 2023-04-04
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-3465

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/3465) منتشر شده است.

<div class="postBody">خیلی از ابزارهای command line، براساس فلسفه‌ی bash تهیه شده‌اند؛ به این معنا که امکان استفاده‌ی مستقیم از bash، درون دستورات وجود دارد. به عنوان مثال فرض کنید میخواهیم لیست branchهای یک مخزن گیت را با کمک دستور زیر در خروجی، به صورت JSON نمایش دهیم. برای اینکار با یک جستجو شاید به این نتیجه برسید که از پرچم format در دستور git branch استفاده کنید:  <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">PS /&gt; git branch --format='{"name":"%(refname:lstrip=2)"}' --list</pre>
 </div>
در اینجا به گیت گفته‌ایم که یک فرمت سفارشی، برای خروجی در نظر بگیرد. میخواهیم خروجی، لیستی از آبجکت‌هایی باشد که شامل یک پراپرتی name با مقدار نام branch هستند. برای مقدار این پراپرتی، از یک placeholder مشخص استفاده شده‌است:   <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">%(refname:lstrip=2)</pre>
 </div>
refname در اینجا به نام کامل branch اشاره میکند؛ با این تفاوت که رشته‌ی refs/heads که در ابتدای آن وجود دارد، برای حذف آن از lstrip=2 استفاده کرده‌ایم. در نهایت این چنین خروجی‌ایی برایمان نمایش داده خواهد شد:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">{"name":"main"}&#10;{"name":"feature-branch-a"}&#10;{"name":"feature-branch-b"}&#10;,...</pre>
 </div>
اما فرض کنید میخواهیم یک پراپرتی دیگر نیز با عنوان isMainBranch به این آبجکت اضافه کنیم. برای اینکار معمولاً از یک عبارت bash استفاده میشود: (با فرض اینکه main برنچ اصلی‌مان است)  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">PS /&gt; git branch --format='{"name":"%(refname:lstrip=2)","isMainBranch":'"$(if [[ $(git symbolic-ref --short HEAD) == "main" ]]; then echo true; else echo false; fi)"' }' --list</pre>
 </div>
اما اگر این دستور را در PowerShell وارد کنید، با خطای زیر مواجه خواهید شد:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">ParserError:&#10;Line |&#10;   1 |  … --format='{"name":"%(refname:lstrip=2)","isMainBranch":'"$(if [[ $(gi …&#10;     |                                                                 ~&#10;     | Missing '(' after 'if' in if statement.</pre>
 </div>
زیرا در اینجا از سینتکس bash، برای بررسی شرط استفاده کرده‌ایم. پارزر PowerShell هم بلافاصله بعد از دیدن $، انتظار دارد که بعد از if، از پرانتز استفاده کنیم. احتمالاً فکر میکنید که با escape کردن کاراکتر $، مشکل رفع میشود:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">'"`$(if [[ `$</pre>
 </div>
اما در اینحالت همه چیز به عنوان string در نظر گرفته میشود و هیچ ارزیابی برای اجرای nested script رخ نمیدهد؛ در نتیجه خروجی اینچنین خواهد بود:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">{"name":"main","isMainBranch":$(if [[ $(git symbolic-ref --short HEAD) == main ]]; then echo true; else echo false; fi) }&#10;{"name":"feature-branch-a","isMainBranch":$(if [[ $(git symbolic-ref --short HEAD) == main ]]; then echo true; else echo false; fi) }&#10;{"name":"feature-branch-b","isMainBranch":$(if [[ $(git symbolic-ref --short HEAD) == main ]]; then echo true; else echo false; fi) }</pre>
 </div>
برای رفع این مشکل باید به صورت کامل از PowerShell استفاده کنیم و JSON موردنظرمان را خودمان تهیه کنیم؛ یعنی بدون استفاده از format در گیت:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">$branches = git branch | ForEach-Object {&#10;    $default = $false&#10;    $activeBranch = git symbolic-ref --short HEAD&#10;    $currentBranch = ($_.Replace("* ", " ")).Trim()&#10;    if ($currentBranch -eq $activeBranch) {&#10;        $default = $true&#10;    }&#10;    @{&#10;        name            = $currentBranch&#10;        isMainBranch = $default&#10;    } | ConvertTo-Json&#10;} | ConvertFrom-Json</pre>
 </div> <br/> </div></div>
