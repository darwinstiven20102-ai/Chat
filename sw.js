// 1. Importamos las librerías necesarias de Firebase para que funcionen en segundo plano
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// 2. Inicializamos Firebase con TUS propias credenciales (las mismas que ya usas en tu página web)
firebase.initializeApp({
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
});

const messaging = firebase.messaging();

// 3. Esto se activa cuando llega una notificación push del servidor con la app cerrada
messaging.onBackgroundMessage((payload) => {
    const title = payload.notification.title || 'Nuevo mensaje';
    const options = {
        body: payload.notification.body || 'Tienes un nuevo mensaje en el chat',
        icon: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/svgs/solid/comments.svg',
        badge: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/svgs/solid/comments.svg',
        tag: 'moon-shop-chat',
        vibrate: [200, 100, 200]
    };

    self.registration.showNotification(title, options);
});

// 4. Esto hace que si el usuario toca la notificación, se abra o se traiga al frente tu página web
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if ('focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
