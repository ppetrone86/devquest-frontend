export interface PostModel {
  id: number;
  title: string;
  body: string;
  tags: string[];
}

export interface PostTagStatistics {
  tag: string;
  count: number;
  percentage: number;
}
