import { connection } from "./connection.js";

//select names of all authors and their corresponding mentors
export const getNamesAuthorsAndMentors = () => {
  connection.query(
    `SELECT A.author_name as authorName, AU.author_name as mentorName 
    FROM authors A 
    LEFT JOIN authors AU ON A.mentor = AU.author_id`,
    (error, results) => {
      if (error) {
        console.log("Could not get names of all authors and mentors");
        throw error;
      }
      console.log("Names of all authors and their corresponding mentors");
      console.log(
        results.map(
          (result) =>
            `Author: ${result.authorName}  &  Mentor: ${result.mentorName}`
        )
      );
    }
  );
};

//select all columns of authors and their published paper_title
export const getPublishedPaper = () => {
  connection.query(
    `SELECT A.*, RP.paper_title 
      FROM authors A 
      LEFT JOIN authors_Researches AR ON A.author_id=AR.author_id
      LEFT JOIN research_Papers RP ON AR.paper_id = RP.paper_id`,
    (error, results) => {
      if (error) {
        console.log(
          "Could not get columns of authors and their published paper_title"
        );
        throw error;
      }
      console.log("All columns of authors and their published paper_title");
      console.log(results);
    }
  );
};
