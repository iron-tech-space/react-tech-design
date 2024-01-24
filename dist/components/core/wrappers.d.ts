import React, { ReactNode } from "react";
import { FormItemProps as AntFormItemProps } from "antd";
export interface LabelProps {
    label?: string | ReactNode;
    value?: any | ReactNode;
    children?: ReactNode | undefined;
}
export interface SubscribeOnChangeOptions {
    /** Значение лежащие в Store по пути subscribe[i].path */
    value: any;
    /** Значение доп данных в Store по пути subscribe[i].extraData */
    extraData: any;
    /** Функция для изменения Props компонента */
    setSubscribeProps: (params: any) => void;
}
export interface StoreProps {
    /** Объект с props для Form Item */
    itemProps?: AntFormItemProps;
    /** Параметры записи в Store изменений компонента  */
    dispatch?: {
        path: string;
        type?: 'event' | undefined;
        extraData?: any;
    };
    /** Параметры подписки на изменения в Store */
    subscribe?: {
        /** Имя параметра в props с которым связать значение Store */
        name: string;
        /** Путь до объекта в Store */
        path: string;
        /** Путь к дополнительным данным которые будут переданы в onChange */
        extraData?: string;
        /** Выполнить подписку при монтировании компонента
         * По умолчанию false */
        withMount?: boolean;
        /** Вызывается при изменение объекта по указанному path */
        onChange: (params: SubscribeOnChangeOptions) => void;
    }[];
}
export declare const searchWrapper: (Component: React.ComponentType, placeholder: string) => (props: any) => JSX.Element;
export declare const withLabel: (Component: React.ComponentType) => (props: any) => JSX.Element;
export declare const withPlaceholder: (Component: React.ComponentType, placeholder: string) => (props: any) => JSX.Element;
export declare const withStore: (Component: React.ComponentType<any> | ReactNode) => (props: any) => JSX.Element;
export declare const withItem: (Component: React.ComponentType<any>) => (props: any) => JSX.Element;
