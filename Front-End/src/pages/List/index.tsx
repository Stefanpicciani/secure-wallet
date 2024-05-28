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
import MovimentsFormated from '../../models/MovimentsFormated';
import { useParams } from 'react-router-dom';

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import Moviments from '../../models/Moviments';
import fortmatCurrency from '../../utils/formatCurrency';
import fortmatDate from '../../utils/formatDate';


const List: React.FC = () => {
    const { type }= useParams();
    const [ moviments, setMoviments ] = useState<Moviments[]>([]);

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

    const months = [
        {value: 7, label: 'Julho'},
        {value: 8, label: 'Agosto'},
        {value: 9, label: 'Setembro'},
    ];

    const years = [
        {value: 2024, label: 2024},
        {value: 2023, label: 2023},
        {value: 2022, label: 2022},
    ];

    useEffect(() => {
        const response: Moviments[] = listMoviments.map(item => {
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

        setMoviments(response);        
    },[moviments]);

    return(
        <Container>
            <ContentHeader title={typeBalance.title} lineColor={typeBalance.lineColor}>
                <SelectInput options={months}/>
                <SelectInput options={years}/>
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