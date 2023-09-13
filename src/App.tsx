import Main from './containers/Main';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {ThemeProvider} from './hooks/useTheme';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <GlobalStyle />
                <Routes>
                    <Route path='/chart' element={<Main />} />
                    <Route path='/*' element={<Navigate to='/chart' replace={true} />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
