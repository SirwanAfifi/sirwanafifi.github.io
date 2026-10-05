# نکات کار با استثناءها در دات نت

استثناء چیست؟ واژه‌ی استثناء یا exception کوتاه شده‌ی عبارت exceptional event است. در واقع exception یک نوع رویداد است که در طول اجرای برنامه رخ می‌دهد و در نتیجه، جریان عادی برنامه را مختل می‌کند. زم

- Published: 2015-03-20
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-2044

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/2044) منتشر شده است.

<div class="postBody"><b>استثناء چیست؟</b> <br/>
واژه‌ی استثناء یا exception کوتاه شده‌ی عبارت exceptional event است. در واقع
 exception یک نوع رویداد است که در طول اجرای برنامه رخ می‌دهد و در نتیجه،
جریان عادی برنامه را مختل می‌کند. زمانیکه خطایی درون یک متد رخ دهد، یک
شیء (exception object) حاوی اطلاعاتی درباره‌ی خطا ایجاد خواهد شد. به
فرآیند ایجاد یک exception object و تحویل دادن آن به سیستم runtime،
اصطلاحاً throwing an exception یا صدور استثناء گفته می‌شود که در ادامه
به آن خواهیم پرداخت.<br/>
بعد از اینکه یک متد استثناءایی را صادر می‌کند، سیستم runtime سعی در یافتن روشی برای مدیریت آن خواهد کرد.<br/>
خوب اکنون که با مفهوم استثناء آشنا شدید اجازه دهید دو سناریو را با هم بررسی کنیم.<br/>
- سناریوی اول:<br/>
فرض کنید یک فایل XML از پیش تعریف شده (برای مثال یک لیست از محصولات)
قرار است در کنار برنامه‌ی شما باشد و باید این لیست را درون برنامه‌ی خود
نمایش دهید. در این حالت برای خواندن این فایل انتظار دارید که فایل وجود
داشته باشد. اگر این فایل وجود نداشته باشد برنامه‌ی شما با اشکال روبرو
خواهد شد.<br/>
- سناریوی دوم:<br/>
فرض کنید یک فایل XML از آخرین محصولات مشاهده شده توسط کاربران را به صورت
 cache در برنامه‌تان دارید. در این حالت در اولین بار اجرای برنامه توسط
کاربر انتظار داریم که این فایل موجود نباشد و اگر فایل وجود نداشته باشد به
سادگی می‌توانیم فایل مربوط را ایجاده کرده و محصولاتی را که توسط کاربر
مشاهده شده، درون این فایل اضافه کنیم.<br/>
در واقع استثناء‌ها بستگی به حالت‌های مختلفی دارد. در مثال اول وجود فایل
حیاتی است ولی در حالت دوم بدون وجود فایل نیز برنامه می‌تواند به کار خود
ادامه داده و فایل مورد نظر را از نو ایجاد کند.<br/>
 استثناها مربوط به زمانی هستند که این احتمال وجود داشته باشد که برنامه طبق انتظار پیش نرود. <br/>
برای حالت اول کد زیر را داریم:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public IEnumerable&lt;Product&gt; GetProducts()&#10;{&#10;    using (var stream = File.Read(Path.Combine(Environment.CurrentDirectory, "products.xml")))&#10;    {&#10;        var serializer = new XmlSerializer();&#10;        return (IEnumerable&lt;Product&gt;)serializer.Deserialize(stream);&#10;    }&#10;}</pre>
 </div>
