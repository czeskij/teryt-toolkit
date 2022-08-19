import { TerytMethod, TerytResponse } from "../../types";

export const WyszukajMiejscowosc = (query: string): TerytMethod => ({
    name: 'WyszukajMiejscowosc',
    params: [
        { name: 'nazwaMiejscowosci', value: query },
    ],
});

interface MiejscowoscDTO {
    "b:Miejscowosc": {
        "b:GmiRodzaj": number,
        "b:GmiSymbol": string,
        "b:Gmina": string,
        "b:Nazwa": string,
        "b:PowSymbol": string,
        "b:Powiat": string,
        "b:Symbol": string,
        "b:WojSymbol": string,
        "b:Wojewodztwo": string,
    },
};

export type WyszukajMiejscowoscResponse = TerytResponse<'WyszukajMiejscowosc', MiejscowoscDTO>;