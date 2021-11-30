import { combineReducers } from "redux";
import { productDetailsReducer, productListReducer, productReviewSaveReducer } from "./productReducer";
import userReducer  from "./userReducers";
const rootReducer = combineReducers({
    userReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productReviewSave: productReviewSaveReducer,
});

export default rootReducer;