
const fortmatCurrency = (currency: number, typeCurrency: string): string => {
    return currency.toLocaleString(
        'pt-Br',
        { 
            style: 'currency',
            currency: typeCurrency,
        }
    )
}

export default fortmatCurrency;