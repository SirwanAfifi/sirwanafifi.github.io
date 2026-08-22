# آشنایی با TypeChat

در دنیای Generative AI مفهوم Prompt نقش خیلی مهمی را ایفا میکند؛ چون برای گرفتن یک خروجی با کیفیت میبایست یک ورودی یا Prompt با کیفیت و خلاقانه داشته باشیم؛ این قضیه به قدری اهمیت دارد که یک عنوان شغلی هم برای آن در نظر گرفته شده است Prompt Engineer؛ چون اگر یک Prompt به خوبی نوشته نشود، نتایج غیرواقعی و نادرستی میتواند تولید کند که به این رفتار [Hallucination](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)) یا Fabulations گفته میشود.

- Published: 2023-08-18
- Language: fa
- Tags: TypeScript, GPT, OpenAI, AI
- Canonical: https://sirwan.info/blog/fa/typechat

---

در دنیای Generative AI مفهوم Prompt نقش خیلی مهمی را ایفا میکند؛ چون برای گرفتن یک خروجی با کیفیت میبایست یک ورودی یا Prompt با کیفیت و خلاقانه داشته باشیم؛ این قضیه به قدری اهمیت دارد که یک عنوان شغلی هم برای آن در نظر گرفته شده است Prompt Engineer؛ چون اگر یک Prompt به خوبی نوشته نشود، نتایج غیرواقعی و نادرستی میتواند تولید کند که به این رفتار [Hallucination](<https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)>) یا Fabulations گفته میشود. برای این LLMها دادن کانتکست اهمیت زیادی دارد چون یک Prompt به تنهایی پاسخ مطلوب را برایمان جنریت نمیکند و باید تا جایی که امکان دارد توضیحات کافی را بدهیم. به صورت پیش‌فرض هم همه در دادن instruction خوب نیستند و این خودش یک مهارت محسوب میشه بخاطر همین است که Prompt Engineering مطرح میشود. OpenAI هم یکسری Best Practise برای نوشتن Promptهای خوب دارد که از [اینجا](https://help.openai.com/en/collections/3675942-prompt-engineering) یا [اینجا](https://cloud.google.com/blog/products/application-development/five-best-practices-for-prompt-engineering) میتوانید مشاهده کنید. به عنوان مثال برای ChatGPT با تغییر کوچکی در نحوه پرسیدن سوال نتایج خیلی متفاوتی دریافت خواهیم کرد. ایده‌هایی که بهتر است به کار بگیریم:

**دادن نقش یا Personas**

مثلاً با عباراتی از قبیل act as a... میتوانیم یک نقش برای پاسخ تعیین کنیم.

​ Act as a marketing copywriter, and write three ads for...

**تعیین Tone**

مثلاً میتوانیم تعیین کنیم که خروجی که تولید میشود چه tone داشته باشد:

​ Use a friendly and inviting tone...

نکته‌ایی که در مورد این LLMها وجود دارد این است که در تولید متن به صورت پیش‌فرض عالی هستند در واقع بیشترین کاربرد آنها در تبدیل یک متن به یک متن دیگر است یعنی یک نوع text to text transformation هستند. این شاید نیاز خیلی‌ها را برطرف کند اما اگر خروجی را بخواهیم درون یک application code استفاده کنیم چطور؟ قاعدتاً میبایست خروجی متن را پارز کنیم که خود این فرآیند چالش‌های خاص خودش را دارد. اخیراً یک پروژه جالب از Microsoft با نام [TypeChat](https://github.com/microsoft/TypeChat) منتشر شده است که دقیقاً همینکار را انجام میدهد؛ با کمک TypeScript میتوانیم فرمت یا اسکیمای خروجی موردنظرمان را از این LLMها درخواست کنیم. خوبی داستان این است که بیشتر این LLMها خیلی خوب با TypeScript و JSON آشنا هستند. در نتیجه به راحتی میتوانیم خروجی JSON تولید شده توسط این LLMها را درون کدهایمان استفاده کنیم؛ در اینحالت اپلیکیشن ما به جای سروکار داشتن با یک دیتای unstructured با یک ساختار مشخص یا structured سروکار خواهد داشت. مزیت TypeScript نیز این است که خیلی نسبت به JSON Schema به اصطلاح compactتر است؛ چیزی حدود ۵ برابر compactتر است.

برای استفاده از TypeChat نیاز به API Key یکی از سرویس‌های Azure OpenAI یا Open AI خواهید داشت. برای APIیی که OpenAI ارائه میدهد نیاز به یک اشتراک داریم که البته با اشتراک ChatGPT متفاوت است و آن را باید جدا تهیه کرد؛ برای محاسبه هزینه استفاده از این API میتواند از این [لینک](https://gptforwork.com/tools/openai-chatgpt-api-pricing-calculator) کمک بگیرید. در ادامه میخواهیم یک پروژه ساده Node/TypeScript درست کنیم که کاربر با وارد کردن Prompt بتواند یک جدول درون یک دیتابیس MySQL ایجاد کند؛ برای اینکار اسکیمای مدنظرم را با کمک TypeScript تعیین میکنم؛ در واقع میخواهیم خروجی پاسخی که از LLM برای جنریت میکند را مشخص کنیم:

```typescript
export interface DatabaseSchema {
  databaseName: string;
  tables: Table[];
}

export interface Table {
  name: string;
  columns: Column[];
}

export interface Column {
  name: string;
  type:
    | "BIT"
    | "TINYINT"
    | "SMALLINT"
    | "MEDIUMINT"
    | "INT"
    | "INTEGER"
    | "BIGINT"
    | "REAL"
    | "DOUBLE"
    | "FLOAT"
    | "DECIMAL"
    | "NUMERIC"
    | "DATE"
    | "TIME"
    | "TIMESTAMP"
    | "DATETIME"
    | "VARCHAR(255)"
    | "TEXT"
    | "JSON";
  allowNull: boolean;
}
```

بنابراین اگر یک Prompt اینچنینی داشته باشیم:

> I want a table called 'Employee' with these columns: 'EmployeeID', 'FirstName', 'LastName', 'DepartmentID', 'DepartmentName', 'ManagerID', 'ManagerName'.

خروجی زیر برایمان مطابق با اسکیمایی که تعریف کردیم جنریت خواهد شد:

```json
{
  "databaseName": "",
  "tables": [
    {
      "name": "Employee",
      "columns": [
        {
          "name": "EmployeeID",
          "type": "INT",
          "allowNull": false
        },
        {
          "name": "FirstName",
          "type": "VARCHAR(255)",
          "allowNull": false
        },
        {
          "name": "LastName",
          "type": "VARCHAR(255)",
          "allowNull": false
        },
        {
          "name": "DepartmentID",
          "type": "INT",
          "allowNull": false
        },
        {
          "name": "DepartmentName",
          "type": "VARCHAR(255)",
          "allowNull": false
        },
        {
          "name": "ManagerID",
          "type": "INT",
          "allowNull": false
        },
        {
          "name": "ManagerName",
          "type": "VARCHAR(255)",
          "allowNull": false
        }
      ]
    }
  ]
}
```

با خروجی فوق به راحتی میتوانیم توسط هر ORM جدول مدنظر را درون دیتابیس‌مان ایجاد کنیم؛ مزیت TypeChat این است که یک نوع validator نیز دارد یعنی اگر خروجی LLM مطابق اسکیمای تعریف شده نباشد یک خطا صادر خواهد شد. در ادامه کدهای مثال فوق را مشاهده میکنید:

```typescript
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
import * as typechat from "typechat";
import { DatabaseSchema } from "./schema";
import knex from "knex";

dotenv.config();

export const Database = knex({
  client: "mysql2",
  connection: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});

const model = typechat.createLanguageModel(process.env);

const schema = fs.readFileSync(path.join(__dirname, "schema.ts"), "utf8");
const translator = typechat.createJsonTranslator<DatabaseSchema>(
  model,
  schema,
  "DatabaseSchema"
);

typechat.processRequests("😀> ", "./input.txt", async (request) => {
  try {
    await Database.raw("SELECT 1");
    const response = await translator.translate(request);
    if (!response.success) {
      console.log(response.message);
      return;
    }
    console.log(JSON.stringify(response.data, null, 2));
    const { tables } = response.data;
    for (const table of tables) {
      const { name, columns } = table;
      let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${name} (`;
      for (const column of columns) {
        const { name, type, allowNull } = column;
        CREATE_TABLE += `\n  ${name} ${type}${allowNull ? "" : " NOT NULL"},`;
      }
      CREATE_TABLE = CREATE_TABLE.slice(0, -1) + ");";
      await Database.raw(CREATE_TABLE);
    }
  } catch (error) {
    console.log(error);
  }
});
```

کدهای کامل مثال فوق را نیز از [اینجا](https://github.com/SirwanAfifi/typechat-test) میتوانید دریافت کنید.
