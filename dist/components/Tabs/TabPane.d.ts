/// <reference types="react" />
import { TabPaneProps as AntTabPaneProps } from "antd/lib/tabs";
import { StoreProps } from "../core/wrappers";
export interface TabPaneProps extends AntTabPaneProps, StoreProps {
    /** Разрешить скролл внтри TabPane */
    scrollable?: boolean;
}
declare const TabPane: (props: TabPaneProps) => JSX.Element;
export default TabPane;
