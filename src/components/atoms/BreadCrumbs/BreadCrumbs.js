import { Breadcrumbs, Typography } from '@mui/material'
import { ORIGIN_ROUTES } from 'constants/routes'
import { useBreakPoint } from 'hooks/useBreakPoint'
import { Link, matchPath } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import { useGlobalStyles } from 'styles'

const getRouteName = (pathname, routes) => {
   if (pathname == ORIGIN_ROUTES) pathname = ''
   const item = routes.find(route => route.path === pathname)
   if (item) return item.name
   return pathname
}

const createLinks = (location) => {
   const pathnames = location.pathname.split('/').filter(x => x);
   const routes = []

   for (let indice = 0; indice < pathnames.length; indice++) {
      let text = ''
      for (let count = 0; count <= indice; count++) {
         text += '/' + pathnames[count]
      }
      routes.push({ name: pathnames[indice], path: text, id: indice })
   }

   return routes
}

const BreadCrumbs = ({ routes }) => {
   const location = useLocation()
   const pathNames = createLinks(location)
   const gClasses = useGlobalStyles()
   const webScreen = useBreakPoint('up', 'sm')
   
   return (
      <Breadcrumbs maxItems={webScreen ? 3: 2} aria-label="breadcrumb">
         {
            pathNames.map((path) => {
               const match = matchPath({ path: path.path }, location.pathname)
               const name = getRouteName(path.name, routes)
               return (
                  match == null ?
                     <Link className={gClasses.breadcrumblink} key={path.path} underline="hover" to={path.path}>
                        <Typography variant={!webScreen? 'body2' : 'bodi1'}> {name} </Typography>
                     </Link> :
                     <Typography key={path.path} variant={!webScreen? 'body2' : 'bodi1'}>{name} </Typography>
               )
            })
         }
      </Breadcrumbs>
   )
}

export default BreadCrumbs;