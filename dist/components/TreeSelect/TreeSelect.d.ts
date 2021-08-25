export default TreeSelect;
/** Компонент выбора элемента(ов) из древовидного списка */
declare function TreeSelect(props: any): JSX.Element;
declare namespace TreeSelect {
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
        const filter: PropTypes.Requireable<object>;
        const searchValue: PropTypes.Requireable<string>;
        const searchParamName: PropTypes.Requireable<string>;
        const requestLoadRows: PropTypes.Requireable<(...args: any[]) => any>;
        const optionConverter: PropTypes.Validator<(...args: any[]) => any>;
        const options: PropTypes.Requireable<(object | null | undefined)[]>;
    }
    namespace defaultProps {
        const defaultSortBy_1: undefined;
        export { defaultSortBy_1 as defaultSortBy };
        const defaultFilter_1: {};
        export { defaultFilter_1 as defaultFilter };
        const defaultSearchValue_1: undefined;
        export { defaultSearchValue_1 as defaultSearchValue };
        const requestLoadRows_1: undefined;
        export { requestLoadRows_1 as requestLoadRows };
        const searchParamName_1: string;
        export { searchParamName_1 as searchParamName };
        export function optionConverter_1(option: any): {
            label: any;
            value: any;
            children: any;
        };
        export { optionConverter_1 as optionConverter };
    }
}
import PropTypes from "prop-types";
