export default HeaderCell;
declare function HeaderCell(props: any): JSX.Element;
declare namespace HeaderCell {
    namespace propTypes {
        const onResize: PropTypes.Requireable<(...args: any[]) => any>;
        const width: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        const resizable: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from "prop-types";
