import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { theme as getTheme } from './styles'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline'

import './index.css';
import reportWebVitals from './reportWebVitals';
import { App } from './components/organisms';

const Main = () => {
  const [theme, setTheme] = useState("light")
  const themeUpdateHandler = (val) => {
    if (val !== theme) setTheme(val)
  }

  return (
    <div className='App'>
      <ThemeProvider theme={getTheme(theme)} >
          <CssBaseline />
          <App onChangeTheme={themeUpdateHandler} />
      </ThemeProvider >
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Main />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
