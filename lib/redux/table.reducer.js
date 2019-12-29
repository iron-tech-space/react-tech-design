var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import objectPath from 'object-path';
import { actionTypes } from './table.action.types';

var tableReducer = function tableReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case actionTypes.INIT_TABLE_STORE:
            {
                var path = action.payload.path;
                // console.log("INIT_TABLE_STORE: ", path);

                var newState = _extends({}, state);
                // console.log("INIT_TABLE_STORE newState: ", newState);
                objectPath.set(newState, path, {}); // obj.a is now {}
                // console.log("INIT_TABLE_STORE newState: ", newState);
                return newState;
            }
        case actionTypes.SET_ROWS:
            {
                var _action$payload = action.payload,
                    _path = _action$payload.path,
                    row = _action$payload.row;


                var _newState = _extends({}, state);
                objectPath.set(_newState, _path, row); // obj.a is now {}
                // console.log("SET_ROWS newState: ", newState);
                return _newState;

                // console.log("SET_ROWS: ", path, section);
                // return getNewState(state, path, section, 'rows', rows);
            }
        case 'ADD_ROW':
            {
                // console.log("ADD_ROW: ", action.payload);
                var _action$payload2 = action.payload,
                    _path2 = _action$payload2.path,
                    section = _action$payload2.section,
                    _row = _action$payload2.row;
                var rowData = _row.rowData; // rowData, rowIndex, rowKey

                var rows = [].concat(_toConsumableArray(state[_path2][section].rows));
                rows.push(rowData);
                return getNewState(state, _path2, section, 'rows', rows);;
            }
        case 'CHANGE_ROW':
            {
                // console.log("CHANGE_ROW: ", action.payload.row);
                var _action$payload3 = action.payload,
                    _path3 = _action$payload3.path,
                    _section = _action$payload3.section,
                    _row2 = _action$payload3.row;
                var _rowData = _row2.rowData,
                    rowIndex = _row2.rowIndex; // rowData, rowIndex, rowKey

                var _rows = [].concat(_toConsumableArray(state[_path3][_section].rows));
                _rows.splice(rowIndex, 1, _rowData);
                return getNewState(state, _path3, _section, 'rows', _rows);
            }
        case 'DELETE_ROW':
            {
                // console.log("DELETE_ROW: ", action.payload.row);
                var _action$payload4 = action.payload,
                    _path4 = _action$payload4.path,
                    _section2 = _action$payload4.section,
                    _row3 = _action$payload4.row;
                var _rowIndex = _row3.rowIndex; // rowData, rowIndex, rowKey

                var _rows2 = [].concat(_toConsumableArray(state[_path4][_section2].rows));
                _rows2.splice(_rowIndex, 1);
                return getNewState(state, _path4, _section2, 'rows', _rows2);
            }
        default:
            return state;
    }
};

var getNewState = function getNewState(state, path, section, objName, data) {
    return _extends({}, state, _defineProperty({}, path, _extends({}, state[path], _defineProperty({}, section, _extends({}, state[path] ? state[path][section] : null, _defineProperty({}, objName, data))))));
};

export default tableReducer;