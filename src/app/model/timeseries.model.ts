/* eslint-disable @typescript-eslint/naming-convention */
export interface Latest {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: any;
};

export interface TimeSeries {
    success: boolean;
    timeseries: number;
    base: string;
    start_date: string;
    end_date: string;
    date: string;
    rates: any;
};

export interface Convert {
    success: true;
    query: {
        from: string;
        to: string;
        amount: number;
    };
    info: {
        timestamp: number;
        rate: number;
    };
    date: string;
    result: number;
}

export interface RateResult {
    date: Date;
    currency: string;
    rates: Rate;
    success: boolean;
    timestamp: number;
}

export interface Rate {
    symbol: string;
    rate: number;
}

export interface Currency {
    symbol: string;
    rate: number;
}