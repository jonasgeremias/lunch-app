import React from 'react'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import useStyles from './useStyles'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'
import { LoadingButton } from '@mui/lab'

/**
 * Dialog container, with a header title and bottom buttons
 */
const DialogContainer = ({ title, variantTitle, onClose, onAccept, acceptLabel, showCancel, open, children, loading, isDelete, maxWidth='xs', disableAccept }) => {
    const classes = useStyles()
    const gClasses = useGlobalStyles()
    return (
        <Dialog PaperProps={{ className: gClasses.border8 }} onClose={ onClose } open={ open }
            fullWidth maxWidth={ maxWidth } scroll='body' >
            <div className={ classes.background }>
                <div className={ clsx(gClasses.flexAlignCenterJustifyBetween, gClasses.fullWidth, gClasses.marginBottom16, !title && classes.float) }>
                    <Typography variant={variantTitle? variantTitle : 'h5'} className={ gClasses.bold }>{ title }</Typography>
                    <IconButton size='small' onClick={ onClose } disabled={ Boolean(loading) }>
                        <CloseIcon/>
                    </IconButton>
                </div>
                { children }
                <DialogActions className={ classes.actions }>
                    { showCancel ? <Button onClick={ onClose } color="inherit" disabled={ Boolean(loading) }>Cancelar</Button> : null }
                    { onAccept || acceptLabel ?
                        <LoadingButton 
                           disabled={ Boolean(disableAccept || loading)} 
                           color={isDelete ? 'error': "primary"} 
                           onClick={ onAccept || onClose } 
                           variant='contained'
                           loading={loading}
                           // style={ isDelete ? { backgroundColor: '#d32f2f', color: '#eee', opacity: loading ? .7 : 1 } : {}}
                           startIcon={ loading ? <CircularProgress color='inherit' size={ 20 }/> : null }
                        >   
                            { (acceptLabel || 'OK') }
                        
                        </LoadingButton> : null
                    }
                </DialogActions>
            </div>
        </Dialog>
    )
}
export default DialogContainer