همانطور که عنوان شد در حالت اول انتظار داریم که فایلی بر روی دیسک موجود باشد. در نتیجه نیازی نیست هیچ استثناءایی را مدیریت کنیم (زیرا در واقع اگر
فایل موجود نباشد هیچ روشی برای ایجاد آن نداریم).<br/>
در مثال دوم می‌دانیم که ممکن است فایل از قبل موجود نباشد. بنابراین می‌توانیم موجود بودن فایل را با یک شرط بررسی کنیم:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public IEnumerable&lt;Product&gt; GetCachedProducts()&#10;{&#10;    var fullPath = Path.Combine(Environment.CurrentDirectory, "ProductCache.xml");&#10;    if (!File.Exists(fullPath))&#10;        return new Product[0];&#10;         &#10;    using (var stream = File.Read(fullPath))&#10;    {&#10;        var serializer = new XmlSerializer();&#10;        return (IEnumerable&lt;Product&gt;)serializer.Deserialize(stream);&#10;    }&#10;}</pre>
 </div> <br/> <b>چه زمانی باید استثناءها را مدیریت کنیم؟</b> <br/>
زمانیکه بتوان متدهایی که خروجی مورد انتظار را بر می‌گردانند ایجاد کرد.  <br/>
اجازه دهید دوباره از مثال‌های فوق استفاده کنیم:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">IEnumerable&lt;Product&gt; GetProducts()</pre>
 </div>
همانطور که از نام آن پیداست این متد باید همیشه لیستی از محصولات را
برگرداند. اگر می‌توانید اینکار را با استفاده از catch کردن یک استثنا
انجام دهید در غیر اینصورت نباید درون متد اینکار را انجام داد.<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">IEnumerable&lt;Product&gt; GetCachedProducts()</pre>
 </div>
در متد فوق می‌توانستیم از FileNotFoundException برای فایل موردنظر استفاده کنیم؛ اما مطمئن بودیم که فایل در ابتدا وجود ندارد.<br/>
در واقع استثنا‌ها حالت‌هایی هستند که غیرقابل پیش‌بینی هستند. این حالت‌ها
 می‌توانند یک خطای منطقی از طرف برنامه‌نویس و یا چیزی خارج کنترل
برنامه‌نویس باشند (مانند خطاهای سیستم‌عامل، شبکه، دیسک). یعنی در بیشتر
مواقع این نوع خطاها را نمی‌توان مدیریت کرد.<br/> <br/> <b>اگر می‌خواهید استثناء‌ها را catch کرده و آنها را لاگ کنید</b> <b> در بالاترین لایه اینکار را انجام دهید.</b> <br/> <br/> <br/> <b>چه استثناءهایی باید مدیریت شوند و کدام‌ها خیر؟</b>    <br/>
مدیریت صحیح استثناء‌ها می‌تواند خیلی مفید باشد. همانطور که عنوان شد یک
استثناء زمانی رخ می‌دهد که یک حالت استثناء در برنامه اتفاق بیفتد. این
مورد را بخاطر داشته باشید، زیرا به شما یادآوری می‌کند که در همه جا نیازی
به استفاده از try/catch نیست. در اینجا ذکر این نکته خیلی مهم است:<br/>
تنها استثناء‌هایی را catch کنید که بتوانید برای آن راه‌حلی ارائه دهید.<br/>
به عنوان مثال اگر در لایه‌ی دسترسی به داده، خطایی رخ دهد و استثناءی
SqlException صادر شود، می‌توانیم آن را catch کرده و درون یک استثناء
عمومی‌تر قرار دهیم:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public class UserRepository : IUserRepository&#10;{&#10;    public IList&lt;User&gt; Search(string value)&#10;    {&#10;        try&#10;        {&#10;              return CreateConnectionAndACommandAndReturnAList("WHERE value=@value", Parameter.New("value", value));&#10;        }&#10;        catch (SqlException err)&#10;        {&#10;             var msg = String.Format("Ohh no!  Failed to search after users with '{0}' as search string", value);&#10;             throw new DataSourceException(msg, err);&#10;        }&#10;    }&#10;}</pre>
 </div>
