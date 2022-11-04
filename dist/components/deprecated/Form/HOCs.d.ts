export function withStore(Component: any, antFormItemProps: any): import("react-redux").ConnectedComponent<React.JSXElementConstructor<import("react-redux").Matching<{
    [x: number]: any;
} & {
    setDataStore: (path: any, row: any) => {
        type: string;
        payload: {
            path: any;
            row: any;
        };
    };
}, unknown>>, any>;
export function DatePickerHOC(Component: any): (props: any) => JSX.Element;
export function TypographyTitle(props: any): JSX.Element;
export function TypographyText(props: any): JSX.Element;
export function TypographyDate(props: any): JSX.Element;
import React from "react";
