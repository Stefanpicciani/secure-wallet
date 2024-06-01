import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    Content,
    Filters,
 }
 from "./style";
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { useParams } from 'react-router-dom';

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import Moviments from '../../models/Moviments';
import fortmatCurrency from '../../utils/formatCurrency';
import fortmatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

const List: React.FC = () => {
    const { type }= useParams();
    const [ moviments, setMoviments ] = useState<Moviments[]>([]);
    const [ monthSelected, setMonthSelected ] = useState<string>(String(new Date().getMonth() + 1));
    const [ yearSelected, setYearSelected ] = useState<string>(String(new Date().getFullYear()));

    const typeBalance = useMemo(() => {
        return type === 'entry-balance' ? {
            title: 'Entradas',
            lineColor: '#F7931B'
        } : {
            title: 'Saídas',
            lineColor: '#E44C4E'
        };
    },[type]);

    const listMoviments = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses;
    },[type]);


    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        
        listMoviments.forEach(item => {
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

    useEffect(() => {

        const filteredDate: Moviments[] = listMoviments.filter(item => {
            const date = new Date(item.date);
            const month  = String(date.getMonth() + 1);
            const year = String(date.getFullYear());
            
            return month === monthSelected && year === yearSelected;
        });

        const formattedDate = filteredDate.map(item => {
            return {
                description: item.description,
                amount: fortmatCurrency(Number(item.amount), item.typeCurrency.toLocaleUpperCase()),
                date: fortmatDate(item.date),
                frequency: item.frequency,
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
                type: item.type,
                typeCurrency: item.typeCurrency
            }
        })

        setMoviments(formattedDate);        
    },[ monthSelected, yearSelected]);

    return(
        <Container>
            <ContentHeader title={typeBalance.title} lineColor={typeBalance.lineColor}>
                <SelectInput defaultValue={monthSelected} options={months} onChange={(e) => setMonthSelected(e.target.value)}/>
                <SelectInput defaultValue={yearSelected} options={years} onChange={(e) => setYearSelected(e.target.value)}/>
            </ContentHeader>

            <Filters>
                <button
                    type='button'
                    className='tag-filter tag-filter-recurrent'
                >
                    Recorrentes
                </button>

                <button
                    type='button'
                    className='tag-filter tag-filter-eventual'
                >
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                    moviments.map((item, index) => (
                        <HistoryFinanceCard
                            key={index}
                            tagColor={item.tagColor}
                            title={item.description}
                            subTitle={item.date}
                            amount={item.amount}
                        />
                    ))
                    
                }
            </Content>
        </Container>
    );
}


export default List;