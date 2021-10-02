export default FilterPanel;
declare function FilterPanel(props: any): JSX.Element;
declare namespace FilterPanel {
    namespace propTypes {
        const applyFilterTooltip: PropTypes.Requireable<string>;
        const applyFilterSize: PropTypes.Requireable<string>;
        const applyFilterRender: PropTypes.Requireable<string | ((...args: any[]) => any) | PropTypes.ReactElementLike>;
        const borderStyle: PropTypes.Requireable<string>;
        const defaultFilter: PropTypes.Requireable<object>;
        const configFilter: PropTypes.Requireable<(object | null | undefined)[]>;
        const onApplyFilter: PropTypes.Requireable<(...args: any[]) => any>;
        const onChangeFilter: PropTypes.Requireable<(...args: any[]) => any>;
        const resetFilterTooltip: PropTypes.Requireable<string>;
        const resetFilterSize: PropTypes.Requireable<string>;
        const resetFilterRender: PropTypes.Requireable<string | ((...args: any[]) => any) | PropTypes.ReactElementLike>;
    }
    namespace defaultProps {
        const applyFilterTooltip_1: string;
        export { applyFilterTooltip_1 as applyFilterTooltip };
        const applyFilterSize_1: string;
        export { applyFilterSize_1 as applyFilterSize };
        const applyFilterRender_1: string;
        export { applyFilterRender_1 as applyFilterRender };
        const borderStyle_1: string;
        export { borderStyle_1 as borderStyle };
        const defaultFilter_1: {};
        export { defaultFilter_1 as defaultFilter };
        const configFilter_1: never[];
        export { configFilter_1 as configFilter };
        export { noop as onApplyFilter };
        export { noop as onChangeFilter };
        const resetFilterTooltip_1: string;
        export { resetFilterTooltip_1 as resetFilterTooltip };
        const resetFilterSize_1: string;
        export { resetFilterSize_1 as resetFilterSize };
        const resetFilterRender_1: string;
        export { resetFilterRender_1 as resetFilterRender };
    }
}
import PropTypes from "prop-types";
import { noop } from "../../utils/baseUtils";
