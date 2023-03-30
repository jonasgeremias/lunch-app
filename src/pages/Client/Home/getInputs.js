import * as Yup from "yup";
import {STATUS_OPTIONS_ARRAY, USER_TYPES_ARRAY} from 'constants/general'

/******************************************************************************
 * Formulario de filtros de usuários
 *****************************************************************************/
export const initialValuesClientHome = {
   lunchQuantity : 0,
   lunchTypes: 'not'
};

export const validationSchemaClientHome = Yup.object({
  lunchQuantity: Yup.string().required('Informe a quantidade de almoços.'),
  lunchTypes: Yup.string().required('Informe a typo de almoço.'),
});
