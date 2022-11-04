export default Select;
/** Компонент выбора элемента(ов) из списка */
declare function Select(props: any): JSX.Element;
declare namespace Select {
    namespace propTypes {
        const defaultSortBy: PropTypes.Requireable<PropTypes.InferProps<{
            /** Ключ поля для сортировки */
            key: PropTypes.Requireable<string>;
            /** Направление сортировки */
            order: PropTypes.Requireable<string>;
        }>>;
        const defaultFilter: PropTypes.Requireable<object>;
        const defaultSearchValue: PropTypes.Requireable<string>;
        const sortBy: PropTypes.Requireable<object>;
        const mode: PropTypes.Requireable<string>;
        const filter: PropTypes.Requireable<object>;
        const searchValue: PropTypes.Requireable<string>;
        const searchParamName: PropTypes.Requireable<string>;
        const lostParamName: PropTypes.Requireable<string>;
        const infinityMode: PropTypes.Requireable<boolean>;
        const requestLoadRows: PropTypes.Requireable<(...args: any[]) => any>;
        const optionConverter: PropTypes.Requireable<(...args: any[]) => any>;
        const options: PropTypes.Requireable<(object | null | undefined)[]>;
        const widthControl: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        const pageSize: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        const defaultSortBy_1: undefined;
        export { defaultSortBy_1 as defaultSortBy };
        const defaultFilter_1: {};
        export { defaultFilter_1 as defaultFilter };
        const defaultSearchValue_1: undefined;
        export { defaultSearchValue_1 as defaultSearchValue };
        const infinityMode_1: boolean;
        export { infinityMode_1 as infinityMode };
        const requestLoadRows_1: undefined;
        export { requestLoadRows_1 as requestLoadRows };
        const options_1: never[];
        export { options_1 as options };
        const widthControl_1: string;
        export { widthControl_1 as widthControl };
        const pageSize_1: number;
        export { pageSize_1 as pageSize };
        const searchParamName_1: string;
        export { searchParamName_1 as searchParamName };
        const lostParamName_1: string;
        export { lostParamName_1 as lostParamName };
        export function optionConverter_1(option: any): {
            label: any;
            value: any;
        };
        export { optionConverter_1 as optionConverter };
    }
}
import PropTypes from "prop-types";
