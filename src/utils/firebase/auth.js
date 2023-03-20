import { USER_TYPES } from 'constants/general';
import { formatValue } from "utils";
import Firebase, { getTimestamp } from "./firebase";

export function signIn(email, password) {
   return Firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
      return { error: false, user: userCredential.user, message: 'Logado com sucesso' }
   }).catch((error) => {
      const { message } = formatValue.signError(error)
      return { error: true, user: null, message }
   });
}

export function signOut() {
   return Firebase.auth().signOut()
      .then(() => {
         return { error: false, message: 'Deslogado com sucesso' }
      }).catch(error => {
         console.warn(error)
         return { error: true, message: 'Ocorreu um erro ao se deslogar' }
      })
}

export function sendResetEmail(email) {
   if (email === '') {
      return { error: true, message: 'Não esqueça de preencher o e-mail' }
   } else {
      return Firebase.auth().sendPasswordResetEmail(email)
         .then(() => {
            return { error: false, message: 'Mensagem enviada, verifique seu e-mail e a caixa de spam!' }
         })
         .catch(error => {
            const { message } = formatValue.signError(error)
            return message ? { error: true, message } : { error: true, message: 'Ocorreu um erro ao solicitar a redefinição de senha' }
         })
   }
}


export function loadUserData(uid) {
   if (uid) {
      return Firebase.firestore().collection('users').doc(uid).get().then(async (doc) => {
         if (doc.exists) {
            const data = doc.data();
            const now = getTimestamp()
            data.updatedAt = now
            await doc.ref.update({ updatedAt: now }).catch(error => { console.log(error) })
            return { error: false, message: 'Usuário Encontrado', userData: data };
         }
         else {
            return { error: true, message: 'Os dados da sua conta não existem', userData: null }
         }
      }).catch((error) => {
         const { message } = formatValue.signError(error)
         return message ? { error: true, userData: null, message } : { error: true, userData: null, message: 'Ocorreu um erro ao carregar os dados da sua conta' }
      })
   }
   else return { error: true, userData: null, message: 'Usuário inválido!' }
}

export const checkUserAccount = (user, userData) => {
   if (userData?.userType === USER_TYPES.admin.id) return { error: false, message: `Seja bem vindo Administrador!` }
   if (userData?.status !== 'active') return { error: true, message: `Sua conta está desativada, contate o administrador da empresa.` }
   if (!userData?.userType) return { error: true, message: `Dados do usuário não existem, contate o administrador da empresa.` }
   if (!userData?.approved) return { error: true, message: `Sua conta ainda não foi aprovada, contate o administrador.` }
   if (user?.displayName) return { error: false, message: `Seja bem vindo ${user?.displayName}!` }
   return { error: false, message: `Seja bem vindo!` }
}

