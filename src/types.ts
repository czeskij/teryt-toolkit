import { TerytMethodType } from "./methods";

export interface TerytConfig {
    username: string,
    password: string,
};

interface TerytMethodParameter {
    name: string, 
    value: string, 
    single?: boolean,
};

export interface TerytMethod {
    name: TerytMethodType,
    params: TerytMethodParameter[],
};

interface TerytRequestHeaders {
    "SOAPAction": string,
    "Content-Type": "text/xml",
};

export interface TerytRequest {
    body: string,
    soapAction: string,
};

export interface TerytCompleteRequest extends TerytRequest {
    headers: TerytRequestHeaders,
}

type TerytMethodResponse<Method, DTO> = {
    [Prop in keyof Method as `${Uppercase<string & Method>}Response`]: {
        [Prop in keyof Method as `${Uppercase<string & Method>}Result`]: DTO;
    }
}

export interface TerytResponse<T, P> {
    "s:Envelope": {
        "s:Header": {
            "a:Action": string,
            "o:Security": {
                "u:Created": string,
                "u:Expires": string,
            },
        },
        "s:Body": TerytMethodResponse<T, P>,
    },
};

// suppress build warnings for now
export type Buffer = unknown;