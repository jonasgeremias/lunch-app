import { createContext, useEffect, useState, useContext } from 'react';
import { signIn, signOut, loadUserData, checkUserAccount } from "../utils/firebase/auth";
import { Firebase } from 'utils';
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';
import { useOrgContext } from './OrgContext';
import { useCompanieContext } from './CompanieContext';
import { USER_TYPES } from 'constants/general';
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

   const exit = async (message) => {
      await signOut()
      await getOrg(null)
      await getCompanie(null)
      setUser(null)
      setUserData(null)
      showSnackBar(message, 'error')
      return;
   }

   const logIn = async (email, password) => {
      const { error, message, user } = await signIn(email, password);
      if (error) await exit(message);
      else await getUserData(user);
   }

   const getUserData = async (user) => {
      const { error, message, userData } = await loadUserData(user.uid)
      if (error) {
         await exit(message);
         return;
      }

      // Checando se esta bloqueada nos dados de users
      const snackRet = checkUserAccount(user, userData)


      // Lendo os dados da organização e empresa
      if (!snackRet.error && (userData?.userType != USER_TYPES.admin.id)) {
         const org = await getOrg(userData?.orgId)
         const comp = await getCompanie(userData?.companieId)
         if (!org) {
            await exit(`Organização não encontrada, contate o administrador da empresa.`);
            return;
         }
         if (!comp) {
            await exit(`Empresa não encontrada, contate o administrador da empresa.`);
            return;
         }
      }
      
      if (snackRet.error) return await exit(snackRet.message)
      
      setUser(user)
      setUserData(userData)
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
