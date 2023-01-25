// import { ADD_EDIT_DEVICE_CHANGE_VALUE, DEVICE_ADD_EDIT_RULE_CHANGE_VALUE, SIGN_IN_CHANGE_VALUE, SIGN_UP_CHANGE_VALUE, SNACKBAR_SHOW } from "constants/actionTypes"
// import { RULES, VARIABLE_TYPES } from "constants/device"
import { REGEX, LENGTH } from "constants/inputs"

/**
 * @param { string } value - Email
 * @param { boolean } acceptEmpty - If the passed value can be empty
 * @returns { string } An error message if exist
*/
function email(value, acceptEmpty = 0) {
    if (acceptEmpty && value === '') return ''
    if (value.length < LENGTH.email.min || !value.match(REGEX.email)) return 'Preencha um e-mail válido'
    return ''
}

/**
 * @param { string } value - Password
 * @param { boolean } acceptEmpty - If the passed value can be empty
 * @returns { string } An error message if exist
*/
function password(value, acceptEmpty) {
    if (acceptEmpty && value === '') return ''
    if (value.length < LENGTH.password.min) return `A senha precisa ter ${LENGTH.password.min} caracteres ou mais`
    return ''
}

/**
 * @param { string } value - Phone number
 * @param { boolean } acceptEmpty - If the passed value can be empty
 * @returns { string } An error message if exist
*/
function phone(value, acceptEmpty) {
    const digitValue = value.replace(/\D/g, '')

    if (acceptEmpty && digitValue === '') return ''
    if (digitValue.length < LENGTH.phone.min) return 'Preencha um telefone válido'
    return ''
}

/**
 * @param { string } value - Name
 * @param { boolean } acceptEmpty - If the passed value can be empty
 * @returns { string } An error message if exist
*/
function name(value, acceptEmpty) {
    if (acceptEmpty && value === '') return ''
    if (value.length < LENGTH.name.min) return 'Preencha um nome válido'
    return ''
}

/**
 * @param { string } value - Postal Code
 * @param { boolean } acceptEmpty - If the passed value can be empty
 * @returns { string } An error message if exist
*/
function postalCode(value, acceptEmpty) {
    const digitValue = value.replace(/\D/g, '')

    if (acceptEmpty && digitValue === '') return ''
    if (digitValue.length < LENGTH.postalCode.min) return 'Preencha um CEP válido'
    return ''
}

// /**
//  * @param { string } value - Serial number
//  * @param { boolean } acceptEmpty - If the passed value can be empty
//  * @returns { string } An error message if exist
// */
// function deviceSn(value, acceptEmpty) {
//     if (acceptEmpty && value === '') return ''
//     if (value.length < LENGTH.device.sn.min) return 'O número de série é muito curto'
//     return ''
// }

// /**
//  * @param { string } value - Device key
//  * @param { boolean } acceptEmpty - If the passed value can be empty
//  * @returns { string } An error message if exist
// */
// function deviceKey(value, acceptEmpty) {
//     if (acceptEmpty && value === '') return ''
//     if (value.length < LENGTH.device.key.min) return 'A chave é muito curta'
//     return ''
// }

/**
 * @param { Dispatch } dispatch - Dispatch that changes the error messages in the login and registration reducers
 * @param { boolean } isLogin - If the authentication performed is login
 * @param { string } email - E-mail
 * @param { string } password - Password
 * @param { string } fullName - Full name
 * @param { string } confirmPass - Repeated Password
 * @param { string } identity - CPF or CNPJ
 * @param { string } phone - Phone
 * @returns { boolean } Returns true if the values are correct
*/
function sign(email, password) {
    // let isValid = true
    if (email === '') return { id: 'email', isValid: false, payload: email, error: 'Preencha o e-mail' }
    if (password === '') return { id: 'password', isValid: false, payload: password, error: 'Preencha a senha' }
    return { isValid: true }

    // if (!isLogin) {
    //     if (fullName.trim() === '') {
    //         isValid = false
    //         dispatch ({ type: SIGN_UP_CHANGE_VALUE, payload: fullName, error: 'Preencha o nome', id: 'name' })
    //     }
    //     if (password !== confirmPass) {
    //         isValid = false
    //         dispatch ({ type: SIGN_UP_CHANGE_VALUE, payload: password, error: 'As senhas não coincidem', id: 'password' })
    //     }
    //     if (identity.replace(/\D/g, '').trim() === '') {
    //         isValid = false
    //         dispatch ({ type: SIGN_UP_CHANGE_VALUE, payload: identity, error: 'Preencha o campo ', id: 'identity' })
    //     }
    //     if (phone.replace(/\D/g, '').trim() === '') {
    //         isValid = false
    //         dispatch ({ type: SIGN_UP_CHANGE_VALUE, payload: phone, error: 'Preencha o telefone', id: 'phone' })
    //     }
    // }
    // return isValid
}

