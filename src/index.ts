import { TerytConfig, TerytFunction } from "./types";

export class Teryt {
    private _username: string;
    private _password: string;

    constructor(config: TerytConfig) {
        if (config.username === '' && config.password === '') {
            throw new Error('TerytJSWrapper: you have to provide username and password.');
        }
        this._username = config.username;
        this._password = config.password;
    }

    private getRawFunctionBody(terytFunction: TerytFunction): string {
        const { name, params } = terytFunction;

        const rawParams: string = params
            .map(({ name, value, single }) => {
                if (single) {
                    return `<tem:${name}/>`;
                }
                return `<tem:${name}>${value}</tem:${name}>`;
            })
            .join('');

        return `<tem:${name}>${rawParams}</tem:${name}>`;
    }

    private getRawRequestBody(terytFunction: TerytFunction): string {
        return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                    <soapenv:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
                        <wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
                            <wsse:UsernameToken wsu:Id="UsernameToken-35A272A362311FD21816370742759125">
                                <wsse:Username>${this._username}</wsse:Username>
                                <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${this._password}</wsse:Password>
                            </wsse:UsernameToken>
                        </wsse:Security>
                        <wsa:Action>http://tempuri.org/ITerytWs1/${terytFunction.name}</wsa:Action>
                    </soapenv:Header>
                    <soapenv:Body>${this.getRawFunctionBody(terytFunction)}</soapenv:Body>
                </soapenv:Envelope>`;
    }
}