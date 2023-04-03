export function convertToDateTime(now, timeStr) { // "00:00"
   const [hours, minutes] = timeStr.split(":");
   return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
 }
 
export const getLunchToday = (item, currentTime) => {
   return (item.day === currentTime.getDate()
      && item.month === (currentTime.getMonth() + 1)
      && item.year === currentTime.getFullYear())
}