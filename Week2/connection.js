import mysql from "mysql";
import { createAuthors, addMentor } from "./keys.js";
import {
  createResearchPapers,
  createAuthorsResearch,
  insertData,
} from "./relationships.js";
import { getNamesAuthorsAndMentors, getPublishedPaper } from "./joins.js";
import { executeSelectQueries } from "./aggregateFunctions.js";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();

//Drop database if exists
connection.query("DROP DATABASE IF EXISTS research", (error, results) => {
  if (error) {
    throw error;
  }
});

//Create a database called research
connection.query("CREATE DATABASE research", (error, results) => {
  if (error) {
    console.log("research database already exists");
    throw error;
  }
  console.log("research database created");
});

//Make a connection to research
connection.changeUser({ database: "research" }, (err) => {
  if (err) {
    console.log("research database not found");
    throw err;
  }
});

//Create a table called authors
createAuthors();
//alter authors table to add mentor column
addMentor();
//Create a table called research_Papers
createResearchPapers();
//Create a table for Authors' Research Papers
createAuthorsResearch();
//Insert data from data.js
insertData();
//select names of all authors and mentors
getNamesAuthorsAndMentors();
//select all columns of authors and their published paper_title
getPublishedPaper();
//execute select queries for Exercise 4: Aggregate Functions
executeSelectQueries();

connection.end();
