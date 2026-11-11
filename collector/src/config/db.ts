
import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let database: Db;

export async function connectDatabase(): Promise<Db> {
  const uri = process.env.MONGO_URI;
  const databaseName = process.env.MONGO_DATABASE || "docker_monitoring";

  if (!uri) {
    throw new Error("MONGO_URI is missing from .env");
  }

  try {
    client = new MongoClient(uri);

    await client.connect();

    database = client.db(databaseName);

    await database.command({ ping: 1 });

    console.log("MongoDB Atlas connected successfully");

    return database;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}

export function getDatabase(): Db {
  if (!database) {
    throw new Error("Database is not connected");
  }

  return database;
}

export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
}
