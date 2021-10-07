export default DateRange;
declare function DateRange(props: any): JSX.Element;
declare namespace DateRange {
    namespace propTypes {
        const dateFormat: PropTypes.Requireable<string>;
        const className: PropTypes.Requireable<string>;
        const nameStart: PropTypes.Requireable<string>;
        const nameEnd: PropTypes.Requireable<string>;
        const onChange: PropTypes.Requireable<(...args: any[]) => any>;
        const size: PropTypes.Requireable<string>;
        const title: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const className_1: string;
        export { className_1 as className };
        const nameStart_1: string;
        export { nameStart_1 as nameStart };
        const nameEnd_1: string;
        export { nameEnd_1 as nameEnd };
        const dateFormat_1: string;
        export { dateFormat_1 as dateFormat };
        export { noop as onChange };
        const size_1: string;
        export { size_1 as size };
    }
}
import PropTypes from "prop-types";
import { noop } from "../../utils/baseUtils";
