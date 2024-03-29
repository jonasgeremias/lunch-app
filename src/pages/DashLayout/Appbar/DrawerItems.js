import React from 'react'
import { useGlobalStyles } from 'styles'
import StyledListItem from './StyledListItem'
import { ListItemIcon, ListItemText } from '@mui/material'
import { Link, useLocation, matchPath } from "react-router-dom"
import { ORIGIN_ROUTES } from 'constants/routes'
import useStyles from './useStyles'

const DrawerItems = ({ routes , timeoutHandle}) => {
   const gClasses = useGlobalStyles()
   const location = useLocation()
   const classes = useStyles()
   
   const pathnames = location.pathname.split('/').filter(x => x);
   
   return (
      <>
         {routes.map(route => {
            
            let match = matchPath({ path: '/' + ORIGIN_ROUTES + '/' + route.path }, location.pathname)
            if (match == null) {
               if (route.path == pathnames[1]) match = true;
            }
         
            return (
               <Link to={'/' + ORIGIN_ROUTES + '/' + route.path} key={route.path} className={classes.drawerItem} onClick={() => timeoutHandle(true)}>
                  <StyledListItem selected={match !== null} button={true}>
                     <ListItemIcon>
                        {route.icon}
                     </ListItemIcon>
                     <ListItemText primaryTypographyProps={match ? { className: gClasses.bold } : {}}
                        primary={route.name}
                     />
                  </StyledListItem>
               </Link>
            )
         })}
      </>
   )
}

export default DrawerItems;