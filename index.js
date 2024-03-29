const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb+srv://rstreamingentertainment:RSTREAMING%401234@cluster0.lqhakio.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to the database');
    const database = client.db('movies');
    const collections = await database.listCollections().toArray();

    const allData = [];

    for (const collection of collections) {
      const collectionName = collection.name;
      const collectionData = await database.collection(collectionName).find().toArray();
      // console.log(`${collectionName}:`, collectionData);
      allData.push({ collectionName, collectionData });
    }

    res.json(allData);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
