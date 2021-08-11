import React, { useState, useEffect, ReactNode, FunctionComponent, ReactElement } from "react";
import { StoreProps } from "../core/wrappers";

export interface SwitcherProps extends StoreProps{
    /** Значение которое определяет индекс отобжараемого ребенка */
    value?: number;
    children: ReactNode[];
}

const Switcher: FunctionComponent<SwitcherProps> = (props: SwitcherProps) => {

    const { value } = props;

    const [_value, _setValue] = useState(0);

    useEffect(() => {
        if(value !== undefined && value < props.children.length) {
            _setValue(value);
        }
    }, [value])

    return (props.children[_value]) as ReactElement;
};


export default Switcher;
