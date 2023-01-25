
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import colors from './colors'

export const THEME_SETTINGS = {
    light: {
        palette: {
            mode: 'light',
            primary: {
                main: colors.primary
            },
            secondary: {
                main: colors.secondary
            },
            background: {
                default: '#fff',
            },
            text: {
                primary: colors.text
            },
        }, 
        shape: {
            borderRadius: 3
        },
        typography: {
            fontFamily: [ 'Flama, Arial' ],
            fontSize: 14,
        }
    },
    dark: {
        palette: {
            type: 'dark',
            primary: {
                main: colors.primary
            },
            secondary: {
                main: colors.secondary
            },
            text: {
                primary: 'rgba(255, 255, 255, 0.8)',
                secondary: 'rgba(255, 255, 255, 0.65)',
            },
        }, 
        shape: {
            borderRadius: 3
        },
        typography: {
            fontFamily: [ 'Flama, Arial' ],
            fontSize: 12,
        }
    }
}

/**
 * Gets the theme settings
 * 
 * ---
 * 
 * @param { ('dark' | 'light') } type - Theme type
 */
export default function getTheme(type) {
    let settings = THEME_SETTINGS.light
    
    if (THEME_SETTINGS?.[type]) {
        settings = THEME_SETTINGS[type]
    } 
    return responsiveFontSizes(createTheme(settings))
}