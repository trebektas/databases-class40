export const transferCredits = async (
  client,
  accountsCollection,
  accountChangesCollection,
  fromAccountNumber,
  toAccountNumber,
  amount
) => {
  const session = client.startSession();

  const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };

  //aggregation pipeline
  const pipeline = [
    {
      $sort: {
        change_number: -1,
      },
    },
    {
      $limit: 1,
    },
  ];

  //get the last change number
  const getLastChangeNumber = async () => {
    const lastDocumentCursor = accountChangesCollection.aggregate(pipeline);
    const resultArray = [];
    await lastDocumentCursor.forEach((item) => {
      const resultObject = {
        lastChangeNumber: item.change_number,
      };

      resultArray.push(resultObject);
    });

    return resultArray[0].lastChangeNumber;
  };

  try {
    await session.withTransaction(async () => {
      // Remove from fromAccount
      const fromAccountUpdateResults = await accountsCollection.updateOne(
        { account_number: fromAccountNumber },
        { $inc: { balance: amount * -1 } },
        { session }
      );

      console.log(
        `account table updated for account number ${fromAccountNumber}`
      );

      // Add to toAccount
      const toAccountUpdateResults = await accountsCollection.updateOne(
        { account_number: toAccountNumber },
        { $inc: { balance: amount } },
        { session }
      );

      console.log(
        `account table updated for account number ${toAccountNumber}`
      );

      //create last change_number variable
      let lastChangeNumber = await getLastChangeNumber();

      //create insert document variable
      const insertDocument = {
        change_number: lastChangeNumber + 1,
        amount: amount,
        changed_date: { $date: new Date() },
        remark: `Transfer ${amount} from account number ${fromAccountNumber} to account number ${toAccountNumber} for transfer`,
      };

      // insert document to account_changes
      await accountChangesCollection.insertOne(insertDocument);
      console.log(`insert a document to account_changes table`);
    }, transactionOptions);
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
};
