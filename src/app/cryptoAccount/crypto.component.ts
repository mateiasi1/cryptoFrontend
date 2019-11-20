export class CryptoAccount {
    id: number;
    currencyName: string;
    bankName: string;
    iban: string;
    sold: number;
}

export interface CryptoList {
    id: number;
    currencyAbbreviation: string;
    currencyName: string;
}

export class Crypto {
    id: number;
    Currency: string;
    Name: string;
    Symbol: string;
}