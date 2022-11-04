declare const _default: import("react-redux").ConnectedComponent<{
    (props: any): JSX.Element;
    propTypes: {
        /** Свойства [Button](https://ant.design/components/button/) из Ant Design
         * Добавлено свойство `label` с типом `ReactNode` или `string` для формирования контента кнопки*/
        buttonProps: PropTypes.Requireable<object>;
        /** Объект модального окна. Стандартная конфигурация. */
        modalConfig: PropTypes.Requireable<PropTypes.InferProps<{
            /** Тип модального окна */
            type: PropTypes.Requireable<string>;
            /** Запрос для автоматического сохранения формы */
            requestSaveForm: PropTypes.Requireable<(...args: any[]) => any>;
            /** HTTP Метод, передаваемый в запрос сохранения */
            methodSaveForm: PropTypes.Requireable<string>;
            /** Пропсы формы.
             * Если верстка через конфиги, то пропс body обязателен */
            form: PropTypes.Requireable<object>;
        }>>;
        /** Данные для модального окна */
        modalData: PropTypes.Requireable<object>;
        /** Путь в сторе куда класть данных окна после закрытия */
        dispatch: PropTypes.Requireable<object>;
        /** Объект для подписки на изменения в STORE.
         * Параметры в `onChange`:
         * * `value`: значение за которым ведется наблюдение,
         * * `extraData`: дополнительные данные, передаваемые при срабатывании события
         * * `setModalData`: функция задания объекта формы
         * * `setButtonProps`: функция задания пропсов кнопке
         * * `openModal`: функция открытия модального окна
         * * `closeModal`: функция закрытия модального окна */
        subscribe: PropTypes.Requireable<(object | null | undefined)[]>;
    };
    defaultProps: {
        subscribe: never[];
        dispatch: {};
        methodSaveForm: string;
    };
}, import("react-redux").Omit<Pick<PropTypes.InferProps<{
    /** Свойства [Button](https://ant.design/components/button/) из Ant Design
     * Добавлено свойство `label` с типом `ReactNode` или `string` для формирования контента кнопки*/
    buttonProps: PropTypes.Requireable<object>;
    /** Объект модального окна. Стандартная конфигурация. */
    modalConfig: PropTypes.Requireable<PropTypes.InferProps<{
        /** Тип модального окна */
        type: PropTypes.Requireable<string>;
        /** Запрос для автоматического сохранения формы */
        requestSaveForm: PropTypes.Requireable<(...args: any[]) => any>;
        /** HTTP Метод, передаваемый в запрос сохранения */
        methodSaveForm: PropTypes.Requireable<string>;
        /** Пропсы формы.
         * Если верстка через конфиги, то пропс body обязателен */
        form: PropTypes.Requireable<object>;
    }>>;
    /** Данные для модального окна */
    modalData: PropTypes.Requireable<object>;
    /** Путь в сторе куда класть данных окна после закрытия */
    dispatch: PropTypes.Requireable<object>;
    /** Объект для подписки на изменения в STORE.
     * Параметры в `onChange`:
     * * `value`: значение за которым ведется наблюдение,
     * * `extraData`: дополнительные данные, передаваемые при срабатывании события
     * * `setModalData`: функция задания объекта формы
     * * `setButtonProps`: функция задания пропсов кнопке
     * * `openModal`: функция открытия модального окна
     * * `closeModal`: функция закрытия модального окна */
    subscribe: PropTypes.Requireable<(object | null | undefined)[]>;
}>, "buttonProps" | "modalConfig" | "modalData"> & Partial<Pick<PropTypes.InferProps<{
    /** Свойства [Button](https://ant.design/components/button/) из Ant Design
     * Добавлено свойство `label` с типом `ReactNode` или `string` для формирования контента кнопки*/
    buttonProps: PropTypes.Requireable<object>;
    /** Объект модального окна. Стандартная конфигурация. */
    modalConfig: PropTypes.Requireable<PropTypes.InferProps<{
        /** Тип модального окна */
        type: PropTypes.Requireable<string>;
        /** Запрос для автоматического сохранения формы */
        requestSaveForm: PropTypes.Requireable<(...args: any[]) => any>;
        /** HTTP Метод, передаваемый в запрос сохранения */
        methodSaveForm: PropTypes.Requireable<string>;
        /** Пропсы формы.
         * Если верстка через конфиги, то пропс body обязателен */
        form: PropTypes.Requireable<object>;
    }>>;
    /** Данные для модального окна */
    modalData: PropTypes.Requireable<object>;
    /** Путь в сторе куда класть данных окна после закрытия */
    dispatch: PropTypes.Requireable<object>;
    /** Объект для подписки на изменения в STORE.
     * Параметры в `onChange`:
     * * `value`: значение за которым ведется наблюдение,
     * * `extraData`: дополнительные данные, передаваемые при срабатывании события
     * * `setModalData`: функция задания объекта формы
     * * `setButtonProps`: функция задания пропсов кнопке
     * * `openModal`: функция открытия модального окна
     * * `closeModal`: функция закрытия модального окна */
    subscribe: PropTypes.Requireable<(object | null | undefined)[]>;
}>, "dispatch" | "subscribe">> & Partial<Pick<{
    subscribe: never[];
    dispatch: {};
    methodSaveForm: string;
}, "methodSaveForm">>, never> & import("..").StoreProps>;
export default _default;
import PropTypes from "prop-types";
