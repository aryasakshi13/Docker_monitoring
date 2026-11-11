
import type {
  ContainerProvider,
  ContainerInfo,
} from "./ContainerProvider.js";

export class MockContainerProvider implements ContainerProvider {

  async getContainers(): Promise<ContainerInfo[]> {

    return [
      {
        containerId: "mock-001",
        name: "nginx-server",
        image: "nginx:latest",
        status: "running",
        createdAt: new Date(),
      },
      {
        containerId: "mock-002",
        name: "node-api",
        image: "node:20",
        status: "running",
        createdAt: new Date(),
      },
      {
        containerId: "mock-003",
        name: "redis-cache",
        image: "redis:latest",
        status: "running",
        createdAt: new Date(),
      },
    ];
  }
}
