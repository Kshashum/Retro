import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Checkout from './components/Checkout';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';
import Item from './components/Item';

function App() {
  return (
    <Router>
    <div className="app">
      <Navbar />
      <Switch>
      <Route path='/p/:productid'>
      <Item />
        </Route>
        <Route path="/s">
          <Search />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
          <Route path='/checkout'>
          <Checkout />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
