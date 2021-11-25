import { combineReducers } from "redux";
import { productListReducer } from "./productReducer";
import userReducer  from "./userReducers";
const rootReducer = combineReducers({
    userReducer,
    productList: productListReducer,
});

export default rootReducer;