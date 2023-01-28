import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn, DashLayout, NotFound, ForgotPassword } from '../../../pages'
import SplashScreen from 'components/atoms/SplashScreen/SplashScreen'
import { AppContext } from 'hooks/AppContext';
import { AuthContext } from 'hooks/AuthContext';
// import { useSnackBar } from 'components/atoms/Snackbar/Snackbar';

import { ORIGIN_ROUTES, ROUTES } from 'constants/routes'
import SplashLoading from 'components/molecules/SplashLoading/SplashLoading';

function AppRoutes() {
   const [splash, setSplash] = useState(true);
   const { app } = useContext(AppContext);
   const { user, userData } = useContext(AuthContext);

   useEffect(() => {
      setTimeout(() => {
         setSplash(false)
      }, 1500)
   }, [user])

   if (splash || (!app && !user && !userData)) return <SplashScreen />

   const routes = ROUTES[userData?.userType] || []

   return (
      <BrowserRouter>
         <React.Suspense fallback={<SplashLoading />}>
            <Routes>
               <Route exact path='/' element={<Navigate to={ORIGIN_ROUTES} replace />} />
               <Route exact path='/signin' element={<SignIn />} />
               <Route exact path='/forgotpassword' element={<ForgotPassword />} />
               <Route exact path={ORIGIN_ROUTES} element={<DashLayout />} >
                  {routes.map((route) => <Route key={route.path} exact path={route.path} element={route.element} errorElement={<h1>{route.path}</h1>} />)}

                  <Route exact path='*' element={<NotFound />} />
               </Route>
               <Route exact path='*' element={<Navigate to={ORIGIN_ROUTES} replace />} />
            </Routes>
         </React.Suspense>
      </BrowserRouter>
   )
}

export default AppRoutes