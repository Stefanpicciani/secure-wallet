import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
//Adicionar o service work caso queira fazer uma pwa, páginas web ou aplicativos que funcionam nos iphones e smartphones sem ter que instalar das lojas de aplicatrivos

const theme = {
  // Defina aqui suas variáveis de tema, se aplicável
};


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>   
    <App />
  </React.StrictMode>
);