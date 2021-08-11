import React, { FunctionComponent } from "react";
import { ButtonProps as AntButtonProps } from "antd/lib/button/button";
import { FormListFieldData } from "antd/es/form/FormList";
import { StoreProps } from "../core/wrappers";
export interface ButtonProps extends AntButtonProps, StoreProps {
    /** Параметры поля. Используется только для кнопок в FormList */
    field?: FormListFieldData;
    /** Переопределение onClick. Второй параметр используется только для кнопок в FormList */
    onClick?: (e: React.MouseEvent<HTMLElement>, field?: FormListFieldData) => void;
}
/** Компонент кнопки со всеми пропрами AntButton */
declare const Button: FunctionComponent<ButtonProps>;
export default Button;
