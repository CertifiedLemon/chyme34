function checkAccessTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  if (!(hours === 20 && minutes === 31)) {
    window.location.replace("../profiles.html"); 
  }
}

checkAccessTime();
setInterval(checkAccessTime, 1000);
