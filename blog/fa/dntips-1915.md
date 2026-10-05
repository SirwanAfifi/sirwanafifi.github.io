# استفاده از پروایدر SQLite در Entity Framework 7

Entity Framework در نگارش 7 خود از منابع داده‌ایی جدیدی پشتیبانی میکند( + ) . یعنی از Windows Phone، Windows Store و همچنین ASP.NET 5 (اپلیکیشن‌هایی که از NET Core. استفاده می‌کنند) پشتیبانی خواهد کرد

- Published: 2014-11-17
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1915

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1915) منتشر شده است.

<div class="postBody">Entity Framework در نگارش 7 خود از منابع داده‌ایی جدیدی پشتیبانی میکند(<a href="http://blogs.msdn.com/b/adonet/archive/2014/05/19/ef7-new-platforms-new-data-stores.aspx">+</a>) . یعنی از Windows Phone، Windows Store و همچنین ASP.NET 5 (اپلیکیشن‌هایی که از NET Core. استفاده می‌کنند) پشتیبانی خواهد کرد. در این نسخه از دیتابیس‌های non-relational نیز پشتیبانی می‌شود. پروایدر SQLite به صورت رسمی توسط تیم EF ارائه شده است که در ادامه نحوه‌ی استفاده از آن را در یک برنامه کنسول ساده بررسی خواهیم کرد.<div>کلاس‌های برنامه:</div> <div> <div align="left" dir="ltr"> <div align="left" dir="ltr"> <div align="left" dir="ltr"> <div align="left" dir="ltr"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">using Microsoft.Data.Entity;&#10;using Microsoft.Data.Entity.Metadata;&#10;using System.Collections.Generic;&#10;using System.Linq;&#10;&#10;namespace UsingEF7WithSQLite&#10;{&#10;    public class Blog&#10;    {&#10;        public int BlogId { get; set; }&#10;        public string Url { get; set; }&#10;&#10;        public List&lt;Post&gt; Posts { get; set; }&#10;    }&#10;&#10;    public class Post&#10;    {&#10;        public int PostId { get; set; }&#10;        public string Title { get; set; }&#10;        public string Content { get; set; }&#10;&#10;        public int BlogId { get; set; }&#10;        public Blog Blog { get; set; }&#10;    }&#10;}</pre>
 </div> <div style="direction: rtl; text-align: right;">خب تا اینجا مدل‌های برنامه را تعریف کردیم، قدم بعدی افزودن <a href="https://www.nuget.org/packages/EntityFramework.SQLite/">پکیج مربوط به پروایدر SQLite</a>  به پروژه است، با دستور زیر این پکیج را نصب می‌کنیم:</div> <div style="direction: rtl; text-align: right;"> <div align="left" dir="ltr"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">PM&gt; Install-Package EntityFramework.SQLite –Pre</pre>
 </div> <div style="direction: rtl; text-align: right;">اکنون کلاس کانتکست برنامه را به صورت زیر تعریف می‌کنیم:</div> <div style="direction: rtl; text-align: right;"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">namespace UsingEF7SQLiteProvider&#10;{&#10;    public class BloggingContext : DbContext&#10;    {&#10;        public DbSet&lt;Blog&gt; Blogs { get; set; }&#10;        public DbSet&lt;Post&gt; Posts { get; set; }&#10;&#10;        protected override void OnConfiguring(DbContextOptions builder)&#10;        {&#10;            builder.UseSQLite(@"Data Source=.\BloggingDatabae.db");&#10;        }&#10;&#10;        protected override void OnModelCreating(ModelBuilder builder)&#10;        {&#10;            builder.Entity&lt;Blog&gt;()&#10;                .OneToMany(b =&gt; b.Posts, p =&gt; p.Blog)&#10;                .ForeignKey(p =&gt; p.BlogId);&#10;&#10;            // The EF7 SQLite provider currently doesn't support generated values&#10;            // so setting the keys to be generated from developer code&#10;            builder.Entity&lt;Blog&gt;()&#10;                .Property(b =&gt; b.BlogId)&#10;                .GenerateValueOnAdd(false);&#10;&#10;            builder.Entity&lt;Post&gt;()&#10;                .Property(b =&gt; b.BlogId)&#10;                .GenerateValueOnAdd(false);&#10;        }&#10;    }&#10;}</pre>
 </div> <br/> <div align="left" dir="ltr"> </div>
کار را با بازنویسی متد OnConfiguration شروع می‌کنیم، در این قسمت باید به EF بگوئیم که می‌خواهیم از SQLite استفاده کنیم برای اینکار از یک Extension Method با نام UseSQLite و پاس دادن کانکشتن استرینگ به آن استفاده می‌کنیم.</div> </div> </div> </div> <div style="direction: rtl; text-align: right;"> <b>نکته: </b>پروایدر فعلی SQLite در حال حاضر از Generated values پشتیبانی نمی‌کند، برای این منظور باید درون متد OnModelCreating این قابلیت را غیرفعال کنیم.</div> <div style="direction: rtl; text-align: right;">اکنون می‌توانیم از طریق پاورشل نیوگت دیتابیس را ایجاد کنیم، برای اینکار باید <a href="https://www.nuget.org/packages/EntityFramework.Commands/">پکیج زیر را</a>  به پروژه اضافه کنید:</div> <div style="direction: rtl; text-align: right;"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">Install-Package EntityFramework.Commands -Pre</pre>
 </div>
سپس دستورات زیر را اجرا می‌کنیم:</div> <div style="direction: rtl; text-align: right;"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">Add-Migration MyFirstMigration&#10;Apply-Migration</pre>
 </div>
توسط دستور Apply-Migrate دیتابیس برای شما ایجاد خواهد شد. البته این دستور زمانی استفاده می‌شود که برنامه شما یک اپلیکیشن دسکتاپ باشد. اگر اپلیکیشن شما یک Windows Phone Application است باید در زمان اجرای برنامه این کد را بنویسید:</div> <div style="direction: rtl; text-align: right;"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">using (var db = new BloggingContext())&#10;{&#10;   db.Database.AsMigrationsEnabled().ApplyMigrations();&#10;}</pre>
 </div>
در نهایت می‌توانید با دستور زیر از کانتکست برنامه استفاده کرده و خروجی را مشاهده کنید:</div> <div style="direction: rtl; text-align: right;"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">using (var db = new Models.BloggingContext())&#10;{&#10;     db.Blogs.Add(new Models.Blog { Url = "https://www.dntips.ir" });&#10;     db.SaveChanges();&#10;&#10;     foreach (var item in db.Blogs)&#10;     {&#10;         Console.WriteLine(item.Url);&#10;     }&#10;}&#10;Console.ReadLine();</pre>
 </div> </div> </div> </div> </div> </div></div>
