# تولید فایل‌های PDF توسط React

تهیه فایل PDF تا حدودی چالشی است به خصوص زمانیکه بخواهیم یکسری کامپوننت ری‌اکتی را تبدیل به PDF کنیم؛ در یکی از پروژه‌هایمان امکان تهیه فایل PDF را در اختیار کاربران قرار داده‌ایم. روال کار به این صورت است که ابتدا کاربر با کلیک روی یک باتن یک گزارش تهیه میکند سپس کاربر باید امکان پیش‌نمایش گزارش را نیز داشته باشد. تا اینجای کار خبری از PDF و تولید PDF نیست و چیزی که به کاربر نمایش داده میشود یکسری کامپوننت ری‌اکتی هستند که درون یک مودال پشت سر هم نمایش داده میشوند. درون هدر این مودال یک باتن جهت دانلود گزارش به صورت PDF را داریم؛ مشکل از آنجایی شروع میشود که این کامپوننت‌ها باید با همان کیفیت یا به اصطلاح به صورت pixel perfect به PDF تبدیل شوند و سپس روی دیسک ذخیره شوند.

- Published: 2021-09-25
- Language: fa
- Tags: React, PDF, Node
- Canonical: https://sirwan.info/blog/fa/generating-pdf

---

تهیه فایل PDF تا حدودی چالشی است به خصوص زمانیکه بخواهیم یکسری کامپوننت ری‌اکتی را تبدیل به PDF کنیم؛ در یکی از پروژه‌هایمان امکان تهیه فایل PDF را در اختیار کاربران قرار داده‌ایم. روال کار به این صورت است که ابتدا کاربر با کلیک روی یک باتن یک گزارش تهیه میکند سپس کاربر باید امکان پیش‌نمایش گزارش را نیز داشته باشد. تا اینجای کار خبری از PDF و تولید PDF نیست و چیزی که به کاربر نمایش داده میشود یکسری کامپوننت ری‌اکتی هستند که درون یک مودال پشت سر هم نمایش داده میشوند. درون هدر این مودال یک باتن جهت دانلود گزارش به صورت PDF را داریم؛ مشکل از آنجایی شروع میشود که این کامپوننت‌ها باید با همان کیفیت یا به اصطلاح به صورت pixel perfect به PDF تبدیل شوند و سپس سپس کاربر بتواند فایل را ذخیره کند.

 <img src="/img/report_pdf_list.jpeg" alt="report_pdf_list" />

برای تولید PDF در سمت کلاینت تصمیم گرفتیم که از html2pdf.js استفاده کنیم که یک لایبرری سمت کلاینت برای تبدیل HTML به PDF میباشد؛ این لایبرری در واقع براساس دو لایبرری دیگر یعنی html2canvas و jsPDF تهیه شده است؛ در واقع کاری که انجام میدهد تبدیل یک قسمت از DOM به Canvas و در نهایت ذخیره Canvas در قالب PDF است. بنابراین در قدم اول باید کامپوننت‌های ری‌اکتی را به DOM تبدیل کنیم؛ برای اینکار هم از renderToString میتوان استفاده کرد:

```typescript
ReactDOMServer.renderToString(element);
```

در نهایت workflow این چنین خواهد بود:

```typescript
.from(DOM_produced_by_renderToString) -> .toContainer() -> .toCanvas() -> .toImg() -> .toPdf() -> .save()
```

برای تهیه خروجی مطلوب نیز میتوانیم کیفیت و تنظیمات PDF را تعیین کنیم:

```typescript
const pdfOptions = {
  margin: 0,
  enableLinks: true,
  image: {
    type: "jpeg",
    quality: 0.98,
  },
  html2canvas: {
    dpi: 196,
    letterRendering: true,
  },
  jsPDF: {
    unit: "cm",
    format: "a4",
    orientation: "portrait",
    putOnlyUsedFonts: true,
  },
};
```

