import { createContext, useEffect, useState, useContext } from 'react';
import { useAuthContext } from 'hooks/AuthContext';
// import firebase from "../utils";
import {loadAppData} from 'utils/firebase/app'
export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
   const [app, setApp] = useState(null);
   const { user } = useAuthContext();

   useEffect(() => {
      const getAppdata = async (setApp) => setApp(await loadAppData(user))
      getAppdata(setApp)
   }, []);

   return (
      <AppContext.Provider value={{app}}>
         {children}
      </AppContext.Provider>
   );
};

export const useAppContext = () => {
   const context = useContext(AppContext);

   if (!context) {
      throw new Error('useAppContext must be used within an AppProvider');
   }

   return context;
};