همانطور که در کد فوق مشاهده می‌کنید به محض صدور استثنای SqlException آن
را درون قسمت catch به صورت یک استثنای عمومی‌تر همراه با افزودن یک سری
اطلاعات جدید صادر می‌کنیم. اما همانطور که عنوان شد کار لاگ کردن
استثناءها را بهتر است در لایه‌های بالاتر انجام دهیم.  <br/>
اگر مطمئن نیستید که تمام استثناء‌ها توسط شما مدیریت شده‌اند، می‌توانید در حالت‌های زیر، دیگر استثناءها را مدیریت کنید:<br/>
ASP.NET: می‌توانید Aplication_Error را پیاده‌سازی کنید.  در اینجا فرصت خواهید داشت تا تمامی خطاهای مدیریت نشده را هندل کنید.<br/>
WinForms: استفاده از رویدادهای Application.ThreadException و AppDomain.CurrentDomain.UnhandledException   <br/>
WCF: پیاده‌سازی اینترفیس IErrorHandler    <br/>
ASMX: ایجاد یک <a href="http://www.codeproject.com/Articles/10605/Exception-Handling-SOAP-Extension">Soap Extension</a>  سفارشی<br/> <a href="http://www.asp.net/web-api/overview/error-handling/exception-handling">ASP.NET WebAPI</a> <br/> <br/> <br/> <b>  چه زمان‌هایی باید یک استثناء صادر شود؟    </b> <br/>
صادر کردن یک استثناء به تنهایی کار ساده‌ایی است. تنها کافی است throw را
همراه شیء exception (exception object) فراخوانی کنیم. اما سوال اینجاست
که چه زمانی باید یک استثناء را صادر کنیم؟ چه داده‌هایی را باید به استثناء
اضافه کنیم؟ در ادامه به این سوالات خواهیم پرداخت.<br/>
همانطور که عنوان گردید استثناءها زمانی باید صادر شوند که یک استثناء اتفاق بیفتد.<br/> <br/> <b>اعتبارسنجی آرگومان‌ها</b> <br/>
ساده‌ترین مثال، آرگومان‌های مورد انتظار یک متد است:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public void PrintName(string name)&#10;{&#10;     Console.WriteLine(name);&#10;}</pre>
 </div>
در حالت فوق انتظار داریم مقداری برای پارامتر name تعیین شود. متد فوق با
آرگومان null نیز به خوبی کار خواهد کرد؛ یعنی مقدار خروجی یک خط خالی خواهد
 بود. از لحاظ کدنویسی متد فوق به خوبی کار خود را انجام می‌دهد اما خروجی
مورد انتظار کاربر نمایش داده نمی‌شود. در این حالت نمی‌توانیم تشخیص دهیم
مشکل از کجا ناشی می‌شود.<br/>
مشکل فوق را می‌توانیم با صدور استثنای ArgumentNullException رفع کنیم:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public void PrintName(string name)&#10;{&#10;    if (name == null) throw new ArgumentNullException("name");&#10;     &#10;     Console.WriteLine(name);&#10;}</pre>
 </div>
خوب، name باید دارای طول ثابت و همچنین ممکن است حاوی عدد و حروف باشد:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public void PrintName(string name)&#10;{&#10;    if (name == null) throw new ArgumentNullException("name");&#10;    if (name.Length &lt; 5 || name.Length &gt; 10) throw new ArgumentOutOfRangeException("name", name, "Name must be between 5 or 10 characters long");&#10;    if (name.Any(x =&gt; !char.IsAlphaNumeric(x)) throw new ArgumentOutOfRangeException("name", name, "May only contain alpha numerics");&#10;     &#10;     Console.WriteLine(name);&#10;}</pre>
 </div>
برای حالت فوق و همچنین جلوگیری از تکرار کدهای داخل متد PrintName می‌توانید یک متد Validator برای کلاسی با نام Person ایجاد کنید.<br/>
حالت دیگر صدور استثناء، زمانی است که متدی خروجی مورد انتظارمان را نتواند تحویل دهد. یک مثال بحث‌برانگیز متدی با امضای زیر است:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public User GetUser(int id)&#10;{&#10;}</pre>
 </div>
