import React from 'react';
import { 
    Container,
    Content,
    Filters,
 } 
 from "./style";
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

const List: React.FC = () => {
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
    return(
        <Container>
            <ContentHeader title='Saídas' lineColor='#E44C4E'>
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
                <HistoryFinanceCard 
                tagColor={'#E44C4E'} 
                title={'Conta de Luz'} 
                subTitle={'26/03/2024'} 
                amount={'R$ 130,00'}                
                />
            </Content>
        </Container>        
    );
}


export default List;