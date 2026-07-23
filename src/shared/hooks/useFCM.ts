import { useEffect, useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../config/firebase';
import { registerFCMToken } from '../api/notificationsApi';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../features/auth/presentation/store/authStore';

export function useFCM() {
  const userId = useAuthStore(state => state.userId);
  const [permission, setPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );

  const fetchToken = async () => {
    try {
      if (messaging) {
        const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY || 'TU_VAPID_KEY_AQUI';
        const token = await getToken(messaging, { vapidKey });
        
        if (token) {
          console.log('FCM Token obtenido:', token);
          await registerFCMToken(token);
        }
      }
    } catch (error) {
      console.error('Error al configurar FCM:', error);
    }
  };

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('Este navegador no soporta notificaciones');
      return;
    }
    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm === 'granted') {
        await fetchToken();
        toast.success('Notificaciones habilitadas');
      } else {
        toast.error('Permiso de notificaciones denegado');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (permission === 'granted' && userId) {
      fetchToken();
    }
  }, [permission, userId]);

  useEffect(() => {
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

  return { permission, requestPermission };
}
