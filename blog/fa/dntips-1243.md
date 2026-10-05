# نحوه استفاده از ViewModel در ASP.NET MVC

یک Model چیست؟ · قسمتی از Application است که Domain Logic را پیاده سازی می‌کند. · همچنین با عنوان Business Logic نیز شناخته می‌شود. · Domain Logic داده‌هایی را که بین UI و دیتابیس پاس داده می‌شود، مدی

- Published: 2013-03-03
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1243

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1243) منتشر شده است.

<div class="postBody"><p><b><span style='B Zar";'>یک </span><span dir="LTR" style='B Zar";'>Model</span><span dir="RTL"></span><span dir="RTL"></span><span style='B Zar";'><span dir="RTL"></span><span dir="RTL"></span> چیست؟</span></b></p><p>·<span style='Times New Roman"'>   
</span><span dir="RTL"></span><span style='B Zar";'>قسمتی از </span><span dir="LTR" style='B Zar";'>Application</span><span dir="RTL"></span><span dir="RTL"></span><span style='B Zar";'><span dir="RTL"></span><span dir="RTL"></span> است که </span><span dir="LTR" style='line-height:
115%;B Zar";'>Domain Logic</span><span dir="RTL"></span><span dir="RTL"></span><span style='B Zar";'><span dir="RTL"></span><span dir="RTL"></span> را پیاده سازی می‌کند.</span><span dir="LTR" style='B Zar";'></span></p><p>·<span style='Times New Roman"'>   
</span><span dir="RTL"></span><span style='B Zar";'>همچنین با عنوان </span><span dir="LTR" style='line-height:
115%;B Zar";'>Business Logic</span><span dir="RTL"></span><span dir="RTL"></span><span style='B Zar";'><span dir="RTL"></span><span dir="RTL"></span> نیز شناخته می‌شود.</span><span dir="LTR" style='B Zar";'></span></p><p>·<span style='Times New Roman"'>   
</span><span dir="RTL"></span><span dir="LTR" style='B Zar";'>Domain Logic</span><span dir="RTL"></span><span dir="RTL"></span><span style='B Zar";'><span dir="RTL"></span><span dir="RTL"></span> داده‌هایی را که بین </span><span dir="LTR" style='B Zar";'>UI</span><span dir="RTL"></span><span dir="RTL"></span><span style='B Zar";'><span dir="RTL"></span><span dir="RTL"></span> و دیتابیس پاس
داده می‌شود، مدیریت می‌کند.</span><span dir="LTR" style='B Zar";'></span></p><p>·<span style='Times New Roman"'>   
</span><span dir="RTL"></span><span style='B Zar";'>برای مثال، در یک سیستم انبار،</span><span dir="LTR" style='B Zar";'>Model </span><span dir="RTL"></span><span dir="RTL"></span><span style='B Zar";'><span dir="RTL"></span><span dir="RTL"></span>  کارش ذخیره سازی اقلام در
حافظه و </span><span dir="LTR" style='B Zar";'>Logic</span><span dir="RTL"></span><span dir="RTL"></span><span style='B Zar";'><span dir="RTL"></span><span dir="RTL"></span> تعیین
کننده موجود بودن یک آیتم در انبار میباشد.</span><span dir="LTR" style='B Zar";'></span></p><p><b><span style='B Zar";'><br/></span></b></p><p><b><span style='B Zar";'>یک </span><span dir="LTR" style='B Zar";'>ViewModel</span><span dir="RTL"></span><span dir="RTL"></span><span style='B Zar";'><span dir="RTL"></span><span dir="RTL"></span> چیست؟</span></b></p><p>·<span style='Times New Roman"'>   
</span><span dir="RTL"></span><span dir="LTR" style='B Zar";'>ViewModel</span><span dir="RTL"></span><span dir="RTL"></span><span style='B Zar";'><span dir="RTL"></span><span dir="RTL"></span> به ما این
امکان را میدهد تا از چندین </span><span dir="LTR" style='B Zar";'>Entity</span><span dir="RTL"></span><span dir="RTL"></span><span style='B Zar";'><span dir="RTL"></span><span dir="RTL"></span>، یک شیء واحد بسازیم.</span><span dir="LTR" style='B Zar";'></span></p><p>·<span style='Times New Roman"'>   
</span><span dir="RTL"></span><span style='B Zar";'>بهینه شده برای استفاده و رندر توسط یک </span><span dir="LTR" style='B Zar";'>View</span></p>
 
