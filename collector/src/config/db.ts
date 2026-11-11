
import {
  MongoClient,
  type Db
} from "mongodb";

let client: MongoClient | null = null;
let database: Db | null = null;

export async function connectDatabase(): Promise<Db> {
  const uri = process.env.MONGO_URI;
  const databaseName =
    process.env.MONGO_DATABASE || "docker_monitor";

  if (!uri) {
    throw new Error("MONGO_URI is missing");
  }

  client = new MongoClient(uri);

  await client.connect();

  database = client.db(databaseName);

  await database.command({ ping: 1 });

  console.log("MongoDB connected successfully");

  return database;
}

export function getDatabase(): Db {
  if (!database) {
    throw new Error("MongoDB is not connected");
  }

  return database;
}

export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    database = null;
    console.log("MongoDB connection closed");
  }
}
