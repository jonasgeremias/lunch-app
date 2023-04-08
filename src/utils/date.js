export function convertToDateTime(now, timeStr) { // "00:00"
   const [hours, minutes] = timeStr.split(":");
   return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
}

export const getLunchToday = (item, currentTime) => {
   return (item.day === currentTime.getDate()
      && item.month === (currentTime.getMonth() + 1)
      && item.year === currentTime.getFullYear())
}

export const testDateBeforeCurrent = (date, current) => {
   const yearToCompare = date.getFullYear();
   const monthToCompare = date.getMonth() +1;
   const dayToCompare = date.getDate();

   const currentYear = current.getFullYear();
   const currentMonth = current.getMonth() +1;
   const currentDay = current.getDate();

   if (yearToCompare < currentYear ||
      (yearToCompare === currentYear && monthToCompare < currentMonth) ||
      (yearToCompare === currentYear && monthToCompare === currentMonth && dayToCompare < currentDay)) {
      return true
   } else {
      return false
   }

}