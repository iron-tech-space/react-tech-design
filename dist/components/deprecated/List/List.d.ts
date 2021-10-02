export default List;
/**
 * ### Список / Дерево.
 */
declare function List(props: any): JSX.Element;
declare namespace List {
    namespace propTypes {
        const rowKey: PropTypes.Requireable<string>;
        const rowRender: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        const title: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const rowKey_1: string;
        export { rowKey_1 as rowKey };
        const rowRender_1: string;
        export { rowRender_1 as rowRender };
        const title_1: undefined;
        export { title_1 as title };
    }
}
import PropTypes from "prop-types";
