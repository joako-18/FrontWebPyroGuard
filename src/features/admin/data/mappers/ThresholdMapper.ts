import type { ThresholdDTO } from '../dto/ThresholdDTO';
import type { ThresholdConfig } from '../../domain/entities/ThresholdConfig';

export function mapThreshold(dto: ThresholdDTO): ThresholdConfig {
  return {
    critico: { ...dto.critico },
    medio: { ...dto.medio },
  };
}

export function mapThresholdToDTO(config: ThresholdConfig): ThresholdDTO {
  return {
    critico: { ...config.critico },
    medio: { ...config.medio },
  };
}