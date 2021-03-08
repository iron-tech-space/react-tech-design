import {classic, declarative} from './components/declarative';

const components = { Form: classic.Form };

export {components, classic, declarative}

/** deprecated */
// Базовые копоненты
export {default as CommandPanel} from './components/deprecated/CommandPanel/CommandPanel';
export {default as FilterPanel} from './components/deprecated/FilterPanel/FilterPanel';
export {default as Table} from './components/deprecated/Table/Table';
export {default as AdvancedTable} from './components/deprecated/AdvancedTable/AdvancedTable';
export {default as List} from './components/deprecated/List/List';
export {default as Select} from './components/deprecated/Select/Select';
export {default as SingleDate} from './components/deprecated/SingleDate/SingleDate';
export {default as DateRange} from './components/deprecated/DateRange/DateRange';

// Компоненты формы
export {default as Form} from './components/deprecated/Form/Form';
export {default as FileManager} from './components/deprecated/FileManager/FileManager';
export {default as Modal} from './components/deprecated/Modal/Modal';

// Store
export { default as rtdReducer} from './redux/rtd.reducer';
export {setDateStore} from './redux/rtd.actions';

// Utils
export {notificationError} from './components/utils/baseUtils'
export * from './components/utils/datesUtils';




