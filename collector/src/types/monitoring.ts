
export interface ContainerInfo {
  containerId: string;
  name: string;
  image: string;
  status: string;
  createdAt: Date;
  hostId: string;
}

export interface ContainerMetrics {
  cpuPercent: number;

  memoryUsageBytes: number;
  memoryLimitBytes: number;
  memoryUsageMb: number;
  memoryLimitMb: number;
  memoryPercent: number;

  networkRxBytes: number;
  networkTxBytes: number;

  blockReadBytes: number;
  blockWriteBytes: number;
}

export interface ContainerLog {
  hostId: string;
  containerId: string;
  containerName: string;
  stream: "stdout" | "stderr";
  message: string;
  timestamp: Date;
  ingestedAt: Date;
}

export interface ContainerEvent {
  hostId: string;
  containerId: string;
  containerName: string;
  eventType: string;
  message: string;
  timestamp: Date;
  ingestedAt: Date;
}

export interface MetricRecord extends ContainerMetrics {
  hostId: string;
  containerId: string;
  containerName: string;
  image: string;
  timestamp: Date;
  ingestedAt: Date;
}

export interface MonitoringProvider {
  getContainers(): Promise<ContainerInfo[]>;

  getMetrics(
    containerId: string
  ): Promise<ContainerMetrics>;

  getLogs(
    containers: ContainerInfo[]
  ): Promise<ContainerLog[]>;

  getEvents(): Promise<ContainerEvent[]>;
}
