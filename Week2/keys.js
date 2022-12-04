import { connection } from "./connection.js";

//Create a table called authors
export const createAuthors = () => {
  connection.query(
    `CREATE TABLE authors (
      author_id TINYINT AUTO_INCREMENT, 
      author_name VARCHAR(255), 
      university VARCHAR(255), 
      date_of_birth DATE, 
      h_index INT, 
      gender ENUM('M', 'F') NOT NULL, 
      PRIMARY KEY (author_id))`,
    (error, results) => {
      if (error) {
        console.log("authors table already exists");
        throw error;
      }
      console.log("authors table created");
    }
  );
};

//alter authors table to add mentor column
export const addMentor = () => {
  connection.query(
    `ALTER TABLE authors 
    ADD mentor TINYINT, 
    ADD FOREIGN KEY (mentor) REFERENCES authors(author_id)`,
    (error, results) => {
      if (error) {
        console.log("Could not add mentor column to authors table");
        throw error;
      }
      console.log("Added mentor column to authors table");
    }
  );
};
