import React, { ReactNode } from "react";
import { StoreProps } from "../core/wrappers";
export interface CustomProps extends StoreProps {
    /** Функция для рендера компонента. В приритере если передани и render, и ребенок */
    render?: React.FunctionComponent;
    /** Возможен только 1 ребенок для рендоракомпонеента */
    children?: ReactNode;
}
/** Custom компонент */
declare const Custom: (props: CustomProps) => JSX.Element | null;
export default Custom;
