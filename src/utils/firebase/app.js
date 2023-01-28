import Firebase from "./firebase";

export function loadAppData(user) {
   return Firebase.firestore().collection('system').doc('portal').get().then(doc => {
      if (!doc.exists) {
         return null
      }
      else {
         return doc.data()
      }
   }).catch(error => {
      return null
   })
}