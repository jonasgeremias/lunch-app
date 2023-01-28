import { createContext, useEffect, useState } from 'react';
import { signIn, signOut, loadUserData } from "../utils/firebase/auth";
import { Firebase } from 'utils';

import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [userData, setUserData] = useState(null);
   const { showSnackBar } = useSnackBar();

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

   useEffect(() => {


   }, [user])

   const checkUserAccount = (user, userData) => {
      if (userData?.status !== 'active') return { error: true, message: `Sua conta está desativada, contate o administrador.` }
      if (!userData?.approved) return { error: true, message: `Sua conta ainda não foi aprovada, contate o administrador.` }
      if (user?.displayName) return { error: false, message: `Seja bem vindo ${user?.displayName}!` }
      return { error: false, message: `Seja bem vindo!` }
   }

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