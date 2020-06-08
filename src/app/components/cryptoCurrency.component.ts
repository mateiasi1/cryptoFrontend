export class CryptoAccount {
    id: number;
    currencyName: string;
    cryptoName: string;
    refference: string;
    sold: number;
}

export interface CurrencyListCrypto {
    cryptoCurrencyAbbreviation: string;
    cryptoCurrencyName: string;
}

export class CryptoCurrency {
    id: number;
    CryptoCurency: string;
    cryptoName: string;
    cryptoSymbol: string;
}

export class CryptoCurrencyTransactions {
    id: number;
    Ammount: number;
    Status: string;
}
