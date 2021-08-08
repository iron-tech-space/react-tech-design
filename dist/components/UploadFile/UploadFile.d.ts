export default UploadFile;
/** Компонент загрузки файлов */
declare function UploadFile(props: any): JSX.Element;
declare namespace UploadFile {
    export namespace propTypes {
        const requestUploadFile: PropTypes.Validator<(...args: any[]) => any>;
        const dataObject: PropTypes.Requireable<object>;
        const onCompletedUpload: PropTypes.Requireable<(...args: any[]) => any>;
        const onFailedUpload: PropTypes.Requireable<(...args: any[]) => any>;
        const uploadProps: PropTypes.Requireable<object>;
        const toolTipProps: PropTypes.Requireable<object>;
        const buttonProps: PropTypes.Requireable<object>;
    }
    export { defaultProps };
}
import PropTypes from "prop-types";
declare namespace defaultProps {
    export { noop as requestUploadFile };
    const dataObject_1: {};
    export { dataObject_1 as dataObject };
    export { noop as onCompletedUpload };
    export { noop as onFailedUpload };
    const uploadProps_1: {};
    export { uploadProps_1 as uploadProps };
    const toolTipProps_1: {};
    export { toolTipProps_1 as toolTipProps };
    const buttonProps_1: {};
    export { buttonProps_1 as buttonProps };
}
import { noop } from "../utils/baseUtils";
