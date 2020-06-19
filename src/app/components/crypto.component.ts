export class CryptoAccount {
    id: number;
    idUser: number;
    idCryptoCurrency: number;
    cryptoCurrencyName: string;
    idCrypto: number;
    cryptoName: string;
    refference: string;
    sold: number;
}

export interface Crypto {
    id: number;
    UserId: number;
    refference: string;
    cryptoCurrencyName: string;
    cryptoCurrencyAbbreviation: string;
}
