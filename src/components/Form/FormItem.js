import React from 'react';
import PropTypes from 'prop-types';
// import Select from '../Select/Select';
import {
	Input,
	InputNumber,
	Form as AntForm,
	Button,
	Checkbox,
	Switch,
	DatePicker,
	Radio,
    Divider,
} from 'antd';
import { getObjectExcludedProps, getValueFromMultiSelect, getValueFromSingleSelect } from "../utils/baseUtils";
import { withStore, DatePickerHOC, TypographyTitle, TypographyText, TypographyDate } from "./HOCs";
// import FileManager from "../FileManager/FileManager";
import Modal from "../Modal/Modal";
import ConfigLoader from "../Table/ConfigLoader";
import locale from 'antd/es/date-picker/locale/ru_RU';
import Select from "../Select/Select";

const excludeProps = ['child', 'componentType', 'field'];
const noAntItemTypes = ['Title', 'Text', 'Divider', 'Button', 'LocalTable', 'ServerTable', 'InfinityTable'];

const FormItem = (props) => {

	const {child, field} = props;
	let antFormItemProps = getObjectExcludedProps(props, excludeProps);

	// Если тип элемента Select -> добавить доп свойства к Form.Item
    if (child && child.componentType && (child.componentType === 'SingleSelect' || child.componentType === 'MultiSelect')) {
        antFormItemProps.valuePropName = 'defaultSelectedRowKeys';
        antFormItemProps.getValueFromEvent = child.componentType === 'SingleSelect' ? getValueFromSingleSelect : getValueFromMultiSelect;
        antFormItemProps.trigger = 'onChangeKeys';
    } else if (child && child.componentType && child.componentType === 'SelectTable') {
        // antFormItemProps.getValueFromEvent = getValueFromSelectTable;
        // antFormItemProps.trigger = 'onRowClick';
    }

	// console.log('FormItem props => ', props);

	const getItem = () => {
		if (child) {
		    // const childProps = getObjectExcludedProps(child, ['componentType']);
			const childProps = {...child};
            // console.log('FormItem childProps => ', childProps);
			let Component;
			let placeholder;
            switch (child.componentType) {
				case 'Button':
					antFormItemProps.trigger = 'onClick';
					Component = withStore(Button, antFormItemProps);
					// console.log('Props field => ', field);
					// const onClick = (e) => childProps.onClick && childProps.onClick(e, field); onClick={onClick}
					return (<Component {...childProps}  >{childProps && childProps.label}</Component>);
				case 'Title':
					Component = withStore(TypographyTitle, antFormItemProps);
					return (<Component {...childProps} componentType={child.componentType}/>);
				case 'Text':
					Component = withStore(TypographyText, antFormItemProps);
					return (<Component {...childProps} componentType/>);
				case 'Divider':
					Component = withStore(Divider, antFormItemProps);
					return (<Component {...childProps}>{childProps && childProps.label}</Component>);
				case 'Checkbox':
					Component = withStore(Checkbox, antFormItemProps);
					return (<Component {...childProps}>{childProps && childProps.label}</Component>);
				case 'DatePicker':
					Component = withStore(DatePickerHOC(DatePicker), antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Выберите дату';
					const style = {width: '100%', ...(childProps && childProps.style)}; // locale={locale}
					return (<Component  {...childProps} style={style} placeholder={placeholder}/>);
				case 'DateText':
					Component = withStore(TypographyDate, antFormItemProps);
					return (<Component {...childProps} />);
				case 'Input':
					Component = withStore(Input, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите значение';
					return (<Component {...childProps} placeholder={placeholder} />);
				case 'Search':
					Component = withStore(Input.Search, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Поиск';
					return (<Component {...childProps} placeholder={placeholder} />);
				case 'TextArea':
					Component = withStore(Input.TextArea, antFormItemProps);
					return (<Component {...childProps} />);
				case 'Password':
					Component = withStore(Input.Password, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите пароль';
					return (<Component {...childProps} placeholder={placeholder}/>);
				case 'InputNumber':
					Component = withStore(InputNumber, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите значение';
					return (<Component {...childProps} style={{width: '100%'}} placeholder={placeholder}/>);
				case 'Radio':
					Component = withStore(Radio, antFormItemProps);
					return <Component {...childProps}>{childProps && childProps.label}</Component>;
				case 'RadioButton':
					Component = withStore(Radio.Button, antFormItemProps);
					return (<Component {...childProps}>{childProps && childProps.label}</Component>);
				case 'Switch':
					Component = withStore(Switch, antFormItemProps);
					return <Component {...childProps} />;
                case "RadioGroup":
                    Component = withStore(Radio.Group, antFormItemProps);
                    return (<Component {...childProps} />);
				// case 'SingleSelect':
                case 'Select':
					Component = withStore(Select, antFormItemProps);
					return (<Component {...childProps} />);
					// return <Select {...childProps} name={antFormItemProps.name}/>;
					//'infinity', 'serverSide', 'localSide'
                case 'Table':
                    return <ConfigLoader {...childProps} name={props.name} componentType={child.componentType}/> ;
				// case 'FileManager':
				// 	return <FileManager {...childProps} name={props.name} />;
				case 'Modal':
					return <Modal {...childProps} name={props.name} />;
				case 'Custom':
					Component = withStore(child.render, antFormItemProps);
					return <Component {...childProps}/>;
				default:
					return null;
			}
		}
	};

    if(!antFormItemProps.label)
        return <AntForm.Item {...antFormItemProps} noStyle>{getItem()}</AntForm.Item>;
    else
        return <AntForm.Item {...antFormItemProps}>{getItem()}</AntForm.Item>;
};

FormItem.propTypes = {
	child: PropTypes.object.isRequired
};

export default FormItem;
