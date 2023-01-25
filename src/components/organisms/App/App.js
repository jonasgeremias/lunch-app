// import { useState, useEffect } from 'react'
import AppRoutes from '../Routes/Routes';

// Contextos
import { AppProvider } from 'hooks/AppContext';
import { AuthProvider } from 'hooks/AuthContext';
import { SnackBarProvider } from 'components/atoms/Snackbar/Snackbar';

function App() {
   return (
      <SnackBarProvider>
         <AuthProvider>
            <AppProvider>
               <AppRoutes />
            </AppProvider >
         </AuthProvider>
      </SnackBarProvider>
   )
}

export default App