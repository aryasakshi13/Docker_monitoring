
import { getDatabase } from "../config/db.js";
import type { ContainerInfo } from "../providers/ContainerProvider.js";

export async function saveContainers(
  containers: ContainerInfo[]
): Promise<void> {
  const db = getDatabase();

  const collection = db.collection("containers");

  for (const container of containers) {
    await collection.updateOne(
      { containerId: container.containerId },
      {
        $set: {
          ...container,
          lastSeenAt: new Date(),
        },
      },
      { upsert: true }
    );
  }

  console.log(`${containers.length} containers saved to MongoDB`);
}
