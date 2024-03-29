import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'hooks/AuthContext';
import Appbar from './Appbar/Appbar';

const Dashboard = () => {
   const { user, userData } = useAuthContext();
      
   if (!user) {
      return <Navigate to="/signin" />
   }

   const routes = ROUTES[userData?.userType] || []

   return (
      <Appbar routes={routes}>
         <Outlet />
      </Appbar>
   );
};

export default Dashboard;