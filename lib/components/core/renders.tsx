import React, { ReactNode } from "react";
import { LabelProps } from "./wrappers";
import * as rtComponents from "../index";


export const render = (Component: React.ComponentType) => (props: any) =>
    <Component {...props}/>

export const renderLabel = (Component: React.ComponentType) => <T extends LabelProps>(props: T) =>
    <Component {...props}>{props.label || props.value || props.children}</Component>

export const renderComponentType = (Component: React.ComponentType, componentType: string) => (props: any) =>
    <Component {...props} componentType={componentType}/>

export const renderClassicByName = (componentName: string) => (props: any) => {
    // @ts-ignore
    if(rtComponents[componentName]) {
        // console.log("renderClassicByName => ", props);
        // @ts-ignore
        return render(rtComponents[componentName])(props)
    } else {
        console.log("NO renderClassicByName => ", componentName);
        return null;
    }
}
export const renderDeclarativeByName = (componentName: string) => (props: any) => (children: ReactNode) => {
    // @ts-ignore
    if(rtComponents[componentName]) {
        // console.log("renderDeclarativeByName => ", props);
        // @ts-ignore
        return render(rtComponents[componentName])({...props, children})
    } else {
        console.log("NO renderDeclarativeByName => ", componentName);
        return null;
    }
}