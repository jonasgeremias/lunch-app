

import validateInput from './validateInput'

function changeInput(value, id) { // @pending alterei, removi o type 
   switch(id) {
       case 'email': return {id, payload: value, error: validateInput.email(value) }
       case 'password': return {id, payload: value, error: validateInput.password(value) }
       default: return {id, payload: value }
   }
}

export default changeInput;