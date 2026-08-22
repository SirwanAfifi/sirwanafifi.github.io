# Getting Started With Sequelize

Sequelize is an Object Relational Mapper (ORM) which enables us to query and manipulate data stored in a relational database. There are several ORM for Node.js out there...

- Published: 2020-10-12
- Language: en
- Tags: Node.js, Sequelize
- Canonical: https://sirwan.info/blog/en/getting-started-with-sequelize

---

Sequelize is an Object Relational Mapper (ORM) which enables us to query and manipulate data stored in a relational database. There are several ORM for Node.js out there. Sequelize is one of them and it's pretty popular. In this short tutorial we will have a quick look at Sequelize then we will write a simple Node.js application to connect to a MySQL database.

## Setting up the project

To start off, head over to command line and type the following commands to initialise the project:

```js
take sequelize_todo
yarn init -y
yarn add sequelize mysql2 dotenv ts-node typescript -D
```

Next, create a file called `dbConnection.ts` in the root of the project:

```js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: +process.env.DATABASE_PORT || 3306,
});

export const database = {
  sequelize,
};
```

As you can see we have constructed an object using `Sequelize` constructor. This class needs some options which are required to connect to our MySQL database (that's why we have set `dialect` to "mysql". You can changes that to connect to other relational databases like SQL server, ...). Then we exported the newly created object.

Next, create an `index.ts` file in the root of the project:

```js
import * as dotenv from "dotenv";
dotenv.config();
import { database } from "./dbConnection";
(async () => {
  await database.sequelize.sync();
})();
```

The first couple of lines are used to load `.env` file into `process.env`. This means that we will need to create another file in the root of the project to define our secret values:

```js
DATABASE_HOST = localhost;
DATABASE_USERNAME = root;
DATABASE_PASSWORD = PASSWORD;
DATABASE_NAME = DBNAME;
DATABASE_PORT = 3306;
```

**NOTE**: Make sure you gitignore the `.env` file before pushing the code into remote repository.

## Creating your first entity

Now we need to define our entity which is an abstraction that represents a table in your database. An entity is just a class that extends `Model`. So let's create a directory called `models` then create a file called `User.ts` inside that directory:

```js
import * as Sequelize from "sequelize";

class User extends Sequelize.Model {
  username: string;
  createdAt: Date;
}
export const InitUser = (sequelize: Sequelize.Sequelize) => {
  User.init(
    {
      username: Sequelize.DataTypes.STRING,
      createdAt: Sequelize.DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "Users",
    }
  );
};
```

To define our entity and its properties (Columns) we need to have access to the `sequelize` object which we exported previously. So let's head over to the `dbConnection.ts` file and update the file by passing `sequelize` object to the `InitUser` (which we have just exported):

```js
export const database = {
  sequelize,
  User: InitUser(sequelize),
};
```

Now if you run the project `ts-node index.ts` you will get this error:

```js
(node:11377) UnhandledPromiseRejectionWarning: SequelizeConnectionError: Unknown database 'sequelize_sample'
```

It's because Sequelize doesn't know how to created the database so it needs a database to start with. So let's create the schema in MySQL:

```sql
CREATE SCHEMA `sequelize_sample` ;
```

Now if you run the project one more time, Sequelize is able to create the table for you:

```js
Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255), `createdAt` DATETIME, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW FULL COLUMNS FROM `Users`;
Executing (default): SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Users' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='sequelize_sample' AND REFERENCED_TABLE_NAME IS NOT NULL;
Executing (default): ALTER TABLE `Users` CHANGE `username` `username` VARCHAR(255);
Executing (default): ALTER TABLE `Users` CHANGE `createdAt` `createdAt` DATETIME;
Executing (default): ALTER TABLE `Users` CHANGE `updatedAt` `updatedAt` DATETIME NOT NULL;
Executing (default): SHOW INDEX FROM `Users` FROM `sequelize_sample`
```

In the next blog post I will explain how to query and manipulate data. You can find the code here on GitHub. (https://github.com/SirwanAfifi/sequelize_sample)