این پروسه به خوبی کار میکند اما تعدادی از کاربران از کند بودن فرآیند فوق شکایت داشتند به طوری که زمان مورد انتظار جهت تولید خروجی را چیزی حدود چندین ساعت گزارش کرده بودند! در حالیکه روی کامپیوتر من این فرآیند کلاً چندین ثانیه بیشتر طول نمیکشید و برای گزارشهایی با بیشتر از 20 صفحه نهایتاً چیزی حدود یک دقیقه طول میکشید. در نهایت تصمیم گرفتیم این پروسه را سمت سرور انجام دهیم اما مشکل اصلی اینجا بود که در سمت کلاینت انطعاف زیادی در اختیار داشتیم چون برای تولید صفحات از ری‌اکت استفاده شده بود.

## تولید PDF سمت سرور

ابتدا تصمیم گرفتیم که ساختار HTML تولید شده توسط renderToString را سمت Python انجام دهیم سپس توسط یک template engine متغیرهای موردنیاز هر صفحه را مقداردهی کنیم.

```python
@app.route("/api/generate_reports/", methods=["GET"])
def generate_report():
    try:
        # Some Code
        env = Environment(loader=FileSystemLoader("."))
        template = env.get_template("templates/index.html")
        template_vars = {
            # Data
        }
        html_out = template.render(template_vars)
        pdf_path = "/reports/result.pdf"
        pdfkit.from_string(html_out, pdf_path)
        # Some Code
    except Exception as e:
    return str(e), 500
```

اما خروجی تولید شده کیفیت مطلوب را نداشت. همچنین امکان ویرایش تمپلیت‌ها مثل سابق نبود و برای هر تغییر میبابیست یکبار در سمت ری‌اکت تغییرات را اعمال میکردیم و سپس HTML را تولید کرده و در نهایت جایگزین HTML قبلی کنیم. در نهایت تصمیم گرفتیم کامپوننت‌های ری‌اکت را سمت سرور منتقل کنیم و همانجا کار تولید PDF را انجام دهیم؛ سپس توسط puppeteer ساختار HTML تولید شده را به PDF تبدیل کنیم.

```typescript
app.get("/generate-report", async (request, response) => {
  const html = renderToStaticMarkup(
    ReportComponent({
      /* Report Data */
    })
  );
  // Some code
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Some code
  await page.setContent(html);
  // Some code
  const pdfBuffer = await page.pdf({
    // PDF settings
  });
  await page.close();
  await browser.close();
  response.send(pdfBuffer);
});
```

این روش دقیقاً خروجی مورد انتظارمان را تولید میکند و توانستیم با همان کیفیت PDFها را تولید کنیم. نکته‌ایی که در اینجا باید به آن توجه کرد این است که دیتای موردنیاز کامپوننت‌ها باید قبل از فرآیند renderToStaticMarkup فراهم شوند به عنوان مثال اگر درون کامپوننتی که قرار است به HTML تبدیل شود همچین کدی داشته باشید:

```jsx
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const MyComponent = () => {
  const { data, error } = useSWR(
    "https://api.github.com/repos/vercel/swr",
    fetcher
  );

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👁 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
};
```

خطای زیر را دریافت خواهید کرد:

> Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
>
> 1. You might have mismatching versions of React and the renderer (such as React DOM)
> 2. You might be breaking the Rules of Hooks
> 3. You might have more than one copy of React in the same app See for tips about how to debug and fix this problem.

برای حل این مشکل همانطور که اشاره شد باید قبل از تبدیل کردن کامپوننت به HTML دیتای آن را فراهم کرد و به صورت props به کامپوننت ارسال کرد:

```typescript
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const request = await fetch("https://api.github.com/repos/vercel/swr");
    const data = await request.json();
    const html = renderToStaticMarkup(MyComponent({ data }));
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }
}
```

کامپوننت را نیز اینگونه تغییر خواهیم داد:

```jsx
export const MyComponent = ({ data }) => {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👁 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
};
```