کاملاً مشخص است که متدی همانند متد فوق زمانیکه کاربری را پیدا نکند، مقدار
null را برمی‌گرداند. اما این روش درستی است؟ خیر؛ زیرا همانطور که از نام
این متد پیداست باید یک کاربر به عنوان خروجی برگردانده شود.<br/>
با استفاده از بررسی null کدهایی شبیه به این را در همه جا خواهیم داشت:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">var user = datasource.GetUser(userId);&#10;if (user == null)&#10;    throw new InvalidOperationException("Failed to find user: " + userId);&#10;// actual logic here</pre>
 </div>
به این چنین کدهایی معمولاً The null cancer گفته می‌شود (سرطان نال!) زیرا اجازه
داده‌ایم متد، خروجی null را بازگشت دهد. به جای کد فوق می‌توانیم از این
روش استفاده کنیم:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public User GetUser(int id)&#10;{&#10;    if (id &lt;= 0) throw new ArgumentOutOfRangeException("id", id, "Valid ids are from 1 and above. Do you have a parsing error somewhere?");&#10;    &#10;    var user = db.Execute&lt;User&gt;("WHERE Id = ?", id);&#10;    if (user == null)&#10;        throw new EntityNotFoundException("Failed to find user with id " + id);&#10;        &#10;    return user;&#10;}</pre>
 </div>
نکته‌ایی که باید به آن توجه کنید این است که در هنگام صدور یک استثناء
اطلاعات کافی را نیز به آن پاس دهید. به عنوان مثال در
EntityNotFoundException مثال فوق پاس دادن "Failed to find user with id " + id کار دیباگ را برای مصرف کننده، راحتر خواهد کرد.<br/> <br/> <b> <br/>
خطاهای متداول حین کار با استثناءها   </b> <br/> <br/> <ul> <li> صدور مجدد استثناء و از بین بردن stacktrace</li> </ul> <p>کد زیر را در نظر بگیرید:</p> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">try&#10;{&#10;    FutileAttemptToResist();&#10;}&#10;catch (BorgException err)&#10;{&#10;     _myDearLog.Error("I'm in da cube! Ohh no!", err);&#10;    throw err;&#10;}</pre>
 </div>
مشکل کد فوق قسمت throw err است. این خط کد، محتویات stacktrace را از بین برده و استثناء را مجدداً برای شما ایجاد خواهد کرد. در این حالت هرگز نمی‌توانیم تشخیص دهیم که منبع خطا از کجا آمده است. در این حالت پیشنهاد می‌شود که تنها از throw استفاده شود. در این حالت استثناء اصلی مجدداً صادر گردیده و مانع حذف شدن محتویات stacktrace خواهد شد(<a href="http://stackoverflow.com/questions/2999298/difference-between-throw-and-throw-new-exception">+</a>).<br/> <ul> <li> اضافه نکردن اطلاعات استثناء اصلی به استثناء جدید</li> </ul> <p>یکی دیگر از خطاهای رایج اضافه نکردن استثناء اصلی حین صدور استثناء جدید است:</p> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">try&#10;{&#10;    GreaseTinMan();&#10;}&#10;catch (InvalidOperationException err)&#10;{&#10;    throw new TooScaredLion("The Lion was not in the m00d", err); //&lt;---- استثناء اصلی بهتر است به استثناء جدید پاس داده شود&#10;}</pre>
 </div> <ul> <li> <b>ارائه ندادن context information</b> </li> </ul> <p>در هنگام صدور یک استثناء بهتر است اطلاعات دقیقی را به آن ارسال کنیم تا دیباگ کردن آن به راحتی انجام شود. به عنوان مثال کد زیر را در نظر داشته باشید:</p> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">try&#10;{&#10;   socket.Connect("somethingawful.com", 80);&#10;}&#10;catch (SocketException err)&#10;{&#10;    throw new InvalidOperationException("Socket failed", err);  &#10;}</pre>
 </div>
