
import { getDatabase } from "../config/db.js";

export async function setupRetention(): Promise<void> {
  const db = getDatabase();

  const retentionCollections = [
    "monitoring_logs",
    "monitoring_metrics",
    "container_events"
  ];

  for (const name of retentionCollections) {
    await db.collection(name).createIndex(
      { ingestedAt: 1 },
      {
        expireAfterSeconds: 1800,
        name: "expire_after_30_minutes"
      }
    );
  }

  console.log("30-minute retention indexes configured");
}
