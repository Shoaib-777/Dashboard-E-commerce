const { MongoClient } = require("mongodb");

// Reuse MongoDB client connection
let cachedClient = null;
let cachedDb = null;

export const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db('E-commerce3');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
};
