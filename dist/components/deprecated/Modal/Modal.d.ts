declare const _default: import("react-redux").ConnectedComponent<{
    (props: any): JSX.Element;
    propTypes: {
        /** Свойства [Button](https://ant.design/components/button/) из Ant Design
         * Добавлено свойство `label` с типом `ReactNode` или `string` для формирования контента кнопки*/
        buttonProps: PropTypes.Requireable<object>;
        /** Объект модального окна. Стандартная конфигурация. */
        modalConfig: PropTypes.Requireable<object>;
        /** Данные для модального окна */
        modalData: PropTypes.Requireable<object>;
        /** Путь в сторе куда класть данных окна после закрытия */
        dispatchPath: PropTypes.Requireable<string>;
        /** Объект для подписки на изменения в STORE */
        subscribe: PropTypes.Requireable<object>;
    };
}, any>;
export default _default;
import PropTypes from "prop-types";
