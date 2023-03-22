import { ROWS_PER_PAGE_TABLE, USER_TYPES } from "constants/general";
import { USERS_PATH } from "constants/routes";
import Firebase, { getTimestamp } from "./firebase";


// get Users
// create or edit a user
// delete a user is not possible


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
            // pageData: snap.docs.map(doc => doc.data()),
            allData: data
            // loadingMore: false,
            // lastDoc: snap.docs[snap.size - 1],
            // hasNextPage: snap.size >= ROWS_PER_PAGE_TABLE
         }
      })
      .catch(error => {
         // errorHandler(error, 'Ocorreu um erro ao carregar os dados das empresas', 'Companie', 'loadCompanieInDB')
         return { ...table, pageData: [], allData: loadPage ? allData : [], loadingMore: false, lastDoc: null, hasNextPage: false }
      })
}

export async function inactiveUserInDB(selectedRowsData, userData) {
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

