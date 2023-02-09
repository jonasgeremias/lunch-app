import Firebase from "./firebase";

export function loadAppData(user) {
   return Firebase.firestore().collection('system').doc('portal').get().then(doc => {
      if (!doc.exists) {
         return {error: true, app: {}, message: 'Aplicação fora do ar!'}
      }
      else {
         return {error: false, app: doc.data(), message: 'ok'}
      }
   }).catch(error => {
      console.log('error app', error)
      return {error: true, app: {}, message: 'Erro ao acessar o banco de dados.'}
   })
}