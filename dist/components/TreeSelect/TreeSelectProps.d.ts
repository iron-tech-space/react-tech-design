import { TreeSelectProps as AntTreeSelectProps } from 'antd';
import { SelectValue } from "antd/lib/tree-select";
import { StoreProps } from "../core/wrappers";
import { Request, sortBy, OptionItem } from "../core/interfaces";
export interface TreeSelectProps<VT extends SelectValue = SelectValue> extends AntTreeSelectProps<VT>, StoreProps {
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
    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows?: Request;
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
    optionConverter?: (option: any) => OptionItem;
    /** Select options: `[{ label, value, className, disabled }]` */
    options?: OptionItem[];
}
