// import dayjs from 'dayjs'
import { ROWS_PER_PAGE_TABLE, USER_TYPES } from "constants/general";
import { COMPANIES_PATH } from "constants/routes";
import Firebase, { getTimestamp } from "./firebase";

export async function getCompanyData(id) {
   if (!id) return null;
   return await Firebase.firestore().collection(COMPANIES_PATH).doc(id).get().then(doc => {
      if (!doc.exists) return null
      else return doc.data()
   }).catch(error => {
      return null
   })
}

export async function setCompanyData(data, adding, user, org) {
   if (!data?.companyId) return { error: true, message: 'ID inválido' };
   if (!user?.uid) return { error: true, message: 'Usuário inválido' };
   if (!org?.orgId) return { error: true, message: 'Organização inválida' };

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
   const docRef = Firebase.firestore().collection(COMPANIES_PATH).doc(data.companyId)
   
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

/**
 * Função para aplicar os filtros e ordenação a função de consulta do Firestore
 * @param { string } orgId - filtrar empresas da organização
 * @param { string } order - Tipo de ordenação (asc | desc)
 * @param { string } orderBy - Campo para ordenar (Ex: date_event)
 * @param { Array<Object> } filters - Lista de filtros para aplicar, contendo { id: nome do campo (Ex: date_event), operation: tipo de operação do Firestore (Ex: <=), value: valor para filtrar }
 * @param { firebase.firestore.DocumentData } lastDoc - Último documento do Firestore lido, usado para paginação como ponto de referência para carregar um novo conjunto de documentos
 * @returns Consulta do Firestore
 */

function getFilters(order = 'des', orderBy = 'createdAt', filters, lastDoc, limit = ROWS_PER_PAGE_TABLE) {
   let query = Firebase.firestore().collection(COMPANIES_PATH)
   if (filters?.length) {
      filters.forEach(filter => {
         query = query.where(filter.id, filter.operation, filter.value)
      })
   }

   // query = query.orderBy(orderBy, order)
   // if (lastDoc) {
   //    query = query.startAfter(lastDoc)
   // }
   // query.limit(limit)

   return query
}


export async function loadCompaniesInDB(table, userData, loadPage = null) {
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

export async function inactiveCompaniesInDB(selectedRowsData, userData) {
   if (!selectedRowsData || selectedRowsData.length < 1) return { error: true, message: 'Selecione um item!' }
   let ret = await selectedRowsData.map(async (docId) => {
      const query = Firebase.firestore().collection(COMPANIES_PATH).doc(docId)

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

// export const updateFieldValueInDoc = async (docId, field, value) => {
//    const docRef = Firebase.firestore().collection(COMPANIES_PATH).doc(docId)
//    return docRef.get().then((docSnapshot) => {
//       if (docSnapshot.exists) {
//          return docRef.update({ [`${field}`]: value });
//       } else {
//          return { error: true, message: `Documento não encontrado (${docId})` }
//       }
//    })
//       .then(() => {
//          return { error: false, message: `Documento atualizado` }
//       })
//       .catch((error) => {
//          console.log('updateFieldValueInDoc', error)
//          return { error: true, message: `Erro ao atualizar o campo ${field}` }
//       });
// };

