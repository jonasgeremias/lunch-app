import * as Yup from "yup";

export const initialValuesFilters = {
  lunchDate: '2000-01-01', // @pending
  lunchTypes: 'not'
};

export const validationSchemaFilters = Yup.object({
   lunchDate: Yup.string().nullable(),
   lunchTypes: Yup.string().nullable()
});
