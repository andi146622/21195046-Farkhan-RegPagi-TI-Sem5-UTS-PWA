const form = document.getElementById('messageForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

let db;
const dbName = 'MessagesDB';
const dbVersion = 1;

const request = indexedDB.open(dbName, dbVersion);

request.onerror = function (event) {
  console.error('Database error: ' + event.target.errorCode);
};

request.onsuccess = function (event) {
  db = event.target.result;
};

request.onupgradeneeded = function (event) {
  db = event.target.result;
  const store = db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
  store.createIndex('name', 'name', { unique: false });
  store.createIndex('email', 'email', { unique: false });
  store.createIndex('message', 'message', { unique: false });
};

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;

  const transaction = db.transaction(['messages'], 'readwrite');
  const store = transaction.objectStore('messages');
  const newItem = {
    name: name,
    email: email,
    message: message,
  };

  const request = store.add(newItem);

  request.onsuccess = function (event) {
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';

    // if ('Notification' in window) {
    //   console.log('ada');
    //   Notification.requestPermission().then((permission) => {
    //     console.log(permission);
    //     if (permission == 'granted') {
    //       const options = {
    //         body: `Ada Pesan Baru dari Seseorang`,
    //         icon: 'images/android-icon-144x144.png',
    //       };

    swal({
      title: `Terimakasih!`,
      text: 'Telah Mengirim Pesan Kepada Kami',
      icon: 'success',
      button: 'OK!',
    });

    //       const notification = new Notification('Pesan Baru', options);
    //     } else if (permission === 'denied') {
    //       console.log('Izin notifikasi ditolak.');
    //     } else if (permission === 'default') {
    //       console.log('Pengguna menutup dialog izin.');
    //     }
    //   });
    // } else {
    //   alert('Gaggal');
    // }
    // showNotification('Komentar Ditambahkan', 'Komentar baru telah ditambahkan!');
  };
});
