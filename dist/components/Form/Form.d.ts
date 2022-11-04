export function FormHeader(props: any): JSX.Element;
export function FormBody(props: any): JSX.Element;
export function FormFooter(props: any): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<{
    (props: any): JSX.Element;
    propTypes: {
        /** Не делать отступы у формы от краев блока. **Only config Form** */
        noPadding: PropTypes.Requireable<boolean>;
        /** Разрешит скролл внтри формы. **Only config Form** */
        scrollable: PropTypes.Requireable<boolean>;
        /** Массив объектов для шапки формы. Как правило только заголовок. */
        header: PropTypes.Requireable<(object | null | undefined)[]>;
        /** Массив объектов для тела формы */
        body: PropTypes.Requireable<(object | null | undefined)[]>;
        /** Массив объектов для подвала формы. Как правило только кнопки "Сохранить" и "Отмена" */
        footer: PropTypes.Requireable<(object | null | undefined)[]>;
        /** Ссылка на функцию загрузки значений по умолчанию
         * `(callBack) => callBack(initObject)` */
        loadInitData: PropTypes.Requireable<(...args: any[]) => any>;
        /** Запрос для автоматического сохранения формы */
        requestSaveForm: PropTypes.Requireable<(...args: any[]) => any>;
        /** HTTP Метод, передаваемый в запрос сохранения */
        methodSaveForm: PropTypes.Requireable<string>;
        /** Функция обработки перед сохранением формы */
        processBeforeSaveForm: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        noPadding: boolean;
        scrollable: boolean;
        loadInitData: () => void;
        methodSaveForm: string;
    };
}, import("react-redux").Omit<Pick<PropTypes.InferProps<{
    /** Не делать отступы у формы от краев блока. **Only config Form** */
    noPadding: PropTypes.Requireable<boolean>;
    /** Разрешит скролл внтри формы. **Only config Form** */
    scrollable: PropTypes.Requireable<boolean>;
    /** Массив объектов для шапки формы. Как правило только заголовок. */
    header: PropTypes.Requireable<(object | null | undefined)[]>;
    /** Массив объектов для тела формы */
    body: PropTypes.Requireable<(object | null | undefined)[]>;
    /** Массив объектов для подвала формы. Как правило только кнопки "Сохранить" и "Отмена" */
    footer: PropTypes.Requireable<(object | null | undefined)[]>;
    /** Ссылка на функцию загрузки значений по умолчанию
     * `(callBack) => callBack(initObject)` */
    loadInitData: PropTypes.Requireable<(...args: any[]) => any>;
    /** Запрос для автоматического сохранения формы */
    requestSaveForm: PropTypes.Requireable<(...args: any[]) => any>;
    /** HTTP Метод, передаваемый в запрос сохранения */
    methodSaveForm: PropTypes.Requireable<string>;
    /** Функция обработки перед сохранением формы */
    processBeforeSaveForm: PropTypes.Requireable<(...args: any[]) => any>;
}>, "body" | "footer" | "header" | "requestSaveForm" | "processBeforeSaveForm"> & Partial<Pick<PropTypes.InferProps<{
    /** Не делать отступы у формы от краев блока. **Only config Form** */
    noPadding: PropTypes.Requireable<boolean>;
    /** Разрешит скролл внтри формы. **Only config Form** */
    scrollable: PropTypes.Requireable<boolean>;
    /** Массив объектов для шапки формы. Как правило только заголовок. */
    header: PropTypes.Requireable<(object | null | undefined)[]>;
    /** Массив объектов для тела формы */
    body: PropTypes.Requireable<(object | null | undefined)[]>;
    /** Массив объектов для подвала формы. Как правило только кнопки "Сохранить" и "Отмена" */
    footer: PropTypes.Requireable<(object | null | undefined)[]>;
    /** Ссылка на функцию загрузки значений по умолчанию
     * `(callBack) => callBack(initObject)` */
    loadInitData: PropTypes.Requireable<(...args: any[]) => any>;
    /** Запрос для автоматического сохранения формы */
    requestSaveForm: PropTypes.Requireable<(...args: any[]) => any>;
    /** HTTP Метод, передаваемый в запрос сохранения */
    methodSaveForm: PropTypes.Requireable<string>;
    /** Функция обработки перед сохранением формы */
    processBeforeSaveForm: PropTypes.Requireable<(...args: any[]) => any>;
}>, "noPadding" | "scrollable" | "loadInitData" | "methodSaveForm">> & Partial<Pick<{
    noPadding: boolean;
    scrollable: boolean;
    loadInitData: () => void;
    methodSaveForm: string;
}, never>>, never>>;
export default _default;
import PropTypes from "prop-types";
