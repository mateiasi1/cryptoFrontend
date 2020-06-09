export class BankAccount {
    id: number;
    currencyName: string;
    bankName: string;
    iban: string;
    sold: number;
}

export interface CurrencyList {
    currencyAbbreviation: string;
    currencyName: string;
}

export class Currency {
    id: number;
    Currency: string;
    Name: string;
    Symbol: string;
}

export class CurrencyListTransactions {
    id: number;
    From: string;
    To: string;
    Ammount: number;
    Status: string;
    Date: Date;
}
