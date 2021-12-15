import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { myOrderListReducer, orderCreateReducer, orderListReducer } from "./orderReducer";
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
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderList: orderListReducer,
    myOrderList: myOrderListReducer,
});

export default rootReducer;