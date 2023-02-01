import Firebase from "./firebase";

export function getOrgData(id) {
   if (!id) return null;
   return Firebase.firestore().collection('organization').doc(id).get().then(doc => {
      if (!doc.exists) return null
      else  return doc.data()
   }).catch(error => {
      return null
   })
}