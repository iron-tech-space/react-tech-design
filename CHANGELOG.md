## 0.0.90

- Fix select all bug while undefined value in Select comp (multiple mode)
- Fix clearing value bug on loading options in Select comp (multiple mode)  
- Add debounceDelay prop in Select comp (default 300 ms)

## 0.0.89

- Fix autoSelected when RTTable filtered

## 0.0.88

- Fix ConfigLoader (remove initialValue from requestLoadConfig)
- Add Debounce to OnSearch at Select

## 0.0.87

- Fix table sort
- Fix select search
- Fix function component types

## 0.0.86

- ReExport raw table component

## 0.0.85

- Add ModalProps to `Modal` 


## 0.0.84

- Add dropdownRender props in `Select`


## 0.0.83

- Fixed add onFinish in ModalProps
- Change mode props in `Select`, fixed optionConverter
- Add disabled prop in `Table` from React-Base-Table
- Add bordered prop in TableProps

## 0.0.82

- Fixed update by selected `Table`
- Fixed Modal props
- Fixed Form props


## 0.0.81

- Changes Modal props



## 0.0.80

- Add dashboards with logs

## 0.0.79

- Add setSelectedRowsHandler for change value in Table

## 0.0.78

- Add export `FormItems` and `FormItem`

## 0.0.77

- Fix Ant Table two load configs
- Fix two dispatch in Table
- Fix Ant Table footer height

## 0.0.76

- Fix bugs with types

## 0.0.75

- Fix bug withItem props

## 0.0.74

- Fix bug with reload component after change store
- Fix FormBody. Error in console noPadding and scrollable
- Change call withStore
- Change Upload props logic.
  - Not need valuePropName
  - Init value struct `{ dataObject: {...} }`
  - Dispatch struct `{ dataObject: {...}, file: {...} }`

## 0.0.73

- Add TypeScript to project
- Restrict declarative to many files
- Add extraData as object for Modal and Simple components
- Rename `setDateStore` to `setDataStore`
- Fix infinity for `Select`

## 0.0.72

- Add initFormData in Form dispatch
- Add className and style in Rt Table
- Move Modal dispatch in request
- Fix radical id in Select

## 0.0.71

- Fix select lose param
- Fix modal requestSaveForm

## 0.0.70

- **ReStruct main `index.js`**
- Add new components Slider, Collapse, Popover, Tooltip
- Form
  - Change `onFinish` in `Form`. Send full save object
  - Remove props `autoSaveForm`
- Modal
  - Add `onOk` and `onFinish` for local modal
  - Send full save object to `onOk` and `onFinish`
  - Change modal types to `['save', 'select', 'view']`
  - Add props `methodSaveForm`
  - Rename props `requestSaveRow` to `requestSaveForm`
- Select
  - Fix bug with no load option by id
  - Add props `lostParamName` name filter param for load option. Default `'id'`

## 0.0.69

- Add search in Select and TreeSelect

## 0.0.68

- Add `response.data` as second param in onFinish func after requestSaveForm in `Form`
- Add `response.data` as second param in onFinish func after requestSaveRow in `Modal`
- Add default sort for `Table` from config
- Add support `dispatch.path` for `Table`
- Add reset sort for Rt table

## 0.0.67

- Add TimePicker
- Fix bugs
  - Date/Time Picker render error
  - Form not support props error
  - Select need set showSearch error

## 0.0.66

- Add withMount in subscribe
- Refactor config loader for Ant Table
- Refactor and add BodyCell for Ant Table

## 0.0.65

- Fix bug withClear fields
- Add support new struct extraData for `Table`
  Example: `extraData: { filter: <path>, searchValue: <path> }`
- Change reducer. If set undefined value then remove field

## 0.0.64

- Fix isValid for Table props `customFields`
- Add isValid in Table for `_addRow` func
- Add `Ant Table` for no infinity Tables
- Change default headerHeight and rowHeight to 36px (small size in Ant Table)
- Remove check value before dispatch in HOC `withStore`

## 0.0.63

- Add `_setLoadedRowsHandler` in `Table` for call `onChange` after load data
- Add dispatch `onRowClick`

## 0.0.62

- Add support children for `Custom` component
- Add `setSubscribePropsHandler` in HOC withStore

## 0.0.61

- Remove def padding for cell.
  Need add `rt-table-cell` in `cellRenderer` for add padding
- Add `Table` props `cellBordered`, `rowBordered`, `editMode`, `value` and `onChange`
- Add `setSubscribeProps` from `Table`
- Add dispatch new events to `${dispatchPath}.events.${nameEvent}`:
  - `onAddRows`
  - `onAddRow`
  - `onAddRowAsCopy`
  - `onEditRow`
  - `onRemoveRow`
  - `onMoveUpRow`
  - `onMoveDownRow`

