import React, { useMemo, useState } from 'react';
import { Container, Content } from './styles';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import listOfMonths from '../../utils/months';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import WalletBox from '../../components/WalletBox';
import ErrorBoundary from '../../utils/ErrorBoundary';
import MessageBox from '../../components/MessageBox';
import happyImg from "../../assets/sunglasses.png";
import sadImg from "../../assets/sad.png";
import smileImg from "../../assets/smile.png";



const Dashboard: React.FC = () => {
    const [ monthSelected, setMonthSelected ] = useState<number>(new Date().getMonth() + 1);
    const [ yearSelected, setYearSelected ] = useState<number>(new Date().getFullYear());
 

    
    const years = useMemo(() => {
        let uniqueYears: number[] = [];


        [...expenses, ...gains].forEach(item => {
            console.log('item', item, 'item.date' , item.date)

            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        });

    },[]);


    const months = useMemo(() => {
           return listOfMonths.map((month, index) => {
              return {
                value: index + 1,
                label: month
              }
           });

    },[])


    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        });

        return total;
    },[monthSelected, yearSelected]);
 
    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        });

        return total;
    },[monthSelected, yearSelected]);
 
    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
        
    },[totalExpenses, totalGains]);


    const message = useMemo(() => {
        if(totalBalance < 0){
            return {
                title: 'Que triste!',
                description: 'Neste mês você gastou mais do que deveria.',
                footerText: 'Verifique seus gastos e tente cortar gastos desnecessários.',
                icon: sadImg
            }
        }
        else if(totalBalance === 0){
            return {
                title: 'Ufa!',
                description: 'Neste mês você gastou exatamente o que ganhou.',
                footerText: 'Tenha cuidado. No próximo mês tente poupar o seu dinheiro.',
                icon: smileImg
            }
        } else{
            return {
                title: 'Muito bem!',
                description: 'Sua carteira está positiva!',
                footerText: 'Continue assim. Considere investir o seu saldo.',
                icon: happyImg
            }
        }
    },[totalBalance])

    
    const handleMonthSelected = (month: string) =>{
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch{
            throw new Error('invalid month value. Is accept interger number.');
        }
    }

    const handleYearSelected = (year: string) =>{
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch{
            throw new Error('invalid year value. Is accept interger number.');
        }
    }
   

    return(
        <Container>
            <ContentHeader title='Dashboard' lineColor='#F7931B'>
                <SelectInput 
                    defaultValue={monthSelected} 
                    options={months} 
                    onChange={(e) => handleMonthSelected(e.target.value)}
                />
                <SelectInput
                    defaultValue={yearSelected}
                    options={years}
                    onChange={(e) => handleYearSelected(e.target.value)}
                />
            </ContentHeader>
            
            <Content>            
                <WalletBox 
                        title='Saldo' 
                        amount={totalBalance} 
                        footerLabel='Atualizado com base nas entradas e saídas' 
                        icon='dolar' 
                        color='#4E41F0'
                    />
                    <WalletBox 
                        title='Entradas' 
                        amount={totalGains} 
                        footerLabel='Atualizado com base nas entradas e saídas' 
                        icon='arrowUpImg' 
                        color='#F7931B'
                    />
                    <WalletBox 
                        title='Saídas' 
                        amount={totalExpenses} 
                        footerLabel='Atualizado com base nas entradas e saídas' 
                        icon='arrowDownImg' 
                        color='#E44C4E'
                    />
                    <MessageBox 
                        title={message.title} 
                        description={message.description} 
                        footerText={message.footerText} 
                        icon={message.icon}
                    />               
            </Content>
        </Container>
    );
}


export default Dashboard;