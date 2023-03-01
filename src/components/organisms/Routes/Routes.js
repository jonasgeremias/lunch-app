import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn, DashLayout, NotFound, ForgotPassword } from '../../../pages'
import SplashScreen from 'components/atoms/SplashScreen/SplashScreen'
import { useAppContext } from 'hooks/AppContext';
import { useAuthContext } from 'hooks/AuthContext';

import { ORIGIN_ROUTES, ROUTES } from 'constants/routes'
import SplashLoading from 'components/molecules/SplashLoading/SplashLoading';
import ShowFeedback from 'components/atoms/ShowFeedback/ShowFeedback';
import { DATABASE_VERSION } from 'constants/general';

function AppRoutes() {
   const [splash, setSplash] = useState(true);
   const { app } = useAppContext();
   const { userData } = useAuthContext();

   useEffect(() => {
      console.log(app)
      setTimeout(() => {
         setSplash(false)
      }, 2000)
   }, [])
      
   if (splash) return <SplashScreen />
   
   if (!splash && app != null) {
      if (!Boolean(app?.act)) {
         return <ShowFeedback title='O sistema foi desativado temporariamente' animation='offline' subtitle='Estamos fazendo alguns ajustes e em breve estaremos de volta' hideDrawer fullScreen />
      } else if (app.version > DATABASE_VERSION) {
         return <ShowFeedback title='Você está usando uma versão antiga do sistema' animation='error' subtitle='Atualize a página pressionando F5' hideDrawer fullScreen />
      }
      else if (app?.error)
         return <ShowFeedback title='Ops... Ocorreu um erro!' animation='error' subtitle={app?.message} fullScreen hideDrawer showLogout />
   }

   const routes = ROUTES[userData?.userType] || []

   return (
      <BrowserRouter>
         <React.Suspense fallback={<SplashLoading />}>
            <Routes>
               <Route exact path='/' element={<Navigate to={'/' + ORIGIN_ROUTES} replace />} />
               <Route exact path='/signin' element={<SignIn />} />
               <Route exact path='/forgotpassword' element={<ForgotPassword />} />
               <Route exact path={'/' + ORIGIN_ROUTES} element={<DashLayout />} >
                  {
                     routes.map((route) => {
                        const items = [];
                        items.push(<Route key={route.path} exact path={route.path} element={route.element} errorElement={< h1 > {route.path}</h1>} />)
                        items.push(
                           route.sections && route.sections.map((section) =>
                              <Route key={section.path} exact path={section.path} element={section.element} errorElement={<h1>{section.path}</h1>} />
                           )
                        )
                        return items;
                     })
                  }
                  <Route exact path='*' element={<NotFound />} />
               </Route>
               <Route exact path='*' element={<Navigate to={'/' + ORIGIN_ROUTES} replace />} />
            </Routes>
         </React.Suspense>
      </BrowserRouter >
   )
}

export default AppRoutes