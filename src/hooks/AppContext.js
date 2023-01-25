import { createContext, useEffect, useState, useContext } from 'react';
import { AuthContext } from 'hooks/AuthContext';
// import firebase from "../utils";
import {loadAppData} from 'utils/firebase/app'
export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
   const [app, setApp] = useState(null);
   const user = useContext(AuthContext);

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

