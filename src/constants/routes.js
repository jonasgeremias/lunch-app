import { lazy } from 'react'
import { Assessment, Home, Restaurant } from '@mui/icons-material'

// import ClientRestaurantProfile from 'pages/Client/RestaurantProfile/RestaurantProfile'
// import ClientHistory from 'pages/Client/History/History'

export const ORIGIN_ROUTES = '/dashboard'

const ClientHome = lazy(() => import('pages/Client/Home/Home'))
const ClientRestaurantProfile = lazy(()=> import('pages/Client/RestaurantProfile/RestaurantProfile'))
const ClientHistory = lazy(()=> import('pages/Client/History/History'))

export const ROUTES = {
   client: [{
      path: "",
      name: 'Tela Inicial',
      icon: <Home/>,
      element:  <ClientHome/>
   },
   {
      path: "restaurant",
      name: 'Restaurante',
      icon:  <Restaurant/>,
      element: <ClientRestaurantProfile/>
   },
   {
      path: "history",
      name: 'Histórico',
      icon: <Assessment/>,
      element: <ClientHistory/>
   }]
}