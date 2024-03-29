import { createContext, useEffect, useState, useContext } from 'react';
import { signIn, signOut, loadUserData, checkUserAccount } from "../utils/firebase/auth";
import { Firebase } from 'utils';
import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';
import { useOrgContext } from './OrgContext';
import { useCompanyContext } from './CompanyContext';
import { USER_TYPES } from 'constants/general';
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [userData, setAuthUserData] = useState(null);
   const { showSnackBar } = useSnackBar();
   const { getOrg } = useOrgContext()
   const { getCompany } = useCompanyContext()

   useEffect(() => {
      const authListener = Firebase.auth().onAuthStateChanged(async (userCredential) => {
         if (userCredential) await getUserData(userCredential);
         else {
            await signOut()
            setUser(null)
            setAuthUserData(null)
         }
      })
      return () => {
         authListener()
      } // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const exit = async (message) => {
      await signOut()
      await getOrg(null)
      await getCompany(null)
      setUser(null)
      setAuthUserData(null)
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
         const comp = await getCompany(userData?.companyId)
         if (!org) {
            await exit(`Organização não encontrada, contate o administrador da empresa.`);
            return;
         }
         if (!comp && userData?.userType == USER_TYPES.client.id) {
            await exit(`Empresa não encontrada, contate o administrador da empresa.`);
            return;
         }
      }
      
      if (snackRet.error) return await exit(snackRet.message)
      
      setUser(user)
      setAuthUserData(userData)
      showSnackBar(snackRet.message, snackRet.error ? 'error' : 'success')
   }

   const logOut = async () => {
      const { error, message } = await signOut()
      setUser(null)
      setAuthUserData(null)
      showSnackBar(message, error ? 'error' : 'success')
   }

   return (
      <AuthContext.Provider value={{ user, userData, setAuthUserData, logIn, logOut }}>
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
