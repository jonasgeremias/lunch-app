import * as Yup from "yup";
import {STATUS_OPTIONS_ARRAY, USER_TYPES_ARRAY} from 'constants/general'

/******************************************************************************
 * Formulario de filtros de usuários
 *****************************************************************************/
export const initialValuesFilters = {
  startDate: '2000-01-01',
  endDate:'3000-01-01',
  name: '',
  status: 'active',
  email: '',
  userType: USER_TYPES_ARRAY[0],
  cpf: '',
};

export const validationSchemaFilters = Yup.object({
  startDate: Yup.string().nullable(),
  endDate: Yup.string().nullable(),
  name: Yup.string().nullable(),
  status: Yup.mixed().oneOf(STATUS_OPTIONS_ARRAY).nullable(),
  email: Yup.string().email("E-mail inválido").nullable(),
  userType: Yup.mixed().oneOf(USER_TYPES_ARRAY).nullable(),
  cpf: Yup.string().nullable(),
});
