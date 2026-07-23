import { useEffect, useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../config/firebase';
import { registerFCMToken } from '../api/notificationsApi';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../features/auth/presentation/store/authStore';

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function useFCM() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const accessToken = useAuthStore(state => state.accessToken);
  const storeUserId = useAuthStore(state => state.userId);
  
  const [permission, setPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );

  const fetchToken = async () => {
    try {
      if (messaging) {
        const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY || 'TU_VAPID_KEY_AQUI';
        const token = await getToken(messaging, { vapidKey });
        
        if (token) {
          let userId = storeUserId;
          if (!userId && accessToken) {
            const payload = parseJwt(accessToken);
            userId = payload?.sub || payload?.id_usuario;
          }
          
          if (userId) {
            console.log('FCM Token obtenido:', token);
            await registerFCMToken(userId, token);
          } else {
            console.error('No se pudo determinar el id_usuario, token no enviado.');
          }
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
    if (permission === 'granted' && isAuthenticated) {
      fetchToken();
    }
  }, [permission, isAuthenticated]);

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
