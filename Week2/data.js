//[author_name, university, date_of_birth, h_index, gender, mentor]
export const valuesOfAuthors = [
  ["Stephen King", "University of Cambridge", "1947-09-21", 77, "M", null],
  ["J.K. Rowling", "Stanford University", "1965-07-31", 59, "F", 1],
  ["John Green", "University of Amsterdam", "1977-08-24", 44, "M", 1],
  ["Elif Shafak", "University of Oxford", "1971-10-25", 63, "F", 3],
  ["Alice Walker", "Harvard University", "1944-02-09", 71, "F", 4],
  ["Khaled Hosseini", "University of Amsterdam", "1965-03-04", 25, "M", 2],
  ["Brian Evenson", "Harvard University", "1966-08-12", 37, "M", 1],
  ["Kazuo Ishiguro", "University of Cambridge", "1954-11-08", 19, "M", 3],
  ["Marilynne Robinson", "University of Oxford", "1943-11-26", 87, "F", 2],
  ["Jerry Jenkins", "University of Amsterdam", "1949-09-23", 47, "M", 4],
  ["Michael Chabon", "Harvard University", "1963-05-24", 23, "M", 3],
  ["Rachel Kushner", "University of Oxford", "1968-10-07", 68, "F", 2],
  ["George Saunders", "Stanford University", "1958-12-02", 91, "M", 1],
  ["Jonathan Franzen", "Stanford University", "1959-08-17", 71, "M", 5],
  ["Mark Manson", "University of Cambridge", "1984-03-09", 52, "M", 4],
];

//[paper_title, conference, publish_date, author_id]
export const valuesOfResearchPapers = [
  [
    "Has big data changed our lives for the better?",
    "Broadband Talking Points",
    "1980-08-12",
  ],
  [
    "Neural networks are algorithms that can learn to solve problems",
    "Zoom Mountain",
    "1995-07-13",
  ],
  [
    "The current state of cryptography and how it may develop",
    "Millennial Babies",
    "1997-04-02",
  ],
  [
    "The pros and cons of transitioning to cloud technologies",
    "Keys on Main",
    "1989-10-25",
  ],
  [
    "What issues does automation raise, and how can they be solved?",
    "The National Chat",
    "2004-02-19",
  ],
  [
    "Should we keep using multi-factor authentication?",
    "The Virtual Room",
    "2015-01-24",
  ],
  [
    "Are big tech companies monopolistic in their behaviors?",
    "Remote Talks",
    "1996-11-13",
  ],
  [
    "Is remote work the future of office jobs employment?",
    "The Golden Arch",
    "2014-12-08",
  ],
  [
    "The pros and cons of software ownership vs. subscription models",
    "Online Sphere",
    "1993-01-26",
  ],
  [
    "Explore the evolution of wireless communication standards and their implications",
    "The Digital Ninjas",
    "1999-09-19",
  ],
  [
    "Describe the Internet of things and its effects on security",
    "It's 5 O'Clock World",
    "2013-05-14",
  ],
  [
    "The issues of IPv4 and the adoption of IPv6",
    "Friends Of Central Perk",
    "2018-10-08",
  ],
  [
    "How do computers manage to generate random numbers?",
    "The Virtual Gateway",
    "1988-12-02",
  ],
  [
    "The infrastructure and contingencies of the World Wide Web",
    "The Chicago Sports Team",
    "1999-04-27",
  ],
  [
    "Are computers entirely unbiased in their treatment of people?",
    "The Online Beliebers",
    "1984-10-04",
  ],
  ["COVID-19's Effect on Medical Technology", "The Vocal Arena", "2007-09-27"],
  [
    "Online Education's Effect on Learning",
    "Torque Zoom Meeting Room",
    "1999-01-03",
  ],
  [
    "Video Gaming as a Solution to World Problems",
    "Hipster Babies",
    "2017-08-22",
  ],
  [
    "Children's Use of Technology and Social Media",
    "Online Work Culture",
    "2001-10-15",
  ],
  ["The Pros and Cons of Human Cloning", "The Palace of Harmony", "1984-11-04"],
  [
    "The Implications of Human Identity Chips",
    "Virtual Coffee Meet Up",
    "1996-06-06",
  ],
  ["Technology's Effect on Fertility", "The Digital Conference", "2016-08-21"],
  ["The Morality of Genetic Engineering", "Online Projects", "1994-11-18"],
  ["Digital Voting Risks and Rewards", "Digital Ideas Hall", "2003-11-16"],
  [
    "Genetically Modified Food As a Solution to World Hunger",
    "Decisions HQ",
    "2013-02-23",
  ],
  [
    "The effects of Artificial Intelligence on complex and tedious tasks",
    "The Rolling Scones",
    "1987-05-01",
  ],
  [
    "What are the limitations to the study of computer architecture in colleges?",
    "Rocking Room",
    "2006-10-29",
  ],
  [
    "What are the emerging fields of study in computer data science?",
    "The Thinking Space",
    "2020-12-19",
  ],
  [
    "How is machine learning exposing students to more recent opportunities in life?",
    "Tune Arena",
    "2004-08-31",
  ],
  [
    "How are marketers and promoters taking up software as a service?",
    "The Alpha Room",
    "1994-04-02",
  ],
];

//[author_id, paper_id ]
export const valuesOfAuthorsResearches = [
  [11, 1],
  [10, 13],
  [4, 25],
  [13, 7],
  [1, 19],
  [15, 21],
  [12, 3],
  [3, 15],
  [5, 27],
  [14, 9],
  [11, 11],
  [2, 23],
  [6, 5],
  [9, 17],
  [8, 29],
  [12, 2],
  [3, 14],
  [10, 26],
  [4, 8],
  [13, 10],
  [1, 22],
  [15, 4],
  [3, 16],
  [5, 28],
  [14, 30],
  [11, 12],
  [2, 24],
  [6, 6],
  [9, 18],
  [8, 20],
  [7, 17],
  [1, 17],
  [3, 21],
  [15, 5],
  [13, 21],
  [12, 24],
];

//[{request, selectQuery}...]
export const selectQueriesData = [
  {
    request:
      "1- All research papers and the number of authors that wrote that paper.",
    selectQuery: `SELECT RP.paper_title, COUNT(AR.author_id) 
    FROM research_Papers RP 
    LEFT JOIN authors_Researches AR ON RP.paper_id = AR.paper_id 
    GROUP BY RP.paper_title`,
  },
  {
    request: "2- Sum of the research papers published by all female authors.",
    selectQuery: `SELECT COUNT(*) AS SumPapersByFemale
    FROM authors_Researches AR
    INNER JOIN research_Papers RP ON RP.paper_id = AR.paper_id
    INNER JOIN authors A ON A.author_id = AR.author_id AND A.gender = 'F'`,
  },
  {
    request: "3- Average of the h-index of all authors per university.",
    selectQuery: `select university, AVG(h_index) from authors group by university`,
  },
  {
    request: "4- Sum of the research papers of the authors per university.",
    selectQuery: `SELECT university, COUNT(ar.paper_id) FROM authors A INNER JOIN authors_researches AR ON A.author_id=AR.author_id GROUP BY university`,
  },
  {
    request:
      "5- Minimum and maximum of the h-index of all authors per university.",
    selectQuery: `SELECT university, MAX(h_index), MIN(h_index) FROM authors GROUP BY university`,
  },
];
