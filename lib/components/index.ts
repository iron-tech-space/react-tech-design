import { FunctionComponent } from "react";

import {
    LabelProps,
    StoreProps,
    SubscribeOnChangeOptions,
    searchWrapper,
    withLabel,
    withPlaceholder,
    withStore,
    withItem
} from "./core/wrappers";

import { sortBy } from './core/interfaces';

// General
import RtButton, { ButtonProps } from "./Button/Button";
import AntTitle, { TitleProps } from "antd/lib/typography/Title";
import AntText, { TextProps } from "antd/lib/typography/Text";
import {TypographyDate as RtDateText} from "./DatePicker/DatePicker";

// Layout
import AntDivider, { DividerProps } from "antd/lib/divider";
import AntRow, { RowProps } from "antd/lib/row";
import AntCol, { ColProps } from "antd/lib/col";
import RtLayout, { LayoutProps } from "./Layout/Layout";
import AntSpace, { SpaceProps } from "antd/lib/space";

// Data Entry
import AntCheckbox, { CheckboxProps } from "antd/lib/checkbox";
import {RtDatePicker, DatePickerProps} from "./DatePicker/DatePicker";
import RtForm, {FormProps} from "./Form";
import { RtFormHeader, FormHeaderProps } from "./Form";
import { RtFormBody, FormBodyProps } from "./Form";
import { RtFormFooter, FormFooterProps } from "./Form";
import { RtFormItems, FormItemsProps } from "./Form";
import { RtFormItem, FormItemProps } from "./Form";
import AntForm, { FormListProps } from "antd/lib/form";
import AntInputNumber, { InputNumberProps } from "antd/lib/input-number";
import AntInput, { InputProps } from "antd/lib/input/Input";
import AntSearch, { SearchProps } from "antd/lib/input/Search";
import AntTextArea, { TextAreaProps } from "antd/lib/input/TextArea";
import AntPassword, { PasswordProps } from "antd/lib/input/Password";
import AntRadio, { RadioProps, RadioGroupProps } from "antd/lib/radio";
import AntSwitch, { SwitchProps } from "antd/lib/switch";
import AntSlider, { SliderSingleProps, SliderRangeProps } from "antd/lib/slider";
import RtSelect, { SelectProps } from "./Select";
import RtTreeSelect, { TreeSelectProps } from "./TreeSelect";
import { RtTimePicker, TimePickerProps } from "./DatePicker/DatePicker";
import RtUploadFile, { UploadFileProps } from "./UploadFile";

// Data Display
import AntCollapse, { CollapseProps, CollapsePanelProps } from "antd/lib/collapse";
import AntList, { ListProps } from "antd/lib/list";
import AntPopover, { PopoverProps } from "antd/lib/popover";
import AntTooltip, { TooltipProps } from "antd/lib/tooltip";
import AntTabs, { TabsProps } from "antd/lib/tabs";
import { TabPane as RtTabPane, TabPaneProps } from "./Tabs";
import { TableWrapper, TableProps, TablesSubscribeOnChangeOptions } from "./Table/Table";
import { RtTable as InternalRtTable } from "./Table/Table";
import { AntTable as InternalAntTable } from "./Table/Table";

// Feedback
import RtModal, { ModalProps, ModalSubscribeOnChangeOptions } from "./Modal";

// Rt-design
import RtCustom, { CustomProps } from "./Custom/Custom";
import RtSwitcher, { SwitcherProps } from "./Switcher/Switcher";
import RtDashboard, {DashboardProps} from "./Dashboard";

// import AntTransfer, { TransferProps } from "antd/lib/transfer";

// General
export const Button:     FunctionComponent<ButtonProps> =                   withItem(RtButton);
export const Title:      FunctionComponent<TitleProps & LabelProps & StoreProps> = withLabel(AntTitle);
export const Text:       FunctionComponent<TextProps & LabelProps & StoreProps> =  withLabel(AntText);
export const DateText:   FunctionComponent<DatePickerProps & StoreProps> =  withStore(RtDateText);

// Layout
export const Divider:   FunctionComponent<DividerProps & LabelProps & StoreProps> = withLabel(AntDivider);
export const Row:       FunctionComponent<RowProps & StoreProps> =          withStore(AntRow);
export const Col:       FunctionComponent<ColProps & StoreProps> =          withStore(AntCol);
export const Layout:    FunctionComponent<LayoutProps> =                    withStore(RtLayout);
export const Space:     FunctionComponent<SpaceProps & StoreProps> =        withStore(AntSpace);

