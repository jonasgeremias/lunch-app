import * as Yup from "yup";

/******************************************************************************
 * Formulario de cadastro de empresa
 *****************************************************************************/
export const validationSchema = Yup.object().shape({
   companieId: Yup.string().required("Campo obrigatório"),
   companieName: Yup.string().required("Campo obrigatório").min(2, 'digite pelo menos 2 caracteres.'),
   cnpj: Yup.string().required("Campo obrigatório"),
   // status: Yup.mixed().oneOf(STATUS_OPTIONS_ARRAY).defined('').required("Campo obrigatório"),
   email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
   contactName: Yup.string().required("Campo obrigatório"),
   phone: Yup.string().matches().required("Campo obrigatório")
});

export const initialValues = {
   companieId: '',
   companieName: '',
   cnpj: '',
   // status: 'active',
   email: '',
   contactName: '',
   phone: '',
   schedule: {
      Monday : false,
      Tuesday : false,
      Wednesday : false,
      Thursday : false,
      Friday : false,
      Saturday : false,
      Sunday : false
   },
   datesExceptions: []
};

export const updateInitialValues = (companieData) => {
   if (!companieData) return initialValues;
   
   const { companieId, companieName, cnpj, email, contactName, phone } = companieData;
   const initialData = {
      companieId: companieId || '',
      companieName: companieName || '',
      cnpj: cnpj || '',
      // status: status || 'active',
      email: email || '',
      contactName: contactName || '',
      phone: phone || ''
   }
   return initialData
}