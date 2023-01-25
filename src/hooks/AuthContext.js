import { createContext, useEffect, useState, useContext} from 'react';
import { isSignedIn, signIn, signOut, loadUserData} from "../utils/firebase/auth";

import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';

export const AuthContext = createContext({});

export const checkUserData = (user, userData) => {
   console.log(user);
   if (userData?.status !== 'active') return {error: true, message: `Sua conta está desativada, fale com o administrador.`}
   if (!userData?.approved) return {error: true, message: `Sua conta ainda não foi aprovada, fale com o administrador.`}   
   if (user?.displayName) return {error: false, message: `Seja bem vindo ${user?.displayName}!`}
   return {error: false, message: `Seja bem vindo!`}
}

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const {showSnackBar} = useSnackBar();

   useEffect(() => {
      isSignedIn(setUser);
   }, []);

   
   const logIn = async (email, password) => {
      const signRet = await signIn(email, password);
      
      if (signRet.error) {
         await signOut()
         showSnackBar(signRet.message, 'error')
         return;
      }
      
      const loadRet = await loadUserData(signRet.user.uid)
      if (loadRet.error) {
         await signOut()
         showSnackBar(loadRet.message, 'error')
         return;
      }
      
      // Checando se esta bloqueada nos dados de users
      const snackRet = checkUserData(signRet.user,loadRet.userData)
      setUser({ user: signRet.user, data: loadRet.userData})
      if (snackRet.error) {
         await signOut()
      }
      
      showSnackBar(snackRet.message, snackRet.error? 'error' : 'success')
   }

   const logOut = async () => {
      const {error, message, user} = await signOut()
      console.log('logOut', error, message)
      showSnackBar(message, error ? 'error': 'success')
      if (!error) setUser(null)
   }

   return (
      <AuthContext.Provider value={{user, logIn, logOut}}>
         {children}
      </AuthContext.Provider>
   );
};