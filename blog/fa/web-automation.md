# انجام یک تسک ساده با Golang

یکی از کارهای خسته‌کننده برام web automation هست؛ ابزارهای زیادی برای این کار توسعه داده شدن معروفترین‌هاش Puppeteer، Playwright هستن. برای یک پروژه نیاز بود یک فرآیند رو به صورت headless انجام بدم؛ چون با این دو ابزار زیاد کار کرده بودم تصمیم گرفتم با یک چیز متفاوت جدید تسکم رو انجام بدم بنابراین پروژه رو با Golang شروع کردم و از go-rod استفاده کردم.

- Published: 2022-06-04
- Language: fa
- Tags: Golang, Developer Tools, Chrome, Puppeteer, Playwright, go-rod
- Canonical: https://sirwan.info/blog/fa/web-automation

---

یکی از کارهای خسته‌کننده برام web automation هست؛ ابزارهای زیادی برای این کار توسعه داده شدن معروفترین‌هاش Puppeteer، Playwright هستن. برای یک پروژه نیاز بود یک فرآیند رو به صورت headless انجام بدم؛ چون با این دو ابزار زیاد کار کرده بودم تصمیم گرفتم با یک چیز متفاوت و جدید تسکم رو انجام بدم بنابراین پروژه رو با Golang شروع کردم و از go-rod استفاده کردم. این کتابخونه هم پشت‌پرده از Google DevTool Protocol استفاده میکنه بنابراین APIش خیلی شبیه به Puppeteer و Playwright هست. یه بخش از کاری که میخواستم انجام بدم اتوماتیک کردن فرآیند ساختن ایمیل توی سایت IONOS بود. این بخش بیشترین تایمم رو به خودش اختصاص داد چون فرم ایجاد ایمیل به شدت به اصطلاح tricky بود و هر کاری میکردم با کد نمیتونستم النمت پسورد رو فوکس کنم؛ فرآیند خیلی ساده بود چون در نهایت میبایست مقادیر یه سری فیلد مثل یوزرنیم، پسورد رو ست میکردم و دکمه Save داخل فرم کلیک میکردم. اما فیلد پسورد یک Password Strength Meter داشت که حتماً با **کلیک** داخل فیلد فعال میشد نه فوکوس (چون خود focus هم از طریق DevTools قابل انجام نیست معمولاً https://stackoverflow.com/q/1096436/1646540):

<blockquote class="twitter-tweet"><p lang="fa" dir="rtl">این مشکل سمت خود سایته که میخوام automateش کنم؛ چون با DevTools هم تست کردم همین مشکل رو دارم: (چیزی که انتظار دارم تصویر دومه)<br>- تب ایندکس رو تست کردم<br>- ایونت mouse click رو dispatch کردم<br>- + ۱۰۰۰ حالت دیگه 😀 <a href="https://t.co/RnvfJ8zeNZ">https://t.co/RnvfJ8zeNZ</a> <a href="https://t.co/qoWCRHU1tP">pic.twitter.com/qoWCRHU1tP</a></p>&mdash; Sirwan Afifi (@SirwanAfifi) <a href="https://twitter.com/SirwanAfifi/status/1532850388671549440?ref_src=twsrc%5Etfw">June 3, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

تقریباً تمام حالت‌های ممکن رو تست کردم از ست کردن tabIndex گرفته تا dispatch کردن تمام ایونت‌های اتچ شده به المنت:

```js
element = getEventListeners($0);
Object.keys(element).forEach((k) => {
  const e = new Event(k);
  $0.dispatchEvent(e);
});
```

اما نتیجه‌ایی نمیگرفتم تا در نهایت متوجه شدم در حالت click آبجکت ایونت یک پراپرتی به اسم isTrusted داره و ازش به عنوان یه گارد استفاده میکنه؛ این پراپرتی تعیین میکنه که آیا کلیک دریافتی از سمت کاربر بوده یا از سمت کد:

```html
<input type="password" />
<button>Focus Password</button>

<script>
  const password = document.querySelector("input");
  const btn = document.querySelector("button");

  password.addEventListener("click", (event) => {
    if (event.isTrusted) {
      // some action
    }
  });

  btn.addEventListener("click", (event) => {
    password.click();
  });
</script>
```

در نتیجه کلیک هم فایده‌ایی نداشت چون ولیدیشن تنها در صورتی که isTrusted به true ست شده باشه انجام میشه با Monkey Patching هم احتمالاً میشد اینکار رو انجام داد اما چون من علاقه‌ایی بهش ندارم در نتیجه تصمیم گرفتم تستش نکنم ولی به صورت خلاصه یعنی یه پیاده‌سازی رو با یک پیاده‌سازی سفارشی خودمون جایگزین کنیم (https://stackoverflow.com/a/64991159/1646540):

```js
Element.prototype._addEventListener = Element.prototype.addEventListener;
Element.prototype.addEventListener = function () {
  let args = [...arguments];
  let temp = args[1];
  args[1] = function () {
    let args2 = [...arguments];
    args2[0] = Object.assign({}, args2[0]);
    args2[0].isTrusted = true;
    return temp(...args2);
  };
  return this._addEventListener(...args);
};
```

در نهايت بعد از کلی سروکله رفتن با حالت‌های مختلف یه راه‌حل ساده به ذهنم رسید؛ تصميم گرفتم به جای راضی کردن Password Strength Meter بیام اون قوانینی که برای پسورد نیاز هست رو تامین کنم؛ یعنی یک پسورد براساس اون ruleها جنریت کنم و بدون اینکه کاری با ولیدیشن داشته باشم form رو submit کنم:

```go
passwordInput := page.MustWaitLoad().MustElementX("input")
page.MustWaitLoad().MustElementX("//*[@id='username']").MustInput("SOME_USERNAME")
passwordInput.MustInput("SOME_PASSWORD")
page.MustEval(`() => document.querySelector("#create-email").submit()`)
page.MustWaitNavigation()
```

به نوعی شاید صورت‌مسئله رو پاک کردم ولی با وجود اینکه کلی از این تیپ تسک‌ها انجام دادم بازم در طول مسیر کلی نکته جدید یادگرفتم :)
