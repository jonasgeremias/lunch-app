import { DATE_FORMAT } from "./general"

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


/**Basic input props */
export const DEF_PROPS = {
   id: {
      size: 'small',
      variant: 'outlined',
      autoComplete: "off",
      fullWidth: true,
      disabled: true
   },
   name: {
      size: 'small',
      variant: 'outlined',
      fullWidth: true,
      autoComplete: "off",
      inputProps: { maxLength: LENGTH.name.max, type: 'text' }
   },
   text: {
      fullWidth: true,
      autoComplete: "off",
      size: 'small',
      // variant: 'outlined',
      inputProps: { maxLength: '300', type: 'text' }
   },
   menu: {
      fullWidth: true,
      autoComplete: "off",
      size: 'small'
   },
   datePicker: {
      variant: 'dialog',
      autoOk: true,
      inputFormat: DATE_FORMAT.input,
      renderinput: {
         size: 'small',
         fullWidth: true,
      },
      disableFuture: true,
      clearable: true,
      invalidLabel: '',
      invalidDateMessage: '',
      cancelLabel: 'Cancelar',
      clearLabel: 'Limpar data',
      fullWidth: true
   },
   description: {
      multiline: true,
      fullWidth: true,
      label: "Descrição",
      inputProps: { maxLength: '1000', type: 'text' }
   },
   unit: {
      fullWidth: true,
      variant: 'outlined',
      label: "Unidade",
      inputProps: { maxLength: '10', type: 'text' }
   },
   email: {
      required: true,
      size: 'small',
      variant: 'outlined',
      fullWidth: true,
      label: "Email",
      autoComplete: "off",
      inputProps: { maxLength: LENGTH.email.max, type: 'email' }
   },
   password: {
      label: "Senha",
      margin: "normal",
      required: true,
      fullWidth: true,
      autoComplete: "current-password",
      inputProps: { maxLength: LENGTH.password.max, type: 'password' }
   },
   phone: {
      autoComplete: 'tel-national',
      type: 'tel',
      size: 'small',
      variant: 'outlined',
      fullWidth: true,
      label: "Telefone",
      inputProps: { type: 'tel' }
   },
   cnpj: {
      autoComplete: 'off',
      required: true,
      fullWidth: true,
      size: 'small',
      variant: 'outlined',
      label: "CNPJ",
      inputProps: { type: 'text' }
   },
   cpf: {
      required: true,
      fullWidth: true,
      label: "CPF",
      inputProps: { type: 'text' }
   },
   // address: {
   //    label: 'Endereço',
   //    fullWidth: true,
   //    inputProps: { maxLength: LENGTH.address.max, type: 'text' },
   //    autoComplete: 'street-address'
   // },
   // postalCode: {
   //    autoComplete: 'postal-code',
   //    inputProps: { type: 'text' }
   // },
   // rg: {
   //    inputProps: { maxLength: LENGTH.rg.max, type: 'text' }
   // },
   // money: {
   //    thousandsSeparatorSymbol: '.',
   //    allowDecimal: true,
   //    decimalSymbol: ',',
   //    decimalLimit: 2,
   //    integerLimit: 6,
   // }
   // website: {
   //    autoComplete: 'url',
   //    fullWidth: true,
   //    label: "Website",
   //    inputProps: { maxLength: '100', type: 'text' }
   // },
   // creditCard: {
   //    number: {
   //       fullWidth: true,
   //       size: 'small',
   //       autoComplete: 'cc-number',
   //       variant: 'outlined',
   //       label: "Número",
   //       name: 'number',
   //       inputProps: { type: 'text' }
   //    },
   //    name: {
   //       fullWidth: true,
   //       size: 'small',
   //       autoComplete: "cc-name",
   //       variant: 'outlined',
   //       name: 'name',
   //       label: "Nome do titular",
   //       inputProps: { maxLength: LENGTH.name.max, type: 'text' }
   //    },
   //    expiry: {
   //       fullWidth: true,
   //       size: 'small',
   //       autoComplete: "cc-exp",
   //       variant: 'outlined',
   //       name: 'expiry',
   //       label: "Expiração",
   //       inputProps: { type: 'text' }
   //    },
   //    cvc: {
   //       fullWidth: true,
   //       size: 'small',
   //       name: 'cvc',
   //       variant: 'outlined',
   //       label: "CVC",
   //       inputProps: { type: 'text' }
   //    }
   // }
}



export const REGEX = {
   email: '^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$',
   name: '^([a-zA-Z\\u00C0-\\u00FF ]){2,80}$',
   phone: '^(([(]([0-9]{2})[)])|([0-9]{2}))[ ]?[0-9]?[ ]?[0-9]{4}(s|[-])?[0-9]{4}$',
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