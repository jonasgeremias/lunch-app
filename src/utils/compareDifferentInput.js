import colors from 'styles/colors'

export const sortObject = obj => {
   const keys = Object.keys(obj).sort();
   const result = {};
   for (const key of keys) {
      result[key] = obj[key];
   }
   return result;
};

export const objectIsEqual = (initialObject, obj2) => { 
   let equal = true
   for (let key in initialObject) {
      if (key in obj2) {
         if (initialObject[key] !== obj2[key]) equal = false;
      }
   }
   
   return equal;
   // console.log('equal', equal)
   // if (!initialObject && !obj2) return true;
   // if (!initialObject || !obj2) return false;
   // return JSON.stringify(sortObject(initialObject)) === JSON.stringify(sortObject(obj2));
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