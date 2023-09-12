import './App.css';
import Main from './containers/Main';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from './hooks/useTheme';

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <Main />
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
