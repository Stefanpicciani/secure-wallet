import React from 'react';
import { 
    Container,
    Content,
 } 
 from "./style";
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

const List: React.FC = () => {
    const options = [
        {value: 'Stefan', label: 'Stefan'},
        {value: 'Isabela', label: 'Isabela'},
        {value: 'Lucas', label: 'Lucas'},
    ];

    return(
        <Container>
            <ContentHeader title='Saídas' lineColor='#E44C4E'>
                <SelectInput options={options}/>
            </ContentHeader>

            <Content>
                <HistoryFinanceCard 
                cardColor={'#313862'}
                tagColor={'#E44C4E'} 
                title={'Conta de Luz'} 
                subTitle={'26/03/2024'} 
                amount={'R$ 130,00'}                
                />
                 <HistoryFinanceCard 
                cardColor={'#313862'}
                tagColor={'#E44C4E'} 
                title={'Conta de Luz'} 
                subTitle={'26/03/2024'} 
                amount={'R$ 130,00'}                
                />
                 <HistoryFinanceCard 
                cardColor={'#313862'}
                tagColor={'#E44C4E'} 
                title={'Conta de Luz'} 
                subTitle={'26/03/2024'} 
                amount={'R$ 130,00'}                
                />
                 <HistoryFinanceCard 
                cardColor={'#313862'}
                tagColor={'#E44C4E'} 
                title={'Conta de Luz'} 
                subTitle={'26/03/2024'} 
                amount={'R$ 130,00'}                
                />
                 <HistoryFinanceCard 
                cardColor={'#313862'}
                tagColor={'#E44C4E'} 
                title={'Conta de Luz'} 
                subTitle={'26/03/2024'} 
                amount={'R$ 130,00'}                
                />
                 <HistoryFinanceCard 
                cardColor={'#313862'}
                tagColor={'#E44C4E'} 
                title={'Conta de Luz'} 
                subTitle={'26/03/2024'} 
                amount={'R$ 130,00'}                
                />
                 <HistoryFinanceCard 
                cardColor={'#313862'}
                tagColor={'#E44C4E'} 
                title={'Conta de Luz'} 
                subTitle={'26/03/2024'} 
                amount={'R$ 130,00'}                
                />
                 <HistoryFinanceCard 
                cardColor={'#313862'}
                tagColor={'#E44C4E'} 
                title={'Conta de Luz'} 
                subTitle={'26/03/2024'} 
                amount={'R$ 130,00'}                
                />
                 <HistoryFinanceCard 
                cardColor={'#313862'}
                tagColor={'#E44C4E'} 
                title={'Conta de Luz'} 
                subTitle={'26/03/2024'} 
                amount={'R$ 130,00'}                
                />
                 <HistoryFinanceCard 
                cardColor={'#313862'}
                tagColor={'#E44C4E'} 
                title={'Conta de Luz'} 
                subTitle={'26/03/2024'} 
                amount={'R$ 130,00'}                
                />
                 <HistoryFinanceCard 
                cardColor={'#313862'}
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