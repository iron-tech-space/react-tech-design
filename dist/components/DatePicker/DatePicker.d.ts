import { FunctionComponent } from "react";
import { DatePickerProps, TimePickerProps } from "antd";
/** Компонент выбора даты */
export type { DatePickerProps } from "antd";
export declare const RtDatePicker: FunctionComponent<DatePickerProps>;
/** Компонент выбора времени */
export type { TimePickerProps } from "antd";
export declare const RtTimePicker: FunctionComponent<TimePickerProps>;
/** Компонент вывода даты в текстовом виде */
export declare const TypographyDate: (props: any) => JSX.Element;
