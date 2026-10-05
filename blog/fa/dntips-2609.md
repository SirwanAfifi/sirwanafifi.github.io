# C# 7 - More Expression-Bodied Members

یکی از امکانات جالب سی‌شارپ که در نسخه 6 معرفی شد، قابلیت Expression-Bodied Members بود. در نسخه 7 سی‌شارپ، امکانات جدیدتری اضافه شده است؛ به عنوان مثال اکنون می‌توان برای constructors, finalizers و ه

- Published: 2017-03-16
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-2609

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/2609) منتشر شده است.

<div class="postBody">یکی از امکانات جالب سی‌شارپ که در نسخه 6 معرفی شد، قابلیت <a href="/blog/fa/dntips-2240/">Expression-Bodied Members</a> بود. در نسخه 7 سی‌شارپ، امکانات جدیدتری اضافه شده است؛ به عنوان مثال اکنون می‌توان برای constructors, finalizers و همچنین get and set برای پراپرتی‌ها و ایندکسرها نیز از این قابلیت استفاده کرد.<div> <br/>
  <div> <b>استفاده از expression body برای constructors  </b> </div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class Person&#10;{&#10;    public string FirstName { get; set; }&#10;    public Person(string firstName)&#10;    {&#10;        this.FirstName = firstName;&#10;    }&#10;}</pre>
 </div>
به عنوان مثال اکنون سازنده‌ی کلاس فوق را می‌توانیم از روش block body متداول، به روش expression body، به صورت خلاصه‌تری بنویسیم: <div> <div align="left" dir="ltr" style="direction: ltr;"> </div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class Person&#10;{&#10;     public string FirstName { get; set; }&#10;     public Person(string firstName) =&gt; this.FirstName = firstName;&#10;}</pre>
 </div>
 البته محدودیت این روش این است که تنها برای یک پارامتر می‌توانیم به اینصورت عمل کنیم؛ اما در نسخه‌ <a href="https://github.com/dotnet/roslyn/issues/16869">7.1</a>  قرار است قابلیت استفاده از expression body برای بیشتر از یک پارامتر نیز اضافه شود: </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class Person&#10;{&#10;    public string Name { get; }&#10;    public int Age { get; }&#10;&#10;    public Person(string name, int age) =&gt; (Name, Age) = (name, age);&#10;}</pre>
 </div> <br/> </div> <div>اما اگر نیاز داشتید برای بیشتر از دو متغیر از expression body استفاده کنید می‌توانید از <a href="https://www.dntips.ir/post/2605">Tuple</a> برای شبیه‌سازی آن استفاده کنید(<a href="http://stackoverflow.com/a/41974164/1646540">+</a>):</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class Person&#10;{&#10;    private readonly (string name, int age) _tuple;    &#10;&#10;    public string Name =&gt; _tuple.name;&#10;    public int Age =&gt; _tuple.age;&#10;&#10;    public Person(string name, int age) =&gt; _tuple = (name, age);&#10;}</pre>
 </div> <br/> </div> <div> <div> <b>استفاده از expression body برای destructors  </b> </div> <div align="left" dir="ltr" style="direction: ltr;"> </div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">public class Resource&#10;{&#10;    ~Resource() =&gt; Console.WriteLine("destructor");&#10;}</pre>
 </div> <br/> <br/> <div> <b>  استفاده از expression body در get / set accessors  <br/> </b> </div> </div> <div> <b> </b>در سی‌شارپ 7 برای accessors نیز می‌توانیم از سینتکس جدید expression body استفاده کنیم. به عنوان مثال کد زیر را در نظر بگیرید:<br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">private int _x;&#10;public int X &#10;{&#10;    get&#10;    {&#10;        return _x;&#10;    }&#10;    set&#10;    {&#10;        _x = value;&#10;    }&#10;}</pre>
 </div>
کد فوق را می‌توانیم در سی‌شارپ 7 به صورت خلاصه‌تری بنویسیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">private int _x;&#10;public int X &#10;{&#10;    get =&gt; _x;&#10;    set =&gt; _x = value;&#10;}</pre>
 </div> <br/>
در ویژوال‌استودیوی 2017 نیز با قرار دادن ماوس بر روی پراپرتی x_، استفاده‌ی از سینتکس expression body به شما پیشنهاد داده خواهد شد:<br/> <br/> </div> <div> <p style="margin-left: auto; margin-right: auto;"> <img src="/img/dntips/343b6bb37884212830ac.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default; height: 382px;"/> </p> <p style="margin-left: auto; margin-right: auto;"> <br/> </p> <p style="margin-left: auto; margin-right: auto;">همچنین برای Event Accessors نیز می‌توانیم از این قابلیت استفاده کنیم:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">private EventHandler _someEvent;&#10;public event EventHandler SomeEvent&#10;{&#10;    add =&gt; _someEvent += value;&#10;    remove =&gt; _someEvent -= value;&#10;}</pre>
 </div> <p style="margin-left: auto; margin-right: auto;"> <br/> </p> </div> </div></div>