هنگامی که کد فوق با خطا مواجه شود نمی‌توان تنها با متن Socket failed تشخیص داد که مشکل از چه چیزی است. بنابراین پیشنهاد می‌شود اطلاعات کامل و در صورت امکان به صورت دقیق را به استثناء ارسال کنید. به عنوان مثال در کد زیر سعی شده است تا حد امکان context information کاملی برای استثناء ارائه شود:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">void IncreaseStatusForUser(int userId, int newStatus)&#10;{&#10;    try&#10;    {&#10;         var user  = _repository.Get(userId);&#10;         if (user == null)&#10;             throw new UpdateException(string.Format("Failed to find user #{0} when trying to increase status to {1}", userId, newStatus));&#10;    &#10;         user.Status = newStatus;&#10;         _repository.Save(user);&#10;    }&#10;   catch (DataSourceException err)&#10;   {&#10;       var errMsg = string.Format("Failed to find modify user #{0} when trying to increase status to {1}", userId, newStatus);&#10;        throw new UpdateException(errMsg, err);&#10;   }</pre>
 </div> <br/> <b>
نحوه‌ی طراحی استثناءها    </b> <br/>
برای ایجاد یک استثناء سفارشی می‌توانید از کلاس Exception ارث‌بری کنید و چهار سازنده‌ی آن را اضافه کنید:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public NewException()&#10;public NewException(string description )&#10;public NewException(string description, Exception inner)&#10;protected or private NewException(SerializationInfo info, StreamingContext context)</pre>
 </div>
سازنده اول به عنوان default constructor شناخته می‌شود. اما پیشنهاد می‌شود که از آن استفاده نکنید، زیرا یک استثناء بدون context information از ارزش کمی برخوردار خواهد بود.<br/>
سازنده‌ی دوم برای تعیین description بوده و همانطور که عنوان شد ارائه دادن context information از اهمیت بالایی برخوردار است. به عنوان مثال فرض کنید استثناء KeyNotFoundException که توسط کلاس Dictionary صادر شده است را دریافت کرده‌اید. این استثناء زمانی صادر خواهد شد که بخواهید به عنصری که درون دیکشنری پیدا نشده است دسترسی داشته باشید. در این حالت پیام زیر را دریافت خواهید کرد:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">“The given key was not present in the dictionary.”</pre>
 </div>
حالا فرض کنید اگر پیام به صورت زیر باشد چقدر باعث خوانایی و عیب‌یابی ساده‌تر خطا خواهد شد:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">“The key ‘abrakadabra’ was not present in the dictionary.”</pre>
 </div> <b>در نتیجه تا حد امکان سعی کنید که context information شما کاملتر باشد.</b> <br/>
سازنده‌ی سوم شبیه به سازنده‌ی قبلی عمل می‌کند با این تفاوت که توسط پارامتر دوم می‌توانیم یک استثناء دیگر را catch کرده یک استثناء جدید صادر کنیم.<br/>
سازنده‌ی سوم زمانی مورد استفاده قرار می‌گیرد که بخواهید از Serialization پشتیبانی کنید (به عنوان مثال ذخیره‌ی استثناءها درون فایل و...)<br/> <br/>
خوب، برای یک استثناء سفارشی حداقل باید کدهای زیر را داشته باشیم:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public class SampleException : Exception&#10;{&#10;    public SampleException(string description)&#10;        : base(description)&#10;    {&#10;        if (description == null) throw new ArgumentNullException("description");&#10;    }&#10; &#10;    public SampleException(string description, Exception inner)&#10;        : base(description, inner)&#10;    {&#10;        if (description == null) throw new ArgumentNullException("description");&#10;        if (inner == null) throw new ArgumentNullException("inner");&#10;    }&#10; &#10;    public SampleException(SerializationInfo info, StreamingContext context)&#10;        : base(info, context)&#10;    {&#10;    }&#10;}</pre>
 </div> <br/> <b>اجباری کردن ارائه‌ی Context information:</b> <br/>
