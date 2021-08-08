import { rtPrefix } from "../utils/variables";
import { Tabs as AntTabs } from "antd";
import React from "react";
import { TabPaneProps as AntTabPaneProps } from "antd/lib/tabs";
import { StoreProps } from "../core/wrappers";

export interface TabPaneProps extends AntTabPaneProps, StoreProps {
    /** Разрешить скролл внтри TabPane */
    scrollable?: boolean;
}

const TabPane = (props: TabPaneProps) => {
    let cls = [];
    props.className && cls.push(props.className);
    props.scrollable && cls.push(`${rtPrefix}-tabs-tabpane-scrollable`);
    return <AntTabs.TabPane {...props} className={cls.join(" ")}>{props.children}</AntTabs.TabPane>
}

export default TabPane;