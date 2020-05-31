export class BankAccount {
    id: number;
    idUser: number;
    idCurrency: number;
    currencyName: string;
    idBank: number;
    bankName: string;
    iban: string;
    sold: number;
}

export interface Bank {
    id: number;
    bankName: string;
    iban: string;
    currencyName: string;
    currencyAbbreviation: string;
}
