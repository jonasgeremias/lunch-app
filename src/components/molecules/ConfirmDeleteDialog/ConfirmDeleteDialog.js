import React from 'react'
import DialogContainer from 'components/molecules/DialogContainer/DialogContainer'
import Typography from '@mui/material/Typography'

/**Dialog to ask user confirmation before delete something */
const ConfirmDeleteDialog = ({ variantTitle, children, visible, onCancel, onConfirm, title='Confirmar exclusão', description='Tem certeza que deseja excluir?', loading, isDelete=true, acceptLabel='Excluir' }) => (  
    <DialogContainer loading={ loading } variantTitle={variantTitle} showCancel title={ title } onClose={ onCancel } open={ visible } maxWidth='xs' isDelete={ isDelete }
        acceptLabel={ acceptLabel } onAccept={ onConfirm }
    >
        {description? <Typography color='textSecondary'>{ description }</Typography>:null}
        {children}
    </DialogContainer> 
)

export default ConfirmDeleteDialog