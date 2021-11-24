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
    name: string,
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

export interface TerytResponse<T> {
    "s:Envelope": {
        "s:Header": {
            "a:Action": string,
            "o:Security": {
                "u:Created": string,
                "u:Expires": string,
            },
        },
        "s:Body": T,
    },
};