function forgotPassword(email) {
    if (email === '') return { id: 'email', isValid: false, payload: email, error: 'Preencha o e-mail' }
    return { isValid: true }
}


// /**
//  * @param { Dispatch } dispatch - Dispatch that changes the error messages in reducers
//  * @param { boolean } isEdit - True if user is editing an device
//  * @param { string } name - Device name
//  * @param { string } nameError - Device name error, if exists
//  * @param { string } sn - Serial number
//  * @param { string } snError - Serial Number error
//  * @param { string } key - Device key
//  * @param { string } keyError - Device key error, if exists
//  * @returns { boolean } Returns true if the values are correct
//  */
// function deviceSettings(dispatch, isEdit, name, nameError, sn, snError, key, keyError) {
//     let isValid = true
//     if (name === '') {
//         isValid = false
//         dispatch ({ type: ADD_EDIT_DEVICE_CHANGE_VALUE, id: 'name', payload: name, error: 'Preencha o nome' })
//     }
//     if (!isEdit && sn.length < LENGTH.device.sn.min) {
//         isValid = false
//         dispatch ({ type: ADD_EDIT_DEVICE_CHANGE_VALUE, id: 'sn', payload: sn, error: 'O número de série é muito curto' })
//     }
//     if (key.length < LENGTH.device.key.min) {
//         isValid = false
//         dispatch ({ type: ADD_EDIT_DEVICE_CHANGE_VALUE, id: 'key', payload: key, error: 'A chave é muito curta' })
//     }
//     if (Boolean(nameError) || Boolean(keyError)) {
//         isValid = false
//     }
//     if (!isEdit && (Boolean(snError))) {
//         isValid = false
//     }
//     return isValid
// }

// /**
//  * @param { Dispatch } dispatch 
//  * @param {*} name 
//  * @param {*} nameError 
//  * @param {*} variable 
//  * @param {*} needTarget 
//  * @param {*} targets 
//  * @param {*} variableType 
//  * @param {*} rule 
//  * @param {*} limit 
//  * @param {*} limitError 
//  * @param {*} lowLimit 
//  * @param {*} lowerLimitError 
//  * @param {*} uppLimit 
//  * @param {*} upperLimitError 
//  * @returns 
//  */
// function deviceRule(dispatch, name, nameError, variable, needTarget, targets, variableType, rule, limit, limitError, lowLimit, lowerLimitError, uppLimit, upperLimitError) {
//     let isValid = true

//     if (name.replace(/ /g, '') === '') {
//         isValid = false
//         dispatch ({ type: DEVICE_ADD_EDIT_RULE_CHANGE_VALUE, id: 'name', payload: name, error: 'Preencha o nome' })
//     }
//     if (variable === '') {
//         isValid = false
//         dispatch({ type: SNACKBAR_SHOW, message: 'Não esqueça de selecionar a variável', variant: 'warning' })
//     }
//     if (needTarget && targets.length === 0)  {
//         isValid = false
//         dispatch({ type: SNACKBAR_SHOW, message: 'Não esqueça de adicionar ao menos um alvo para a notificação', variant: 'warning' })
//     }

//     if (Boolean(nameError) || Boolean(limitError)  || (needTarget && targets.some(el => el.error))) {
//         isValid = false
//     }

//     if (variableType === VARIABLE_TYPES.in_an.id) {
//         if (rule === RULES.out_of_range.id) {
//             if (lowLimit.toString().replace(/\D/g, '') === '') {
//                 isValid = false
//                 dispatch ({ type: DEVICE_ADD_EDIT_RULE_CHANGE_VALUE, id: 'lowLimit', payload: limit, error: 'Preencha o limite inferior' })
//             }
//             if (uppLimit.toString().replace(/\D/g, '') === '') {
//                 isValid = false
//                 dispatch ({ type: DEVICE_ADD_EDIT_RULE_CHANGE_VALUE, id: 'uppLimit', payload: limit, error: 'Preencha o limite superior' })
//             }
//             if (Boolean(lowerLimitError) || Boolean(upperLimitError)) {
//                 isValid = false
//             }
//         } else {
//             if (limit.toString().replace(/\D/g, '') === '') {
//                 isValid = false
//                 dispatch ({ type: DEVICE_ADD_EDIT_RULE_CHANGE_VALUE, id: 'limit', payload: limit, error: 'Preencha o limite' })
//             }
//             if (Boolean(limitError)) {
//                 isValid = false
//             }
//         }
//     }

//     return isValid
// }

const validateInput = {
    email,
    password,
    sign,
    phone,
    name,
    postalCode,
    forgotPassword
    // deviceSn,
    // deviceKey,
    // deviceSettings,
    // deviceRule
}

export default validateInput