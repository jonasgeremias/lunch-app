// import Button from '@mui/material/Button';
// import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ShowFeedback from 'components/atoms/ShowFeedback/ShowFeedback';

const useStyles = makeStyles((theme) => ({
   constainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw'
   }
}));


const NotFound = () => {
   // const navigate = useNavigate();
   const classes = useStyles();
   return (
      <>
         <Container className={classes.container}>
            <ShowFeedback title='Ooops... 404!' subtitle='Essa página não existe ou você não possui autorização para acessá-la' animation='error' fullScreen />
         </Container>
      </>)
}

export default NotFound;