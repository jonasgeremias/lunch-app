import { useState } from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar + 1,
  },
}));

function FooterActionForm({ onGoBack, onCancel, onSave }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleGoBack = () => {
    setValue(0);
    onGoBack();
  };

  const handleCancel = () => {
    setValue(0);
    onCancel();
  };

  const handleSave = () => {
    setValue(0);
    onSave();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BottomNavigation
        className={classes.footer}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Voltar"
          icon={<ArrowBackIcon />}
          onClick={handleGoBack}
        />
        <BottomNavigationAction
          label="Cancelar"
          icon={<CancelIcon />}
          onClick={handleCancel}
        />
        <BottomNavigationAction
          label="Salvar"
          icon={<SaveIcon />}
          onClick={handleSave}
        />
      </BottomNavigation>
    </Box>
  );
}

export default FooterActionForm;