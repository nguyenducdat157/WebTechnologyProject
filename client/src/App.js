import logo from './logo.svg';
import './App.css';
import Button from './components/Button/Button';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Register } from './pages/Register';

function App() {
  return (
   <BrowserRouter>
    <Switch>
     <Route exact path='/' component={Homepage}/>
     <Route exact path='/register' component={Register}/>
    </Switch>
   </BrowserRouter>
  );
}

export default App;
