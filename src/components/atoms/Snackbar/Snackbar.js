import React, { createContext, useContext, useState } from 'react';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';

const SnackBarContext = createContext({});

export const SnackBarProvider = ({ children }) => {
   const [open, setOpen] = useState(false);
   const [message, setMessage] = useState('');
   const [typeColor, setTypeColor] = useState('info');
   const [timeout, setTimeout] = useState(3000);

   const showSnackBar = (text, color, time = 3000) => {
      setMessage(text);
      setTypeColor(color);
      setTimeout(time);
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <SnackBarContext.Provider value={{ showSnackBar }}>
         <Snackbar
            open={open}
            autoHideDuration={timeout}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleClose}>
            <Alert variant="filled" onClose={handleClose} severity={typeColor} sx={{ marginTop: '5px' }}>
               {message}
            </Alert>
         </Snackbar>
         {children}
      </SnackBarContext.Provider>
   );
};

export const useSnackBar = () => {
   const context = useContext(SnackBarContext);

   if (!context) {
      throw new Error('useSnackBar must be used within an SnackBarProvider');
   }

   return context;
};
