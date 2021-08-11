import React, { ReactNode } from "react";
import { LabelProps } from "./wrappers";
export declare const render: (Component: React.ComponentType) => (props: any) => JSX.Element;
export declare const renderLabel: (Component: React.ComponentType) => <T extends LabelProps>(props: T) => JSX.Element;
export declare const renderComponentType: (Component: React.ComponentType, componentType: string) => (props: any) => JSX.Element;
export declare const renderClassicByName: (componentName: string) => (props: any) => JSX.Element | null;
export declare const renderDeclarativeByName: (componentName: string) => (props: any) => (children: ReactNode) => JSX.Element | null;
