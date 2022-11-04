declare const _default: import("react-redux").ConnectedComponent<{
    (props: any): JSX.Element;
    propTypes: {
        /**
         * REQUIRED
         * */
        /** Столбцы таблицы */
        columns: PropTypes.Validator<(object | null | undefined)[]>;
        /** Режим загрузки данных по скроллу */
        infinityMode: PropTypes.Requireable<boolean>;
        /**
         * ПРОПСЫ ЗАДАНИЯ ЗНАЧЕНИЙ ПО УМОЛЧАНИЮ
         * */
        /** Строки по умолчанию */
        defaultRows: PropTypes.Requireable<(object | null | undefined)[]>;
        /** Ключи выделенных по умолчанию строк */
        defaultSelectedRowKeys: PropTypes.Requireable<(NonNullable<string | number | null | undefined> | null | undefined)[]>;
        /** Значение строки поиска по умолчанию строк */
        defaultSearchValue: PropTypes.Requireable<string>;
        /** Объект фильтрации по умолчанию */
        defaultFilter: PropTypes.Requireable<object>;
        /** Сортировка по умолчанию */
        defaultSortBy: PropTypes.Requireable<PropTypes.InferProps<{
            /** Ключ поля для сортировки */
            key: PropTypes.Requireable<string>;
            /** Направление сортировки */
            order: PropTypes.Requireable<string>;
        }>>;
        /**
         * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
         * */
        /** Строки таблицы. Используется для контроля таблицы из вне. */
        rows: PropTypes.Requireable<(object | null | undefined)[]>;
        /** Функция задания строк таблицы. */
        setRows: PropTypes.Requireable<(...args: any[]) => any>;
        /** Выделенные строки таблицы. */
        selectedRowKeys: PropTypes.Requireable<(NonNullable<string | number | null | undefined> | null | undefined)[]>;
        /** Значение строки поиска */
        searchValue: PropTypes.Requireable<string>;
        /** Объект фильтрации */
        filter: PropTypes.Requireable<object>;
        /** Объект сортировки */
        sortBy: PropTypes.Requireable<PropTypes.InferProps<{
            /** Ключ поля для сортировки */
            key: PropTypes.Requireable<string>;
            /** Направление сортировки */
            order: PropTypes.Requireable<string>;
        }>>;
        /**
         * BASE PROPS
         * */
        /** Поле для уникальной идентификации строки */
        rowKey: PropTypes.Requireable<string>;
        /** Дополнительные поля и валидация в объекты таблицы
         * Данный параметр (props) осуществляет дополнительную обработку объекта таблицы после закрытия модалки, но перед добавлением в таблицу.
         * Можно как изменить существующие поля объекта, так и добавить новые поля объекта.
         * `customFields` - массив объектов для дополнения или изменения полей объектов таблицы
         * ```json
         * [
         *  {
         * 		name: <String>,
         * 		value: <func>,
         * 		validate: <func>
         * 	}
         * ]
         * ```
         * `name` – Имя параметра в объекте
         * `value` – Функция формирования значения - `(row, rows) => { return {} }`
         * `validate` – Функция проверки значения - `(row, rows) => { return <Bool> }`
         * Параметра **validate** работает **только** для модельного окна тип `select`.
         * Validate можно наложить на любое кол-во полей объекта и если хотя бы один `validate` === `false`, то исключает строку из добавления.
         */
        customFields: PropTypes.Requireable<(object | null | undefined)[]>;
        /**
         * Данный параметр (props) позволяет добавить или переопределить пропсы для колонок, которые заданы конфигурацией на сервере
         * `customColumnProps` - массив объектов `props` к `columns`. Один объект описывает доп. параметры для одной колонки
         * ```json
         * [
         *  {
         * 		name: <String>,
         * 		cellRenderer: <func>,
         * 		...advancedColProps
         * 	}
         * ]
         * ```
         * `name` – key колонки к которой надо применить дополнительные пропсы
         * `cellRenderer` – `({ cellData, columns, column, columnIndex, rowData, rowIndex, container, isScrolling }) => return <ReactNode>`
         * `advancedColProps` – подолнительные свойства колонок тут -> [Column](https://autodesk.github.io/react-base-table/api/column)
         */
        customColumnProps: PropTypes.Requireable<(object | null | undefined)[]>;
        /**
         * VIEW PROPS
         * */
        /** Вывод когда нет данных */
        empty: PropTypes.Requireable<PropTypes.ReactElementLike>;
        /** Отображение загрузки данных */
        overlay: PropTypes.Requireable<PropTypes.ReactElementLike>;
        /** Фиксированная ширина столбцов. Появится боковой скрол */
        fixWidthColumn: PropTypes.Requireable<boolean>;
        footerProps: PropTypes.Requireable<PropTypes.InferProps<{
            /** Высота подвала */
            height: PropTypes.Requireable<number>;
            /** Массив элементов футтера, которые надо отобразить
             * ['selected', 'loaded', 'total'] */
            showElements: PropTypes.Requireable<(string | null | undefined)[]>;
            /** Заколовок для кол-ва выбранных объектов */
            selectedTitle: PropTypes.Requireable<string>;
            /** Заколовок для кол-ва загруженны объектов */
            loadedTitle: PropTypes.Requireable<string>;
            /** Заколовок для кол-ва всего объектов */
            totalTitle: PropTypes.Requireable<string>;
            /** Левый кастомный элемент командной панели */
            leftCustomSideElement: PropTypes.Requireable<NonNullable<(object | null | undefined)[] | ((...args: any[]) => any) | null | undefined>>;
            /** Центральный кастомный элемент командной панели */
            centerCustomSideElement: PropTypes.Requireable<NonNullable<(object | null | undefined)[] | ((...args: any[]) => any) | null | undefined>>;
            /** Правый кастомный элемент командной панели */
            rightCustomSideElement: PropTypes.Requireable<NonNullable<(object | null | undefined)[] | ((...args: any[]) => any) | null | undefined>>;
        }>>;
        /** Высота заголовка таблицы */
        headerHeight: PropTypes.Requireable<number>;
        /** Высота строки таблицы */
        rowHeight: PropTypes.Requireable<number>;
        /** Custom row renderer
         * Параметры - `({ isScrolling, cells, columns, rowData, rowIndex, depth })` */
        rowRenderer: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | PropTypes.ReactElementLike | null | undefined>>;
        /** Строки будут в зебро-стиле */
        zebraStyle: PropTypes.Requireable<boolean>;
        /** Высота расширения */
        estimatedRowHeight: PropTypes.Requireable<number>;
        /** Отображать ли разделители ячеек в строке */
        cellBordered: PropTypes.Requireable<boolean>;
        /** Отобрадать ли разделители строк */
        rowBordered: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        /**
         * LOAD DATA PROPS
         * */
        /** Порог в пикселях для вызова _onLoad.
         * Кол-во пикселей от низа таблицы для срабатывания события загрузки (onEndReached) */
        loadThreshold: PropTypes.Requireable<number>;
        /** Размер страницы */
        pageSize: PropTypes.Requireable<number>;
        /** Функция запроса для конфигурации */
        requestLoadConfig: PropTypes.Requireable<(...args: any[]) => any>;
        /** Функция запроса для загрузки строк (данных) */
        requestLoadRows: PropTypes.Requireable<(...args: any[]) => any>;
        /** Функция запроса для загрузки строк (данных) */
        requestLoadCount: PropTypes.Requireable<(...args: any[]) => any>;
        /** Имя параметра для поиска */
        searchParamName: PropTypes.Requireable<string>;
        /**
         * SELECTABLE PROPS
         * */
        /** Таблица с возможностью выбора строки */
        selectable: PropTypes.Requireable<boolean>;
        /**
         * TREE PROPS
         * */
        /** Родительский узел и дочерние узлы связаны (Работает только при `selectable`) */
        nodeAssociated: PropTypes.Requireable<boolean>;
        /** Ключ колонки по которой строить иерархию */
        expandColumnKey: PropTypes.Requireable<string>;
        /** Открыть по умолчанию вложенность до уровня N или 'All' */
        expandDefaultAll: PropTypes.Requireable<boolean>;
        /** Загружать ноды иерархии по одной */
        expandLazyLoad: PropTypes.Requireable<boolean>;
        /** Поле в котором хранится ссылка на родителя */
        expandParentKey: PropTypes.Requireable<string>;
        /**
         * EVENTS
         * */
        /** Событие при клике на строку (только при `selectable` = `false`)
         * `({selected, rowData, rowIndex}) => {}` */
        onRowClick: PropTypes.Requireable<(...args: any[]) => any>;
        /** Событие при двойном клике на строку.
         * `({rowData, rowIndex, rowKey}) => {}` */
        onRowDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
        /** События при открытии / закрытии ноды
         * `({ expanded, rowData, rowIndex, rowKey }) => {}` */
        onRowExpand: PropTypes.Requireable<(...args: any[]) => any>;
        /** Событие при выборе строки.
         * `([rowKeys], [rowDatas]) => {}` */
        onSelectedRowsChange: PropTypes.Requireable<(...args: any[]) => any>;
        /** События при открытии / закрытии ноды
         * `(expandedRowKeys) => {}` - массив ключей открытых нод */
        onExpandedRowsChange: PropTypes.Requireable<(...args: any[]) => any>;
        /** SELECTED PANEL */
        /** Отображать ли панель выбранных элементов */
        showSelection: PropTypes.Requireable<boolean>;
        /** Строка или функция для отображения элементов списка выбранных
         * Строка - имя поля
         * Функция - рендер строк.
         * `({ rowData, rowIndex }) => { return <Component> }` */
        rowRenderShowSelection: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
        /** Путь в сторе куда класть выбранную строку таблицы */
        dispatchPath: PropTypes.Requireable<string>;
        /** Объект для подписки на изменения в STORE */
        subscribe: PropTypes.Requireable<(object | null | undefined)[]>;
    };
    defaultProps: {
        size: string;
        bordered: boolean;
        infinityMode: boolean;
        editMode: boolean;
        defaultRows: never[];
        defaultSelectedRowKeys: never[];
        defaultSearchValue: string;
        defaultFilter: {};
        defaultSortBy: {};
        rows: never[];
        setRows: () => void;
        selectedRowKeys: never[];
        searchValue: string;
        filter: {};
        sortBy: {};
        rowKey: string;
        empty: JSX.Element;
        overlay: JSX.Element;
        fixWidthColumn: boolean;
        footerProps: {
            height: number;
            showElements: never[];
            selectedTitle: string;
            loadedTitle: string;
            totalTitle: string;
            leftCustomSideElement: null;
            centerCustomSideElement: null;
            rightCustomSideElement: null;
        };
        headerHeight: number;
        rowHeight: number;
        zebraStyle: boolean;
        estimatedRowHeight: undefined;
        cellBordered: boolean;
        rowBordered: boolean;
        className: string;
        style: {};
        loadThreshold: number;
        pageSize: number;
        requestLoadRows: undefined;
        requestLoadCount: () => void;
        searchParamName: string;
        selectable: boolean;
        nodeAssociated: boolean;
        expandColumnKey: undefined;
        expandDefaultAll: boolean;
        expandLazyLoad: boolean;
        expandParentKey: string;
        onRowClick: () => void;
        onRowDoubleClick: () => void;
        onRowExpand: () => void;
        onSelectedRowsChange: () => void;
        onExpandedRowsChange: () => void;
        showSelection: boolean;
        dispatchPath: undefined;
        subscribe: never[];
    };
}, import("react-redux").Omit<Pick<PropTypes.InferProps<{
    /**
     * REQUIRED
     * */
    /** Столбцы таблицы */
    columns: PropTypes.Validator<(object | null | undefined)[]>;
    /** Режим загрузки данных по скроллу */
    infinityMode: PropTypes.Requireable<boolean>;
    /**
     * ПРОПСЫ ЗАДАНИЯ ЗНАЧЕНИЙ ПО УМОЛЧАНИЮ
     * */
    /** Строки по умолчанию */
    defaultRows: PropTypes.Requireable<(object | null | undefined)[]>;
    /** Ключи выделенных по умолчанию строк */
    defaultSelectedRowKeys: PropTypes.Requireable<(NonNullable<string | number | null | undefined> | null | undefined)[]>;
    /** Значение строки поиска по умолчанию строк */
    defaultSearchValue: PropTypes.Requireable<string>;
    /** Объект фильтрации по умолчанию */
    defaultFilter: PropTypes.Requireable<object>;
    /** Сортировка по умолчанию */
    defaultSortBy: PropTypes.Requireable<PropTypes.InferProps<{
        /** Ключ поля для сортировки */
        key: PropTypes.Requireable<string>;
        /** Направление сортировки */
        order: PropTypes.Requireable<string>;
    }>>;
    /**
     * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
     * */
    /** Строки таблицы. Используется для контроля таблицы из вне. */
    rows: PropTypes.Requireable<(object | null | undefined)[]>;
    /** Функция задания строк таблицы. */
    setRows: PropTypes.Requireable<(...args: any[]) => any>;
    /** Выделенные строки таблицы. */
    selectedRowKeys: PropTypes.Requireable<(NonNullable<string | number | null | undefined> | null | undefined)[]>;
    /** Значение строки поиска */
    searchValue: PropTypes.Requireable<string>;
    /** Объект фильтрации */
    filter: PropTypes.Requireable<object>;
    /** Объект сортировки */
    sortBy: PropTypes.Requireable<PropTypes.InferProps<{
        /** Ключ поля для сортировки */
        key: PropTypes.Requireable<string>;
        /** Направление сортировки */
        order: PropTypes.Requireable<string>;
    }>>;
    /**
     * BASE PROPS
     * */
    /** Поле для уникальной идентификации строки */
    rowKey: PropTypes.Requireable<string>;
    /** Дополнительные поля и валидация в объекты таблицы
     * Данный параметр (props) осуществляет дополнительную обработку объекта таблицы после закрытия модалки, но перед добавлением в таблицу.
     * Можно как изменить существующие поля объекта, так и добавить новые поля объекта.
     * `customFields` - массив объектов для дополнения или изменения полей объектов таблицы
     * ```json
     * [
     *  {
     * 		name: <String>,
     * 		value: <func>,
     * 		validate: <func>
     * 	}
     * ]
     * ```
     * `name` – Имя параметра в объекте
     * `value` – Функция формирования значения - `(row, rows) => { return {} }`
     * `validate` – Функция проверки значения - `(row, rows) => { return <Bool> }`
     * Параметра **validate** работает **только** для модельного окна тип `select`.
     * Validate можно наложить на любое кол-во полей объекта и если хотя бы один `validate` === `false`, то исключает строку из добавления.
     */
    customFields: PropTypes.Requireable<(object | null | undefined)[]>;
    /**
     * Данный параметр (props) позволяет добавить или переопределить пропсы для колонок, которые заданы конфигурацией на сервере
     * `customColumnProps` - массив объектов `props` к `columns`. Один объект описывает доп. параметры для одной колонки
     * ```json
     * [
     *  {
     * 		name: <String>,
     * 		cellRenderer: <func>,
     * 		...advancedColProps
     * 	}
     * ]
     * ```
     * `name` – key колонки к которой надо применить дополнительные пропсы
     * `cellRenderer` – `({ cellData, columns, column, columnIndex, rowData, rowIndex, container, isScrolling }) => return <ReactNode>`
     * `advancedColProps` – подолнительные свойства колонок тут -> [Column](https://autodesk.github.io/react-base-table/api/column)
     */
    customColumnProps: PropTypes.Requireable<(object | null | undefined)[]>;
    /**
     * VIEW PROPS
     * */
    /** Вывод когда нет данных */
    empty: PropTypes.Requireable<PropTypes.ReactElementLike>;
    /** Отображение загрузки данных */
    overlay: PropTypes.Requireable<PropTypes.ReactElementLike>;
    /** Фиксированная ширина столбцов. Появится боковой скрол */
    fixWidthColumn: PropTypes.Requireable<boolean>;
    footerProps: PropTypes.Requireable<PropTypes.InferProps<{
        /** Высота подвала */
        height: PropTypes.Requireable<number>;
        /** Массив элементов футтера, которые надо отобразить
         * ['selected', 'loaded', 'total'] */
        showElements: PropTypes.Requireable<(string | null | undefined)[]>;
        /** Заколовок для кол-ва выбранных объектов */
        selectedTitle: PropTypes.Requireable<string>;
        /** Заколовок для кол-ва загруженны объектов */
        loadedTitle: PropTypes.Requireable<string>;
        /** Заколовок для кол-ва всего объектов */
        totalTitle: PropTypes.Requireable<string>;
        /** Левый кастомный элемент командной панели */
        leftCustomSideElement: PropTypes.Requireable<NonNullable<(object | null | undefined)[] | ((...args: any[]) => any) | null | undefined>>;
        /** Центральный кастомный элемент командной панели */
        centerCustomSideElement: PropTypes.Requireable<NonNullable<(object | null | undefined)[] | ((...args: any[]) => any) | null | undefined>>;
        /** Правый кастомный элемент командной панели */
        rightCustomSideElement: PropTypes.Requireable<NonNullable<(object | null | undefined)[] | ((...args: any[]) => any) | null | undefined>>;
    }>>;
    /** Высота заголовка таблицы */
    headerHeight: PropTypes.Requireable<number>;
    /** Высота строки таблицы */
    rowHeight: PropTypes.Requireable<number>;
    /** Custom row renderer
     * Параметры - `({ isScrolling, cells, columns, rowData, rowIndex, depth })` */
    rowRenderer: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | PropTypes.ReactElementLike | null | undefined>>;
    /** Строки будут в зебро-стиле */
    zebraStyle: PropTypes.Requireable<boolean>;
    /** Высота расширения */
    estimatedRowHeight: PropTypes.Requireable<number>;
    /** Отображать ли разделители ячеек в строке */
    cellBordered: PropTypes.Requireable<boolean>;
    /** Отобрадать ли разделители строк */
    rowBordered: PropTypes.Requireable<boolean>;
    className: PropTypes.Requireable<string>;
    style: PropTypes.Requireable<object>;
    /**
     * LOAD DATA PROPS
     * */
    /** Порог в пикселях для вызова _onLoad.
     * Кол-во пикселей от низа таблицы для срабатывания события загрузки (onEndReached) */
    loadThreshold: PropTypes.Requireable<number>;
    /** Размер страницы */
    pageSize: PropTypes.Requireable<number>;
    /** Функция запроса для конфигурации */
    requestLoadConfig: PropTypes.Requireable<(...args: any[]) => any>;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows: PropTypes.Requireable<(...args: any[]) => any>;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadCount: PropTypes.Requireable<(...args: any[]) => any>;
    /** Имя параметра для поиска */
    searchParamName: PropTypes.Requireable<string>;
    /**
     * SELECTABLE PROPS
     * */
    /** Таблица с возможностью выбора строки */
    selectable: PropTypes.Requireable<boolean>;
    /**
     * TREE PROPS
     * */
    /** Родительский узел и дочерние узлы связаны (Работает только при `selectable`) */
    nodeAssociated: PropTypes.Requireable<boolean>;
    /** Ключ колонки по которой строить иерархию */
    expandColumnKey: PropTypes.Requireable<string>;
    /** Открыть по умолчанию вложенность до уровня N или 'All' */
    expandDefaultAll: PropTypes.Requireable<boolean>;
    /** Загружать ноды иерархии по одной */
    expandLazyLoad: PropTypes.Requireable<boolean>;
    /** Поле в котором хранится ссылка на родителя */
    expandParentKey: PropTypes.Requireable<string>;
    /**
     * EVENTS
     * */
    /** Событие при клике на строку (только при `selectable` = `false`)
     * `({selected, rowData, rowIndex}) => {}` */
    onRowClick: PropTypes.Requireable<(...args: any[]) => any>;
    /** Событие при двойном клике на строку.
     * `({rowData, rowIndex, rowKey}) => {}` */
    onRowDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
    /** События при открытии / закрытии ноды
     * `({ expanded, rowData, rowIndex, rowKey }) => {}` */
    onRowExpand: PropTypes.Requireable<(...args: any[]) => any>;
    /** Событие при выборе строки.
     * `([rowKeys], [rowDatas]) => {}` */
    onSelectedRowsChange: PropTypes.Requireable<(...args: any[]) => any>;
    /** События при открытии / закрытии ноды
     * `(expandedRowKeys) => {}` - массив ключей открытых нод */
    onExpandedRowsChange: PropTypes.Requireable<(...args: any[]) => any>;
    /** SELECTED PANEL */
    /** Отображать ли панель выбранных элементов */
    showSelection: PropTypes.Requireable<boolean>;
    /** Строка или функция для отображения элементов списка выбранных
     * Строка - имя поля
     * Функция - рендер строк.
     * `({ rowData, rowIndex }) => { return <Component> }` */
    rowRenderShowSelection: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
    /** Путь в сторе куда класть выбранную строку таблицы */
    dispatchPath: PropTypes.Requireable<string>;
    /** Объект для подписки на изменения в STORE */
    subscribe: PropTypes.Requireable<(object | null | undefined)[]>;
}>, "requestLoadConfig" | "customColumnProps" | "columns" | "customFields" | "rowRenderer" | "rowRenderShowSelection"> & Partial<Pick<PropTypes.InferProps<{
    /**
     * REQUIRED
     * */
    /** Столбцы таблицы */
    columns: PropTypes.Validator<(object | null | undefined)[]>;
    /** Режим загрузки данных по скроллу */
    infinityMode: PropTypes.Requireable<boolean>;
    /**
     * ПРОПСЫ ЗАДАНИЯ ЗНАЧЕНИЙ ПО УМОЛЧАНИЮ
     * */
    /** Строки по умолчанию */
    defaultRows: PropTypes.Requireable<(object | null | undefined)[]>;
    /** Ключи выделенных по умолчанию строк */
    defaultSelectedRowKeys: PropTypes.Requireable<(NonNullable<string | number | null | undefined> | null | undefined)[]>;
    /** Значение строки поиска по умолчанию строк */
    defaultSearchValue: PropTypes.Requireable<string>;
    /** Объект фильтрации по умолчанию */
    defaultFilter: PropTypes.Requireable<object>;
    /** Сортировка по умолчанию */
    defaultSortBy: PropTypes.Requireable<PropTypes.InferProps<{
        /** Ключ поля для сортировки */
        key: PropTypes.Requireable<string>;
        /** Направление сортировки */
        order: PropTypes.Requireable<string>;
    }>>;
    /**
     * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
     * */
    /** Строки таблицы. Используется для контроля таблицы из вне. */
    rows: PropTypes.Requireable<(object | null | undefined)[]>;
    /** Функция задания строк таблицы. */
    setRows: PropTypes.Requireable<(...args: any[]) => any>;
    /** Выделенные строки таблицы. */
    selectedRowKeys: PropTypes.Requireable<(NonNullable<string | number | null | undefined> | null | undefined)[]>;
    /** Значение строки поиска */
    searchValue: PropTypes.Requireable<string>;
    /** Объект фильтрации */
    filter: PropTypes.Requireable<object>;
    /** Объект сортировки */
    sortBy: PropTypes.Requireable<PropTypes.InferProps<{
        /** Ключ поля для сортировки */
        key: PropTypes.Requireable<string>;
        /** Направление сортировки */
        order: PropTypes.Requireable<string>;
    }>>;
    /**
     * BASE PROPS
     * */
    /** Поле для уникальной идентификации строки */
    rowKey: PropTypes.Requireable<string>;
    /** Дополнительные поля и валидация в объекты таблицы
     * Данный параметр (props) осуществляет дополнительную обработку объекта таблицы после закрытия модалки, но перед добавлением в таблицу.
     * Можно как изменить существующие поля объекта, так и добавить новые поля объекта.
     * `customFields` - массив объектов для дополнения или изменения полей объектов таблицы
     * ```json
     * [
     *  {
     * 		name: <String>,
     * 		value: <func>,
     * 		validate: <func>
     * 	}
     * ]
     * ```
     * `name` – Имя параметра в объекте
     * `value` – Функция формирования значения - `(row, rows) => { return {} }`
     * `validate` – Функция проверки значения - `(row, rows) => { return <Bool> }`
     * Параметра **validate** работает **только** для модельного окна тип `select`.
     * Validate можно наложить на любое кол-во полей объекта и если хотя бы один `validate` === `false`, то исключает строку из добавления.
     */
    customFields: PropTypes.Requireable<(object | null | undefined)[]>;
    /**
     * Данный параметр (props) позволяет добавить или переопределить пропсы для колонок, которые заданы конфигурацией на сервере
     * `customColumnProps` - массив объектов `props` к `columns`. Один объект описывает доп. параметры для одной колонки
     * ```json
     * [
     *  {
     * 		name: <String>,
     * 		cellRenderer: <func>,
     * 		...advancedColProps
     * 	}
     * ]
     * ```
     * `name` – key колонки к которой надо применить дополнительные пропсы
     * `cellRenderer` – `({ cellData, columns, column, columnIndex, rowData, rowIndex, container, isScrolling }) => return <ReactNode>`
     * `advancedColProps` – подолнительные свойства колонок тут -> [Column](https://autodesk.github.io/react-base-table/api/column)
     */
    customColumnProps: PropTypes.Requireable<(object | null | undefined)[]>;
    /**
     * VIEW PROPS
     * */
    /** Вывод когда нет данных */
    empty: PropTypes.Requireable<PropTypes.ReactElementLike>;
    /** Отображение загрузки данных */
    overlay: PropTypes.Requireable<PropTypes.ReactElementLike>;
    /** Фиксированная ширина столбцов. Появится боковой скрол */
    fixWidthColumn: PropTypes.Requireable<boolean>;
    footerProps: PropTypes.Requireable<PropTypes.InferProps<{
        /** Высота подвала */
        height: PropTypes.Requireable<number>;
        /** Массив элементов футтера, которые надо отобразить
         * ['selected', 'loaded', 'total'] */
        showElements: PropTypes.Requireable<(string | null | undefined)[]>;
        /** Заколовок для кол-ва выбранных объектов */
        selectedTitle: PropTypes.Requireable<string>;
        /** Заколовок для кол-ва загруженны объектов */
        loadedTitle: PropTypes.Requireable<string>;
        /** Заколовок для кол-ва всего объектов */
        totalTitle: PropTypes.Requireable<string>;
        /** Левый кастомный элемент командной панели */
        leftCustomSideElement: PropTypes.Requireable<NonNullable<(object | null | undefined)[] | ((...args: any[]) => any) | null | undefined>>;
        /** Центральный кастомный элемент командной панели */
        centerCustomSideElement: PropTypes.Requireable<NonNullable<(object | null | undefined)[] | ((...args: any[]) => any) | null | undefined>>;
        /** Правый кастомный элемент командной панели */
        rightCustomSideElement: PropTypes.Requireable<NonNullable<(object | null | undefined)[] | ((...args: any[]) => any) | null | undefined>>;
    }>>;
    /** Высота заголовка таблицы */
    headerHeight: PropTypes.Requireable<number>;
    /** Высота строки таблицы */
    rowHeight: PropTypes.Requireable<number>;
    /** Custom row renderer
     * Параметры - `({ isScrolling, cells, columns, rowData, rowIndex, depth })` */
    rowRenderer: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | PropTypes.ReactElementLike | null | undefined>>;
    /** Строки будут в зебро-стиле */
    zebraStyle: PropTypes.Requireable<boolean>;
    /** Высота расширения */
    estimatedRowHeight: PropTypes.Requireable<number>;
    /** Отображать ли разделители ячеек в строке */
    cellBordered: PropTypes.Requireable<boolean>;
    /** Отобрадать ли разделители строк */
    rowBordered: PropTypes.Requireable<boolean>;
    className: PropTypes.Requireable<string>;
    style: PropTypes.Requireable<object>;
    /**
     * LOAD DATA PROPS
     * */
    /** Порог в пикселях для вызова _onLoad.
     * Кол-во пикселей от низа таблицы для срабатывания события загрузки (onEndReached) */
    loadThreshold: PropTypes.Requireable<number>;
    /** Размер страницы */
    pageSize: PropTypes.Requireable<number>;
    /** Функция запроса для конфигурации */
    requestLoadConfig: PropTypes.Requireable<(...args: any[]) => any>;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows: PropTypes.Requireable<(...args: any[]) => any>;
    /** Функция запроса для загрузки строк (данных) */
    requestLoadCount: PropTypes.Requireable<(...args: any[]) => any>;
    /** Имя параметра для поиска */
    searchParamName: PropTypes.Requireable<string>;
    /**
     * SELECTABLE PROPS
     * */
    /** Таблица с возможностью выбора строки */
    selectable: PropTypes.Requireable<boolean>;
    /**
     * TREE PROPS
     * */
    /** Родительский узел и дочерние узлы связаны (Работает только при `selectable`) */
    nodeAssociated: PropTypes.Requireable<boolean>;
    /** Ключ колонки по которой строить иерархию */
    expandColumnKey: PropTypes.Requireable<string>;
    /** Открыть по умолчанию вложенность до уровня N или 'All' */
    expandDefaultAll: PropTypes.Requireable<boolean>;
    /** Загружать ноды иерархии по одной */
    expandLazyLoad: PropTypes.Requireable<boolean>;
    /** Поле в котором хранится ссылка на родителя */
    expandParentKey: PropTypes.Requireable<string>;
    /**
     * EVENTS
     * */
    /** Событие при клике на строку (только при `selectable` = `false`)
     * `({selected, rowData, rowIndex}) => {}` */
    onRowClick: PropTypes.Requireable<(...args: any[]) => any>;
    /** Событие при двойном клике на строку.
     * `({rowData, rowIndex, rowKey}) => {}` */
    onRowDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
    /** События при открытии / закрытии ноды
     * `({ expanded, rowData, rowIndex, rowKey }) => {}` */
    onRowExpand: PropTypes.Requireable<(...args: any[]) => any>;
    /** Событие при выборе строки.
     * `([rowKeys], [rowDatas]) => {}` */
    onSelectedRowsChange: PropTypes.Requireable<(...args: any[]) => any>;
    /** События при открытии / закрытии ноды
     * `(expandedRowKeys) => {}` - массив ключей открытых нод */
    onExpandedRowsChange: PropTypes.Requireable<(...args: any[]) => any>;
    /** SELECTED PANEL */
    /** Отображать ли панель выбранных элементов */
    showSelection: PropTypes.Requireable<boolean>;
    /** Строка или функция для отображения элементов списка выбранных
     * Строка - имя поля
     * Функция - рендер строк.
     * `({ rowData, rowIndex }) => { return <Component> }` */
    rowRenderShowSelection: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
    /** Путь в сторе куда класть выбранную строку таблицы */
    dispatchPath: PropTypes.Requireable<string>;
    /** Объект для подписки на изменения в STORE */
    subscribe: PropTypes.Requireable<(object | null | undefined)[]>;
}>, "style" | "filter" | "className" | "rowHeight" | "requestLoadRows" | "searchValue" | "rows" | "subscribe" | "overlay" | "defaultSortBy" | "defaultFilter" | "defaultSearchValue" | "sortBy" | "searchParamName" | "infinityMode" | "pageSize" | "rowKey" | "expandColumnKey" | "expandParentKey" | "fixWidthColumn" | "selectable" | "defaultRows" | "defaultSelectedRowKeys" | "setRows" | "selectedRowKeys" | "empty" | "footerProps" | "headerHeight" | "zebraStyle" | "estimatedRowHeight" | "cellBordered" | "rowBordered" | "loadThreshold" | "requestLoadCount" | "nodeAssociated" | "expandDefaultAll" | "expandLazyLoad" | "onRowClick" | "onRowDoubleClick" | "onRowExpand" | "onSelectedRowsChange" | "onExpandedRowsChange" | "showSelection" | "dispatchPath">> & Partial<Pick<{
    size: string;
    bordered: boolean;
    infinityMode: boolean;
    editMode: boolean;
    defaultRows: never[];
    defaultSelectedRowKeys: never[];
    defaultSearchValue: string;
    defaultFilter: {};
    defaultSortBy: {};
    rows: never[];
    setRows: () => void;
    selectedRowKeys: never[];
    searchValue: string;
    filter: {};
    sortBy: {};
    rowKey: string;
    empty: JSX.Element;
    overlay: JSX.Element;
    fixWidthColumn: boolean;
    footerProps: {
        height: number;
        showElements: never[];
        selectedTitle: string;
        loadedTitle: string;
        totalTitle: string;
        leftCustomSideElement: null;
        centerCustomSideElement: null;
        rightCustomSideElement: null;
    };
    headerHeight: number;
    rowHeight: number;
    zebraStyle: boolean;
    estimatedRowHeight: undefined;
    cellBordered: boolean;
    rowBordered: boolean;
    className: string;
    style: {};
    loadThreshold: number;
    pageSize: number;
    requestLoadRows: undefined;
    requestLoadCount: () => void;
    searchParamName: string;
    selectable: boolean;
    nodeAssociated: boolean;
    expandColumnKey: undefined;
    expandDefaultAll: boolean;
    expandLazyLoad: boolean;
    expandParentKey: string;
    onRowClick: () => void;
    onRowDoubleClick: () => void;
    onRowExpand: () => void;
    onSelectedRowsChange: () => void;
    onExpandedRowsChange: () => void;
    showSelection: boolean;
    dispatchPath: undefined;
    subscribe: never[];
}, "size" | "bordered" | "editMode">>, never> & import("../..").StoreProps>;
export default _default;
import PropTypes from "prop-types";
