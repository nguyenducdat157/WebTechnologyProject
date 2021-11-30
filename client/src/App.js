import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import CollectionPage from './pages/Collections/Collections';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import SearchPage from './pages/SearchPage';
import ProductDetail from './pages/ProductDetail/ProductDetail';

function App() {
  return (
   <BrowserRouter>
    <Switch>
     <Route exact path='/' component={Homepage}/>
     <Route exact path='/register' component={Register}/>
     <Route exact path='/login' component={Login}/>
     <Route export path='/collections' component={CollectionPage}/>
     <Route export path='/search/:key' component={SearchPage}/>
     <Route export path='/product/:id' component={ProductDetail}/>
    </Switch>
   </BrowserRouter>
  );
}

export default App;
