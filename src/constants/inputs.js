
export const LENGTH = {
   name: { min: 2, max: 100 },
   email: { min: 2, max: 100 },
   password: { min: 6, max: 30 },
   phone: { min: 10, max: 11 },
   identity: { min: 11, max: 14 },
   rg: { min: 3, max: 14 },
   postalCode: { min: 8, max: 8 },
   address: { min: 3, max: 150 },
   device: {
      sn: { min: 1, max: 20 },
      key: { min: 1, max: 20 }
   }
}

export const DEF_PROPS_LOGIN = {
   email: {
      variant: 'outlined',
      required: true,
      fullWidth: true,
      label: "Email",
      autoFocus: true,
      autoComplete: "email",
      inputProps: { maxLength: LENGTH.email.max, type: 'email' }
   },
   password: {
      label: "Senha",
      margin: "normal",
      required: true,
      fullWidth: true,
      autoComplete: "current-password",
      inputProps: { maxLength: LENGTH.password.max, type: 'password' }
   }
}

export const REGEX = {
   email: '^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$',
   name: '^([a-zA-Z\\u00C0-\\u00FF ]){2,80}$',
   phone: '^(([(]([0-9]{2})[)])|([0-9]{2}))[ ]?[0-9]?[ ]?[0-9]{4}(s|[-])?[0-9]{4}$',
   // device: {
   //     variables: {
   //         keyValueId: '/[^a-z0-9]/gi'
   //     }
   // }
}

export const MASK = {
   phone: value => [...['(', /[1-9]/, /\d/, ')', ' '], ...('2345'.includes(value?.replace(/\D/g, '')[2]) ? [] : [/\d/]), ...[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]],
   postalCode: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
   identity: value => value?.length > 11 ? [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/] : [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
   cpf: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
   cnpj: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
   //amount: createNumberMask({ ...DEF_PROPS.money, prefix: `R$ ` }),
   creditCard: {
      number: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      expiry: [/\d/, /\d/, '/', /\d/, /\d/],
      cvc: [/\d/, /\d/, /\d/]
   }
}