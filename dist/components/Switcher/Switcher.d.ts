import { ReactNode, FunctionComponent } from "react";
import { StoreProps } from "../core/wrappers";
export interface SwitcherProps extends StoreProps {
    /** Значение которое определяет индекс отобжараемого ребенка */
    value?: number;
    children: ReactNode[];
}
declare const Switcher: FunctionComponent<SwitcherProps>;
export default Switcher;
