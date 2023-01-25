// import { DATE_FORMAT } from 'constants/patterns'
// import dayjs from 'dayjs'

/**
 * Formats the user or company identity document to a readable value
 * 
 * **Ex:** 12345678900 -> 123.456.789-00
 * 
 * ---
 * 
 * @param { string } value - CPF/CNPJ
 * @returns { string } Formatted value
*/
function identity(value) {
    if (value) {
        const strValue = String(value).replace(/\D/g, '')

        if (strValue.length === 11) {
            return `${ strValue.slice(0, 3) }.${ strValue.slice(3, 6) }.${ strValue.slice(6, 9) }-${ strValue.slice(9) }`
        } else if (strValue.length === 14) {
            return `${ strValue.slice(0, 2) }.${ strValue.slice(2, 5) }.${ strValue.slice(5, 8) }/${ strValue.slice(8, 12) }-${ strValue.slice(12) }`
        }

        return strValue
    }
    return 'CPF/CNPJ não informado'
}

/**
 * Formats the phone number to the format (00) 0 0000-0000
 * 
 * ---
 * 
 * @param { string } value - Phone
 * @returns { string } Formatted value
*/
function phone(value) {
    if (value) {
        const strValue = String(value).replace(/\D/g, '')
        if (strValue.length === 10) {
            return `(${ strValue.slice(0, 2) }) ${ strValue.slice(2, 6) }-${ strValue.slice(6, 10) }`
        } else if (strValue.length === 11) {
            return `(${ strValue.slice(0, 2) }) ${ strValue.slice(2, 3) }${ strValue.slice(3, 7) }-${ strValue.slice(7, 11) }`
        }

        return strValue
    }
    return 'Não informado'
}

// /**
//  * Formats the user's last access date to a readable format
//  * 
//  * ---
//  * 
//  * @param { string } value - Date in ISO8601 UTC format
//  * @returns { string } Formatted value
// */
// function lastAccess(value) {
//     const date = new Date(value)
//     const today =  new Date()
//     if (date.isSame(today, 'day')) return `Hoje - ${ date.format('HH:mm') }`
//     if (date.isSame(today.subtract(1, 'day'), 'day'))  return `Ontem - ${ date.format('HH:mm') }`
//     return date.format(DATE_FORMAT.small)
// }

/**
 * Returns the first two characters of the user's first and last name
 * @param { string } name - Username
 * @returns { string } Letters
*/
// function avatarName(name) {
//     return name ? name[0] + (name.split(' ')[1]?.[0] || '') : ''
// }

/**
 * Returns an error message to the user according to the code, along with the field ID (if any). Or an empty object if the error is not in the list of known errors
 * 
 * ---
 * 
 * @param {{ code: string }} error - Firestore error
 * @returns {{ message: string, id: string }} Error message and the error field id if any, or an empty object
*/
function signError(error) {            
    switch(error.code) {
        case 'auth/user-disabled': return { id: 'email', message: 'Este e-mail foi desativado' }
        case 'auth/invalid-email': return { id: 'email', message: 'Preencha um e-mail válido' }
        case 'auth/user-not-found': return { id: 'email', message: 'E-mail não encontrado' }
        case 'auth/wrong-password': return { id: 'password', message: 'A senha está incorreta' }
        case 'auth/weak-password': return { id: 'password', message: 'A senha é muito curta' }
        case 'auth/credential-already-in-use':
        case 'auth/email-already-in-use':
        case 'auth/account-exists-with-different-credential': return { id: 'email', message: 'Este e-mail já está sendo usado' }
        case 'auth/network-request-failed': return { message: 'Ocorreu um erro de conexão' }
        default: return {}
    }
}

// /**
//  * Formats the amount in float to a string with cents separated by a comma and insert the R$ symbol
//  * 
//  * **Ex:** 100.5 = R$ 100.50
//  * 
//  * ---
//  * 
//  * @param { string | number } amountValue - Amount
//  * @param { boolean } includeCurrency - Whether to include the R $ symbol (Default true)
//  * @returns { string } Formatted value
// */
// function amount(value, includeCurrency=true) {
//     if (typeof value === 'number' || value) {
//         const strValue = String(value)
//         const valSplit = strValue.split('.')
//         const integ = valSplit[0]
//         const cents = valSplit[1]
    
//         return `${ includeCurrency ? 'R$ ' : '' }${ integ.replace(/\B(?=(\d{3})+(?!\d))/g, ".") }${ cents ? `,${ cents }` : '' }`
//     }

//     return ''
// }

// /**
//  * Formats the postal code to insert the '-'
//  * 
//  * ---
//  * 
//  * @param { string } value - Postal code
//  * @returns { string } Formatted value
// */
// function postalCode(value) {
//     if (value) {
//         const strValue = String(value).replace(/\D/g, '')
//         if (strValue.length === 8) return `${ strValue.slice(0, 5) }-${ strValue.slice(5, 8) }`
//         return strValue
//     }
//     return 'Não informado'
// }

/**
 * Convert a file size to another size based on a unit
 * 
 * ---
 * 
 * @param { number } size - File size in bytes
 * @param { ('kb' | 'mb' | 'gb') } unit - Unit to convert
 * @returns { number } New file size
 */
function fileSize(size, unit) {
    switch(unit) {
        case 'kb': return size / 1024
        case 'mb': return size / 1048576 
        case 'gb': return size / 1073741824
        default: return size
    }
}

const formatValue = {
    identity,
    phone,
    // lastAccess,
    // avatarName,
    signError,
    // amount,
    // postalCode,
    fileSize
}

export default formatValue