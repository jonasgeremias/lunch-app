import Holidays from 'date-holidays';

const getDate = (d) => {
   return d.split(' ')[0]
   // const dt = new Date(d);
   // const year  = dt.getFullYear().toString().padStart(4, "0");
   // const month = (dt.getMonth() + 1).toString().padStart(2, "0");
   // const day   = dt.getDate().toString().padStart(2, "0");
   // return (year + '-' + month + '-' + day);
}

export function getHolidays(year) {
   const hd = new Holidays('BR', 'SC')
   const holidays = hd.getHolidays(year);
   return holidays.map(h => ({ description: h.name, date: getDate(h.date), typeOfDay: h.type }));
}