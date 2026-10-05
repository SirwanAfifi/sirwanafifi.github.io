# سری بررسی SQL Smell در EF Core - استفاده از مدل Entity Attribute Value - بخش دوم

در مطلب قبلی ، مدل EAV را معرفی کردیم و گفتیم که این نوع پیاده‌سازی در واقع یک SQL Smell است؛ زیرا کوئری نویسی را سخت میکند و همچنین به دلیل عدم امکان تعریف constraints، کنترلی بر روی صحت دیتاهای وارد

- Published: 2020-08-04
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-3235

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/3235) منتشر شده است.

<div class="postBody"><div>در <a href="/blog/fa/dntips-3233/">مطلب قبلی</a>، مدل EAV را معرفی کردیم و گفتیم که این نوع پیاده‌سازی در واقع یک SQL Smell است؛ زیرا کوئری نویسی را سخت میکند و همچنین به دلیل عدم امکان تعریف constraints، کنترلی بر روی صحت دیتاهای وارده شد نخواهیم داشت. در نهایت با برنامه‌ای روبرو خواهیم شد که درک صحیحی از ماهیت دیتا ندارد. اما اگر در شرایطی مجبور به استفاده‌ی از این مدل هستید، بهتر است از فرمت JSON برای ذخیره‌سازی دیتای داینامیک استفاده کنید. بیشتر دیتابیس‌های رابطه‌ایی به صورت native از نوع داده‌ایی JSON پشتیبانی میکنند:  </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">CREATE TABLE EmployeeJsonAttributes (&#10;  Id int NOT NULL AUTO_INCREMENT,&#10;  EmployeeId int NOT NULL,&#10;  Attributes json DEFAULT NULL,&#10;  PRIMARY KEY (Id),&#10;  FOREIGN KEY (EmployeeId) REFERENCES EmployeeEav (Id) ON DELETE CASCADE&#10;)</pre>
 </div>
همانطور که مشاهده می‌کنید در اینجا تایپ ستون Attributes، به JSON تنظیم شده است. بنابراین می‌توانیم از قابلیت‌های توکار دیتابیس (MySQL در مطلب جاری) برای ذخیره و بازیابی داده‌های JSON استفاده کنیم. در ادامه دو روش ذخیره JSON  را مشاهده میکنید:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">INSERT INTO EmployeeJsonAttributes VALUES (&#10;101, &#10;  '{&#10;  "name": "Jon",&#10;    "lastName": "Doe",&#10;    "dateOfBirth": "1989-01-01 10:10:10+05:30",&#10;    "skills": [ "C#", "JS" ],&#10;    "address":  {&#10;  "country": "UK",&#10;      "city": "London",&#10;      "email": "jon.doe@example.com"&#10;    }&#10;  }'&#10;)&#10;&#10;INSERT INTO efcoresample.EmployeeJsonAttributes VALUES (&#10;101, &#10;  JSON_OBJECT(&#10;"name", "Jon", &#10;"lastName", "Doe",&#10;"dateOfBirth", "1989-01-01 10:10:10+05:30",&#10;"skills", JSON_ARRAY("C#", "JS"),&#10;    "address", JSON_OBJECT(&#10;  "country", "UK",&#10;      "city", "London",&#10;  "email", "jon.doe@example.com"&#10;    )&#10;  )&#10;)</pre>
 </div> <br/> </div> <div>به عنوان مثال در ادامه میخواهیم کشور محل تولد یک کاربر خاص را نمایش دهیم. برای اینکار می‌توانیم از JSON_EXTRACT استفاده کنیم: <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">SELECT JSON_EXTRACT(Attributes, '$.address.country') as Country &#10;FROM EmployeeJsonAttributes&#10;WHERE EmployeeId = 101;&#10;&#10;-- Conutry&#10;-- "UK"</pre>
 </div> <br/> </div> <div>همچنین می‌توانیم از عملگر column-path نیز به جای JSON_EXTRACT استفاده کنیم: <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">SELECT Attributes -&gt; '$.address.country' as Country &#10;FROM EmployeeJsonAttributes&#10;WHERE EmployeeId = 101;&#10;&#10;-- Conutry&#10;-- "UK"</pre>
 </div> <br/> </div> <div>بنابراین به راحتی می‌توانیم کوئری مطلب قبل را اینگونه بازنویسی کنیم: <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">SELECT EmployeeId, Attributes -&gt;&gt; '$.DateOfBirth' AS BirthDate FROM EmployeeJsonAttributes&#10;WHERE Attributes -&gt;&gt; '$.DateOfBirth' &gt; DATE_SUB(CURRENT_DATE(), INTERVAL 25 YEAR)</pre>
 </div>
