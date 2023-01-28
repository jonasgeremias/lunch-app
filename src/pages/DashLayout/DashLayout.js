import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from 'constants/routes'
import { AuthContext } from 'hooks/AuthContext';
import Appbar from './Appbar/Appbar';

const Dashboard = () => {
   const { user, userData } = useContext(AuthContext);
   if (!user) {
      return (
         <>
            <Navigate to="/signin" />
            {/* <Outlet /> */}
         </>
      )
   }

   const routes = ROUTES[userData?.userType] || []

   return (
      <Appbar routes={routes}>
         <Outlet />
      </Appbar>
   );
};

export default Dashboard;