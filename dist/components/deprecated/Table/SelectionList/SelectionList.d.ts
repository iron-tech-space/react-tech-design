export default SelectionList;
declare function SelectionList(props: any): JSX.Element;
declare namespace SelectionList {
    namespace propTypes {
        const rowRender: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        const selectedRowObjects: PropTypes.Validator<(object | null | undefined)[]>;
        const onClickDropSelect: PropTypes.Validator<(...args: any[]) => any>;
    }
    const defaultProps: {};
}
import PropTypes from "prop-types";
