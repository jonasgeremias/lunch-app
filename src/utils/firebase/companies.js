// import dayjs from 'dayjs'
import { ROWS_PER_PAGE_TABLE } from "constants/general";
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
   if (!data?.companieId) return { error: true, message: 'ID inválido' };
   if (!user?.uid) return { error: true, message: 'Usuário inválido' };
   if (!org?.orgId) return { error: true, message: 'Organização inválida' };

   if (adding) data.createdAt = getTimestamp()
   data.updatedAt = getTimestamp()
   data.orgId = org?.orgId
   data.companieCreatedByUserId = user?.uid

   const ret = await Firebase.firestore().collection('companies').doc(data.companieId).set(data, { merge: true }).then(() => {
      return { error: false, message: 'Salvo com sucesso!' }
   }).catch(error => {
      return { error: true, message: `Erro ao salvar os dados! (${error.id})`, data: null };
   })

   console.log('setCompanieData', ret);

   return ret
}

/**
 * Função para aplicar os filtros e ordenação a função de consulta do Firestore
 * @param { string } orgId - filtrar empresas da organização
 * @param { string } order - Tipo de ordenação (asc | desc)
 * @param { string } orderBy - Campo para ordenar (Ex: date_event)
 * @param { Array<Object> } filters - Lista de filtros para aplicar, contendo { id: nome do campo (Ex: date_event), operation: tipo de operação do Firestore (Ex: <=), value: valor para filtrar }
 * @param { firebase.firestore.DocumentData } lastDoc - Último documento do Firestore lido, usado para paginação como ponto de referência para carregar um novo conjunto de documentos
 * @returns Consulta do Firestore
 */
function getFilters(orgId, order = 'asc', orderBy = 'createdAt', filters, lastDoc, limit = ROWS_PER_PAGE_TABLE) {
   let query = Firebase.firestore().collection('companies')
   console.log('orgId', orgId)
   console.log('filters', filters)

     if (orgId != null) {
       query = query.where('orgId', '==', orgId)
     }

   if (filters?.length) {
      filters.forEach(filter => {
         query = query.where(filter.id, filter.operation, filter.value)
      })
   }

   query = query.orderBy(orderBy, order)

   if (lastDoc) {
      query = query.startAfter(lastDoc)
   }

   query.limit(limit)


   return query
}

export async function loadCompaniesInDB(table, userData, loadPage = null) {
   const { order, orderBy, lastDoc, allData, filters } = table
   let orgId = null;

   // if (userData?.orgId) orgId = userData?.orgId;

   return await getFilters(orgId, order, orderBy, filters, loadPage ? lastDoc : null).get()
      .then(snap => {
         // console.log('snaps', snap.docs.map(doc => doc.data()))
         return {
            ...table,
            pageData: snap.docs.map(doc => doc.data()),
            allData: [...(loadPage ? allData : []), ...snap.docs.map(doc => doc.data())],
            loadingMore: false,
            lastDoc: snap.docs[snap.size - 1],
            hasNextPage: snap.size >= ROWS_PER_PAGE_TABLE
         }
      })
      .catch(error => {
         // errorHandler(error, 'Ocorreu um erro ao carregar os dados das empresas', 'Companie', 'loadCompanieInDB')
         return { ...table, pageData: [], allData: loadPage ? allData : [], loadingMore: false, lastDoc: null, hasNextPage: false }
      })

}