import { ORGANIZATION_PATH } from "constants/routes";
import Firebase, { getTimestamp } from "./firebase";

export function getOrgData(id) {
   if (!id) return null;
   return Firebase.firestore().collection('organization').doc(id).get().then(doc => {
      if (!doc.exists) return null
      else  return doc.data()
   }).catch(error => {
      return null
   })
}


export async function setOrgData(data, adding, user, org) {
   if (!user?.uid) return { error: true, message: 'Usuário inválido' };
   if (!org?.orgId) return { error: true, message: 'Organização inválida' };
   if (!data) return { error: true, message: 'Dados inválidos' };
   if (org?.orgId !== data?.orgId) return { error: true, message: 'Usuário não tem permissão' };
   
   const datenow = getTimestamp();

   const item = {
      ...data,
      updatedAt: datenow
   }

   if (adding) item.createdAt = datenow;
   
   const docRef = Firebase.firestore().collection(ORGANIZATION_PATH).doc(data.orgId)
   
   const ret = await docRef.get().then((doc) => {
      if (doc.exists) {
         return docRef.update(item).then((doc) => {
            console.warn('doc', item)
            return { error: false, message: 'Atualizado com sucesso!', data: item }
         }).catch(error => {
            return { error: true, message: `Erro ao atualizar empresa! (${error.id})`, data: null };
         })
      }
      else {
         return docRef.set(item).then((doc) => {
            console.warn('doc', item)
            return { error: false, message: 'Criado com sucesso!', data: item, newDoc:true }
         }).catch(error => {
            return { error: true, message: `Erro ao Criar empresa! (${error.id})`, data: null };
         })
      }
   }).catch((error) => {
      return { error: true, message: `Erro interno, tente novamente! (${error.id})`, data: null };
   })
   
   return ret
}