import React from 'react';
import Layout from './components/Layout';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components'
import dark from './styles/themes/dark';
import light from './styles/themes/light';


const App: React.FC = () => {
    return(
        <ThemeProvider theme={dark}>
            <GlobalStyle />            
            <Layout/>
        </ThemeProvider>
    );
};


export default App;
