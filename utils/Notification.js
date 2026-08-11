// Notification 
export function showNotification(message, type) {
   let notifContent = document.getElementById("notifContent");
   const notification = document.createElement("div");
   if (type === "success") {
      notification.className = `productSuccessNotif`;
   } else if (type === "error") {
      notification.className = `productErrorNotif`;
   }
   notification.textContent = message; 
   notifContent.appendChild(notification);

   setTimeout(() => {
      notification.remove();
   }, 5000);
}
