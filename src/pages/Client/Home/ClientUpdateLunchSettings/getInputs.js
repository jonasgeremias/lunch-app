import * as Yup from "yup";
// import {STATUS_OPTIONS_ARRAY, USER_TYPES_ARRAY} from 'constants/general'
// import { getHours, getMinutes } from 'date-fns';
// import { convertToDateTime } from "utils/date";

/******************************************************************************
 * Formulario de filtros de usuários
 *****************************************************************************/
export const initialValuesClientHome = {
   // lunchQuantity : 0,
   lunchTypes: 'not'
};

export const validationSchemaClientHome = Yup.object({
//   lunchQuantity: Yup.number().required('Informe a quantidade de almoços.'),
  lunchTypes: Yup.string().required('Informe a typo de almoço.'),
});


// export const initialValuesChangeDate = {
//    lunchQuantity : 0,
//    lunchTypes: 'not'
// };

// export const validationSchemaChangeDate = Yup.object({
//   lunchQuantity: Yup.number().required('Informe a quantidade de almoços.'),
//   lunchTypes: Yup.string().required('Informe a typo de almoço.'),
// });


// Lunch
export const lunchChangesInitial = [
   { day: 30, month: 3, year: 2023, datetime: '2023/03/29', lunchTypes: "not", restaurantApproved: true },
   { day: 31, month: 3, year: 2023, datetime: '2023/03/31',  lunchTypes: "lunch", restaurantApproved: false },
   { day: 1, month: 4, year: 2023, datetime: '2023/04/01', lunchTypes: "delivery", restaurantApproved: false }
]

// export const convertDates = (datetime, org, userData) => {
//    const totalMinutes = getHours(datetime) * 60 + getMinutes(datetime);
//    const closing = convertToDateTime(datetime, org.closingListLunchTime)
//    const closingMinutes = getHours(closing) * 60 + getMinutes(closing);
//    const releasing = convertToDateTime(datetime, org.releasingListLunchTime)
//    const releasingMinutes = getHours(releasing) * 60 + getMinutes(releasing);
//    const dayOfWeek = daysOfWeek[datetime.getDay()]; // get day of the week name
//    const lunchTodayArray = lunchChanges.filter(getLunchToday)
//    let lunchToday = {}

//    if (lunchTodayArray?.length == 1) lunchToday = lunchTodayArray[0]
//    else {
//       lunchToday = {
//          day: datetime.getDate(),
//          mes: datetime.getMonth() + 1,
//          ano: datetime.getFullYear(),
//          datetime: datetime,
//          lunchQuantity: userData.lunchQuantity,
//          lunchTypes: userData.lunchTypes,
//          restaurantApproved: false,
//          default: true
//       }
//    }
//    let status_date = {
//       closing: totalMinutes >= closingMinutes,
//       releasing: totalMinutes >= releasingMinutes,
//       dayOfWeek: getDayWeek[`${dayOfWeek}`],
//       workDay: org.schedule[`${dayOfWeek}`],
//       lunchToday: lunchToday
//    }
//    console.log('status_date', status_date)
//    return status_date
// }