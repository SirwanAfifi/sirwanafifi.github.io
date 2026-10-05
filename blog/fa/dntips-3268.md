# کار با دیتاتایپ JSON در MySQL - قسمت چهارم

MySQL قادر به ایندکس کردن ستون‌های JSON نمی‌باشد. برای حل این مشکل میتوانیم از generated columnها استفاده کنیم. منظور، ایجاد ستون‌هایی است که مقدارشان به صورت محاسبه شده و براساس ستون‌های دیگر میباشد؛

- Published: 2020-11-13
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-3268

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/3268) منتشر شده است.

<div class="postBody">MySQL قادر به ایندکس کردن ستون‌های JSON نمی‌باشد. برای حل این مشکل میتوانیم از generated columnها استفاده کنیم. منظور، ایجاد ستون‌هایی است که مقدارشان به صورت محاسبه شده و براساس ستون‌های دیگر میباشد؛ به عنوان مثال جدول کاربران زیر را در نظر بگیرید: <br/> <div> <div> <div align="left" dir="ltr" style="direction: ltr;"> </div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">CREATE TABLE `Users` (&#10;  id int NOT NULL AUTO_INCREMENT,&#10;  first_name VARCHAR(255) NOT NULL,&#10;  last_name VARCHAR(255) NOT NULL,&#10;  email VARCHAR(255) NOT NULL,&#10;  gender ENUM('Male','Female') NOT NULL,&#10;  PRIMARY KEY (`id`)&#10;)</pre>
 </div>
برای کوئری گرفتن full name در حالت معمول میتوانیم از تابع CONCAT استفاده کنیم:</div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">SELECT &#10;    *, CONCAT(first_name, '', last_name) AS full_name&#10;FROM&#10;    Users;</pre>
 </div>
اما توسط generated columns میتوانیم یک ستون را به جدول کاربران اضافه کنیم که مقدارش براساس دو فیلد first_name و last_name محاسبه و مقدار دهی شود:<div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">ALTER TABLE Users&#10;ADD COLUMN full_name TEXT GENERATED ALWAYS &#10;AS (CONCAT(first_name, ' ', last_name))</pre>
 </div>
همانطور که مشاهده میکنید از سینتکس GENERATE ALWAYS برای ایجاد generated column استفاده شده‌است. در MySQL دو نوع generated column وجود دارد: STORED و VIRTUAL؛ تفاوت آنها نیز در نحوه ذخیره‌سازی است. در حالت VIRTUAL که حالت پیش‌فرض است، مقادیر ذخیره نمیشوند؛ بلکه به صورت on the fly محاسبه و در خروجی نمایش داده خواهند شد. در حالیکه نوع STORED همانطور که از نامش پیداست، ذخیره خواهند شد؛ در نتیجه قابلیت ایندکس‌گذاری را دارد. برای تعیین نوع ستون نیز سینتکس آن اینگونه خواهد بود: <br/> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">ALTER TABLE Users&#10;ADD COLUMN full_name TEXT GENERATED ALWAYS &#10;AS (CONCAT(first_name, ' ', last_name)) STORED</pre>
 </div> <br/> </div> <div> <div>همچنین لازم به ذکر است که حین استفاده از generated columns باید نکات زیر را در نظر داشته باشید:</div> <div> <ul> <li>generated columnsها نمیتوانند شامل subqueries, parameters, variables, stored procedure, user-defined functions باشند.</li> <li>بر روی یک ستون generated نمیتوان AUTO_INCREMENT گذاشت یا اینکه از یک ستون AUTO_INCREMENT برای محاسبه generated column استفاده کرد.</li> <li>کلیدهای خارجی‌ای که در generated columnsها استفاده میشوند، قابلیت استفاده از CASCADE, SET NULL, or SET DEFAULT as ON UPDATE or ON DELETE را نخواهند داشت.</li> </ul> <div> <br/> </div>
در ادامه یک generated column را برای جدول productsMetadata تعیین خواهیم کرد:  <br/> </div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">ALTER TABLE productMetadata&#10;ADD COLUMN id INT GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(data, '$.id'))) STORED NOT NULL</pre>
 </div> <br/> </div> <div>بنابراین زمانیکه یک مقدار JSON را ذخیره میکنیم، کلید اصلی از path تعیین شده استخراج شده و به عنوان یک computed column برای این جدول تعیین خواهد شد. در ادامه میتوانید جزئیات تغییر فوق را مشاهده کنید:  <br/> </div> <div> <br/> </div> <div> <p style="margin-left: auto; margin-right: auto;"> <img src="/img/dntips/c59439999f800e6cec57.png" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/> </p> </div> </div> <div>   <br/> </div> </div> <div>اکنون کوئری زیر را در نظر بگیرید که رکوردی با آی‌دی ۱ را بازیابی خواهد کرد:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">SELECT data -&gt;&gt; "$.description.shortDescription" FROM productMetadata&#10;WHERE id = 1;</pre>
 </div>
از آنجائیکه هیچ ایندکسی برای این فیلد جدید لحاظ نشده است، MySQL کل ردیف‌ها را برای یافتن id موردنظر جستجو خواهد کرد. این مورد را میتوانید با دستور EXPLAIN نیز مشاهده کنید:</div> <div> <br/> </div> <div> <p style="margin-left: auto; margin-right: auto;"> <img src="/img/dntips/3ddbbdc3f28a50db4ed3.png" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/> </p> </div> <div> <p style="margin-left: auto; margin-right: auto;"> </p> <p style="margin-left: auto; margin-right: auto;"> <br/> </p> <p style="margin-left: auto; margin-right: auto;">همانطور که مشاهده میکنید مقدار type به ALL تنظیم شده‌است؛ همچنین مقدار rows نیز تعداد ردیف‌های جدول است که در اینجا ۱۳ ردیف دیتا را داریم. قاعدتاً با اضافه شدن دیتای جدید به جدول، جستجو نیز به مراتب کندتر خواهد شد. بنابراین با اضافه کردن ایندکس میتوانیم مشکل این کند بودن را رفع کنیم. به همین جهت در ادامه یک ایندکس را براساس ستون id که یک generated column است ایجاد خواهیم کرد:</p> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="Sql" name="code">CREATE INDEX idx_json_data ON productMetadata (id);</pre>
 </div> <p style="margin-left: auto; margin-right: auto;">اکنون اگر یکبار دیگر کوئری قبلی را اجرا کنیم، خواهیم دید که تعداد rows به ۱ و همچنین type به ref ست شده‌اند:</p> <p style="margin-left: auto; margin-right: auto;"> <br/> </p> <p style="margin-left: auto; margin-right: auto;"> <img src="/img/dntips/afe352695ed3dc72a20b.png" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/> </p> <br/> </div></div>
