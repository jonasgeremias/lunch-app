import Firebase, { getTimestamp } from "./firebase";

export function getCompanieData(id) {
   if (!id) return null;
   return Firebase.firestore().collection('companies').doc(id).get().then(doc => {
      if (!doc.exists) return null
      else return doc.data()
   }).catch(error => {
      return null
   })
}

export async function setCompanieData(data, adding, user, org) {
   if (!data?.companieId) return {error: true, message: 'ID inválido'};
   if (!user?.uid) return {error: true, message: 'Usuário inválido'};
   if (!org?.orgId) return {error: true, message: 'Organização inválida'};

   if (adding) data.createdAt = getTimestamp()
   data.updatedAt =  getTimestamp()
   data.orgId = org?.orgId
   data.companieCreatedByUserId = user?.uid
   
   const ret = await Firebase.firestore().collection('companies').doc(data.companieId).set(data, { merge: true }).then(() => {
      return {error: false, message: 'Salvo com sucesso!'}
   }).catch(error => {
      return  {error: true, message: `Erro ao salvar os dados! (${error.id})`, data: null};
   })
   
   console.log('setCompanieData', ret);
   
   return ret
}