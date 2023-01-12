import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './pages/home';
import Borrow from './pages/borrow';
import Loans from './pages/loans';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path='/home' render={(props) => <Home {...props} />} />
        <Route path='/borrow' render={(props) => <Borrow {...props} />} />
        <Route path='/loans' render={(props) => <Loans {...props} />} />
        <Redirect to='/home' />
        <Redirect from='/' to='/home' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
