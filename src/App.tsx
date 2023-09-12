import Main from './containers/Main';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from './hooks/useTheme';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <GlobalStyle />
                <Main />
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
