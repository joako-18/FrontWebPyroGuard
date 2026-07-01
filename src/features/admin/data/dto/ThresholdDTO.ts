
export interface ThresholdLevelDTO {
  temp: number;
  hum: number;
}

export interface ThresholdDTO {
  critico: ThresholdLevelDTO;
  medio: ThresholdLevelDTO;
}