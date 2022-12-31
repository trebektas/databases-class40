import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transactions",
  multipleStatements: true,
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

//Commit & Rollback
export const resultOfTransaction = (query) => {
  connection.query(query, (error, results) => {
    if (error) {
      console.log(`${query} failed`);
      throw error;
    }
    console.log(`${query} completed successfully`);
  });
};

//Update sql query for transfer from account to another account
const updateAccounts = (amount, sender, receiver) => {
  const senderAccountSql = `UPDATE account SET balance = balance-${amount} where account_number=${sender};`;
  const receiverAccountSql = `UPDATE account SET balance = balance+${amount} where account_number=${receiver}`;

  connection.query(senderAccountSql + receiverAccountSql, (err, result) => {
    if (err) throw err;
    console.log(`Accounts updated!`);
  });
};

const insertChangeLogs = (amount, sender, receiver) => {
  const insertLogsSql = `INSERT INTO account_changes (
        account_number, 
        amount, 
        changed_date, 
        remark
    ) VALUES (${sender},-${amount},curdate(),"1000 was sent from account 101 to account 102");
    INSERT INTO account_changes (
        account_number, 
        amount, 
        changed_date, 
        remark
    ) VALUES (${receiver},${amount},curdate(),"1000 was received from account 101 to account 102")`;
  connection.query(insertLogsSql, (err, result) => {
    if (err) throw err;
    console.log(`Change logs inserted!`);
  });
};

connection.connect();

try {
  setAutocommit();
  startTransaction();
  updateAccounts(1000, 101, 102);
  insertChangeLogs(1000, 101, 102);
  resultOfTransaction("COMMIT");
} catch (error) {
  resultOfTransaction("ROLLBACK");
  console.log(error);
}

connection.end();
