import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './pages/home';
import Lend from './pages/lend';
import Offers from './pages/offers';
import Borrow from './pages/borrow';
import Loans from './pages/loans';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path='/home' render={(props) => <Home {...props} />} />
        <Route path='/lend' render={(props) => <Lend {...props} />} />
        <Route path='/offers' render={(props) => <Offers {...props} />} />
        <Route path='/borrow' render={(props) => <Borrow {...props} />} />
        <Route path='/loans' render={(props) => <Loans {...props} />} />
        <Redirect to='/home' />
        <Redirect from='/' to='/home' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
