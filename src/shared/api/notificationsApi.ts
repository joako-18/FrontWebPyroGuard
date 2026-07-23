import { httpClient } from './httpClient';


export const registerFCMToken = async (userId: string, token: string): Promise<void> => {
  await httpClient('/v1/notificaciones/token', {
    method: 'POST',
    body: JSON.stringify({ id_usuario: userId, fcm_token: token }),
  });
};
