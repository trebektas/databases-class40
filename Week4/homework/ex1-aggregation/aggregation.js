import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  //get total population (M + F over all age groups) for a given Country per year
  const getCountryTotalPopulationGroupByYear = async (client, country) => {
    const pipeline = [
      {
        $match: {
          Country: country,
        },
      },
      {
        $project: {
          Year: "$Year",
          Country: "$Country",
          Total: {
            $sum: ["$M", "$F"],
          },
        },
      },
      {
        $group: {
          _id: "$Year",
          countPopulation: {
            $sum: "$Total",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];

    const aggCursor = client
      .db("databaseWeek4")
      .collection("population_pyramid")
      .aggregate(pipeline);

    const resultArray = [];

    await aggCursor.forEach((populationListing) => {
      const resultObject = {
        _id: populationListing._id,
        countPopulation: populationListing.countPopulation,
      };

      resultArray.push(resultObject);
    });
    console.log(
      `2. Write a function that will return the array of the total population (M + F over all age groups) for a given Country per year.`
    );
    console.log(resultArray);
  };

  //get all of the information of each continent for a given Year and Age field
  const getInformationOfEachContinent = async (client, year, age) => {
    const pipeline = [
      {
        $match: {
          Country: {
            $in: [
              "AFRICA",
              "ASIA",
              "EUROPE",
              "LATIN AMERICA AND THE CARIBBEAN",
              "NORTHERN AMERICA",
              "OCEANIA",
            ],
          },
          Year: year,
          Age: age,
        },
      },
      {
        $addFields: {
          TotalPopulation: {
            $sum: ["$M", "$F"],
          },
        },
      },
    ];

    const aggCursor = client
      .db("databaseWeek4")
      .collection("population_pyramid")
      .aggregate(pipeline);

    const resultArray = [];

    await aggCursor.forEach((continentListing) => {
      const resultObject = {
        _id: continentListing._id,
        Country: continentListing.Country,
        Year: continentListing.Year,
        Age: continentListing.Age,
        M: continentListing.M,
        F: continentListing.F,
        TotalPopulation: continentListing.TotalPopulation,
      };

      resultArray.push(resultObject);
    });

    console.log(
      `3. Write a function that will return all of the information of each continent for a given Year and Age field but add a new field TotalPopulation that will be the addition of M and F.`
    );
    console.log(resultArray);
  };

  try {
    await client.connect();
    //get total population for Netherlands
    await getCountryTotalPopulationGroupByYear(client, "Netherlands");
    //get the information of each continent in 2020 for age 100+
    await getInformationOfEachContinent(client, 2020, "100+");
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();
