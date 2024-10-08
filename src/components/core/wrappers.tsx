import React, { ReactNode } from "react";
import { Form as AntForm, FormItemProps as AntFormItemProps } from "antd";
import { withStore as storeConnect } from "./withStore";
import { render, renderLabel } from "./renders";

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
        extraData?: string | Record<string, string>;
        /** Выполнить подписку при монтировании компонента
         * По умолчанию false */
        withMount?: boolean;
        /** Вызывается при изменение объекта по указанному path */
        onChange: (params: SubscribeOnChangeOptions) => void;
    }[];
}

export const searchWrapper = (Component: React.ComponentType, placeholder: string) => (props: any) =>
    withPlaceholder(Component, placeholder)({...props, componentType: 'Search'})

export const withLabel = (Component: React.ComponentType) => (props: any) =>
    withStore(renderLabel(Component))(props);

export const withPlaceholder = (Component: React.ComponentType, placeholder: string) => (props: any) =>
    withStore(Component)({...props, placeholder: (props && props.placeholder) ? props.placeholder : placeholder})

export const withStore = (Component: React.ComponentType<any> | ReactNode) => {
    let StoreComponent = storeConnect(Component);
    return (props: any) => withItem(StoreComponent)(props);
}

export const withItem = (Component: React.ComponentType<any>) => (props: any) => {
    const {itemProps} = props;
    // console.log('withItems ', props)
    return render(AntForm.Item)({
        ...itemProps,
        noStyle: !(itemProps && itemProps.label),
        children: render(Component)(props)
    })
}