<img src="/img/dntips/544d83b67e45b3902977.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/><br/><b><br/>
چرا باید از ViewModel استفاده کنیم؟</b><br/>
   • اگر شما بخواهید چندین Model را به یک View پاس دهید، استفاده از ViewModel ایده بسیار خوبی است.<br/>
  • همچنین امکان Validate کردن ViewModel را به روشی متفاوت‌تر از Domain Model برای سناریوهای اعتبارسنجی attribute-based را در اختیارمان قرار میدهد.<br/>
  • برای قالبندی داده‌ها نیز استفاده میشود.<br/>
        o برای مثال به یک داده یا مقدار پولی قالبندی شده به یک روش خاص نیاز داریم؟<br/>
     ViewModel بهترین مکان برای انجام این کار است.<br/>
  • استفاده از ViewModel تعامل بین Model و View را ساده‌تر می‌کند.  
<br/><p><img src="/img/dntips/6d80a14d4b207486f7dc.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/></p><p><b><br/></b></p><p><b>مکان قرارگیری ViewModel در پروژه بهتر است کجا باشد؟</b><br/></p><ol><li>می‌تواند در یک پوشه با نام ViewModel در ریشه پروژه باشد.<br/><p><img src="/img/dntips/c04342a8d72866473686.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/></p></li><li>به صورت یک dll ارجاع داده شده به پروژه. </li><li>در یک پروژه جدا به عنوان یک Service Layer.</li></ol><p><b><br/></b></p><p><b>Best Practice هایی در زمان استفاده از ViewModelها </b></p><ol><li>داده‌هایی را که قرار است در View رندر شوند، داخل ViewModel قرار دهید.</li><li>
View باید خصوصیاتی را که نیاز دارد، مستقیما از ViewModel بدست بیاورد.</li><li>
وقتی که ViewModel شما پیچیده‌تر می‌شود، بهتر است از یک Mapper استفاده کنید.</li></ol><hr/>اجازه دهید مثالی را در این رابطه براتون بیارم :<br/><p>
در یک View می‌خواهیم هم لیست اخبار سایت و هم لیست سخنرانان سایت (مثال مربوط به یک پروژه برای همایش است) را نمایش دهیم. خوب طبق مطالب فوق استفاده از ViewModel بهترین راه حل است. ViewModel مربوطه به صورت زیر تعریف شده است :</p><div align="left" dir="ltr">
<pre language="CSharp" name="code">public class SpeakerAndNewsViewModel&#10;    {&#10;        public IEnumerable&lt;News&gt; News { get; set; }&#10;        public IEnumerable&lt;Speaker&gt; Speakers { get; set; }&#10;    }</pre>
</div>
و در اکشن متد Index هم بدین صورت Model‌ها را به ViewModel ساخته شده پاس می‌دهیم :<br/><div align="left" dir="ltr">
<pre language="CSharp" name="code">public ActionResult Index()&#10;        {&#10;            var news = db.News.OrderBy(r=&gt;r.Date)&#10;                        .Take(3);&#10;            var speakers = db.Speakers.Take(4);&#10;            var model = new SpeakerAndNewsViewModel { &#10;                News=news,&#10;                Speakers=speakers&#10;            };&#10;            return View(model);&#10;        }</pre>
</div>
و یک View را به صورت Strongly Typed از نوع ViewModel خود که در اینجا SpeakerAndNewsViewModel  است ایجاد می‌کنیم :<br/><br/><p><img src="/img/dntips/3f3393a1c4f493121cf1.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/></p>
و View مربوطه را به شکل زیر تغییر می‌دهیم :  
<br/><div align="left" dir="ltr"><div align="left" dir="ltr">
<pre language="CSharp" name="code">@model  Project.Models.SpeakerAndNewsViewModel&#10;@{&#10;    ViewBag.Title = "Home Page";&#10;}&#10;@section news&#10;{&#10;@foreach (var item in Model.News)&#10;{&#10;    //..&#10;}&#10;}&#10;@section speakers&#10;{&#10;@foreach (var item in Model.Speakers)&#10;{&#10;    //...&#10;}&#10;}</pre>
</div></div></div>
