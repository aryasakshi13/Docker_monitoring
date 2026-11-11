
import Docker from "dockerode";

import type {
  ContainerProvider,
  ContainerInfo,
} from "./ContainerProvider.js";

export class DockerProvider implements ContainerProvider {

  private docker: Docker;

  constructor() {
    const socketPath = process.env.DOCKER_SOCKET;

    this.docker = new Docker(
      socketPath
        ? { socketPath }
        : {}
    );
  }

  async getContainers(): Promise<ContainerInfo[]> {

    const containers = await this.docker.listContainers({
      all: true,
    });

    return containers.map((container) => ({
      containerId: container.Id,
      name: container.Names[0]?.replace("/", "") || "unknown",
      image: container.Image,
      status: container.State,
      createdAt: new Date(container.Created * 1000),
    }));
  }
}
