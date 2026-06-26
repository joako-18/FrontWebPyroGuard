import { httpClient } from '../../../../shared/api/httpClient';
import type { ThresholdDTO } from '../dto/ThresholdDTO';

const ML_BASE_URL = 'https://pyroguard.inode.cloud/ml/api/v1';

export class ThresholdsRemoteDataSource {
  async getThresholds(): Promise<ThresholdDTO> {
    return httpClient<ThresholdDTO>(
      '/analitica/configuracion-umbrales',
      { baseUrlOverride: ML_BASE_URL }
    );
  }

  async updateThresholds(config: ThresholdDTO): Promise<void> {
    await httpClient<void>(
      '/analitica/configuracion-umbrales',
      {
        method: 'PUT',
        body: JSON.stringify(config),
        baseUrlOverride: ML_BASE_URL,
      }
    );
  }
}