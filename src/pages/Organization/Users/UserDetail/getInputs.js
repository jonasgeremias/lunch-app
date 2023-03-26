import { USER_TYPES, USER_TYPES_ARRAY } from "constants/general";
import * as Yup from "yup";

export const updateInitialValues = (data) => {
   if (!data) return initialValues;
   const initialObject = { ...initialValues, ...data }
   return initialObject
}

/******************************************************************************
 * Formulário para o Cliente
 *****************************************************************************/
export const validationSchema = Yup.object().shape({
   name: Yup.string().required('Digite o nome'),
   email: Yup.string().email('E-mail inválido').required('Digite o e-mail'),
   companyId: Yup.string().required('Selecione a empresa'),
   phone: Yup.string(),
   cpf: Yup.string().min(6, 'digite no mínimo 6 caracteres').required('Digite o CPF'), // .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido').
   code: Yup.number().typeError('Código deve ser um número').required('Digite o código de matrícula'),
   // password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
   // password2: Yup.string().oneOf([Yup.ref('password'), null], 'Senhas diferentes').required('Digite a senha de confirmação'),
   userType: Yup.string().oneOf(USER_TYPES_ARRAY, 'Opção inválida').required(),
   lunchDiscountPercentage: Yup.number(),
   lunchQuantity: Yup.number(),
   lunchTypes: Yup.string()
});

export const initialValues = {
   name:'',
   email:'', 
   companyId:'', 
   phone:'', 
   cpf:'', 
   code:'', 
   password:'', 
   password2:'', 
   userType: USER_TYPES.client.id,
   lunchDiscountPercentage: 100,
   lunchQuantity: 0,
   lunchTypes: 'Não',
};
