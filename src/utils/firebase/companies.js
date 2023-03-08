// import dayjs from 'dayjs'
import { ROWS_PER_PAGE_TABLE, USER_TYPES } from "constants/general";
import { COMPANIE_PATH } from "constants/routes";
import Firebase, { getTimestamp } from "./firebase";

export async function getCompanieData(id) {
   if (!id) return null;
   return await Firebase.firestore().collection(COMPANIE_PATH).doc(id).get().then(doc => {
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

   const datenow = getTimestamp();

   const item = {
      ...data,
      updatedAt: datenow,
      orgId: org?.orgId,
      companieCreatedByUserId: user?.uid
   }

   if (adding) item.createdAt = datenow;

   const ret = await Firebase.firestore().collection(COMPANIE_PATH).doc(data.companieId).set(item, { merge: true }).then((doc) => {
      console.warn('doc', item)
      return { error: false, message: 'Salvo com sucesso!', data: item }
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

function getFilters(order = 'des', orderBy = 'createdAt', filters, lastDoc, limit = ROWS_PER_PAGE_TABLE) {
   let query = Firebase.firestore().collection(COMPANIE_PATH)
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
   let active = false;
   // active = !(userData.userType == USER_TYPES.admin.id) // @pending 
   console.log('active', active)

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

// @pending ver permissôes
export async function inactiveCompaniesInDB(selectedRowsData, userData) {
   if (!selectedRowsData || selectedRowsData.length < 1) return { error: true, message: 'Selecione um item!' }
   let ret = await selectedRowsData.map(async (docId) => {
      const query = Firebase.firestore().collection(COMPANIE_PATH).doc(docId)

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

export const updateExceptionsDatesinDB = async (docId, data) => {
   try {
      if (data?.ExceptionsDates) {
         const query = Firebase.firestore().collection(COMPANIE_PATH).doc(docId)
         const newExceptionsDates = Firebase.firestore.FieldValue.arrayUnion(...data.ExceptionsDates);
         await query.update({ ExceptionsDates: newExceptionsDates });
         return { error: false, message: 'Atualizado com sucesso!', data: data }
      }
   } catch (error) {
      return { error: true, message: 'Erro ao atualizar, tente novamente!', data: data }
   }
};


