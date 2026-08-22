# نکات Golang

مدتی است در حال یادگیری Golang هستم. Golang یک زبان statically complied است که توسط Google توسعه داده شده است. اینجا نکاتی که در مورد Golang یاد میگیرم رو سعی میکنم به صورت پراکنده به اشتراک بذارم.

- Published: 2021-10-13
- Language: fa
- Tags: Golang
- Canonical: https://sirwan.info/blog/fa/golang-basics

---

مدتی است در حال یادگیری Golang هستم. Golang یک زبان statically complied است که توسط Google توسعه داده شده است. اینجا نکاتی که در مورد Golang یاد میگیرم رو سعی میکنم به صورت پراکنده به اشتراک بذارم.

 <img src="/img/golang.png" alt="golang" />

## توابع

#### Naked function

<blockquote class="twitter-tweet"><p lang="fa" dir="rtl">توی Go علاوه بر اینکه یک تابع میتونه چند خروجی داشته باشه؛ امکان implicit return رو هم داریم؛ توی TS , CSharp باید از Tuple استفاده کنیم اما تفاوتش اینجاست که توی CSharp و JS/TS خروجی در نهایت یک مقداره اما توی Go عملاً چند مقدار هستش. <a href="https://t.co/vvI3tiktdr">pic.twitter.com/vvI3tiktdr</a></p>&mdash; Sirwan Afifi (@SirwanAfifi) <a href="https://twitter.com/SirwanAfifi/status/1445074027001810959?ref_src=twsrc%5Etfw">October 4, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

#### Closure

<blockquote class="twitter-tweet"><p lang="fa" dir="rtl">اینجا یکی از کاربردهای Closure پیاده‌سازی Middleware هستش:<a href="https://twitter.com/hashtag/Golang?src=hash&amp;ref_src=twsrc%5Etfw">#Golang</a> <a href="https://t.co/8pX9wHENjQ">pic.twitter.com/8pX9wHENjQ</a></p>&mdash; Sirwan Afifi (@SirwanAfifi) <a href="https://twitter.com/SirwanAfifi/status/1444194945250873345?ref_src=twsrc%5Etfw">October 2, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Loop

توی Golang تنها یک مدل loop داریم و اونم for هستش که به دو حالت میشه اون رو نوشت:

```go
for i := 0; i < len(items); i++ {
  fmt.Println(items[i])
}

for _, item := range items {
  fmt.Println(item)
}
```

## Array

در Go برای تعریف آرایه دو راه داریم؛ یکی اینکه آرایه با سایز مشخص تعیین کنیم یا اینکه سایز آرایه را داینامیک در نظر بگیرم؛ به حالت دوم Slice گفته میشود:

```go
// Fixed Array
users := [2]string{ "Sirwan", "Sana" }

// Slice
users := []string{ "Sirwan", "Sana" }
```

برای اضافه کردن یک آیتم به Slice Array میتوانیم از تابع append استفاده کنیم:

```go
users := []string{ "Sirwan", "Sana" }
users = append(users, "Kaywan")
```

## Maps

خیلی شبیه Record در TS هستند:

```go
user := map[string]string{ "name": "Sirwan", "lastName": "Afifi" }

// Example:
user := map[int] map[string]string {
	1: {"firstName": "Sirwan", "lastName": "Afifi"},
	2: {"firstName": "Kaywan", "lastName": "Afifi"},
	3: {"firstName": "Sana", "lastName": "Afifi"},
}

for _, u := range user {
	for k, v := range u {
		fmt.Printf("%s: %s \t", k, v)
	}
	fmt.Println()
	fmt.Println(strings.Repeat("*", 40))
	fmt.Println()
}
```

## Struct

توسط Struct میتوانیم یک type تعریف کنیم:

```go
user := User{firstName: "Sirwan", lastName: "Afifi"}
```

<blockquote class="twitter-tweet"><p lang="fa" dir="rtl">Go از unnamed structها پشتیبانی میکنه؛ خوبیش اینکه یک unnamed struct رو میتونیم به یک named struct اساین کنیم (به شرطی که ساختارشون یکی باشه) به این میگن structural typing ولی اگر بخوایم یک named struct رو به یک named struct دیگه اساین کنیم باید حتماً تایپ مقصد رو تعیین کنیم: <a href="https://t.co/TFMHVsMmvq">pic.twitter.com/TFMHVsMmvq</a></p>&mdash; Sirwan Afifi (@SirwanAfifi) <a href="https://twitter.com/SirwanAfifi/status/1449641225628307457?ref_src=twsrc%5Etfw">October 17, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
