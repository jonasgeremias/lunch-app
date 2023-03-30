import React from 'react'
import { useGlobalStyles } from 'styles'
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import { useLocation, matchPath, Link } from "react-router-dom"
import { ORIGIN_ROUTES, ROUTES } from 'constants/routes'
import { useAuthContext } from 'hooks/AuthContext'
import clsx from 'clsx'


const MyCard = ({ route, to }) => {
   const gClasses = useGlobalStyles()
   return (
      <Box className={gClasses.cardRoute}>
         <Link to={to} style={{ textDecoration: 'none', width:'100%', height:'100%' }}>
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
      <div className={clsx(gClasses.containerBackground, gClasses.listArea)}>
         <Grid container columns={6} spacing={1} style={{ justifyContent: "center", textAlign:'center' }}>
            {routes.map(route => {
               console.log(route)
               let match = matchPath({ path: '/' + ORIGIN_ROUTES + '/' + route.path }, location.pathname)
               if (match == null) {
                  if (route.path == pathnames[1]) match = true;
               }
               if (route.path == '') return null;
               return (

                  // <div key={`cardbox_${route.path}`} >
                     <MyCard route={route} to={'/' + ORIGIN_ROUTES + '/' + route.path} key={route.path} />
                  // </div>
               )
            })}
         </Grid>
      </div>
   )
}

export default Home;