import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";
import accountsData from "./accountsData.json" assert { type: "json" };
import accountChangesData from "./accountChangesData.json" assert { type: "json" };
import { createDocuments } from "./setup.js";
import { transferCredits } from "./transfer.js";

dotenv.config();

const main = async () => {
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

  const accountsCollection = client.db("transactions").collection("accounts");
  const accountChangesCollection = client
    .db("transactions")
    .collection("account_changes");

  try {
    //Connect to the MongoDB cluster
    await client.connect();

    //Create documents for account and account_changes
    await createDocuments(client, "accounts", accountsCollection, accountsData);
    await createDocuments(
      client,
      "account_changes",
      accountChangesCollection,
      accountChangesData
    );
    await transferCredits(
      client,
      accountsCollection,
      accountChangesCollection,
      105,
      102,
      800
    );
  } finally {
    //Close the connection to the MongoDB cluster
    await client.close();
  }
};

main().catch(console.error);
