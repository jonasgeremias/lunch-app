import { makeStyles } from '@mui/styles';
// import { textAlign } from '@mui/system';

// import {DRAWER_WIDTH} from 'constants/general'

export default makeStyles(theme => ({
  lunchStatusCard: {
   alignItems: 'center',
   borderRadius: 10,
   margin: theme.spacing(2, 2),
   padding: theme.spacing(4),
   [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 1),
      padding: theme.spacing(2),
    },
  },
  forgotArea: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(10, 4, 10, 4),
    height: '50%',
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      borderRadius: 0,
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'start',
    },
  },
  root: {
    backgroundColor: '#f4f5fc',
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  paper: {
    overflow: 'hidden',
    height: '70%',
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    margin: 0,
    borderRadius: 10,
    [theme.breakpoints.down('md')]: {
      width: '85%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      borderRadius: 0,
      height: '100%',
      flexDirection: 'column',
    },
  },
  primaryGradient: {
    background: 'linear-gradient(to right, #1248a0, #17c8b1)',
    transition: 'all 1s ease-in-out',
    '&:hover': {
      background: 'linear-gradient(to right, #030e20, #095147)',
      transition: 'all 1s ease-in-out',
    },
    '&:disabled': {
      background: 'linear-gradient(to right, #131b29, #1f3330)',
      transition: 'all 1s ease-in-out',
      color: "#fff" + ' !important'
    }
  },
  textCenter: {
   alignItems: 'center'
  },
  
//   iconSearch: {
//     backgroundColor: '#037ffc',
//     color: "#FFF",
//     // padding: '6px 16px',
//     margin: '8px',
//     boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%)',
//     '&:hover': {
//       backgroundColor: '#3874d6',
//       boxShadow: '0px 5px 5px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%)'
//     },
//   },
  cursorPointer: { cursor: 'pointer' },
  relative: { position: 'relative' },
  bold: { fontWeight: 'bold' },
  textDecorationNone: { textDecoration: 'none' },
  textDecorationUnderline: { textDecoration: 'underline' },
  overflowHidden: { overflow: 'hidden' },
  textTransformNone: { textTransform: 'none' },
  fontSize29: { fontSize: 29 },
  fontSize19: { fontSize: 19 },
  minWidth100: { minWidth: '100px' },
  maxWidth200: { maxWidth: '200px' },
  height24: { height: 24 },
  width200: { width: 200 },
  width100vw: { width: '100vw' },
  fullWidth: { width: '100%' },
  fullHeight: { height: '100%' },
  margin0: { margin: 0 },
  marginTop0: { marginTop: 0 },
  marginTop6: { marginTop: 6 },
  marginTop8: { marginTop: 8 },
  marginTop16: { marginTop: 16 },
  marginTop24: { marginTop: 24 },
  marginTop32: { marginTop: 32 },
  marginTop40: { marginTop: 40 },
  marginTop50: { marginTop: 50 },
  marginBottom0: { marginBottom: 0 },
  marginBottom2: { marginBottom: 2 },
  marginBottom4: { marginBottom: 4 },
  marginBottom6: { marginBottom: 6 },
  marginBottom10: { marginBottom: 10 },
  marginBottom16: { marginBottom: 16 },
  marginBottom20: { marginBottom: 20 },
  marginBottom24: { marginBottom: 24 },
  marginBottom30: { marginBottom: 30 },
  marginRight10: { marginRight: 10 },
  marginLeft6: { marginLeft: 6 },
  marginLeft12: { marginLeft: 12 },
  marginVertical16: { marginTop: 16, marginBottom: 16 },
  marginVertical8: { marginTop: 8, marginBottom: 8 },
  marginVertical20: { marginTop: 20, marginBottom: 20 },
  marginHorizontal4: { marginLeft: 4, marginRight: 4 },
  marginHorizontal8: { marginLeft: 8, marginRight: 8 },
  marginHorizontal10p: { marginLeft: '10%', marginRight: '10%' },
  marginHorizontal20p: { marginLeft: '20%', marginRight: '20%' },
  paddingTop10: { paddingTop: 10 },
  paddingBottom10: { paddingBottom: 10 },
  paddingBottom20: { paddingBottom: 20 },
  paddingLeft12: { paddingLeft: 12 },
  paddingLeft30: { paddingLeft: 30 },
  padding8: { padding: 8 },
  padding4: { padding: 4 },
  padding12: { padding: 12 },
  padding24: { padding: 24 },
  padding30: { padding: 30 },
  paddingHorizontal26: {
    paddingLeft: 26,
    paddingRight: 26,
    [theme.breakpoints.down('md')]: {
      paddingLeft: 16,
      paddingRight: 16,
    }
  },

  opacity70: { opacity: .7 },

  border8: { borderRadius: 8 },
  border12: { borderRadius: 12 },
  borderGray: { border: '1px solid #ddd', borderColor: theme.palette.divider },

  positionAbsTopLeftRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },

  flex1: { flex: 1 },

  flexJustifySpaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  flexJustifyEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  flexAlignCenterJustifyBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexAlignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  flexAlignStart: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  flexAlignEnd: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexColumnAlignCenterJustifyCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
