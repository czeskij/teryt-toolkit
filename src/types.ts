export interface TerytConfig {
    username: string,
    password: string,
};

type TerytFunctionParameter = {
    name: string, 
    value: string, 
    single?: boolean,
};

export interface TerytFunction {
    name: string,
    params: TerytFunctionParameter[],
};

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