برای اجباری کردن context information کافی است یک فیلد اجباری درون سازنده تعریف کنیم. برای مثال اگر بخواهیم کاربر HTTP status code را برای استثناء ارائه دهد باید سازنده‌ها را اینگونه تعریف کنیم:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public class HttpException : Exception&#10;{&#10;    System.Net.HttpStatusCode _statusCode;&#10;     &#10;    public HttpException(System.Net.HttpStatusCode statusCode, string description)&#10;        : base(description)&#10;    {&#10;        if (description == null) throw new ArgumentNullException("description");&#10;        _statusCode = statusCode;&#10;    }&#10; &#10;    public HttpException(System.Net.HttpStatusCode statusCode, string description, Exception inner)&#10;        : base(description, inner)&#10;    {&#10;        if (description == null) throw new ArgumentNullException("description");&#10;        if (inner == null) throw new ArgumentNullException("inner");&#10;        _statusCode = statusCode;&#10;    }&#10; &#10;    public HttpException(SerializationInfo info, StreamingContext context)&#10;        : base(info, context)&#10;    {&#10;    }&#10;     &#10;    public System.Net.HttpStatusCode StatusCode { get; private set; }&#10; &#10;}</pre>
 </div>
همچنین بهتر است پراپرتی Message را برای نمایش پیام مناسب بازنویسی کنید:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public override string Message&#10;{&#10;        get { return base.Message + "\r\nStatus code: " + StatusCode; }&#10;}</pre>
 </div>
مورد دیگری که باید در کد فوق مد نظر داشت این است که status code قابلیت سریالایز شدن را ندارد. بنابراین باید متد GetObjectData را برای سریالایز کردن بازنویسی کنیم:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">public class HttpException : Exception&#10;{&#10;    // [...]&#10; &#10;    public HttpException(SerializationInfo info, StreamingContext context)&#10;        : base(info, context)&#10;    {&#10;        // this is new&#10;        StatusCode = (HttpStatusCode) info.GetInt32("HttpStatusCode");&#10;    }&#10; &#10;    public HttpStatusCode StatusCode { get; private set; }&#10; &#10;    public override string Message&#10;    {&#10;        get { return base.Message + "\r\nStatus code: " + StatusCode; }&#10;    }&#10; &#10;    // this is new&#10;    public override void GetObjectData(SerializationInfo info, StreamingContext context)&#10;    {&#10;        base.GetObjectData(info, context);&#10;        info.AddValue("HttpStatusCode", (int) StatusCode);&#10;    }&#10;}</pre>
 </div>
در اینحالت فیلدهای اضافی در طول فرآیند Serialization به خوبی سریالایز خواهند شد.<br/> <b> <br/> </b>در حین صدور استثناءها همیشه باید در نظر داشته باشیم که چه نوع context information را می‌توان ارائه داد، این مورد در یافتن راه‌حل خیلی کمک خواهد کرد.<br/> <br/> <br/> <b>
طراحی پیام‌های مناسب  </b> <br/>
پیام‌های exception مختص به توسعه‌دهندگان است نه کاربران نهایی.<br/>
نوشتن این نوع پیام‌ها برای برنامه‌نویس کار خسته‌کننده‌ایی است. برای مثال دو مورد زیر را در نظر داشته باشید:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">throw new Exception("Unknown FaileType");&#10;throw new Exception("Unecpected workingDirectory");</pre>
 </div>
