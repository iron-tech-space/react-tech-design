export default Form;
declare function Form(props: any): JSX.Element;
declare namespace Form {
    namespace propTypes {
        const noPadding: PropTypes.Requireable<boolean>;
        const scrollable: PropTypes.Requireable<boolean>;
        const header: PropTypes.Requireable<(object | null | undefined)[]>;
        const body: PropTypes.Validator<(object | null | undefined)[]>;
        const footer: PropTypes.Requireable<(object | null | undefined)[]>;
        const loadInitData: PropTypes.Requireable<(...args: any[]) => any>;
        const autoSaveForm: PropTypes.Requireable<boolean>;
        const requestSaveForm: PropTypes.Requireable<(...args: any[]) => any>;
        const methodSaveForm: PropTypes.Requireable<string>;
        const processBeforeSaveForm: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const noPadding_1: boolean;
        export { noPadding_1 as noPadding };
        const scrollable_1: boolean;
        export { scrollable_1 as scrollable };
        export { noop as loadInitData };
        const autoSaveForm_1: boolean;
        export { autoSaveForm_1 as autoSaveForm };
    }
}
import PropTypes from "prop-types";
import { noop } from "../../utils/baseUtils";
