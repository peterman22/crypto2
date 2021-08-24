import axios from "axios";

export default async () => {
    const rates = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,LTC&tsyms=USD')
        .then(res => res.data)
        .catch(err => {
            console.log('An error occurred while attempting to fetch tickers', err);
            return {};
        });
    return rates;

}