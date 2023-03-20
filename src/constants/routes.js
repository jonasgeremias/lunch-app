import { lazy } from 'react'
import { Assessment, Home, Restaurant, Business, DateRange } from '@mui/icons-material'

const ClientHome = lazy(() => import('pages/Client/Home/Home'))
const ClientRestaurantProfile = lazy(() => import('pages/Client/RestaurantProfile/RestaurantProfile'))
const ClientHistory = lazy(() => import('pages/Client/History/History'))

const OrganizationHome = lazy(() => import('pages/Organization/Home/Home'))
const OrganizationHistory = lazy(() => import('pages/Organization/History/History'))
const OrganizationCompanies = lazy(() => import('pages/Organization/Companies/Companies'))
const OrganizationCompaniesDetail = lazy(() => import('pages/Organization/Companies/Detail/Detail'))
const OrgWorkingSettings = lazy(() => import('pages/Organization/OrgWorkingSettings/OrgWorkingSettings'))

export const ORIGIN_ROUTES = 'dashboard'
export const COMPANIES_PATH = 'companies'
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
            element: <OrganizationCompaniesDetail add={true}/>
         },
         {
            path: COMPANIES_PATH + "/:id",
            name: 'Empresas',
            icon: <Business />,
            element: <OrganizationCompaniesDetail add={false}/>
         }
      ]
   },
   {
      path: "workdates",
      name: 'Datas da Org.',
      icon: <DateRange />,
      element: <OrgWorkingSettings />
   },
   {
      path: "history",
      name: 'Histórico',
      icon: <Assessment />,
      element: <OrganizationHistory />
   }
]
}