// Data Entry
export const Checkbox:   FunctionComponent<CheckboxProps & LabelProps & StoreProps> = withLabel(AntCheckbox);
export const DatePicker: FunctionComponent<DatePickerProps & StoreProps> =   withPlaceholder(RtDatePicker, 'Выберите дату');
export const Form:       FunctionComponent<FormProps> =          RtForm;
export const FormHeader: FunctionComponent<FormHeaderProps> =    RtFormHeader;
export const FormBody:   FunctionComponent<FormBodyProps> =      RtFormBody;
export const FormFooter: FunctionComponent<FormFooterProps> =    RtFormFooter;
export const FormItems:  FunctionComponent<FormItemsProps> =     RtFormItems;
export const FormItem:   FunctionComponent<FormItemProps> =      RtFormItem;
export const FormList:   FunctionComponent<FormListProps & StoreProps> =    withStore(AntForm.List);
export const InputNumber:FunctionComponent<InputNumberProps & StoreProps> = withPlaceholder(AntInputNumber, 'Введите значение');
export const Input:      FunctionComponent<InputProps & StoreProps> =       withPlaceholder(AntInput, 'Введите значение');
export const Search:     FunctionComponent<SearchProps & StoreProps> =      searchWrapper(AntSearch, 'Поиск');
export const TextArea:   FunctionComponent<TextAreaProps & StoreProps> =    withPlaceholder(AntTextArea, 'Введите текст');
export const Password:   FunctionComponent<PasswordProps & StoreProps> =    withPlaceholder(AntPassword, 'Введите пароль');
export const Radio:      FunctionComponent<RadioProps & StoreProps> =       withStore(AntRadio);
export const RadioButton:FunctionComponent<RadioProps & StoreProps> =       withStore(AntRadio.Button);
export const RadioGroup: FunctionComponent<RadioGroupProps & StoreProps> =  withStore(AntRadio.Group);
export const Switch:     FunctionComponent<SwitchProps & StoreProps> =      withStore(AntSwitch);
export const Slider:     FunctionComponent<(SliderSingleProps | SliderRangeProps) & StoreProps> =   withStore(AntSlider);
export const Select:     FunctionComponent<SelectProps> =                   withPlaceholder(RtSelect, 'Выберите значение');
export const TreeSelect: FunctionComponent<TreeSelectProps> =               withPlaceholder(RtTreeSelect, 'Выберите значение');
export const TimePicker: FunctionComponent<TimePickerProps & StoreProps> =  withPlaceholder(RtTimePicker, 'Выберите время');
export const UploadFile: FunctionComponent<UploadFileProps> =               withStore(RtUploadFile);

// Data Display
export const Collapse:      FunctionComponent<CollapseProps & StoreProps> =         withStore(AntCollapse);
export const CollapsePanel: FunctionComponent<CollapsePanelProps & StoreProps> =    withStore(AntCollapse.Panel);
export const List:      FunctionComponent<ListProps<any>> =             withStore(AntList);
export const Popover:   FunctionComponent<PopoverProps & StoreProps> =  withStore(AntPopover);
export const Tooltip:   FunctionComponent<TooltipProps & StoreProps> =  withStore(AntTooltip);
export const Tabs:      FunctionComponent<TabsProps & StoreProps> =     withStore(AntTabs);
export const TabPane:   FunctionComponent<TabPaneProps> =   withStore(RtTabPane);
export const Table:     FunctionComponent<TableProps> =     withItem(TableWrapper);
export const RtTable:   FunctionComponent<TableProps> =     withItem(InternalRtTable);
export const AntTable:  FunctionComponent<TableProps> =     withItem(InternalAntTable);

// Feedback
export const Modal:     FunctionComponent<ModalProps> =             withItem(RtModal);

// Rt-design
export const Custom:    FunctionComponent<CustomProps> =            withStore(RtCustom);
export const Switcher:  FunctionComponent<SwitcherProps> =          withStore(RtSwitcher);
export const Dashboard: FunctionComponent<DashboardProps> =         RtDashboard;

// export const Transfer:  FunctionComponent<TransferProps<any>> =     withStore(AntTransfer);]

export type {

    // Rt types
    LabelProps,
    StoreProps,
    CustomProps,
    SwitcherProps,

    SubscribeOnChangeOptions,
    ModalSubscribeOnChangeOptions,
    TablesSubscribeOnChangeOptions,
    sortBy,

    // General
    ButtonProps,
    TitleProps,
    TextProps,
    DatePickerProps,

    // Layout
    DividerProps,
    RowProps,
    ColProps,
    LayoutProps,
    SpaceProps,

    // Data Entry
    CheckboxProps,
    FormProps,
    FormHeaderProps,
    FormBodyProps,
    FormFooterProps,
    FormListProps,
    InputNumberProps,
    InputProps,
    SearchProps,
    TextAreaProps,
    PasswordProps,
    RadioProps,
    RadioGroupProps,
    SwitchProps,
    SliderSingleProps,
    SliderRangeProps,
    SelectProps,
    TreeSelectProps,
    TimePickerProps,
    UploadFileProps,

    // Data Display
    CollapseProps,
    CollapsePanelProps,
    ListProps,
    PopoverProps,
    TooltipProps,
    TabsProps,
    TabPaneProps,
    TableProps,

    // Feedback
    ModalProps
};




















