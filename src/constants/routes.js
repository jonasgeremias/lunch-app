import { lazy } from 'react'
import { Assessment, Home, Restaurant, Business, DateRange, AccountBox } from '@mui/icons-material'

const ClientHome = lazy(() => import('pages/Client/Home/Home'))
const ClientRestaurantProfile = lazy(() => import('pages/Client/RestaurantProfile/RestaurantProfile'))
const ClientHistory = lazy(() => import('pages/Client/History/History'))

const OrganizationHome = lazy(() => import('pages/Organization/Home/Home'))
const OrganizationHistory = lazy(() => import('pages/Organization/History/History'))
const OrganizationCompanies = lazy(() => import('pages/Organization/Companies/Companies'))
const OrganizationCompaniesDetail = lazy(() => import('pages/Organization/Companies/Detail/Detail'))
const OrgSettings = lazy(() => import('pages/Organization/OrgSettings/OrgSettings'))
const OrganizationUsers = lazy(() => import('pages/Organization/Users/Users'))

const UserDetail = lazy(() => import('pages/Organization/Users/UserDetail/UserDetail'))

export const ORIGIN_ROUTES = 'dashboard'
export const COMPANIES_PATH = 'companies'
export const USERS_PATH = 'users'
export const ORGANIZATION_PATH = 'organization'
export const COMPANY_ADD = 'add'

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
      path: COMPANIES_PATH,
      name: 'Empresas',
      icon: <Business />,
      element: <OrganizationCompanies />,
      sections: [
         {
            path: COMPANIES_PATH + "/add",
            name: 'Empresas',
            icon: <Business />,
            element: <OrganizationCompaniesDetail add={true} />
         },
         {
            path: COMPANIES_PATH + "/:id",
            name: 'Empresas',
            icon: <Business />,
            element: <OrganizationCompaniesDetail add={false} />
         }
      ]
   },
   {
      path: USERS_PATH,
      name: 'Usuários',
      icon: <AccountBox />,
      element: <OrganizationUsers />,
      sections: [
         {
            path: USERS_PATH + "/add",
            name: 'Usuários',
            icon: <Business />,
            element: <UserDetail add={true} />
         },
         {
            path: USERS_PATH + "/:id",
            name: 'Usuários',
            icon: <Business />,
            element: <UserDetail add={false} />
         }
      ]
   },
   {
      path: "org",
      name: 'Organização',
      icon: <DateRange />,
      element: <OrgSettings />
   },
   {
      path: "history",
      name: 'Histórico',
      icon: <Assessment />,
      element: <OrganizationHistory />
   }
   ]
}