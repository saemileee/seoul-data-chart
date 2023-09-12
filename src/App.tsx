import Main from './containers/Main';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import useTheme, {ThemeProvider} from './hooks/useTheme';
import GlobalStyle from './styles/GlobalStyle';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
    const {toggleTheme, themeMode} = useTheme();

    return (
        <BrowserRouter>
            <ThemeProvider>
                <GlobalStyle />
                <ThemeToggle toggle={toggleTheme} mode={themeMode} />
                <Routes>
                    <Route path='/*' element={<Navigate to='/chart' replace={true} />} />
                    <Route path='/chart' element={<Main />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
