
import "dotenv/config";

import { connectDatabase, closeDatabase } from "./config/db.js";

import   { MockContainerProvider } from "./providers/MockContainerProvider.js";
import  { DockerProvider } from "./providers/DockerProvider.js";

import  { getContainers } from "./services/containerDiscovery.js";
import  { saveContainers } from "./services/containerStorage.js";

async function startCollector() {
  try {
    // 1. Connect MongoDB Atlas
    await connectDatabase();

    // 2. Select container provider
    const providerType = process.env.CONTAINER_PROVIDER || "mock";

    const provider =
      providerType === "docker"
        ? new DockerProvider()
        : new MockContainerProvider();

    console.log(`Using provider: ${providerType}`);

    // 3. Discover containers
    const containers = await getContainers(provider);

    // 4. Save containers to MongoDB
    await saveContainers(containers);

    console.table(containers);

    console.log("Initial collection completed");
  } catch (error) {
    console.error("Collector startup failed:", error);

    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}

startCollector();
