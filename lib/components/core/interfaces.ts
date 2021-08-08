import { ReactNode } from "react";

export type RequestOptions = { params: any; data: any; }

export type Request = (options: RequestOptions) => Promise<any>;

export type OptionItem = { label: ReactNode; value: any; className?: string; disabled?: boolean }

export interface sortBy {
    /** Ключ поля для сортировки */
    key: string;
    /** Направление сортировки */
    order: 'asc' | 'desc';
}
