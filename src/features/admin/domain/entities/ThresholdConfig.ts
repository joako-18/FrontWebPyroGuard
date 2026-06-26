export interface ThresholdLevel {
  temp: number;
  hum: number;
}

export interface ThresholdConfig {
  critico: ThresholdLevel;
  medio: ThresholdLevel;
}