# Different ways of adding your signature on a PDF

My coworker wrote some Python code to add a signature on PDFs. Since Python isn't my thing, I wrote the same code in a few of my favorite languages. Probably because I haven't used Python in production or because of its wired syntax (Maybe I only like curly-brace languages). Anyway, here's the Python code I mentioned:

- Published: 2022-11-27
- Language: en
- Tags: C#, PowerShell, Python, Perl, Golang, Bash
- Canonical: https://sirwan.info/blog/en/different-ways-of-adding-your-signature-on-a-pdf

---

My coworker wrote some Python code to add a signature on PDFs. Since Python isn't my thing, I wrote the same code in a few of my favorite languages. Probably because I haven't used Python in production or because of its wired syntax (Maybe I only like curly-brace languages). Anyway, here's the Python code I mentioned:

```python
import PyPDF2
from fpdf import FPDF
import time
​
output_file = "merged.pdf"
watermark_file = "converted.pdf"
​
def convert_to_pdf():
    path_to_image = input('image to add: ')
    pdf = FPDF()
    pdf.add_page()
    pdf.image(path_to_image,130,270, 75, 25)
    pdf.output('converted.pdf')
​
def merge_pdf():
    input_file = input('Path to target pdf: ')
    with open(input_file, "rb") as filehandle_input:
    # read content of the original file
        pdf = PyPDF2.PdfFileReader(filehandle_input)

        with open(watermark_file, "rb") as filehandle_watermark:
            # read content of the watermark
            watermark = PyPDF2.PdfFileReader(filehandle_watermark)

            # get first page of the original PDF
            first_page = pdf.getPage(0)

            # get first page of the watermark PDF
            first_page_watermark = watermark.getPage(0)

            # merge the two pages
            first_page.merge_page(first_page_watermark)

            # create a pdf writer object for the output file
            pdf_writer = PyPDF2.PdfFileWriter()

            # add page
            pdf_writer.addPage(first_page)

            with open(output_file, "wb") as filehandle_output:
                # write the watermarked file to the new file
                pdf_writer.write(filehandle_output)
​
convert_to_pdf()
time.sleep(1)
merge_pdf()
```

There's nothing complicated about the code. A PDF is created by converting the image into a PDF and merging it with the PDF that needs to have a signature.

## PowerShell

I will start with the PowerShell version, I have used [iTextSharp](https://github.com/VahidN/iTextSharp.LGPLv2.Core), which is a .NET library to work with PDFs. The code is pretty straightforward:

```powershell
Add-Type -Path "*.dll"
$pdf = [iTextSharp.text.pdf.PdfReader]::new("$(Get-Location)/invoice.pdf")
$fs = [System.IO.FileStream]::new("$(Get-Location)/signed-invoice.pdf",
    [System.IO.FileMode]::Create)
$stamper = [iTextSharp.text.pdf.PdfStamper]::new($pdf, $fs)
$content = $stamper.GetOverContent(1)
$width = $pdf.GetPageSize(1).Width
$image = [iTextSharp.text.Image]::GetInstance("$(Get-Location)/sign.jpg")
$image.SetAbsolutePosition($width - 130, 50)
$image.ScaleAbsolute(100, 30)
$content.AddImage($image)
$stamper.Close()
$pdf.Close()
$fs.Dispose()
```

## C#

The C# version is almost the same as the PowerShell one. I have used the same library, iTextSharp:

```csharp
using iTextSharp.text;
using iTextSharp.text.pdf;

var pdfReader = new PdfReader("../invoice.pdf");
var outStream = new FileStream("../signed-invoice.pdf", FileMode.Create);
var pdfStamper = new PdfStamper(pdfReader, outStream);
var content = pdfStamper.GetOverContent(1);
var width = pdfReader.GetPageSize(1).Width;
var baseDir = AppDomain.CurrentDomain.BaseDirectory.Split(new[] { "bin" }, StringSplitOptions.None)[0];
var signFile = Path.Combine(baseDir, "..", "sign.jpg");
var image = Image.GetInstance(signFile);
image.SetAbsolutePosition(width - 130, 50);
image.ScaleAbsolute(100, 30);
content.AddImage(image);
pdfStamper.Close();
pdfReader.Close();
outStream.Close();
```

Both versions use the `PdfReader` class to open a PDF file, then use `PdfStamper` to create a new PDF file. `PdfStamper` adds content to an existing PDF. Then we have added the image to the PDF using the `AddImage` method.

## Golang

As you can see the Golang version is pretty short. It uses the `pdft` library to add the signature to the PDF. I could have removed the error handling to make it even shorter.

```go
package main

import (
	"io/ioutil"

	"github.com/signintech/pdft"
)

func main() {
	var pt pdft.PDFt
	err := pt.Open("../invoice.pdf")
	if err != nil {
		panic("Couldn't open pdf.")
	}
	pic, err := ioutil.ReadFile("../sign.jpg")
	if err != nil {
		panic("Couldn't read pic.")
	}
	err = pt.InsertImg(pic, 1, 1950.0, -2450.0, 400, 100)
	if err != nil {
		panic("Couldn't insert image")
	}
	err = pt.Save("../signed-invoice.pdf")
	if err != nil {
		panic("Couldn't save pdf.")
	}
}
```

## Perl

The Perl version is also pretty short. It uses the `PDF::API2` library to add the signature to the PDF:

```perl
use PDF::API2;
my $pdf = PDF::API2->open('../invoice.pdf');
my $img = $pdf->image_jpeg('../sign.jpg');
my $page = $pdf->openpage(1);
my $gfx = $page->gfx;
$gfx->image($img, 1950, 3200, 400, 100);
$pdf->saveas('../signed-invoice.pdf');
```

## Bash

The Bash version is the shortest one. It uses the `pdftk` command to add the signature to the PDF. The Bash version's signature must be in PDF format rather than an image, which means that it overlays the stamp PDF page on top of the input PDF document's pages, like a background:

```bash
pdftk ./invoice.pdf stamp ./a4-sign.pdf output signed-invoice.pdf
```
