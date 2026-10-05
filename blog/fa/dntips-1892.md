# فعال‌سازی Multiple Active Result Sets

(Multiple Active Result Sets (MARS یکی از قابلیتهای SQL SERVER است. این قابلیت در واقع این امکان را برای ما فراهم می‌کند تا بر روی یک Connection همزمان چندین کوئری را به صورت موازی ارسال کنیم. در این 

- Published: 2014-10-15
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1892

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1892) منتشر شده است.

<div class="postBody">(Multiple Active Result Sets (MARS یکی از قابلیتهای SQL SERVER است. این قابلیت در واقع این امکان را برای ما فراهم می‌کند تا بر روی یک Connection همزمان چندین کوئری را به صورت موازی ارسال کنیم. در این حالت برای هر کوئری یک سشن مجزا در نظر گرفته می‌شود.  <div>مدل:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">namespace EnablingMARS.Models&#10;{&#10;    public class Product&#10;    {&#10;        public int Id { get; set; }&#10;        public string Title { get; set; }&#10;        public string Desc { get; set; }&#10;        public float Price { get; set; }&#10;        public Category Category { get; set; }&#10;&#10;    }&#10;&#10;    public enum Category&#10;    {&#10;        Cate1,&#10;        Cate2,&#10;        Cate3&#10;    }&#10;}</pre>
 </div>
کلاس Context:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">namespace EnablingMARS.Models&#10;{&#10;    public class ProductDbContext : DbContext&#10;    {&#10;        public ProductDbContext() : base("EnablingMARS") {}&#10;        public DbSet&lt;Product&gt; Products { get; set; }&#10;&#10;    }&#10;}</pre>
 </div>
ابتدا یک سطر جدید را توسط کد زیر به دیتابیس اضافه می‌کنیم:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">MyContext.Products.Add(new Product()&#10; {&#10;                Title = "title1",&#10;                Desc = "desc",&#10;                Price = 4500f,&#10;                Category = Category.Cate1&#10;   });&#10;MyContext.SaveChanges();</pre>
 </div>
اکنون می‌خواهیم قیمت محصولاتی را که در دسته‌بندی Cate1 قرار دارند، تغییر دهیم:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">foreach (var product in _dvContext.Products.Where(category =&gt; category.Category == Category.Cate1))&#10;{&#10;     product.Price = 50000;&#10;     MyContext.SaveChanges();&#10;}</pre>
 </div>
خوب؛ اکنون اگر برنامه را اجرا کنیم با خطای زیر مواجه می‌شویم:</div> <div> <div align="left" dir="ltr">
<pre language="CSharp" name="code">There is already an open DataReader associated with this Command which must be closed first.</pre>
 </div>
این استثناء زمانی اتفاق می‌افتد که بر روی نتایج حاصل از یک کوئری، یک کوئری دیگر را ارسال کنیم. البته استثنای صادر شده بستگی به کوئری دوم شما دارد ولی در حالت کلی و با مشاهده Stack Trace، پیام فوق نمایش داده می‌شود. همانطور که در کد بالا ملاحظه می‌کنید درون حلقه‌ی forach ما به پراپرتی Price دسترسی پیدا کرده‌ایم، در حالیکه کوئری اصلی ما هنوز فعال (Active) است. MARS در اینجا به ما کمک می‌کند که بر روی یک Connection، بیشتر از یک کوئری فعال داشته باشیم. در حالت عادی Entity Framework Code First این ویژگی را به صورت پیش‌فرض برای ما فعال نمی‌کند. اما اگر خودمان کانکشن‌استرینگ را اصلاح کنیم، این ویژگی SQL SERVER فعال می‌گردد. برای حل این مشکل کافی است به کانکشن‌استرینگ، MultipleActiveResultSets=true را اضافه کنیم: </div> <div> <div align="left" dir="ltr">
<pre language="XML" name="code">"Data Source=(LocalDB)\v11.0;Initial Catalog=EnablingMARS; MultipleActiveResultSets=true"</pre>
 </div>
لازم به ذکر است که این قابلیت از نسخه SQL SERVER 2005 به بالا در دسترس می‌باشد. همچنین در هنگام استفاده از این قابلیت می‌بایستی موارد زیر را در نظر داشته باشید:</div> <div> <ul> <li> <span style="line-height: 1.5em; font-size: 9pt;">وقتی کانکشنی در حالت MARS برقرار می‌شود، یک سشن نیز همراه با یکسری اطلاعات اضافی برای آن ایجاد شده که باعث ایجاد Overhead خواهد شد.</span> <br/> </li> <li> <span style="line-height: 1.5em; font-size: 9pt;">دستورات مارس </span> <a href="http://stackoverflow.com/questions/261683/what-is-meant-by-thread-safe-code" style="line-height: 1.5em; font-size: 9pt;">thread-safe</a> <span style="line-height: 1.5em; font-size: 9pt;"> نیستند.</span> <br/> </li> </ul> </div></div>
