export function convertToDateTime(now, timeStr) { // "00:00"
   const [hours, minutes] = timeStr.split(":");
   return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
 }