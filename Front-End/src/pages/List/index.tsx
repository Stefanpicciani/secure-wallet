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

    const months = [
        {value: 4, label: 'Abril'},
        {value: 5, label: 'Maio'},
        {value: 6, label: 'Junho'},
        {value: 7, label: 'Julho'},
        {value: 8, label: 'Agosto'},
        {value: 9, label: 'Setembro'},
    ];

    const years = [
        {value: 2020, label: 2020},
        {value: 2021, label: 2021},
        {value: 2022, label: 2022},
        {value: 2023, label: 2023},
        {value: 2024, label: 2024},
    ];

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