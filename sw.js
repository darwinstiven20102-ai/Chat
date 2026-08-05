// sw.js - Service Worker para Moon Shop
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Tus credenciales de Firebase configuradas
firebase.initializeApp({
  apiKey: "AIzaSyB10E5NcOAHrSWG2KYh9eYo5cKJ0uegAtk",
  authDomain: "moon-shop-1b1ab.firebaseapp.com",
  databaseURL: "https://moon-shop-1b1ab-default-rtdb.firebaseio.com",
  projectId: "moon-shop-1b1ab",
  storageBucket: "moon-shop-1b1ab.firebasestorage.app",
  messagingSenderId: "475681178863",
  appId: "1:475681178863:web:3838e9eb5b1427d14e071a",
  measurementId: "G-3RXRZ5P865"
});

const messaging = firebase.messaging();

// Manejo de notificaciones en segundo plano cuando la app está cerrada
messaging.onBackgroundMessage((payload) => {
    const title = payload.notification.title || 'Moon Shop';
    const options = {
        body: payload.notification.body || 'Tienes un nuevo mensaje en el chat',
        icon: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/svgs/solid/comments.svg',
        badge: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/svgs/solid/comments.svg',
        tag: 'moon-shop-chat',
        vibrate: [200, 100, 200]
    };

    self.registration.showNotification(title, options);
});

// Acción al hacer clic en la notificación para abrir la tienda
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
