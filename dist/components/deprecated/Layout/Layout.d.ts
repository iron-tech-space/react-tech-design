export default Layout;
declare function Layout(props: any): JSX.Element;
declare namespace Layout {
    namespace propTypes {
        const className: PropTypes.Requireable<string>;
        const style: PropTypes.Requireable<object>;
    }
}
import PropTypes from "prop-types";
