# رسم نمودار توسط Kendo Chart

پیشتر مطالبی در سایت، درباره KenoUI و همچنین ویجت‌های وب آن منتشر گردید. در این مطلب نگاهی خواهیم داشت بر تعدادی از ویجت‌های Kendo UI جهت رسم نمودار. توسط Kendo UI می‌توانیم نمودار‌های زیر را ترسیم کن

- Published: 2015-01-29
- Language: fa
- Tags: DNTips
- Canonical: https://sirwan.info/blog/fa/dntips-1979

---

> این نوشته نخستین بار در [دات‌نت تیپس](https://www.dntips.ir/post/1979) منتشر شده است.

<div class="postBody">پیشتر مطالبی در سایت، درباره <a href="https://vahidn.github.io/dntips.mirror/OPF/www.dntips.ir-learning-paths-toc-page-1.html">KenoUI</a>  و همچنین ویجت‌های وب آن منتشر گردید. در این مطلب نگاهی خواهیم داشت بر تعدادی از ویجت‌های Kendo UI جهت رسم نمودار. توسط Kendo UI می‌توانیم نمودار‌های زیر را ترسیم کنیم:<br/> <ul> <li>
Bar and Column</li> <li>
Line and Vertical Line</li> <li>
Area and Vertical Area</li> <li>
Bullet</li> <li>
Pie and Donut</li> <li>
Scatter</li> <li>
Scatter Line</li> <li>
Bubble</li> <li>
Radar and Polar <br/> </li> </ul> <p>برای رسم نمودار می‌توانیم به صورت زیر عمل کنیم:</p> <p>1- ابتدا باید استایل‌های مربوط به Data Visualization را به صفحه اضافه کنیم:</p> <div align="left" dir="ltr">
<pre language="CSharp" name="code">&lt;link href="Content/kendo.dataviz.min.css" rel="stylesheet" /&gt;&#10;&lt;link href="Content/kendo.dataviz.default.min.css" rel="stylesheet" /&gt;</pre>
 </div>
2- سپس یک عنصر را بر روی صفحه جهت نمایش نمودار، تعیین می‌کنیم:
 <div align="left" dir="ltr">
<pre language="CSharp" name="code">&lt;div id="chart"&gt;&lt;/div&gt;</pre>
 </div>
برای عنصر فوق می‌توانیم درون CSS و یا به صورت inline طول و عرضی را برای چارت تعیین کنیم:<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">&lt;div id="chart" style="width: 400px; height: 600px"&gt;&lt;/div&gt;</pre>
 </div>
با فراخوانی تابع KendoChart، چارت بر روی صفحه نمایش داده می‌شود:<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">$("#chart").kendoChart();</pre>
 </div> <br/> <p> <img src="/img/dntips/2c05d5cd6d076c09ac56.png" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/> </p>
همانطور که مشاهده می‌کنید هیچ داده‌ایی را هنوز برای چارت تعیین نکرده‌ایم؛ در نتیجه همانند تصویر فوق یک چارت خالی بر روی صفحه نمایش داده می‌شود. برای چارت فوق می‌توانیم خواصی از قبیل عنوان و ... را تعیین کنیم:<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">$("#chart").kendoChart({&#10;    title: {&#10;         text: "چارت آزمایشی"&#10;    }&#10;});</pre>
 </div> <b> <br/>
نمایش داده‌ها بر روی چارت:</b> <br/>
داده‌ها را می‌توان هم به صورت local و هم به صورت remote دریافت و بر روی چارت نمایش داد. اینکار را می‌توانیم توسط قسمت series انجام دهیم:<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">$("#chart").kendoChart({&#10;    title: {&#10;         text: "عنوان چارت"&#10;    },&#10;    series: [&#10;         { name: "داده‌های چارت", data: [200, 450, 300, 125] }&#10;    ]&#10;});</pre>
 </div>
برای تعیین برچسب برای هر یک از داده‌ها نیز می‌توانیم خاصیت category axis را مقداردهی کنیم:<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">$("#chart").kendoChart({&#10;                title: {&#10;                    text: "عنوان چارت"&#10;                },&#10;                series: [&#10;                     {&#10;                         name: "داده‌های چارت",&#10;                         data: [200, 450, 300, 125]&#10;                     }&#10;                ],&#10;                categoryAxis: {&#10;                    categories: [2000, 2001, 2002, 2003]&#10;                }&#10;            });</pre>
 </div> <img src="/img/dntips/e3e2b53a062669967c4c.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/> <br/> <b>دریافت اطلاعات از سرور:</b> <br/>
کدهای سمت سرور:<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">public class ProductsController : ApiController&#10;    {&#10;        public IEnumerable&lt;ProductViewModel&gt; Get()&#10;        {&#10;            var products = _productService.GetAllProducts();&#10;            var query = products.GroupBy(p =&gt; p.Name).Select(p =&gt; new ProductViewModel&#10;            {&#10;                Value = p.Key,&#10;                Count = p.Count()&#10;            });&#10;            return query;&#10;        }&#10;    }&#10;&#10;    public class ProductViewModel&#10;    {&#10;        public string Value { get; set; }&#10;        public int Count { get; set; }&#10;    }</pre>
 </div> <br/>
سپس برای دریافت اطلاعات از سمت سرور باید DataSource مربوط به چارت را مقداردهی کنیم:  <br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">var productsDataSource = new kendo.data.DataSource({&#10;                transport: {&#10;                    read: {&#10;                        url: "api/products",&#10;                        dataType: "json",&#10;                        contentType: 'application/json; charset=utf-8',&#10;                        type: 'GET'&#10;                    }&#10;                },&#10;                error: function (e) {&#10;                    alert(e.errorThrown.stack);&#10;                },&#10;                pageSize: 5,&#10;                sort: { field: "Id", dir: "desc" }&#10;            });&#10;&#10;            $("#chart").kendoChart({&#10;                title: {&#10;                    text: "عنوان چارت"&#10;                },&#10;                dataSource: productsDataSource,&#10;                series: [&#10;                    {&#10;                        field: "Count",&#10;                        categoryField: "Value",&#10;                        aggregate: "sum"&#10;                    }&#10;                ]&#10;            });</pre>
 </div>
همانطور که مشاهده می‌کنید در این حالت باید برای سری، field و categoryField را مشخص کنیم.<br/>
موارد فوق را می‌توانیم به صورت یک افزونه نیز کپسوله کنیم.<br/> <br/> <b>
کدهای افزونه jquery.ChartAjax: </b> <br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">(function($) {&#10;    $.fn.ShowChart = function(options) {&#10;        var defaults = {&#10;            url: '/',&#10;            text: 'نمودار دایره ایی',&#10;            theme: 'blueOpal',&#10;            font: '13px bbc-nassim-bold',&#10;            legendPosition: 'left',&#10;            seriesField: 'Count',&#10;            seriesCategoryField: 'Value',&#10;            titlePosition: 'top',&#10;            chartWidth: 400,&#10;            chartHeight: 400&#10;        };&#10;        var options = $.extend(defaults, options);&#10;        return this.each(function() {&#10;            var chartDataSource = new kendo.data.DataSource({&#10;                transport: {&#10;                    read: {&#10;                        url: options.url,&#10;                        dataType: "json",&#10;                        contentType: 'application/json; charset=utf-8',&#10;                        type: 'GET'&#10;                    }&#10;                },&#10;                error: function (e) {&#10;                    // handle error&#10;                }&#10;            });&#10;            $(this).kendoChart({&#10;                chartArea: {&#10;                    height: options.chartHeight&#10;                },&#10;                theme: options.theme,&#10;                title: {&#10;                    text: options.text,&#10;                    font: options.font,&#10;                    position: options.titlePosition&#10;                },&#10;                legend: {&#10;                    position: options.legendPosition,&#10;                    labels: {&#10;                        font: options.font&#10;                    }&#10;                },&#10;                seriesDefaults: {&#10;                    labels: {&#10;                        visible: false,&#10;                        format: "{0}%"&#10;                    }&#10;                },&#10;                dataSource: chartDataSource,&#10;                series: [&#10;                    {&#10;                        type: "pie",&#10;                        field: options.seriesField,&#10;                        categoryField: options.seriesCategoryField,&#10;                        aggregate: "sum",&#10;                    }&#10;                ],&#10;                tooltip: {&#10;                    visible: true,&#10;                    template: "${category}: ${value}",&#10;                    font: options.font&#10;                }&#10;            });&#10;            &#10;        });&#10;    };&#10;})(jQuery);</pre>
 </div>
برای افزونه فوق موارد زیر در نظر گرفته شده است:<br/> <b>chartArea</b> : جهت تعیین طول و عرض چارت<br/> <b>theme</b> : جهت تعیین قالب‌های از پیش‌تعریف شده:<br/> <ul> <li>
Black  </li> <li>
BlueOpal  </li> <li>
Bootstrap  </li> <li>
Default  </li> <li>
Flat  </li> <li>
HighContrast  </li> <li>
Material  </li> <li>
MaterialBlack  </li> <li>
Metro  </li> <li>
MetroBlack  </li> <li>
Moonlight  </li> <li>
Silver  </li> <li>
Uniform <br/> </li> </ul> <p> <b>title</b> : جهت تعیین عنوان چارت </p> <p> <b>  legend</b> : جهت تنظیم ویژگی‌های قسمت گروه‌بندی چارت </p> <p> <b>tooltip</b> : جهت تنظیم ویژگی‌های مربوط به نمایش tooltip در هنگام hover بر روی چارت.</p> <p>لازم به ذکر است در قسمت series می‌توانید نوع چارت را تعیین کنید.<br/> </p>

نحوه استفاده از افزونه فوق:<br/> <div align="left" dir="ltr">
<pre language="CSharp" name="code">$('#chart').ShowChart({&#10;                        url: "/Report/ByUnit",&#10;                        legendPosition: "bottom"&#10;});</pre>
 </div> <br/> <p> <img src="/img/dntips/d43d76c6c7d432577f73.jpg" style="display: block; margin-left: auto; margin-right: auto; cursor: default;"/> </p> <br/> <b>دریافت سورس مثال جاری </b>(<a href="https://www.dntips.ir/file/userfile?name=KendoChart.zip">KendoChart.zip</a>)<br/> <div align="left" dir="ltr"> <br/> </div></div>
