import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import Moviments from '../../models/Moviments';
import fortmatCurrency from '../../utils/formatCurrency';
import fortmatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import { Container, Content, Filters } from "./style";

const List: React.FC = () => {
    const { movimentType }= useParams();
    const [ moviments, setMoviments ] = useState<Moviments[]>([]);
    const [ monthSelected, setMonthSelected ] = useState<number>(new Date().getMonth() + 1);
    const [ yearSelected, setYearSelected ] = useState<number>(new Date().getFullYear());
    const [ selectedFilterFrequency, setSelectedFilterFrequency ] = useState<string[]>(['recorrente', 'eventual']);


    const typeBalance = useMemo(() => {
        return movimentType === 'entry-balance' ? {
            title: 'Entradas',
            lineColor: '#4E41F0',
            listMoviments: gains
        } : {
            title: 'Saídas',
            lineColor: '#E44C4E',
            listMoviments: expenses
        };
    },[movimentType]);


    const years = useMemo(() => {
        let uniqueYears: number[] = [];


        typeBalance.listMoviments.forEach(item => {
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

    },[typeBalance.listMoviments]);


    const months = useMemo(() => {
           return listOfMonths.map((month, index) => {
              return {
                value: index + 1,
                label: month
              }
           });

    },[])


    const handleFrequencyCLick = (frequency: string) => {
        const alreadySelected = selectedFilterFrequency.findIndex(item => item === frequency);

        if(alreadySelected >= 0){
            const filtered = selectedFilterFrequency.filter(item => item !== frequency);
            setSelectedFilterFrequency(filtered);
        }
        else{            
            //Para adicionar um filtro sem sobrescrever os outros, pode-se fazer de duas formas
            // setSelectedFrequency([
            //     ...selectedFrequency,
            //     frequency
            // ]);

            setSelectedFilterFrequency((prev) => [...prev, frequency]);
        }
    }
    
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
   

    useEffect(() => {

        const filteredDate: Moviments[] = typeBalance.listMoviments.filter(item => {
            const date = new Date(item.date);
            const month  = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && selectedFilterFrequency.includes(item.frequency);
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

    },[typeBalance.listMoviments, monthSelected, yearSelected, selectedFilterFrequency]);


    return(
        <Container>
            <ContentHeader title={typeBalance.title} lineColor={typeBalance.lineColor}>
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

            <Filters>
                <button
                    type='button'
                    className={`
                    tag-filter 
                    tag-filter-recurrent
                    ${selectedFilterFrequency.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyCLick('recorrente')}
                >
                    Recorrentes
                </button>

                <button
                    type='button'
                    className={`
                    tag-filter 
                    tag-filter-eventual
                    ${selectedFilterFrequency.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyCLick('eventual')}
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