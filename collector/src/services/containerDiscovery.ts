
import type { ContainerProvider } from "../providers/ContainerProvider.js";

export async function getContainers(
  provider: ContainerProvider
) {
  try {
    return await provider.getContainers();
  } catch (error) {
    console.error("Container discovery failed:", error);
    throw error;
  }
}
