# بررسی خطای undefined is not iterable در JavaScript

Iteratorها این امکان را به ما میدهند که بر روی یک مجموعه iterator کنیم؛ به شرطی که مجموعه iterable باشد؛ در JS مقادیر زیر iterable هستند به این معنا که میتوانیم آیتم‌ها را یکی یکی پیمایش کنیم:

- Published: 2022-06-03
- Language: fa
- Tags: JavaScript, TypeScript
- Canonical: https://sirwan.info/blog/fa/undefined-is-not-iterable

---

توی یکی از پروژه‌هایی که کار میکنم یه خطایی رو دریافت کردم که توسط TypeScript به اصطلاح catch نشد اما قبل از اینکه اصل مطلب رو بگم میخواستم مروری بر Iterable و iteratorها داشته باشیم. Iteratorها این امکان را به ما میدهند که بر روی یک مجموعه iterator کنیم؛ به شرطی که مجموعه iterable باشد؛ در JS مقادیر زیر iterable هستند به این معنا که میتوانیم آیتم‌ها را یکی یکی پیمایش کنیم:

<div dir="ltr">
<ul>
<li>Arrays</li>
<li>Strings</li>
<li>Maps</li>
<li>Sets</li>
<li>DOM data structure</li>
</ul>
</div>

مثال:

```js
// Arrays
for (let item of ["UserA", "UserB"]) {
  console.log(item);
}

// Strings
for (let item of "Sirwan") {
  console.log(item);
}

// Maps
for (let item of new Map([
  [1, "UserA"],
  [2, "UserB"],
])) {
  console.log(item);
}

// Sets
for (let item of new Set(["Sirwan", "Sirwan"])) {
  console.log(item);
}

// DOM data structure
for (let el of document.querySelectorAll("p")) {
  console.log(el);
}
```

این قابلیت نیز از طریق یک متد که کلیدش Symbol.iterator است اتفاق میفتد؛ در واقع میتوانیم بگوئیم که تمامی مقادیر فوق این قرارداد را پیاده‌سازی کرده‌اند.

 <img src="/img/symbol-iterator.jpg" alt="symbol-iterator" />

خروجی این متد نیز یک ساختار مشخص داره؛ در واقع یک متد به اسم next رو expose میکنه که خروجی این متد نیز یک آبجکت هست که شامل دو پراپرتی value, done هست؛ loop هم تا زمانی که مقدار done به false ست نشده iteration رو ادامه میده که در اینصورت مقدار value نیز به undefined ست خواهد شد:

```ts
const names = ["UserA", "UserB", "UserC"];
const iterator = names[Symbol.iterator]();
iterator.next(); // { value: "UserA", done: false }
iterator.next(); // { value: "UserB", done: false }
iterator.next(); // { value: "UserC", done: false }
iterator.next(); // { value: undefined, done: true }

const myName = "Sirwan";
const iterator2 = myName[Symbol.iterator]();
iterator2.next(); // { value: "S", done: false }
iterator2.next(); // { value: "i", done: false }
iterator2.next(); // { value: "r", done: false }
iterator2.next(); // { value: "w", done: false }
iterator2.next(); // { value: "a", done: false }
iterator2.next(); // { value: "n", done: false }
iterator2.next(); // { value: undefined, done: true }
```

و اما خطایی که دریافت کردم چی بود؟ همونطور که از عنوان مطلب نیز مشخصه مقدار undefined این قرارداد رو پیاده‌سازی نکرده چون عملاً undefined در JS هیچ چیزی نیست و همونطور که از اسمش مشخصه undefined است.

```js
TypeError (intermediate value)(...) is not a function in JS
```

این خطا موقع اجرای این قطعه کد اتفاق میفتاد:

```ts
const whereClause = {
  ...(title && {
    OR: [{ title: { contains: title } }, { description: { contains: title } }],
  }),
  AND: [
    ...(status_ids &&
      status_ids.length > 0 && [
        {
          status_id: {
            in: status_ids as number[],
          },
        },
      ]),
    ...(user_id && user_id !== 0 && [{ user_id }]),
  ],
};
```

این کوئری کار زیاد خاصی انجام نمیده؛ هدف ساختن یک کوئری براساس فیلتر کاربر است. مشکل این بود که موقع spread کردن status_ids که به صورت conditional انجام شده، مقدار status_ids ممکنه یک آرایه خالی باشه چون کاربر ممکنه هیچ statusی رو موقع فیلتر کردن انتخاب نکنه. در نتیجه کد فوق اینطوری برای engine در نظر گرفته میشه:

```ts
const whereClause = {
  // as before
  AND: [...undefined, ...(user_id && user_id !== 0 && [{ user_id }])],
};
```

از اونجائیکه undefined هم iterable نیست در نتیجه خطای عنوان شده توسط engine صادر میشه.

```ts
(status_ids && (status_ids.length > 0) && [{(intermediate value)}]) is not iterable
```

همین کد قبلی رو اگر با TypeScript تست کنید میتونید خطا رو موقع compile time مشاهده کنید:

<img src="/img/undefined-is-not-iterable.jpg" alt="undefined-is-not-iterable" />

spread operator هم همونطور که میدونید کاری که انجام میده insert کردن مقادیر یک iterable داخل یک آرایه هستش یعنی این قطعه کد:

```ts
const names = ["UserA", "UserB", "UserC"];
const newNames = [...names];
```

توسط TypeScript در نهایت به همچین خروجی تبدیل میشه (ES5):

```ts
"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
var names = ["UserA", "UserB", "UserC"];
var newNames = __spreadArray([], names, true);
```

راه‌حل ساده برای این خطا اینکه یه fallback برای اون قسمت از کد بذاریم که اگر نتیجه عبارت undefined شد یک آرایه خالی رو spread کنه:

```ts
const whereClause = {
  ...(title && {
    OR: [{ title: { contains: title } }, { description: { contains: title } }],
  }),
  AND: [
    ...((status_ids &&
      status_ids.length > 0 && [
        {
          status_id: {
            in: status_ids as number[],
          },
        },
      ]) ||
      []),
    ...(user_id && user_id !== 0 && [{ user_id }]),
  ],
};
```

اما بهتر بود TypeScript هم موقع نوشتن کد این خطا رو بهم نشون میداد؛ قاعدتاً باید نشون میداد ولی چون برای این پروژه از express استفاده کرده بودم؛ مقدار req.body به صورت پیش‌فرض به any ست شده و برای any هم هیچ محدودیتی وجود نداره؛ برای حل مشکل مقدار ورودی که از body گرفته میشد رو به typeی که مدنظرم بود cast کردم و خطا همونطور که انتظار داشتم نشون داده شد:

<img src="/img/cast-body-symbol.jpg" alt="cast-body-symbol" />

توی چیزی مثل NestJS این موارد خیلی سریع قابل‌حل هستن چون به نوعی طبق convention پیشنهاد میده ورودی‌ها رو typeدار کنیم:

```ts
@Post()
filter(@Body() filterInput: FilterInputDto) {
  const { title, user_id, status_ids } = filterInput;

  // other code
}
```

اما در حالت استفاده از express به صورت خام باید حواسمون به همچین شرایطی باشه.
