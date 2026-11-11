
export interface ContainerInfo {
  containerId: string;
  name: string;
  image: string;
  status: string;
  createdAt: Date;
}

export interface ContainerProvider {
  getContainers(): Promise<ContainerInfo[]>;
}
