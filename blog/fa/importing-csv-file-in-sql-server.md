# ذخیره فایل CSV در SQL Server

سری قبل در مورد ذخیره کردن یک فایل CSV توی دیتابیس MySQL توضیح دادم. در ادامه نحوه ذخیره یک فایل CSV در SQL Server رو بررسی میکنیم. برخلاف MySQL در SQL Server استوریج انجینی برای فایلهای CSV تعبیه نشده و خودمون باید فایل CSV رو بخونیم و بعد ذخیره کنیم. برای اینکار ابتدا نیاز به نصب SQL Server روی macbookم داشتم در نتیجه از داکر برای اینکار استفاده کردم

- Published: 2021-09-10
- Language: fa
- Tags: SQL Server, CSV
- Canonical: https://sirwan.info/blog/fa/importing-csv-file-in-sql-server

---

سری قبل در مورد ذخیره کردن یک فایل CSV توی دیتابیس MySQL توضیح دادم. در ادامه نحوه ذخیره یک فایل CSV در SQL Server رو بررسی میکنیم. برخلاف MySQL در SQL Server استوریج انجینی برای فایلهای CSV تعبیه نشده و خودمون باید فایل CSV رو بخونیم و بعد ذخیره کنیم. برای اینکار ابتدا نیاز به نصب SQL Server روی macbookم داشتم در نتیجه از داکر برای اینکار استفاده کردم:

```bash
docker run --name sql-server -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=<YourStrong@Passw0rd>' -p 1433:1433 -v $(pwd):/var/opt/mssql/data -d mcr.microsoft.com/mssql/server:2019-latest
```

ساختار جدول نیز به صورت زیر است:

```sql
CREATE TABLE [dbo].[Employees](
	ID     INT NOT NULL PRIMARY KEY,
	Name   TEXT NOT NULL,
	Salary TEXT NOT NULL,
	INDEX id_idx NONCLUSTERED (id)
)
```

فایل رو میتونیم به صورت مستقیم در T-SQL بخونیم و با دستور BULK INSERT توی جدول موردنظر ذخیره کنیم:

```sql
BULK INSERT [dbo].[Employees]
	FROM '/var/opt/mssql/data/employee.csv'
	WITH ( FORMAT='CSV' );
```

روی ماشین من این فرآیند چیزی حدود سه دقیقه طول کشید. دلیلش هم تنظیماتی بود که برای resourceهام توی Docker Dashboard ست کرده بودم که شامل CPU Core و مقدار RAM موردنیاز برای هر کانتینر هست. اما روی ماشین ویندوزیم این زمان چیزی حدود ۷ ثانیه طول کشید:

```sql
BULK INSERT [dbo].[Employees]
	FROM 'C:\Users\Sirwan\Desktop\employee.csv'
	WITH ( FORMAT='CSV');
```
