export default SelectionList;
declare function SelectionList(props: any): JSX.Element;
declare namespace SelectionList {
    namespace propTypes {
        const rowRender: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
        const selectedRowObjects: PropTypes.Validator<(object | null | undefined)[]>;
        const onClickDropSelect: PropTypes.Validator<(...args: any[]) => any>;
    }
    const defaultProps: {};
}
import PropTypes from "prop-types";