//   textNoOverflow: {
//     overflow: 'hidden',
//     whiteSpace: 'nowrap',
//     textOverflow: 'ellipsis'
//   },
  signInTab: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    padding: theme.spacing(10, 4, 10, 4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(10, 4, 0, 4),
      margin: 0,
    },
    'scrollbar-width': 'none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'transparent'
    }
  },
  // signInTab: {
  //   justifyContent: 'space-between',
  //   paddingBottom: theme.spacing(9.5),
  //   [theme.breakpoints.up('lg')]: {
  //     paddingBottom: theme.spacing(9.8),
  //   },
  // },
//   tabWithSpacing: {
//     margin: theme.spacing(3, 30),
//     borderRadius: 12,
//     padding: 30,
//     [theme.breakpoints.down('lg')]: {
//       margin: theme.spacing(3, 10),
//     },
//     [theme.breakpoints.down('md')]: {
//       margin: theme.spacing(3, 2),
//       padding: 20
//     }
//   },
//   deviceTab: {
//     margin: theme.spacing(3, 30),
//     [theme.breakpoints.down('lg')]: {
//       margin: theme.spacing(3, 10),
//     },
//     [theme.breakpoints.down('md')]: {
//       margin: theme.spacing(3, 2),
//     },
//     [theme.breakpoints.down('xs')]: {
//       margin: 15
//     }
//   },
//   mapArea: {
//     height: 240,
//     [theme.breakpoints.up('xl')]: {
//       height: 430,
//     }
//   },
  FAB: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed !important',
    right: 30,
    bottom: 30,
    [theme.breakpoints.up('xl')]: {
      right: 40,
      bottom: 40,
    }
  },
  listArea: {
    margin: theme.spacing(2, 2),
    [theme.breakpoints.down('lg')]: {
      margin: theme.spacing(2, 2),
    },
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(2, 2),
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 2),
    }
  },
  errorButton: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },
  containerBackground: {
    paddingLeft: 0,
    paddingTop: 0,
    // [theme.breakpoints.up('md')]: {
    //   paddingLeft: DRAWER_WIDTH.web,
    //   paddingTop: 56,
    // },
  },
  dialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 2, 2, 0),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 2, 2, 0),
    },
    flex: 1
  },
  dialogSubtitle: {
    margin: theme.spacing(2.9, 0, 1.8),
    fontFamily: 'Flama-Bold'
  },
//   editableTextLabel: {
//     marginBottom: 10,
//     opacity: .8
//   },
//   tabIndicator: {
//     height: '7%',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   inactiveDeviceDot: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: '#ddd'
//   },
//   card: {
//     textAlign: 'center',
//     transition: "all 0.25s",
//     "&:hover": {
//       transform: "scale(1.07)",
//       color: theme.palette.secondary.main
//     }
//   },
//   tableUser: {
//     minWidth: 600,
//   },
//   tableUserVisuallyHidden: {
//     border: 0,
//     clip: 'rect(0 0 0 0)',
//     height: 1,
//     margin: -1,
//     overflow: 'hidden',
//     padding: 0,
//     position: 'absolute',
//     top: 20,
//     width: 1,
//   },
//   avatar: {
//     marginLeft: '0.5em',
//     backgroundColor: theme.palette.primary.main + ' !important'
//   }
}))
