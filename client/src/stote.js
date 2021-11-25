import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const userInfo = JSON.parse(localStorage.getItem("info")) || null;
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const intialState = {
    cart: {cartItems, shipping: {}, payment: {}},
    userReducer: {userInfo}
}

const middleware = [thunk]

const store = createStore(
    rootReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
