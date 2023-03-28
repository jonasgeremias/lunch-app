import React from 'react'
import { useGlobalStyles } from 'styles'
import { Box, Card, CardActionArea, CardContent, Grid, Icon, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useLocation, matchPath, Navigate, Link } from "react-router-dom"
import { ORIGIN_ROUTES, ROUTES } from 'constants/routes'
import { useAuthContext } from 'hooks/AuthContext'
import clsx from 'clsx'

const MyCard = ({ route, to }) => {
   const gClasses = useGlobalStyles()
   return (
      <Box sx={{ minWidth: 200, minHeight: 100 }}>
         <Link to={to} style={{ textDecoration: 'none' }}>
            <Card variant="outlined" className={gClasses.card}>
               <CardActionArea className={gClasses.flexAlignCenter}>
                  <CardContent style={{ textDecoration: 'none !important' }}>
                     {route.icon}
                     <Typography variant="h5" component="h2"> {route.name} </Typography>
                  </CardContent>
               </CardActionArea>
            </Card>
         </Link>
      </Box>
   )
}




const Home = () => {
   const gClasses = useGlobalStyles()
   const location = useLocation()
   const { userData } = useAuthContext();

   const pathnames = location.pathname.split('/').filter(x => x);
   const routes = ROUTES[userData?.userType] || []

   return (
      <div className={clsx(gClasses.containerBackground, gClasses.listArea, gClasses.padding30)}>
         <Grid container columns={6} spacing={2} alignItems="center" style={{ justifyContent: "center" }}>
            {routes.map(route => {

               let match = matchPath({ path: '/' + ORIGIN_ROUTES + '/' + route.path }, location.pathname)
               if (match == null) {
                  if (route.path == pathnames[1]) match = true;
               }

               return (
                  <Grid item key={`cardbox_${route.path}`} >
                     <MyCard route={route} to={'/' + ORIGIN_ROUTES + '/' + route.path} key={route.path} />
                  </Grid>)
            })}

         </Grid>
      </div>












      // <>
      //    {routes.map(route => {

      //       let match = matchPath({ path: '/' + ORIGIN_ROUTES + '/' + route.path }, location.pathname)
      //       if (match == null) {
      //          if (route.path == pathnames[1]) match = true;
      //       }

      //       return (

      //             <StyledListItem selected={match !== null} button={true}>
      //                <ListItemIcon>
      //                   {route.icon}
      //                </ListItemIcon>
      //                <ListItemText primaryTypographyProps={match ? { className: gClasses.bold } : {}}
      //                   primary={route.name}
      //                />
      //             </StyledListItem>
      //          </Link>
      //       )
      //    })}
      // </>
   )
}

export default Home;