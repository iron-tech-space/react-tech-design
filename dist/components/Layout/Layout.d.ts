import { ReactNode } from "react";
import { StoreProps } from "../core/wrappers";
export interface LayoutProps extends StoreProps {
    /** Имя CSS класса */
    className?: string | undefined;
    children?: ReactNode[];
}
/** Компонент обертка со всеми пропрами div */
declare const Layout: (props: LayoutProps) => JSX.Element;
export default Layout;
