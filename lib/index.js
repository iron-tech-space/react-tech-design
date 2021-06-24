import { classic } from './components/declarative';

export { deprecated } from './components/deprecated';
// Store
export { default as rtdReducer } from './redux/rtd.reducer';
export { setDateStore } from './redux/rtd.actions';
// Utils
export { notificationError } from './components/utils/baseUtils';
export { executeRequest } from "./components/utils/api";
// export * from './components/utils/datesUtils';

// General
var Button = classic.Button;
export { Button };
var Title = classic.Title;
export { Title };
var Text = classic.Text;
export { Text };
var DateText = classic.DateText;
// Layout

export { DateText };
var Divider = classic.Divider;
export { Divider };
var Layout = classic.Layout;
export { Layout };
var Row = classic.Row;
export { Row };
var Col = classic.Col;
export { Col };
var Space = classic.Space;
// Data Entry

export { Space };
var Checkbox = classic.Checkbox;
export { Checkbox };
var DatePicker = classic.DatePicker;
export { DatePicker };
var Form = classic.Form;
export { Form };
var FormHeader = classic.FormHeader;
export { FormHeader };
var FormBody = classic.FormBody;
export { FormBody };
var FormFooter = classic.FormFooter;
export { FormFooter };
var FormList = classic.FormList;
export { FormList };
var InputNumber = classic.InputNumber;
export { InputNumber };
var Input = classic.Input;
export { Input };
var Search = classic.Search;
export { Search };
var TextArea = classic.TextArea;
export { TextArea };
var Password = classic.Password;
export { Password };
var RadioGroup = classic.RadioGroup;
export { RadioGroup };
var Switch = classic.Switch;
export { Switch };
var Slider = classic.Slider;
export { Slider };
var Select = classic.Select;
export { Select };
var TreeSelect = classic.TreeSelect;
export { TreeSelect };
var Transfer = classic.Transfer;
export { Transfer };
var TimePicker = classic.TimePicker;
export { TimePicker };
var UploadFile = classic.UploadFile;
// Data Display

export { UploadFile };
var Collapse = classic.Collapse;
export { Collapse };
var List = classic.List;
export { List };
var Popover = classic.Popover;
export { Popover };
var Tooltip = classic.Tooltip;
export { Tooltip };
var Tabs = classic.Tabs;
export { Tabs };
var TabPane = classic.TabPane;
// Feedback

export { TabPane };
var Modal = classic.Modal;
// Rt-design

export { Modal };
var Table = classic.Table;
export { Table };
var RtTable = classic.RtTable;
export { RtTable };
var AntTable = classic.AntTable;
export { AntTable };
var Custom = classic.Custom;
export { Custom };
var Switcher = classic.Switcher;
export { Switcher };