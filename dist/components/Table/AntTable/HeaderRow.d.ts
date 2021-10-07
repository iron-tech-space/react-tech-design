export default HeaderRow;
declare function HeaderRow(props: any): JSX.Element;
declare namespace HeaderRow {
    namespace propTypes {
        const headerHeight: PropTypes.Requireable<string | number>;
        const setHeaderHeight: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
