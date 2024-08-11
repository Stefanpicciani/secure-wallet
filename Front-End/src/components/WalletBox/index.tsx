import React, { useMemo } from 'react';
import { Container } from './styles';
import dolarImg from "../../assets/dolar.svg";
import arrowUpImg from "../../assets/arrow-up.svg";
import arrowDownImg from "../../assets/arrow-down.svg";
import CountUp from 'react-countup';


interface IWalletBoxProps {
    title: string;
    amount: number;
    footerLabel: string;
    icon: 'dolar'|'arrowUpImg'|'arrowDownImg';
    color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
    amount,
    color,
    footerLabel,
    icon,
    title
}) => {
      
    const iconSelected = useMemo(() => {
        switch (icon) {
            case 'dolar': 
                return dolarImg;
            case 'arrowUpImg': 
                return arrowUpImg;
            case 'arrowDownImg': 
                return arrowDownImg;
            default: 
                return undefined;
        }
    },[icon]);

    return(
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp
                    end={amount}
                    prefix={'€ '}
                    separator=' '
                    decimal=','
                    decimals={2}
                    scrollSpyOnce
                    scrollSpyDelay={800}
                    // preserveValue={true}
                    // suffix=" +"
                ></CountUp>
            </h1>
            <small>{footerLabel}</small>
            <img src={iconSelected} alt={title} />
        </Container>
    );
}


export default WalletBox;