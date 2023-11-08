if ('Notification' in window) {
  Notification.requestPermission().then((permission) => {
    if (permission == 'granted') {
      alert('Notifikasi Telah di Izinkan');
    } else if (permission === 'denied') {
      alert('Notifikasi Telah di Blok');
    } else if (permission === 'default') {
      console.log('Pengguna menutup dialog izin.');
    }
  });
} else {
  alert('WEB BROWSER NOT SUPPORT');
}
