import { render as coreRender } from "../core/renders";
import React, { JSX, ReactElement, ReactNode } from "react";
import { StoreProps } from "../core/wrappers";

type fnType = (props: any) => ReactElement<any, any> | JSX.Element | null
type renderType = React.ComponentType<any> | fnType;

export interface CustomProps extends StoreProps{
    /** Значение насильно прокинутое */
    value?:any;
    /** Функция для рендера компонента. В приритере если передани и render, и ребенок */
    render?: renderType;

    /** Возможен только 1 ребенок для рендоракомпонеента */
    children?: ReactNode | undefined;
}

/** Custom компонент для нестандартных решений */
const Custom = (props: CustomProps) => {
    const {children} = props
    let childNode = null;
    let childProps = null;

    if (Array.isArray(children)) {
        console.warn('Custom component: `children` is array. Don\'t render component')
        return null;
    } else if(props.render) {
        // console.log('childNode = props.render')
        childNode = props.render;
        childProps = { ...props, componentType: 'Custom' };
        return coreRender(childNode)(childProps)
    } else if(React.isValidElement(children)) {
        // console.log('childNode = children')
        childProps = { ...children.props, ...props, componentType: 'Custom' };
        return  React.cloneElement(children, childProps);
    } else {
        console.warn('Custom component: not exist valid render')
        return null;
    }
}

export default Custom;
