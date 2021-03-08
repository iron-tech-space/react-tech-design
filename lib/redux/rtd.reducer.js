var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import objectPath from 'object-path';
import { actionTypes } from './rtd.action.types';

var rtdReducer = function rtdReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case actionTypes.INIT_STORE:
            {
                var path = action.payload.path;
                // console.log("INIT_TABLE_STORE: ", path);

                var newState = _extends({}, state);
                objectPath.set(newState, path, {});
                return newState;
            }
        case actionTypes.SET_DATA_STORE:
            {
                var _action$payload = action.payload,
                    _path = _action$payload.path,
                    row = _action$payload.row;


                var _newState = _extends({}, state);
                objectPath.set(_newState, _path, row); // obj.a is now {}

                // console.log("Store change: ", path);
                // console.group("Store");
                // console.log("Store: ", newState);
                // console.log("New Data: ", path, row);
                // console.groupEnd();

                return _newState;
            }
        default:
            return state;
    }
};

export default rtdReducer;