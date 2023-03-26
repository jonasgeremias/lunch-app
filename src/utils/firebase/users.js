import { ROWS_PER_PAGE_TABLE, USER_TYPES } from "constants/general";
import { USERS_PATH } from "constants/routes";
import Firebase, { getTimestamp } from "./firebase";


// get Users
// create or edit a user
// delete a user is not possible

export async function getUserData(id) {
   if (!id) return null;
   return await Firebase.firestore().collection(USERS_PATH).doc(id).get().then(doc => {
      if (!doc.exists) return null
      else return doc.data()
   }).catch(error => {
      return null
   })
}

function getFilters(order = 'des', orderBy = 'createdAt', filters, lastDoc, limit = ROWS_PER_PAGE_TABLE) {
   let query = Firebase.firestore().collection(USERS_PATH)
   if (filters?.length) {
      filters.forEach(filter => {
         query = query.where(filter.id, filter.operation, filter.value)
      })
   }
   return query
}


export async function loadUsersInDB(table, userData, loadPage = null) {
   const { order, orderBy, lastDoc, allData } = table

   // Pegando o ID da organização
   let orgId = null;
   if (userData?.orgId) orgId = userData?.orgId;

   // Se for admin, busca todos
   // let active = false;
   let active = !(userData.userType === USER_TYPES.admin.id)

   // Criando os filtros 
   const filters = [];
   if (active) filters.push({ id: 'status', operation: '==', value: 'active' })
   if (orgId) filters.push({ id: 'orgId', operation: '==', value: orgId })

   // Buscando do servidor
   return await getFilters(orgId, active, order, orderBy, filters, loadPage ? lastDoc : null).get()
      .then(snap => {
         const data = [...(loadPage ? allData : []), ...snap.docs.map(doc => doc.data())]
         return {
            ...table,
            error: false,
            // pageData: snap.docs.map(doc => doc.data()),
            allData: data
            // loadingMore: false,
            // lastDoc: snap.docs[snap.size - 1],
            // hasNextPage: snap.size >= ROWS_PER_PAGE_TABLE
         }
      })
      .catch(error => {
         // errorHandler(error, 'Ocorreu um erro ao carregar os dados das empresas', 'Companie', 'loadCompanieInDB')
         return { ...table, pageData: [], allData: loadPage ? allData : [], loadingMore: false, lastDoc: null, hasNextPage: false, error: true}
      })
}

export async function inactiveUsersInDB(selectedRowsData, userData) {
   if (!selectedRowsData || selectedRowsData.length < 1) return { error: true, message: 'Selecione um item!' }
   let ret = await selectedRowsData.map(async (docId) => {
      const query = Firebase.firestore().collection(USERS_PATH).doc(docId)

      return await query.get().then((doc) => {
         if (doc.exists) {
            const data = doc.data();
            const now = getTimestamp()
            data.updatedAt = now
            data.status = 'inactive'
            return doc.ref.update({ updatedAt: now, "status": "inactive" }).then(data).catch(error => { console.log(error); return false })
         }
         else {
            return true
         }
      }).catch(error => { console.log(error); return false })
   })

   return Promise.all(ret).then(() => {
      if (selectedRowsData?.length === 1) return { error: false, message: 'Item apagado!' }
      if (selectedRowsData?.length > 1) return { error: false, message: 'Itens apagados!' }
   });
}


export async function setUserData(data, adding, user, org) {
   if (!user?.uid) return { error: true, message: 'Usuário inválido' };
   if (!org?.orgId) return { error: true, message: 'Organização inválida' };
   if (!('userType' in data)) return { error: true, message: 'Tipo de usuário inválido' };
   if (data?.userType == USER_TYPES.client.id) {
      if (!data?.companyId) return { error: true, message: 'ID inválido' };
   }
   
   const datenow = getTimestamp();

   const item = {
      ...data,
      updatedAt: datenow,
      orgId: org?.orgId
   }

   if (adding) {
      item.createdAt = datenow;
      item.companyCreatedByUserId = user?.uid;
   }
   const docRef = Firebase.firestore().collection(USERS_PATH).doc(data.uid)
   
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
