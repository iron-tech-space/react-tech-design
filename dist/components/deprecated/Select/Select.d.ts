declare const _default: import("react-redux").ConnectedComponent<{
    (props: any): JSX.Element;
    propTypes: {
        /** Имя параметра селекта (вернется в onChangeKeys и onChangeObjects) */
        name: PropTypes.Validator<NonNullable<NonNullable<string | number | (NonNullable<string | number | null | undefined> | null | undefined)[] | null | undefined>>>;
        /** Строка или функция для отображения элементов списка
         * Строка - имя поля
         * Функция - рендер строк. Параметры v
         * { rowData, rowIndex }) */
        rowRender: PropTypes.Validator<NonNullable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>>;
        /** Тип селекта (SingleSelect и MultiSelect) */
        type: PropTypes.Validator<string>;
        /** Дополнительное имя класса для элемента */
        className: PropTypes.Requireable<string>;
        /** Заголовок фильтра */
        title: PropTypes.Requireable<string>;
        /** Строка, когда ничего не выбрано */
        placeholder: PropTypes.Requireable<string>;
        /** Запрос на загрузку дефолтных данных */
        requestLoadDefault: PropTypes.Requireable<(...args: any[]) => any>;
        /** Массив выбранных значений */
        selectedRowKeys: PropTypes.Requireable<(NonNullable<string | number | null | undefined> | null | undefined)[]>;
        /** Размер селектора ['small', 'middle', 'large'] */
        size: PropTypes.Requireable<string>;
        /** Ширина поля выбора в пикселях */
        widthControl: PropTypes.Requireable<number>;
        /** Ширина выпадающего меню */
        widthPopup: PropTypes.Requireable<number>;
        /** Высота выпадающего меню (по умолчанию считается сама) */
        heightPopup: PropTypes.Requireable<number>;
        /** Событие об изменении состояния селектора */
        onChangeKeys: PropTypes.Requireable<(...args: any[]) => any>;
        /** Поле для уникальной идентификации строки */
        rowKey: PropTypes.Requireable<string>;
        /** Высота строки таблицы */
        rowHeight: PropTypes.Requireable<number>;
        /** Строки будут в зебро-стиле */
        zebraStyle: PropTypes.Requireable<boolean>;
        /** Функция запроса для загрузки строк (данных) */
        requestLoadRows: PropTypes.Requireable<(...args: any[]) => any>;
        /** Функция запроса для загрузки строк (данных) */
        requestLoadCount: PropTypes.Requireable<(...args: any[]) => any>;
        /** Значение строки поиска */
        searchValue: PropTypes.Requireable<string>;
        /** Имя параметра для поиска */
        searchParamName: PropTypes.Requireable<string>;
        /** Родительский узел и дочерние узлы связаны (Работает только при selectable) */
        nodeAssociated: PropTypes.Requireable<boolean>;
        /** Ключ колонки по которой строить иерархию */
        expandColumnKey: PropTypes.Requireable<string>;
        /** Открыть по умолчанию вложенность до уровня N или 'All' */
        expandDefaultAll: PropTypes.Requireable<boolean>;
        /** Загружать ноды иерархии по одной */
        expandLazyLoad: PropTypes.Requireable<boolean>;
        /** Поле в котором хранится ссылка на родителя */
        expandParentKey: PropTypes.Requireable<string>;
    };
    defaultProps: {
        onChangeKeys: () => void;
        placeholder: string;
        size: string;
        widthControl: number;
        widthPopup: number;
        heightPopup: number;
        rowKey: string;
        rowHeight: number;
        zebraStyle: boolean;
        requestLoadDefault: undefined;
        requestLoadRows: undefined;
        requestLoadCount: undefined;
        searchValue: string;
        searchParamName: string;
        nodeAssociated: boolean;
        expandColumnKey: undefined;
        expandDefaultAll: boolean;
        expandLazyLoad: boolean;
        expandParentKey: string;
    };
}, import("react-redux").Omit<Pick<PropTypes.InferProps<{
    /** Имя параметра селекта (вернется в onChangeKeys и onChangeObjects) */
    name: PropTypes.Validator<NonNullable<NonNullable<string | number | (NonNullable<string | number | null | undefined> | null | undefined)[] | null | undefined>>>;
    /** Строка или функция для отображения элементов списка
     * Строка - имя поля
     * Функция - рендер строк. Параметры v
     * { rowData, rowIndex }) */
    rowRender: PropTypes.Validator<NonNullable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>>;
    /** Тип селекта (SingleSelect и MultiSelect) */
    type: PropTypes.Validator<string>;
    /** Дополнительное имя класса для элемента */
    className: PropTypes.Requireable<string>;
    /** Заголовок фильтра */
    title: PropTypes.Requireable<string>;
    /** Строка, когда ничего не выбрано */
    placeholder: PropTypes.Requireable<string>;
    /** Запрос на загрузку дефолтных данных */
    requestLoadDefault: PropTypes.Requireable<(...args: any[]) => any>;
    /** Массив выбранных значений */
    selectedRowKeys: PropTypes.Requireable<(NonNullable<string | number | null | undefined> | null | undefined)[]>;
    /** Размер селектора ['small', 'middle', 'large'] */
    size: PropTypes.Requireable<string>;
    /** Ширина поля выбора в пикселях */
    widthControl: PropTypes.Requireable<number>;
    /** Ширина выпадающего меню */
    widthPopup: PropTypes.Requireable<number>;
    /** Высота выпадающего меню (по умолчанию считается сама) */
    heightPopup: PropTypes.Requireable<number>;
    /** Событие об изменении состояния селектора */
    onChangeKeys: PropTypes.Requireable<(...args: any[]) => any>;
    /** Поле для уникальной идентификации строки */
    rowKey: PropTypes.Requireable<string>;
    /** Высота строки таблицы */
    rowHeight: PropTypes.Requireable<number>;
    /** Строки будут в зебро-стиле */
    zebraStyle: PropTypes.Requireable<boolean>;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows: PropTypes.Requireable<(...args: any[]) => any>;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadCount: PropTypes.Requireable<(...args: any[]) => any>;
    /** Значение строки поиска */
    searchValue: PropTypes.Requireable<string>;
    /** Имя параметра для поиска */
    searchParamName: PropTypes.Requireable<string>;
    /** Родительский узел и дочерние узлы связаны (Работает только при selectable) */
    nodeAssociated: PropTypes.Requireable<boolean>;
    /** Ключ колонки по которой строить иерархию */
    expandColumnKey: PropTypes.Requireable<string>;
    /** Открыть по умолчанию вложенность до уровня N или 'All' */
    expandDefaultAll: PropTypes.Requireable<boolean>;
    /** Загружать ноды иерархии по одной */
    expandLazyLoad: PropTypes.Requireable<boolean>;
    /** Поле в котором хранится ссылка на родителя */
    expandParentKey: PropTypes.Requireable<string>;
}>, "title" | "className" | "selectedRowKeys" | PropTypes.RequiredKeys<{
    /** Имя параметра селекта (вернется в onChangeKeys и onChangeObjects) */
    name: PropTypes.Validator<NonNullable<NonNullable<string | number | (NonNullable<string | number | null | undefined> | null | undefined)[] | null | undefined>>>;
    /** Строка или функция для отображения элементов списка
     * Строка - имя поля
     * Функция - рендер строк. Параметры v
     * { rowData, rowIndex }) */
    rowRender: PropTypes.Validator<NonNullable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>>;
    /** Тип селекта (SingleSelect и MultiSelect) */
    type: PropTypes.Validator<string>;
    /** Дополнительное имя класса для элемента */
    className: PropTypes.Requireable<string>;
    /** Заголовок фильтра */
    title: PropTypes.Requireable<string>;
    /** Строка, когда ничего не выбрано */
    placeholder: PropTypes.Requireable<string>;
    /** Запрос на загрузку дефолтных данных */
    requestLoadDefault: PropTypes.Requireable<(...args: any[]) => any>;
    /** Массив выбранных значений */
    selectedRowKeys: PropTypes.Requireable<(NonNullable<string | number | null | undefined> | null | undefined)[]>;
    /** Размер селектора ['small', 'middle', 'large'] */
    size: PropTypes.Requireable<string>;
    /** Ширина поля выбора в пикселях */
    widthControl: PropTypes.Requireable<number>;
    /** Ширина выпадающего меню */
    widthPopup: PropTypes.Requireable<number>;
    /** Высота выпадающего меню (по умолчанию считается сама) */
    heightPopup: PropTypes.Requireable<number>;
    /** Событие об изменении состояния селектора */
    onChangeKeys: PropTypes.Requireable<(...args: any[]) => any>;
    /** Поле для уникальной идентификации строки */
    rowKey: PropTypes.Requireable<string>;
    /** Высота строки таблицы */
    rowHeight: PropTypes.Requireable<number>;
    /** Строки будут в зебро-стиле */
    zebraStyle: PropTypes.Requireable<boolean>;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows: PropTypes.Requireable<(...args: any[]) => any>;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadCount: PropTypes.Requireable<(...args: any[]) => any>;
    /** Значение строки поиска */
    searchValue: PropTypes.Requireable<string>;
    /** Имя параметра для поиска */
    searchParamName: PropTypes.Requireable<string>;
    /** Родительский узел и дочерние узлы связаны (Работает только при selectable) */
    nodeAssociated: PropTypes.Requireable<boolean>;
    /** Ключ колонки по которой строить иерархию */
    expandColumnKey: PropTypes.Requireable<string>;
    /** Открыть по умолчанию вложенность до уровня N или 'All' */
    expandDefaultAll: PropTypes.Requireable<boolean>;
    /** Загружать ноды иерархии по одной */
    expandLazyLoad: PropTypes.Requireable<boolean>;
    /** Поле в котором хранится ссылка на родителя */
    expandParentKey: PropTypes.Requireable<string>;
}>> & Partial<Pick<PropTypes.InferProps<{
    /** Имя параметра селекта (вернется в onChangeKeys и onChangeObjects) */
    name: PropTypes.Validator<NonNullable<NonNullable<string | number | (NonNullable<string | number | null | undefined> | null | undefined)[] | null | undefined>>>;
    /** Строка или функция для отображения элементов списка
     * Строка - имя поля
     * Функция - рендер строк. Параметры v
     * { rowData, rowIndex }) */
    rowRender: PropTypes.Validator<NonNullable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>>;
    /** Тип селекта (SingleSelect и MultiSelect) */
    type: PropTypes.Validator<string>;
    /** Дополнительное имя класса для элемента */
    className: PropTypes.Requireable<string>;
    /** Заголовок фильтра */
    title: PropTypes.Requireable<string>;
    /** Строка, когда ничего не выбрано */
    placeholder: PropTypes.Requireable<string>;
    /** Запрос на загрузку дефолтных данных */
    requestLoadDefault: PropTypes.Requireable<(...args: any[]) => any>;
    /** Массив выбранных значений */
    selectedRowKeys: PropTypes.Requireable<(NonNullable<string | number | null | undefined> | null | undefined)[]>;
    /** Размер селектора ['small', 'middle', 'large'] */
    size: PropTypes.Requireable<string>;
    /** Ширина поля выбора в пикселях */
    widthControl: PropTypes.Requireable<number>;
    /** Ширина выпадающего меню */
    widthPopup: PropTypes.Requireable<number>;
    /** Высота выпадающего меню (по умолчанию считается сама) */
    heightPopup: PropTypes.Requireable<number>;
    /** Событие об изменении состояния селектора */
    onChangeKeys: PropTypes.Requireable<(...args: any[]) => any>;
    /** Поле для уникальной идентификации строки */
    rowKey: PropTypes.Requireable<string>;
    /** Высота строки таблицы */
    rowHeight: PropTypes.Requireable<number>;
    /** Строки будут в зебро-стиле */
    zebraStyle: PropTypes.Requireable<boolean>;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows: PropTypes.Requireable<(...args: any[]) => any>;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadCount: PropTypes.Requireable<(...args: any[]) => any>;
    /** Значение строки поиска */
    searchValue: PropTypes.Requireable<string>;
    /** Имя параметра для поиска */
    searchParamName: PropTypes.Requireable<string>;
    /** Родительский узел и дочерние узлы связаны (Работает только при selectable) */
    nodeAssociated: PropTypes.Requireable<boolean>;
    /** Ключ колонки по которой строить иерархию */
    expandColumnKey: PropTypes.Requireable<string>;
    /** Открыть по умолчанию вложенность до уровня N или 'All' */
    expandDefaultAll: PropTypes.Requireable<boolean>;
    /** Загружать ноды иерархии по одной */
    expandLazyLoad: PropTypes.Requireable<boolean>;
    /** Поле в котором хранится ссылка на родителя */
    expandParentKey: PropTypes.Requireable<string>;
}>, "size" | "rowHeight" | "requestLoadRows" | "searchValue" | "placeholder" | "searchParamName" | "widthControl" | "rowKey" | "expandColumnKey" | "expandParentKey" | "zebraStyle" | "requestLoadCount" | "nodeAssociated" | "expandDefaultAll" | "expandLazyLoad" | "requestLoadDefault" | "widthPopup" | "heightPopup" | "onChangeKeys">> & Partial<Pick<{
    onChangeKeys: () => void;
    placeholder: string;
    size: string;
    widthControl: number;
    widthPopup: number;
    heightPopup: number;
    rowKey: string;
    rowHeight: number;
    zebraStyle: boolean;
    requestLoadDefault: undefined;
    requestLoadRows: undefined;
    requestLoadCount: undefined;
    searchValue: string;
    searchParamName: string;
    nodeAssociated: boolean;
    expandColumnKey: undefined;
    expandDefaultAll: boolean;
    expandLazyLoad: boolean;
    expandParentKey: string;
}, never>>, never>>;
export default _default;
import PropTypes from "prop-types";
