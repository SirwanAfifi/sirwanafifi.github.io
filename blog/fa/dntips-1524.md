# ساخت منوهای چند سطحی در ASP.NET MVC

پیش نیاز مطلب جاری مطالب زیر می‌باشند: 1- EF Code First #8 2- مباحث تکمیلی مدل‌های خود ارجاع دهنده در EF Code First 3- نگاهی به اجزای تعاملی Twitter Bootstrap هدف از مطلب جاری نحوه نمایش منوی‌های چند 

- Published: 2013-10-11
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1524

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1524) منتشر شده است.

<div class="postBody">پیش نیاز مطلب جاری مطالب زیر می‌باشند:<br/>
1- <a href="https://www.dntips.ir/post/838">EF Code First #8</a> <br/>
2- <a href="https://www.dntips.ir/post/977">مباحث تکمیلی مدل‌های خود ارجاع دهنده در EF Code First </a> <br/>
3- <a href="https://www.dntips.ir/post/1366">نگاهی به اجزای تعاملی Twitter Bootstrap</a>    <br/> <br/>
هدف از مطلب جاری نحوه نمایش منوی‌های چند سطحی می‌باشد، ابتدا مثال کامل زیر را در نظر بگیرید :<br/> <div align="left" dir="ltr"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">using System;&#10;using System.Collections.Generic;&#10;using System.Linq;&#10;using System.Text;&#10;&#10;namespace Menu.Models.Entities&#10;{&#10;    public class Category&#10;    {&#10;        public int Id { get; set; }&#10;        public string Name { get; set; }&#10;        public int? ParentId { get; set; }&#10;        public virtual Category Parent { get; set; }&#10;        public virtual ICollection&lt;Category&gt; Children { get; set; }&#10;    }&#10;}&#10;&#10;public class MyContext : DbContext&#10;{&#10;        public DbSet&lt;Category&gt; Category { get; set; }&#10; &#10;        protected override void OnModelCreating(DbModelBuilder modelBuilder)&#10;        {&#10;            // Self Referencing Entity&#10;            modelBuilder.Entity&lt;Category&gt;()&#10;                        .HasOptional(x =&gt; x.Parent)&#10;                        .WithMany(x =&gt; x.Children)&#10;                        .HasForeignKey(x =&gt; x.ParentId)&#10;                        .WillCascadeOnDelete(false);&#10; &#10;            base.OnModelCreating(modelBuilder);&#10;        }&#10;}</pre>
 </div> <br/> </div>
 همانطور که ملاحظه می‌کنید، مدل ما شامل مشخصات گروه محصولات می‌باشد که به صورت خود ارجاع دهنده (خاصیت Parent به همین کلاس اشاره میکند) تعریف شده است. در مورد خواص مدل‌های خود ارجاع دهنده، مطالبی را در سایت مطالعه کردید (خواص مربوط در مطالب گفته شده دقیقاً به همان صورت می‌باشد و نیازی به توضیح اضافه‌تری نیست).<br/>
هدف از این بحث، نحوه نمایش گروه محصولات داخل منو به صورت چند سطحی می‌باشد، جهت نمایش می‌بایست از تکنیک recursive function استفاده کنید، ابتدا در نظر داشته باشید که ساختار منوی تشکیل شده می‌بایست بدین صورت باشد :<br/>
 
  <br/> <p> <img alt="" src="/img/dntips/69755fc6282188d17f6a.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/> </p> <p>این حالت می‌تواند تا n سطح پیش برود، حال نحوه نمایش در View مربوطه باید به صورت زیر باشد :<br/> </p> <div align="left" dir="ltr"> <div align="left" dir="ltr"> <div align="left" dir="ltr"> <div align="left" dir="ltr">
<pre language="CSharp" name="code">@using Menu.Helper&#10;@model IEnumerable&lt;.Models.Entities.Category&gt;&#10;@ShowTree(Model)&#10; &#10;@helper ShowTree(IEnumerable&lt;Menu.Models.Entities.Category&gt; categories)&#10;{&#10;    foreach (var item in categories)&#10;    {&#10;    &lt;li class="@(item.Children.Any() ? "dropdown-submenu" : "")"&gt;&#10; &#10;        @Html.ActionLink(item.Name, actionName: "Category", controllerName: "Product", routeValues: new { Id = item.Id, productName = item.Name.ToSeoUrl() }, htmlAttributes: null)&#10;        @if (item.Children.Any())&#10;        {&#10;            &lt;ul&gt;&#10;                @ShowTree(item.Children)&#10;            &lt;/ul&gt;&#10;                }&#10;    &lt;/li&gt;&#10; &#10;        }&#10;}</pre>
 </div> </div> </div> </div>
 توجه داشته باشید که رندر نهایی توسط Bootstrap انجام شده است. ساختار منو همانطور که ملاحظه می‌کنید با استفاده از کلاس‌های drop-down که از کلاس‌های پیش فرض بوت استرپ می‌باشد تشکیل شده است همچنین کلاس dropdown-submenu که از نسخه 2 به بعد بوت استرپ موجود می‌باشد، استفاده شده است. <br/> <br/> <b>
یک نکته :</b> <br/>
در خط 9 این مورد را که آیا آیتم جاری فرزندی دارد چک کرده ایم اگر داشته باشد کلاس dropdown-submenu  را به li جاری اضافه میکند.<br/></div>