همانطور که مشاهده می‌کنید در کوئری فوق یک عملگر &lt; دیگر نیز اضافه کرده‌ایم. هدف از آن حذف “” از خروجی نهایی می‌باشد.  <br/> </div> <div> <br/> </div> <div> <b>استفاده از JSON در EF Core <br/> </b> </div> <div>متاسفانه در EF Core به صورت مستقیم نمی‌توانیم از JSON درون کلاس‌های سی‌شارپ استفاده کنیم (<a href="https://github.com/dotnet/efcore/issues/4021">+</a> )، در نتیجه در سمت کلاس‌های سی‌شارپ باید از string استفاده کنیم و به نوعی به EF Core اطلاع دهیم که تایپ ستون موردنظرمان JSON است. در نتیجه خروجی نهایی درون دیتابیس، یک فیلد با تایپ JSON خواهد بود. برای اینکار به دو شیوه می‌توانیم تایپ ستون موردنظر را تعیین کنیم: </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">// Fluent API&#10;protected override void OnModelCreating(ModelBuilder modelBuilder)&#10;{&#10;    modelBuilder.Entity&lt;Employee&gt;(entity =&gt;&#10;    {&#10;        entity.Property(e =&gt; e.Attributes).HasColumnType("json");&#10;    });&#10;}&#10;&#10;// Data Annotations&#10;[Column(TypeName = "json")]&#10;public string Attributes { get; set; }</pre>
 </div> <br/> </div> <div>در نهایت برای تشکیل بانک اطلاعاتی، به مدلی با ساختار زیر نیاز خواهیم داشت: <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class EmployeeJsonAttribute&#10;{&#10;    public int Id { get; set; }&#10;    public virtual EmployeeEav Employee { get; set; }&#10;    public int EmployeeId { get; set; }&#10;    [Column(TypeName = "json")]&#10;    public string Attributes { get; set; }&#10;}</pre>
 </div>
در اینجا به جای تعریف ستون‌ها و مقادیر داینامیک‌شان از یک فیلد از نوع رشته‌ایی با نام Attributes استفاده شده است. از آنجائیکه نوع ستون در سمت دیتابیس به JSON تنظیم خواهد شد، در نتیجه هر نوع ساختار JSON معتبری را می‌توانیم درون آن ذخیره کنیم: <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">dbContext.EmployeeJsonAttributes.Add(new EmployeeJsonAttribute&#10;{&#10;    EmployeeId =  101,&#10;    Attributes = JsonSerializer.Serialize(new&#10;    {&#10;        FirstName = "Sirwan",&#10;        LastName = "Afifi",&#10;        DateOfBirth = DateTime.Now.AddYears(-31)&#10;    })&#10;});&#10;&#10;dbContext.SaveChanges();</pre>
 </div>
همانطور که اشاره شده به دلیل عدم پشتیبانی از JSON در حال حاضر در EF Core امکان کوئری نویسی بر روی ستون JSON را نداریم. در همین حد که براساس فیلدهای دیگر جستجو را انجام داده و خروجی را Deserialize کنیم: <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">var employee = dbContext.EmployeeJsonAttributes.Find(201);&#10;Console.WriteLine(JsonSerializer.Deserialize&lt;Employee&gt;(employee.Attributes).DateOfBirth);</pre>
 </div> <br/> </div> <div>برای نوشتن کوئری روی ستون JSON می‌توانید از <a href="https://www.dntips.ir/post/2502">Query Types</a>  نیز استفاده کنید.  <br/> </div></div>
