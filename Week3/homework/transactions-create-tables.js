import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();

//Drop database if exists
connection.query("DROP DATABASE IF EXISTS transactions", (error, results) => {
  if (error) {
    throw error;
  }
});

//Create a database called research
connection.query("CREATE DATABASE transactions", (error, results) => {
  if (error) {
    console.log("transactions database already exists");
    throw error;
  }
  console.log("transactions database created");
});

//Make a connection to research
connection.changeUser({ database: "transactions" }, (err) => {
  if (err) {
    console.log("transactions database not found");
    throw err;
  }
});

//Create a table called account
const createAccount = () => {
  connection.query(
    `CREATE TABLE account (
        account_number INT NOT NULL, 
        balance INT NOT NULL,
        PRIMARY KEY (account_number))`,
    (error, results) => {
      if (error) {
        console.log("account table already exists");
        throw error;
      }
      console.log("account table created");
    }
  );
};

//Create a table called account_changes
const createAccountChanges = () => {
  connection.query(
    `CREATE TABLE account_changes (
        change_number INT NOT NULL AUTO_INCREMENT, 
        account_number INT NOT NULL,
        amount INT NOT NULL,
        changed_date DATE NOT NULL,
        remark VARCHAR(255),
        PRIMARY KEY (change_number),
        FOREIGN KEY (account_number) REFERENCES account(account_number))`,
    (error, results) => {
      if (error) {
        console.log("account_changes table already exists");
        throw error;
      }
      console.log("account_changes table created");
    }
  );
};

try {
  createAccount();
  createAccountChanges();
} catch (error) {
  console.log(error);
}

connection.end();
