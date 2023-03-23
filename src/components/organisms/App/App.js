// import { useState, useEffect } from 'react'
import AppRoutes from '../Routes/Routes';

// Contextos
import { AppProvider } from 'hooks/AppContext';
import { AuthProvider } from 'hooks/AuthContext';
import { SnackBarProvider } from 'components/atoms/Snackbar/Snackbar';
import { CompanyProvider } from 'hooks/CompanyContext';
import { OrgProvider } from 'hooks/OrgContext';

function App() {
   return (
      <SnackBarProvider>
         <OrgProvider>
            <CompanyProvider>
               <AuthProvider>
                  <AppProvider>
                     <AppRoutes />
                  </AppProvider >
               </AuthProvider>
            </CompanyProvider>
         </OrgProvider>
      </SnackBarProvider>
   )
}

export default App