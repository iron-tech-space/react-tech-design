import { combineReducers } from "redux";
import { rtdReducer } from "rt-design";

const reducer = combineReducers({
  rtd: rtdReducer,
});

export default reducer;
