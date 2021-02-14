import React from "react";
import PropTypes from "prop-types";
import FormItem from "./FormItem";
import Layout from "../Layout/Layout";
import { Space, Row, Col, Tabs, Radio, Form as AntForm } from "antd";
import { getObjectExcludedProps } from "../utils/baseUtils";
import Switcher from "../Switcher/Switcher";
import { withStore } from "./HOCs";
import Select from "../Select/Select";

const excludeProps = ["children", "componentType"];

const FormItems = (props) => {
    const { items } = props;

    // console.log('FormItems props => ', props);

    const getItems = (data, antFormListParams) => {

        return (data && data.map((item, index) => {
            let itemProps = getObjectExcludedProps(item, excludeProps);
            // console.log('FormItems index => ', index);

            switch (item.componentType) {
                case "Space":
                    return (
                        <Space key={index} {...itemProps}>
                            {item.children &&
                            item.children.length > 0 &&
                            getItems(item.children, antFormListParams)}
                        </Space>
                    );
                case "Row":
                    return (
                        <Row key={index} {...itemProps}>
                            {item.children &&
                            item.children.length > 0 &&
                            getItems(item.children, antFormListParams)}
                        </Row>
                    );
                case "Col":
                    return (
                        <Col key={index} {...itemProps}>
                            {item.children &&
                            item.children.length > 0 &&
                            getItems(item.children, antFormListParams)}
                        </Col>
                    );
                case "Layout":
                    return (
                        <Layout key={index} {...itemProps}>
                            {item.children &&
                            item.children.length > 0 &&
                            getItems(item.children, antFormListParams)}
                        </Layout>
                    );
                case "Tabs":
                    return (
                        <Tabs key={index} {...itemProps}>
                            {item.children &&
                            item.children.length > 0 &&
                            getItems(item.children, antFormListParams)}
                        </Tabs>
                    );
                case "TabPane":
                    return (
                        <Tabs.TabPane key={index} {...itemProps}>
                            {item.children &&
                            item.children.length > 0 &&
                            getItems(item.children, antFormListParams)}
                        </Tabs.TabPane>
                    );
                case 'Switcher':
                    const Component = withStore(Switcher, antFormListParams);
                    // return (<Component {...childProps} />);
                    return (
                        <Component key={index} {...itemProps}>
                            {item.children &&
                            item.children.length > 0 &&
                            getItems(item.children, antFormListParams)}
                        </Component>
                    );
                case "Item":
                    let _item = { ...item };
                    let _key = index;
                    if (antFormListParams && antFormListParams.field) {
                        if (_item.name) {
                            if (Array.isArray(_item.name)) {
                                _item.name = [antFormListParams.field.name, ..._item.name];
                                _item.fieldKey = [antFormListParams.field.name, ..._item.name];
                            } else {
                                _item.name = [antFormListParams.field.name, _item.name];
                                _item.fieldKey = [antFormListParams.field.name, ..._item.name];
                            }
                        }
                    }
                    // console.log('_item ', _item.name);
                    return <FormItem key={`${_key}`} {..._item} field={{ ...antFormListParams }}/>;
                case "ListItems":
                    return (
                        <AntForm.List key={index} {...itemProps}>
                            {(fields, operation) => {
                                const param = { fields: [...fields], operation: { ...operation } };
                                return getItems(item.children, param);
                            }}
                        </AntForm.List>
                    );
                case "ListItem":
                    // console.log('antFormListParams => ', antFormListParams);
                    return (
                        <div key={index}>
                            {antFormListParams && antFormListParams.fields && antFormListParams.fields.map((field, fIndex) => {
                                // console.log('index field.key', index, field);
                                const param = { field: { ...field }, ...antFormListParams };
                                return <div key={field.key}>{getItems(item.children, param)} </div>;
                            })}
                        </div>
                    );


                default:
                    return null;
            }
        })) || null;
    };

    return getItems(items);
};

FormItems.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FormItems;
