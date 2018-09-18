export interface IIisLog {
    dateTime: Date;
    serverIp: string;
    method: string;
    uriSource: string;
    port: number;
    clientIp: string;
    userAgent: string;
    destination: string;
    response: number;
    myProperty: number;
    timeTaken: string;
}

export interface IIpTotalCalls {
    ip: string;
    total:number;
}