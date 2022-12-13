import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";
import { seedDatabase } from "./seedDatabase.js";

dotenv.config();

async function createEpisodeExercise(client) {
  const resultInsert = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .insertOne({
      episode: "S09E13",
      title: "MOUNTAIN HIDE-AWAY",
      elements: [
        "CIRRUS",
        "CLOUDS",
        "CONIFER",
        "DECIDIOUS",
        "GRASS",
        "MOUNTAIN",
        "MOUNTAINS",
        "RIVER",
        "SNOWY_MOUNTAIN",
        "TREE",
        "TREES",
      ],
    });

  console.log(
    `Created season 9 episode 13 and the document got the id ${resultInsert.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]
  const resultTitle = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ episode: "S02E02" });

  console.log(`The title of episode 2 in season 2 is ${resultTitle.title}`);

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]
  const resultEpisode = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ title: "BLACK RIVER" });

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${resultEpisode.episode}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]
  const resultsOfCliffEpisodes = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: { $in: ["CLIFF"] } });
  const titlesOfCliffEpisodes = await resultsOfCliffEpisodes.toArray();
  const resultOfEpisode = titlesOfCliffEpisodes
    .map((item) => item.title)
    .join(", ");
  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${resultOfEpisode}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]
  const resultsOfCliffAndLighthouseEpisodes = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } });
  const titlesOfCliffAndLighthouseEpisodes =
    await resultsOfCliffAndLighthouseEpisodes.toArray();
  const resultOfCliffAndLighthouseEpisodes = titlesOfCliffAndLighthouseEpisodes
    .map((item) => item.title)
    .join(", ");
  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${resultOfCliffAndLighthouseEpisodes}`
  );
}

async function updateEpisodeExercises(client) {
  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that
  const resultUpdateOne = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateOne({ episode: "S30E13" }, { $set: { title: "BLUE RIDGE FALLS" } });
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${resultUpdateOne.modifiedCount} episodes`
  );

  // Unfortunately we made a mistake in the arrays and the element type called 'BUSHES' should actually be 'BUSH' as sometimes only one bush was painted.
  // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
  // It should update 120 episodes!
  const resultsUpdateMany = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateMany(
      { elements: "BUSHES" },
      { $set: { "elements.$[i]": "BUSH" } },
      { arrayFilters: [{ i: "BUSHES" }] }
    );
  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${resultsUpdateMany.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  const resultDeleteOne = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .deleteOne({ episode: "S31E14" });

  console.log(
    `Ran a command to delete episode and it deleted ${resultDeleteOne.deletedCount} episodes`
  );
}

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

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();
