import * as Yup from "yup";

/******************************************************************************
 * Formulário de cadastro de empresa
 *****************************************************************************/
export const validationSchema = Yup.object().shape({
   companyId: Yup.string().required("Campo obrigatório"),
   companyName: Yup.string().required("Campo obrigatório").min(2, 'digite pelo menos 2 caracteres.'),
   cnpj: Yup.string().required("Campo obrigatório"),
   // status: Yup.mixed().oneOf(STATUS_OPTIONS_ARRAY).defined('').required("Campo obrigatório"),
   email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
   contactName: Yup.string().required("Campo obrigatório"),
   phone: Yup.string().matches().required("Campo obrigatório"),
   datesExceptions: Yup.object(),
   schedule: Yup.object()
});

export const initialValues = {
   companyId: '',
   companyName: '',
   cnpj: '',
   // status: 'active',
   email: '',
   contactName: '',
   phone: ''
};

