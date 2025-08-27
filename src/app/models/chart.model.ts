export interface ChartModel {
  labels: string[];
  datasets: {
    data: number[];
    label?: string;
    backgroundColor: string | string[];
    borderColor?: string | string[];
  }[];
}
