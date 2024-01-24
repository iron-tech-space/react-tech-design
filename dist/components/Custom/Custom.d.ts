import React, { JSX, ReactElement, ReactNode } from "react";
import { StoreProps } from "../core/wrappers";
type fnType = (props: any) => ReactElement<any, any> | JSX.Element | null;
type renderType = React.ComponentType<any> | fnType;
export interface CustomProps extends StoreProps {
    /** Значение насильно прокинутое */
    value?: any;
    /** Функция для рендера компонента. В приритере если передани и render, и ребенок */
    render?: renderType;
    /** Возможен только 1 ребенок для рендоракомпонеента */
    children?: ReactNode | undefined;
}
/** Custom компонент для нестандартных решений */
declare const Custom: (props: CustomProps) => globalThis.JSX.Element | null;
export default Custom;
