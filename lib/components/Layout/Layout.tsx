import React, { ReactNode } from "react";
import {rtPrefix} from '../utils/variables';
import { StoreProps } from "../core/wrappers";

export interface LayoutProps extends StoreProps{
    /** Имя CSS класса */
    className?: string | undefined;
    children?: ReactNode[];
}

/** Компонент обертка со всеми пропрами div */
const Layout = (props: LayoutProps) => {

    const getCls = () => {
        let cls = [`${rtPrefix}-layout`];
        props.className && cls.push(props.className);
        return cls.join(' ');
    };

    return (
        <div {...props} className={getCls()}>
            {props.children}
        </div>
    );
};

export default Layout;
