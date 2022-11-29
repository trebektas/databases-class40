var mysql = require("mysql");
var fs = require("fs");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
});

connection.connect();

const sqlWorld = fs.readFileSync("world.sql").toString();

//Create a database called world with tables and data
connection.query(`${sqlWorld}`, function (error, results) {
  if (error) {
    console.log("Sql file failed to run.");
    throw error;
  }
  console.log("Query run successfully. Tables created.");
});

//Select questions
connection.query(
  "SELECT name FROM country WHERE population>8000000",
  (error, results, fields) => {
    if (error) {
      throw error;
    }
    console.log(
      `-------------------------------------------------------------------`
    );
    console.log(
      `1. What are the names of countries with population greater than 8 million?`
    );
    console.log(results.map((country) => country.name).join(", "));
  }
);

connection.query(
  "SELECT name FROM country WHERE name LIKE '%land%'",
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `-------------------------------------------------------------------`
    );
    console.log(
      `2. What are the names of countries that have “land” in their names?`
    );
    console.log(results.map((country) => country.name).join(", "));
  }
);

connection.query(
  "SELECT name FROM country WHERE population BETWEEN 500000 AND 1000000",
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `-------------------------------------------------------------------`
    );
    console.log(
      `3. What are the names of the cities with population in between 500,000 and 1 million`
    );
    console.log(results.map((city) => city.name).join(", "));
  }
);

connection.query(
  "SELECT name FROM country WHERE continent = 'Europe'",
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `-------------------------------------------------------------------`
    );
    console.log(
      `4. What's the name of all the countries on the continent 'Europe'?`
    );
    console.log(results.map((country) => country.name).join(", "));
  }
);

connection.query(
  "SELECT name FROM country ORDER BY surfacearea DESC",
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `-------------------------------------------------------------------`
    );
    console.log(
      `5. List all the countries in the descending order of their surface areas.`
    );
    console.log(results.map((country) => country.name).join(", "));
  }
);

connection.query(
  "SELECT name FROM city WHERE countrycode='NLD'",
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `-------------------------------------------------------------------`
    );
    console.log(`6. What are the names of all the cities in the Netherlands?`);
    console.log(results.map((city) => city.name).join(", "));
  }
);

connection.query(
  "SELECT population FROM city WHERE name='Rotterdam'",
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `-------------------------------------------------------------------`
    );
    console.log(`7. What is the population of Rotterdam?`);
    console.log(results.map((city) => city.population).join(", "));
  }
);

connection.query(
  "SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10 ",
  (error, results, fields) => {
    if (error) {
      throw error;
    }
    console.log(
      `-------------------------------------------------------------------`
    );
    console.log(`8. What's the top 10 countries by Surface Area?`);
    console.log(results.map((country) => country.name).join(", "));
  }
);

connection.query(
  "SELECT name FROM city ORDER BY population DESC LIMIT 10",
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `-------------------------------------------------------------------`
    );
    console.log(`9. What's the top 10 most populated cities?`);
    console.log(results.map((city) => city.name).join(", "));
  }
);

connection.query("SELECT sum(population) FROM country", (error, results) => {
  if (error) {
    throw error;
  }
  console.log(
    `-------------------------------------------------------------------`
  );
  console.log(`10. What is the population number of the world?`);
  console.log(Object.values(results[0])[0]);
  console.log(
    `-------------------------------------------------------------------`
  );
});

connection.end();
