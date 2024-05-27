import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components'
import dark from './styles/themes/dark';
import Routes from './routes';


const App: React.FC = () => {
    return(
        <ThemeProvider theme={dark}>
            <GlobalStyle />            
            <Routes />
        </ThemeProvider>
    );
};


export default App;
