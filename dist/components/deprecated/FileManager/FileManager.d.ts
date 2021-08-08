export default FileManager;
declare function FileManager(props: any): JSX.Element;
declare namespace FileManager {
    namespace propTypes {
        const requestLoadRows: PropTypes.Requireable<(...args: any[]) => any>;
        const requestLoadConfig: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const rowKey: string;
        const isGroupKey: string;
        const expandParentKey: string;
    }
}
import PropTypes from "prop-types";
