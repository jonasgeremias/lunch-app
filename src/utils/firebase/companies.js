import Firebase from "./firebase";

export function getCompanieData(id) {
   return Firebase.firestore().collection('companies').doc(id).get().then(doc => {
      if (!doc.exists) return null
      else  return doc.data()
   }).catch(error => {
      return null
   })
}