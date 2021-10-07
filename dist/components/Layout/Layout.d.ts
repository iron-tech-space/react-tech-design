import { ReactNode } from "react";
import { StoreProps } from "../core/wrappers";
export interface LayoutProps extends StoreProps {
    /** Имя CSS класса */
    className?: string | undefined;
    style?: object | undefined;
    children?: ReactNode | undefined;
}
/** Компонент обертка со всеми пропрами div */
declare const Layout: (props: LayoutProps) => JSX.Element;
export default Layout;
