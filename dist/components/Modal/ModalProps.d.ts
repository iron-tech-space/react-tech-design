import { StoreProps } from "../core/wrappers";
import { ButtonProps, ModalProps as AntModalProps } from "antd";
import { Request } from "../core/interfaces";
import { FormProps } from "../Form/FormProps";
export interface ModalSubscribeOnChangeOptions {
    /** Значение лежащие в Store по пути subscribe[i].path */
    value: any;
    /** Значение доп данных в Store по пути subscribe[i].extraData */
    extraData: any;
    /** Функция задание данных модалки */
    setModalData: (params: any) => void;
    /** Функция задания Props для кнопки модалки */
    setButtonProps: (params: any) => void;
    /** Функция открытия модалки */
    openModal: () => void;
    /** Функция закрытия модалки */
    closeModal: () => void;
}
export interface ModalProps extends Omit<StoreProps, 'subscribe'> {
    /** Свойства [Button](https://ant.design/components/button/) из Ant Design
     *
     * Добавлено свойство `label` с типом `ReactNode` или `string` для формирования контента кнопки*/
    buttonProps?: ButtonProps;
    /** Объект модального окна. Стандартная конфигурация. */
    modalConfig?: {
        /** Тип модального окна */
        type?: 'save' | 'select' | 'view';
        /** Запрос для автоматического сохранения формы */
        requestSaveForm?: Request;
        /** HTTP Метод, передаваемый в запрос сохранения */
        methodSaveForm?: string;
        /** Пропсы формы.
         * Если верстка через конфиги, то пропс body обязателен */
        form?: FormProps;
    };
    /** Данные для модального окна */
    modalData?: AntModalProps;
    /** Объект для подписки на изменения в STORE.
     * Параметры в `onChange`:
     * * `value`: значение за которым ведется наблюдение,
     * * `extraData`: дополнительные данные, передаваемые при срабатывании события
     * * `setModalData`: функция задания объекта формы
     * * `setButtonProps`: функция задания пропсов кнопке
     * * `openModal`: функция открытия модального окна
     * * `closeModal`: функция закрытия модального окна */
    subscribe?: {
        /** Имя параметра в props с которым связать значение Store */
        name: string;
        /** Путь до объекта в Store */
        path: string;
        /** Путь к дополнительным данным которые будут переданы в onChange */
        extraData?: string;
        /** Выполнить подписку при монтировании компонента
         * По умолчанию false */
        withMount?: boolean;
        /** Вызывается при изменение объекта по указанному path */
        onChange: (params: ModalSubscribeOnChangeOptions) => void;
    }[];
}
