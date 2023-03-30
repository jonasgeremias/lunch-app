export function convertToDateTime(now, timeStr) { // "00:00"
   const [hours, minutes] = timeStr.split(":");
   const n = new Date(now);
   return new Date(n.getFullYear(), n.getMonth(), n.getDate(), hours, minutes);
 }