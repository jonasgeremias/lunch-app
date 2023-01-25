import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/styles/useTheme'

/**
 * Hooks to check if the screen is larger or smaller than the reported breakpoint
 * 
 * ---
 * 
 * @param { ('up' | 'down' | 'only') } dir - Query direction (Default to `up`)
 * @param { ('xs' | 'sm' | 'md' | 'lg' | 'xl') } bp - Breakpoint (Default to `sm`)
 * @returns { boolean } - Returns true if the screen is in the size
 */
export function useBreakPoint(dir = 'up', bp = 'sm') {
    const theme = useTheme()
    return useMediaQuery(theme.breakpoints[dir](bp))
}
