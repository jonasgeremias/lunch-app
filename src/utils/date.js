export function convertToDateTime(now, timeStr) { // "00:00"
   const [hours, minutes] = timeStr.split(":");
   return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
}

export const isLunchEquals = (item, currentTime) => {
   return (item.day === currentTime.getDate()
      && item.month === (currentTime.getMonth() + 1)
      && item.year === currentTime.getFullYear())
}

export const testDateBeforeCurrent = (date, current) => {
   const yearToCompare = date.getFullYear();
   const monthToCompare = date.getMonth() + 1;
   const dayToCompare = date.getDate();

   const currentYear = current.getFullYear();
   const currentMonth = current.getMonth() + 1;
   const currentDay = current.getDate();
   
   if (yearToCompare < currentYear) return true;
   if (yearToCompare == currentYear && monthToCompare < currentMonth) return true;
   if (yearToCompare == currentYear && monthToCompare == currentMonth && dayToCompare < currentDay) return true;
   return false
}

export const isWorkDay = (date, org) => {
   const arrayDatesExceptions = Object.values(org?.datesExceptions)

   if (arrayDatesExceptions?.length > 0) {
      for (let id in arrayDatesExceptions) {
         const item = arrayDatesExceptions[id]
         const dateObject = new Date(item.date.replace('-', '/'));
         // Se encontrou uma exceção
         if (isLunchEquals(date, dateObject)) {
            if (item.typeOfDay == 'off') return false;
            else return true;
         }
      }
   }
   return org?.schedule[`${date.dayWeek}`];
}