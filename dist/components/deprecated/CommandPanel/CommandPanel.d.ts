export default CommandPanel;
declare function CommandPanel(props: any): JSX.Element;
declare namespace CommandPanel {
    namespace propTypes {
        const centerCustomSideElement: PropTypes.Requireable<(object | null | undefined)[]>;
        const borderStyle: PropTypes.Requireable<string>;
        const defaultValueSearch: PropTypes.Requireable<string>;
        const deleteConfirm: PropTypes.Requireable<boolean>;
        const deleteConfirmType: PropTypes.Requireable<string>;
        const deleteConfirmTitle: PropTypes.Requireable<string>;
        const deleteConfirmDescription: PropTypes.Requireable<string>;
        const disabledElements: PropTypes.Requireable<(string | null | undefined)[]>;
        const leftCustomSideElement: PropTypes.Requireable<(object | null | undefined)[]>;
        const onClickAdd: PropTypes.Requireable<(...args: any[]) => any>;
        const onClickAddAsCopy: PropTypes.Requireable<(...args: any[]) => any>;
        const onClickAddGroup: PropTypes.Requireable<(...args: any[]) => any>;
        const onClickDelete: PropTypes.Requireable<(...args: any[]) => any>;
        const onClickDown: PropTypes.Requireable<(...args: any[]) => any>;
        const onClickEdit: PropTypes.Requireable<(...args: any[]) => any>;
        const onClickUp: PropTypes.Requireable<(...args: any[]) => any>;
        const onSearch: PropTypes.Requireable<(...args: any[]) => any>;
        const rightCustomSideElement: PropTypes.Requireable<(object | null | undefined)[]>;
        const showElements: PropTypes.Requireable<(string | null | undefined)[]>;
        const systemBtnProps: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        const centerCustomSideElement_1: null;
        export { centerCustomSideElement_1 as centerCustomSideElement };
        const borderStyle_1: string;
        export { borderStyle_1 as borderStyle };
        const defaultValueSearch_1: undefined;
        export { defaultValueSearch_1 as defaultValueSearch };
        const deleteConfirm_1: boolean;
        export { deleteConfirm_1 as deleteConfirm };
        const deleteConfirmType_1: string;
        export { deleteConfirmType_1 as deleteConfirmType };
        const deleteConfirmTitle_1: string;
        export { deleteConfirmTitle_1 as deleteConfirmTitle };
        const deleteConfirmDescription_1: string;
        export { deleteConfirmDescription_1 as deleteConfirmDescription };
        const disabledElements_1: never[];
        export { disabledElements_1 as disabledElements };
        const leftCustomSideElement_1: null;
        export { leftCustomSideElement_1 as leftCustomSideElement };
        export { noop as onClickAdd };
        export { noop as onClickAddAsCopy };
        export { noop as onClickAddGroup };
        export { noop as onClickDelete };
        export { noop as onClickEdit };
        export { noop as onClickUp };
        export { noop as onClickDown };
        export { noop as onSearch };
        const rightCustomSideElement_1: null;
        export { rightCustomSideElement_1 as rightCustomSideElement };
        const showElements_1: never[];
        export { showElements_1 as showElements };
        const systemBtnProps_1: {};
        export { systemBtnProps_1 as systemBtnProps };
    }
}
import PropTypes from "prop-types";
import { noop } from "../../utils/baseUtils";
