export class CryptoAccount {
    id: number;
    currencyName: string;
    cryptoName: string;
    refference: string;
    sold: number;
}

export interface CurrencyListCrypto {
    id: number;
    curencyCryptoAbbreviation: string;
    currencyCryptoName: string;
}

export class CryptoCurrency {
    id: number;
    CryptoCurency: string;
    cryptoName: string;
    cryptoSymbol: string;
}
