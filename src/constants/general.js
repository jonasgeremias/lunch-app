export const DATABASE_VERSION = 1;

export const DRAWER_WIDTH = 200;

export const ROWS_PER_PAGE_TABLE = 5

export const LOTTIE_OPTIONS = animation => ({
   loop: true,
   autoplay: true,
   rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
   },
   animationData: animation,
})

export const USER_TYPES_ARRAY = ['client', 'organization', 'admin', 'restaurant', 'financier']

export const USER_TYPES = {
   client: { name: 'Cliente', id: 'client' },
   restaurant: { name: 'Restaurante', id: 'restaurant' },
   financier: { name: 'Financeiro', id: 'financier' },
   organization: { name: 'Adm. Organização', id: 'organization' },
   admin: { name: 'Administrador', id: 'admin' }
}

export const STATUS_OPTIONS_ARRAY = ["active", "inactive"]
export const STATUS_OPTIONS = {
   active: { id: 'active', name: 'Ativo' },
   inactive: { id: 'inactive', name: 'Inativo' }
}

/**Common used date formats in dayjs */
export const DATE_FORMAT = {
   large: 'DD [de] MMMM [de] YYYY [às] HH:mm',
   medium: 'DD MMM YY - HH:mm',
   small: 'DD MMM YY',
   input: 'DD/MM/YYYY'
}

// // @audit apenas para consulta ------------------------------------------------
// // @@ Para montar o banco de dados
// const USER_DATA = {
//    uid: '',
//    status: 'active',
//    userType: 'client',
//    createdAt: "",
//    updatedAt: "",
//    approved: false,
//    orgId: '',
//    lunchDefault: 'buffet',
//    companyId: ''
// }

// @@ Para montar o banco de dados
// const REGISTER_USER_DATA = {
//    uid: '',
//    email: '',
//    emailVerified: false,
//    isAnonymous: false,
//    phoneNumber: null,
//    photoURL: null,
//    metadata: {
//       createdAt: "1674097887444",
//       creationTime: "Thu, 19 Jan 2023 03:11:27 GMT",
//       lastLoginAt: "1674623270442",
//       lastSignInTime: "Wed, 25 Jan 2023 05:07:50 GMT",
//    }
// }

// const RESTAURANT_DATA = {
//    restaurantId: '',
//    name: 'Restaurante do João',
//    phone: '',
//    email: '',
//    contactName: '',
//    linkLogo: 'link',
//    createdAt: '',
//    updatedAt: '',
//    approved: true,
//    companies: [], // Ids de companias para gerar
//    orgId: '',
//    lunchTypes: {
//       no: { name: 'não', id: 'no', description: 'não pedir almoço', price: 0 },
//       buffet: { name: 'Buffet', id: 'buffet', description: 'Almoço no buffet da empresa', price: 12.00 },
//       marmita: { name: 'Marmita', id: 'marmita', description: 'Marmita simples', price: 12.00 },
//       marmita2: { name: 'Marmita carne e salada', id: 'marmita2', description: 'Marmita de carne e salada', price: 12.00 }
//    }
// }

// const COMPANY_DATA = {
//    companyId: '',
//    name: 'Restaurante do João',
//    phone: '',
//    cnpj: '',
//    linkLogo: 'link',
//    createdAt: '',
//    updatedAt: '',
//    approved: true,
//    orgId: ''
// }

// const ORG_DATA = {
//    orgId: '',
//    name: 'Organização 1'
// }

