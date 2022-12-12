import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}

connection.connect();

getPopulation(
  "country",
  "Netherlands",
  "NLD'; SELECT * FROM country WHERE '1=1",
  console.log
);

connection.end();
