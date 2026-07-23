import { httpClient } from './httpClient';


export const registerFCMToken = async (token: string): Promise<void> => {
  await httpClient('/v1/notificaciones/token', {
    method: 'POST',
    body: JSON.stringify({ fcm_token: token }),
  });
};
