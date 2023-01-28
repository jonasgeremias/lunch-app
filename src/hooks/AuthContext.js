import { createContext, useEffect, useState, useContext } from 'react';
import { signIn, signOut, loadUserData, checkUserAccount } from "../utils/firebase/auth";
import { Firebase } from 'utils';
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';
import { useOrgContext } from './OrgContext';
import { useCompanieContext } from './CompanieContext';
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [userData, setUserData] = useState(null);
   const { showSnackBar } = useSnackBar();
   const { getOrg } = useOrgContext()
   const { getCompanie } = useCompanieContext()

   useEffect(() => {
      const authListener = Firebase.auth().onAuthStateChanged(async (userCredential) => {
         if (userCredential) await getUserData(userCredential);
         else {
            await signOut()
            setUser(null)
            setUserData(null)
         }
      })
      return () => {
         authListener()
      } // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


   const logIn = async (email, password) => {
      const { error, message, user } = await signIn(email, password);

      if (error) {
         await signOut()
         setUser(null)
         setUserData(null)
         showSnackBar(message, 'error')
         return;
      }

      await getUserData(user);
   }

   const getUserData = async (user) => {
      const { error, message, userData } = await loadUserData(user.uid)
      if (error) {
         await signOut()
         setUser(null)
         setUserData(null)
         showSnackBar(message, 'error')
         return;
      }

      // Checando se esta bloqueada nos dados de users
      const snackRet = checkUserAccount(user, userData)

      setUser(user)
      setUserData(userData)
      if (snackRet.error) {
         await signOut()
      }
      else {
         getOrg(userData?.orgId)
         getCompanie(userData?.companieId)
      }
      

      showSnackBar(snackRet.message, snackRet.error ? 'error' : 'success')
   }

   const logOut = async () => {
      const { error, message } = await signOut()
      setUser(null)
      setUserData(null)
      showSnackBar(message, error ? 'error' : 'success')
   }

   return (
      <AuthContext.Provider value={{ user, userData, logIn, logOut }}>
         {children}
      </AuthContext.Provider>
   );
};


export const useAuthContext = () => {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('useAuthContext must be used within an AuthProvider');
   }

   return context;
};
