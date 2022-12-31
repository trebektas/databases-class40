# Homework Databases Week 3

## Database exercises

### Exercise 3 : SQL injection

1. Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)

- Example => We can construct a structure that will return true in the where condition.

  ```
  getPopulation("country", "Netherlands' OR '1=1", "NLD' OR '1=1", console.log);
  ```

- Another Example => Or we can use an additional query in the where condition

  ```
  getPopulation("country","Netherlands","NLD'; SELECT * FROM country WHERE '1=1",console.log);
  ```

2. Rewrite the function so that it is no longer vulnerable to SQL injection

```
function getPopulation(table, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  connection.query(
    `SELECT * FROM ?? WHERE Name = ? and code = ?`,
    [table, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(result[0].Name, result[0].Population);
    }
  );
}

getPopulation("country", "Netherlands", "NLD", console.log);
```
