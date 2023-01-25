import { firebase } from "./firebase";

/**
 * Save an error message in the database for registration and show the message to the user
 * 
 * ---
 * 
 * @param { object } error - Error data object
 * @param { string } message - Message to the user
 * @param { string } path - Location where error happened
 * @param { string } func - Function name
*/
export default function logHandler(uid, error, message, path, func) {
   let showMessage = `${message}: ${error?.code || error}`.slice(0, 100)
   const denied = error?.code?.includes('permission-denied')
   const errorLog = `Error in path ${path} - In function ${func} - With log ${JSON.stringify(error).slice(0, 100)}`
   // const uid = getReducer('app', 'user', 'uid')

   if (denied) {
      showMessage = '🤨 Humm... Você não tem permissão para isso'
   } else {
      console.log(errorLog)
   }

   if (!denied && process.env.NODE_ENV === 'production') {

      // let now = new Date();
      // const happenedAt = now.toISOString().split('T')[0];
      const happenedAt = dayjs().utc().format('YYYY-MM-DD')

      firebase.firestore().collection('system').doc('errors').update({
         [`${happenedAt}`]: firebase.fieldValue.arrayUnion({
            happenedAt,
            message: showMessage,
            log: errorLog,
            uid,
            code: error?.code || 'internal',
            device: window ? {
               userAgent: navigator.userAgent,
               language: navigator.language,
               online: navigator.onLine,
               cookiesEnabled: navigator.cookieEnabled,
               screenSize: `${window.screen.width}px - ${window.screen.height}px`
            } : {}
         })
      })
   }
   // dispatch({ type: SNACKBAR_SHOW, message: showMessage, variant: denied ? 'warning' : 'error' })
}