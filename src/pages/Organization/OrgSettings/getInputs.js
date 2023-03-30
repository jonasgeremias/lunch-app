import * as Yup from "yup";


function convertTimeToMinutes(time) {
   const [hours, minutes] = time.split(':');
   return parseInt(hours) * 60 + parseInt(minutes);
}

/******************************************************************************
 * Formulário de cadastro de empresa
 *****************************************************************************/
export const validationSchema = Yup.object().shape({
   orgId: Yup.string().required("Campo obrigatório"),
   name: Yup.string().required("Campo obrigatório").min(2, 'digite pelo menos 2 caracteres.'),
   //email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
   datesExceptions: Yup.object(),
   schedule: Yup.object(),
   closingListLunchTime: Yup.string()
      .required('Você precisa colocar a hora corretamente')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'A hora precisa estar no formato HH:MM')
      .test('start-time-less-than-end-time', 'A hora de fechamento deve ser menor que a de liberação', function (value) {
         const { releasingListLunchTime } = this.parent;
         if (!value || !releasingListLunchTime) {
            return true;
         }
         const closingListLunchTimeMinutes = convertTimeToMinutes(value);
         const releasingListLunchTimeMinutes = convertTimeToMinutes(releasingListLunchTime);
         return closingListLunchTimeMinutes < releasingListLunchTimeMinutes;
      }),
   releasingListLunchTime: Yup.string()
      .required('Você precisa colocar a hora corretamente')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'A hora precisa estar no formato HH:MM'),
   lunchTypes: Yup.array()
      .of(
         Yup.object().shape({
            id: Yup.string().required('ID necessário'),
            name: Yup.string().required('Nome é necessário'),
            price: Yup.string().matches(/^\d+(\,\d{1,2})?$/, 'O preço precisa ter duas casas decimais')
               .required('Preço é necessário'),
            enable: Yup.boolean()
         })
      )
});

export const initialValues = {
   orgId: '',
   name: '',
   closingListLunchTime: '',
   releasingListLunchTime: '',
   schedule: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false
   },
   datesExceptions: {},
   lunchTypes: [
      { id: 'not', price: '10,50', name: 'Não', enable: true },
      { id: 'lunch', price: '10,50', name: 'Almoço', enable: true },
      { id: 'delivery', price: '12,50', name: 'marmita', enable: true }
   ]
};

