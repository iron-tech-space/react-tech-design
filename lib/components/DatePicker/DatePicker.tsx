import React, { FunctionComponent, useEffect } from "react";
import {
    DatePicker as AntDatePicker, DatePickerProps,
    TimePicker as AntTimePicker, TimePickerProps,
    Typography as AntTypography
} from "antd";
import moment from "moment";
import { getISO, toFormat } from "../utils/datesUtils";

/** Компонент выбора даты */
export type { DatePickerProps } from "antd";
export const RtDatePicker: FunctionComponent<DatePickerProps> = (props: DatePickerProps) =>
    DateTimePicker(AntDatePicker)(props);

/** Компонент выбора времени */
export type { TimePickerProps } from "antd";
export const RtTimePicker: FunctionComponent<TimePickerProps> = (props: TimePickerProps) =>
    DateTimePicker(AntTimePicker)(props);

/** Компонент вывода даты в текстовом виде */
export const TypographyDate = (props: any) => {
    const { label, value, format } = props;
    const _value = value ? (format ? toFormat(value, format) : getISO(value)) : undefined;
    return <AntTypography.Text {...props}> {label || _value} </AntTypography.Text>;
};

const DateTimePicker = <T extends unknown>(Component: React.ComponentType<T>) => (props: any) => {
    const { value, onChange, ...restProps } = props;

    useEffect(() => {
        // console.log("DatePickerHOC => onChange => string");
        value && typeof value === "string" && onChange(moment(value), value);
    }, []);

    const _value = value ? (typeof value === "string" ? moment(value) : value) : undefined;
    const style = { width: "100%", ...(props && props.style) };
    // console.log("DatePickerHOC value => ", value);
    return <Component {...restProps} style={style} value={_value} onChange={onChange} />;
};

