import React, { FunctionComponent } from "react";
import { Button as AntButton } from "antd";
import { withStore } from "../core/withStore";
import { ButtonProps as AntButtonProps } from "antd/lib/button/button";
import { FormListFieldData } from "antd/es/form/FormList";
import { renderLabel } from "../core/renders";
import { StoreProps } from "../core/wrappers";

export interface ButtonProps extends AntButtonProps, StoreProps {
    /** Параметры поля. Используется только для кнопок в FormList */
    field?: FormListFieldData;
    /** Переопределение onClick. Второй параметр используется только для кнопок в FormList */
    onClick?: (e: React.MouseEvent<HTMLElement>, field?: FormListFieldData) => void;
}

/** Компонент кнопки со всеми пропрами AntButton */
const Button: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    const Component = withStore(AntButton);
    const onClick = (e: React.MouseEvent<HTMLElement>) => props.onClick && props.onClick(e, props.field);
    return renderLabel(Component)({...props, itemProps: { trigger: 'onClick' }, onClick: onClick, componentType: 'Button'})
}

export default Button;