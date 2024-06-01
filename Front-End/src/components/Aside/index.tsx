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
import { Link } from 'react-router-dom';

const Aside: React.FC = () => {
    return(
        <Container>
            <Header>
                <LogoImg src={logoImg} alt="Logo My Wallet" />
                <Title>My Wallet</Title>
            </Header>

            {/* <MenuContainer>
                <Link to={"/dashboard"}>
                    <MenuItemLink>
                        <MdDashboard />
                        Dashboard
                    </MenuItemLink>
                </Link>
                
                <Link to={"/list/entry-balance"}>
                    <MenuItemLink>
                        <MdArrowUpward />
                        Entradas
                    </MenuItemLink>
                </Link>
                
                <Link to={"/list/exit-balance"}>
                    <MenuItemLink>
                        <MdArrowDownward />
                        Saídas
                    </MenuItemLink>
                </Link>
                
                <Link to={"#"}>
                    <MenuItemLink>
                        <MdExitToApp />
                        Sair
                    </MenuItemLink>
                </Link>
                
            </MenuContainer> */}
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