import Firebase from "./firebase";

// export const isSignedIn = (setUser) => Firebase.firestore().onAuthStateChanged(setUser);
export function loadAppData(user) {
   return Firebase.firestore().collection('system').doc('portal').get().then(doc => {
      // console.log(doc.data())
      if (!doc.exists) {
         return null
         // throw new Error("document System/portal undefined.");
      }
      else {
         return doc.data()
         // dispatch({ type: APP_CHANGE_DATA, payload: doc.data(), error: '' })
      }
   }).catch(error => {
      return null
      // console.log('erro', error)
      // dispatch({ type: APP_CHANGE_DATA, payload: null, error: error.message || JSON.stringify(error).slice(0, 100) })
      // dispatch(errorHandler(error, 'Ocorreu um erro ao carregar os dados do sistema', 'components/organisms/App/actions', 'loadAppData'))
   })

}