importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Aquí debes poner tus credenciales (las mismas que en firebase.ts)
// ya que el service worker corre de forma aislada y no tiene acceso al import.meta.env
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar app de firebase si aún no existe
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensaje en segundo plano:', payload);
  
  const notificationTitle = payload.notification?.title || 'Notificación de PyroGuard';
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/vite.svg',
    badge: '/vite.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
