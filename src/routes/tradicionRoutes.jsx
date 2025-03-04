import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Work from '../pages/Work';
import PrivateRoute from '../layouts/ProtectedRoute';
import Order from '../pages/Order';
import Cart from '../pages/Cart';
import CreateUser from '../pages/User';

export const tradicionRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/work" element={<Work />} />
    
    <Route path="/order" element={<Order />} />
    <Route path="/cart" element={<Cart />} />

    <Route path="/createuser" element={<CreateUser />} />
    
    <Route element={<PrivateRoute />}>
      <Route path="/menu" element={<Menu />} />
    </Route>
  </>
);
