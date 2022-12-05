import { connection } from "./connection.js";
import {
  valuesOfAuthors,
  valuesOfResearchPapers,
  valuesOfAuthorsResearches,
} from "./data.js";

//Create a table called research_Papers
export const createResearchPapers = () => {
  connection.query(
    `CREATE TABLE research_Papers (
        paper_id TINYINT AUTO_INCREMENT, 
        paper_title VARCHAR(255), 
        conference VARCHAR(255), 
        publish_date DATE,
        PRIMARY KEY (paper_id)
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

//Create a table for Authors' Research Papers
export const createAuthorsResearch = () => {
  connection.query(
    `CREATE TABLE authors_Researches (
        id TINYINT AUTO_INCREMENT,  
        author_id TINYINT, 
        paper_id TINYINT,
        PRIMARY KEY (id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
    )`,
    (error, results) => {
      if (error) {
        console.log("authors_Researches table already exists");
        throw error;
      }
      console.log("authors_Researches table created");
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
        publish_date
    ) VALUES ?`;

  //Sql query and values for authors_Researches table
  const insertSqlOfAuthorsResearches = `INSERT INTO authors_Researches (
        author_id, 
        paper_id
    ) VALUES ?`;

  insertIntoTable("authors", insertSqlOfAuthors, valuesOfAuthors);
  insertIntoTable(
    "research_Papers",
    insertSqlOfResearchPapers,
    valuesOfResearchPapers
  );
  insertIntoTable(
    "authors_Researches",
    insertSqlOfAuthorsResearches,
    valuesOfAuthorsResearches
  );
};
