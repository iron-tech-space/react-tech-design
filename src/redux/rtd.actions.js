import {actionTypes} from './rtd.action.types';

export const initStore = (path) => ({
    type: actionTypes.INIT_STORE,
    payload: {path}
});

export const setDateStore = (path, row) => ({
    type: actionTypes.SET_DATA_STORE,
    payload: {path, row}
});
