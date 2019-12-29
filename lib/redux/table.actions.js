import { actionTypes } from './table.action.types';

export var initTableStore = function initTableStore(path) {
    return {
        type: actionTypes.INIT_TABLE_STORE,
        payload: { path: path }
    };
};

export var setTableSelectedRow = function setTableSelectedRow(path, row) {
    return {
        type: actionTypes.SET_ROWS,
        payload: { path: path, row: row }
    };
};