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


export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const GET_DAY_WEEK_PT = {
   Sunday: "Domingo",
   Monday: "Segunda",
   Tuesday: "Terça",
   Wednesday: "Quarta",
   Thursday: "Quinta",
   Friday: "Sexta",
   Saturday: "Sábado"
}
export const GET_DAY_WEEK_PT_ABREVIADO = {
   Sunday: "Dom",
   Monday: "Seg",
   Tuesday: "Ter",
   Wednesday: "Qua",
   Thursday: "Qui",
   Friday: "Sex",
   Saturday: "Sáb"
}



export const MONTHS = {
   1: "Janeiro",
   2: "Fevereiro",
   3: "Março",
   4: "Abril",
   5: "Maio",
   6: "Junho",
   7: "Julho",
   8: "Agosto",
   9: "Setembro",
   10: "Outubro",
   11: "Novembro",
   12: "Dezembro"
 }
