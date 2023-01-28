import { useState } from "react"
import { useGlobalStyles } from "styles"
import DialogContainer from 'components/molecules/DialogContainer/DialogContainer'

const AddEditDialog = ({companieData, visible, onClose}) => {
   // const {currentDeviceId, name, nameError, description, loading, sn, snError, key, keyError } = companieData
   // const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)
   const gClasses = useGlobalStyles()

   const handleSave = () => {
       setLoading(true)

       setTimeout(() => {
           onClose();
           setLoading(false)
       }, 500);
       
       // dispatch(saveDevice(currentDeviceId, orgData, name, nameError, description, sn, snError, key, keyError))
   }
   
   
   const adding = !companieData;
   
   // Campo que está sendo alterado
   const handleChangeValue = id => ({ target }) => {
       // dispatch(changeValue(target.value, id))
   }

   const handleKeyPress = ({ key }) => {
       // if (key === 'Enter'){
       //     handleSave()
       // }
   }

   return (  
       <DialogContainer loading={ Boolean(loading) } showCancel title={ `${ adding ? 'Adicionar' : 'Editar' } Usuário` } onClose={ onClose }
           open={Boolean(visible)} maxWidth='sm' acceptLabel='Salvar' onAccept={ handleSave }
       >
           <div className={ gClasses.paddingTop10 }>

           {JSON.stringify(companieData)}

           </div>
           {/* <div className={ gClasses.paddingTop10 }>
               <TextField { ...DEF_PROPS.name } value={ name } helperText={ nameError } error={ Boolean(nameError) } label='Nome do dispositivo'
                   autoComplete={ undefined } variant='outlined' onChange={ handleChangeValue('name') } className={ gClasses.marginBottom16 }
                   onKeyPress={ handleKeyPress }
               />
               <TextField { ...DEF_PROPS.description } value={ description } variant='outlined' onChange={ handleChangeValue('description') }
                   className={ gClasses.marginBottom16 } onKeyPress={ handleKeyPress }
               />
               <Grid container spacing={ 2 }>
                   { !adding ?
                       <Grid item xs={ 12 } md={ 6 }>
                           <TextField { ...DEF_PROPS.device.sn } value={ sn } helperText={ snError } error={ Boolean(snError) } variant='outlined'
                               className={ gClasses.marginBottom16 } onChange={ handleChangeValue('sn') } onKeyPress={ handleKeyPress }
                           />
                       </Grid> : null 
                   }
                   <Grid item xs={ 12 } md={ adding ? 12 : 6 }>
                       <TextField { ...DEF_PROPS.device.key } value={ key } variant='outlined' className={ gClasses.marginBottom16 } error={ Boolean(keyError) }
                           helperText={ keyError } onChange={ handleChangeValue('key') } onKeyPress={ handleKeyPress }
                       />
                   </Grid>
               </Grid>
           </div> */}
       </DialogContainer> 
   )
}

export default AddEditDialog