var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

//Make a connection to mysql with user
connection.connect();

//Drop database if exists
connection.query("DROP DATABASE IF EXISTS meetup", (error, results) => {
  if (error) throw error;
});

//Create a database called meetup
connection.query("CREATE DATABASE meetup", (error, results) => {
  if (error) {
    console.log("Database already exists");
    throw error;
  }
  console.log("Database created");
});

//Make a connection to meetup
connection.changeUser({ database: "meetup" }, (err) => {
  if (err) {
    console.log("Database not found");
    throw err;
  }
});

//Create tables (Invitee, Room, Meeting)
const sqlInviteeTable =
  "CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT, invitee_name VARCHAR(255), invited_by VARCHAR(255), PRIMARY KEY (invitee_no))";
const sqlRoomTable =
  "CREATE TABLE Room (room_no INT AUTO_INCREMENT, room_name VARCHAR(255), floor_number INT, PRIMARY KEY (room_no))";
const sqlMeetingTable =
  "CREATE TABLE Meeting (meeting_no INT AUTO_INCREMENT, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT, PRIMARY KEY (meeting_no), FOREIGN KEY (room_no) REFERENCES Room(room_no))";

//create function for tables
const createTable = (tableName, tableSql) => {
  connection.query(tableSql, (err, result) => {
    if (err) throw err;
    console.log(`${tableName} Table created`);
  });
};

createTable("Invitee", sqlInviteeTable);
createTable("Room", sqlRoomTable);
createTable("Meeting", sqlMeetingTable);

//Insert 5 rows into each table
//Sql query and values for Invitee Table
const insertSqlOfInvitee =
  "INSERT INTO Invitee (invitee_name, invited_by) VALUES ?";
const valuesOfInvitee = [
  ["Lucy", "Paul"],
  ["George", "Victoria"],
  ["John", "Paul"],
  ["Isabella", "Sophia"],
  ["James", "Sophia"],
];

//Sql query and values for Room Table
const insertSqlOfRoom = "INSERT INTO Room (room_name, floor_number) VALUES ?";
const valuesOfRoom = [
  ["Room-North", 1],
  ["Room-East", 2],
  ["Room-South", 2],
  ["Room-West", 3],
  ["Room-Center", 1],
];

//Sql query and values for Meeting Table
const insertSqlOfMeeting =
  "INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ?";

const valuesOfMeeting = [
  ["Global Warming", "2022-12-12 10:00", "2022-12-12 13:00", 2],
  ["World Peace", "2022-12-29 13:00", "2022-12-29 18:00", 1],
  ["international Space Station", "2023-01-26 10:00", "2023-01-26 14:00", 3],
  ["Economy", "2023-02-02 14:00", "2023-02-02 16:00", 5],
  ["Human Health", "2023-06-12 14:00", "2023-06-12 15:30", 4],
];

//insert function for table values
const insertIntoTable = (tableName, insertSql, insertValues) => {
  connection.query(insertSql, [insertValues], (err, result) => {
    if (err) throw err;
    console.log(
      `Number of records inserted into ${tableName} Table: ${result.affectedRows}`
    );
    console.log;
  });
};

insertIntoTable("Invitee", insertSqlOfInvitee, valuesOfInvitee);
insertIntoTable("Room", insertSqlOfRoom, valuesOfRoom);
insertIntoTable("Meeting", insertSqlOfMeeting, valuesOfMeeting);

connection.end();
