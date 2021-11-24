import { TerytCompleteRequest, TerytConfig, TerytMethod, TerytRequest } from "./types";
import { XMLParser } from 'fast-xml-parser';

export class Teryt {
    private _username: string;
    private _password: string;
    private _parser: XMLParser;

    constructor(config: TerytConfig) {
        if (config.username === '' && config.password === '') {
            throw new Error('TerytToolkit: you have to provide username and password.');
        }
        this._username = config.username;
        this._password = config.password;

        try {
            this._parser = new XMLParser();
        } catch (error) {
            throw new Error(`TerytToolkit: something went wrong with fast-xml-parser: ${error}`);
        }
    }

    private getMethodBody(terytMethod: TerytMethod): string {
        const { name, params } = terytMethod;

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

    private getRequest(terytMethod: TerytMethod): TerytRequest {
        const soapAction = `http://tempuri.org/ITerytWs1/${terytMethod.name}`;
        return {
            body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                    <soapenv:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
                        <wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
                            <wsse:UsernameToken wsu:Id="UsernameToken-35A272A362311FD21816370742759125">
                                <wsse:Username>${this._username}</wsse:Username>
                                <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${this._password}</wsse:Password>
                            </wsse:UsernameToken>
                        </wsse:Security>
                        <wsa:Action>${soapAction}</wsa:Action>
                    </soapenv:Header>
                    <soapenv:Body>${this.getMethodBody(terytMethod)}</soapenv:Body>
                </soapenv:Envelope>`,
            soapAction,
        };
    }

    public prepareRequest(terytMethod: TerytMethod): TerytCompleteRequest {
        const { body, soapAction } = this.getRequest(terytMethod);
        return {
            body,
            soapAction,
            headers: {
                "SOAPAction": soapAction,
                "Content-Type": "text/xml"
            }
        };
    };

    public prepareResponse<T>(response: any): T {
        return this._parser.parse(response) as T;
    }
}