این نوع پیام‌ها حتی اگر از لحاظ نوشتاری مشکلی نداشته باشند یافتن راه‌حل را خیلی سخت خواهند کرد. اگر در زمان برنامه‌نویسی با این نوع خطاها روبرو شوید ممکن است با استفاده از debugger ورودی نامعتبر را پیدا کنید. اما در یک برنامه و خارج از محیط برنامه‌نویسی، یافتن علت بروز خطا خیلی سخت خواهد بود.<br/>
توسعه‌دهندگانی که exception message را در اولویت قرار می‌دهند، معتقد هستند که از لحاظ تجربه‌ی کاربری پیام‌ها تا حد امکان باید فاقد اطلاعات فنی باشد. همچنین همانطور که پیش‌تر عنوان گردید این نوع پیام‌ها همیشه باید در بالاترین سطح نمایش داده شوند نه در لایه‌های زیرین. همچنین پیام‌هایی مانند Unknown FaileType نه برای کاربر نهایی، بلکه برای برنامه‌نویس نیز ارزش چندانی ندارد زیرا فاقد اطلاعات کافی برای یافتن مشکل است.<br/>
در طراحی پیام‌ها باید موارد زیر را در نظر داشته باشیم:<br/>
- امنیت:<br/>
یکی از مواردی که از اهمیت بالایی برخوردار است مسئله امنیت است از این جهت که پیام‌ها باید فاقد مقادیر runtime باشند. زیرا ممکن است اطلاعاتی را در خصوص نحوه‌ی عملکرد سیستم آشکار سازند.<br/>
- زبان:<br/>
همانطور که عنوان گردید پیام‌های استثناء برای کاربران نهایی نیستند، زیرا کاربران نهایی ممکن است اشخاص فنی نباشند، یا ممکن است زبان آنها انگلیسی نباشد. اگر مخاطبین شما آلمانی باشند چطور؟ آیا تمامی پیام‌ها را با زبان آلمانی خواهید نوشت؟ اگر هم اینکار را انجام دهید تکلیف استثناء‌هایی که توسط Base Class Library و دیگر کتابخانه‌های thirt-party صادر می‌شوند چیست؟ اینها انگلیسی هستند.<br/> <br/>
در تمامی حالت‌هایی که عنوان شد فرض بر این است که شما در حال نوشتن این نوع پیام‌ها برای یک سیستم خاص هستید. اما اگر هدف نوشتن یک کتابخانه باشد چطور؟ در این حالت نمی‌دانید که کتابخانه‌ی شما در کجا استفاده می‌شود. <br/>
اگر هدف نوشتن یک کتابخانه نباشد این نوع پیام‌هایی که برای کاربران نهایی باشند، وابستگی‌ها را در سیستم افزایش خواهند داد، زیرا در این حالت پیام‌ها به یک رابط کاربری خاص گره خواهند خورد.<br/> <br/>
خب اگر پیام‌ها برای کاربران نهایی نیستند، پس برای کسانی مورد استفاده قرار خواهند گرفت؟ در واقع این نوع پیام می‌تواند به عنوان یک documentation برای سیستم شما باشند.<br/>
فرض کنید در حال استفاده از یک کتابخانه جدید هستید به نظر شما کدام یک از پیام‌های زیر مناسب هستند:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">"Unecpected workingDirectory"</pre>
 </div>
یا:<br/> <div align="left" dir="ltr" style="direction:ltr;text-align:left;"> <div align="left" dir="ltr" style="direction:ltr;text-align:left;">
<pre language="CSharp" name="code">"You tried to provide a working directory string that doesn't represent a working directory. It's not your fault, because it wasn't possible to design the FileStore class in such a way that this is a statically typed pre-condition, but please supply a valid path to an existing directory.&#10;&#10;"The invalid value was: "fllobdedy"."</pre>
 </div> </div>
یافتن مشکل در پیام اول خیلی سخت خواهد بود زیرا فاقد اطلاعات کافی برای یافتن مشکل است. اما پیام دوم مشکل را به صورت کامل توضیح داده است. در حالت اول شما قطعاً نیاز خواهید داشت تا از دیباگر برای یافتن مشکل استفاده کنید. اما در حالت دوم پیام به خوبی شما را برای یافتن راه‌حل راهنمایی می‌کند.<br/>
همیشه برای نوشتن پیام‌های مناسب سعی کنید از لحاظ نوشتاری متن شما مشکلی نداشته باشد، اطلاعات کافی را درون پیام اضافه کنید و تا حد امکان نحوه‌ی رفع مشکل را توضیح دهید</div>