## 0.0.60

- Add `FormList` and `List`

## 0.0.59

- Refactoring code

## 0.0.58

- Add components
  - FormHeader
  - FormBody
  - FormFooter
  - TreeSelect
  - UploadFile
- Add `JSX` style components
- Add `declarative` style components

## 0.0.57

- Fix bug "Add select row on a double click"

## 0.0.56

- Fix bug with `ListItems` operations
- Change `Modal` subscribe object to array
- Add in `Modal` subscribe onChange funcs `openModal` and `closeModal`
- Add rowDoubleClickDispatch to `Table`
- Add select row by rowClick if selectable table

## 0.0.55

- New `Table` component
- New `Select` component
- Full refactor code

## 0.0.54

- Add export **notificationError**
- Remove not used **initStore**

## 0.0.53

- Add showTime to `DateRange`
- Add `ListItems` and `ListItem`
- Add **setButtonProps** in `Modal`
- Add **selectedDispatchPath** in selectAll in `Table`
- Fix editable modal in selectable `Table`

## 0.0.52

- Fix `Table` styles for safari

## 0.0.51

- Add centralize **notificationError**
- Add **subscribe** and **dispatchPath** in `Modal`
- Change `Modal` props **selectedRow** to **modalData**
- Fix `Tabs` style
- Fix `Select` style

## 0.0.50

- Add estimatedRowHeight for `Table`
- Add generate markdown by props of components

## 0.0.49

- Fix `MultiSelect`
- Add getValueFromMultiSelect for `MultiSelect`
- Add requestDeleteRow in `FormTable`
- Add init dispatch in `Select`

## 0.0.48

- Add description in notification.error
- Add Modal in FormItem
- Fix selectedRowKeys for local SingleSelect

## 0.0.47

- Fix forwardRef in `FormTable`

## 0.0.46

- Fix parent select in file manager modal

## 0.0.45

- Fix `index.js` (add `FileManager`)

## 0.0.44

- Fix save group in `FormTable`
- Change `CommandPanel` style
- Add `FileManager`, `Custom` component
- Add forwardRef in `FormTable`
- Add clipboard utils

## 0.0.43

- Change Search in `Cmd panel`. Now you can change props across `systemBtnProps`
- Fix `TabPane` styles in `Form`
- Fix hide `Select` when click on search

## 0.0.42

- Fix saveModalObject

## 0.0.41

- Fix overflow select in modal
- Add handler to props in `FormTable` for `onClickUp` and `onClickDown`
- Add up and down for tree table
- Add clear button for `Select`

## 0.0.40

- Fix bug with `RadioGroup`

## 0.0.39

- Fix bug with view `Title`, `Text` and `DateText`
- Change **dispatch** from `onChange` to `useEffect` in HOC `withStore`
- Add `useEffect` for **subscribeProps.value** in HOC `withStore`. If change **subscribeProps.value** then call `onChange`
- Add set SelectedRowKeys from props.value in `reloadData` func in `Table`
- Remove className from React.Fragment in `Table` footer

## 0.0.38

- Rename tableReducer to rtdReducer
- Rename actions `initTableStore` and `setTableSelectedRow` to `initStore` and `setDateStore`
- Rename type actions `INIT_TABLE_STORE` and `SET_ROWS` to `INIT_STORE` and `SET_DATA_STORE`
- Fix command panel elements in `Select`
- Fix excludeProps in `Typography`
- Add dispatch and subscribe for All ItemComponents such as `Button`, `Checkbox`, `Input` and others from their level
- Change dispatch and subscribe in `Table`. Now dispatch to store selected row to `${dispatchPath}.selected` and all rows to `${dispatchPath}.rows`
- Remove prop from `Table` => `footerShow`, `footerTitles`, `footerHeight`
- Add props to `Table` => `footerProps` with fields
    - height
    - showElements
    - selectedTitle
    - loadedTitle
    - totalTitle
    - leftCustomSideElement
    - centerCustomSideElement
    - rightCustomSideElement

## 0.0.37

- Fix bugs with selectable table
- Add dispatchPath and subscribe to `Table`

## 0.0.36

- Fix selectable Modal

## 0.0.35

- Fix Prop Type for cmd panel
- Add label for Checkbox

## 0.0.34

- Fix Prop Type for cmd panel
- Fix justify footer buttons
- Fix height forms

## 0.0.33

- Delete `initialValues` from FormModal
- Add `loadInitData` to FormModal
- Delete not need `console.log` from FormTable
- Add all PropTypes to FormTable (import all props from Table)
- Change leftCustomSideElement centerCustomSideElement rightCustomSideElement в CommandPanel
- Add DatePickerHOC for convert init value
- Change view modal to viewGroup and viewObject
- Add new componentType `DateText` for view date
