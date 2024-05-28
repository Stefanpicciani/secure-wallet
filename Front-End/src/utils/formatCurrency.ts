
const fortmatCurrency = (currency: number, typeCurrency: string): string => {
    return currency.toLocaleString(
        'pt-br',
        { 
            style: 'currency',
            currency: typeCurrency,
        }
    )
}

export default fortmatCurrency;