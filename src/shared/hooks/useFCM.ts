import { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../config/firebase';
import { registerFCMToken } from '../api/notificationsApi';
import toast from 'react-hot-toast';

export function useFCM() {
  useEffect(() => {
    async function requestPermission() {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted' && messaging) {
          // Obtener el token FCM. Reemplaza VITE_FIREBASE_VAPID_KEY en tu .env
          const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY || 'TU_VAPID_KEY_AQUI';
          const token = await getToken(messaging, { vapidKey });
          
          if (token) {
            console.log('FCM Token obtenido:', token);
            await registerFCMToken(token);
          }
        } else {
          console.warn('Permiso de notificaciones no concedido.');
        }
      } catch (error) {
        console.error('Error al configurar FCM:', error);
      }
    }

    requestPermission();

    // Listener para primer plano
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Mensaje recibido en foreground:', payload);
        toast(
          `${payload.notification?.title}\n${payload.notification?.body}`,
          { 
            duration: 6000, 
            icon: payload.notification?.title?.includes('EMERGENCIA') ? '🚨' : '🔥'
          }
        );
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);
}
