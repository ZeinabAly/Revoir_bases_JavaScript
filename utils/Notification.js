// Notification 
export function showNotification(message, type) {
   let notifContent = document.getElementById("notifContent");
   const notification = document.createElement("div");
   notification.className = `productNotif`;
   notification.textContent = message; 
   notifContent.appendChild(notification);

   setTimeout(() => {
      notification.remove();
   }, 2000);
}
