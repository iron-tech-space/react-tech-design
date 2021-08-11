import {actionTypes} from './rtd.action.types';

export const setDataStore = (path, row) => ({
    type: actionTypes.SET_DATA_STORE,
    payload: {path, row}
});
