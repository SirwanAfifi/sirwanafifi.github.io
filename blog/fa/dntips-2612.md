# C# 7 - Binary literals and digit separators

binary literals و digit separators دو ویژگی جدید در سی‌شارپ 7 هستند که باعث افزایش خوانایی کدها خواهند شد. Binary Literals از همان نسخه‌های اولیه سی‌شارپ قابلیت تعریف مقادیر عددی در مبنای 10 و 16 موجو

- Published: 2017-03-19
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-2612

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/2612) منتشر شده است.

<div class="postBody">binary literals و digit separators دو ویژگی جدید در سی‌شارپ 7 هستند که باعث افزایش خوانایی کدها خواهند شد. <div> <b> <br/> </b> </div> <div> <b>Binary Literals  </b> <br/> </div> <div>از همان نسخه‌های اولیه سی‌شارپ قابلیت تعریف مقادیر عددی در مبنای 10 و 16 موجود بوده و تا قبل از سی‌شارپ 7 روش رایج برای تعریف مقادیر هگزادسیمال استفاده از enum بوده است:</div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">[Flags]&#10;public enum Option&#10;{&#10;None = 0x00,&#10;Option1 = 0x01,&#10;Option2 = 0x02,&#10;Option3 = 0x04,&#10;Option4 = 0x08,&#10;Option5 = 0x10,&#10;Option6 = 0x20,&#10;Option7 = 0x40,&#10;Option8 = 0x80,&#10;All = 0xFF&#10;}</pre>
 </div> <br/> <div> <div align="left" dir="ltr" style="direction: ltr;"> </div>
در سی‌شارپ 7 می‌توانیم مقادیر فوق را به صورت باینری بنویسیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;"> </div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">[Flags]&#10;public enum Option&#10;{&#10;None = 0b00000000,&#10;Option1 = 0b00000001,&#10;Option2 = 0b00000010,&#10;Option3 = 0b00000100,&#10;Option4 = 0b00001000,&#10;Option5 = 0b00010000,&#10;Option6 = 0b00100000,&#10;Option7 = 0b01000000,&#10;Option8 = 0b10000000,&#10;All = 0b11111111&#10;}</pre>
 </div> <br/> </div> <div> <b>Digit Separators  </b> <br/> </div> <div>این ویژگی نیز همانطور که از نامش پیداست به عنوان یک جدا کننده در نظر گرفته خواهند شد؛ به عنوان مثال کد قبل را می‌توانیم به صورت زیر بنوسیم:</div> <div> <div align="left" dir="ltr" style="direction: ltr;">
<pre language="CSharp" name="code">[Flags]&#10;public enum Option&#10;{&#10;None = 0b0000_0000,&#10;Option1 = 0b0000_0001,&#10;Option2 = 0b0000_0010,&#10;Option3 = 0b0000_0100,&#10;Option4 = 0b0000_1000,&#10;Option5 = 0b0001_0000,&#10;Option6 = 0b0010_0000,&#10;Option7 = 0b0100_0000,&#10;Option8 = 0b1000_0000,&#10;All = 0b1111_1111&#10;}</pre>
 </div> <br/> </div> <div>همانطور که مشاهده می‌کنید با قرار دادن این جدا کننده، خوانایی کد بیشتر شده است. لازم به ذکر است که در زمان کامپایل، این کاراکتر حذف خواهد شد. در واقع از آن تنها جهت افزایش خونایی در حین کدنویسی استفاده می‌شود:</div> <div> <p style="margin-left: auto; margin-right: auto;"> <img src="/img/dntips/e3c1de504226524a891a.jpg" style="display:block; margin-left: auto; margin-right: auto;"/> </p> </div></div>
