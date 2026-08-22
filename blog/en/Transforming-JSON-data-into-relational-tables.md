# MySQL - Transforming JSON data into relational tables

MySQL provides some built-in functions to work with JSON data. One of which is JSON_TABLE which maps JSON data into a temporary relational table.

- Published: 2020-10-24
- Language: en
- Tags: MySQL, SQL
- Canonical: https://sirwan.info/blog/en/Transforming-JSON-data-into-relational-tables

---

Given that you have a table called `Products` in your database, one of its columns is of type `JSON` which has product's metadata:

```json
[
  {
    "id": "1",
    "name": "Lorem ipsum jacket",
    "price": 12.45,
    "discount": 10,
    "offerEnd": "October 5, 2020 12:11:00",
    "rating": 4,
    "saleCount": 54,
    "tag": ["fashion", "men", "jacket", "full sleeve"],
    "variation": [
      {
        "color": "white",
        "image": "/assets/img/product/fashion/1.jpg",
        "size": [
          {
            "name": "x",
            "stock": 3
          },
          {
            "name": "m",
            "stock": 2
          },
          {
            "name": "xl",
            "stock": 5
          }
        ]
      },
      {
        "color": "black",
        "image": "/assets/img/product/fashion/8.jpg",
        "size": [
          {
            "name": "x",
            "stock": 4
          },
          {
            "name": "m",
            "stock": 7
          },
          {
            "name": "xl",
            "stock": 9
          },
          {
            "name": "xxl",
            "stock": 1
          }
        ]
      },
    ],
    "image": [
      "/assets/img/product/fashion/1.jpg",
      "/assets/img/product/fashion/3.jpg",
    ],
    "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  },
```

MySQL provides some built-in functions to work with JSON data. One of which is `JSON_TABLE` which maps JSON data into a temporary relational table:

```sql
SELECT
      ANY_VALUE(jData.id) AS id,
	    jData.name,
	    GROUP_CONCAT(IFNULL(color, "---") SEPARATOR "-") AS colors,
	    COUNT(color) AS numberOfColors,
      ANY_VALUE(jData.price) AS price,
      ANY_VALUE(IFNULL(STR_TO_DATE(jData.offerEnd, "%M %d, %Y %H:%i:%s"), "---")) AS offerEnd,
      ANY_VALUE(jData.rating) AS rating,
      ANY_VALUE(jData.saleCount) AS saleCount
FROM Products,
	JSON_TABLE(
		data,
		"$[*]"
		COLUMNS (
			id INT PATH "$.id",
			name NVARCHAR(100) PATH "$.name",
            price DECIMAL(13, 2) PATH "$.price",
            tags TEXT PATH "$.tag[*]",
            NESTED PATH "$.variation[*]" COLUMNS (
				color TEXT PATH "$.color"
            ),
            rating INT PATH "$.rating",
            discount FLOAT PATH "$.discount",
            offerEnd TEXT PATH "$.offerEnd",
			saleCount INT PATH "$.saleCount"
		)
	) AS jData
GROUP BY jData.name
ORDER BY id
```

Which returns the following result:

<img class="img-res" src="/img/json_table.png" alt="json_table" />

###

You can find more info on MySQL documentation:
https://dev.mysql.com/doc/refman/8.0/en/json.html
