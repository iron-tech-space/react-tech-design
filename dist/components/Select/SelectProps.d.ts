import { SelectProps as AntSelectProps } from 'antd';
import { SelectValue } from "antd/lib/select";
import { StoreProps } from "../core/wrappers";
import { Request, sortBy, OptionItem } from "../core/interfaces";
import { ReactNode } from "react";
export interface SelectProps<VT extends SelectValue = SelectValue> extends Omit<AntSelectProps<VT>, 'mode'>, StoreProps {
    /** Сортировка по умолчанию */
    defaultSortBy?: sortBy;
    /** Объект фильтрации по умолчанию */
    defaultFilter?: any;
    /** Значение строки поиска по умолчанию строк */
    defaultSearchValue?: string;
    /** Сортировка */
    sortBy?: sortBy;
    /** Фильтр */
    filter?: any;
    /** Значение строки поиска */
    searchValue?: string;
    /** Имя параметра для поиска */
    searchParamName?: string;
    /** Имя параметра для поиска потерянного элемента */
    lostParamName?: string;
    /** Режим загружки по скроллу */
    infinityMode?: boolean;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows?: Request;
    /** Режим селекта */
    mode?: 'single' | 'tags' | 'multiple';
    /** Функция преобразования загруженных объектов в объекты для селекта.
     *
     * Сигнатура `(option) => ({})`
     *
     * Требоваеть вернуть объект с параметрам
     *
     * `{ label: ReactNode, value: any, className: string, disabled: bool }`
     *
     * Example:
     * ``` JS
     * (option) => ({
     * 	label: (<span><MehOutlined />{option.name}</span>),
     * 	value: option.id,
     * 	className: 'some-class',
     * 	disabled: false,
     * })
     * ```
     */
    optionConverter?: string | ((option: any) => OptionItem);
    /** Select options: `[{ label, value, className, disabled }]` */
    options?: OptionItem[];
    /** Ширина поля выбора в пикселях */
    widthControl?: string | number;
    /** Размер страницы */
    pageSize?: number;
    /** уникальное отображение данных в селекте */
    dropdownRender?: ReactNode;
}
