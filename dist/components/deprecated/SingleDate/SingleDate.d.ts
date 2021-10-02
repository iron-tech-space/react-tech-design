export default SingleDate;
declare function SingleDate(props: any): JSX.Element;
declare namespace SingleDate {
    namespace propTypes {
        const dateFormat: PropTypes.Requireable<string>;
        const defaultValue: PropTypes.Requireable<string>;
        const name: PropTypes.Requireable<string>;
        const className: PropTypes.Requireable<string>;
        const onChange: PropTypes.Requireable<(...args: any[]) => any>;
        const title: PropTypes.Requireable<string>;
        const value: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const name_1: string;
        export { name_1 as name };
        const dateFormat_1: string;
        export { dateFormat_1 as dateFormat };
        export { noop as onChange };
        const title_1: string;
        export { title_1 as title };
    }
}
import PropTypes from "prop-types";
import { noop } from "../../utils/baseUtils";
