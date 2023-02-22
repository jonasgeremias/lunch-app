import { useState, useEffect, cloneElement } from 'react';
import { useLocation } from "react-router-dom"
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import logo from 'assets/images/logo512.png'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { ORIGIN_ROUTES } from 'constants/routes'
import { DRAWER_WIDTH } from 'constants/general'
import DrawerItems from './DrawerItems';
import { useAuthContext } from 'hooks/AuthContext';
import { ExitToAppRounded, Menu, Close } from '@mui/icons-material'


const ElevationScroll = ({ children, darkTheme }) => {
   const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 })
   const style = trigger ? { boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' } : { borderBottom: `1px solid rgba(0, 0, 0, ${darkTheme ? '0' : '0.12'})` }
   return cloneElement(children, { style })
}

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
   transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: `${DRAWER_WIDTH}px`,
      transition: theme.transitions.create(['margin', 'width'], {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
   ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${DRAWER_WIDTH}px`,
      ...(open && {
         transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
         }),
         marginLeft: 0,
      }),
   }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   padding: theme.spacing(0, 1),
   ...theme.mixins.toolbar,
   justifyContent: 'flex-end',
}));

export default function Appbar({ routes, children }) {
   const theme = useTheme();
   const [open, setOpen] = useState(false);
   const [timeoutCLose, setTimeoutClose] = useState(false);

   const location = useLocation()
   const [currentRoute, setCurrentRoute] = useState();
   const { logOut } = useAuthContext();

   const handleClickLogout = () => {
      logOut()
   }

   useEffect(() => {
      let current = routes.find(route => (ORIGIN_ROUTES + '/' + route.path === location.pathname))

      if (!current) {
         current = routes.find(route => (ORIGIN_ROUTES + route.path === location.pathname))
      }

      setCurrentRoute(current)
   }, [location])

   // Recarrega o timeout se open, caso contrario zera.
   const timeoutHandle = (now = false) => {
      clearTimeout(timeoutCLose)
      if (open) {
         if (now) setTimeoutClose(setTimeout(() => setOpen(false), 1000))
         else setTimeoutClose(setTimeout(() => setOpen(false), 7500))
      }
   }

   // Se o status do menu mudar, verifica se tem o tempo de fechamento automático.
   useEffect(() => {
      timeoutHandle();
   }, [open])

   const handleDrawer = (status) => {
      setOpen(status);
   };

   return (
      <>
         <ElevationScroll>
            <AppBar position="fixed" open={open} color='inherit' elevation={0}>
               <Toolbar >
                  <IconButton
                     color="inherit"
                     aria-label="open drawer"
                     onClick={() => handleDrawer(true)}
                     edge="start"
                     sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">
                     {currentRoute?.name || 'Erro'}
                  </Typography>
                  <div style={{ flexGrow: 1 }} />
                  <IconButton onClick={handleClickLogout}>
                     <ExitToAppRounded color='action' />
                  </IconButton>
               </Toolbar>
            </AppBar>
         </ElevationScroll>
         <Drawer
            sx={{
               width: DRAWER_WIDTH,
               flexShrink: 0,
               '& .MuiDrawer-paper': {
                  width: DRAWER_WIDTH,
                  boxSizing: 'border-box',
               },
            }}
            variant="persistent"
            anchor="left"
            open={open}
         >
            <DrawerHeader>
               <IconButton onClick={() => handleDrawer(false)}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
               </IconButton>
            </DrawerHeader>

            <DrawerItems routes={routes} timeoutHandle={timeoutHandle}/>
         </Drawer>

         <DrawerHeader />
         {children}
      </>
   );
}