# ایجاد ایندکس منحصربفرد در EF Code first به صورت Fluent API

پیشتر در رابطه با ایجاد ایندکس منحصر به فرد در EF Code first مطالبی در سایت منتشر شده‌اند: « ایجاد ایندکس منحصربفرد در EF Code first » « ایندکس منحصر به فرد با استفاده از Data Annotation در EF Code Fi

- Published: 2015-07-07
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-2143

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/2143) منتشر شده است.

<div class="postBody">پیشتر در رابطه با ایجاد ایندکس منحصر به فرد در EF Code first مطالبی در سایت منتشر شده‌اند:<br/>
«<a href="https://www.dntips.ir/post/1021">ایجاد ایندکس منحصربفرد در EF Code first </a>»<br/> <div>«<a href="https://www.dntips.ir/post/1153">  ایندکس منحصر به فرد با استفاده از Data Annotation در EF Code First</a>» <br/>
«<a href="https://www.dntips.ir/post/1859">ایجاد ایندکس منحصربفرد بر روی چند فیلد با هم در EF Code first</a>»
                <br/> <a href="https://entityframework.codeplex.com/wikipage?title=IndexAttribute">و یا استفاده از ویژگی Index در EF 6.1 به بعد</a> <br/> </div> <div>در ادامه نحوه‌ی ایجاد آن را به صورت Fluent API بررسی خواهیم کرد:</div> <div>مدل زیر را در نظر بگیرید:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class SubCategory : BaseEntity&#10;{&#10;        public string Title { get; set; }&#10;        [ForeignKey("CategoryId")]&#10;        public virtual Category Category { get; set; }&#10;        public Guid CategoryId { get; set; }&#10;}</pre>
 </div>
برای مدل فوق می‌خواهیم بر روی فیلدهای Title و CategoryId ایندکسی را ایجاد کنیم، برای این منظور کلاس زیر را برای ایجاد ایندکس ایجاد خواهیم کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class SubCategoryConfiguration : EntityTypeConfiguration&lt;SubCategory&gt;&#10; {&#10;        public SubCategoryConfiguration()&#10;        {&#10;            Property(p =&gt; p.CategoryId).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("AK_SubCategory", 1){ IsUnique = true}));&#10;            Property(p =&gt; p.Title).HasMaxLength(30).IsRequired().HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("AK_SubCategory", 2){ IsUnique = true}));&#10;            Property(so =&gt; so.RowVersion).IsRowVersion();&#10;        }&#10;}</pre>
 </div> <br/> <div>همانطور که مشاهده می‌کنید اینکار را با استفاده از ویژگی IndexAttribute انجام داده‌ایم. تمامی تنظیمات یک ایندکس را توسط این کلاس می‌توانیم انجام دهیم؛ تنظیماتی از قبیل نام ایندکس، منحصر به فرد بودن ایندکس و... را می‌توانیم مشخص کنیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;"> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public virtual bool IsClustered { get; set; }&#10;public virtual int Order { get; set; }&#10;public virtual bool IsUnique { get; set; }</pre>
 </div> <br/> </div> </div>
در نهایت با استفاده از HasColumnAnnotation ویژگی Index را به پراپرتی Title اضافه کرده‌ایم. این متد دو پارامتر از ورودی دریافت می‌کند. پارامتر اول نام annotation می‌باشد که دقیقاً باید همنام با annotation‌های موجود باشد. پارامتر دوم نیز می‌تواند یک رشته و یا یک آبجکت باشد. در حالت دوم آبجکت‌ها باید قابلیت سریالایز شدن توسط اینترفیس <a href="https://msdn.microsoft.com/en-us/library/system.data.entity.infrastructure.imetadataannotationserializer(v=vs.113).aspx">IMetadataAnnotationSerializer</a> را داشته باشند. در کد فوق ایندکس را بر روی دو فیلد ایجاد کرده‌ایم. همچنین می‌توان بر روی یک فیلد نیز چندین ایندکس داشته باشید: </div> <div> <div align="left" dir="ltr" style="direction: ltr;"> </div> <div align="left" dir="ltr" style="direction: ltr;"> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">Property(p =&gt; p.Title).HasMaxLength(30).IsRequired().HasColumnAnnotation("Index", new IndexAnnotation(new[]&#10;{&#10;                            new IndexAttribute("AK_Category_1") { IsUnique = true}, &#10;                            new IndexAttribute("AK_Category_2"), &#10;}));</pre>
 </div> </div> </div></div>
