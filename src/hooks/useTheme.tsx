import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useState,
} from 'react';
import {lightTheme, darkTheme} from '../styles/theme';
import {ThemeProvider as StyledProvider} from 'styled-components';

type themeMode = 'light' | 'dark';

interface themeContext {
    themeMode: themeMode;
    setThemeMode: Dispatch<SetStateAction<themeMode>>;
}

const themeContext = createContext<themeContext>({
    themeMode: 'light',
    setThemeMode: () => {},
});

export const ThemeProvider = ({children}: PropsWithChildren) => {
    const localThemeItem = localStorage.getItem('theme');
    const localTheme =
        localThemeItem !== 'light' && localThemeItem !== 'dark' ? 'light' : localThemeItem;
    const [themeMode, setThemeMode] = useState<themeMode>(localTheme);
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
            localStorage.setItem('theme', 'dark');
        } else {
            setThemeMode('light');
            localStorage.setItem('theme', 'light');
        }
    }, [themeMode]);

    return {themeMode, toggleTheme, themeObject};
};

export default useTheme;
