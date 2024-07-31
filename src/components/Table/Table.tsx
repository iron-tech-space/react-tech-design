import RtTable from "./ReactBaseTable/ConfigLoader";
import RawRtTable from "./ReactBaseTable/Table";
import AntTable from "./AntTable/ConfigLoader";
import RawAntTable from "./AntTable/Table";
import React, { FunctionComponent, ReactNode } from "react";
import { Request, sortBy } from "../core/interfaces";
import { FormItemProps as AntFormItemProps } from "antd/lib/form/FormItem";

export {RtTable, RawRtTable, AntTable, RawAntTable};
export const TableWrapper: FunctionComponent<TableProps> = (props: TableProps) => {
    const {type, ...restProps} = props
    if(type)
        return type === 'rt' ? <RtTable {...restProps} /> : <AntTable {...restProps} />
    else
        return props.infinityMode ? <RtTable {...props} /> : <AntTable {...props} />
}

export interface TablesSubscribeOnChangeOptions {
    /** Значение лежащие в Store по пути subscribe[i].path */
    value: any;
    /** Значение доп данных в Store по пути subscribe[i].extraData */
    extraData: any;
    /** Функиця перезагрузки табблицы по параметрам */
    reloadTable: (params: { sortBy?: sortBy, filter?: object, searchValue?: string }) => void;
    /** Фукнция добавления нескольких строк в таблицу */
    addRows: (rows: any[]) => void;
    /** Фукнция добавления строки в таблицу */
    addRow: (row: any) => void;
    /** Функция копирования выделенной строки. Если selectable = true, то первой выделенной строки */
    addRowAsCopy: () => void;
    /** Фукнция изменения строки */
    editRow: (row: any) => void;
    /** Фукнция удаления строки */
    removeRow: () => void
    /** Фукнция перемещения выделенной строки вверх */
    moveUpRow: () => void
    /** Фукнция перемещения строки вверх по ключу */
    moveUpRowByKey: (rowKey: string) => void
    /** Фукнция перемещения выделенной строки вниз */
    moveDownRow: () => void
    /** Фукнция перемещения строки вниз по ключу */
    moveDownRowByKey: (rowKey: string) => void
    /** Функция для изменения Props таблицы */
    setSubscribeProps: (props?: any) => void
}

export interface TableProps {
    /** Объект с props для Form Item */
    itemProps?: AntFormItemProps;

    /** Тип таблицы */
    type?: 'rt' | undefined;
    /** Столбцы таблицы */
    columns?: any[];
    /** Режим загрузки данных по скроллу */
    infinityMode?: boolean;

    /** Строки по умолчанию */
    defaultRows?: any[];
    /** Ключи выделенных по умолчанию строк */
    defaultSelectedRowKeys?: (string | number)[];
    /** Значение строки поиска по умолчанию строк */
    defaultSearchValue?: string;
    /** Объект фильтрации по умолчанию */
    defaultFilter?: object;
    /** Сортировка по умолчанию */
    defaultSortBy?: sortBy,

    /** Поле для уникальной идентификации строки */
    rowKey?: string;
    /** Строки таблицы. Используется для контроля таблицы из вне. */
    rows?: any[];
    /** Функция задания строк таблицы. */
    setRows?: (rows: any[]) => void;
    /** Выделенные строки таблицы. */
    selectedRowKeys?: (string | number)[];
    /** Значение строки поиска */
    searchValue?: string;
    /** Объект фильтрации */
    filter?: object;
    /** Объект сортировки */
    sortBy?: sortBy;

    /** Дополнительные поля и валидация в объекты таблицы */
    customFields?: {
        name: string;
        value?: (row: any, rows: any[]) => object;
        validate?: (row: any, rows: any[]) => boolean;
    }[];
    /** Данный параметр (props) позволяет добавить или переопределить props для колонок, которые заданы конфигурацией на сервере */
    customColumnProps?: {
        name: string;
        cellRenderer?: (params: {column: any, cellData: any, rowData: any, rowIndex: number}) => ReactNode;
    }[];

    /** Вывод когда нет данных */
    empty?: ReactNode;
    /** Вывод при значении ячейки null */
    nullDash?: string | ReactNode;
    /** Отображение загрузки данных */
    overlay?: ReactNode;
    /** Фиксированная ширина столбцов. Появится боковой скрол */
    fixWidthColumn?: boolean;

