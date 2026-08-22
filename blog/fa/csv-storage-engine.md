# آشنایی با CSV Storage Engine در MySQL

MySQL از چندین Storage Engine پشتیبانی میکند؛ Storage Engine در واقع کامپوننت‌های MySQL هستند که عملیات SQL را بر روی جداول میسر میکنند. 

- Published: 2021-09-07
- Language: fa
- Tags: MySQL, CSV, Storage Engine
- Canonical: https://sirwan.info/blog/fa/csv-storage-engine

---

MySQL از چندین Storage Engine پشتیبانی میکند؛ Storage Engine در واقع کامپوننت‌های MySQL هستند که عملیات SQL را بر روی جداول میسر میکنند. این قابلیت یک معماری pluggable است به این معنا که حتی خودمان نیز میتوانیم یک Storage Engine سفارشی را نیز توسعه دهیم (در
[اینجا](https://dev.mysql.com/doc/internals/en/custom-engine.html)
راهنمای کامل ایجاد یک Storage Engine سفارشی توضیح داده شده است). در MySQL توسط دستور زیر میتوانید لیست Storage Engineهای قابل پشتیبانی روی سرورتان را مشاهید کنید:

```sql
SHOW ENGINES;
-- OR
SELECT ENGINE FROM INFORMATION_SCHEMA.ENGINES
```

| SUPPORT     | Engine             |
| ----------- | ------------------ |
| YES         | ARCHIVE            |
| YES         | BLACKHOLE          |
| YES         | MRG_MYISAM         |
| NO          | FEDERATED          |
| YES         | MyISAM             |
| YES         | PERFORMANCE_SCHEMA |
| **DEFAULT** | **InnoDB**         |
| YES         | MEMORY             |
| **YES**     | **CSV**            |

به صورت پیش‌فرض MySQL از InnoDB به عنوان Storage Engine استفاده میکند. این Storage Engine به اصطلاح transaction-safe است به این معنی که خواص ACID را دارد؛ همچنین از FOREIGN KEY نیز پشتیبانی میکند.

میتوانیم در یک دیتابیس چندین Storage Engine را داشته باشیم زیرا این قابلیت در سطح جداول میباشد به این معنی که هر جدول میتواند Storage Engine خودش را داشته باشد؛ در ادامه یک دیتابیس تستی به همراه چندین جدول ایجاد خواهیم کرد:

```sql
CREATE SCHEMA `storage_engine`;

CREATE TABLE `storage_engine`.`Users` (
  `Id` INT NOT NULL,
  `Username` VARCHAR(45) NOT NULL,
  `FirstName` VARCHAR(45) NULL,
  `LastName` VARCHAR(45) NULL,
  `Bio` TEXT NULL,
  PRIMARY KEY (`Id`));

CREATE TABLE `storage_engine`.`Products` (
  `Id` INT NOT NULL,
  `Title` VARCHAR(45) NULL,
  `Price` FLOAT NULL,
  `Description` TEXT NULL,
  `CreatedBy` INT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
);
```

فرض کنید میخواهیم یکسری کاربر را از طریق یک فایل CSV دورن جدول Users ذخیره کنیم. خوشبختانه MySQL از CSV به عنوان یک Storage Engine پشتیبانی میکند. برای اینکار کافی است Storage Engine جدول Users را به CSV تغییر دهیم:

```sql
ALTER TABLE storage_engine.Users
ENGINE = CSV;
```

اکنون اگر دستور بالا را اجرا کنید MySQL خطای زیر را به صادر میکند:

```bash
Error Code: 3776. Cannot change table's storage engine because the table participates in a foreign key constraint.
```

دلیل آن نیز این است که CSV Storage Engine برخلاف InnoDB از FOREIGN KEY و Index و همچنین AUTO_INCREMENT پشتیبانی نمیکند.

برای حل این مشکل میتوانیم یک جدول موقع ایجاد کنیم و سپس با نوشتن یک کوئری دیتای آن را بعد از ایمپورت کردن به جدول اصلی منتقل کنیم:

```sql
CREATE TABLE `storage_engine`.`UsersCSV` (
  `Id` INT NOT NULL,
  `Username` VARCHAR(45) NOT NULL,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `Bio` TEXT NOT NULL
) ENGINE = CSV;
```

دقت داشته باشید که ستون‌های جدول میبایست به صورت NOT NULL تعریف شوند در غیر اینصورت حین ایجاد جدول خطای زیر را دریافت خواهیم کرد:

```sql
Error Code: 1178. The storage engine for the table doesn't support nullable columns
```

بعد از ایجاد جدول میتوانیم اطلاعات موردنظرمان را درون جدول ذخیره کنیم:

```sql
INSERT INTO storage_engine.UsersCSV VALUES
('36','Rose_Mosciski','Mackenzie','McCullough', ''),
('3','Genoveva98','Rick','Blick', ''),
('40','Kirk_Halvorson','Jennyfer','Rogahn', ''),
('20','Coty91','Domenic','Schamberger', ''),
('17','Haylie_Strosin0','Nasir','Steuber', ''),
('46','Cassandre.Casper60','Della','Becker', ''),
('38','Adella3','Angel','Johnson', ''),
('8','Delaney_Sauer37','Kole','Gerlach', ''),
('14','Mariam.Sporer','April','Bernhard', ''),
('15','Addie.Howell','Katlyn','Anderson', '')
```

اکنون میتوانیم دیتای ذخیره شده را در قالب فایل CSV در مسیر زیر مشاهده کنیم:

```sql
cat /usr/local/mysql/data/[db_name]/[table_name].CSV
```

این یعنی به راحتی میتوانیم فایل فوق را ویرایش کنیم یا حتی یک فایل CSV جدید نیز به این مسیر کپی کنیم که با اینکار MySQL به صورت جدول فایل موردنظر را برایمان نمایش خواهد داد و به راحتی میتوانیم از دستورات SQL برای کوئری گرفتن دیتا استفاده کنیم:

```sql
SELECT * FROM storage_engine.UsersCSV WHERE FirstName = 'Rick';
```

اکنون برای ذخیره دیتای ایمپورت شده میتوانیم اینگونه عمل کنیم:

```sql
INSERT INTO storage_engine.Users
SELECT * FROM storage_engine.UsersCSV;
```

لازم به ذکر است که امکان تغییر Storage Engine از CSV به InnoDB وجود دارد؛ اما در اینحالت باید FK/Index ,... را مجدداً ایجاد کنید.

**نکته**: در نهایت اگر یک فایل حجیم CSV دارید میتوانید به راحتی و بدون نیاز به Application Code آن را درون دیتابیس ایمپورت کنید؛ توجه داشته باشید که تنها کپی کردن فایل CSV به پوشه دیتا کافی نیست و قبل از آن میبایست جدول را توسط MySQL ایجاد کنید با اینکار فایل‌های CSM و FRM نیز ایجاد خواهند شد که در واقع حاوی تعاریف جدول میباشند. در نهایت برای دیدن دیتا کافی است دستور زیر را وارد کنید:

```sql
FLUSH TABLES;
```
