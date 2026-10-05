# رمزنگاری Connection String از طریق خط فرمان

برای رمز نگاری Connection String ابتدا Command Prompt را از مسیر زیر باز کنید Start Menu\Programs\Microsoft Visual Studio 2010\Visual Studio Tools\Visual Studio Command Prompt و سپس دستور زیر را برای 

- Published: 2012-07-23
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-959

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/959) منتشر شده است.

<div class="postBody"><br/>
برای رمز نگاری Connection String ابتدا Command Prompt  را از مسیر زیر باز کنید <div><br/>
<br/>
<div style="text-align: left;">Start Menu\Programs\Microsoft Visual Studio 2010\Visual Studio Tools\Visual Studio Command Prompt<br/>
</div>
<div style="text-align: right;">و سپس دستور زیر را برای رمزنگاری Connection String وارد کنید :</div>
<div style="text-align: right;"><div align="left" dir="ltr">

<pre language="CSharp" name="code">aspnet_regiis.exe -pef "connectionStrings" "sulotion path"</pre>

</div>
</div>
<div style="text-align: right;">در اینجا پارامتر اول (pef) مشخص می‌کند که Application ما از نوع File System Website است،پارامتر دوم(connectionStrings) نام کلید موردنظری است که می‌خواهیم Encrypt شود،در اینجا می‌توانیم هر کلیدی را Encrypt <span> کنیم به عنوان مثال فرض کنید تنظیمات SMTP را در Web.Config بدین صورت داریم : </span></div>
<div style="text-align: right;"><div align="left" dir="ltr">

<pre language="CSharp" name="code">&lt;system.net&gt; &#10;    &lt;mailSettings&gt; &#10;      &lt;smtp deliveryMethod="Network"&gt; &#10;        &lt;network host="smtp.gmail.com" port="587" userName="username@gmail.com" password="password" /&gt; &#10;      &lt;/smtp&gt; &#10;    &lt;/mailSettings&gt; &#10;  &lt;/system.net&gt; </pre>

</div>
</div>
<div style="text-align: right;">برای رمزنگاری بدین صورت عمل می‌کنیم :</div>
<div style="text-align: right;"><div align="left" dir="ltr">

<pre language="CSharp" name="code">aspnet_regiis.exe -pef "system.net/mailSettings/smtp" "sulotion path"</pre>

</div>
</div>
<div style="text-align: right;">و بعد از Encrypt کردن توسط دستور فوق بدین صورت در Web.Config نمایش داده می‌شود :</div>
<div style="text-align: right;"><div align="left" dir="ltr">

<pre language="CSharp" name="code">  &lt;system.net&gt;&#10;    &lt;mailSettings&gt;&#10;      &lt;smtp configProtectionProvider="RsaProtectedConfigurationProvider"&gt;&#10;        &lt;EncryptedData Type="http://www.w3.org/2001/04/xmlenc#Element"&#10;          xmlns="http://www.w3.org/2001/04/xmlenc#"&gt;&#10;          &lt;EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#tripledes-cbc" /&gt;&#10;          &lt;KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#"&gt;&#10;            &lt;EncryptedKey xmlns="http://www.w3.org/2001/04/xmlenc#"&gt;&#10;              &lt;EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-1_5" /&gt;&#10;              &lt;KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#"&gt;&#10;                &lt;KeyName&gt;Rsa Key&lt;/KeyName&gt;&#10;              &lt;/KeyInfo&gt;&#10;              &lt;CipherData&gt;&#10;                &lt;CipherValue&gt;QuOFQrT6XwxDhQjFnM3EByleyWqYY6lA1cGK1Dzli/hrDOYSj35ADk4MB3PeLOMVYh76kB8vch0/iZKAZaJlNUPKi/iZjEzE755B3sILKGLxfkH3j3qKHB0x1WN65L6zBXgzufphCVaNRobQXOl5J3E0Df8VCf/bERZu741HLPs=&lt;/CipherValue&gt;&#10;              &lt;/CipherData&gt;&#10;            &lt;/EncryptedKey&gt;&#10;          &lt;/KeyInfo&gt;&#10;          &lt;CipherData&gt;&#10;            &lt;CipherValue&gt;NdwBe0mWZ+Yg/DEzNuiDfXlGpicoH1ZMn54FTrLuVsY3rawS/k6KPID3bZvOWB/XYseTYFGhqs7FUEqIYMvWjJYYmDAzk6dd4iv9y6ch3ZcXWQ/R5TkQLWoLQPYgdwGI3uJNs22t28xUISm1wS0uDbizCM2Io+DzSQe8N4Ih2MP9mb2NCbZ4BZEBCPvCevpSpdEjGN9v7hk=&lt;/CipherValue&gt;&#10;          &lt;/CipherData&gt;&#10;        &lt;/EncryptedData&gt;&#10;      &lt;/smtp&gt;&#10;    &lt;/mailSettings&gt;&#10;  &lt;/system.net&gt;</pre>

</div>
</div>
<div style="text-align: right;">در اینجا Encryption از نوع <span style="color: #990000;">RSAProtectedConfigurationProvider</span><span><span style="color: #990000;"> </span>انتخاب شده است که می‌توانیم آنرا به </span><span style="color: #990000;">DataProtectionConfgurationProvider</span><span><span style="color: #990000;"> </span>تغییر دهیم که مورد اول از روش رمز نگاری کلید عمومی RSA استفاده می‌کند.</span></div>
<div style="text-align: right;">برای Decrypt کردن هم فقط کافی است پارامتر اول دستور aspnet_regiis را به pdf<span> تغییر دهیم :</span></div>
<div style="text-align: right;"><div align="left" dir="ltr">

<pre language="CSharp" name="code">aspnet_regiis.exe -pdf "system.net/mailSettings/smtp" "sulotion path"</pre>

</div>
</div>
<div style="text-align: right;"><br/>
</div>
<div style="text-align: right;"><br/>
</div>
</div></div>