    /** Параметры подвала таблицы */
    footerProps?: {
        /** Высота подвала */
        height?: number;
        /** Массив элементов футтера, которые надо отобразить
         * ['selected', 'loaded', 'total'] */
        showElements?: string[];
        /** Заголовок для кол-ва выбранных объектов */
        selectedTitle?: string;
        /** Заголовок для кол-ва загруженных объектов */
        loadedTitle?: string;
        /** Заголовок для кол-ва всего объектов */
        totalTitle?: string;
        /** Левый кастомный элемент командной панели */
        leftCustomSideElement?: React.ComponentType | any[] | ReactNode,
        /** Центральный кастомный элемент командной панели */
        centerCustomSideElement?: React.ComponentType | any[] | ReactNode,
        /** Правый кастомный элемент командной панели */
        rightCustomSideElement?: React.ComponentType | any[] | ReactNode,
    };

    /** Высота заголовка таблицы. [ONLY type = rt] */
    headerHeight?: number;
    /** Высота строки таблицы. [ONLY type = rt] */
    rowHeight?: number;
    /** Custom row renderer [ONLY type = rt]
     *
     * Параметры - `({ isScrolling, cells, columns, rowData, rowIndex, depth })` */
    rowRenderer?: React.ComponentType | ReactNode,
    /** Строки будут в зебро-стиле */
    zebraStyle?: boolean;
    /** Высота расширения */
    estimatedRowHeight?: number;
    /** Отображать ли разделители ячеек в строке */
    cellBordered?: boolean;
    /** Отобрадать ли разделители строк */
    rowBordered?: boolean;
    /** CSS класс таблицы */
    className?: string;
    /** CSS стиль таблицы */
    style?: object;
    /** Рамки таблицы*/
    bordered?: boolean

    /** блокировка таблицы таблицы*/
    disabled?: boolean;
    /** Порог в пикселях для вызова _onLoad.
     * Кол-во пикселей от низа таблицы для срабатывания события загрузки (onEndReached) */
    loadThreshold?: number;
    /** Размер страницы */
    pageSize?: number;
    /** Функция запроса для конфигурации */
    requestLoadConfig?: Request;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows?: Request;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadCount?: Request;
    /** Имя параметра для поиска */
    searchParamName?: string;
    /** Таблица с возможностью выбора строки */
    selectable?: boolean;

    /** Родительский узел и дочерние узлы связаны  [ONLY selectable = true] */
    nodeAssociated?: boolean;
    /** Ключ колонки по которой строить иерархию */
    expandColumnKey?: string;
    /** Открыть по умолчанию вложенность до уровня N или 'All' */
    expandDefaultAll?: boolean;
    /** Загружать ноды иерархии по одной */
    expandLazyLoad?: boolean;
    /** Поле в котором хранится ссылка на родителя */
    expandParentKey?: string;

    /** Событие при клике на строку [ONLY selectable = false]
     * `({selected, rowData, rowIndex}) => {}` */
    onRowClick?: (params: {selected: boolean, rowData: any, rowIndex: number}) => void;

    /** Событие при двойном клике на строку.
     * `({rowData, rowIndex, rowKey}) => {}` */
    onRowDoubleClick?: (params: {rowData: any, rowIndex: number, rowKey: string | number}) => void;

    /** События при открытии / закрытии ноды
     * `({ expanded, rowData, rowIndex, rowKey }) => {}` */
    onRowExpand?: (params: {expanded: boolean, rowData: any, rowIndex: number, rowKey: string | number}) => void;

    /** Событие при выборе строки.
     * `([rowKeys], [rowData]) => {}` */
    onSelectedRowsChange?: (rowKeys: (string | number)[], rowData: any[]) => void;

    /** События при открытии / закрытии ноды
     * `(expandedRowKeys) => {}` - массив ключей открытых нод */
    onExpandedRowsChange?: (expandedRowKeys: (string | number)[]) => void;

    /** Отображать ли панель выбранных элементов */
    showSelection?: boolean;

    /** Строка или функция для отображения элементов списка выбранных
     * Строка - имя поля
     * Функция - рендер строк.
     * `({ rowData, rowIndex }) => { return <Component> }` */
    rowRenderShowSelection?: (params: {rowData: any, rowIndex: number}) => void | string;

    /** Путь в сторе куда класть выбранную строку таблицы */
    dispatchPath?: string;

    /** Параметры записи в Store изменений компонента  */
    dispatch?: {
        path: string;
        type?: 'event' | undefined;
        extraData?:  string | { [key:string]:string };
    };

    /** Объект для подписки на изменения в STORE */
    subscribe?: {
        /** Имя параметра в props с которым связать значение Store */
        name: string;
        /** Путь до объекта в Store */
        path: string;
        /** Путь к дополнительным данным которые будут переданы в onChange */
        extraData?: string| { [key:string]:string };
        /** Выполнить подписку при монтировании компонента
         * По умолчанию false */
        withMount?: boolean;
        /** Вызывается при изменение объекта по указанному path */
        onChange: (params: TablesSubscribeOnChangeOptions) => void;
    }[]
}

