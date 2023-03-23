import { createContext, useState, useContext} from 'react';
import { getCompanyData } from 'utils/firebase/companies'
export const CompanyContext = createContext({});

export const CompanyProvider = ({ children }) => {
   const [company, setCompanie] = useState(null);

   const getCompany = async (id) => {
      const comp = await getCompanyData(id)
      setCompanie(comp)
      return comp;
   };

   return (
      <CompanyContext.Provider value={{ company, getCompany }}>
         {children}
      </CompanyContext.Provider>
   );
};

export const useCompanyContext = () => {
   const context = useContext(CompanyContext);

   if (!context) {
      throw new Error('useCompanyContext must be used within an CompanyProvider');
   }

   return context;
};
