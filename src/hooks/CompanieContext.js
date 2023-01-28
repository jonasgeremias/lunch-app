import { createContext, useState, useContext} from 'react';
import { getCompanieData } from 'utils/firebase/companies'
export const CompanieContext = createContext({});

export const CompanieProvider = ({ children }) => {
   const [companie, setCompanie] = useState(null);

   const getCompanie = async (id) => {
      const comp = await getCompanieData(id)
      setCompanie(comp)
      console.log('getCompanie', comp)
      return comp;
   };

   return (
      <CompanieContext.Provider value={{ companie, getCompanie }}>
         {children}
      </CompanieContext.Provider>
   );
};

export const useCompanieContext = () => {
   const context = useContext(CompanieContext);

   if (!context) {
      throw new Error('useCompanieContext must be used within an CompanieProvider');
   }

   return context;
};
