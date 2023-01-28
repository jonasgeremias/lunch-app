import React from 'react'
import DialogContainer from 'components/molecules/DialogContainer/DialogContainer'
import Typography from '@mui/material/Typography'

/**Dialog to ask user confirmation before delete something */
const ConfirmDeleteDialog = ({ visible, onCancel, onConfirm, title='Confirmar exclusão', description='Tem certeza que deseja excluir?', loading, isDelete=true, acceptLabel='Excluir' }) => (  
    <DialogContainer loading={ loading } showCancel title={ title } onClose={ onCancel } open={ visible } maxWidth='xs' isDelete={ isDelete }
        acceptLabel={ acceptLabel } onAccept={ onConfirm }
    >
        <Typography color='textSecondary'>{ description }</Typography>
    </DialogContainer> 
)

export default ConfirmDeleteDialog