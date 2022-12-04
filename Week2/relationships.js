import { connection } from "./connection.js";
import { valuesOfAuthors, valuesOfResearchPapers } from "./data.js";

//Create a table called research_Papers
export const createResearchPapers = () => {
  connection.query(
    `CREATE TABLE research_Papers (
        paper_id TINYINT AUTO_INCREMENT, 
        paper_title VARCHAR(255), 
        conference VARCHAR(255), 
        publish_date DATE, 
        author_id TINYINT, 
        PRIMARY KEY (paper_id), 
        FOREIGN KEY (author_id) REFERENCES authors(author_id)
    )`,
    (error, results) => {
      if (error) {
        console.log("research_Papers table already exists");
        throw error;
      }
      console.log("research_Papers table created");
    }
  );
};

export const insertData = () => {
  //insert function for table values
  const insertIntoTable = (tableName, insertSql, insertValues) => {
    connection.query(insertSql, [insertValues], (err, result) => {
      if (err) throw err;
      console.log(
        `Number of records inserted into ${tableName} Table: ${result.affectedRows}`
      );
    });
  };

  //Sql query and values for authors table
  const insertSqlOfAuthors = `INSERT INTO authors (
        author_name, 
        university, 
        date_of_birth, 
        h_index, 
        gender, 
        mentor
    ) VALUES ?`;

  //Sql query and values for research_Papers table
  const insertSqlOfResearchPapers = `INSERT INTO research_Papers (
        paper_title, 
        conference, 
        publish_date, 
        author_id
    ) VALUES ?`;

  insertIntoTable("authors", insertSqlOfAuthors, valuesOfAuthors);
  insertIntoTable(
    "research_Papers",
    insertSqlOfResearchPapers,
    valuesOfResearchPapers
  );
};
