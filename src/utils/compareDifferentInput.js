import colors from 'styles/colors'

export const sortObject = obj => {
   const keys = Object.keys(obj).sort();
   const result = {};
   for (const key of keys) {
      result[key] = obj[key];
   }
   return result;
};

export const objectIsEqual = (sortedObj1, sortedObj2) => {
   if (!sortedObj1 && !sortedObj2) return true;
   if (!sortedObj1 || !sortedObj2) return false;
   return JSON.stringify(sortObject(sortedObj1)) === JSON.stringify(sortObject(sortedObj2));
}

// Compara se o valor inicial é diferente do atual e retorna um estilo para atualizar a cor do input
export const compareDifferentInput = (initialValues, values, id) => {
   if (initialValues == null) return {}
   if (!initialValues[id]) return {}
   return values[id] === initialValues[id] ? {} : {
      sx: {
         color: colors.primary,
         fontWeight: '500',
      }
   }
}