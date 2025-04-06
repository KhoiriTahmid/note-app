export declare const successResponseMaker: (message: string, data: any, page?: any) => {
    success: boolean;
    message: string;
    data: any;
    page: any;
} | {
    success: boolean;
    message: string;
    data: any;
    page?: undefined;
};
export declare const errorResponseMaker: (message: string, errors: any) => {
    success: boolean;
    message: string;
    errors: any;
};
