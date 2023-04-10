import { ROWS_PER_PAGE_TABLE, USER_TYPES } from "constants/general";
import { CHANGED_LUNCH_PATH, USERS_PATH } from "constants/routes";
import { API_CREATE_USER, API_SET_CHANGED_LUNCH_BY_CLIENT, API_UPDATE_LUNCH_SETTINGS_BY_CLIENT, API_UPDATE_USER, API_UPDATE_USER_BY_CLIENT } from "./api_routes";
import Firebase, { getTimestamp } from "./firebase";
import dayjs from 'dayjs'

// get Users
// create or edit a user
// delete a user is not possible

function applyFiltersInTable(datafilters, clear = false) {
   let filters = []

   if (!(datafilters)) return []
   if (datafilters.length == 0) return []


   const { startDate, endDate, name, email, userType, status, phone } = datafilters;

   if (!clear) {
      const allFilters = [
         // { id: 'createdAt', operation: '>=', value: startDate ? Firebase.firestore.Timestamp.fromDate(new Date(startDate)) : ''},
         // { id: 'createdAt', operation: '<=', value: endDate ? Firebase.firestore.Timestamp.fromDate(new Date(endDate)) : ''},
         { id: 'name', operation: '==', value: name.replace(/ /g, '') ? name.trim() : '' },
         { id: 'email', operation: '==', value: email.replace(/ /g, '') ? email?.trim() : '' },
         { id: 'userType', operation: '==', value: userType },
         { id: 'status', operation: '==', value: status },
         { id: 'phone', operation: '==', value: phone },
      ]

      filters = allFilters.filter(el => Boolean(el.value) && el.value != ' ')
   }


   console.log('filters', filters)
   return filters
}

export async function getUserData(id) {
   if (!id) return null;
   return await Firebase.firestore().collection(USERS_PATH).doc(id).get().then(doc => {
      if (!doc.exists) return null
      else return doc.data()
   }).catch(error => {
      return null
   })
}

function getFilters(filters, order = 'des', orderBy = 'createdAt', lastDoc, limit = ROWS_PER_PAGE_TABLE) {
   let query = Firebase.firestore().collection(USERS_PATH)
   console.log('filters', filters)
   if (filters?.length) {
      filters.forEach(filter => {
         console.log('filter', filter)
         if (filter.value != '') {
            query = query.where(filter.id, filter.operation, filter.value)
         }
      })
   }

   console.log(query)
   return query
}


export async function loadUsersInDB(table, userData, loadPage = null) {
   const { order, orderBy, lastDoc, allData, filters } = table

   console.log('loadUsersInDB', table)

   // Pegando o ID da organização
   let orgId = null;
   if (userData?.orgId) orgId = userData?.orgId;

   // Se for admin, busca todos
   // let active = false;
   // let active = !(userData.userType === USER_TYPES.admin.id)

   let myfilters = applyFiltersInTable(filters);
   if (orgId) myfilters.push({ id: 'orgId', operation: '==', value: orgId })

   // Buscando do servidor
   return await getFilters(myfilters).get()
      .then(snap => {
         const data = [...(loadPage ? allData : []), ...snap.docs.map(doc => doc.data())]
         console.log('getFilters.get()', data)
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
         return { ...table, pageData: [], allData: loadPage ? allData : [], loadingMore: false, lastDoc: null, hasNextPage: false, error: true }
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



export async function setUserData(data, add, user, org) {
   console.log('setUserData', user)

   if (!user?.uid) return { error: true, message: 'Usuário inválido' };
   if ((user?.userType !== USER_TYPES.organization.id) && (user?.userType !== USER_TYPES.admin.id))
      return { error: true, message: 'Tipo de usuário inválido' };

   if (!org?.orgId) return { error: true, message: 'Organização inválida' };
   if (!('userType' in data)) return { error: true, message: 'Tipo de usuário inválido' };

   let route = API_UPDATE_USER;
   if (add) route = API_CREATE_USER;

   return Firebase.functions().httpsCallable(route)({ data, add, user, org })
      .then(res => {
         console.log('httpsCallable', res)
         return res.data
      })
      .catch(error => {
         console.log(error)
         return { error: true, message: 'erro: ' + JSON.stringify(error) }
      })
}

// export async function setUserDataByClient(data, user, org) {
//    if (!user?.uid) return { error: true, message: 'Usuário inválido' };
//    if (!org?.orgId) return { error: true, message: 'Organização inválida' };

//    return Firebase.functions().httpsCallable(API_UPDATE_USER_BY_CLIENT)({ data, user, org })
//       .then(res => {
//          console.log('httpsCallable', res)
//          return res.data
//       })
//       .catch(error => {
//          console.log(error)
//          return { error: true, message: 'erro: ' + JSON.stringify(error) }
//       })
// }

export async function updateLunchSettingsByClient(data, user, org) {
   if (!user?.uid) return { error: true, message: 'Usuário inválido' };
   if (!org?.orgId) return { error: true, message: 'Organização inválida' };

   return Firebase.functions().httpsCallable(API_UPDATE_LUNCH_SETTINGS_BY_CLIENT)({ data, user, org })
      .then(res => {
         console.log('httpsCallable', res)
         return res.data
      })
      .catch(error => {
         console.log(error)
         return { error: true, message: 'erro: ' + JSON.stringify(error) }
      })
}

// @ok
export async function setLunchChangeByClient(data, user, org) {
   if (!user?.uid) return { error: true, message: 'Usuário inválido' };
   if (!org?.orgId) return { error: true, message: 'Organização inválida' };
   
   console.log('setLunchChangeByClient', data, user, org)
   
   return Firebase.functions().httpsCallable(API_SET_CHANGED_LUNCH_BY_CLIENT)({ data, user, org })
      .then(res => {
         console.log('httpsCallable', res)
         return res.data
      })
      .catch(error => {
         console.log(error)
         return { error: true, message: 'erro: ' + JSON.stringify(error) }
      })
}

// @ok
export async function getChangedLunchesInDbByDate(userData, month, year) {
   if (!userData?.uid) return [];

   let docRef = Firebase.firestore().collection(USERS_PATH).doc(userData.uid).collection(CHANGED_LUNCH_PATH)
   docRef = docRef.where('uid', '==', userData.uid).where('year', '==', year).where('month', '==', month).limit(1)

   // Buscando do servidor
   return await docRef.get().then(snap => {
      let doc = {
         error: false,
         year: year,
         month: month,
         data: {}
      }

      if (!snap.empty) {
         doc.data = snap.docs[0].data() // [...snap.docs.map(doc => doc.data())]
      }
      return doc

   })
      .catch(error => {
         console.log(error)
         return {
            error: true,
            year: year,
            month: month,
            data: {}
         }
      })
}
