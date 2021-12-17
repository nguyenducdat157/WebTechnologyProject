import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import CollectionPage from './pages/Collections/Collections';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import SearchPage from './pages/SearchPage';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Admindashboard from './pages/Admin/Dashboard/AdminDashboard';
import Productlist from './pages/Admin/ProductList/ProductList';
import Orderlist from './pages/Admin/OrderList/OrderList';
import Userlist from './pages/Admin/UserList/UserList';
import Productedit from './pages/Admin/ProductEdit/ProductEdit';
import { useSelector } from 'react-redux';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import CartScreen from './pages/CartScreen/CartScreen';
import Placeorderscreen from './pages/Checkout/PlaceOrder/PlaceOrderScreen';
import Shippingaddressscreen from './pages/Checkout/ShippingAddress/ShippingAddressScreen';
import Paymentmethodscreen from './pages/Checkout/PaymentMethod/PaymentMethodScreen';
import AccountScreen from './pages/MyAccount/Account';

function App() {

  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;


  return (
   <BrowserRouter>
    <Switch>
     <Route exact path='/' component={userInfo?.isAdmin ? Admindashboard : Homepage}/>
     <Route exact path='/register' component={Register}/>
     <Route exact path='/login' component={Login}/>
     <Route export path='/collections' component={CollectionPage}/>
     <Route export path='/search/:key' component={SearchPage}/>
     <Route export path='/product/:id' component={ProductDetail}/>
     <Route export path='/cart' component={CartScreen}/>
     <Route export path='/place-order' component={Placeorderscreen}/>
     <Route export path='/shipping' component={Shippingaddressscreen}/>
     <Route export path='/payment' component={Paymentmethodscreen}/>
     <Route export path='/admin' component={userInfo?.isAdmin ? Admindashboard : PageNotFound}/>
     <Route export path='/list-products' component={userInfo?.isAdmin ? Productlist : PageNotFound}/>
     <Route export path='/list-orders' component={Orderlist}/>
     <Route export path='/list-users' component={userInfo?.isAdmin ? Userlist : PageNotFound}/>
     <Route export path='/create-product' component={userInfo?.isAdmin ? Productedit : PageNotFound}/>
     <Route export path='/edit-product/:id' component={userInfo?.isAdmin ? Productedit : PageNotFound}/>
     <Route export path='/profile' component={AccountScreen}/>
     <Route path="*" component={PageNotFound} />
  

    </Switch>
   </BrowserRouter>
  );
}

export default App;
