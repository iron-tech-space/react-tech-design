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

- Fix `declarative.js` (add `FileManager`)

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
