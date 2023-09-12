import {createContext, useCallback, useContext, useState} from 'react';
import {lightTheme, darkTheme} from '../styles/theme';
import {ThemeProvider as StyledProvider} from 'styled-components';

type themeMode = 'light' | 'dark';

interface themeContext {
    themeMode: themeMode;
    setThemeMode: (themeMode: themeMode) => void;
}

const themeContext = createContext<themeContext>({
    themeMode: 'light',
    setThemeMode: () => {},
});

export const ThemeProvider = ({children}: any) => {
    const [themeMode, setThemeMode] = useState<themeMode>('light');
    const themeObject = themeMode === 'light' ? lightTheme : darkTheme;

    return (
        <themeContext.Provider value={{themeMode, setThemeMode}}>
            <StyledProvider theme={themeObject}>{children}</StyledProvider>
        </themeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(themeContext);
    const {themeMode, setThemeMode} = context;
    const themeObject = themeMode === 'light' ? lightTheme : darkTheme;

    const toggleTheme = useCallback(() => {
        if (themeMode === 'light') {
            setThemeMode('dark');
        } else {
            setThemeMode('light');
        }
    }, [themeMode]);

    return {themeMode, toggleTheme, themeObject};
};

export default useTheme;
