import { formatValue } from "utils";
import Firebase from "./firebase";

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
         .then((data) => {
            console.log('sendResetEmail', data)
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
            const now = new Date(); //Firebase.firestore.serverTimestamp(); // @pending 
            const data = doc.data();
            data.updatedAt = now;
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