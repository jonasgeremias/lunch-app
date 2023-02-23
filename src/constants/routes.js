import { lazy } from 'react'
import { Assessment, Home, Restaurant, Business } from '@mui/icons-material'

const ClientHome = lazy(() => import('pages/Client/Home/Home'))
const ClientRestaurantProfile = lazy(() => import('pages/Client/RestaurantProfile/RestaurantProfile'))
const ClientHistory = lazy(() => import('pages/Client/History/History'))

const OrganizationHome = lazy(() => import('pages/Organization/Home/Home'))
const OrganizationRestaurant = lazy(() => import('pages/Organization/Restaurant/Restaurant'))
const OrganizationHistory = lazy(() => import('pages/Organization/History/History'))
const OrganizationCompanies = lazy(() => import('pages/Organization/Companies/Companies'))
const OrganizationCompaniesDetail = lazy(() => import('pages/Organization/Companies/Detail/Detail'))

export const ORIGIN_ROUTES = 'dashboard'
export const COMPANIE_PATH = 'companies'

export const ROUTES = {
   client: [{
      path: "",
      name: 'Tela Inicial',
      icon: <Home />,
      element: <ClientHome />
   },
   {
      path: "restaurant",
      name: 'Restaurante',
      icon: <Restaurant />,
      element: <ClientRestaurantProfile />
   },
   {
      path: "history",
      name: 'Histórico',
      icon: <Assessment />,
      element: <ClientHistory />
   }],
   organization: [{
      path: "",
      name: 'Tela Inicial',
      icon: <Home />,
      element: <OrganizationHome />
   },
   {
      path: "restaurant",
      name: 'Restaurantes',
      icon: <Restaurant />,
      element: <OrganizationRestaurant />
   },
   {
      path: "history",
      name: 'Histórico',
      icon: <Assessment />,
      element: <OrganizationHistory />
   },
   {
      path: COMPANIE_PATH,
      name: 'Empresas',
      icon: <Business />,
      element: <OrganizationCompanies />,
      sections: [
         {
            path: COMPANIE_PATH + "/:id",
            name: 'Empresas',
            icon: <Business />,
            element: <OrganizationCompaniesDetail />
         }
      ]
   },

]
}