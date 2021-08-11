export default FormModal;
declare function FormModal(props: any): JSX.Element;
declare namespace FormModal {
    namespace propTypes {
        const modal: PropTypes.Requireable<object>;
        const selectedRow: PropTypes.Requireable<object>;
        const visible: PropTypes.Requireable<boolean>;
        const setVisible: PropTypes.Requireable<(...args: any[]) => any>;
        const saveRow: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
