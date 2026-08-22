# Importing JSON files into SQL Server

I was assigned to a task to import a GeoJSON file into a SQL Server database. The file was pretty big; I couldn't even open the file in an editor. At first, I wanted to write a simple program (with C# or Python) to open the file and then loop through the entries, ...

- Published: 2019-09-18
- Language: en
- Tags: SQL Server, TSQL
- Canonical: https://sirwan.info/blog/en/Importing-JSON-files-into-SQL-Server

---

I was assigned to a task to import a [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) file into a SQL Server database. The file was pretty big; I couldn't even open the file in an editor. At first, I wanted to write a simple program (with C# or Python) to open the file and then loop through the entries, parse each one of the entry and then save it into the database. But it would have taken time if I followed that process. All I wanted to do was save a JSON file right into the database. That's where I gave `OPENROWSET` a try. Everything went well, and I successfully saved the file into the database:

```sql
DECLARE @GeoJSON nvarchar(max)

SELECT @GeoJSON = BulkColumn
 FROM OPENROWSET (BULK 'C:\areas.json', SINGLE_CLOB) as j

INSERT INTO dbo.Areas (Area,Coordinates)
SELECT
	Area,
	Coordinates
FROM
    OPENJSON(@GeoJSON, '$.features')
             WITH (
                 Area varchar(50) '$.properties.name',
                 Coordinates nvarchar(max) '$.geometry.coordinates' as JSON
                 )
```

As you might already know, the `OPENROWSET` is a table value function which returns a table with a single column called `Bulk`. What above code does is first open the JSON file and assign it to a variable called `GeoJSON`. Then I used another table value column called `OPENJSON` to parse the JSON. The first thing we can do is to set our root element, which is `features` in my case. Then elements can be referenced with the prefix `$`. There are two important things to mention. First, if you want to save a JSON element into a string column you will need to make sure the column type is `nvarchar(max)` and you add `as JSON` inside the `WITH` clause for that specific column.

You can also build a geography value if you have a column with that type:

```sql
DECLARE @GeoJSON nvarchar(max)

SELECT @GeoJSON = BulkColumn
 FROM OPENROWSET (BULK 'C:\areas.json', SINGLE_CLOB) as j

INSERT INTO dbo.Areas (Area,Coordinates)
SELECT
	Area,
	Coordinates,
    geography::STPointFromText('POINT (' + Longitude + ' ' + Latitude + ')', 4326) AS Geography,
    Longitude,
    Latitude
FROM
    OPENJSON(@GeoJSON, '$.features')
             WITH (
                 Area varchar(50) '$.properties.name',
                 Coordinates nvarchar(max) '$.geometry.coordinates' as JSON,
                 Longitude varchar(100) '$.lon',
                 Latitude varchar(100) '$.lat'
                 )
```
