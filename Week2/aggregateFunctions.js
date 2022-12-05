import { connection } from "./connection.js";
import { selectQueriesData } from "./data.js";

//execute query for each request
export const executeSelectQueries = () => {
  selectQueriesData.forEach((item) => {
    connection.query(item.selectQuery, (error, results) => {
      if (error) {
        console.log(`Could not get select query for >> ${item.request}`);
        throw error;
      }
      console.log("=========================================");
      console.log(item.request);
      console.log(results);
    });
  });
};
