import { combineReducers } from "redux";
import { productDeleteReducer, productDetailsReducer, productListReducer, productReviewSaveReducer } from "./productReducer";
import {userReducer, userListReducer, userDeleteReducer}  from "./userReducers";
const rootReducer = combineReducers({
    userReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productReviewSave: productReviewSaveReducer,
    productDelete: productDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
});

export default rootReducer;