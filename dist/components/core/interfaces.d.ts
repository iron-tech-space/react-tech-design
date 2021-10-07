import { ReactNode } from "react";
export declare type RequestOptions = {
    params: any;
    data: any;
};
export declare type Request = (options: RequestOptions) => Promise<any>;
export declare type OptionItem = {
    label: ReactNode;
    value: any;
    className?: string;
    disabled?: boolean;
};
export interface sortBy {
    /** Ключ поля для сортировки */
    key: string;
    /** Направление сортировки */
    order: 'asc' | 'desc';
}
