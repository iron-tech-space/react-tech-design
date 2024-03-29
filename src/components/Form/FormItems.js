import React from "react";
import FormItem from "./FormItem";
import { Form as AntForm } from "antd";
import { renderDeclarativeByName } from "../core/renders";

const FormItems = (props) => {
    const { items } = props;
    // console.log('FormItems props => ', props);
    const getItems = (data, formListProps) => {
        return (data && data.map((item, index) => {
            const {componentType, children, ...itemProps} = item;
            // console.log('FormItems index => ', index);
            switch (componentType) {
                case "Item":
                    let _item = { ...item };
                    let _key = index;
                    if (formListProps && formListProps.field) {
                        if (_item.name) {
                            if (Array.isArray(_item.name)) {
                                _item.name = [formListProps.field.name, ..._item.name];
                                _item.fieldKey = [formListProps.field.name, ..._item.name];
                            } else {
                                _item.name = [formListProps.field.name, _item.name];
                                _item.fieldKey = [formListProps.field.name, ..._item.name];
                            }
                        }
                    }
                    // console.log('_item ', _item.name);
                    return <FormItem key={`${_key}`} {..._item} field={{ ...formListProps }}/>;
                case "ListItems":
                    return (
                        <AntForm.List key={index} {...itemProps}>
                            {(fields, operation) => {
                                const param = { fields: [...fields], operation: { ...operation } };
                                return getItems(children, param);
                            }}
                        </AntForm.List>
                    );
                case "ListItem":
                    // console.log('formListProps => ', formListProps);
                    return (
                        <div key={index}>
                            {formListProps && formListProps.fields && formListProps.fields.map((field, fIndex) => {
                                // console.log('index field.key', index, field);
                                const param = { field: { ...field }, ...formListProps };
                                return <div key={field.key}>{getItems(children, param)} </div>;
                            })}
                        </div>
                    );
                default:
                    return renderDeclarativeByName(componentType)({ key: index, ...itemProps })(getItems(children, formListProps))
            }
        })) || null;
    };

    return getItems(items);
};

export default FormItems;
