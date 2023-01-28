// import { useState, useEffect } from 'react'
import AppRoutes from '../Routes/Routes';

// Contextos
import { AppProvider } from 'hooks/AppContext';
import { AuthProvider } from 'hooks/AuthContext';
import { SnackBarProvider } from 'components/atoms/Snackbar/Snackbar';
import { CompanieProvider } from 'hooks/CompanieContext';
import { OrgProvider } from 'hooks/OrgContext';

function App() {
   return (
      <SnackBarProvider>
         <OrgProvider>
            <CompanieProvider>
               <AuthProvider>
                  <AppProvider>
                     <AppRoutes />
                  </AppProvider >
               </AuthProvider>
            </CompanieProvider>
         </OrgProvider>
      </SnackBarProvider>
   )
}

export default App