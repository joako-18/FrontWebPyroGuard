import { httpClient } from './httpClient';
import { ENV } from '../config/env';

export const registerFCMToken = async (token: string): Promise<void> => {
  await httpClient('/notificaciones/token', {
    method: 'POST',
    body: JSON.stringify({ fcm_token: token }),
    baseUrlOverride: ENV.API_V1_BASE_URL,
  });
};
