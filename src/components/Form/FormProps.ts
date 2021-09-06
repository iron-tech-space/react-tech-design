import React from "react";
import {FormProps as AntFormProps} from 'antd'
import { Request } from "../core/interfaces";

export type FormHeaderProps = React.HTMLAttributes<HTMLDivElement>
export type FormBodyProps = React.HTMLAttributes<HTMLDivElement> & {
    /** Не делать отступы у формы от краев блока. **Only config Form** */
    noPadding?: boolean;
    /** Разрешить скролл внтри формы */
    scrollable?: boolean;
}
export type FormFooterProps = React.HTMLAttributes<HTMLDivElement>

export type FormItemsProps = {
    items: object[];
}
export type FormItemProps = {
    child: object;
}

export interface FormProps extends AntFormProps{
    /** Не делать отступы у формы от краев блока. **Only config Form** */
    noPadding?: boolean;

    /** Разрешить скролл внтри формы. **Only config Form** */
    scrollable?: boolean;

    /** Массив объектов для шапки формы. Как правило только заголовок. */
    header?: any[];

    /** Массив объектов для тела формы */
    body?: any[];

    /** Массив объектов для подвала формы. Как правило только кнопки "Сохранить" и "Отмена" */
    footer?: any[];

    /**
     * Ссылка на функцию загрузки значений по умолчанию
     *
     * Пример: `(callBack) => callBack({})` */
    loadInitData?: (callBack: (params: any) => void) => void,

    /** Запрос для автоматического сохранения формы */
    requestSaveForm?: Request;

    /** HTTP Метод, передаваемый в запрос сохранения */
    methodSaveForm?: string;

    /** Функция обработки перед сохранением формы */
    processBeforeSaveForm?: (values: any) => any

    /** Параметры записи в store изменений всех полей формы  */
    dispatch?: {
        path: string;
        type?: 'event' | undefined;
        extraData?: any;
    }
}