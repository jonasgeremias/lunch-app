import { createContext, useState, useContext} from 'react';
import { getOrgData } from 'utils/firebase/organization'

export const OrgContext = createContext({});

export const OrgProvider = ({ children }) => {
   const [org, setOrg] = useState(null);

   const getOrg = async (id) => {
      const organization = await getOrgData(id)
      setOrg(organization)
      return organization;
   };

   return (
      <OrgContext.Provider value={{ org, getOrg }}>
         {children}
      </OrgContext.Provider>
   );
};


export const useOrgContext = () => {
   const context = useContext(OrgContext);

   if (!context) {
      throw new Error('useOrgContext must be used within an OrgProvider');
   }

   return context;
};
