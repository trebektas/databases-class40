export const createDocuments = async (client, tableName, collection, data) => {
  const hasCollection = await client
    .db("transactions")
    .listCollections({ name: tableName })
    .hasNext();

  if (hasCollection) {
    // Remove all the documents
    await collection.deleteMany({});
  }

  // Add our documents
  await collection.insertMany(data);
};
