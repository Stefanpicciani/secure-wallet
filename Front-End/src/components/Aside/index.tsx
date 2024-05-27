import React from 'react';
import { Container } from './styles';
import logoImg from "../../assets/logo.svg";

import {
    Header,
    LogoImg,
    MenuContainer,
    MenuItemLink,
    Title,
} from "./styles";

import { 
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
 } from  'react-icons/md';

const Aside: React.FC = () => {
    return(
        <Container>
            <Header>
                <LogoImg src={logoImg} alt="Logo My Wallet" />
                <Title>My Wallet</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/dashboard">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemLink href="#">
                    <MdExitToApp />
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>
    );
}


export default Aside;