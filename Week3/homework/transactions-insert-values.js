import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transactions",
});

//Set autocommit
export const setAutocommit = () => {
  connection.query(`SET autocommit = 0`, (error, results) => {
    if (error) {
      console.log("auto-commit failed to set");
      throw error;
    }
    console.log("auto-commit set");
  });
};

//Start transaction
export const startTransaction = () => {
  connection.query(`START TRANSACTION`, (error, results) => {
    if (error) {
      console.log("transaction failed to start");
      throw error;
    }
    console.log("transaction started");
  });
};

//Commit
export const commit = () => {
  connection.query(`COMMIT`, (error, results) => {
    if (error) {
      console.log("commit failed");
      throw error;
    }
    console.log("commit completed successfully");
  });
};

//Rollback
export const rollback = () => {
  connection.query(`ROLLBACK`, (error, results) => {
    if (error) {
      console.log("rollback failed");
      throw error;
    }
    console.log("rollback completed successfully");
  });
};

//Sql query and values for account table
const accountSql = `INSERT INTO account (
    account_number, 
    balance
) VALUES ?`;

//Sql query and values for account_changes table
const accountChangesSql = `INSERT INTO account_changes (
    account_number, 
    amount, 
    changed_date, 
    remark
) VALUES ?`;

//[account_number, balance]
const dataAccounts = [
  [100, 1500],
  [101, 2250],
  [102, 2700],
  [103, 1100],
  [104, 3350],
  [105, 1600],
];

//[change_number, amount, changed_date, remark]
const dataAccountChanges = [
  [100, -1500, "2022-12-01", "Electricity"],
  [103, 2250, "2022-12-02", "Salary-December"],
  [104, 2700, "2022-12-08", "Lottery"],
  [103, -1100, "2022-12-08", "For cleaning supplies"],
  [104, 3350, "2022-12-10", "Salary-December"],
  [105, -1600, "2022-12-11", "Mobile phone"],
];

//insert function for table values
const insertIntoTable = (tableName, insertSql, insertValues) => {
  connection.query(insertSql, [insertValues], (err, result) => {
    if (err) throw err;
    console.log(
      `Number of records inserted into ${tableName} Table: ${result.affectedRows}`
    );
  });
};

connection.connect();

try {
  setAutocommit();
  startTransaction();
  insertIntoTable("account", accountSql, dataAccounts);
  insertIntoTable("account_changes", accountChangesSql, dataAccountChanges);
  commit();
} catch (error) {
  rollback();
  console.log(error);
}

connection.end();
